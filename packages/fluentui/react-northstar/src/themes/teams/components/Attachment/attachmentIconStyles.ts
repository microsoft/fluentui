import { svgIconClassName } from '@fluentui/react-icons-northstar';
import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { AttachmentIconStylesProps } from '../../../../components/Attachment/AttachmentIcon';
import type { AttachmentVariables } from './attachmentVariables';

export const attachmentIconStyles: ComponentSlotStylesPrepared<AttachmentIconStylesProps, AttachmentVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    height: v.iconSize,
    width: v.iconSize,
    marginRight: v.iconSpace,

    [`& .${svgIconClassName}`]: {
      height: '100%',
      width: '100%',
      '& svg': {
        height: '100%',
        width: '100%',
      },
    },
  }),
};
