import * as React from 'react';
import { Accordion } from '@fluentui/react-northstar';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import AccordionDefaultExample from '../../examples/components/Accordion/Visual/AccordionExampleDefault.shorthand';
import AccordionDefaultBsize from '../../examples/components/Accordion/Performance/AccordionDefault.bsize';
import AccordionExampleRtl from '../../examples/components/Accordion/Rtl/AccordionExample.rtl';
import AccordionExample from '../../examples/components/Accordion/Types/AccordionExample.shorthand';
import AccordionExclusiveExample from '../../examples/components/Accordion/Types/AccordionExclusiveExample.shorthand';
import AccordionExclusiveExpandedExample from '../../examples/components/Accordion/Types/AccordionExclusiveExpandedExample.shorthand';
import AccordionPanelCustomContentExample from '../../examples/components/Accordion/Usage/AccordionPanelCustomContentExample.shorthand';
import AccordionPanelCustomTitleExample from '../../examples/components/Accordion/Usage/AccordionPanelCustomTitleExample.shorthand';
import { Provider, teamsTheme } from '@fluentui/react-northstar';
import Screener from 'screener-storybook/src/screener';

export default {
  component: Accordion,
  title: 'Accordion',
  decorators: [
    story => <Provider theme={teamsTheme}>{story()}</Provider>,
    story => (
      <Screener steps={new Screener.Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>
    ),
  ],
} as ComponentMeta<typeof Accordion>;

export {
  AccordionDefaultExample,
  AccordionDefaultBsize,
  AccordionExampleRtl,
  AccordionExample,
  AccordionExclusiveExample,
  AccordionExclusiveExpandedExample,
  AccordionPanelCustomContentExample,
  AccordionPanelCustomTitleExample,
};
