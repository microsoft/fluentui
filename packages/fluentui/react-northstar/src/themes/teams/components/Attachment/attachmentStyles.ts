import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { AttachmentStylesProps } from '../../../../components/Attachment/Attachment';
import { AttachmentVariables } from './attachmentVariables';
import { pxToRem } from '../../../../utils';
import SvgIcon from '../../../../components/SvgIcon/SvgIcon';
import getBorderFocusStyles from '../../getBorderFocusStyles';
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles';
import Button from '../../../../components/Button/Button';

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

      ...(p.actionable && {
        cursor: 'pointer',

        ':focus-visible': {
          ...borderFocusStyles[':focus-visible'],
          backgroundColor: v.focusBackgroundColor,
          color: v.focusColor,

          [`& .${Button.className}`]: {
            color: v.siblingsFocusColor,
          },

          [`& .${SvgIcon.className}`]: {
            color: v.siblingsFocusColor,
          },
        },

        ':hover': {
          background: v.backgroundColorHover,
          color: v.textColorHover,

          [`& .${Button.className}`]: {
            color: v.siblingsHoverColor,
          },

          [`& .${SvgIcon.className}`]: {
            color: v.siblingsHoverColor,
          },
        },
      }),
    };
  },

  content: (): ICSSInJSStyle => ({
    flex: 1,
  }),

  header: ({ variables: v }): ICSSInJSStyle => ({
    fontSize: v.headerFontSize,
    fontWeight: v.headerFontWeight,
    lineHeight: v.headerLineHeight,
  }),

  description: ({ variables: v }): ICSSInJSStyle => ({
    display: 'block',
    fontSize: v.descriptionFontSize,
    fontWeight: v.descriptionFontWeight,
    lineHeight: v.descriptionLineHeight,
  }),

  icon: ({ variables: v }): ICSSInJSStyle => ({
    flex: '0 0 auto',
    height: v.iconSize,
    width: v.iconSize,
    [`& .${SvgIcon.className}`]: {
      height: '100%',
      width: '100%',
      '& svg': {
        height: '100%',
        width: '100%',
      },
    },
    marginRight: v.iconSpace,
  }),

  action: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const iconFilledStyles = getIconFillOrOutlineStyles({ outline: false });
    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
      borderRadius: v.borderRadius,
    });

    return {
      [`& .${SvgIcon.className}`]: {
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

  progress: ({ props: p, variables: v }): ICSSInJSStyle => ({
    transition: 'width 0.2s',
    position: 'absolute',
    display: 'block',
    bottom: 0,
    left: 0,
    maxWidth: '100%',
    height: pxToRem(v.progressHeight),
    background: v.progressColor,
  }),
};

export default attachmentStyles;
