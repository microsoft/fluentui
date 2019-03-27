import * as React from 'react';
import { HoverCard, IHoverCard, IPlainCardProps, HoverCardType } from 'office-ui-fabric-react/lib/HoverCard';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

const classNames = mergeStyleSets({
  plainCard: {
    width: 200,
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  target: {
    fontWeight: '600',
    display: 'inline-block',
    border: '1px solid #605e5c',
    padding: 5,
    borderRadius: 2,
    boxShadow: '0 3.2px 7.2px 0 rgba(0, 0, 0, 0.132), 0 0.6px 1.8px 0 rgba(0, 0, 0, 0.108)'
  }
});

export class HoverCardInstantDismissExample extends React.Component<{}, {}> {
  private _hoverCard = React.createRef<IHoverCard>();

  public render() {
    const plainCardProps: IPlainCardProps = {
      onRenderPlainCard: this._onRenderPlainCard
    };

    return (
      <Fabric>
        <p>
          In cases where an instant dismiss of the card is needed, public method <i>dismiss()</i> can be used through its{' '}
          <i>componentRef</i> prop.
        </p>
        <HoverCard
          cardDismissDelay={2000}
          type={HoverCardType.plain}
          plainCardProps={plainCardProps}
          componentRef={this._hoverCard}
          onCardHide={this._onCardHide}
        >
          <span className={classNames.target}>Hover Over Me</span>
        </HoverCard>
      </Fabric>
    );
  }

  private _onRenderPlainCard = (): JSX.Element => {
    return (
      <div className={classNames.plainCard}>
        <DefaultButton onClick={this._instantDismissCard} text="Instant Dismiss" />
      </div>
    );
  };

  private _instantDismissCard = (): void => {
    if (this._hoverCard.current) {
      this._hoverCard.current.dismiss();
    }
  };

  private _onCardHide = (): void => {
    console.log('I am now hidden');
  };
}
