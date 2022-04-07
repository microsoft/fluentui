import * as React from 'react';
import { Meta } from '@storybook/react';
import { SpinButton } from '../index';

import descriptionMd from './SpinButtonDescription.md';
import bestPracticesMd from './SpinButtonBestPractices.md';

export { Controlled } from './SpinButtonControlled.stories';
export { Uncontrolled } from './SpinButtonUncontrolled.stories';
export { Size } from './SpinButtonSize.stories';
export { Appearance } from './SpinButtonAppearance.stories';
export { RTL } from './SpinButtonRTL.stories';
export { Disabled } from './SpinButtonDisabled.stories';
export { DisplayValue } from './SpinButtonDisplayValue.stories';
export { Step } from './SpinButtonStep.stories';
export { InputType } from './SpinButtonInputType.stories';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';

const useDecoratorStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    rowGap: '2px',
  },

  docsViewMode: {
    maxWidth: '500px',
    ...shorthands.padding('24px'),
  },
});

const meta: Meta = {
  title: 'Components/SpinButton',
  component: SpinButton,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
  decorators: [
    (Story, context) => {
      const decoratorStyles = useDecoratorStyles();

      const className = mergeClasses(decoratorStyles.base, context.viewMode === 'docs' && decoratorStyles.docsViewMode);

      return (
        <div className={className}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
