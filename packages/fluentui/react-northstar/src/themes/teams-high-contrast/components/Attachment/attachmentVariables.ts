import { AttachmentVariables } from '../../../teams/components/Attachment/attachmentVariables';

export default (siteVariables: any): Partial<AttachmentVariables> => ({
  borderColor: siteVariables.colors.white,
  backgroundColor: siteVariables.colors.black,
  backgroundColorHover: siteVariables.accessibleCyan,
  textColor: siteVariables.colors.white,
  textColorHover: siteVariables.colors.black,
  focusBackgroundColor: siteVariables.accessibleCyan,
  focusColor: siteVariables.colors.black,
  siblingsFocusColor: siteVariables.colors.black,
  siblingsHoverColor: siteVariables.colors.black,
  boxShadow: undefined,
  progressColor: siteVariables.accessibleGreen,
  progressHeight: 6,
  actionColor: siteVariables.colors.white,
});
