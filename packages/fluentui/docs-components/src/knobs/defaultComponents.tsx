import * as React from 'react';
import {
  KnobComponentProps,
  KnobComponents,
  KnobRangeKnobComponentProps,
  LogInspectorProps,
  KnobNumberKnobComponentProps,
} from './types';
import { parseValue } from './utils/parseRangeValue';

const KnobField: React.FunctionComponent<KnobComponentProps> = props => (
  <div
    style={{
      borderBottom: '1px solid rgb(234, 234, 234)',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '3px 0',
    }}
  >
    {props.children}
  </div>
);

const KnobControl: React.FunctionComponent<KnobComponentProps> = props => (
  <span
    style={{
      verticalAlign: 'middle',
      width: 150,
      overflow: 'hidden',
    }}
  >
    {props.children}
  </span>
);

const KnobLabel: React.FunctionComponent<KnobComponentProps> = props => (
  <label htmlFor={`knob_${props.name}`} style={{ marginRight: 5 }}>
    {props.content || <code>{props.name}</code>}
  </label>
);

const KnobBoolean: React.FunctionComponent<KnobComponentProps> = props => (
  <input
    id={`knob_${props.name}`}
    checked={props.value}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
      props.setValue(e.target.checked);
    }}
    type="checkbox"
    value={props.value}
  />
);

const KnobNumber: React.FunctionComponent<KnobNumberKnobComponentProps> = props => (
  <input
    id={`knob_${props.name}`}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = parseInt(e.target.value, 10);
      const min = parseInt(props.min, 10);
      const max = parseInt(props.max, 10);

      if (newValue < min) {
        newValue = min;
      } else if (newValue > max) {
        newValue = max;
      }

      props.setValue(newValue || props.min);
    }}
    min={props.min}
    max={props.max}
    step={props.step}
    type="number"
    value={props.value}
  />
);

const KnobSelect: React.FunctionComponent<KnobComponentProps> = props => (
  <select
    id={`knob_${props.name}`}
    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
      props.setValue(e.target.value);
    }}
    value={props.value}
    style={{ width: '100%' }}
  >
    {props.values &&
      props.values.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
  </select>
);

const KnobRange: React.FunctionComponent<KnobRangeKnobComponentProps> = props => (
  <input
    id={`knob_${props.name}`}
    type="range"
    min={props.min}
    max={props.max}
    step={props.step}
    value={parseValue(props.value)}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
      props.setValue(`${e.target.value}${props.unit}`);
    }}
    style={{ width: '100%' }}
  />
);

const KnobString: React.FunctionComponent<KnobComponentProps> = props => (
  <input
    id={`knob_${props.name}`}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
      props.setValue(e.target.value);
    }}
    value={props.value}
    style={{ width: '100%' }}
  />
);

const LogInspector: React.FunctionComponent<LogInspectorProps> = props => (
  <>
    <div style={{ display: 'flex', padding: 5 }}>
      <div style={{ flexGrow: 1 }}>
        Event log{' '}
        <span
          style={{
            padding: 3,
            background: '#ccc',
            borderRadius: '4rem',
            minWidth: '1.75rem',
            minHeight: '1.75rem',
            display: 'inline-block',
            textAlign: 'center',
          }}
        >
          {props.items.length}
        </span>
      </div>
      <button onClick={props.clearLog} style={{ fontSize: '0.9rem' }}>
        Clear
      </button>
    </div>
    {props.items.length > 0 && (
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          padding: 5,
        }}
      >
        {props.items.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    )}
  </>
);

export const defaultComponents: KnobComponents = {
  KnobControl,
  KnobField,
  KnobLabel,

  KnobBoolean,
  KnobNumber,
  KnobRange,
  KnobSelect,
  KnobString,

  LogInspector,
};
