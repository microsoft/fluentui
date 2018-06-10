import * as React from 'react';

import { CommandBar, ICommandBarProps } from '@uifabric/experiments/lib/CommandBar';

export class CommandBarBasicExample extends React.Component<ICommandBarProps, {}> {

  constructor(props: ICommandBarProps) {
    super(props);
    this.state = {
      areNamesVisible: true,
      areIconsVisible: true
    };
  }

  public render(): JSX.Element {
    const { items, overflowItems, farItems } = this.props;

    return (
      <div>
        <CommandBar
          ariaLabel='Use left and right arrow keys to navigate between commands'
          elipisisAriaLabel='More options'
          items={ items }
          overflowItems={ overflowItems }
          farItems={ farItems }
        />
      </div>
    );
  }
}