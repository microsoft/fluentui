import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Dialog } from '@fluentui/react-northstar';
import screenerSteps from './commonScreenerSteps';
import DialogExampleFooter from '../../examples/components/Dialog/Content/DialogExampleFooter.shorthand';

export default {
  component: Dialog,
  title: 'Dialog',
  decorators: [story => <Screener steps={screenerSteps}>{story()}</Screener>],
} as ComponentMeta<typeof Dialog>;

export { DialogExampleFooter };
