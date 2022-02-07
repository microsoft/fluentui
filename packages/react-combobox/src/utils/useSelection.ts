import { useControllableState } from '@fluentui/react-utilities';
import { SelectionProps } from './Selection.types';

export const useSelection = (props: SelectionProps): [string[], (key: string) => void] => {
  const { initialSelectedKeys, multiselect, onSelect, selectedKeys: controlledSelectedKeys } = props;

  const [selectedKeys, setSelectedKeys] = useControllableState({
    state: controlledSelectedKeys,
    defaultState: initialSelectedKeys,
    initialState: [],
  });

  const selectKey = (optionKey: string) => {
    if (multiselect) {
      // toggle selected state of optionKey for multiselect
      const selectedIndex = selectedKeys.indexOf(optionKey);
      if (selectedIndex) {
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

    onSelect?.(optionKey);
  };

  return [selectedKeys, selectKey];
};
