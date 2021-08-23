import { SplitButtonVariables } from './splitButtonVariables';
import { SplitButtonDividerStylesProps } from './../../../../components/SplitButton/SplitButtonDivider';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

export const splitButtonDividerStyles: ComponentSlotStylesPrepared<
  SplitButtonDividerStylesProps,
  SplitButtonVariables
> = {
  root: ({ props, variables }): ICSSInJSStyle => {
    return {
      height: 'auto',
      alignItems: 'center',
      display: 'inline-block',
      '::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: `1px`,
        height: '100%',
        zIndex: 1,
        background: variables.dividerColor,
        ...(props.primary && {
          background: variables.dividerPrimaryColor,
        }),
      },
    };
  },
};
