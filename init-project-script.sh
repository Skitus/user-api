#!/bin/bash

# Переходим в директорию user-api
cd user-api

# Создаем файл configuration.ts в директории src/config
mkdir -p src/config
touch src/config/configuration.ts

# Устанавливаем зависимости и запускаем проект в режиме разработки
yarn
yarn start:dev &

# Получаем PID процесса, запущенного в фоне, и останавливаем его через 5 секунд
PID=$!
sleep 5
kill $PID

# Удаляем папку node_modules, dist и файл yarn.lock
rm -rf node_modules dist yarn.lock

# Устанавливаем зависимости, запускаем миграцию и снова запускаем проект
yarn
yarn migration:run
yarn start:dev
