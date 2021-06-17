# npm-downloads-increaser

[![Build Status](https://dev.azure.com/lachiejames/npm-downloads-increaser/_apis/build/status/lachiejames.npm-downloads-increaser?branchName=main)](https://dev.azure.com/lachiejames/npm-downloads-increaser/_build/latest?definitionId=14&branchName=main) [![codecov](https://codecov.io/gh/lachiejames/npm-downloads-increaser/branch/main/graph/badge.svg?token=DDEENGQ89Y)](https://codecov.io/gh/lachiejames/npm-downloads-increaser) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Running from the command line

### Installing

Install `npm-downloads-increaser` globally using npm:

```
npm install -g npm-downloads-increaser
```

### Running

Setup configuration and run:

```
npm-downloads-increaser
```

Once you specify your configuration, this will start spamming downloads for the provided package in the npmjs registry. This will increase the popularity score of the npm package.

### Configuration options

| Property     | Description                             | Example    |
| ------------ | --------------------------------------- | ---------- |
| packageName  | Package to the popularity score of      | `"lodash"` |
| numDownloads | Number of times to download the package | `100000`   |

### Demo

![Video demo](/assets/demo.gif?raw=true)

## Running in TypeScript

### Installing

Install the project using:

```
git clone https://github.com/lachiejames/npm-downloads-increaser.git
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
