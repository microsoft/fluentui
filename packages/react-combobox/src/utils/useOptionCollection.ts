import * as React from 'react';
import type { OptionCollectionState, OptionCollectionValue, OptionData, OptionValue } from './OptionCollection.types';

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
        keys.push(...getValidOptions(child.props.children));
      }
    }
  });

  return keys;
}

export const useOptionCollection = (children: React.ReactNode): OptionCollectionState => {
  const optionData: React.MutableRefObject<OptionData> = React.useRef({});

  const collectionData: OptionCollectionValue = React.useMemo(() => {
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

  const { registerOption, unRegisterOption } = React.useMemo(() => {
    const register = (option: OptionValue) => {
      // id is currently duplicated in the key and option data. Keeping it as-is for now to test.
      if (option && option.key) {
        optionData.current[option.key] = option;
      }
    };

    const unRegister = (id: string) => {
      delete optionData.current[id];
    };

    return { registerOption: register, unRegisterOption: unRegister };
  }, []);

  return {
    collectionData,
    options: optionData.current,
    registerOption,
    unRegisterOption,
  };
};
