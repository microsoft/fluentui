import * as React from 'react';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from '@fluentui/react-accordion';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Label } from '@fluentui/react-label';

import { Scenario } from './utils';

export const SimpleFormAccordionAccessibilityScenario: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="Simple form accordion">
      <Accordion defaultOpenItems="personalDetails">
        <AccordionItem value="personalDetails">
          <AccordionHeader>Personal details</AccordionHeader>
          <AccordionPanel>
            <Label htmlFor="name">Name:</Label>
            <input type="text" id="name" name="name" />
            <Label htmlFor="email">Email:</Label>
            <input type="text" id="email" name="email" />
            <div role="group" aria-label="Gender">
              <input type="radio" id="male" name="gender" value="male" />
              <Label htmlFor="male">male</Label>
              <input type="radio" id="female" name="gender" value="female" />
              <Label htmlFor="female">female</Label>
            </div>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="residence">
          <AccordionHeader>Residence</AccordionHeader>
          <AccordionPanel>
            <Label htmlFor="street">Street:</Label>
            <input type="text" id="street" name="street" />
            <Label htmlFor="city">City:</Label>
            <input type="text" id="city" name="city" />
            <Label htmlFor="country">Country:</Label>
            <input type="text" id="country" name="country" />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="hobbies">
          <AccordionHeader>Hobbies</AccordionHeader>
          <AccordionPanel>
            <div role="group" aria-label="Hobbies">
              <input type="checkbox" id="books" name="hobbies" value="books" />
              <Label htmlFor="books">books</Label>
              <input type="checkbox" id="sports" name="hobbies" value="sports" />
              <Label htmlFor="sports">sports</Label>
              <input type="checkbox" id="music" name="hobbies" value="music" />
              <Label htmlFor="music">music</Label>
              <input type="checkbox" id="travelling" name="hobbies" value="travelling" />
              <Label htmlFor="travelling">travelling</Label>
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Scenario>
  );
};

export default {
  title: 'Accessibility Scenarios / Simple form accordion',
  id: 'accordion-accessibility-scenario',
};
