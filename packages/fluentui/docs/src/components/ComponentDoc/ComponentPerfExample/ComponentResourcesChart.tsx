import * as React from 'react';
import { ResourcesChart, usePerfData, ComponentChart } from '../PerfChart';
import { Checkbox } from '@fluentui/react-northstar';

const filterReducer = (state, action) => {
  if (!Object.hasOwnProperty.call(state, action.name)) {
    throw new Error(`Unknown chart ${action.name}`);
  }
  return { ...state, [action.name]: action.enabled };
};

type FilterProps = {
  onChange: (filter: string[]) => void;
};

const Filter = React.memo<FilterProps>(({ onChange }) => {
  React.useEffect(() => {
    onChange(Object.keys(state).filter(k => state[k]));
  });

  const [state, dispatch] = React.useReducer(filterReducer, {
    Documents: false,
    Frames: false,
    JSEventListeners: false,
    Nodes: false,
    LayoutCount: false,
    RecalcStyleCount: false,
    LayoutDuration: false,
    RecalcStyleDuration: false,
    ScriptDuration: false,
    TaskDuration: false,
    JSHeapUsedSize: true,
    JSHeapTotalSize: false,
  });

  return (
    <div>
      {Object.keys(state).map(k => (
        <Checkbox label={k} checked={state[k]} onChange={(e, { checked }) => dispatch({ name: k, enabled: checked })} />
      ))}
    </div>
  );
});

export const ComponentResourcesChart = ({ perfTestName }) => {
  const data = usePerfData(perfTestName);
  return <ComponentChart chartData={data} Chart={ResourcesChart} Filter={Filter} />;
};
