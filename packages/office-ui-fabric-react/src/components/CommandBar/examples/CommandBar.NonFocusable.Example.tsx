import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { itemsNonFocusable, farItemsNonFocusable } from './data-nonFocusable';

export class CommandBarNonFocusableItemsExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <CommandBar
          isSearchBoxVisible={ false }
          items={ itemsNonFocusable }
          farItems={ farItemsNonFocusable }
        />
      </div>
    );
  }

}
