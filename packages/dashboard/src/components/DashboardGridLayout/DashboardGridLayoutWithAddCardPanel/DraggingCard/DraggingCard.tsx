import * as React from 'react';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { CardSize, DraggingAnimationType } from '../../../../index';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

import { dragApi } from '../DashboardGridLayoutWithAddCardPanel';
import { IAddCardStyles, getStyles } from './DraggingCard.styles';
import { LineChart } from '../../../Card/animations/LineChart';
import { DonutChart } from '../../../Card/animations/DonutChart';
import { BarGraph } from '../../../Card/animations/BarGraph';
import { HorizontalBarGraph } from '../../../Card/animations/HorizontalBarGraph';
import { Shimmer } from '../../../Card/animations/Shimmer';

export interface IDraggingCardProps {
  setDragMode: () => void;
  cardId: String;
  title?: string;
  initialX: number;
  cardSize: CardSize;
  draggingAnimation?: DraggingAnimationType;
  scrollElement?: HTMLElement;
}

export class DraggingCard extends React.Component<IDraggingCardProps> {
  private cardWidth: number;
  private cardHeight: number;
  private getClassNames = classNamesFunction<{}, IAddCardStyles>();
  private classNames = this.getClassNames(getStyles);
  constructor(props: IDraggingCardProps) {
    super(props);
    window.document.addEventListener('mousemove', this.moveHandler);
    window.document.addEventListener('mouseup', this.stopPlaceholder);
    this.cardWidth = 374;
    this.cardHeight = 296;
  }

  public render(): JSX.Element {
    let className = mergeStyles(getStyles().container, {
      width: this.cardWidth + 'px',
      height: this.cardHeight + 'px'
    });
    className = 'draggingCardDGL' + ' ' + className;
    const animation = this.mapAnimationToRender(this.props.draggingAnimation);
    return (
      <div className={className}>
        <div className={this.classNames.title}>
          <div className={this.classNames.titleText}> {this.props.title}</div>
        </div>
        <div className={this.classNames.body}>{animation}</div>
      </div>
    );
  }

  private mapAnimationToRender = (draggingAnimation?: DraggingAnimationType) => {
    switch (draggingAnimation) {
      case DraggingAnimationType.BarGraph: {
        return <BarGraph />;
      }
      case DraggingAnimationType.DonutChart: {
        return <DonutChart />;
      }
      case DraggingAnimationType.HorizontalBarGraph: {
        return <HorizontalBarGraph />;
      }
      case DraggingAnimationType.LineChart: {
        return <LineChart />;
      }
      case DraggingAnimationType.Shimmer: {
        return <Shimmer />;
      }
    }
  };

  private moveHandler = (event: MouseEvent) => {
    // Change left and top styling on the dragging card so that it is always next to cursor
    const draggingCardDomElement = document.getElementsByClassName('draggingCardDGL');
    if (draggingCardDomElement && draggingCardDomElement[0]) {
      (draggingCardDomElement[0] as HTMLElement).style.left = event.clientX - this.cardWidth / 2 + 'px';
      (draggingCardDomElement[0] as HTMLElement).style.top = event.clientY - this.cardHeight / 2 + 'px';
    }
    if (dragApi && dragApi.value) {
      const containerRectList = document.getElementsByClassName('dashboardContainerClassName');
      const containerRect = containerRectList[0] ? containerRectList[0] : null;
      const width = this.props.cardSize === CardSize.mediumWide || this.props.cardSize === CardSize.large ? 2 : 1;
      const height = this.props.cardSize === CardSize.small || this.props.cardSize === CardSize.mediumWide ? 4 : 8;
      if (containerRect) {
        const boundingRect = containerRect.getBoundingClientRect();
        const left = event.clientX - boundingRect.left;
        const right = boundingRect.right - event.clientX;
        const top = event.clientY - boundingRect.top;
        if (left < 0 || top < 0 || right < 0) {
          this.props.setDragMode();
          window.document.removeEventListener('mousemove', this.moveHandler);
          window.document.removeEventListener('mouseup', this.stopPlaceholder);
          dragApi.value.dragOut({
            event,
            position: {
              left,
              top
            }
          });
        } else {
          dragApi.value.dragIn({
            i: 'n' + this.props.cardId,
            w: width,
            h: height,
            event,
            node: this._getNewCard() as HTMLElement,
            position: {
              left,
              top
            }
          });
        }
      }
    }
    // check if end of page is reached and scroll the viewport so that the card can be placed at the end of dashboard
    // choose 100, as it provided enough optimum scrolling to see the content that is next
    const scrollLength = 100;
    // the min height of card is 396, choosing 300 as it makes part of card visible while dragging and scrolling
    const cardPeekHeight = 300;
    if (this.props.scrollElement) {
      if (event.clientY > window.innerHeight - cardPeekHeight) {
        this.props.scrollElement.scrollTop += scrollLength;
      }
      if (event.clientY < window.innerHeight) {
        this.props.scrollElement.scrollTop -= scrollLength;
      }
    } else {
      const viewport = document.getElementById('dglWithAddCardPanelRoot')
        ? document.getElementById('dglWithAddCardPanelRoot')!.parentElement
        : null;
      if (viewport) {
        if (event.clientY > window.innerHeight - cardPeekHeight) {
          viewport.scrollTop += scrollLength;
        }
        if (event.clientY < window.innerHeight) {
          viewport.scrollTop -= scrollLength;
        }
      }
    }
  };

  private _getNewCard = (): React.ReactNode => {
    return <div />;
  };

  private stopPlaceholder = (event: MouseEvent) => {
    window.document.removeEventListener('mousemove', this.moveHandler);
    window.document.removeEventListener('mouseup', this.stopPlaceholder);
    if (this.props.setDragMode) {
      this.props.setDragMode();
    }
    if (dragApi && dragApi.value) {
      const containerRectList = document.getElementsByClassName('dashboardContainerClassName');
      const containerRect = containerRectList[0] ? containerRectList[0] : null;
      if (containerRect !== null) {
        const boundingRect = containerRect.getBoundingClientRect();
        dragApi.value.stop({
          event,
          position: {
            left: event.clientX - boundingRect.left,
            top: event.clientY - boundingRect.top
          }
        });
      }
    }
  };
}
