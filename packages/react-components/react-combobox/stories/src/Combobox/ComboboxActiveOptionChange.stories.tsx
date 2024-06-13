import * as React from 'react';
import { Combobox, makeStyles, Option, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

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

export const ActiveOptionChange = (props: Partial<ComboboxProps>) => {
  const comboId = useId('combo-active-option-change');
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  const styles = useStyles();

  const [activeOptionText, setActiveOptionText] = React.useState('');

  const onActiveOptionChange = React.useCallback(
    (_, data) => {
      setActiveOptionText(data?.nextOption?.text);
    },
    [setActiveOptionText],
  );

  const onMouseEnter = React.useCallback(
    e => {
      setActiveOptionText(`${e.target.textContent} (Mouse enter)`);
    },
    [setActiveOptionText],
  );

  return (
    <div className={styles.root}>
      {activeOptionText}
      <label id={comboId}>Best pet</label>
      <Combobox
        aria-labelledby={comboId}
        placeholder="Select an animal"
        onActiveOptionChange={onActiveOptionChange}
        {...props}
      >
        {options.map(option => (
          <Option key={option} disabled={option === 'Ferret'} onMouseEnter={onMouseEnter}>
            {option}
          </Option>
        ))}
      </Combobox>
    </div>
  );
};

ActiveOptionChange.parameters = {
  docs: {
    description: {
      story:
        'OnActiveOptionChange notifies the user when the active option in the Combobox was changed ' +
        'by keyboard. To react on mouse hover events, use onMouseEnter on the invididual options.',
    },
  },
};
