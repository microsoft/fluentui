import * as React from 'react';

import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { classNamesFunction, BaseComponent, getRTL } from 'office-ui-fabric-react/lib/Utilities';

import { AddCard } from './AddCard/AddCard';
import { getStyles } from './AddCardPanel.styles';
import { IAddCardPanelProps, IAddCardPanelState, IAddCardPanelStyles } from './AddCardPanel.types';
import { IDGLCard, CardSize, DraggingAnimationType } from '../../../index';

export class AddCardPanel extends BaseComponent<IAddCardPanelProps, IAddCardPanelState> {
  constructor(props: IAddCardPanelProps) {
    super(props);
    this.state = {
      flyoutStyle: {}
    };
  }

  public render(): JSX.Element {
    const { header, isOpen, cards, closeButtonAriaLabel } = this.props;
    return (
      <>
        <Panel
          closeButtonAriaLabel={closeButtonAriaLabel}
          onRenderBody={this._renderAddCardItems.bind(this, cards, header)}
          type={PanelType.custom}
          customWidth={'480px'}
          isOpen={isOpen}
          isBlocking={false}
          onDismiss={this._onDismiss}
          // tslint:disable-next-line:jsx-ban-props
          style={this.state.flyoutStyle}
        />
      </>
    );
  }

  private _onDismiss = () => {
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  };

  private _renderAddCardItems = (addCardItems: IDGLCard[], header: string): JSX.Element => {
    const getClassNames = classNamesFunction<{}, IAddCardPanelStyles>();
    const classNames = getClassNames(getStyles!);
    const addCardItemsList: JSX.Element[] = [];
    addCardItems.map((addCardItem: IDGLCard, index: number) => {
      addCardItemsList.push(
        <div key={index}>
          <AddCard
            cardSize={addCardItem.cardSize}
            title={
              addCardItem.addCardInfo ? (addCardItem.addCardInfo.addCardPanelHeader ? addCardItem.addCardInfo.addCardPanelHeader : '') : ''
            }
            description={
              addCardItem.addCardInfo
                ? addCardItem.addCardInfo.addCardPanelBodyText
                  ? addCardItem.addCardInfo.addCardPanelBodyText
                  : ''
                : ''
            }
            imageSrc={addCardItem.addCardInfo ? addCardItem.addCardInfo.addCardPanelImageUrl : undefined}
            id={addCardItem.id}
            cardClicked={this._onCardClick}
            draggingCardCallback={this._draggingCardCallback}
            expandAddCardPanelBack={this._expandAddCardPanelBack}
            draggingAnimation={addCardItem.addCardInfo ? addCardItem.addCardInfo.draggingAnimation : undefined}
            addCardIconAriaLabel={addCardItem.addCardInfo ? addCardItem.addCardInfo.addCardIconAriaLabel : undefined}
            addCardImageAltText={addCardItem.addCardInfo ? addCardItem.addCardInfo.addCardImageAltText : undefined}
          />
        </div>
      );
    });
    return (
      <div className={classNames.contentRoot}>
        <div className={classNames.header} tabIndex={0} aria-label={header}>
          {header}
        </div>
        {addCardItemsList}
      </div>
    );
  };

  // checking if dragging card is brought close to add card panel and if so expanding add card panel back
  // for user to place dragging card back in add card panel
  private _moveHandler = (event: MouseEvent) => {
    if (getRTL()) {
      if (this.props.initialX - event.clientX > 400) {
        this.setState({
          flyoutStyle: {}
        });
        window.document.removeEventListener('mousemove', this._moveHandler);
        return;
      }
    } else {
      if (event.clientX - this.props.initialX > 400) {
        this.setState({
          flyoutStyle: {}
        });
        window.document.removeEventListener('mousemove', this._moveHandler);
        return;
      }
    }
  };

  // taking dragging card information from AddCard to pass it to DraggingCard
  private _draggingCardCallback = (
    cardId: string,
    title: string,
    cardSize: CardSize,
    initialX: number,
    draggingAnimation?: DraggingAnimationType
  ) => {
    window.document.addEventListener('mousemove', this._moveHandler);
    if (getRTL()) {
      this.setState({
        flyoutStyle: {
          transitionProperty: 'margin-right',
          transitionDuration: '0ms',
          transitionTimingFunction: 'cubic-bezier(0.8, 0, 0.2, 1)',
          marginRight: '0px',
          marginLeft: '-416px'
        }
      });
    } else {
      this.setState({
        flyoutStyle: {
          transitionProperty: 'margin-right',
          transitionDuration: '0ms',
          transitionTimingFunction: 'cubic-bezier(0.8, 0, 0.2, 1)',
          marginLeft: '0px',
          marginRight: '-416px'
        }
      });
    }
    this.props.draggingCardCallback(cardId, title, cardSize, initialX, draggingAnimation);
  };

  // use to open add card panel back after successfully placing a card from panel to dashboard by dragging
  private _expandAddCardPanelBack = () => {
    window.document.removeEventListener('mousemove', this._moveHandler);
    this.setState({
      flyoutStyle: {}
    });
  };

  // the animation for the add card panel going half closed after successfully adding a card
  private _onCardClick = (cardId: string) => {
    if (this.props.moveCardFromAddCardPanelToDashboard) {
      this.props.moveCardFromAddCardPanelToDashboard(cardId);
    }
    if (getRTL()) {
      this.setState({
        flyoutStyle: {
          transitionProperty: 'margin-right',
          transitionDuration: '400ms',
          transitionTimingFunction: 'cubic-bezier(0.8, 0, 0.2, 1)',
          marginRight: '0px',
          marginLeft: '-416px'
        }
      });
    } else {
      this.setState({
        flyoutStyle: {
          transitionProperty: 'margin-right',
          transitionDuration: '400ms',
          transitionTimingFunction: 'cubic-bezier(0.8, 0, 0.2, 1)',
          marginLeft: '0px',
          marginRight: '-416px'
        }
      });
    }
    // the time for which the add card panel stays half hidden after successfully adding a card
    this._async.setTimeout(() => {
      this.setState({ flyoutStyle: {} });
    }, 1000);
  };
}
