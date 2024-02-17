#!/bin/bash

# Переход в директорию user-api
cd user-api

# Установка зависимостей
yarn

# Запуск в режиме разработки
yarn start:dev &

# Сохраняем PID запущенного процесса
PID=$!

# Ждем некоторое время, предположим 5 секунд, или же столько, сколько необходимо
sleep 3

# Останавливаем процесс
kill $PID

# Удаление папки node_modules, dist и файла yarn.lock
rm -rf node_modules dist yarn.lock

# Повторная установка зависимостей
yarn

# Запуск миграций
yarn migration:run

# Повторный запуск в режиме разработки
yarn start:dev
