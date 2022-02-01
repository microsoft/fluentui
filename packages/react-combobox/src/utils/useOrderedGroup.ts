import * as React from 'react';
import type { OrderedGroupState, OptionGroupValue, OptionValue, OptionData } from './OrderedGroup.types';

function getValidOptions(children: React.ReactNode): string[] {
  const ids: string[] = [];

  React.Children.forEach(children, child => {
    if (React.isValidElement(child) && typeof child.type === 'object') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { fluentComponentType } = child.type as any;
      if ((fluentComponentType === 'OptionGroup' || fluentComponentType === 'Option') && child.props.id) {
        ids.push(child.props.id);
      }
    }
  });

  return ids;
}

export const useOrderedGroup = (children: React.ReactNode): OrderedGroupState => {
  const optionData: React.MutableRefObject<OptionData> = React.useRef({});

  const groupData: OptionGroupValue = React.useMemo(() => {
    const options = getValidOptions(children);

    // TODO: will need to make these work with nested groups; kept simple for testing ATM
    const getIdAtIndex = (index: number) => options[index];
    const getIndexOfId = (id: string) => options.indexOf(id);

    // TODO: will be removing nested groups, so this typing will then work out
    const getOptionAtId = (id: string) => optionData.current[id] as OptionValue;

    return {
      count: options.length,
      id: 'test',
      getIdAtIndex,
      getIndexOfId,
      getOptionAtId,
    };
  }, [children]);

  return {
    groupData,
    options: optionData.current,
  };
};
