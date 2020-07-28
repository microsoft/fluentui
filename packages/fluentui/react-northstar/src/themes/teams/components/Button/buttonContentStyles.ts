import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { ButtonVariables } from './buttonVariables';
import { ButtonContentStylesProps } from '../../../../components/Button/ButtonContent';

export const buttonContentStyles: ComponentSlotStylesPrepared<ButtonContentStylesProps, ButtonVariables> = {
  root: ({ props: p, variables: v }) => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: v.contentFontSize,
    fontWeight: v.contentFontWeight,
    lineHeight: v.contentLineHeight,

    ...(p.size === 'small' && {
      fontSize: v.sizeSmallContentFontSize,
      lineHeight: v.sizeSmallContentLineHeight,
    }),
  }),
};
