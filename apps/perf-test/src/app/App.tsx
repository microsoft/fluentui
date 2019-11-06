import * as React from 'react';
import { Dropdown, PrimaryButton, Stack, TextField, Text } from 'office-ui-fabric-react';
import { Measurer, MeasurerTimings } from './Measurer';
import { useTimer } from './useTimer';
import { Scenarios } from './Scenarios';

// tslint:disable

export const App = () => {
  const [itemsVisible, setItemsVisible] = React.useState(false);
  const [timingsVisible, setTimingsVisible] = React.useState(false);
  const [scenario, setScenario] = React.useState(Scenarios[0]);
  const [count, setCount] = React.useState(100);
  const [iterations, setIterations] = React.useState(1);

  React.useEffect(() => {
    setTimingsVisible(itemsVisible);
  }, [itemsVisible]);

  return (
    <div>
      <Stack horizontal gap={20} style={{ marginBottom: 20 }}>
        <Stack gap={20} style={{ width: 300 }}>
          <Dropdown
            label="Scenario"
            className="scenario"
            options={Scenarios}
            selectedKey={scenario.key}
            data-automationid="scenario"
            onChange={(ev, option) => {
              setItemsVisible(false);
              if (option) {
                setScenario(option);
              }
            }}
          />
          <TextField
            label="Component count"
            className="componentCount"
            value={String(count)}
            type="number"
            onChange={(ev, value) => {
              setItemsVisible(false);
              setCount(Number(value));
            }}
          />
          <TextField
            label="Iterations"
            className="iterations"
            value={String(iterations)}
            type="number"
            onChange={(ev, value) => {
              setItemsVisible(false);
              setIterations(Number(value));
            }}
          />
          <PrimaryButton text={itemsVisible ? 'Reset' : 'Run test'} onClick={() => setItemsVisible(!itemsVisible)} className="runTest" />
        </Stack>
        {timingsVisible && <MeasurerTimings />}
      </Stack>
      {itemsVisible && (
        <div>
          {Array.from({ length: count }, () => (
            <Measurer>{scenario.data.content}</Measurer>
          ))}
        </div>
      )}
    </div>
  );
};
