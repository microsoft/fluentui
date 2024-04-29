import { SplitButtonVariables } from '../../../teams/components/SplitButton/splitButtonVariables';
import { SplitButtonDividerStylesProps } from './../../../../components/SplitButton/SplitButtonDivider';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

export const splitButtonDividerStyles: ComponentSlotStylesPrepared<
  SplitButtonDividerStylesProps,
  SplitButtonVariables
> = {
  root: ({ props, variables }): ICSSInJSStyle => {
    return {
      '::before': {
        background: 'ButtonText',
      },
    };
  },
};
