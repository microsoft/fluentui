import * as React from 'react';
import { AccordionItem, AccordionHeader, AccordionPanel, Accordion, AccordionProps } from '@fluentui/react-accordion';
import { ArgType } from '@storybook/addons';
import { RocketIcon } from '@fluentui/react-icons-mdl2';
import { Button } from '@fluentui/react-button';

const placeholder: React.CSSProperties = {
  borderRadius: '2px',
  background: '#e0e0e0',
  marginBottom: '12px',
  height: '13px',
};

const placeholderSmall: React.CSSProperties = {
  ...placeholder,
  width: '30%',
};

const placeholderSquare: React.CSSProperties = {
  borderRadius: '8px',
  height: '80px',
  width: '80px',
  marginRight: '8px',
  background: '#e0e0e0',
  display: 'inline-block',
};

const placeholderWithButton: React.CSSProperties = {
  height: '42px',
  background: '#EDEBE9',
  padding: '12px',
  borderRadius: '2px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  overflow: 'auto',
  minWidth: '320px',
};

export const AccordionExample = (props: AccordionProps) => {
  return (
    <Accordion {...props} icon={props.icon ? <RocketIcon /> : undefined}>
      <AccordionItem>
        <AccordionHeader>Accordion Header 1</AccordionHeader>
        <AccordionPanel>
          <div style={placeholder} />
          <div style={placeholder} />
          <div style={placeholderSmall} />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Accordion Header 2</AccordionHeader>
        <AccordionPanel>
          <div style={placeholderSquare} />
          <div style={placeholderSquare} />
          <div style={placeholderSquare} />
          <div style={placeholderSquare} />
          <div style={placeholderSquare} />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Accordion Header 3</AccordionHeader>
        <AccordionPanel>
          <div style={placeholderWithButton}>
            <Button>Button</Button>
            <Button primary>Primary</Button>
            <Button disabled>Disabled</Button>
          </div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
AccordionExample.argTypes = {
  inline: {
    defaultValue: false,
    control: 'boolean',
  },
  navigable: {
    defaultValue: false,
    control: 'boolean',
  },
  circular: {
    defaultValue: false,
    control: 'boolean',
  },
  multiple: {
    defaultValue: false,
    control: 'boolean',
  },
  collapsible: {
    defaultValue: false,
    control: 'boolean',
  },
  icon: {
    defaultValue: false,
    control: 'boolean',
  },
  size: {
    defaultValue: 'medium',
    control: {
      type: 'select',
      options: ['small', 'medium', 'large', 'extra-large'],
    },
  },
  expandIconPosition: {
    defaultValue: 'start',
    control: {
      type: 'inline-radio',
      options: ['start', 'end'],
    },
  },
} as { [K in keyof AccordionProps]: ArgType };
