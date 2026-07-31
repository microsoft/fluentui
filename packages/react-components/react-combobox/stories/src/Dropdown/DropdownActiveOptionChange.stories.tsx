import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, Option, useId, Persona } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

import styles from './DropdownActiveOptionChange.module.css';

export const ActiveOptionChange = (props: Partial<DropdownProps>): JSXElement => {
  const dropdownId = useId('dropdown');
  const [activeOptionText, setActiveOptionText] = React.useState('');

  const onActiveOptionChange = React.useCallback<NonNullable<DropdownProps['onActiveOptionChange']>>(
    (_, data) => {
      if (data?.nextOption?.text) {
        setActiveOptionText(data?.nextOption?.text);
      }
    },
    [setActiveOptionText],
  );

  const onMouseEnter = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setActiveOptionText(`${e.currentTarget.textContent} (Mouse enter)`);
    },
    [setActiveOptionText],
  );

  return (
    <div className={styles.root}>
      {activeOptionText}
      <label htmlFor={dropdownId}>Schedule a meeting</label>
      <Dropdown id={dropdownId} onActiveOptionChange={onActiveOptionChange} {...props}>
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
