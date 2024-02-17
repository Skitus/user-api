#!/bin/bash

# Переходим в директорию user-api
cd /путь/к/user-api

# Устанавливаем зависимости с помощью yarn
yarn

# Запускаем приложение в режиме разработки
yarn start:dev &

# Ждем некоторое время для запуска приложения
sleep 10

# Удаляем папку node_modules
rm -rf node_modules

# Удаляем файл yarn.lock
rm yarn.lock

# Устанавливаем зависимости с помощью yarn
yarn

# Запускаем миграции базы данных
yarn migration:run

# Возвращаемся в консольное окно yarn start:dev
fg
