import { Container, interfaces } from "inversify";

export enum MorganMode {
  DEV = 'dev',
  TINY = 'tiny',
  COMMON = 'common',
  COMBINED = 'combined',
  SHORT = 'short'
}

export interface IApplicationOptions {
  containerOpts: interfaces.ContainerOptions,
  morgan: {
    mode: MorganMode 
  }
}

export abstract class Application {
  protected container: Container;

  constructor(options: IApplicationOptions ) {
    this.container = new Container(options.containerOpts);
    console.clear();
    this.configureServices(this.container);
    this.setup(options);
  }

  abstract configureServices(container: Container): void
  abstract setup(options: IApplicationOptions): Promise<void> | void
}
