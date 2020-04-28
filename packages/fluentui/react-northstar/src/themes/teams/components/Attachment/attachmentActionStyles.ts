import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { svgIconClassName } from '@fluentui/react-icons-northstar';

import { AttachmentActionStylesProps } from '../../../../components/Attachment/AttachmentAction';
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles';
import getBorderFocusStyles from '../../getBorderFocusStyles';
import { AttachmentActionVariables } from './attachmentActionVariables';

const attachmentActionStyles: ComponentSlotStylesPrepared<AttachmentActionStylesProps, AttachmentActionVariables> = {
  root: ({ variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const iconFilledStyles = getIconFillOrOutlineStyles({ outline: false });
    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
      borderRadius: v.borderRadius,
    });

    return {
      [`& .${svgIconClassName}`]: {
        color: v.textColor, // this breaks the color change on hover
      },

      ...getIconFillOrOutlineStyles({ outline: true }),

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
