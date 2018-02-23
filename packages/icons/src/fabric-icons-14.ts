  // Your use of the content in the files referenced here is subject to the terms of the license at https://aka.ms/fabric-assets-license

// tslint:disable:max-line-length

import {
  IIconOptions,
  IIconSubset,
  registerIcons
} from '@uifabric/styling/lib/index';

export function initializeIcons(
  baseUrl: string = '',
  options?: IIconOptions
): void {
  const subset: IIconSubset = {
    style: {
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      fontStyle: 'normal',
      fontWeight: 'normal',
      speak: 'none'
    },
    fontFace: {
      fontFamily: `"FabricMDL2Icons-14"`,
      src: `url('${baseUrl}fabric-icons-14-95a97fbd.woff') format('woff')`,
    },
    icons: {
      'SVNLogo': '\uF662',
      'JenkinsLogo': '\uF663',
      'VersionControlPush': '\uF664',
      'ExternalGit': '\uF665',
      'WhiteBoardApp16': '\uF673',
      'WhiteBoardApp32': '\uF674',
      'InsertSignatureLine': '\uF677',
      'ArrangeByFrom': '\uF678',
      'Phishing': '\uF679',
      'CreateMailRule': '\uF67A',
      'PublishCourse': '\uF699',
      'DictionaryRemove': '\uF69A',
      'UserRemove': '\uF69B',
      'UserEvent': '\uF69C',
      'Encryption': '\uF69D'
    }
  };

  registerIcons(subset, options);
}
