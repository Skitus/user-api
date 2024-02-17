#!/bin/bash

# Переход в директорию user-api
cd user-api

# Создание файла конфигурации из примера
cp src/config/configuration.example.ts src/config/configuration.ts

# Установка зависимостей
yarn

# Запуск в режиме разработки
yarn start:dev &

# Сохранение PID процесса
YARN_PID=$!

# Ждем некоторое время, чтобы процесс успел стартовать
sleep 10

# Остановка процесса
pkill -P $YARN_PID yarn

# Удаление папки node_modules, dist и файла yarn.lock
rm -rf node_modules
rm -rf dist
rm -f yarn.lock

# Установка зависимостей
yarn

# Запуск миграции
yarn migration:run

# Запуск в режиме разработки
yarn start:dev
