import * as React from 'react';

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Button,
  Input,
  Label,
  Radio,
  RadioGroup,
  Checkbox,
} from '@fluentui/react-components';

import { Scenario } from './utils';

export const PersonalFormAccordion = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  React.useEffect(() => {
    if (isSubmitted) {
      document.getElementById('formSubmittedText')?.focus();
    }
  }, [isSubmitted]);

  const onSubmit = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <Scenario pageTitle="Personal form accordion">
      <h1>Personal form</h1>
      {!isSubmitted ? (
        <form onSubmit={onSubmit}>
          <Accordion defaultOpenItems="basicInfo">
            <AccordionItem value="basicInfo">
              <AccordionHeader as="h2">Basic information</AccordionHeader>
              <AccordionPanel>
                <Label htmlFor="name">Name:</Label>
                <Input type="text" id="name" name="name" />
                <Label htmlFor="email">Email:</Label>
                <Input type="email" id="email" name="email" />
                <Label id="ageLabel">Your age:</Label>
                <RadioGroup defaultValue="ageClass1" aria-labelledby="ageLabel">
                  <Radio value="ageClass1" label="Under 16" />
                  <Radio value="ageClass2" label="Between 16 and 50" />
                  <Radio value="ageClass3" label="Over 50" />
                </RadioGroup>
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
                <div role="group" aria-labelledby="hobbiesLabel">
                  <Label id="hobbiesLabel">Please select your hobbies:</Label>
                  <Checkbox label="Books" />
                  <Checkbox label="Sports" />
                  <Checkbox label="Music" />
                  <Checkbox label="Travelling" />
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Button type="submit">Submit</Button>
        </form>
      ) : (
        <p id="formSubmittedText" tabIndex={-1}>
          The form would have been submitted.
        </p>
      )}
    </Scenario>
  );
};
