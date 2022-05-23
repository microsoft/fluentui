import { useControllableState } from '@fluentui/react-utilities';
import { SelectionEvents, SelectionProps, SelectionValue } from './Selection.types';

export const useSelection = (props: SelectionProps): SelectionValue => {
  const { defaultSelectedOptions, multiselect, onSelect } = props;

  const [selectedOptions, setSelectedOptions] = useControllableState({
    state: props.selectedOptions,
    defaultState: defaultSelectedOptions,
    initialState: [],
  });

  const selectOption = (event: SelectionEvents, optionValue: string) => {
    // for single-select, always return the selected option
    let newSelection = [optionValue];

    // toggle selected state of the option for multiselect
    if (multiselect) {
      const selectedIndex = selectedOptions.findIndex(o => o === optionValue);
      if (selectedIndex > -1) {
        // deselect option
        newSelection = [...selectedOptions.slice(0, selectedIndex), ...selectedOptions.slice(selectedIndex + 1)];
      } else {
        // select option
        newSelection = [...selectedOptions, optionValue];
      }
    }

    setSelectedOptions(newSelection);
    onSelect?.(event, { optionValue, selectedOptions: newSelection });
  };

  return { selectedOptions, selectOption };
};
