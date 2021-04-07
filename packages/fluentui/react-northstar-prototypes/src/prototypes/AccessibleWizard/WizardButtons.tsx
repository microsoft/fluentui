import * as React from 'react';
import { Button } from '@fluentui/react-northstar';

type WizardContentProps = {
totalSteps: number;
stepIndex: number;
handleButtonClick: (index: number) => void;
onFinish?: (event) => void;
};

const WizardButtons: React.FunctionComponent<WizardContentProps> = ({totalSteps, stepIndex, handleButtonClick, onFinish}) => {

  return (
    <>
    {stepIndex >= 1 &&
            <Button
            onClick={() => {
            handleButtonClick(stepIndex - 1);
}}
            >Previous step</Button>
            }
            {stepIndex <= (totalSteps - 2) &&
            <Button
            onClick={() => {
            handleButtonClick(stepIndex + 1);
}}
            >Next step</Button>
            }
            {stepIndex === (totalSteps - 1) &&
            <Button
            onClick={onFinish}
            >Finish</Button>
            }
    </>
  );
}; // End WizardButtons

export default WizardButtons;
