import { AttachmentActionVariables } from '../../../teams/components/Attachment/attachmentActionVariables';

const attachmentActionVariables = (siteVariables: any): AttachmentActionVariables => ({
  textColor: siteVariables.colors.white,
});

export default attachmentActionVariables;
