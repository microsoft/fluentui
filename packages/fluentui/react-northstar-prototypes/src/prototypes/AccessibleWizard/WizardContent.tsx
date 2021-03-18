import * as React from 'react';
import { Form, Input, TextArea, RadioGroup, Dropdown, Checkbox, Button} from '@fluentui/react-northstar';

type WizardContentProps = {
name: string;
stepIndex: number;
setStepIndex: (index: number) => void;
};

const WizardContent: React.FunctionComponent<WizardContentProps> = ({name, stepIndex, setStepIndex}) => {
const firstFocusables = ['firstName', 'quote', 'notes'];

  React.useEffect(() => {
  // Focus the first focusable form element
  const id = `${name}-${firstFocusables[stepIndex]}`;
  (document.getElementById(id) as HTMLElement)?.focus();
}, [name, stepIndex, firstFocusables]); // End useEffect

const wizardSteps = [
( // Step 1
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

            <Button
            onClick={() => {setStepIndex(1)}}
            >Next step</Button>
            </Form>
), ( // Step 2
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
            
            <Button
            onClick={() => {setStepIndex(0)}}
            >Previous step</Button>
            <Button
            onClick={() => {setStepIndex(2)}}
            >Next step</Button>
            </Form>
            ), ( // Step 3
            <Form>
            <label htmlFor={`${name}-notes`}>Please enter additional notes:</label>
                        <TextArea
            id={`${name}-notes`}
            />
            
            <Checkbox
id={`${name}-terms`}
label={<label htmlFor={`${name}-terms`}>I accept the terms and conditions:</label>}
/>
            <Button
            onClick={() => {setStepIndex(1)}}
            >Previous step</Button>

</Form>
),
];

  return (
    <>
{wizardSteps[stepIndex]}
    </>
  );
}; // End WizardContent

export default WizardContent;
