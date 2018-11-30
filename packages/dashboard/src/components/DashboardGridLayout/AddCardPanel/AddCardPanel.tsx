import * as React from 'react';

import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

import { AddCard } from './AddCard/AddCard';
import { getStyles } from './AddCardPanel.styles';
import { IAddCardPanelProps, IAddCardPanelState, IAddCardPanelStyles } from './AddCardPanel.types';
import { IDGLCard } from '../../../index';

export class AddCardPanel extends React.Component<IAddCardPanelProps, IAddCardPanelState> {
  constructor(props: IAddCardPanelProps) {
    super(props);
    this.state = {
      isOpen: false,
      flyoutStyle: {}
    };
  }

  public render(): JSX.Element {
    const { header, isOpen, cards } = this.props;
    return (
      <>
        <Panel
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
    this.setState({ isOpen: false });
  };

  private _renderAddCardItems = (addCardItems: IDGLCard[], header: string): JSX.Element => {
    const getClassNames = classNamesFunction<{}, IAddCardPanelStyles>();
    const classNames = getClassNames(getStyles!);
    const addCardItemsList: JSX.Element[] = [];
    addCardItems.map((addCardItem: IDGLCard, index: number) => {
      addCardItemsList.push(
        <div key={index}>
          <AddCard
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
          />
        </div>
      );
    });
    return (
      <div className={classNames.contentRoot}>
        <div className={classNames.header}>{header}</div>
        {addCardItemsList}
      </div>
    );
  };

  // the animation for the add card panel going half closed after successfully adding a card
  private _onCardClick = (cardId: string) => {
    if (this.props.moveCardFromAddCardPanelToDashboard) {
      this.props.moveCardFromAddCardPanelToDashboard(cardId);
    }
    this.setState({
      flyoutStyle: {
        transitionProperty: 'margin-right',
        transitionDuration: '400ms',
        transitionTimingFunction: 'cubic-bezier(0.8, 0, 0.2, 1)',
        marginLeft: '0px',
        marginRight: '-416px'
      }
    });
    // the time for which the add card panel stays half hidden after successfully adding a card
    setTimeout(() => {
      this.setState({ flyoutStyle: {} });
    }, 1000);
  };
}
