import { pxToRem } from '../../../../utils';

export interface AvatarVariables {
  avatarBorderColor: string;
  avatarBorderWidth: string;
  squareAvatarBorderRadius: string;
  statusBorderColor: string;
  statusBorderWidth: string;
  iconColor: string;
  iconBackgroundColor: string;
  statusIconSize: string;
  statusSuccessBackgroundColor: string;
  statusSuccessTextColor: string;
  statusInfoBackgroundColor: string;
  statusInfoTextColor: string;
  statusWarningBackgroundColor: string;
  statusWarningTextColor: string;
  statusErrorBackgroundColor: string;
  statusErrorTextColor: string;
  statusDefaultBackgroundColor: string;
  statusDefaultTextColor: string;
}

export const avatarVariables = (siteVariables): AvatarVariables => ({
  avatarBorderColor: '',
  avatarBorderWidth: '0',
  squareAvatarBorderRadius: pxToRem(3),
  iconColor: siteVariables.colors.white,
  iconBackgroundColor: siteVariables.colors.brand[600],
  statusBorderWidth: '2px',
  statusIconSize: pxToRem(7),
  statusBorderColor: siteVariables.bodyBackground,
  statusSuccessBackgroundColor: siteVariables.colorScheme.green.background,
  statusSuccessTextColor: siteVariables.colorScheme.green.foreground1,
  statusInfoBackgroundColor: siteVariables.colorScheme.brand.background,
  statusInfoTextColor: siteVariables.colorScheme.default.foreground2,
  statusWarningBackgroundColor: siteVariables.colorScheme.yellow.background,
  statusWarningTextColor: siteVariables.colorScheme.yellow.foreground2,
  statusErrorBackgroundColor: siteVariables.colorScheme.red.background,
  statusErrorTextColor: siteVariables.colorScheme.red.foreground2,
  statusDefaultBackgroundColor: siteVariables.colorScheme.default.background5,
  statusDefaultTextColor: siteVariables.colorScheme.default.foreground4,
});
