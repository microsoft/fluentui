import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { AttachmentIconStylesProps } from '../../../../components/Attachment/AttachmentIcon';
import SvgIcon from '../../../../components/SvgIcon/SvgIcon';
import { AttachmentVariables } from './attachmentVariables';

const attachmentIconStyles: ComponentSlotStylesPrepared<AttachmentIconStylesProps, AttachmentVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    height: v.iconSize,
    width: v.iconSize,
    marginRight: v.iconSpace,

    [`& .${SvgIcon.className}`]: {
      height: '100%',
      width: '100%',
      '& svg': {
        height: '100%',
        width: '100%',
      },
    },
  }),
};

export default attachmentIconStyles;
