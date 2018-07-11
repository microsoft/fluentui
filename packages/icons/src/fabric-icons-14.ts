// Your use of the content in the files referenced here is subject to the terms of the license at https://aka.ms/fabric-assets-license

// tslint:disable:max-line-length

import { IIconOptions, IIconSubset, registerIcons } from '@uifabric/styling';

export function initializeIcons(baseUrl: string = '', options?: IIconOptions): void {
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
      src: `url('${baseUrl}fabric-icons-14-eb4d1150.woff') format('woff')`
    },
    icons: {
      DeleteRowsMirrored: '\uF650',
      DeleteTable: '\uF651',
      VersionControlPush: '\uF664',
      WhiteBoardApp16: '\uF673',
      WhiteBoardApp32: '\uF674',
      InsertSignatureLine: '\uF677',
      ArrangeByFrom: '\uF678',
      Phishing: '\uF679',
      CreateMailRule: '\uF67A',
      PublishCourse: '\uF699',
      DictionaryRemove: '\uF69A',
      UserRemove: '\uF69B',
      UserEvent: '\uF69C',
      Encryption: '\uF69D',
      D365TalentLearn: '\uF6BB',
      D365TalentInsight: '\uF6BC',
      D365TalentHRCore: '\uF6BD',
      BacklogList: '\uF6BF',
      ButtonControl: '\uF6C0',
      TableGroup: '\uF6D9',
      MountainClimbing: '\uF6DB',
      TagUnknown: '\uF6DF',
      TagUnknownMirror: '\uF6E0',
      TagUnknown12: '\uF6E1',
      TagUnknown12Mirror: '\uF6E2',
      Link12: '\uF6E3',
      Presentation: '\uF6E4',
      Presentation12: '\uF6E5',
      Lock12: '\uF6E6',
      BuildDefinition: '\uF6E9',
      ReleaseDefinition: '\uF6EA',
      SaveTemplate: '\uF6EC',
      UserGauge: '\uF6ED',
      BlockedSiteSolid12: '\uF70A',
      TagSolid: '\uF70E',
      OfficeChat: '\uF70F',
      OfficeChatSolid: '\uF710',
      MailSchedule: '\uF72E'
    }
  };

  registerIcons(subset, options);
}
