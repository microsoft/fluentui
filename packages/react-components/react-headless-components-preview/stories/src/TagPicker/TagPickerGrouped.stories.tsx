import * as React from 'react';
import {
  TagPicker,
  TagPickerControl,
  TagPickerGroup,
  TagPickerInput,
  TagPickerList,
  TagPickerOption,
  TagPickerOptionGroup,
} from '@fluentui/react-headless-components-preview/tag-picker';
import type { TagPickerProps } from '@fluentui/react-headless-components-preview/tag-picker';

import styles from './tag-picker.module.css';
import { PersonOption, SelectedTag } from './utils';

const managers = ['John Doe', 'Jane Doe', 'Max Mustermann', 'Erika Mustermann'];
const devs = ['Pierre Dupont', 'Amelie Dupont', 'Mario Rossi', 'Maria Rossi'];

export const Grouped = (): React.ReactNode => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (_e, data) => {
    if (data.value === 'no-options') {
      return;
    }
    setSelectedOptions(data.selectedOptions);
  };
  const unselectedManagers = managers.filter(option => !selectedOptions.includes(option));
  const unselectedDevs = devs.filter(option => !selectedOptions.includes(option));

  return (
    <div className={styles.demo}>
      <label className={styles.label} id="tag-picker-grouped-label">
        Select employees
      </label>
      <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl className={styles.control}>
          <TagPickerGroup className={styles.group} aria-label="Selected employees">
            {selectedOptions.map(option => (
              <SelectedTag key={option} value={option} />
            ))}
          </TagPickerGroup>
          <TagPickerInput className={styles.input} aria-labelledby="tag-picker-grouped-label" />
        </TagPickerControl>
        <TagPickerList className={styles.listbox}>
          {unselectedManagers.length === 0 && unselectedDevs.length === 0 && (
            <TagPickerOption value="no-options" disabled className={styles.option}>
              No options available
            </TagPickerOption>
          )}
          {unselectedManagers.length > 0 && (
            <TagPickerOptionGroup
              className={styles.optionGroup}
              label={{ className: styles.optionGroupLabel, children: 'Managers' }}
            >
              {unselectedManagers.map(option => (
                <PersonOption key={option} value={option} />
              ))}
            </TagPickerOptionGroup>
          )}
          {unselectedDevs.length > 0 && (
            <TagPickerOptionGroup
              className={styles.optionGroup}
              label={{ className: styles.optionGroupLabel, children: 'Devs' }}
            >
              {unselectedDevs.map(option => (
                <PersonOption key={option} value={option} />
              ))}
            </TagPickerOptionGroup>
          )}
        </TagPickerList>
      </TagPicker>
    </div>
  );
};

Grouped.parameters = {
  docs: {
    description: {
      story: 'Options can be organized into labeled sections with `TagPickerOptionGroup`.',
    },
  },
};
