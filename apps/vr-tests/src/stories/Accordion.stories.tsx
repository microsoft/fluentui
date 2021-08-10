import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
} from '@fluentui/react-accordion';
import { CircleRingIcon } from '@fluentui/react-icons-mdl2';

import { FluentProviderDecorator } from '../utilities/index';

storiesOf('Accordion', module)
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
  .addDecorator(FluentProviderDecorator)
  .addStory('visibility+focus', () => (
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
  ));

storiesOf('Accordion', module)
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>
      <div className="testWrapper" style={{ width: '300px' }}>
        {story()}
      </div>
    </Screener>
  ))
  .addDecorator(FluentProviderDecorator)
  .addStory('size', () => (
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
  ))
  .addStory('expandIconPosition="end"', () => (
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
  ))
  .addStory('expandIcon="<Icon/>"', () => (
    <Accordion openItems={[]}>
      <AccordionItem value={0}>
        <AccordionHeader expandIcon={<CircleRingIcon />} expandIconPosition="start">
          Expand Icon Start
        </AccordionHeader>
        <AccordionPanel>Expand Icon Start Panel</AccordionPanel>
      </AccordionItem>
      <AccordionItem value={1}>
        <AccordionHeader expandIcon={<CircleRingIcon />} expandIconPosition="end">
          Expand Icon End
        </AccordionHeader>
        <AccordionPanel>Expand Icon End Panel</AccordionPanel>
      </AccordionItem>
      <AccordionItem value={2}>
        <AccordionHeader inline expandIcon={<CircleRingIcon />} expandIconPosition="end">
          Expand Icon Inline End
        </AccordionHeader>
        <AccordionPanel>Expand Icon Inline End Panel</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ))
  .addStory('icon="<Icon/>"', () => (
    <Accordion openItems={[]}>
      <AccordionItem value={0}>
        <AccordionHeader icon={<CircleRingIcon />} expandIconPosition="start">
          Icon Start
        </AccordionHeader>
        <AccordionPanel>Icon Start Panel</AccordionPanel>
      </AccordionItem>
      <AccordionItem value={1}>
        <AccordionHeader icon={<CircleRingIcon />} expandIconPosition="end">
          Icon End
        </AccordionHeader>
        <AccordionPanel>Icon End Panel</AccordionPanel>
      </AccordionItem>
      <AccordionItem value={2}>
        <AccordionHeader inline icon={<CircleRingIcon />} expandIconPosition="end">
          Icon Inline End
        </AccordionHeader>
        <AccordionPanel>Icon Inline End Panel</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ))
  .addStory('disabled', () => (
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
  ));
