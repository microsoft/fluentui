import * as React from 'react';
import {
  CommandBar
} from '../../../../components/index';
import { items, overflowItems } from './data';

export default class CommandBarFixedOverflowExample extends React.Component<any, any> {
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
