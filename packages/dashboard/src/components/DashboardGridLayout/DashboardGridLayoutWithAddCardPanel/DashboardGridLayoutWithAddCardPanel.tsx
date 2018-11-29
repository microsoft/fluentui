import * as React from 'react';
import { Layout } from 'react-grid-layout';
import {
  IDashboardGridLayoutWithAddCardPanelProps,
  IDashboardGridLayoutWithAddCardPanelState
} from './DashboardGridLayoutWithAddCardPanel.types';
import {
  AddCardPanel,
  DashboardGridSectionLayout,
  IDGLCard,
  IDashboardCardLayout,
  ISection,
  CardSize,
  DashboardGridBreakpointLayouts
} from '../../../index';
import { getCardStyles, getClassNames } from './DashboardGridLayoutWithAddCardPanel.styles';

export class DashboardGridLayoutWithAddCardPanel extends React.Component<
  IDashboardGridLayoutWithAddCardPanelProps,
  IDashboardGridLayoutWithAddCardPanelState
> {
  private _cardsForLayout: IDGLCard[] = [];
  private _cardsForAddCardPanel: IDGLCard[] = [];

  constructor(props: IDashboardGridLayoutWithAddCardPanelProps) {
    super(props);
    this.state = {
      cardsForAddCardPanel: [],
      cardsForLayout: [],
      sections: [],
      layout: {
        lg: [{ i: 'section0', y: 0, x: 0, size: CardSize.section }]
      }
    };
  }

  public componentDidUpdate(): void {
    if (this._cardsForAddCardPanel !== this.props.cardsVisibleInAddCardPanel || this._cardsForLayout !== this.props.cardsVisibleInLayout) {
      this._cardsForAddCardPanel = this.props.cardsVisibleInAddCardPanel;
      this._cardsForLayout = this.props.cardsVisibleInLayout;
      const cardIds: string[] = [];
      const layout: DashboardGridBreakpointLayouts = this.state.layout;
      this.props.cardsVisibleInLayout.map((card: IDGLCard) => {
        cardIds.push(card.id);
        const cardLayout: IDashboardCardLayout = { i: card.id, x: card.x, y: card.y, size: card.cardSize };
        layout.lg!.push(cardLayout);
      });
      this.props.cardsVisibleInAddCardPanel.map((card: IDGLCard) => {
        cardIds.push(card.id);
      });
      const sectionsInfo: ISection = {
        id: 'section0',
        title: this.props.sectionTitle
      };
      sectionsInfo.cardIds = cardIds;
      this.setState({
        cardsForAddCardPanel: this._cardsForAddCardPanel,
        cardsForLayout: this._cardsForLayout,
        sections: [sectionsInfo],
        layout: layout
      });
    }
  }

  public render(): JSX.Element {
    const { isOpen, isDraggable, panelHeader } = this.props;
    return (
      <>
        <AddCardPanel header={panelHeader} isOpen={isOpen} cards={this.state.cardsForAddCardPanel} switchCard={this._addCard} />
        <DashboardGridSectionLayout
          isDraggable={isDraggable}
          layout={this.state.layout}
          sections={this.state.sections}
          cards={this.state.cardsForLayout}
          onLayoutChange={this._onLayoutChange}
        />
      </>
    );
  }

  private _onLayoutChange = (currentLayout: Layout[]): void => {
    const newLayout: DashboardGridBreakpointLayouts = { lg: [] };
    currentLayout.map((individualItemLayout: Layout) => {
      const key: string = individualItemLayout.w.toString() + individualItemLayout.h.toString();
      let cardSize = CardSize.small;
      // recreating layout based off width and height of card. The width and height values are returned by RGl
      // medium wide is 2 scale wide and 1 scale in height
      // large is 2 scale high and wide
      // mediumTall is 1 scale wide and 2 scales high
      if (individualItemLayout.h === 1) {
        cardSize = CardSize.section;
      } else if (key === '28') {
        cardSize = CardSize.large;
      } else if (key === '18') {
        cardSize = CardSize.mediumTall;
      } else if (key === '24') {
        cardSize = CardSize.mediumWide;
      }
      const itemLayout: IDashboardCardLayout = {
        i: individualItemLayout.i!,
        x: individualItemLayout.x,
        y: individualItemLayout.y,
        size: cardSize
      };
      newLayout.lg!.push(itemLayout);
    });
    if (newLayout !== this.state.layout) {
      if (this.props.onLayoutChange) {
        this.props.onLayoutChange(newLayout);
      }
      this.setState({
        layout: newLayout
      });
    }
  };

  private _addCard = (cardId: string): void => {
    const addCardPanelCards = this.state.cardsForAddCardPanel;
    let cardIndex: number = -1;
    const layout: DashboardGridBreakpointLayouts = this.state.layout;
    // find the card selected in the list of cards in add card panel
    addCardPanelCards.map((card: IDGLCard, index: number) => {
      if (card.id === cardId) {
        cardIndex = index;
        // calculate new layout for the selected card from add card panel
        const calculatedLayout: { x: number; y: number } = this._calculateNextCardPostion(card.cardSize);
        const cardLayout: IDashboardCardLayout = { i: card.id, x: calculatedLayout.x, y: calculatedLayout.y, size: card.cardSize };
        layout.lg!.push(cardLayout);
      }
    });
    if (cardIndex !== -1) {
      // remove the selected card from the add card panel and add it to the list of cards that are to be show in layout
      const cardSelected = addCardPanelCards.splice(cardIndex, 1);
      const layoutCards: IDGLCard[] = this.state.cardsForLayout;
      layoutCards.push(cardSelected[0]);
      this.setState({
        cardsForAddCardPanel: addCardPanelCards,
        cardsForLayout: layoutCards,
        layout: layout
      });
      // scroll to the card that was added to the layout
      setTimeout(() => {
        if (document.getElementById(cardId + 'dglCard')) {
          document.getElementById(cardId + 'dglCard')!.scrollIntoView({ behavior: 'smooth' });
          const css = getClassNames(getCardStyles!);
          document.getElementById(cardId + 'dglCard')!.classList.add(css.fadeIn);
        }
      }, 100);
    }
  };

  // calculate the position for the selected card from add card panel
  private _calculateNextCardPostion = (cardSize: CardSize) => {
    let newCardXPosition: number = 0;
    let newCardYPosition: number = 0;
    let maxYX: number = 0;
    let lastButOneYX: number = 0;
    const layoutState = this.state.layout;
    const lastElement: undefined | IDashboardCardLayout = layoutState.lg![layoutState.lg!.length - 1];
    const lastButOneElement = layoutState.lg![layoutState.lg!.length - 2];
    if (lastElement) {
      if (lastButOneElement) {
        if (lastElement.y === lastButOneElement.y) {
          // last two cards on same level
          newCardXPosition = 0;
          newCardYPosition = lastElement.y + 1;
          return { x: newCardXPosition, y: newCardYPosition };
        } else {
          // not on same level
          if (lastElement.size === CardSize.mediumWide || lastElement.size === CardSize.large) {
            maxYX = lastElement.x + 2;
          } else {
            maxYX = lastElement.x + 1;
          }
          if (lastButOneElement.size === CardSize.mediumWide || lastButOneElement.size === CardSize.large) {
            lastButOneYX = lastButOneElement.x + 2;
          } else {
            lastButOneYX = lastButOneElement.x + 1;
          }
        }
        if (cardSize === CardSize.mediumWide || cardSize === CardSize.large) {
          maxYX += 2;
        } else {
          maxYX += 1;
        }
        if (maxYX <= lastButOneYX) {
          newCardXPosition = lastElement.x + 1;
          newCardYPosition = lastElement.y;
        } else {
          newCardYPosition = lastElement.y + 1;
        }
        return { x: newCardXPosition, y: newCardYPosition };
      } else {
        // last element exists but not lastButOne
        return { x: 0, y: lastElement.y + 1 };
      }
    }
    return { x: 0, y: 0 };
  };
}
