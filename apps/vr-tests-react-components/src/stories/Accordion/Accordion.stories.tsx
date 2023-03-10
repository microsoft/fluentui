import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from '@fluentui/react-accordion';
import { CircleRegular } from '@fluentui/react-icons';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST, RTL } from '../../utilities';

export default {
  title: 'Accordion Converged',

  decorators: [
    story => (
      <StoryWright steps={new Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>
        <div className="testWrapper" style={{ width: '300px' }}>
          {story()}
        </div>
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Accordion>;

export const Size = () => (
  <Accordion openItems={[0, 1, 2, 3]}>
    <AccordionItem value={0}>
      <AccordionHeader size="small">Small</AccordionHeader>
      <AccordionPanel>Small Panel</AccordionPanel>
    </AccordionItem>
    <AccordionItem value={1}>
      <AccordionHeader size="medium">Medium</AccordionHeader>
      <AccordionPanel>Medium Panel</AccordionPanel>
    </AccordionItem>
    <AccordionItem value={2}>
      <AccordionHeader size="large">Large</AccordionHeader>
      <AccordionPanel>Large Panel</AccordionPanel>
    </AccordionItem>
    <AccordionItem value={3}>
      <AccordionHeader size="extra-large">Extra Large</AccordionHeader>
      <AccordionPanel>Extra Large Panel</AccordionPanel>
    </AccordionItem>
  </Accordion>
);

Size.storyName = 'size';

export const SizeRTL = getStoryVariant(Size, RTL);

export const ExpandIconPositionEnd = () => (
  <Accordion openItems={[0]}>
    <AccordionItem value={0}>
      <AccordionHeader expandIconPosition="end">Opened</AccordionHeader>
      <AccordionPanel>Visible Panel</AccordionPanel>
    </AccordionItem>
    <AccordionItem value={1}>
      <AccordionHeader expandIconPosition="end">Closed</AccordionHeader>
      <AccordionPanel>Hidden Panel</AccordionPanel>
    </AccordionItem>
  </Accordion>
);

ExpandIconPositionEnd.storyName = 'expandIconPosition="end"';

export const ExpandIconPositionEndRTL = getStoryVariant(ExpandIconPositionEnd, RTL);

export const ExpandIconIcon = () => (
  <Accordion openItems={[]}>
    <AccordionItem value={0}>
      <AccordionHeader expandIcon={<CircleRegular />} expandIconPosition="start">
        Expand Icon Start
      </AccordionHeader>
      <AccordionPanel>Expand Icon Start Panel</AccordionPanel>
    </AccordionItem>
    <AccordionItem value={1}>
      <AccordionHeader expandIcon={<CircleRegular />} expandIconPosition="end">
        Expand Icon End
      </AccordionHeader>
      <AccordionPanel>Expand Icon End Panel</AccordionPanel>
    </AccordionItem>
    <AccordionItem value={2}>
      <AccordionHeader inline expandIcon={<CircleRegular />} expandIconPosition="end">
        Expand Icon Inline End
      </AccordionHeader>
      <AccordionPanel>Expand Icon Inline End Panel</AccordionPanel>
    </AccordionItem>
  </Accordion>
);

ExpandIconIcon.storyName = 'expandIcon="<Icon/>"';

export const ExpandIconIconDarkMode = getStoryVariant(ExpandIconIcon, DARK_MODE);
export const ExpandIconIconHighContrast = getStoryVariant(ExpandIconIcon, HIGH_CONTRAST);
export const ExpandIconIconRTL = getStoryVariant(ExpandIconIcon, RTL);

export const IconIcon = () => (
  <Accordion openItems={[]}>
    <AccordionItem value={0}>
      <AccordionHeader icon={<CircleRegular />} expandIconPosition="start">
        Icon Start
      </AccordionHeader>
      <AccordionPanel>Icon Start Panel</AccordionPanel>
    </AccordionItem>
    <AccordionItem value={1}>
      <AccordionHeader icon={<CircleRegular />} expandIconPosition="end">
        Icon End
      </AccordionHeader>
      <AccordionPanel>Icon End Panel</AccordionPanel>
    </AccordionItem>
    <AccordionItem value={2}>
      <AccordionHeader inline icon={<CircleRegular />} expandIconPosition="end">
        Icon Inline End
      </AccordionHeader>
      <AccordionPanel>Icon Inline End Panel</AccordionPanel>
    </AccordionItem>
  </Accordion>
);

IconIcon.storyName = 'icon="<Icon/>"';

export const IconIconRTL = getStoryVariant(IconIcon, RTL);

export const Disabled = () => (
  <Accordion openItems={[]}>
    <AccordionItem value={0} disabled>
      <AccordionHeader>Disabled Item Opened</AccordionHeader>
      <AccordionPanel>Disabled Item Opened Panel</AccordionPanel>
    </AccordionItem>
    <AccordionItem value={1} disabled>
      <AccordionHeader>Disabled Item Closed</AccordionHeader>
      <AccordionPanel>Disabled Item Closed Panel</AccordionPanel>
    </AccordionItem>
    <AccordionItem value={2} disabled>
      <AccordionHeader inline>Disabled Item ClosedInline</AccordionHeader>
      <AccordionPanel>Disabled Item ClosedInline Panel</AccordionPanel>
    </AccordionItem>
  </Accordion>
);

Disabled.storyName = 'disabled';

export const DisabledDarkMode = getStoryVariant(Disabled, DARK_MODE);
export const DisabledHighContrast = getStoryVariant(Disabled, HIGH_CONTRAST);
