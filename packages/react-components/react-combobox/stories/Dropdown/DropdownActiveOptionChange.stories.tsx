import * as React from 'react';
import { Dropdown, makeStyles, Option, useId, Persona } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

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

export const ActiveOptionChange = (props: Partial<DropdownProps>) => {
  const dropdownId = useId('dropdown');
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
      <label id={dropdownId}>Schedule a meeting</label>
      <Dropdown aria-labelledby={dropdownId} onActiveOptionChange={onActiveOptionChange} {...props}>
        <Option text="Katri Athokas" onMouseEnter={onMouseEnter}>
          <Persona
            avatar={{ color: 'colorful', 'aria-hidden': true }}
            name="Katri Athokas"
            presence={{
              status: 'available',
            }}
            secondaryText="Available"
          />
        </Option>
        <Option text="Elvia Atkins" onMouseEnter={onMouseEnter}>
          <Persona
            avatar={{ color: 'colorful', 'aria-hidden': true }}
            name="Elvia Atkins"
            presence={{
              status: 'busy',
            }}
            secondaryText="Busy"
          />
        </Option>
        <Option text="Cameron Evans" onMouseEnter={onMouseEnter}>
          <Persona
            avatar={{ color: 'colorful', 'aria-hidden': true }}
            name="Cameron Evans"
            presence={{
              status: 'away',
            }}
            secondaryText="Away"
          />
        </Option>
        <Option text="Wanda Howard" onMouseEnter={onMouseEnter}>
          <Persona
            avatar={{ color: 'colorful', 'aria-hidden': true }}
            name="Wanda Howard"
            presence={{
              status: 'out-of-office',
            }}
            secondaryText="Out of office"
          />
        </Option>
      </Dropdown>
    </div>
  );
};

ActiveOptionChange.parameters = {
  docs: {
    description: {
      story:
        'OnActiveOptionChange notifies the user when the active option in the Dropdown was changed ' +
        'by keyboard. To react on mouse hover events, use onMouseEnter on the invididual options.',
    },
  },
};
