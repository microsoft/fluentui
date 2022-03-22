import { useControllableState } from '@fluentui/react-utilities';
import { SelectedOption, SelectionEvents, SelectionProps, SelectionValue } from './Selection.types';

export const useSelection = (props: SelectionProps): SelectionValue => {
  const { initialSelectedOptions, multiselect, onSelect } = props;

  const [selectedOptions, setSelectedOptions] = useControllableState({
    state: props.selectedOptions,
    defaultState: initialSelectedOptions,
    initialState: [],
  });

  const selectOption = (event: SelectionEvents, option: SelectedOption) => {
    if (multiselect) {
      // toggle selected state of the option for multiselect
      const selectedIndex = selectedOptions.findIndex(o => o.key === option.key);
      if (selectedIndex > -1) {
        // deselect option
        setSelectedOptions([...selectedOptions.slice(0, selectedIndex), ...selectedOptions.slice(selectedIndex + 1)]);
      } else {
        // select option
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      // always set selection to option for single-select
      setSelectedOptions([option]);
    }

    onSelect?.(event, { option });
  };

  return [selectedOptions, selectOption];
};
