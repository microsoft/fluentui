import * as React from 'react';
import { HoverCard, IPlainCardProps, HoverCardType, DirectionalHint } from 'office-ui-fabric-react/lib/HoverCard';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { IconButton } from 'office-ui-fabric-react';

const classNames = mergeStyleSets({
  plainCard: {
    width: 200,
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  textField: {
    paddingRight: 200
  }
});

interface IHoverCardExampleState {
  target: HTMLElement | null;
  eventListenerTarget: HTMLElement | null;
}

export class HoverCardEventListenerTargetExample extends React.Component<{}, IHoverCardExampleState> {
  public state = {
    target: null,
    eventListenerTarget: null
  };

  public render() {
    const plainCardProps: IPlainCardProps = {
      onRenderPlainCard: this._onRenderPlainCard,
      directionalHint: DirectionalHint.rightTopEdge
    };
    return (
      <Fabric>
        <p>
          Using the target to tag hover card on the right side of Emoji icon, and using eventListenerTarget to launch the card only when
          hovering over the text field, hovering over the icon doesn't trigger card open.
        </p>
        <span ref={this._setTarget}>
          <span ref={this._setEventListenerTarget} className={classNames.textField}>
            Hover Zone
          </span>
          <IconButton iconProps={{ iconName: 'Emoji2' }} title={'Emoji'} />
          <HoverCard
            plainCardProps={plainCardProps}
            type={HoverCardType.plain}
            target={this.state.target}
            eventListenerTarget={this.state.eventListenerTarget}
          />
        </span>
      </Fabric>
    );
  }

  private _onRenderPlainCard = (): JSX.Element => {
    return <div className={classNames.plainCard}>plain card</div>;
  };

  private _setTarget = (element: HTMLElement | null): void => {
    this.setState({
      target: element
    });
  };

  private _setEventListenerTarget = (element: HTMLElement | null): void => {
    this.setState({
      eventListenerTarget: element
    });
  };
}
