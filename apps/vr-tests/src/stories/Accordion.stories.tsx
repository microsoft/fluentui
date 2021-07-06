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
    <Accordion index={[0]}>
      <AccordionItem>
        <AccordionHeader button={{ id: 'opened-btn' }}>Opened</AccordionHeader>
        <AccordionPanel>Opened Panel</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
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
    <Accordion index={[0, 1, 2, 3]}>
      <AccordionItem>
        <AccordionHeader size="small">Small</AccordionHeader>
        <AccordionPanel>Small Panel</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader size="medium">Medium</AccordionHeader>
        <AccordionPanel>Medium Panel</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader size="large">Large</AccordionHeader>
        <AccordionPanel>Large Panel</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader size="extra-large">Extra Large</AccordionHeader>
        <AccordionPanel>Extra Large Panel</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ))
  .addStory('expandIconPosition="end"', () => (
    <Accordion expandIconPosition="end" index={[0]}>
      <AccordionItem>
        <AccordionHeader>Opened</AccordionHeader>
        <AccordionPanel>Visible Panel</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Closed</AccordionHeader>
        <AccordionPanel>Hidden Panel</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ))
  .addStory('expandIcon="<Icon/>"', () => (
    <Accordion index={[]}>
      <AccordionItem>
        <AccordionHeader expandIcon={<CircleRingIcon />} expandIconPosition="start">
          Expand Icon Start
        </AccordionHeader>
        <AccordionPanel>Expand Icon Start Panel</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader expandIcon={<CircleRingIcon />} expandIconPosition="end">
          Expand Icon End
        </AccordionHeader>
        <AccordionPanel>Expand Icon End Panel</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader inline expandIcon={<CircleRingIcon />} expandIconPosition="end">
          Expand Icon Inline End
        </AccordionHeader>
        <AccordionPanel>Expand Icon Inline End Panel</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ))
  .addStory('icon="<Icon/>"', () => (
    <Accordion index={[]}>
      <AccordionItem>
        <AccordionHeader icon={<CircleRingIcon />} expandIconPosition="start">
          Icon Start
        </AccordionHeader>
        <AccordionPanel>Icon Start Panel</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader icon={<CircleRingIcon />} expandIconPosition="end">
          Icon End
        </AccordionHeader>
        <AccordionPanel>Icon End Panel</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader inline icon={<CircleRingIcon />} expandIconPosition="end">
          Icon Inline End
        </AccordionHeader>
        <AccordionPanel>Icon Inline End Panel</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ))
  .addStory('disabled', () => (
    <Accordion index={[]}>
      <AccordionItem disabled>
        <AccordionHeader>Disabled Item Opened</AccordionHeader>
        <AccordionPanel>Disabled Item Opened Panel</AccordionPanel>
      </AccordionItem>
      <AccordionItem disabled>
        <AccordionHeader>Disabled Item Closed</AccordionHeader>
        <AccordionPanel>Disabled Item Closed Panel</AccordionPanel>
      </AccordionItem>
      <AccordionItem disabled>
        <AccordionHeader inline>Disabled Item ClosedInline</AccordionHeader>
        <AccordionPanel>Disabled Item ClosedInline Panel</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ));
