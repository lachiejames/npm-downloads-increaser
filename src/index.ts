import { getConfigFromCli } from "./cli";
import { Config } from "./config.model";
import { run } from "./spammer";

getConfigFromCli().then((config: Config) => {
    run(config);
});
