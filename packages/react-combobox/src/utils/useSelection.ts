import { useControllableState } from '@fluentui/react-utilities';
import { SelectionEvents, SelectionProps, SelectionValue } from './Selection.types';

export const useSelection = (props: SelectionProps): SelectionValue => {
  const { initialSelectedKeys, multiselect, onSelect, selectedKeys: controlledSelectedKeys } = props;

  const [selectedKeys, setSelectedKeys] = useControllableState({
    state: controlledSelectedKeys,
    defaultState: initialSelectedKeys,
    initialState: [],
  });

  const selectKey = (event: SelectionEvents, optionKey: string) => {
    if (multiselect) {
      // toggle selected state of optionKey for multiselect
      const isSelected = selectedKeys.indexOf(optionKey) > -1;
      if (isSelected) {
        // deselect option
        setSelectedKeys(selectedKeys.filter(key => key !== optionKey));
      } else {
        // select option
        setSelectedKeys([...selectedKeys, optionKey]);
      }
    } else {
      // always set selection to optionKey for single-select
      setSelectedKeys([optionKey]);
    }

    onSelect?.(event, { optionKey });
  };

  return [selectedKeys, selectKey];
};
