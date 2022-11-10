import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Checkbox } from '@fluentui/react-northstar';
import screenerSteps from './commonScreenerSteps';
import CheckboxExample from '../../examples/components/Checkbox/Types/CheckboxExample.shorthand';

export default {
  component: Checkbox,
  title: 'Checkbox',
  decorators: [story => <Screener steps={screenerSteps}>{story()}</Screener>],
} as ComponentMeta<typeof Checkbox>;

export { CheckboxExample };
