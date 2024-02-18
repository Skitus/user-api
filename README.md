# NODE JS VERSION 18.18.0

### To init project you need to do such following instructions:
```bash 
1. git clone git@github.com:Skitus/user-api.git (or https)
2. cd user-api
3. chmod +x init-project-script.sh (see please windows example or below you will see how to run project mannualy)
4. ./init-project-script.sh 
```
### After you will get an error that your DB is not set up. Please stop the application and set up DB, than run 
```bash
yarn migration:run
and then 
yarn start:dev
```

# To manually set up and run the project without using a script, follow these steps, before clone project please:

### Change Directory: Navigate to the user-api directory from your terminal.
```bash
$ cd user-api
```

### Create Configuration File: Copy the configuration.example.ts file located in src/config to the same directory but rename it to configuration.ts. This creates your project configuration based on the provided example (this file used instead of .env file).
```bash
$ cp src/config/configuration.example.ts src/config/configuration.ts
```

### Install Dependencies: Use Yarn to install the project's dependencies. Ensure you have Yarn installed on your system.
```bash
$ yarn
```

### Start the Development Server: Launch the project in development mode with Yarn. This will start the application on a local development server (HERE AFTER RUN THIS COMMAND YOU WILL GET AN ERROR IT IS OK RUN JUST INSTRUCTION).
```bash
yarn start:dev
```

### Stop the Development Server: If you need to stop the development server, you can usually do so by pressing Ctrl + C in the terminal. If that doesn't work, you may need to find the process ID (PID) of the server and kill it using pkill or another method. For example, to kill all Yarn processes, you could use:
```bash
pkill -f yarn
Or you can just stop development mode manually (ctrl + C) 
```

### Clean Up: After stopping the development server, you might want to clean up the project directory by removing the node_modules directory, the dist directory, and the yarn.lock file. These steps ensure that you have a fresh start for the next installation or build.
```bash
$ rm -rf node_modules
$ rm -rf dist
$ rm -f yarn.lock
```

### Reinstall Dependencies: To reinstall the project dependencies, simply run Yarn again.
```bash
$ yarn
```

### Before use such command  "yarn migration:run" please set up DB credentials in configuration.ts file that placed in src/config folder, your configuration file will look such like this (Instead of using .env file):
```bash
-- src/config/configuration.ts

export default () => ({
  port: 5000,
  db: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'user-api',
    username: 'postgres',
    password: '123',
    synchronize: false,
    entities: ['dist/entity//*.{ts,js}'],
    ormEntities: ['src/entity//*.ts'],
    migrations: ['src/migration//*.ts'],
    subscribers: ['src/subscriber//*.ts'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
  },
  swagger: {
    title: 'User API',
    description: 'This is a straightforward OpenAPI designed for the User API',
  },
  jwt: {
    secretAccessToken: 'skitus',
    expiresInAccessToken: '1h',
    secretRefreshToken: 'skitus2',
    expiresInRefreshToken: '7d',
  },
});

```
### Run Migrations: If your project uses database migrations, run them with Yarn to update your database schema.
```bash
$ yarn migration:run
```
### Start the Development Server Again: Finally, start the development server again to continue working on the project.
```bash
yarn start:dev
```

### Please ensure that you have Node.js version 18.18.0 installed on your system to meet the project's compatibility requirements. You can check your Node.js version by running node -v in your terminal. If you need to manage multiple versions of Node.js on your system, consider using a version manager such as nvm (Node Version Manager).

### By following these steps, you should be able to manually set up and run the project without the need for an automated script.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.


## License

Nest is [MIT licensed](LICENSE).
