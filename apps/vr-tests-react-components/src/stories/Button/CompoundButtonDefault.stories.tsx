import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { CompoundButton } from '@fluentui/react-button';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, withScreenerSteps, RTL } from '../../utilities';
import { buttonId } from './utils';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const steps = new Screener.Steps()
  .snapshot('default', { cropTo: '.testWrapper' })
  // https://github.com/microsoft/fluentui/issues/21998
  // .hover('#button-id')
  // .snapshot('hover', { cropTo: '.testWrapper' })
  .mouseDown('#button-id')
  .snapshot('pressed', { cropTo: '.testWrapper' })
  .end();

export default {
  title: 'CompoundButton Converged',
  component: CompoundButton,
  decorators: [story => withScreenerSteps({ story, steps })],
} as ComponentMeta<typeof CompoundButton>;

export const Default = () => (
  <CompoundButton id={buttonId} secondaryContent="This is some secondary text">
    Hello, world
  </CompoundButton>
);

export const DefaultRTL = getStoryVariant(Default, RTL);

export const WithIconBeforeContent = () => (
  <CompoundButton id={buttonId} secondaryContent="This is some secondary text" icon={<CalendarMonth />}>
    Hello, world
  </CompoundButton>
);

WithIconBeforeContent.storyName = 'With icon before content';

export const WithIconBeforeContentRTL = getStoryVariant(WithIconBeforeContent, RTL);

export const WithIconAfterContent = () => (
  <CompoundButton
    id={buttonId}
    secondaryContent="This is some secondary text"
    icon={<CalendarMonth />}
    iconPosition="after"
  >
    Hello, world
  </CompoundButton>
);

WithIconAfterContent.storyName = 'With icon after content';

export const WithIconAfterContentRTL = getStoryVariant(WithIconAfterContent, RTL);
