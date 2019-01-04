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
      fontFamily: `"FabricMDL2Icons-16"`,
      src: `url('${baseUrl}fabric-icons-16-7ed535b6.woff') format('woff')`
    },
    icons: {
      DuplicateRow: '\uF82A',
      RemoveFromTrash: '\uF82B',
      MailOptions: '\uF82C',
      Childof: '\uF82D',
      Footer: '\uF82E',
      Header: '\uF82F',
      BarChartVerticalFill: '\uF830',
      StackedColumnChart2Fill: '\uF831',
      PlainText: '\uF834',
      AccessibiltyChecker: '\uF835',
      DatabaseSync: '\uF842',
      TabOneColumn: '\uF849',
      TabTwoColumn: '\uF84A',
      TabThreeColumn: '\uF84B',
      DecreaseIndentLegacy: '\uE290',
      IncreaseIndentLegacy: '\uE291',
      SizeLegacy: '\uE2B2'
    }
  };

  registerIcons(subset, options);
}
