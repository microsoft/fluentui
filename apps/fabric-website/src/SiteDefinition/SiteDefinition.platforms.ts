import { IPlatform } from '@uifabric/example-app-base/lib/index2';
import { Platforms } from '../interfaces/Platforms';

export const platforms: { [x in Platforms]?: IPlatform } = {
  web: {
    name: 'Web',
    icon: 'WebLogo-platformPicker',
    color: '#28A8EA',
  },
  windows: {
    name: 'Windows',
    icon: 'WinLogo-platformPicker',
    color: '#4fe5ff',
  },
  ios: {
    name: 'iOS',
    icon: 'AppleLogo-platformPicker',
    color: '#cf8fff',
  },
  android: {
    name: 'Android',
    icon: 'AndroidLogo-platformPicker',
    color: '#69e56e',
  },
  mac: {
    name: 'macOS',
    icon: 'MacLogo-platformPicker',
    color: '#cf8fff',
  },
  cross: {
    name: 'Cross-platform',
    icon: 'CrossPlatformLogo-platformPicker',
    color: '#28a8ea',
  },
};
