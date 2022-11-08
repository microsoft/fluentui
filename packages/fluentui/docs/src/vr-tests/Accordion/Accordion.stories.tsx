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

export default {
  component: Accordion,
  title: 'Accordion',
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
