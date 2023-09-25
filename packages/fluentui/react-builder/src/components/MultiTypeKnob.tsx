import * as React from 'react';
// import { isElement } from 'react-is';
// import * as _ from 'lodash';
// import * as FUI from '@fluentui/react-northstar';
// import * as FUIIcons from '@fluentui/react-icons-northstar';

/**
 * Displays a knob with the ability to switch between data `types`.
 */
export const MultiTypeKnob: React.FunctionComponent<{
  label: string;
  types: ('boolean' | 'number' | 'string' | 'literal')[];
  value: any;
  onPropUpdate: (value: any) => void;
  onChange: (value: any) => void;
  onRemoveProp: () => void;
  options: string[];
  required: boolean;
}> = ({ label, types, value, onChange, onPropUpdate, onRemoveProp, options, required }) => {
  const defaultType = types[0];
  const [type, setType] = React.useState(defaultType);

  const knob = knobs[type];
  const handleChangeType = React.useCallback(
    e => setType(e.target.value), // @ts-ignore
    [],
  );

  const propId = `prop-${label}`;

  return (
    <div style={{ paddingBottom: '4px', marginBottom: '4px', opacity: knob ? 1 : 0.4 }}>
      <div>
        {type !== 'boolean' && <label htmlFor={propId}>{label} </label>}
        {types.length === 1 ? (
          <code style={{ float: 'right' }}>{type}</code>
        ) : (
          types.map(t => (
            <button key={t} onClick={() => handleChangeType(t)}>
              {t}
            </button>
          ))
        )}
      </div>
      {knob && knob({ options, value, onChange, onPropUpdate, id: propId })}
      {type === 'boolean' && <label htmlFor={propId}> {label}</label>}
      {!required && type === 'literal' && value && (
        <button
          style={{
            background: 'none',
            border: '1px solid black',
            borderRadius: 4,
            margin: 8,
          }}
          aria-label="Remove"
          onClick={_ => {
            onRemoveProp();
          }}
        >
          X
        </button>
      )}
    </div>
  );
};

export const knobs = {
  boolean: ({ value, onChange, id }) => (
    <input id={id} type="checkbox" checked={!!value} onChange={e => onChange(!!e.target.checked)} />
  ),

  number: ({ value, onChange, onPropUpdate, id }) => (
    <input
      id={id}
      style={{ width: '100%' }}
      type="number"
      value={Number(value)}
      onChange={e => onChange(Number(e.target.value))}
      onBlur={e => onPropUpdate(Number(e.target.value))}
    />
  ),

  string: ({ value, onChange, onPropUpdate, id }) => (
    <input
      id={id}
      style={{ width: '100%' }}
      value={String(value)}
      onChange={e => onChange(e.target.value)}
      onBlur={e => onPropUpdate(e.target.value)}
    />
  ),

  literal: ({ options, value, onChange, id }) => (
    <select id={id} onChange={e => onChange(e.target.value)} value={value}>
      {options?.map(
        (
          opt, // FIXME the optional is workaround for showing `Dialog` props when selected from component tree
        ) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ),
      )}
    </select>
  ),

  ReactText: ({ value, onChange, onPropUpdate, id }) => knobs.string({ value, onChange, onPropUpdate, id }),
  'React.ElementType': ({ value, onChange, onPropUpdate, id }) => knobs.string({ value, onChange, onPropUpdate, id }),
};
