import * as React from 'react';

const {
  Spinner,
  Toggle,
  Checkbox,
  TextField,
  PrimaryButton,
  ProgressIndicator,
  ChoiceGroup,
  DefaultButton,
  PersonaCoin
} = require('office-ui-fabric-react');

const ToggleStrings = {
  onText: 'On',
  offText: 'Off'
};

const TodoApp = () => {
  return (
    <div>
      <Toggle {...ToggleStrings} disabled />
      <Toggle {...ToggleStrings} />
      <Toggle {...ToggleStrings} checked />
      <Spinner text="hello" />
      <PrimaryButton text="I am a PrimaryButton" />
      <DefaultButton text="I am a DefaultButton" />
      <Checkbox label="I am a Checkbox" />
      <Checkbox label="I am a Checkbox" disabled />
      <Checkbox label="I am a Checkbox" checked />
      <ChoiceGroup
        options={[
          { key: '1', text: 'ChoiceGroup option 1' },
          { key: '2', text: 'ChoiceGroup option 2', selected: true }
        ]}
      />
      <TextField label="I am a TextField" />
      <ProgressIndicator value={0.5} />
      <PersonaCoin text="David Zearing" />
    </div>
  );
};

export default TodoApp;
