import * as React from 'react';
import { CommandBar } from '../CommandBar';
export class CommandBarBasicExample extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      areNamesVisible: true,
      areIconsVisible: true
    };
  }

  public render() {
    let { items, overflowItems, farItems } = this.props;

    return (
      <div>
        <CommandBar
          elipisisAriaLabel='More options'
          items={ items }
          overflowItems={ overflowItems }
          farItems={ farItems }
        />
      </div>
    );
  }
}