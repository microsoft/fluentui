import * as React from 'react';
import { knobs } from './knobs/index';

/**
 * Displays a knob with the ability to switch between data `types`.
 */
export const MultiTypeKnob: React.FunctionComponent<{
  label: string;
  types: ('boolean' | 'number' | 'string' | 'literal')[];
  value: any;
  shorthandType?: string;
  onChange: (value: any) => void;
  onRemoveProp: () => void;
  onNavigateProp: (propName: string) => void;
  options: string[];
  required: boolean;
}> = ({ label, types, value, onChange, onRemoveProp, options, required, onNavigateProp }) => {
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
      {knob && knob({ options, value, onChange, onNavigateProp, id: propId })}
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
