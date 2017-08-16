import * as React from "react";
import { BaseComponent, IBaseProps, css, IRenderFunction } from "office-ui-fabric-react/lib/Utilities";

///

export interface IList<TItem> {

}

export interface IListProps<TItem> {
  className?: string;

  items: TItem[];

  onRenderItem: IRenderFunction<TItem>;
}

export interface IStaticListProps<TItem> extends IListProps<TItem> {

}

export class StaticList<TItem = any> extends React.PureComponent<IStaticListProps<TItem>> implements IList<TItem> {
  render(): JSX.Element {
    const { className, items, onRenderItem = this.onRenderItem } = this.props;

    return <ul className={ css(className) }>
      { items.map(item => onRenderItem(item, this.onRenderItem)) }
    </ul>;
  }

  private onRenderItem(item: TItem): JSX.Element {
    return <li>
      { item }
    </li>;
  }
}

//

export interface IVirtualizedListProps<TItem> extends IListProps<TItem>, IBaseProps {
  initialViewportHeight?: number;

  itemHeight: number;
}

export interface IVirtualizedListState<TItem> {
  viewportHeight: number;

  scrollTop: number;
}

export class VirtualizedList<TItem> extends BaseComponent<IVirtualizedListProps<TItem>, IVirtualizedListState<TItem>> implements IList<TItem> {
  private root: HTMLElement;

  constructor(props: IVirtualizedListProps<TItem>, context: any) {
    super(props, context);

    const { initialViewportHeight = window.innerHeight } = this.props;

    this.state = {
      viewportHeight: initialViewportHeight, // Start with the window height

      scrollTop: 0
    };

    this.onScroll = this._async.debounce(this.onScroll, 100);
  }

  componentDidMount() {
    // Start measurement timer, after delay measure actual surface
    this._events.on(this.root, "scroll", this.onScroll);
  }

  componentWillUnmount() {
    this._events.off(this.root, "scroll");
  }

  render() {
    const { className } = this.props;

    // TODO: Make element overflow auto, works better with how people use the list
    return <div className={ css(className, "ms-VirtualizedList") } ref={ this._resolveRef("root") }>

    </div>;
  }

  private renderItems(): (JSX.Element | null)[] {
    const { itemHeight, items, onRenderItem = this.onRenderItem } = this.props;
    const { scrollTop, viewportHeight } = this.state;

    const numberOfElementsOverdraw = 2;

    let result: (JSX.Element | null)[] = [];

    const startIndex = scrollTop / itemHeight - numberOfElementsOverdraw;
    const endIndex = startIndex + (numberOfElementsOverdraw * 2) + (viewportHeight / itemHeight);
    for (let i = startIndex; i < endIndex; ++i) {
      result.push(onRenderItem(items[i], this.onRenderItem));
    }

    // Generate spacer page
    const spacerHeight = startIndex * itemHeight;
    result.unshift(<li style={ { height: spacerHeight } } />)

    return result;
  }

  private onScroll() {
    this.setState({
      scrollTop: this.root.scrollTop
    });
  }

  private onRenderItem(item: TItem): JSX.Element {
    return <li>
      { item }
    </li>;
  }
}

/////

export interface IColumn {
  key: string;

  text: string;
}

export interface IDataListProps<TItem> {
  items: TItem[];

  columns: IColumn[];

  isVirtualized?: boolean;
}

export class DataList<TItem = any> extends React.PureComponent<IDataListProps<TItem> {
  render() {
    const { items, isVirtualized } = this.props;

    // TODO: Header/Columns

    if (isVirtualized) {
      return <VirtualizedList items={ items } />;
    } else {
      return <StaticList items={ items } />;
    }
  }
}