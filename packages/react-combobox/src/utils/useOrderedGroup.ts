import * as React from 'react';
import type { OrderedGroupState, OptionGroupValue, OptionData } from './OrderedGroup.types';

function getValidOptions(children: React.ReactNode): string[] {
  const keys: string[] = [];

  React.Children.forEach(children, child => {
    if (React.isValidElement(child) && typeof child.type === 'object') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { fluentComponentType } = child.type as any;

      // if the child is an option, add its key to the array
      if (fluentComponentType === 'Option' && child.props.itemKey) {
        keys.push(child.props.itemKey);
      }

      // if the child is an option group, get its children
      // comboboxes semantically only support one level of option groups
      else if (fluentComponentType === 'OptionGroup' && child.props.children) {
        // console.log('option group, has children:', child.props.children);
        keys.push(...getValidOptions(child.props.children));
      }
    }
  });

  return keys;
}

export const useOrderedGroup = (children: React.ReactNode): OrderedGroupState => {
  const optionData: React.MutableRefObject<OptionData> = React.useRef({});

  const groupData: OptionGroupValue = React.useMemo(() => {
    const options = getValidOptions(children);

    const getOptionAtIndex = (index: number) => {
      const key = options[index];
      return optionData.current[key];
    };
    const getIndexOfKey = (id: string) => options.indexOf(id);

    const getOptionByKey = (key: string) => optionData.current[key];

    return {
      count: options.length,
      id: 'test',
      getOptionAtIndex,
      getIndexOfKey,
      getOptionByKey,
    };
  }, [children]);

  return {
    groupData,
    options: optionData.current,
  };
};
