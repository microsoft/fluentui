import * as React from 'react';

import { Spinner, Toggle, Checkbox, ProgressIndicator, ChoiceGroup, PersonaCoin } from '@fluentui/react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';

const ToggleStrings = {
  onText: 'On',
  offText: 'Off',
};

const TodoApp = () => {
  return (
    <div>
      <Toggle {...ToggleStrings} disabled />
      <Toggle {...ToggleStrings} />
      <Toggle {...ToggleStrings} checked />
      <Spinner />
      <PrimaryButton text="I am a PrimaryButton" />
      <DefaultButton text="I am a DefaultButton" />
      <Checkbox label="I am a Checkbox" />
      <Checkbox label="I am a Checkbox" disabled />
      <Checkbox label="I am a Checkbox" checked />
      <ChoiceGroup
        defaultSelectedKey="2"
        options={[
          { key: '1', text: 'ChoiceGroup option 1' },
          { key: '2', text: 'ChoiceGroup option 2' },
        ]}
      />
      <ProgressIndicator percentComplete={0.5} />
      <PersonaCoin text="David Zearing" />
    </div>
  );
};

export default TodoApp;
