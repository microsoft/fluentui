import * as React from 'react';
import { CommandBar } from '../../../../index';

export class CommandBarBasicExample extends React.Component<any, any> {

  public render() {
    return (
      <div>
        <CommandBar
          isSearchBoxVisible={ true }
          searchPlaceholderText='Search...'
          items={ this.props.items }
          farItems={ this.props.farItems }
          />
      </div>
    );
  }

}