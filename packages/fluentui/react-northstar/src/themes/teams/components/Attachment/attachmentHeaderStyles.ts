import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { AttachmentHeaderStylesProps } from '../../../../components/Attachment/AttachmentHeader';
import type { AttachmentVariables } from './attachmentVariables';

export const attachmentHeaderStyles: ComponentSlotStylesPrepared<AttachmentHeaderStylesProps, AttachmentVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    display: 'block',

    fontSize: v.headerFontSize,
    fontWeight: v.headerFontWeight,
    lineHeight: v.headerLineHeight,
  }),
};
