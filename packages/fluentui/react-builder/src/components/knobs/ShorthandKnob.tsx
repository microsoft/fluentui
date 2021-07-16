import * as React from 'react';
import { KnobProps } from './Knob.interface';

const EMPTY_VALUES = {
  undefined,
  string: '',
  shorthand: { $$typeof: 'shorthand', props: {} },
  element: { $$typeof: 'Symbol(react.element)', props: {} },
};

const newValue = type => EMPTY_VALUES[type];

const getFlags = value => ({
  undefined: value === undefined,
  string: value !== undefined && typeof value === 'string',
  element: value && value['$$typeof'] === 'Symbol(react.element)',
  shorthand: value && value['$$typeof'] === 'shorthand',
});

const getFlagValue = flags => {
  for (const flag of Object.keys(flags)) {
    if (flags[flag]) {
      return flag;
    }
  }
  return 'unknown';
};

export const ShorthandKnob: React.FC<KnobProps> = ({ value, onChange, id, options, onNavigateProp }) => {
  const flags = getFlags(value);
  const contentEditor = flags.string ? (
    <input
      title={options ? options[0] : ''}
      id={id}
      style={{ width: '50%' }}
      value={String(value)}
      onChange={e => onChange(e.target.value)}
    />
  ) : flags.shorthand ? (
    <button title="Modify" style={{ width: '50%' }} onClick={() => onNavigateProp(id)}>
      ...
    </button>
  ) : (
    undefined
  );

  return (
    <div style={{ display: 'inline' }}>
      {contentEditor}
      <select onChange={e => onChange(newValue(e.target.value))} value={getFlagValue(flags)}>
        {Object.keys(flags).map(flag => {
          if (flag === 'element' && !flags.element) {
            return undefined;
          }
          return (
            <option key={flag} value={flag}>
              {flag}
            </option>
          );
        })}
      </select>
    </div>
  );
};
