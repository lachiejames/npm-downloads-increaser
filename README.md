# npm-popularity-increaser

[![Build Status](https://dev.azure.com/lachiejames/npm-popularity-increaser/_apis/build/status/lachiejames.npm-popularity-increaser?branchName=main)](https://dev.azure.com/lachiejames/npm-popularity-increaser/_build/latest?definitionId=14&branchName=main) [![codecov](https://codecov.io/gh/lachiejames/npm-popularity-increaser/branch/main/graph/badge.svg?token=DDEENGQ89Y)](https://codecov.io/gh/lachiejames/npm-popularity-increaser) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Running from the command line

### Installing

Install `npm-popularity-increaser` globally using npm:

```
npm install -g npm-popularity-increaser
```

### Running

Setup configuration and run:

```
npm-popularity-increaser
```

Once you specify your configuration, this will start spamming downloads for the provided package in the npmjs registry. This will increase the popularity score of the npm package.

### Configuration options

| Property             | Description                                      | Example    |
| -------------------- | ------------------------------------------------ | ---------- |
| packageName          | Package to the popularity score of               | `"lodash"` |
| numDownloads         | Number of times to download the package          | `100000`   |
| timeBetweenDownloads | Number of milliseconds to wait between downloads | `5000`     |

### Demo

![Video demo](/assets/demo.gif?raw=true)

## Running in TypeScript

### Installing

Install the project using:

```
git clone https://github.com/lachiejames/npm-popularity-increaser.git
```

### Running locally

Installing dependencies:

```
yarn
```

Compiling to JavaScript:

```
yarn build
```

Running with Node:

```
yarn start
```

Running tests:

```
yarn test
```