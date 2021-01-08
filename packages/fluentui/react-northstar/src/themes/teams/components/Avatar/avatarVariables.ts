import { pxToRem, stringLiteralsArray } from '../../../../utils';
import { TeamsSchemeMappingWithAreas } from '../../types';
import { ItemType } from '../../../types';
import { extendColorScheme, pickValuesFromColorScheme } from '../../../colorUtils';

export const labelColorAreas = stringLiteralsArray('foreground', 'background');
export type LabelColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof labelColorAreas>>;

export interface AvatarVariables {
  avatarBorderColor: string;
  avatarBorderWidth: string;
  squareAvatarBorderRadius: string;
  iconColor: string;
  iconBackgroundColor: string;
  // Status
  statusBorderColor: string;
  statusBorderWidth: string;
  statusIconSize: string;
  statusSuccessBackgroundColor: string;
  statusSuccessColor: string;
  statusInfoBackgroundColor: string;
  statusInfoColor: string;
  statusWarningBackgroundColor: string;
  statusWarningColor: string;
  statusErrorBackgroundColor: string;
  statusErrorColor: string;
  statusBackgroundColor: string;
  statusColor: string;
  // Image
  imageWidth: string;
  imageHeight: string;
  imageAvatarRadius: string;
  imageAvatarSize: string;
  imageCircularRadius: string;
  // Label
  labelColorScheme: LabelColorSchemeMapping;
  labelCircularRadius: string;
  labelIconSize: string;
  labelPadding: string;
  labelStartPaddingLeft: string;
  labelEndPaddingRight: string;
  labelHeight: string;
}

export const avatarVariables = (siteVariables): AvatarVariables => {
  const colorScheme = extendColorScheme(siteVariables.colorScheme, {
    default: {
      background: 'rgba(0, 0, 0, 0.6)',
      foreground: 'rgb(232, 232, 232)',
    },
    brand: {
      background: siteVariables.colorScheme.brand.foreground4,
    },
    red: {
      background: siteVariables.colorScheme.red.foreground1,
    },
  });

  return {
    avatarBorderColor: '',
    avatarBorderWidth: '0',
    squareAvatarBorderRadius: pxToRem(3),
    iconColor: siteVariables.colors.white,
    iconBackgroundColor: siteVariables.colors.brand[600],
    statusBorderWidth: '2px',
    statusIconSize: pxToRem(7),
    statusBorderColor: siteVariables.bodyBackground,
    statusSuccessBackgroundColor: siteVariables.colorScheme.green.background,
    statusSuccessColor: siteVariables.colorScheme.green.foreground1,
    statusInfoBackgroundColor: siteVariables.colorScheme.brand.background,
    statusInfoColor: siteVariables.colorScheme.default.foreground2,
    statusWarningBackgroundColor: siteVariables.colorScheme.yellow.background,
    statusWarningColor: siteVariables.colorScheme.yellow.foreground2,
    statusErrorBackgroundColor: siteVariables.colorScheme.red.background,
    statusErrorColor: siteVariables.colorScheme.red.foreground2,
    statusBackgroundColor: siteVariables.colorScheme.default.background5,
    statusColor: siteVariables.colorScheme.default.foreground4,
    imageWidth: undefined,
    imageHeight: undefined,
    imageAvatarRadius: pxToRem(9999),
    imageAvatarSize: pxToRem(32),
    imageCircularRadius: pxToRem(9999),
    labelColorScheme: pickValuesFromColorScheme(colorScheme, labelColorAreas),
    labelCircularRadius: pxToRem(9999),
    labelIconSize: pxToRem(16),
    labelPadding: `0 ${pxToRem(4)} 0 ${pxToRem(4)}`,
    labelStartPaddingLeft: '0px',
    labelEndPaddingRight: '0px',
    labelHeight: pxToRem(20),
  };
};
