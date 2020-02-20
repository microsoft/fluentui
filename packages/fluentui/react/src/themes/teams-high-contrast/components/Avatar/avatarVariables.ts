import { AvatarVariables } from '../../../teams/components/Avatar/avatarVariables'

export default (siteVariables: any): Partial<AvatarVariables> => ({
  avatarBorderColor: siteVariables.colors.white,
  avatarBorderWidth: '2px',
  statusBorderColor: siteVariables.colors.black,
})
