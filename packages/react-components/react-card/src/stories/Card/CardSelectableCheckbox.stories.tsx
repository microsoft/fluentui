import * as React from 'react';
import { Checkbox, makeStyles, shorthands } from '@fluentui/react-components';
import { SampleCard } from './SampleCard.stories';

const useStyles = makeStyles({
  cardGrid: {
    ...shorthands.margin('8px'),
    width: '280px',
    maxWidth: '100%',
    display: 'inline-flex',
  },
});

export const SelectableWithCheckbox = () => {
  const styles = useStyles();
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);

  return (
    <div>
      <SampleCard
        className={styles.cardGrid}
        select={<Checkbox checked={checked1} />}
        selected={checked1}
        onCardSelect={(event, { selected }) => setChecked1(selected)}
      />
      <SampleCard
        className={styles.cardGrid}
        select={<Checkbox checked={checked2} />}
        selected={checked2}
        onCardSelect={(event, { selected }) => setChecked2(selected)}
      />
    </div>
  );
};

SelectableWithCheckbox.parameters = {
  docs: {
    description: {
      story: `By default, selectable cards do not include a checkbox to represent its selection state. Checkboxes, can
      be provided using the \`select\` property`,
    },
  },
};
