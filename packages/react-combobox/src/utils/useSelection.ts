import { useControllableState } from '@fluentui/react-utilities';
import { SelectedOption, SelectionEvents, SelectionProps, SelectionValue } from './Selection.types';

export const useSelection = (props: SelectionProps): SelectionValue => {
  const { defaultSelectedOptions, multiselect, onSelect } = props;

  const [selectedOptions, setSelectedOptions] = useControllableState({
    state: props.selectedOptions,
    defaultState: defaultSelectedOptions,
    initialState: [],
  });

  const selectOption = (event: SelectionEvents, option: SelectedOption) => {
    // for single-select, always return the selected option
    let newSelection = [option];

    // toggle selected state of the option for multiselect
    if (multiselect) {
      const selectedIndex = selectedOptions.findIndex(o => o.key === option.key);
      if (selectedIndex > -1) {
        // deselect option
        newSelection = [...selectedOptions.slice(0, selectedIndex), ...selectedOptions.slice(selectedIndex + 1)];
      } else {
        // select option
        newSelection = [...selectedOptions, option];
      }
    }

    setSelectedOptions(newSelection);
    onSelect?.(event, { option, selectedOptions: newSelection });
  };

  return { selectedOptions, selectOption };
};
