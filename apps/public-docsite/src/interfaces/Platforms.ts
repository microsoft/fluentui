import { TPlatformPageProps } from '@fluentui/react-docsite-components/lib/index2';

export enum Platforms {
  /** 'default' will be used when there are no platforms for the relevant page/area. */
  default = 'default',
  web = 'web',
  webcomponents = 'webcomponents',
  ios = 'ios',
  android = 'android',
  mac = 'mac',
  windows = 'windows',
  cross = 'cross',
}

export type TFabricPlatformPageProps = TPlatformPageProps<Platforms>;
