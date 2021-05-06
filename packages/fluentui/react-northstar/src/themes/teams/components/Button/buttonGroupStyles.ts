import { pxToRem } from '../../../../utils';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { ButtonGroupStylesProps } from '../../../../components/Button/ButtonGroup';
import { ButtonVariables } from './buttonVariables';

const commonButtonsStyles = (circular: boolean) => (circular ? { marginRight: pxToRem(8) } : { borderRadius: 0 });

export const buttonGroupStyles: ComponentSlotStylesPrepared<ButtonGroupStylesProps, ButtonVariables> = {
  root: (): ICSSInJSStyle => ({}),
  middleButton: ({ props: p }) => ({
    ...commonButtonsStyles(p.circular),
  }),
  firstButton: ({ props: p, variables: v }) => ({
    ...commonButtonsStyles(p.circular),
    ...(!p.circular && {
      borderTopLeftRadius: v.borderRadius,
      borderBottomLeftRadius: v.borderRadius,
    }),
  }),
  lastButton: ({ props: p, variables: v }) => ({
    ...commonButtonsStyles(p.circular),
    ...(!p.circular && {
      borderTopRightRadius: v.borderRadius,
      borderBottomRightRadius: v.borderRadius,
    }),
  }),
};
