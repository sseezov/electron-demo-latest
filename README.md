## Запуск проекта

1. Создайте БД. Введите в файле main/index.js в функциях на 7, 35, 57 строках верные данные для подключения к БД.

2. Установите зависимости командой `npm i`.

3. Запустите приложение командой `npm run dev`.

## Алгоритм решения задания

Решение [задания](https://github.com/sseezov/demo-docs/blob/main/%D0%A1%D0%BE%D0%BA%D1%80%D0%B0%D1%89%D0%B5%D0%BD%D0%BD%D0%BE%D0%B5%202025%20%D0%97%D0%B0%D0%BB%D0%B0%D0%BD%D0%B8%D0%B5%20%D1%81%20%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8.pdf) выполняется поэтапно.

### 1 этап

1 этап выполняется только средствами СУБД. Пример решения первого этапа представлен в файлах `sql.txt` и `erd.pdf` в корне данного каталога. Рекомендуется сразу создать txt файл и записывать туда скрипты для создания таблиц в БД, чтобы впоследствии скрипты можно было легко модифицировать или дропнуть БД и создать с их помощью новую.

Для удобства отладки рекомендуется выполнять скрипты SQL прямо в СУБД (в терминале, либо средствами PGAdmin). Не имеет большого смысла ставить ограничения NOT NULL для большинства полей в таблицах, однако возможно на первом этапе можно обозначить некоторые поля как UNIQUE, чтобы предохраниться в будущем от создания дубликатов.

Для решения задачи рассчета скидки партнера удобнее всего использовать sql, но если не позволяет знания, то всегда можно рассчитать все на сервере и отдать на фронт уже готовые данные.

Для получения ERD можно зайти в PGAdmin, кликнуть на нужную нам БД и нажать ERD for Database, затем в открывшемся меню нажать на download image. Получившееся изображение открыть средствами libre office и сохранить как PDF.

### 2 этап

На втором этапе нужно написать фронтенд, которые располагается в электроне в каталоге src/renderer и нечто вроде сервера, который располагается в каталоге src/main. Для связи между ними необходимо написать нужные нам апи в src/preload.

1. В src/main/index.js создайте асинхронную функцию для обращения к БД. Используйте библиотеку pg. Функция коннектиться к БД с помощью параметров `user, password, host, port, database`, которые вам должны предоставить. Рекомендуется выполнять подключение из каждой функции отдельно во избежание багов. 

2. В src/preload/index.js в объекте `api` нужно создать функцию, которая вызывает метод `ipcRenderer.invoke`, который передает строку и аргумент в main. В main же вызывается нужный обработчик с помощью подключения `ipcMain.handle`, который слушает вызов нужной строки.

3. Настройте фронтенд под себя. Создайте список и стили согласно заданию. Настройте роутинг в main.jsx. Вместо \<Router> используйте \<HashRouter>, иначе будут проблемы при запуске исполняемого файла сборки.
Создайте разметку и стили, отправьте запрос в src/main/index.js с помощью метода window.api(имя метода из api в src/preload/index.js). Проверьте, что метод работает, а именно, в main выведите результат вызова в консоль и смотрите на терминал ноды.

4. Добавьте картинку для главной страницы и иконку на окно. Иконку можно положить в resources в корне, и использовать в main, в методе создания окна указать свойство icon и предоставить путь до нее. А картинку можно положить в src/renderer/src/assets, а затем импортировать в компоненте и использовать.

### 3 этап

1. Создайте компонент \<CreatePartner/>, напишите валидацию (быстрее всего средствами нативного html) и проверьте его работу. Затем скопируйте его, и на его основе создайте компонент \<UpdatePartner/>. Измените нужные данные, проверьте работу. 

Ошибки с БД можно читать в main в наших кастомных функциях с помощью try, catch. А затем в catch возвращать `dialog.showErrorBox`, что выведет ошибку на фронте. Если ошибки нет, то можно вернуть `dialog.showMessageBox({ message: 'Успех! Партнер создан' })`.

Скомпилируйте установщик, проверьте его работу, положите его, sql скрипт и erd в папку, заархивируйте ее и перенесите архив на флешку.