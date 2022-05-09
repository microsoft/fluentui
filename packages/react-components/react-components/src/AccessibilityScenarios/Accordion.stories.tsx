import * as React from 'react';

import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from '@fluentui/react-accordion';
import { Label } from '@fluentui/react-label';
import { Input } from '@fluentui/react-input';
import { Button } from '@fluentui/react-button';

import { Scenario } from './utils';

export const PersonalFormAccordionAccessibilityScenario: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="Personal form accordion">
      <h1>Personal form</h1>
      <form>
        <Accordion defaultOpenItems="basicInfo">
          <AccordionItem value="basicInfo">
            <AccordionHeader as="h2">Basic information</AccordionHeader>
            <AccordionPanel>
              <Label htmlFor="name">Name:</Label>
              <Input type="text" id="name" name="name" />
              <Label htmlFor="email">Email:</Label>
              <Input type="text" id="email" name="email" />
              <fieldset>
                <legend>Age</legend>
                <input type="radio" id="ageClass1" name="age" value="ageClass1" />
                <Label htmlFor="ageClass1">Below 18</Label>
                <input type="radio" id="ageClass2" name="age" value="ageClass2" />
                <Label htmlFor="ageClass2">Between 18 and 30</Label>
                <input type="radio" id="ageClass3" name="age" value="ageClass3" />
                <Label htmlFor="ageClass3">Over 30</Label>
              </fieldset>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="residence">
            <AccordionHeader as="h2">Residence</AccordionHeader>
            <AccordionPanel>
              <Label htmlFor="street">Street:</Label>
              <Input type="text" id="street" name="street" />
              <Label htmlFor="city">City:</Label>
              <Input type="text" id="city" name="city" />
              <Label htmlFor="country">Country:</Label>
              <Input type="text" id="country" name="country" />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="hobbies">
            <AccordionHeader as="h2">Hobbies</AccordionHeader>
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
        <Button>Submit</Button>
      </form>
    </Scenario>
  );
};

export default {
  title: 'Accessibility Scenarios / Personal form accordion',
  id: 'accordion-accessibility-scenario',
};
