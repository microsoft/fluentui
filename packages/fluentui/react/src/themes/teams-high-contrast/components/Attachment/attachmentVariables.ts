import { AttachmentVariables } from '../../../teams/components/Attachment/attachmentVariables'

export default (siteVariables: any): Partial<AttachmentVariables> => ({
  borderColor: siteVariables.colors.white,
  backgroundColor: siteVariables.colors.black,
  backgroundColorHover: siteVariables.accessibleYellow,
  textColor: siteVariables.colors.white,
  textColorHover: siteVariables.colors.black,
  boxShadow: undefined,
  progressColor: siteVariables.accessibleGreen,
  progressHeight: 6,
})
