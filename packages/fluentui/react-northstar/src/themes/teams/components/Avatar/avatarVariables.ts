import { pxToRem } from '../../../../utils';

export interface AvatarVariables {
  avatarBorderColor: string;
  avatarBorderWidth: string;
  squareAvatarBorderRadius: string;
  statusBorderColor: string;
  statusBorderWidth: string;
}

export default (siteVariables): AvatarVariables => ({
  avatarBorderColor: '',
  avatarBorderWidth: '0',
  squareAvatarBorderRadius: pxToRem(3),
  statusBorderColor: siteVariables.bodyBackground,
  statusBorderWidth: '2px',
});
