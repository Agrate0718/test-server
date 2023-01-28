import chalk from 'chalk';

export default class Logging {
    public static log = (args: any) => this.info(args);
    public static info = (args: any) => console.log(chalk.blue(`[${new Date().toLocaleString()}] [INFO]`), typeof args == 'string' ? chalk.blueBright(args) : args);
    public static warn = (args: any) => console.log(chalk.yellow(`[${new Date().toLocaleString()}] [INFO]`), typeof args == 'string' ? chalk.yellowBright(args) : args);
    // public static error = (args: any) => console.log(chalk.red(`[${new Date().toLocaleString()}] [INFO]`), typeof args == 'string' ? chalk.redBright(args) : args);
    public static error = (namespace: string, message: string, object?: any) => {
        if (object) {
            console.error(`[${new Date().toLocaleString()}] [ERROR] [${namespace}] ${message}`, object);
        } else {
            console.error(`[${new Date().toLocaleString()}] [ERROR] [${namespace}] ${message}`);
        }
    };
}
