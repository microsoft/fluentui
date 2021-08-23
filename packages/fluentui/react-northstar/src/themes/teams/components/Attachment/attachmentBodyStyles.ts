import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { AttachmentBodyStylesProps } from '../../../../components/Attachment/AttachmentBody';
import type { AttachmentVariables } from './attachmentVariables';

export const attachmentBodyStyles: ComponentSlotStylesPrepared<AttachmentBodyStylesProps, AttachmentVariables> = {
  root: (): ICSSInJSStyle => ({
    flex: 1,
  }),
};
