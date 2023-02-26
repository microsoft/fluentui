import { GriffelStyle, tokens } from '@fluentui/react-components';

const v0Inline = (): GriffelStyle => ({ display: 'inline-flex' });

const v0SpinnerLabelStyle = (): GriffelStyle => ({
  '& .fui-Label': {
    fontSize: '14px',
    fontWeight: tokens.fontWeightMedium,
  },
});

export const spinner = {
  v0Inline,
  v0SpinnerLabelStyle,
};
