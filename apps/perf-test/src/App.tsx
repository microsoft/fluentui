import * as React from 'react';
import {
  createTheme,
  Dropdown,
  BaseButton,
  PrimaryButton,
  Stack,
  TextField,
  DetailsRow,
  DetailsRowBase,
  IColumn,
  IDropdownOption,
  Toggle,
  Text,
  Selection,
  SelectionMode
} from 'office-ui-fabric-react';
import { Button as NewButton, Toggle as NewToggle } from '@uifabric/experiments';

import { useTimer } from './useTimer';

// tslint:disable

const Items = Array.from({ length: 10 }, (n, i) => ({
  key: `Item ${i}`,
  name: `Item ${i}`,
  modified: new Date().toString(),
  shared: 'Private',
  size: `${Math.round(Math.random() * 1000) / 10}KB`
}));

const Columns: IColumn[] = [
  { key: 'a', name: 'Name', fieldName: 'name', minWidth: 200, maxWidth: 400 },
  { key: 'b', name: 'Last modified', fieldName: 'modified', minWidth: 200, maxWidth: 400 },
  { key: 'c', name: 'Shared', fieldName: 'shared', minWidth: 300, maxWidth: 300 },
  { key: 'c', name: 'Size', fieldName: 'size', minWidth: 300, maxWidth: 300 }
];

const selection = new Selection();
selection.setItems(Items);

const defaultTheme = createTheme({});

const Scenarios: IDropdownOption[] = [
  { key: 'pributton', text: 'PrimaryButton', data: { timing: [], content: <PrimaryButton text="I am a button" /> } },
  { key: 'basebutton', text: 'BaseButton', data: { timing: [], content: <BaseButton text="I am a button" /> } },
  { key: 'newbutton', text: 'NewButton', data: { timing: [], content: <NewButton>I am a button</NewButton> } },
  { key: 'button', text: 'button', data: { timing: [], content: <button>I am a button</button> } },
  {
    key: 'rowsnostyles',
    text: 'DetailsRows without styles',
    data: {
      timing: [] as number[],
      content: (
        <DetailsRowBase
          theme={defaultTheme}
          itemIndex={0}
          item={Items[0]}
          columns={Columns}
          selection={selection}
          selectionMode={SelectionMode.single}
        />
      )
    }
  },
  {
    key: 'rows',
    text: 'DetailsRows',
    data: {
      timing: [] as number[],
      content: <DetailsRow itemIndex={0} item={Items[0]} columns={Columns} selection={selection} selectionMode={SelectionMode.single} />
    }
  },
  { key: 'toggles', text: 'Toggles', data: { timing: [], content: <Toggle checked /> } },
  { key: 'newtoggles', text: 'NewToggle', data: { timing: [], content: <NewToggle checked /> } }
];
const DefaultScenarioIndex = 4;

let _lastDuration = 0;

localStorage.getItem('toggles') || 4;

export const App = () => {
  let [scenario, setScenario] = React.useState(Scenarios[DefaultScenarioIndex]);
  let [count, setCount] = React.useState(1000);
  const { duration, isVisible, setIsRunning } = useTimer();

  if (duration && duration != _lastDuration) {
    _lastDuration = duration;
    scenario.data.timing.push(duration);
  }
  return (
    <div>
      <Stack gap={20} style={{ maxWidth: 300 }}>
        <Dropdown
          label="Scenario"
          options={Scenarios}
          selectedKey={scenario.key}
          onChange={(ev, option) => {
            if (option) {
              setScenario(option);
            }
          }}
        />
        <TextField label="Count" value={String(count)} type="number" onChange={(ev, value) => setCount(Number(value))} />
        <PrimaryButton text="Run test" onClick={() => setIsRunning(true)} />
        {duration && (
          <Text variant="medium">
            Average time: {average(scenario.data.timing)}ms, Last time: {Math.round(duration) + 'ms'}
          </Text>
        )}
      </Stack>
      <div>{isVisible && Array.from({ length: count }, () => <div>{scenario.data.content}</div>)}</div>
    </div>
  );
};

function average(timings: number[]) {
  return timings.length ? Math.round(timings.reduce((prev, current) => current + prev, 0) / timings.length) : 0;
}
