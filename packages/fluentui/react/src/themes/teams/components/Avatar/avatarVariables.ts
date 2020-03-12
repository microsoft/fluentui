import { pxToRem } from '../../../../utils';

export interface AvatarVariables {
  avatarBorderRadius: string;
  avatarBorderColor: string;
  avatarBorderWidth: string;
  statusBorderColor: string;
  statusBorderWidth: string;
}

export default (siteVariables): AvatarVariables => ({
  avatarBorderRadius: pxToRem(4),
  avatarBorderColor: '',
  avatarBorderWidth: '0',
  statusBorderColor: siteVariables.bodyBackground,
  statusBorderWidth: '2px'
});
