import * as React from 'react';
import { IBaseProps, BaseComponent, css, findScrollableParent } from 'office-ui-fabric-react/lib/Utilities';
import { IItem, IListProps, IList } from './List';

import * as stylesImport from './VirtualizedList.scss';
const styles: any = stylesImport;

export interface IVirtualizedListProps<TItem extends IItem> extends IListProps<TItem>, IBaseProps {
  initialViewportHeight?: number;

  /** Height of individual item in pixels */
  itemHeight: number;

  /** Number of items to draw before/after viewport height */
  itemOverdraw?: number;
}

export interface IVirtualizedListState<TItem extends IItem> {
  viewportHeight: number;

  scrollTop: number;
}

export class VirtualizedList<TItem extends IItem = any> extends BaseComponent<IVirtualizedListProps<TItem>, IVirtualizedListState<TItem>> {
  private root: HTMLElement;
  private scrollContainer: HTMLElement;

  constructor(props: IVirtualizedListProps<TItem>, context: any) {
    super(props, context);

    const {
      initialViewportHeight = window.innerHeight  // Start with the window height if not passed in props
    } = this.props;

    this.state = {
      viewportHeight: initialViewportHeight,

      scrollTop: 0
    };

    this.onScroll = this._async.debounce(this.onScroll, 100);
  }

  public componentDidMount() {
    this.scrollContainer = findScrollableParent(this.root)!;

    // Start measurement timer, after delay measure actual surface
    this._events.on(this.scrollContainer, 'scroll', this.onScroll);
  }

  public componentWillUnmount() {
    this._events.off(this.scrollContainer, 'scroll');

    // test
  }

  public render() {
    const { className } = this.props;

    // TODO: Make element overflow auto, works better with how people use the list
    return <div
      className={ css(styles.root/*, hasExternalScrollContainer && styles.rootOverflow*/, className) }
      ref={ this._resolveRef('root') }>
      { this.renderItems() }
    </div>;
  }

  private renderItems(): (JSX.Element | null)[] {
    const {
      itemHeight,
      items,
      onRenderItem,
      itemOverdraw = 2
    } = this.props;
    const { scrollTop, viewportHeight } = this.state;

    const result: (JSX.Element | null)[] = [];

    // Calculate items to render
    const startIndex = Math.floor(
      Math.max(
        scrollTop / itemHeight - itemOverdraw,
        0)
    );
    const endIndex = Math.floor(
      Math.min(
        startIndex + (itemOverdraw * 2) + (viewportHeight / itemHeight),
        items.length)
    );
    for (let i = startIndex; i < endIndex; ++i) {
      result.push(onRenderItem(i, items[i]));
    }

    // Generate spacer items
    const startSpacerHeight = startIndex * itemHeight;
    result.unshift(<li key='spacer-item-start' style={ { height: startSpacerHeight } } />);

    const endSpacerHeight = (items.length - endIndex) * itemHeight;
    if (endSpacerHeight > 0) {
      result.push(<li key='spacer-item-end' style={ { height: endSpacerHeight } } />);
    }

    return result;
  }

  private onScroll() {
    // TODO: CS: Can we use intersectionobserver here?
    requestAnimationFrame(() => {
      let scrollTop = 0;
      if (this.scrollContainer as any === window) {
        scrollTop = (this.scrollContainer as any).scrollY;
      } else {
        scrollTop = this.scrollContainer.scrollTop;
      }

      this.setState({
        scrollTop
      });
    });
  }
}
