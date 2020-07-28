import { pxToRem } from '../../../../utils';

export interface AvatarVariables {
  avatarBorderColor: string;
  avatarBorderWidth: string;
  squareAvatarBorderRadius: string;
  statusBorderColor: string;
  statusBorderWidth: string;
  iconColor: string;
  iconBackgroundColor: string;
}

export const avatarVariables = (siteVariables): AvatarVariables => ({
  avatarBorderColor: '',
  avatarBorderWidth: '0',
  squareAvatarBorderRadius: pxToRem(3),
  statusBorderColor: siteVariables.bodyBackground,
  statusBorderWidth: '2px',
  iconColor: siteVariables.colors.white,
  iconBackgroundColor: siteVariables.colors.brand[600],
});
