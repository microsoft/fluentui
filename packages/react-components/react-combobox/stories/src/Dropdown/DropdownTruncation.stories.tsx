import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, Option, useId } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

import styles from './DropdownTruncation.module.css';

export const TruncatedValue = (props: Partial<DropdownProps>): JSXElement => {
  const dropdownId = useId('dropdown');
  const options = [
    'Cat',
    'Caterpillar',
    'Corgi',
    'Chupacabra',
    'Dog',
    'Ferret',
    'Fish',
    'Fox',
    'Hamster',
    'Snake',
    'SuperLongName_123456789_SomeMoreStuffToMakeItLonger@fluentui.dev',
    'Screaming hairy armadillo (Chaetophractus vellerosus)',
  ];

  const placeholder = 'Select an animal';

  // show truncated option by default
  const defaultValue = options[11];
  const [value, setValue] = React.useState(defaultValue);

  return (
    <div className={styles.root}>
      <label htmlFor={dropdownId}>Best pet</label>
      <Dropdown
        id={dropdownId}
        listbox={{ className: styles.listbox }}
        button={<span className={styles.truncatedText}>{value}</span>}
        onOptionSelect={(e, data) => setValue(data.optionText ?? placeholder)}
        defaultSelectedOptions={[defaultValue]}
        defaultValue={defaultValue}
        {...props}
      >
        {options.map(option => (
          <Option key={option} text={option} disabled={option === 'Ferret'}>
            <span className={styles.optionText}>{option}</span>
          </Option>
        ))}
      </Dropdown>
    </div>
  );
};

TruncatedValue.parameters = {
  docs: {
    description: {
      story:
        'The Dropdown button slot can be customized to render child JSX, which can be used to truncate the selected value text. ' +
        'Dropdown options can also be customized to overflow in various ways, e.g. by allowing long words to break and wrap.',
    },
  },
};
