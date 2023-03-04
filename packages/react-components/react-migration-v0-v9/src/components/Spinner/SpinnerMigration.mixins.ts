import { GriffelStyle, tokens, labelClassNames } from '@fluentui/react-components';

const v0Inline = (): GriffelStyle => ({ display: 'inline-flex' });

const v0SpinnerLabelStyle = (): GriffelStyle => ({
  [`& .${labelClassNames.root}`]: {
    fontSize: '14px',
    fontWeight: tokens.fontWeightMedium,
  },
});

export const spinner = {
  v0Inline,
  v0SpinnerLabelStyle,
};
