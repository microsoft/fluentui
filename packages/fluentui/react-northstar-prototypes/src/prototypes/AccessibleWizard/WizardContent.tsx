import * as React from 'react';
import { Form, Input, TextArea, RadioGroup, Dropdown, Checkbox } from '@fluentui/react-northstar';

const previousStepIndexes = {
wizard1: 0,
wizard2: 0,
};

type WizardContentProps = {
name: string;
stepIndex: number;
};

const WizardContent: React.FunctionComponent<WizardContentProps> = ({name, stepIndex}) => {

const firstFocusables = ['firstName', 'quote', 'notes'];

  React.useEffect(() => {
  // Focus the first focusable form element, however only when step index has not changed from the previous render.
  if (stepIndex === previousStepIndexes[name]) { // Begin if 1
  return;
  } // End if 1
  const id = `${name}-${firstFocusables[stepIndex]}`;
  (document.getElementById(id) as HTMLElement)?.focus();
  
    previousStepIndexes[name] = stepIndex;
}, [name, stepIndex, firstFocusables]); // End useEffect

const wizardSteps = [
( // Step 1
<>
<h3 id={`${name}-step1-heading`}>Step 1: Personal details</h3>
<div id={`${name}-step1-content`}>
            <Form>
            <label htmlFor={`${name}-firstName`}>First name:</label>
                        <Input
            id={`${name}-firstName`}
            />
            
            <label htmlFor={`${name}-lastName`}>Last name:</label>
                        <Input
            id={`${name}-lastName`}
            />
            
                        <label id={`${name}-genderLabel`}>Gender:</label>
            <RadioGroup
aria-labelledby={`${name}-genderLabel`}
            items={[
                    {
            name: 'gender',
            key: 'Male',
            label: 'Male',
            value: 'male',
            },
                    {
            name: 'gender',
            key: 'Female',
            label: 'Female',
            value: 'female',
            },
                    ]}
            />
            
                        <label id={`${name}-countryLabel`}>Country of residence</label>
            <Dropdown
aria-labelledby={`${name}-countryLabel`}
            search
            items={[
                    'Czech Republic',
                    'Slovakia',
                    'Germany',
                    'Poland',
                    'Austria',
                    'Other',
                    ]}
            placeholder="Please select"
            getA11ySelectionMessage={{
    onAdd: item => `${item} has been selected.`,
    }}
            />
            
            <Checkbox
id={`${name}-adult`}
label={<label htmlFor={`${name}-adult`}>I am 18+ years old:</label>}
/>
            </Form>
            </div>
            </>
), ( // Step 2
<>
<h3 id={`${name}-step2-heading`}>Step 2: Favourite Sci-Fi</h3>
<div id={`${name}-step2-content`}>
<p id={`${name}-text`} tabIndex={-1}>Here is some static text at the beginning of this step content. After this step is displayed, focus should skip this text and should land on the first focusable element in the step content.</p>
<p>Here is another static text just to test whether aria-describedby will cause also this text to be read when this step is displayed.</p>
            <Form>
            <label htmlFor={`${name}-quote`}>Type your favourite quote:</label>
                        <TextArea
            id={`${name}-quote`}
            />
            
                        <label id={`${name}-technologyLabel`}>Which technology would you like to have the most:</label>
            <RadioGroup
aria-labelledby={`${name}-technologyLabel`}
            items={[
                    {
            name: 'technology',
            key: 'stargate',
            label: 'Star Gate',
            value: 'stargate',
            },
                    {
            name: 'technology',
            key: 'holodeck',
            label: 'Holodeck',
            value: 'holodeck',
            },
                    {
            name: 'technology',
            key: 'lightsaber',
            label: 'Lightsaber',
            value: 'lightsaber',
            },
            ]}
            />
            
                        <label id={`${name}-captainLabel`}>Your favourite captain:</label>
            <Dropdown
aria-labelledby={`${name}-captainLabel`}
            search
            items={[
                    'Samantha Carter',
                    'Jean-Luc Picard',
                    'Captain America',
                    'Jonathan Archer',
                    'James T. Kirk',
                    'Captain Power',
                    ]}
            placeholder="Please select"
            getA11ySelectionMessage={{
    onAdd: item => `${item} has been selected.`,
    }}
            />
            
            </Form>
            </div>
            </>
            ), ( // Step 3
            <>
<h3 id={`${name}-step3-heading`}>Step 3: Terms and conditions</h3>
<div id={`${name}-step3-content`}>
            <Form>
            <label htmlFor={`${name}-notes`}>Please enter additional notes:</label>
                        <TextArea
            id={`${name}-notes`}
            />
            
            <Checkbox
id={`${name}-terms`}
label={<label htmlFor={`${name}-terms`}>I accept the terms and conditions:</label>}
/>
</Form>
</div>
</>
),
]; // End wizardSteps

  return (
    <>
{wizardSteps[stepIndex]}
    </>
  );
}; // End WizardContent

export default WizardContent;
