import * as React from 'react';
import { Dropdown, PrimaryButton, Stack, TextField, Text } from 'office-ui-fabric-react';
import { ITimings, Measurer } from './Measurer';
import { useTimer } from './useTimer';
import { Scenarios } from './Scenarios';

// tslint:disable

export const App = () => {
  const [itemsVisible, setItemsVisible] = React.useState(false);
  const [timingsVisible, setTimingsVisible] = React.useState(false);
  const [scenario, setScenario] = React.useState(Scenarios[0]);
  const [count, setCount] = React.useState(100);
  const [iterations, setIterations] = React.useState(1);
  const [iterationsCount, setIterationsCount] = React.useState(0);
  const [showIteration, setShowIteration] = React.useState(false);
  const [results, setResults] = React.useState<ITimings[]>([]);

  // TODO: undo changes to this file
  // TODO: move these app files into a directory that makes it obvious it's different from perf-test scripting

  React.useEffect(() => {
    if (itemsVisible) {
      if (iterationsCount < iterations) {
        if (showIteration) {
          setShowIteration(false);
          setResults(results.concat(Measurer.getTimings()));
        } else {
          setIterationsCount(iterationsCount + 1);
          setShowIteration(true);
        }
      } else if (!timingsVisible) {
        setResults(results.concat(Measurer.getTimings()));
        setTimingsVisible(true);
      }
    }
  }, [itemsVisible, iterations, iterationsCount, showIteration, results, timingsVisible]);

  const runTest = React.useCallback(() => {
    setItemsVisible(!itemsVisible);
    if (itemsVisible) {
      setShowIteration(false);
      setTimingsVisible(false);
      setIterationsCount(0);
      setResults([]);
    }
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
              setScenario(option!);
            }}
          />
          <TextField
            label="Component count"
            className="componentCount"
            value={String(count)}
            type="number"
            onChange={(ev, value) => {
              setItemsVisible(false);
              setIterationsCount(0);
              setResults([]);
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
              setIterationsCount(0);
              setResults([]);
              setIterations(Number(value));
            }}
          />
          <PrimaryButton text={itemsVisible ? 'Reset' : 'Run test'} onClick={runTest} className="runTest" />
          <Text className="iterations">
            <b>Iteration:</b> {iterationsCount} of {iterations}
          </Text>
        </Stack>
        {timingsVisible && (
          <Stack>
            <Text className="total">
              <b>Total time:</b> {results.map(result => result.totalTime + ', ')} ms
            </Text>
            <Text className="peritem">
              <b>Per item:</b> {results.map(result => result.individualTime + ', ')} ms
            </Text>
          </Stack>
        )}
        {/* {timingsVisible &&
          results.map((result) => (
            <Stack>
              <Text className="total">
                <b>Total time:</b> {result.totalTime} ms
              </Text>
              <Text className="peritem">
                <b>Per Item:</b> {result.individualTime} ms
              </Text>
            </Stack>)
          )} */}
      </Stack>
      {showIteration && (
        <div>
          {Array.from({ length: count }, () => (
            <Measurer>{scenario.data.content}</Measurer>
          ))}
        </div>
      )}
    </div>
  );
};
