import { TPlatformPageProps } from '@uifabric/example-app-base/lib/index2';

export enum Platforms {
  /** 'default' will be used when there are no platforms for the relevant page/area. */
  default = 'default',
  web = 'web',
  ios = 'ios',
  android = 'android'
}

export type TFabricPlatformPageProps = TPlatformPageProps<Platforms>;
