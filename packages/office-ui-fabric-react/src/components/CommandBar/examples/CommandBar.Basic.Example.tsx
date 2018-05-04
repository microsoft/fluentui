import * as React from 'react';

import { CommandBar, ICommandBarProps } from 'office-ui-fabric-react/lib/CommandBar';

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
          items={ items }
          overflowItems={ overflowItems }
          farItems={ farItems }
          ariaLabel={ 'Use left and right arrow keys to navigate between commands' }
        />
      </div>
    );
  }
}