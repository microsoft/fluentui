import { IPlatform } from '@uifabric/example-app-base/lib/index2';
import { Platforms } from '../interfaces/Platforms';

export const platforms: { [x in Platforms]?: IPlatform } = {
  web: {
    name: 'Web',
    icon: 'WebLogo-platformPicker',
    color: '#258ede'
  },
  ios: {
    name: 'iOS',
    icon: 'AppleLogo-platformPicker',
    color: '#cf8fff'
  },
  android: {
    name: 'Android',
    icon: 'AndroidLogo-platformPicker',
    color: '#69e56e'
  }
};
