import * as React from 'react';
import { Intersection, IIntersectionProps } from './Intersection';
import { Observer } from './Observer';
import { ListDebug } from './ListDebug';
import { Overflow } from './Overflow';

interface IListProps<T> {
  items?: T[];
  virtualized?: boolean;
  rowHeight: number;
  children: (item: T, index: number) => React.ReactNode;
}

type Range = [number, number];
type IntersectionBoundary = 'TOP' | 'BOTTOM';

interface IObserverListState {
  viewportHeight: number;
  offset: number;
}

export class ObserverList<T> extends React.PureComponent<IListProps<T> & Pick<IIntersectionProps, 'onIntersection'>, IObserverListState> {
  constructor(props: IListProps<T> & Pick<IIntersectionProps, 'onIntersection'>) {
    super(props);

    this.state = {
      viewportHeight: 300, //window.innerHeight,
      offset: 0
    };
  }

  private _isVirtualized = (): boolean => {
    const { virtualized = false } = this.props;

    return virtualized;
  };

  private _getRowHeight = (): number => {
    const { rowHeight } = this.props;

    return rowHeight;
  };

  private _getNumberOfVisibleRows(): number {
    const { viewportHeight } = this.state;

    return Math.floor(viewportHeight / this._getRowHeight());
  }

  private _getVisibleRange = (): Range => {
    const { items = [] } = this.props;
    const { offset } = this.state;

    if (this._isVirtualized()) {
      const numberOfVisibleRows: number = this._getNumberOfVisibleRows();

      return [offset, offset + numberOfVisibleRows];
    } else {
      return [0, items.length - 1];
    }
  };

  private _getTopSpacerHeight = (): number => {
    const height: number = this.state.offset * this._getRowHeight();

    return height;
  };

  private _getBottomSpacerHeight = (): number => {
    const { items = [] } = this.props;
    const bottomItemCount: number = items.length - this.state.offset;
    const height: number = bottomItemCount * this._getRowHeight();

    return height;
  };

  private _onIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
    const { onIntersection = () => {} } = this.props;

    entries.forEach((entry: IntersectionObserverEntry) => {
      const direction: IntersectionBoundary = entry.intersectionRect.top > 300 ? 'BOTTOM' : 'TOP';
      const visibility: 'hidden' | 'visible' = entry.intersectionRatio > 0 ? 'visible' : 'hidden';

      if (direction === 'TOP' && visibility === 'hidden') {
        this.setState({ offset: this.state.offset + 1 });
      }

      // if (direction === 'BOTTOM' && entry.intersectionRatio === 0) {
      //   this.setState({ startIndex: this.state.startIndex - 1, endIndex: this.state.endIndex + 1 });
      // } else if (direction === 'BOTTOM' && entry.intersectionRatio > 0) {
      //   this.setState({ startIndex: this.state.startIndex + 1, endIndex: this.state.endIndex - 1 });
      // } else if (direction === 'TOP' && entry.intersectionRatio === 0) {
      //   this.setState({ startIndex: this.state.startIndex + 1, endIndex: this.state.endIndex - 1 });
      // } else if (direction === 'TOP' && entry.intersectionRatio > 0) {
      //   this.setState({ startIndex: this.state.startIndex - 1, endIndex: this.state.endIndex + 1 });
      // }
    });

    onIntersection(entries, observer);
  };

  render() {
    const { items = [], children } = this.props;
    const isVirtualized: boolean = this._isVirtualized();
    const virtualizedItemsRange: Range = this._getVisibleRange();
    const [startIndex, endIndex] = virtualizedItemsRange;
    const virtualizedItems = items.slice(virtualizedItemsRange[0], virtualizedItemsRange[1]);

    return (
      <>
        <ListDebug isVirtualized={String(isVirtualized)} startIndex={startIndex} endIndex={endIndex} items={items} />
        <Intersection onIntersection={this._onIntersection}>
          <Overflow>
            <div className="spacer" style={{ height: this._getTopSpacerHeight() }} />
            {virtualizedItems.map((item: T, index: number) => {
              return (
                <Observer>
                  {rootElement => (
                    <div ref={rootElement} key={index}>
                      {children(item, index)}
                    </div>
                  )}
                </Observer>
              );
            })}
            <div className="spacer" style={{ height: this._getBottomSpacerHeight() }} />
          </Overflow>
        </Intersection>
      </>
    );
  }
}
