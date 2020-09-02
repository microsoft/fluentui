import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { AttachmentDescriptionStylesProps } from '../../../../components/Attachment/AttachmentDescription';
import { AttachmentVariables } from './attachmentVariables';

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
