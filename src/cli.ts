#!/usr/bin/env node

import { getConfigFromCli } from "./cli/prompts";
import { setConfig } from "./config";
import { Config } from "./models/config.model";
import { run } from "./spammer/spammer";

getConfigFromCli().then((config: Config) => {
    setConfig(config);
    run();
});
