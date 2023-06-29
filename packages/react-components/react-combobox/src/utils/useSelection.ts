import * as React from 'react';
import { useEventCallback, useSelection as useUtilsSelection } from '@fluentui/react-utilities';
import { OptionValue } from './OptionCollection.types';
import { SelectionEvents, SelectionProps, SelectionState } from './Selection.types';

export const useSelection = (props: SelectionProps): SelectionState => {
  const { multiselect, onOptionSelect } = props;

  const [selectedOptions, selectionMethods] = useUtilsSelection<string>({
    selectionMode: multiselect ? 'multiselect' : 'single',
    selectedItems: props.selectedOptions,
    defaultSelectedItems: props.defaultSelectedOptions,
  });

  const selectOption = useEventCallback((event: SelectionEvents, option: OptionValue) => {
    // if the option is disabled, do nothing
    if (option.disabled) {
      return;
    }
    const nextSelectedOptions = selectionMethods.toggleItem(option.value);
    onOptionSelect?.(event, {
      optionValue: option.value,
      optionText: option.text,
      selectedOptions: Array.from(nextSelectedOptions),
    });
  });

  const clearSelection = (event: SelectionEvents) => {
    selectionMethods.clearItems();
    onOptionSelect?.(event, { optionValue: undefined, optionText: undefined, selectedOptions: [] });
  };

  return {
    clearSelection,
    selectOption,
    selectedOptions: React.useMemo(() => Array.from(selectedOptions), [selectedOptions]),
  };
};
