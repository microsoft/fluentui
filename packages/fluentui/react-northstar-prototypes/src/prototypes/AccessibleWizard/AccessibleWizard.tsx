import * as React from 'react';
import { Provider, teamsTheme, Form, Input, TextArea, RadioGroup, Dropdown, Checkbox, Button} from '@fluentui/react-northstar';

const narrate = (message, priority = 'polite') => {
  const element = document.createElement('div');
  element.setAttribute(
    'style',
    'position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden;',
  );
  element.setAttribute('aria-live', priority);
  document.body.appendChild(element);

  setTimeout(() => {
    element.innerText = message;
  }, 2000); // End setTimeout 1

  setTimeout(() => {
    document.body.removeChild(element);
  }, 2300); // End setTimeout 1
}; // End narrate

const AccessibleWizard: React.FunctionComponent = () => {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
narrate('');
const firstFocusables = ['firstName', 'quote'];

  React.useEffect(() => {
  // Focus the first focusable form element
  (document.getElementById(firstFocusables[currentStepIndex]) as HTMLElement).focus();
}, [currentStepIndex]); // End useEffect

const wizardSteps = [
// Step 1
(
<div role="dialog" aria-labelledby="step1Heading">
<h2 id="step1Heading">Step 1: Personal details</h2>
            <Form>

            <label htmlFor="firstName" id="firstNameLabel">First name:</label>
                        <Input
            name="firstName"
            id="firstName"
            />
            
            <label htmlFor="lastName" id="lastNameLabel">Last name:</label>
                        <Input
            name="lastName"
            id="lastName"
            />
            
                        <label id="genderLabel">Gender:</label>
            <RadioGroup
aria-labelledby="genderLabel"
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
            
                        <label id="countryLabel">Country of residence</label>
            <Dropdown
aria-labelledby="countryLabel"
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
id="adult"
label={<label htmlFor="adult" id="adultLabel">I am 18+ years old:</label>}
/>

            <Button
            onClick={() => {setCurrentStepIndex(1)}}
            >Next step</Button>
            </Form>
</div>
),
// Step 2
(
<div role="dialog" aria-labelledby="step2Heading">
<h2 id="step2Heading">Step 2: Favourite Sci-Fi</h2>
            <Form>

            <label htmlFor="quote" id="quoteLabel">Type your favourite quote:</label>
                        <TextArea
            name="quote"
            id="quote"
            />
            
                        <label id="technologyLabel">Which technology would you like to have the most:</label>
            <RadioGroup
aria-labelledby="technologyLabel"
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
            
                        <label id="captainLabel">Your favourite captain:</label>
            <Dropdown
aria-labelledby="  captainLabel"
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
            
            <Button
            onClick={() => {setCurrentStepIndex(0)}}
            >Previous step</Button>
            </Form>
</div>
),
];

  return (
    <>
                <Provider theme={teamsTheme}>
            <h1>Accessible wizard prototype</h1>
{wizardSteps[currentStepIndex]}
                        </Provider>
    </>
  );
}; // End AccessibleWizard

export default AccessibleWizard;
