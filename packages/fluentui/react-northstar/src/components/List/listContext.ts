import { createContext } from '@fluentui/react-context-selector';
import { ComponentVariablesInput } from '@fluentui/styles';
import * as React from 'react';

export type ListContextValue = {
  debug: boolean;
  selectable: boolean;
  navigable: boolean;
  truncateContent: boolean;
  truncateHeader: boolean;
  variables: ComponentVariablesInput;

  onItemClick: (e: React.KeyboardEvent | React.MouseEvent, itemIndex: number) => void;
  selectedIndex: number;
};

export type ListContextSubscribedValue = Pick<
  ListContextValue,
  'debug' | 'selectable' | 'navigable' | 'truncateContent' | 'truncateHeader' | 'variables' | 'onItemClick'
> & { selected: boolean };

export const ListContext = createContext<ListContextValue>(
  {
    debug: false,
    selectable: false,
    navigable: false,
    truncateContent: false,
    truncateHeader: false,
    variables: {},

    onItemClick: () => {},
    selectedIndex: -1,
  },
  { strict: false },
);

export const ListContextProvider = ListContext.Provider;
