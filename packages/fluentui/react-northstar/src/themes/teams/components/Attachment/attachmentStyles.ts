import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { AttachmentStylesProps } from '../../../../components/Attachment/Attachment';
import AttachmentAction from '../../../../components/Attachment/AttachmentAction';
import { AttachmentVariables } from './attachmentVariables';
import { pxToRem } from '../../../../utils';
import SvgIcon from '../../../../components/SvgIcon/SvgIcon';
import getBorderFocusStyles from '../../getBorderFocusStyles';

const attachmentStyles: ComponentSlotStylesPrepared<AttachmentStylesProps, AttachmentVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
      borderRadius: v.borderRadius,
    });

    return {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      width: '100%',
      maxWidth: pxToRem(440),
      minHeight: pxToRem(48),
      padding: v.padding,
      marginBottom: pxToRem(2),
      marginRight: pxToRem(2),
      background: v.backgroundColor,
      color: v.textColor,
      boxShadow: v.boxShadow,
      border: `${siteVariables.borderWidth} solid ${v.borderColor}`,
      borderRadius: v.borderRadius,

      ...borderFocusStyles,

      '& .ui-attachment__progress': {
        transition: 'width 0.2s',
        position: 'absolute',
        display: 'block',
        bottom: 0,
        left: 0,
        maxWidth: '100%',
        height: pxToRem(v.progressHeight),
        background: v.progressColor,
      },

      ...(p.actionable && {
        cursor: 'pointer',

        ':focus-visible': {
          ...borderFocusStyles[':focus-visible'],
          backgroundColor: v.focusBackgroundColor,
          color: v.focusColor,

          [`& .${AttachmentAction.deprecated_className}`]: {
            color: v.siblingsFocusColor,
          },

          [`& .${SvgIcon.deprecated_className}`]: {
            color: v.siblingsFocusColor,
          },
        },

        ':hover': {
          background: v.backgroundColorHover,
          color: v.textColorHover,

          [`& .${AttachmentAction.deprecated_className}`]: {
            color: v.siblingsHoverColor,
          },

          [`& .${SvgIcon.deprecated_className}`]: {
            color: v.siblingsHoverColor,
          },
        },
      }),
    };
  },
};

export default attachmentStyles;
