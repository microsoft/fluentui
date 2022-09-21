import * as React from 'react';
import { Input, Button, SpinButton, Checkbox, TabList, Tab, makeStyles } from '@fluentui/react-components';
import { DismissFilled } from '@fluentui/react-icons';
import { Combobox, Option } from '@fluentui/react-components/unstable';

const useStyles = makeStyles({
  container: { display: 'flex', flexDirection: 'column', rowGap: '0.25rem' },
  checkbox: { paddingLeft: 0, paddingTop: 0 },
  row: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  combobox: { width: '100%', minWidth: '50%' },
  clearButton: { marginLeft: '0.5rem' },
});

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
  const styles = useStyles();
  const defaultType = types[0];
  const [type, setType] = React.useState(defaultType);

  const knob = knobs[type];
  const handleChangeType = React.useCallback((_e, data) => setType(data.value), [setType]);
  const handleValueChange = React.useCallback(
    (e, data) => {
      switch (type) {
        case 'string':
          onChange(e.target.value);
          break;
        case 'literal':
          onChange(data.optionValue);
          break;
        case 'number':
          onChange(Number(isNaN(data.value) ? e.target.value : data.value));
          break;
        case 'boolean':
          onChange(!!e.target.checked);
          break;
      }
    },
    [type, onChange],
  );

  const doPropUpdate = React.useCallback(
    e => {
      if (type === 'number') {
        onPropUpdate(Number(e.target.value));
      } else {
        onPropUpdate(e.target.value);
      }
    },
    [type, onPropUpdate],
  );

  const propId = `prop-${label}`;

  return (
    <div className={styles.container} style={{ opacity: knob ? 1 : 0.4 }}>
      <div className={styles.row}>
        <label htmlFor={propId}>{label} </label>
        {types.length === 1 ? (
          <code>{type}</code>
        ) : (
          <TabList onTabSelect={handleChangeType} selectedValue={type} size="small">
            {types.map(t => (
              <Tab key={t} value={t}>
                {t}
              </Tab>
            ))}
          </TabList>
        )}
      </div>
      <div className={styles.row}>
        {knob &&
          knob({
            options,
            value,
            onChange: handleValueChange,
            onPropUpdate: doPropUpdate,
            id: propId,
            styles,
          })}
        {!required && type === 'literal' && (
          <Button
            aria-label="Remove"
            onClick={onRemoveProp}
            icon={<DismissFilled />}
            className={styles.clearButton}
            disabled={!value}
          />
        )}
      </div>
    </div>
  );
};

export const knobs = {
  boolean: ({ value, onChange, id, styles }) => (
    <Checkbox id={id} checked={!!value} onChange={onChange} className={styles.checkbox} />
  ),

  number: ({ value, onChange, onPropUpdate, id }) => (
    <SpinButton
      id={id}
      style={{ width: '100%' }}
      type="number"
      value={Number(value)}
      onChange={onChange}
      onBlur={onPropUpdate}
    />
  ),

  string: ({ value, onChange, onPropUpdate, id }) => (
    <Input id={id} style={{ width: '100%' }} value={String(value)} onChange={onChange} onBlur={onPropUpdate} />
  ),

  literal: ({ options, value, onChange, id, styles }) => (
    <Combobox id={id} onOptionSelect={onChange} value={value} className={styles.combobox}>
      {options?.map((
        opt, // FIXME the optional is workaround for showing `Dialog` props when selected from component tree
      ) => (
        <Option key={opt} value={opt}>
          {opt}
        </Option>
      ))}
    </Combobox>
  ),

  ReactText: ({ value, onChange, onPropUpdate, id }) => knobs.string({ value, onChange, onPropUpdate, id }),
  'React.ElementType': ({ value, onChange, onPropUpdate, id }) => knobs.string({ value, onChange, onPropUpdate, id }),
};
