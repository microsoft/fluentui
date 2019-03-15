import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Dropdown,
  BaseButton,
  PrimaryButton,
  Stack,
  TextField,
  DetailsRow,
  DetailsRowBase,
  IColumn,
  Toggle,
  Text,
  Selection,
  SelectionMode
} from 'office-ui-fabric-react';
import { Button as NewButton } from '@uifabric/experiments';

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

const Scenarios = [
  { key: 'pributton', timing: [], text: 'PrimaryButton', content: <PrimaryButton text="I am a button" /> },
  { key: 'basebutton', timing: [], text: 'BaseButton', content: <BaseButton text="I am a button" /> },
  { key: 'newbutton', timing: [], text: 'NewButton', content: <NewButton>I am a button</NewButton> },
  { key: 'button', timing: [], text: 'button', content: <button>I am a button</button> },
  {
    key: 'rowsnostyles',
    timing: [] as number[],
    text: 'DetailsRows without styles',
    content: <DetailsRowBase itemIndex={0} item={Items[0]} columns={Columns} selection={selection} selectionMode={SelectionMode.single} />
  },
  {
    key: 'rows',
    timing: [] as number[],
    text: 'DetailsRows',
    content: <DetailsRow itemIndex={0} item={Items[0]} columns={Columns} selection={selection} selectionMode={SelectionMode.single} />
  },
  { key: 'toggles', timing: [], text: 'Toggles', content: <Toggle checked /> }
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
    scenario.timing.push(duration);
  }
  return (
    <div>
      <Stack gap={20} style={{ maxWidth: 300 }}>
        <Dropdown label="Scenario" options={Scenarios} selectedKey={scenario.key} onChange={(ev, scenario) => setScenario(scenario)} />
        <TextField label="Count" value={String(count)} type="number" onChange={(ev, value) => setCount(Number(value))} />
        <PrimaryButton text="Run test" onClick={() => setIsRunning(true)} />
        {duration && (
          <Text variant="medium">
            Average time: {average(scenario.timing)}ms, Last time: {Math.round(duration) + 'ms'}
          </Text>
        )}
      </Stack>
      <div>{isVisible && Array.from({ length: count }, () => <div>{scenario.content}</div>)}</div>
    </div>
  );
};

function average(timings: number[]) {
  return timings.length ? Math.round(timings.reduce((prev, current) => current + prev, 0) / timings.length) : 0;
}
