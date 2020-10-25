# RESTful API Node Server Starter

A starter project for quickly building production-ready RESTful APIs using TypeScript, Node.js and Express.

## Features

- **TypeScript**
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Dependency injection**: using [typedi](https://github.com/typestack/typedi)
- **Gracefully shutdown**: Gracefully terminate the server using [http-terminator](https://github.com/gajus/http-terminator)
- **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io/)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Linting**: with [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)

## Getting Started

### Installation

1. Clone the repo
2. Install the dependencies:

```bash
npm install
```

3. Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

### Commands

Running locally:

```bash
npm run start:dev
```

Running in production:

```bash
npm run start:prod
```

## License

[MIT](LICENSE)