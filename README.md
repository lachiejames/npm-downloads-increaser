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

NOTE: The npmJS Weekly Downloads are updated **once every 24 hours**, so results will not be instantly visible.

### Configuration options

| Property               | Description                                             | Example                     |
| ---------------------- | ------------------------------------------------------- | --------------------------- |
| packageName            | NPM package to increase the downloads of                | `"npm-downloads-increaser"` |
| numDownloads           | Number of times to download the package                 | `100000`                    |
| maxConcurrentDownloads | Amount of downloads to run in parallel at once          | `300`                       |
| downloadTimeout        | Max time (in ms) to wait for for a download to complete | `3000`                      |

**NOTE: slower** networks may perform better with a **lower** `maxConcurrentDownloads` and a **higher** `downloadTimeout`

### Demo

![Video demo](https://github.com/lachiejames/media-host/blob/main/npm-downloads-increaser/demo.gif?raw=true)

## Running in TypeScript

### Installing

Install the project using:

```
git clone https://github.com/lachiejames/npm-downloads-increaser.git
```

### Setting up your configuration

Open `npm-downloads-increaser.config.js` from the root directory, and populate the configuration options as shown in the table above.

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

### More info

Check out this blog post that describes `npm-downloads-increaser` in further detail:
https://lachiejames.com/faking-downloads-for-npm-packages/
