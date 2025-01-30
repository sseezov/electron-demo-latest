import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import pg from 'pg'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    // 
    // getPartners()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  ipcMain.handle('getPartners', async function getPartners() {
    const { Client } = pg;
    const user = 'postgres';
    const password = '219219';
    const host = 'localhost';
    const port = '5432';
    const database = 'demo_2025';

    const client = new Client({
      user, password, host, port, database
    })
    await client.connect()

    try {
      const response = await client.query(`SELECT T1.*,
    CASE WHEN sum(T2.production_quantity) > 300000 THEN 15
    WHEN sum(T2.production_quantity) > 50000 THEN 10
    WHEN sum(T2.production_quantity) > 10000 THEN 5
    ELSE 0 
    END as discount
    from partners as T1
    LEFT JOIN sales as T2 on T1.id = T2.partner_id
    GROUP BY T1.id`)
      return response.rows
    } catch (e) {
      console.log(e)
    }
  })
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
