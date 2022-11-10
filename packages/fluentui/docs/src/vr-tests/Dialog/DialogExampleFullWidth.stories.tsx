import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Dialog } from '@fluentui/react-northstar';
import screenerSteps from './commonScreenerSteps';
import DialogExampleFullWidth from '../../examples/components/Dialog/Content/DialogExampleFullWidth.shorthand';

export default {
  component: Dialog,
  title: 'Dialog',
  decorators: [story => <Screener steps={screenerSteps}>{story()}</Screener>],
} as ComponentMeta<typeof Dialog>;

export { DialogExampleFullWidth };
