export interface AvatarVariables {
  avatarBorderColor: string
  avatarBorderWidth: string
  statusBorderColor: string
  statusBorderWidth: string
}

export default (siteVariables): AvatarVariables => ({
  avatarBorderColor: '',
  avatarBorderWidth: '0',
  statusBorderColor: siteVariables.bodyBackground,
  statusBorderWidth: '2px',
})
