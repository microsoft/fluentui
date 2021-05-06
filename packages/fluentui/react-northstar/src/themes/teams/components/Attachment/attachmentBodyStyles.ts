import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { AttachmentBodyStylesProps } from '../../../../components/Attachment/AttachmentBody';
import { AttachmentVariables } from './attachmentVariables';

export const attachmentBodyStyles: ComponentSlotStylesPrepared<AttachmentBodyStylesProps, AttachmentVariables> = {
  root: (): ICSSInJSStyle => ({
    flex: 1,
  }),
};
