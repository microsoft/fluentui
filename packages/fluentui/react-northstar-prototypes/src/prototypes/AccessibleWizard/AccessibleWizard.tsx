import * as React from 'react';
import { Provider, teamsTheme } from '@fluentui/react-northstar';
import WizardContent from './WizardContent';

let timeout;
const narrate = (message, priority = 'polite') => {
  const element = document.createElement('div');
  element.setAttribute(
    'style',
    'position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden;',
  );
  element.setAttribute('aria-live', priority);
  document.body.appendChild(element);

  timeout = setTimeout(() => {
    element.innerText = message;
  }, 1000); // End setTimeout 1

  setTimeout(() => {
    document.body.removeChild(element);
  }, 1300); // End setTimeout 1
}; // End narrate

const AccessibleWizard: React.FunctionComponent = () => {

  const handleWizardFocus = React.useCallback(
  (event, message) => {
  // If focus moves into the wizard from the outside, narrate the message
  if (!event.relatedTarget || !event.currentTarget.contains(event.relatedTarget)) { // Begin if 1}
narrate(message);
} // End if 1
}, []); // End handleWizardFocus

  const handleWizardBlur = React.useCallback(
  event => {
  // If focus moves into the outside of the wizard, clear the timeout
  if (!event.currentTarget.contains(event.relatedTarget)) { // Begin if 1
clearTimeout(timeout);
} // End if 1
}, []); // End handleWizardBlur

// Wizard 1
  const [wizard1StepIndex, setWizard1StepIndex] = React.useState(0);
const wizard1Steps = [
( // Step 1
<div key="wizard1a" role="group" aria-labelledby="wizard1-step1-heading" aria-describedby="wizard1-step1-content">
<WizardContent
name="wizard1"
stepIndex={0}
setStepIndex={setWizard1StepIndex}
/>
</div>
), ( // Step 2
<div key="wizard1b" role="group" aria-labelledby="wizard1-step2-heading" aria-describedby="wizard1-step2-content">
<WizardContent
name="wizard1"
stepIndex={1}
setStepIndex={setWizard1StepIndex}
/>
</div>
), ( // Step 3
<div key="wizard1c" role="group" aria-labelledby="wizard1-step3-heading" aria-describedby="wizard1-step3-content">
<WizardContent
name="wizard1"
stepIndex={2}
setStepIndex={setWizard1StepIndex}
/>
</div>
),
]; // End wizard1Steps

// Wizard 2
  const [wizard2StepIndex, setWizard2StepIndex] = React.useState(0);
const wizard2Steps = [
( // Step 1
<div
onFocus={event => {
handleWizardFocus(event, 'Step 1: Personal details');
}}
onBlur={handleWizardBlur}
>
<WizardContent
name="wizard2"
stepIndex={0}
setStepIndex={setWizard2StepIndex}
/>
</div>
), ( // Step 2
<div
onFocus={event => {
handleWizardFocus(event, 'Step 2: Favourite Sci-Fi');
}}
onBlur={handleWizardBlur}
>
<WizardContent
name="wizard2"
stepIndex={1}
setStepIndex={setWizard2StepIndex}
/>
</div>
), ( // Step 3
<div
onFocus={event => {
handleWizardFocus(event, 'Step 3: Terms and conditions');
}}
onBlur={handleWizardBlur}
>
<WizardContent
name="wizard2"
stepIndex={2}
setStepIndex={setWizard2StepIndex}
/>
</div>
),
]; // End wizard2Steps

  return (
                <Provider theme={teamsTheme}>
            <h1>Accessible Wizard Prototypes</h1>
            <button>Focus point 1</button>

                        <h2>Prototype #1 - role=group and aria-label</h2>
{wizard1Steps[wizard1StepIndex]}

            <button>Focus point 2</button>
            
                        <h2>Prototype #2 - aria-live</h2>
{wizard2Steps[wizard2StepIndex]}

                        </Provider>
  );
}; // End AccessibleWizard

export default AccessibleWizard;
