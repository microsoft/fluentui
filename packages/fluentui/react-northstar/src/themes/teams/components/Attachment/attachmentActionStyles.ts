import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { AttachmentActionStylesProps } from '../../../../components/Attachment/AttachmentAction';
import SvgIcon from '../../../../components/SvgIcon/SvgIcon';
import { AttachmentVariables } from './attachmentVariables';
import getIconFillOrOutlineStyles from 'src/themes/teams/getIconFillOrOutlineStyles';
import getBorderFocusStyles from 'src/themes/teams/getBorderFocusStyles';

const attachmentActionStyles: ComponentSlotStylesPrepared<AttachmentActionStylesProps, AttachmentVariables> = {
  root: ({ variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const iconFilledStyles = getIconFillOrOutlineStyles({ outline: false });
    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
      borderRadius: v.borderRadius,
    });

    return {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',

      ...getIconFillOrOutlineStyles({ outline: true }),
      [`& .${SvgIcon.className}`]: {
        color: v.textColor, // this breaks the color change on hover
      },

      ':hover': {
        ...iconFilledStyles,
        background: 'transparent',
      },

      ':focus': borderFocusStyles[':focus'],
      ':focus-visible': {
        ...iconFilledStyles,
        ...borderFocusStyles[':focus-visible'],
      },
    };
  },
};

export default attachmentActionStyles;
