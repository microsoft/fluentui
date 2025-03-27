import * as React from 'react';
import { Combobox, Option, makeStyles, useId } from '@fluentui/react-components';
import { Scenario } from './utils';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '400px',
  },
});

const options = [
  'Apple',
  'Apricot',
  'Avocado',
  'Banana',
  'Blackberry',
  'Blueberry',
  'Boysenberry',
  'Cantaloupe',
  'Coconut',
  'Currant',
  'Date',
  'Dragon fruit',
  'Fig',
  'Grape',
  'Grapefruit',
  'Honeydew',
  'Kiwi',
  'Lemon',
  'Lime',
  'Lychee',
  'Mango',
  'Mandarin orange',
  'Melon',
  'Nectarine',
  'Olive',
  'Orange',
  'Papaya',
  'Passion Fruit',
  'Peach',
  'Pear',
  'Persimmon',
  'Pineapple',
  'Plum',
  'Pomegranate',
  'Raspberry',
  'Ramnutan',
  'Strawberry',
  'Tangerine',
  'Watermelon',
];

export const FilteringCombobox: React.FunctionComponent = () => {
  const comboId = useId();
  const styles = useStyles();

  return (
    <Scenario pageTitle="Filtering combobox">
      <h1>Test 3</h1>
      <div>Single State Interaction (Unified Hover/Focus)</div>
      <div className={styles.root}>
        <label id={comboId}>Favourite fruit to have with ice-cream</label>
        <Combobox aria-labelledby={comboId} placeholder="Pick a fruit" positioning={{ autoSize: true }}>
          {options.map(option => (
            <Option key={option} disabled={option === 'Ferret'}>
              {option}
            </Option>
          ))}
        </Combobox>
      </div>
    </Scenario>
  );
};
