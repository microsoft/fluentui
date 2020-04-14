import { pxToRem } from '../../../../utils';
import { ButtonVariables } from '../Button/buttonVariables';

export type AttachmentActionVariables = Partial<ButtonVariables>;

const attachmentActionVariables = (siteVariables: any): AttachmentActionVariables => ({
  borderRadius: pxToRem(3),
  textColor: siteVariables.colors.grey[750],
});

export default attachmentActionVariables;
