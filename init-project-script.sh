#!/bin/bash

# Переход в директорию user-api
cd user-api

# Создание файла configuration.ts
echo "Создание файла configuration.ts"
touch configuration.ts

# Установка зависимостей через yarn
echo "Установка зависимостей"
yarn

# Запуск в режиме разработки
echo "Запуск приложения в режиме разработки"
yarn start:dev &

# ID последней запущенной задачи
YARN_START_DEV_PID=$!

# Ожидание, например, 10 секунд перед остановкой (настраивается)
sleep 10

# Остановка yarn start:dev
echo "Остановка yarn start:dev"
kill $YARN_START_DEV_PID

# Удаление папки node_modules, папки dist и файла yarn.lock
echo "Очистка директории"
rm -rf node_modules dist yarn.lock

# Повторная установка зависимостей и миграция
echo "Повторная установка зависимостей"
yarn
echo "Выполнение миграций"
yarn migration:run

# Повторный запуск в режиме разработки
echo "Повторный запуск в режиме разработки"
yarn start:dev
