import * as React from 'react';
import { AccordionItem, AccordionHeader, AccordionPanel, Accordion } from '@fluentui/react-accordion';

export const AccordionExample = () => {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionHeader>Accordion Header</AccordionHeader>
        <AccordionPanel>Accordion Panel</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Accordion Header</AccordionHeader>
        <AccordionPanel>Accordion Panel</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export const AccordionMultipleExample = () => {
  return (
    <Accordion multiple>
      <AccordionItem>
        <AccordionHeader>Accordion Header</AccordionHeader>
        <AccordionPanel>Accordion Panel</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Accordion Header</AccordionHeader>
        <AccordionPanel>Accordion Panel</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export const AccordionCollapsibleExample = () => {
  return (
    <Accordion collapsible>
      <AccordionItem>
        <AccordionHeader>Accordion Header</AccordionHeader>
        <AccordionPanel>Accordion Panel</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Accordion Header</AccordionHeader>
        <AccordionPanel>Accordion Panel</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export const AccordionMultipleAndCollapsibleExample = () => {
  return (
    <Accordion collapsible multiple>
      <AccordionItem>
        <AccordionHeader>Accordion Header</AccordionHeader>
        <AccordionPanel>Accordion Panel</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Accordion Header</AccordionHeader>
        <AccordionPanel>Accordion Panel</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
