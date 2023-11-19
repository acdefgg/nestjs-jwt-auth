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

Nest.js JWT authentication application example using docker-compose, redis and postgres.

## Сertificate generation

First, you need to generate a private and public JWT RS256 key: `private-key.pem` and `public-key.pem`.

## Building the app

```bash
$ docker-compose build
```

## Running the app

```bash
$ docker-compose up
```

## API Endpoints

### 1. Authentication

#### 1.1 Sign up

- **Endpoint**: `POST /auth/sign-up`
- **Description**: Register a new user.
- **Request**:
    - Body:
      ```json
      {
        "email": "mail@example.com",
        "password": "example_password"
      }
      ```
#### 1.2 Sign in

- **Endpoint**: `POST /auth/sign-in`
- **Description**: Log in with existing credentials.
- **Request**:
    - Body:
      ```json
      {
        "email": "mail@example.com",
        "password": "example_password"
      }
      ```
#### 1.3 Refresh token

- **Endpoint**: `POST /auth/refresh-token`
- **Description**: Get new access and refresh tokens by providing a valid refresh token.
- **Request**:
    - Body:
      ```json
      {
        "refresh_token": "example_refresh_token"
      }
      ```
#### 1.4 Sign Out

- **Endpoint**: `POST /auth/sign-out`
- **Description**: Invalidate the refresh token, effectively signing the user out.
- **Request**:
    - Body:
      ```json
      {
        "refresh_token": "example_refresh_token"
      }
      ```
### 2. Resource Endpoints

#### 2.1 Get User Info

- **Endpoint**: `GET /user/me`
- **Description**: Retrieve information about user.
- **Request**:
    - Body:
      ```json
      {
        "access_token": "example_access_token"
      }
      ```
