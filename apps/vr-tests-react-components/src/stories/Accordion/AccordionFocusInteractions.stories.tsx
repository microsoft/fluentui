import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from '@fluentui/react-accordion';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST, RTL } from '../../utilities';

export default {
  title: 'Accordion Converged',

  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .snapshot('normal', { cropTo: '.testWrapper' })
          .focus('#opened-btn')
          .snapshot('focus opened', { cropTo: '.testWrapper' })
          .focus('#closed-btn')
          .snapshot('focus closed', { cropTo: '.testWrapper' })
          .end()}
      >
        <div className="testWrapper" style={{ width: '300px' }}>
          {story()}
        </div>
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Accordion>;

export const VisibilityFocus = () => (
  <Accordion openItems={[0]}>
    <AccordionItem value={0}>
      <AccordionHeader button={{ id: 'opened-btn' }}>Opened</AccordionHeader>
      <AccordionPanel>Opened Panel</AccordionPanel>
    </AccordionItem>
    <AccordionItem value={1}>
      <AccordionHeader button={{ id: 'closed-btn' }}>Closed</AccordionHeader>
      <AccordionPanel>Closed Panel</AccordionPanel>
    </AccordionItem>
  </Accordion>
);

VisibilityFocus.storyName = 'visibility+focus';

export const VisibilityFocusDarkMode = getStoryVariant(VisibilityFocus, DARK_MODE);
export const VisibilityFocusHighContrast = getStoryVariant(VisibilityFocus, HIGH_CONTRAST);
export const VisibilityFocusRTL = getStoryVariant(VisibilityFocus, RTL);
