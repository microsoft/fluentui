import * as React from 'react';
import { classNamesFunction, getId } from 'office-ui-fabric-react/lib/Utilities';
import { ISankeyChartProps, ISankeyChartStyleProps, ISankeyChartStyles } from './SankeyChart.types';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
import * as d3Sankey from 'd3-sankey';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
const getClassNames = classNamesFunction<ISankeyChartStyleProps, ISankeyChartStyles>();

export interface IRefArrayData {
  index?: string;
  refElement?: SVGGElement;
}

export class SankeyChartBase extends React.Component<
  ISankeyChartProps,
  {
    containerWidth: number;
    containerHeight: number;
    showHover: boolean;
    calloutSourceData: string;
    calloutDestinationData: string;
    calloutValue: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectedRef: any;
    calloutColor: string;
  }
> {
  private _classNames: IProcessedStyleSet<ISankeyChartStyles>;
  private chartContainer: HTMLDivElement;
  private _reqID: number;
  private _calloutId: string;
  private _refArray: IRefArrayData[];
  constructor(props: ISankeyChartProps) {
    super(props);
    this.state = {
      containerHeight: 0,
      containerWidth: 0,
      showHover: false,
      calloutSourceData: '',
      calloutDestinationData: '',
      calloutValue: '',
      selectedRef: '',
      calloutColor: '',
    };
    this._calloutId = getId('callout');
    this._refArray = [];
  }
  public componentDidMount(): void {
    this._fitParentContainer();
  }

  public componentDidUpdate(prevProps: ISankeyChartProps): void {
    if (prevProps.shouldResize !== this.props.shouldResize) {
      this._fitParentContainer();
    }
  }
  public componentWillUnmount(): void {
    cancelAnimationFrame(this._reqID);
  }
  public render(): React.ReactNode {
    const { theme, className, styles, pathColor } = this.props;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: this.state.containerWidth,
      height: this.state.containerHeight,
      pathColor: pathColor,
      calloutColor: this.state.calloutColor,
      className,
    });
    const margin = { top: 10, right: 0, bottom: 10, left: 0 };
    const width = this.state.containerWidth - margin.left - margin.right;
    const height =
      this.state.containerHeight - margin.top - margin.bottom > 0
        ? this.state.containerHeight - margin.top - margin.bottom
        : 0;

    const sankey = d3Sankey
      .sankey()
      .nodeWidth(5)
      .nodePadding(6)
      .extent([
        [1, 1],
        [width - 1, height - 6],
      ]);

    sankey(this.props.data.SankeyChartData!);
    const nodeData = this._createNodes(width);
    const linkData = this._createLinks();
    return (
      <div
        className={this._classNames.root}
        role={'presentation'}
        // eslint-disable-next-line react/jsx-no-bind
        ref={(rootElem: HTMLDivElement) => (this.chartContainer = rootElem)}
      >
        <FocusZone direction={FocusZoneDirection.bidirectional}>
          <svg width={width} height={height} id={getId('sankeyChart')}>
            <g className={this._classNames.nodes}>{nodeData}</g>
            <g className={this._classNames.links} strokeOpacity={0.2}>
              {linkData}
            </g>
          </svg>
        </FocusZone>
        <Callout
          target={this.state.selectedRef}
          alignTargetEdge={true}
          isBeakVisible={false}
          directionalHint={DirectionalHint.bottomRightEdge}
          gapSpace={15}
          hidden={!(!this.props.hideTooltip && this.state.showHover)}
          id={this._calloutId}
          preventDismissOnLostFocus={true}
        >
          <div className={this._classNames.calloutContentRoot}>
            <div className={this._classNames.calloutDateTimeContainer}>
              {/*TO DO  if we add time for callout then will use this */}
              {/* <div className={this._classNames.calloutContentX}>07:00am</div> */}
            </div>
            <div className={this._classNames.calloutInfoContainer}>
              <div className={this._classNames.calloutBlockContainer}>
                <div className={this._classNames.calloutlegendText}>
                  <b>Source: </b>
                  {this.state.calloutSourceData}
                </div>
                <div className={this._classNames.calloutlegendText}>
                  <b>Destination: </b>
                  {this.state.calloutDestinationData}
                </div>
                <div className={this._classNames.calloutContentY}>{this.state.calloutValue}</div>
              </div>
            </div>
          </div>
        </Callout>
      </div>
    );
  }

  private _createLinks(): React.ReactNode[] | undefined {
    const links: React.ReactNode[] = [];
    if (this.props.data.SankeyChartData) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.props.data.SankeyChartData.links.forEach((singleLink: any, index: number) => {
        const path = d3Sankey.sankeyLinkHorizontal();
        const pathValue = path(singleLink);
        const linkId = getId('link');
        const link = (
          <g
            // eslint-disable-next-line react/jsx-no-bind
            ref={(e: SVGLineElement | null) => {
              this._refCallback(e!, linkId);
            }}
            key={index}
          >
            <path
              key={index}
              d={pathValue ? pathValue : undefined}
              strokeWidth={Math.max(1, singleLink.width)}
              id={linkId}
              // eslint-disable-next-line react/jsx-no-bind
              onMouseOver={this._handleHover.bind(this, singleLink)}
              // eslint-disable-next-line react/jsx-no-bind
              onMouseMove={this._handleHover.bind(this, singleLink)}
              // eslint-disable-next-line react/jsx-no-bind
              onFocus={this._handleFocus.bind(this, singleLink, linkId)}
              onMouseLeave={this._hoverLeave}
              data-is-focusable={true}
              className={this._classNames.path}
            />
          </g>
        );
        links.push(link);
      });
    }
    return links;
  }

  private _refCallback(element: SVGGElement, linkID: string): void {
    this._refArray.push({ index: linkID, refElement: element });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _handleFocus = (link: any, linkId: string) => {
    this._refArray.forEach((obj: IRefArrayData) => {
      if (obj.index === linkId) {
        this.setState({
          calloutSourceData: link.source.name,
          calloutDestinationData: link.target.name,
          calloutValue: link.value,
          showHover: true,
          selectedRef: obj.refElement,
          calloutColor: link.source.color,
        });
      }
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _handleHover = (link: any, mouseEvent: React.MouseEvent<SVGPathElement>) => {
    mouseEvent.persist();
    this.setState({
      calloutSourceData: link.source.name,
      calloutDestinationData: link.target.name,
      calloutValue: link.value,
      showHover: true,
      selectedRef: mouseEvent,
      calloutColor: link.source.color,
    });
  };

  private _hoverLeave = () => {
    this.setState({ showHover: false });
  };

  private _createNodes(width: number): React.ReactNode[] | undefined {
    const nodes: React.ReactNode[] = [];
    if (this.props.data.SankeyChartData) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.props.data.SankeyChartData.nodes.forEach((singleNode: any, index: number) => {
        const height = singleNode.y1 - singleNode.y0 > 0 ? singleNode.y1 - singleNode.y0 : 0;
        const node = (
          <g id={getId('nodeGElement')} key={index}>
            <rect
              x={singleNode.x0}
              y={singleNode.y0}
              height={height}
              width={singleNode.x1 - singleNode.x0}
              fill={singleNode.color}
              id={getId('nodeBar')}
            />
            <text
              x={singleNode.x0 < width / 2 ? singleNode.x1 + 6 : singleNode.x0 - 6}
              y={(singleNode.y1 + singleNode.y0) / 2}
              dy={'0.35em'}
              textAnchor={singleNode.x0 < width / 2 ? 'start' : 'end'}
            >
              {singleNode.name}
            </text>
          </g>
        );
        nodes.push(node);
      });
      return nodes;
    }
  }
  private _fitParentContainer(): void {
    const { containerWidth, containerHeight } = this.state;
    this._reqID = requestAnimationFrame(() => {
      const container = this.props.parentRef ? this.props.parentRef : this.chartContainer;
      const currentContainerWidth = container.getBoundingClientRect().width;
      const currentContainerHeight = container.getBoundingClientRect().height;
      const shouldResize = containerWidth !== currentContainerWidth || containerHeight !== currentContainerHeight;
      if (shouldResize) {
        this.setState({
          containerWidth: currentContainerWidth,
          containerHeight: currentContainerHeight,
        });
      }
    });
  }
}
