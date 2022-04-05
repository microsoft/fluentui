import { AvatarVariables } from '../../../teams/components/Avatar/avatarVariables';

export const avatarVariables = (siteVariables: any): Partial<AvatarVariables> => ({
  iconColor: siteVariables.colors.grey[800],
  iconBackgroundColor: siteVariables.colors.brand[400],
});
