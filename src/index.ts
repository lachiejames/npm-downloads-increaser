import { getConfigFromCli } from "./cli/prompts";
import { Config } from "./models/config.model";
import { run } from "./spammer";

getConfigFromCli().then((config: Config) => {
    run(config);
});
