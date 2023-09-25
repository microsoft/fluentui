import { svgIconClassName } from '@fluentui/react-icons-northstar';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import {
  attachmentProgressBarClassName,
  attachmentProgressContainerClassName,
  AttachmentStylesProps,
} from '../../../../components/Attachment/Attachment';
import { attachmentActionClassName } from '../../../../components/Attachment/AttachmentAction';
import { pxToRem } from '../../../../utils';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { AttachmentVariables } from './attachmentVariables';

export const attachmentStyles: ComponentSlotStylesPrepared<AttachmentStylesProps, AttachmentVariables> = {
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

      [`& .${attachmentProgressContainerClassName}`]: {
        borderBottomLeftRadius: v.borderRadius,
        borderBottomRightRadius: v.borderRadius,
        bottom: 0,
        height: v.progressHeight,
        left: 0,
        overflow: 'hidden',
        position: 'absolute',
        right: 0,
        [`& .${attachmentProgressBarClassName}`]: {
          background: v.progressColor,
          height: '100%',
          maxWidth: '100%',
          transition: 'width 0.2s',
        },
      },

      ...(p.actionable && {
        cursor: 'pointer',

        ':focus-visible': {
          ...borderFocusStyles[':focus-visible'],
          backgroundColor: v.focusBackgroundColor,
          color: v.focusColor,

          [`& .${attachmentActionClassName}`]: {
            color: v.focusColor,
          },

          [`& .${svgIconClassName}`]: {
            color: v.focusColor,
          },
        },

        ':hover': {
          backgroundColor: v.backgroundColorHover,
          color: v.textColorHover,

          [`& .${attachmentActionClassName}`]: {
            color: v.textColorHover,
          },

          [`& .${svgIconClassName}`]: {
            color: v.textColorHover,
          },
        },
      }),
    };
  },
};
