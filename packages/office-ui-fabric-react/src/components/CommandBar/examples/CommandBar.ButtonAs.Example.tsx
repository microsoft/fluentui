import * as React from 'react';

import { CommandBar, ICommandBarProps } from 'office-ui-fabric-react/lib/CommandBar';
import { CommandBarButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export class CommandBarButtonAsExample extends React.Component<ICommandBarProps, {}> {

  constructor(props: ICommandBarProps) {
    super(props);
  }

  public render(): JSX.Element {

    const customButton = (props: IButtonProps) => {
      const buttonOnMouseEnter = () => console.log(`${props.text} hovered`);
      return (
        <CommandBarButton
          onMouseEnter={ buttonOnMouseEnter }
          { ...props }
          styles={ {
            ...props.styles,
            icon: { color: 'red' }
          } }
        />
      );
    };

    const { items, overflowItems, farItems } = this.props;

    return (
      <div>
        <CommandBar
          buttonAs={ customButton }
          items={ items }
          overflowItems={ overflowItems }
          farItems={ farItems }
          ariaLabel={ 'Use left and right arrow keys to navigate between commands' }
        />
      </div>
    );
  }

}