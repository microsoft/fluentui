import { GriffelStyle, tokens } from '@fluentui/react-components';

const inline = (): GriffelStyle => ({ display: 'inline-flex' });

const v0SpinnerLabelStyle = (): GriffelStyle => ({
  '& .fui-Label': {
    fontSize: '14px',
    fontWeight: tokens.fontWeightMedium,
  },
});

export const spinner = {
  inline,
  v0SpinnerLabelStyle,
};
