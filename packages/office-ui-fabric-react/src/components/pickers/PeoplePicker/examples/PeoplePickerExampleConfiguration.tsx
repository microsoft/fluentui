import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

interface IPeoplePickerExampleConfigurationProps {
  delayResults: boolean;
  setDelayResults: React.Dispatch<React.SetStateAction<boolean>>;
  isPickerDisabled: boolean;
  setIsPickerDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const checkboxStyles = {
  root: {
    marginTop: 10
  }
};

export const PeoplePickerExampleConfiguration: React.FunctionComponent<IPeoplePickerExampleConfigurationProps> = props => {
  const { children, delayResults, setDelayResults, isPickerDisabled, setIsPickerDisabled } = props;

  const onDisabledButtonClick = (): void => {
    setIsPickerDisabled(!isPickerDisabled);
  };

  const onToggleDelayResultsChange = (): void => {
    setDelayResults(!delayResults);
  };

  return (
    <div>
      {children}
      <Checkbox label="Disable People Picker" checked={isPickerDisabled} onChange={onDisabledButtonClick} styles={checkboxStyles} />
      <Checkbox
        label="Delay Suggestion Results"
        defaultChecked={delayResults}
        onChange={onToggleDelayResultsChange}
        styles={checkboxStyles}
      />
    </div>
  );
};
