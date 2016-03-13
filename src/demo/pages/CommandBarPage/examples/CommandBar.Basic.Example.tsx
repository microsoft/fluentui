import * as React from 'react';
import { CommandBar } from '../../../../components/index';
import { items, farItems } from './data';

export default class CommandBarBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
          <CommandBar
            isSearchBoxVisible={ true }
            searchPlaceholderText='Search...'
            items={ items }
            farItems={ farItems }
          />
      </div>
    );
  }

}
