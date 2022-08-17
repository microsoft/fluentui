import { useControllableState } from '@fluentui/react-utilities';
import { OptionValue } from './OptionCollection.types';
import { SelectionEvents, SelectionProps, SelectionValue } from './Selection.types';

export const useSelection = (props: SelectionProps): SelectionValue => {
  const { defaultSelectedOptions, multiselect, onSelect } = props;

  const [selectedOptions, setSelectedOptions] = useControllableState({
    state: props.selectedOptions,
    defaultState: defaultSelectedOptions,
    initialState: [],
  });

  const selectOption = (event: SelectionEvents, option: OptionValue) => {
    // if the option is disabled, do nothing
    if (option.disabled) {
      return;
    }

    // for single-select, always return the selected option
    let newSelection = [option.value];

    // toggle selected state of the option for multiselect
    if (multiselect) {
      const selectedIndex = selectedOptions.findIndex(o => o === option.value);
      if (selectedIndex > -1) {
        // deselect option
        newSelection = [...selectedOptions.slice(0, selectedIndex), ...selectedOptions.slice(selectedIndex + 1)];
      } else {
        // select option
        newSelection = [...selectedOptions, option.value];
      }
    }

    setSelectedOptions(newSelection);
    onSelect?.(event, { optionValue: option.value, selectedOptions: newSelection });
  };

  const clearSelection = (event: SelectionEvents) => {
    setSelectedOptions([]);
    onSelect?.(event, { optionValue: undefined, selectedOptions: [] });
  };

  return { clearSelection, selectOption, selectedOptions };
};
