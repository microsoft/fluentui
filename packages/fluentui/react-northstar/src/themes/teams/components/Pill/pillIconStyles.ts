import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { PillIconStylesProps } from '../../../../components/Pill/PillIcon';
import { PillVariables } from './pillVariables';
import { svgIconClassName } from '@fluentui/react-icons-northstar';

export const pillIconStyles: ComponentSlotStylesPrepared<PillIconStylesProps, PillVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    border: 'none',
    background: 'transparent',
    margin: v.iconMargin,
    width: v.iconWidth,
    cursor: 'pointer',
    outline: 'none',
    ...((p.size === 'small' || p.size === 'smaller') && {
      width: v.smallOrSmallerIconWidth,
    }),

    ...(p.selectable &&
      p.hasImage && {
        width: v.selectedImageIconWidth,
        height: v.selectedImageIconWidth,
        marginLeft: 0,
        color: v.selectedIconColor,
        ...(p.size === 'small' && {
          width: v.smallSelectedImageIconWidth,
          height: v.smallSelectedImageIconWidth,
        }),
        ...(p.size === 'smaller' && {
          width: v.smallerSelectedImageIconWidth,
          height: v.smallerSelectedImageIconWidth,
        }),
      }),

    [`& .${svgIconClassName}`]: {
      height: '100%',
      width: '100%',
      ...(p.selectable &&
        p.hasImage && {
          position: 'relative',
          // TODO: Remove this workaround once we have proper icon from designer
          '::after': {
            content: '""',
            position: 'absolute',
            background: v.selectedIconCheckColor,
            left: '10%',
            top: '10%',
            borderRadius: '50%',
            width: '80%',
            height: '80%',
          },
        }),
      '& svg': {
        ...(p.selectable && p.hasImage && { position: 'absolute' }),
        zIndex: 100,
        height: '100%',
        width: '100%',
      },
    },
  }),
};
