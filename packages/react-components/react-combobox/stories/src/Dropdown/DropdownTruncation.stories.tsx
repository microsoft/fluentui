import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, makeStyles, Option, useId } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '200px',
  },
  listbox: {
    maxHeight: '200px',
  },
  // these styles wrap the value text within the dropdown button and cause it to truncate
  truncatedText: {
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  // these styles allow option text to break and wrap on long words, e.g. emails
  optionText: {
    overflow: 'hidden',
    overflowWrap: 'break-word',
  },
});

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
  const styles = useStyles();

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
