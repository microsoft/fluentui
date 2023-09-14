import { ComponentMeta } from '@storybook/react';
import { Accordion } from '@fluentui/react-northstar';
import AccordionDefaultBsize from '../../examples/components/Accordion/Performance/AccordionDefault.bsize';
import AccordionExampleRtl from '../../examples/components/Accordion/Rtl/AccordionExample.rtl';
import AccordionExample from '../../examples/components/Accordion/Types/AccordionExample.shorthand';
import AccordionExclusiveExample from '../../examples/components/Accordion/Types/AccordionExclusiveExample.shorthand';
import AccordionExclusiveExpandedExample from '../../examples/components/Accordion/Types/AccordionExclusiveExpandedExample.shorthand';
import AccordionPanelCustomContentExample from '../../examples/components/Accordion/Usage/AccordionPanelCustomContentExample.shorthand';
import AccordionPanelCustomTitleExample from '../../examples/components/Accordion/Usage/AccordionPanelCustomTitleExample.shorthand';
import AccordionDefaultExample from '../../examples/components/Accordion/Visual/AccordionExampleDefault.shorthand';

export default { component: Accordion, title: 'Accordion' } as ComponentMeta<typeof Accordion>;

export {
  AccordionDefaultBsize,
  AccordionExampleRtl,
  AccordionExample,
  AccordionExclusiveExample,
  AccordionExclusiveExpandedExample,
  AccordionPanelCustomContentExample,
  AccordionPanelCustomTitleExample,
  AccordionDefaultExample,
};
