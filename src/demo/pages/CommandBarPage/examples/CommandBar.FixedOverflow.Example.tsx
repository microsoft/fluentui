import * as React from 'react';
import {
  CommandBar
} from '../../../../index';
import { items, overflowItems } from './data';

export class CommandBarFixedOverflowExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <CommandBar
          isSearchBoxVisible={ false }
          items={ items }
          overflowItems= { overflowItems }
        />
      </div>
    );
  }

}
