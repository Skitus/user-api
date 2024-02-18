#!/bin/bash

# Переход в директорию user-api
cd user-api

# Создание файла конфигурации из примера
cp src/config/configuration.example.ts src/config/configuration.ts

# Установка зависимостей
yarn

# Run DB migration don`t forget to set up right DB in src/config/configuration.ts file`
yarn migration:run

# Запуск в режиме разработки
yarn start:dev 