import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  getPartners: () => ipcRenderer.invoke('getPartners'),
  createPartner: (partner) => ipcRenderer.invoke('createPartner', partner),
  updatePartner: (partner) => ipcRenderer.invoke('updatePartner', partner)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
