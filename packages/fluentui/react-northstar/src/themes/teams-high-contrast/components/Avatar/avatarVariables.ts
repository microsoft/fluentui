import { AvatarVariables } from '../../../teams/components/Avatar/avatarVariables';

export const avatarVariables = (siteVariables: any): Partial<AvatarVariables> => ({
  avatarBorderColor: siteVariables.colors.white,
  avatarBorderWidth: '2px',
  statusBorderColor: siteVariables.colors.black,
  iconColor: siteVariables.colors.black,
  iconBackgroundColor: siteVariables.accessibleYellow,
});
