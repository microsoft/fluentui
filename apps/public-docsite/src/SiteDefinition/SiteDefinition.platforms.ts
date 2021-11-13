import { IPlatform } from '@fluentui/react-docsite-components/lib/index2';
import { Platforms } from '../interfaces/Platforms';

export const platforms: { [x in Platforms]?: IPlatform } = {
  web: {
    name: 'React',
    icon: 'WebLogo-platformPicker',
    color: '#28A8EA',
  },
  webcomponents: {
    name: 'Web Components',
    icon: 'WebLogo-platformPicker',
    color: '#f11d69',
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
