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
  message => {
clearTimeout(timeout);
narrate(message);
}, []); // End handleWizardFocus

// Wizard 1
  const [wizard1StepIndex, setWizard1StepIndex] = React.useState(0);
const wizard1Steps = [
( // Step 1
<div key="wizard1a" role="group" aria-labelledby="wizard1-step1-heading" aria-describedby="wizard1-step1-content">
<h3 id="wizard1-step1-heading">Step 1: Personal details</h3>
<div id="wizard1-step1-content">
<p>Here is some introductory text for this step.</p>
<p>This is to test whether the text of the dialog will be read when the focus enters this step.</p>
<WizardContent
name="wizard1"
stepIndex={0}
setStepIndex={setWizard1StepIndex}
/>
</div>
</div>
), ( // Step 2
<div key="wizard1b" role="group" aria-labelledby="wizard1-step2-heading">
<h3 id="wizard1-step2-heading">Step 2: Favourite Sci-Fi</h3>
<WizardContent
name="wizard1"
stepIndex={1}
setStepIndex={setWizard1StepIndex}
/>
</div>
), ( // Step 3
<div key="wizard1c" role="group" aria-labelledby="wizard1-step3-heading">
<h3 id="wizard1-step3-heading">Step 3: Terms and conditions</h3>
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
<div onFocus={event => {
handleWizardFocus('Step 1: Personal details');
}}
>
<h3 id="wizard2-step1-heading">Step 1: Personal details</h3>
<WizardContent
name="wizard2"
stepIndex={0}
setStepIndex={setWizard2StepIndex}
/>
</div>
), ( // Step 2
<div onFocus={event => {
handleWizardFocus('Step 2: Favourite Sci-Fi');
}}
>
<h3 id="wizard2-step2-heading">Step 2: Favourite Sci-Fi</h3>
<WizardContent
name="wizard2"
stepIndex={1}
setStepIndex={setWizard2StepIndex}
/>
</div>
), ( // Step 3
<div onFocus={event => {
handleWizardFocus('Step 3: Terms and conditions');
}}
>
<h3 id="wizard2-step3-heading">Step 3: Terms and conditions</h3>
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
            <button id="tempFocus">Focus</button>

                        <h2>Prototype #1 - role=group and aria-label</h2>
{wizard1Steps[wizard1StepIndex]}

                        <h2>Prototype #2 - aria-live</h2>
{wizard2Steps[wizard2StepIndex]}

                        </Provider>
  );
}; // End AccessibleWizard

export default AccessibleWizard;
