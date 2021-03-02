import * as React from 'react';
import { AccordionItem, AccordionHeader, AccordionPanel, Accordion } from '@fluentui/react-accordion';
import { ChevronRightIcon, ChevronDownIcon } from '@fluentui/react-icons-mdl2';

const ExpandIcon = ({ open, ...rest }: { open: boolean }) => {
  return open ? <ChevronDownIcon {...rest} /> : <ChevronRightIcon {...rest} />;
};

export const AccordionExample = () => {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionHeader expandIcon={{ as: ExpandIcon }}>Accordion Header</AccordionHeader>
        <AccordionPanel>Accordion Panel</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader expandIcon={{ as: ExpandIcon }}>Accordion Header</AccordionHeader>
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
