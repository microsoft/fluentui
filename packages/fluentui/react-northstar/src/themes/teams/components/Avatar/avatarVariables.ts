import { pxToRem, stringLiteralsArray } from '../../../../utils';
import { ItemType } from '../../../types';
import { TeamsSchemeMappingWithAreas } from '../../types';

export const labelColorAreas = stringLiteralsArray('foreground', 'background');
export type LabelColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof labelColorAreas>>;

export interface AvatarVariables {
  avatarBorderColor: string;
  avatarBorderWidth: string;
  initialsFontWeight: string;
  squareAvatarBorderRadius: string;
  iconColor: string;
  iconBackgroundColor: string;

  // Status
  statusBorderColor: string;
  statusBorderWidth: string;
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
  labelCircularRadius: string;
  labelColor: string;
  labelBackground: string;
}

export const avatarVariables = (siteVariables): AvatarVariables => ({
  avatarBorderColor: '',
  avatarBorderWidth: '0',
  initialsFontWeight: siteVariables.fontWeightSemibold,
  squareAvatarBorderRadius: siteVariables.borderRadiusMedium,
  iconColor: siteVariables.colors.white,
  iconBackgroundColor: siteVariables.colors.brand[600],

  statusBorderWidth: '2px',
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

  labelCircularRadius: pxToRem(9999),
  labelColor: 'rgba(0, 0, 0, 0.6)',
  labelBackground: 'rgb(232, 232, 232)',
});
