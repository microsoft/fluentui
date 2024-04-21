import * as React from 'react';
import { Dropdown, makeStyles, Option, shorthands, useId, Persona } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    ...shorthands.gap('2px'),
    maxWidth: '400px',
  },
});

export const HighlightedOptionChange = (props: Partial<DropdownProps>) => {
  const dropdownId = useId('dropdown');
  const styles = useStyles();
  const [activeOptionText, setActiveOptionText] = React.useState('');

  const eventCount = React.useRef(0);

  const onHighlightedOptionChange = React.useCallback(
    (e, data) => {
      eventCount.current++;
      setActiveOptionText(
        `HighlightedOptionChange: ${data?.nextOption?.text} Called ${eventCount.current} times.`,
      );
    },
    [setActiveOptionText],
  );

  const onMouseEnter = React.useCallback(
    e => {
      eventCount.current++;
      setActiveOptionText(`Mouse enter: ${e.target.textContent} Called ${eventCount.current} times.`);
    },
    [setActiveOptionText],
  );
  return (
    <div className={styles.root}>
      {activeOptionText}
      <label id={dropdownId}>Schedule a meeting</label>
      <Dropdown aria-labelledby={dropdownId} onHighlightedOptionChange={onHighlightedOptionChange} {...props}>
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

HighlightedOptionChange.parameters = {
  docs: {
    description: {
      story:
        'OnHighlightedOptionChange event handler allows reacting on changing the active option from Dropdown Listbox ' +
        'triggered by keyboard. To react on mouse hover events, use onMouseEnter event handler on the invididual options.',
    },
  },
};
