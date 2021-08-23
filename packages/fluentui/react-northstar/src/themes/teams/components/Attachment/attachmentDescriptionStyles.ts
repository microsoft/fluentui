import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { AttachmentDescriptionStylesProps } from '../../../../components/Attachment/AttachmentDescription';
import type { AttachmentVariables } from './attachmentVariables';

export const attachmentDescriptionStyles: ComponentSlotStylesPrepared<
  AttachmentDescriptionStylesProps,
  AttachmentVariables
> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    display: 'block',

    fontSize: v.descriptionFontSize,
    fontWeight: v.descriptionFontWeight,
    lineHeight: v.descriptionLineHeight,
  }),
};
