import { AttachmentVariables } from '../../../teams/components/Attachment/attachmentVariables';

export default (siteVariables: any): Partial<AttachmentVariables> => ({
  textColor: siteVariables.colors.white,
  textColorHover: siteVariables.colors.white,

  backgroundColor: siteVariables.colors.grey[550],
  backgroundColorHover: siteVariables.colors.grey[500],
  borderColor: siteVariables.colors.onyx[700],
  boxShadow: siteVariables.shadowLevel1,

  actionColor: siteVariables.colors.white,
});
