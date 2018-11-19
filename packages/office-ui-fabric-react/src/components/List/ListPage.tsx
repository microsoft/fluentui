import * as React from 'react';

export interface IListPageProps {
  visible: boolean;
  items: any[];
  startIndex: number;
  endIndex: number;
  onRenderCell?: (item?: any, index?: number, isScrolling?: boolean) => React.ReactNode;
}

export interface IListPageStyles {
  hiddenStyle: React.CSSProperties | undefined;
  backgroundColor: string;
}

export class ListPage extends React.PureComponent<IListPageProps, IListPageStyles> {
  private _rootElement = React.createRef<HTMLDivElement>();

  constructor(props: IListPageProps) {
    super(props);
    this.state = {
      hiddenStyle: undefined,
      backgroundColor:
        `rgba(` + Math.floor(255 * Math.random()) + `,` + Math.floor(255 * Math.random()) + `,` + Math.floor(255 * Math.random()) + `1)`
    };
  }

  public componentWillReceiveProps(newProps: IListPageProps) {
    if (this.props.visible !== newProps.visible) {
      let hiddenStyle: React.CSSProperties | undefined = undefined;

      if (!newProps.visible) {
        const rootRect = this._rootElement.current!.getBoundingClientRect();

        hiddenStyle = {
          height: rootRect.height
        };
      }

      this.setState({ hiddenStyle });
    }
  }

  public render() {
    const { hiddenStyle } = this.state;

    return (
      <div ref={this._rootElement} style={hiddenStyle}>
        {hiddenStyle ? undefined : this._renderItems()}
      </div>
    );
  }

  private _renderItems(): React.ReactNode[] {
    const cells: React.ReactNode[] = [];
    let { startIndex } = this.props;
    const { endIndex, items, onRenderCell = () => <div /> } = this.props;

    for (; startIndex <= endIndex; startIndex++) {
      const item = items[startIndex];
      const key = item.key || String(startIndex);

      cells.push(<div key={key}>{onRenderCell(items[startIndex], startIndex)}</div>);
    }

    return cells;
  }
}
