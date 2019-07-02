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
      src: `url('${baseUrl}fabric-icons-16-dff5b9a6.woff') format('woff')`
    },
    icons: {
      Coupon: '\uF7BC',
      VerifiedBrand: '\uF7BD',
      ReleaseGate: '\uF7BE',
      ReleaseGateCheck: '\uF7BF',
      ReleaseGateError: '\uF7C0',
      M365InvoicingLogo: '\uF7C1',
      FabricTextHighlightComposite: '\uF7DA',
      Dataflows: '\uF7DD',
      GenericScanFilled: '\uF7DE',
      DiagnosticDataBarTooltip: '\uF7DF',
      SaveToMobile: '\uF7E0',
      Orientation2: '\uF7E1',
      ScreenCast: '\uF7E2',
      ShowGrid: '\uF7E3',
      SnapToGrid: '\uF7E4',
      ContactList: '\uF7E5',
      NewMail: '\uF7EA',
      EyeShadow: '\uF7EB',
      FabricFolderConfirm: '\uF7FF',
      InformationBarriers: '\uF803',
      CommentActive: '\uF804',
      ColumnVerticalSectionEdit: '\uF806',
      WavingHand: '\uF807',
      ShakeDevice: '\uF80A',
      SmartGlassRemote: '\uF80B',
      Rotate90Clockwise: '\uF80D',
      Rotate90CounterClockwise: '\uF80E',
      CampaignTemplate: '\uF811',
      ChartTemplate: '\uF812',
      PageListFilter: '\uF813',
      SecondaryNav: '\uF814',
      ColumnVerticalSection: '\uF81E',
      SkypeCircleSlash: '\uF825',
      SkypeSlash: '\uF826',
      CustomizeToolbar: '\uF828',
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
      ReservationOrders: '\uF845',
      TabOneColumn: '\uF849',
      TabTwoColumn: '\uF84A',
      TabThreeColumn: '\uF84B',
      MicrosoftTranslatorLogoGreen: '\uF852',
      MicrosoftTranslatorLogoBlue: '\uF853',
      InternalInvestigation: '\uF854',
      AppleTVPlay: '\uF859',
      AppleTVMonitor: '\uF85A',
      AppleTVMicrophone: '\uF85B',
      AppleTVMenu: '\uF85C',
      AddReaction: '\uF85D',
      DecreaseIndentLegacy: '\uE290',
      IncreaseIndentLegacy: '\uE291',
      SizeLegacy: '\uE2B2'
    }
  };

  registerIcons(subset, options);
}
