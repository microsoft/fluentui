import * as React from 'react';
import { Dialog, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { useBoolean } from '@uifabric/react-hooks';

const modelProps = {
  isBlocking: true,
  topOffsetFixed: true,
};

const options = [
  {
    key: 'A',
    iconProps: { iconName: 'CalendarDay' },
    text: 'Day',
  },
  {
    key: 'B',
    iconProps: { iconName: 'CalendarWeek' },
    text: 'Week',
  },
  {
    key: 'C',
    iconProps: { iconName: 'Calendar' },
    text: 'Month',
  },
];

export const DialogTopOffsetFixedExample: React.FunctionComponent = () => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [optionSelected, setOptionSelected] = React.useState('A');

  const onChange = (ev: React.FormEvent<HTMLInputElement>, option: any): void => {
    setOptionSelected(option.key);
  };

  return (
    <>
      <DefaultButton secondaryText="Opens the Sample Dialog" onClick={toggleHideDialog} text="Open Dialog" />
      <Dialog hidden={hideDialog} onDismiss={toggleHideDialog} modalProps={modelProps}>
        <ChoiceGroup label="Pick one icon" options={options} onChange={onChange} required />
        {optionSelected === 'A' && (
          <div>
            <h1>Description</h1>
            <div>
              {' '}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.{' '}
            </div>
          </div>
        )}
        {optionSelected === 'B' && (
          <div>
            <h1>Description</h1>
            <div>
              {' '}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.{' '}
            </div>
          </div>
        )}
        {optionSelected === 'C' && (
          <div>
            <h1>Description</h1>
          </div>
        )}
        <DialogFooter>
          <PrimaryButton onClick={toggleHideDialog} text="Save" />
          <DefaultButton onClick={toggleHideDialog} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  );
};
