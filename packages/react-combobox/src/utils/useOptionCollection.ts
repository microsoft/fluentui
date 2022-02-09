import * as React from 'react';
import { OptionProps } from '../components/Option';
import type { OptionCollectionState, OptionData, OptionValue } from './OptionCollection.types';

function getValidOptions(children: React.ReactNode): { keys: string[]; children: React.ReactNode } {
  const keys: string[] = [];

  const clonedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child) && typeof child.type === 'object') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { fluentComponentType } = child.type as any;

      // if the child is an option, add its key to the array
      if (fluentComponentType === 'Option') {
        const optionKey = child.props.fluentKey || child.key || child.props.id || `${index}`;
        keys.push(optionKey);

        // add key prop to Option children
        const overrideProps: Partial<OptionProps> = { fluentKey: optionKey };
        return React.cloneElement(child, overrideProps);
      }

      // if the child is an option group, get its children
      // comboboxes semantically only support one level of option groups
      else if (fluentComponentType === 'OptionGroup' && child.props.children) {
        const { keys: groupKeys, children: groupChildren } = getValidOptions(child.props.children);
        keys.push(...groupKeys);
        return React.cloneElement(child, {}, groupChildren);
      } else {
        return child;
      }
    }
  });

  return { keys, children: clonedChildren };
}

export const useOptionCollection = (children: React.ReactNode): OptionCollectionState => {
  const optionData: React.MutableRefObject<OptionData> = React.useRef({});

  const { collectionData, processedChildren } = React.useMemo(() => {
    const { keys: optionKeys, children: clonedChildren } = getValidOptions(children);

    const getOptionAtIndex = (index: number) => {
      const key = optionKeys[index];
      return optionData.current[key];
    };
    const getIndexOfKey = (id: string) => optionKeys.indexOf(id);

    const getOptionByKey = (key: string) => optionData.current[key];

    return {
      collectionData: {
        count: optionKeys.length,
        id: 'test',
        getOptionAtIndex,
        getIndexOfKey,
        getOptionByKey,
      },
      processedChildren: clonedChildren,
    };
  }, [children]);

  const { registerOption, unRegisterOption } = React.useMemo(() => {
    const register = (option: OptionValue) => {
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
    children: processedChildren,
    collectionData: collectionData,
    options: optionData.current,
    registerOption,
    unRegisterOption,
  };
};
