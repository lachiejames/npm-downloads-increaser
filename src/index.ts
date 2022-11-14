import { run } from "./spammer/spammer";
import { setConfig, getConfig } from "./config";
import { Config } from "./models/config.model";

 export async function runWithConfig(config: Config) {
    setConfig(config);
    await run();
 }

 export { run, setConfig, getConfig };