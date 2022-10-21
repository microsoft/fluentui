import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from '@fluentui/react-accordion';

storiesOf('Accordion Converged', module)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
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
    </Screener>
  ))

  .addStory(
    'visibility+focus',
    () => (
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
    ),
    { includeRtl: true, includeHighContrast: true, includeDarkMode: true },
  );
