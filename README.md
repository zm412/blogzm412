# Blog

Проект Блог создан на ExpressJs + ReactJs + Postgresql.
Основные настройки базы данных расположены в папке expressapp/bd. Репозиторий включает в себя саму базу (data). Настройки сервера находятся в файле expressapp/app.js.
Действующие эндпоинты:

- "/get_posts" - передает клиенту информацию о всех постах;
- delete."/post/:id" - производит удаление поста по id;
- put."/post/:id" - производит обновление поста по id
- put."/post/:id" - производит обновление поста по id
- "/add_post" - добавление поста
- "/login" - авторизация пользователя
- "/register" - регистрация пользователя

Во фронтенде события не прослушиваются (надо обновлять страницу после каждого действия).

Запуск проекта.

1. git clone https://github.com/zm412/blogzm412.git
2. sudo docker-compose up --build
