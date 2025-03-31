import * as React from 'react';
import { hierarchy, tree } from 'd3-hierarchy';
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
import { IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import { select, selectAll } from 'd3-selection';
import { FocusZone } from '@fluentui/react-focus';
import { max as d3Max, min as d3Min } from 'd3-array';

import {
  ITreeProps,
  ITreeState,
  ITreeDataStructure,
  ITreeChartDataPoint,
  ITreeStyleProps,
  ITreeStyles,
} from '../../index';
import { IMargins } from '../../utilities/utilities';

const getClassNames = classNamesFunction<ITreeStyleProps, ITreeStyles>();

// Create a parent class for common tree components
class StandardTree {
  public treeData: ITreeChartDataPoint;
  public styleClassNames: IProcessedStyleSet<ITreeStyles>;

  private _nodeElements: JSX.Element[] = [];
  private _linkElements: JSX.Element[] = [];

  constructor(
    treeData: ITreeChartDataPoint,
    styleClassNames: IProcessedStyleSet<ITreeStyles>,
    _nodeElements: JSX.Element[] = [],
    _linkElements: JSX.Element[] = [],
  ) {
    this.treeData = treeData;
    this.styleClassNames = styleClassNames;
    this._nodeElements = _nodeElements;
    this._linkElements = _linkElements;
  }

  public truncateText(text: string, rectangleWidth: number, padding: number, styleClass: string | undefined) {
    let truncatedText = '';
    const words = text.split(/\s+/).reverse();
    let word: string = '';
    const tspan = select('.svgTree').append('text').attr('class', 'tempText').append('tspan').text(null);

    if (styleClass) {
      tspan.attr('class', styleClass);
    }

    const line: string[] = [];
    while ((word = words.pop()!)) {
      line.push(word);
      tspan.text(line.join(' ') + ' ');
      if (tspan.node() !== null) {
        const w = tspan.node()!.getComputedTextLength();
        if (w > rectangleWidth - padding) {
          line.pop();
          line.push('...');
          break;
        }
      }
    }

    truncatedText = line.join(' ') + ' ';
    tspan.text(null);
    selectAll('.tempText').remove();
    return truncatedText;
  }

  // Append node elements
  // nodeId to create unique key
  public addNodeShapetoSVG(
    name: string,
    subname: string | undefined,
    bodytext: string | undefined,
    metricName: string | undefined,
    xCenterCoordinate: number,
    yCoordinate: number,
    fillColor: string,
    rectangleWidth: number,
    rectangleHeight: number,
    nodeId: number,
    parentInfo: string,
  ) {
    const ariaLabel = `nodeId: ${nodeId} \nnodeMainText: ${name}\nsubText ${subname} ${parentInfo}`;
    const xCoordinate = xCenterCoordinate - rectangleWidth / 2;
    if (metricName || nodeId !== 0 || !bodytext) {
      this._nodeElements.push(
        <rect
          width={rectangleWidth}
          height={rectangleHeight}
          x={xCoordinate}
          y={yCoordinate}
          tabIndex={0}
          role={'text'}
          data-is-focusable={true}
          aria-label={ariaLabel}
          className={this.styleClassNames.rectNode}
          stroke={fillColor}
          key={`${nodeId}${this.styleClassNames.rectNode}`}
        />,
      );
    }

    if (subname) {
      subname = this.truncateText(subname, rectangleWidth, rectangleWidth / 4, this.styleClassNames.rectSubText);
    }
    if (bodytext) {
      bodytext = this.truncateText(bodytext, rectangleWidth, rectangleWidth / 4, this.styleClassNames.rectBodyText);
    }
    if (metricName) {
      metricName = this.truncateText(
        metricName,
        rectangleWidth,
        rectangleWidth / 4,
        this.styleClassNames.rectMetricText,
      );
    }
    name = this.truncateText(name, rectangleWidth, rectangleWidth / 4, this.styleClassNames.rectText);

    // Text position y = y + rectHeight/2, 2 is ratio for depth
    // Text position x = x + rectWidth/2, 2 is ratio for length
    // Sub-text position x = x + rectWidth/2, 2 is ratio for length

    const subValue = metricName ? (
      <tspan className={this.styleClassNames.rectMetricText} dy="1.4em" x={xCoordinate + rectangleWidth / 2}>
        {metricName}
      </tspan>
    ) : bodytext ? (
      <>
        <tspan className={this.styleClassNames.rectSubText} dy="1.4em" x={xCoordinate + rectangleWidth / 2}>
          {subname}
        </tspan>
        <tspan className={this.styleClassNames.rectBodyText} dy="1.4em" x={xCoordinate + rectangleWidth / 2}>
          {bodytext}
        </tspan>
      </>
    ) : (
      <tspan className={this.styleClassNames.rectSubText} dy="1.4em" x={xCoordinate + rectangleWidth / 2}>
        {subname}
      </tspan>
    );

    if (!subname && !metricName && !bodytext) {
      this._nodeElements.push(
        <text
          textAnchor="middle"
          className={this.styleClassNames.rectMetricText}
          dy={yCoordinate + rectangleHeight / 1.6}
          x={xCoordinate + rectangleWidth / 2}
          key={`${nodeId}${this.styleClassNames.rectText}`}
          data-is-focusable={nodeId === 0}
        >
          {name}
        </text>,
      );
    } else {
      this._nodeElements.push(
        <text
          textAnchor="middle"
          className={metricName ? this.styleClassNames.rectSubText : this.styleClassNames.rectText}
          dy={metricName ? yCoordinate + rectangleHeight / 2.5 : yCoordinate + rectangleHeight / 2}
          x={xCoordinate + rectangleWidth / 2}
          key={`${nodeId}${this.styleClassNames.rectText}`}
          data-is-focusable={nodeId === 0}
        >
          {name}
          {subValue}
        </text>,
      );
    }
  }
  // Create a rectangular path from parent to the child nodes
  public createPathLink(
    parentX: number,
    parentY: number,
    childX: number,
    childY: number,
    leaf: boolean,
    rectWidth: number,
    rectHeight: number,
    gap: number,
    childXMax: number,
  ): string {
    // gap adds ratio for parent.y to child.y

    /*Below code is used to draw lines(___|) to show the parent child relation i.e a vertical line
      emerging from the parent and
      then a horzontal line encompassing all the its children which are
      shown below it .so it gives a visual representation of tree branches.

      So for making this path firstly we are moving to the childX which is the mid point of the node and then
      we are subtracting the half of rectwidth to move the complete width of the rectangle and
      we are subtracting gap from y cordinate as we are making this line at a little gap from node.
      Then we are building that line horizonatlly till childXmax, again adding half rectwidth to complete
      the line till end as childXmax will be midpoint.
      Then last part is for making line vertical for that we move to the parentx position and
      then draw the vertical till parenty + rectHeight + gap/2
      We have seperate path for leaf node as we are using different composition like compact, long etc.*/

    const path = `M${childX - rectWidth / 2},${childY - gap} H${childXMax + rectWidth / 2} M${parentX},${childY - gap}
    V${parentY + rectHeight + gap / 2}`;

    const leafpath = `M${parentX},${parentY + rectHeight + gap / 2} V${parentY + gap * 5}
    H${parentX - rectWidth / 2} H${parentX + rectWidth / 2}`;

    // based on the type of node return leafpath or path element
    return leaf ? leafpath : path;
  }

  // Append path link element
  public addLinktoSVG(
    nodeId: number,
    parentX: number,
    parentY: number,
    childX: number,
    childY: number,
    leaf: boolean,
    rectWidth: number,
    rectHeight: number,
    gap: number,
    childXMax: number = 0,
  ) {
    this._linkElements.push(
      <path
        className={this.styleClassNames.link}
        d={this.createPathLink(parentX, parentY, childX, childY, leaf, rectWidth, rectHeight, gap, childXMax)}
        key={`${nodeId}${this.styleClassNames.link}`}
      />,
    );
  }
}

// Create child class to Add Tree component based on treeHeight
class LayeredTree extends StandardTree {
  public composition: number | undefined;
  private _treeTraversal: number | undefined;
  constructor(
    treeData: ITreeChartDataPoint,
    composition: number | undefined,
    styleClassNames: IProcessedStyleSet<ITreeStyles>,
    _nodeElements: JSX.Element[] = [],
    _linkElements: JSX.Element[] = [],
    _treeTraversal: number | undefined,
  ) {
    super(treeData, styleClassNames, _nodeElements, _linkElements);
    this.composition = composition;
    this._treeTraversal = _treeTraversal;
  }
  public createTree(givenLayoutWidth: number | undefined, screenWidth: number) {
    givenLayoutWidth = givenLayoutWidth! < 65 ? 65 : givenLayoutWidth! > 90 ? 90 : givenLayoutWidth;
    const layoutWidth = givenLayoutWidth || 75;
    const root = hierarchy(this.treeData, d => {
      return d.children;
    });

    // Find tree Height
    const treeHeight = root?.height + 1;

    // Create tree layout, width: layoutWidth, height: layoutWidth/1.5 and add node separation
    const treeChart = tree()
      .nodeSize([layoutWidth, layoutWidth / 1.5])
      .separation((a, b) => {
        return a.parent === root && b.parent === root ? 3.5 : 1;
      });

    // Assigns the x and y position for the nodes
    const treeData = treeChart(root);

    // Compute the new tree layout.
    const nodes = treeData.descendants();

    // Normalize for fixed-depth and width
    // Normalise y coordinate by depth of each node by a factor of 130
    // Normalise x coordinate by start coordinate 0 with screenSize/3
    nodes.forEach(d => {
      d.y = d.depth === 0 ? 10 : d.depth * 130;
      d.x += screenWidth / 2;
    });

    // <------------------ Traversal section ------------------>

    // Create tree data structure
    const treeDataStructure: Array<ITreeDataStructure> = [];
    let TreeID: number = 0;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createTreeDataStructure = (d: any) => {
      d.id = TreeID;
      treeDataStructure.push({
        id: TreeID,
        children: d.children,
        dataName: d.data.name,
        subName: d.data.subname,
        bodyText: d.data.bodytext,
        metricName: d.data?.metric,
        fill: d.data.fill,
        x: d.x,
        y: d.y,
        parentID: d.parent?.id,
      });
      TreeID++;
    };

    this._treeTraversal === 0
      ? root.each(d => {
          createTreeDataStructure(d);
        })
      : root.eachBefore(d => {
          createTreeDataStructure(d);
        });

    const rectWidth = layoutWidth * 3;
    const rectHeight = rectWidth / 3.45;
    const gap: number = 20;
    const parentSet = new Set();

    for (const d of treeDataStructure) {
      const parentInfo =
        d.id === 0
          ? 'Root Node'
          : `Parent info parentId: ${d.parentID}
      ${treeDataStructure[d.parentID].dataName}
      ${treeDataStructure[d.parentID].subName}`;

      // check for leaf nodes
      if (!d.children && !parentSet.has(d.parentID) && treeHeight === 3) {
        const compactNodeWidth = (rectWidth - gap) / 2;
        const compactNodeHeight = rectHeight;
        parentSet.add(d.parentID);

        // <------------------ Links section ------------------>
        this.addLinktoSVG(
          d.id,
          treeDataStructure[d.parentID].x,
          treeDataStructure[d.parentID].y,
          treeDataStructure[d.id].x,
          treeDataStructure[d.id].y,
          true,
          rectWidth,
          rectHeight,
          gap,
        );

        // <------------------ Nodes section ------------------>

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const children: any = treeDataStructure[d.parentID]?.children;

        const compactNodeCenterX1: number = treeDataStructure[d.parentID]?.x - compactNodeWidth / 2 - gap / 2;
        const compactNodeCenterX2: number = treeDataStructure[d.parentID]?.x + compactNodeWidth / 2 + gap / 2;
        const longNodeCenterX: number = treeDataStructure[d.parentID]?.x;
        let dy: number = children[0]?.y;

        for (let itr = 0; itr < children.length; ++itr) {
          const child = children[itr];

          // Given Composition
          if (this.composition !== undefined) {
            // For compact compostion
            if (this.composition === 0) {
              this.addNodeShapetoSVG(
                child.data.name,
                child.data.subname,
                child.data.bodytext,
                child.data.metricName,
                // If the leaf node count is 1 ,
                //irrespective of provided composition we should always use long composition
                itr % 2 === 0 ? (children.length === 1 ? longNodeCenterX : compactNodeCenterX1) : compactNodeCenterX2,
                dy,
                child.data.fill,
                children.length === 1 ? rectWidth : compactNodeWidth,
                rectHeight,
                child.id,
                parentInfo,
              );
              if (itr % 2 === 1) {
                dy += compactNodeHeight + gap;
              }
            }
            // For long compostion
            else {
              this.addNodeShapetoSVG(
                child.data.name,
                child.data.subname,
                child.data.bodytext,
                child.data.metricName,
                longNodeCenterX,
                dy,
                child.data.fill,
                rectWidth,
                rectHeight,
                child.id,
                parentInfo,
              );
              dy += compactNodeHeight + gap;
            }
          }

          // Automatic Node Composition
          else {
            if (children.length > 2) {
              this.addNodeShapetoSVG(
                child.data.name,
                child.data.subname,
                child.data.bodytext,
                child.data.metricName,
                itr % 2 === 0 ? compactNodeCenterX1 : compactNodeCenterX2,
                dy,
                child.data.fill,
                children.length === 1 ? rectWidth : compactNodeWidth,
                rectHeight,
                child.id,
                parentInfo,
              );
              if (itr % 2 === 1) {
                dy += compactNodeHeight + gap;
              }
            } else {
              this.addNodeShapetoSVG(
                child.data.name,
                child.data.subname,
                child.data.bodytext,
                child.data.metricName,
                longNodeCenterX,
                dy,
                child.data.fill,
                rectWidth,
                rectHeight,
                child.id,
                parentInfo,
              );
              dy += compactNodeHeight + gap;
            }
          }
        }
      }

      if (d.children || treeHeight <= 2) {
        // <------------------ Nodes section ------------------>
        // Since the height <=2 we will be using long compositon.
        this.addNodeShapetoSVG(
          d.dataName,
          d.subName,
          d.bodyText,
          d.metricName,
          d.x,
          d.y,
          d.fill,
          rectWidth,
          rectHeight,
          d.id,
          parentInfo,
        );

        // <------------------ Links section ------------------>
        if (d.id === 0 && d.children) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const children: any = treeDataStructure[d.id]?.children;
          const childXMin = d3Min(children, (child: ITreeDataStructure) => child.x as number)!;
          const childXMax = d3Max(children, (child: ITreeDataStructure) => child.x as number)!;
          this.addLinktoSVG(d.id, d.x, d.y, childXMin, d.children[0].y, false, rectWidth, rectHeight, gap, childXMax);
        }
      }
    }
  }
}

export class TreeChartBase extends React.Component<ITreeProps, ITreeState> {
  private _treeData: ITreeChartDataPoint;
  private _width: number;
  private _height: number;
  private _composition: number | undefined;
  private _classNames: IProcessedStyleSet<ITreeStyles>;
  private _margin: IMargins;
  private _nodeElements: JSX.Element[] = [];
  private _linkElements: JSX.Element[] = [];
  private _treeTraversal: number | undefined;

  constructor(props: ITreeProps) {
    super(props);
    this._margin = {
      top: this.props.margins?.top || 30,
      bottom: this.props.margins?.bottom || 30,
      left: this.props.margins?.left || 50,
      right: this.props.margins?.right || 20,
    };
    this._width = this.props.width || 1500;
    this._height = this.props.height || 700;
    this._treeData = this.props.treeData;
    this._composition = this.props?.composition;
    this._treeTraversal = this.props.treeTraversal;

    this.state = {
      _width: this._width,
      _height: this._height,
    };
  }

  public componentDidMount() {
    const { theme, className, styles } = this.props;

    // Get classNames to create component styling
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
    });

    // Call createTreeChart function in componentDidMount
    this.createTreeChart();

    this.setState({
      _width: this.props.width || 1500,
      _height: this.props.height || 700,
    });
  }

  public componentDidUpdate(prevProps: ITreeProps): void {
    if (prevProps.layoutWidth !== this.props.layoutWidth) {
      const svgText = selectAll('text');
      const svgRect = selectAll('rect');
      const svgLink = selectAll('path');

      if (this._nodeElements.length === 0 && this._linkElements.length === 0) {
        svgText.remove();
        svgRect.remove();
        svgLink.remove();
      }

      this.createTreeChart();
    }
  }
  public createTreeChart() {
    const nodeElements: JSX.Element[] = [];
    const linkElements: JSX.Element[] = [];

    // Instantiate inherited class and call createTree function for the object
    const treeObject = new LayeredTree(
      this._treeData,
      this._composition,
      this._classNames,
      nodeElements,
      linkElements,
      this._treeTraversal,
    );
    const width = this.state._width - this._margin.left! - this._margin.right!;
    treeObject.createTree(this.props.layoutWidth, width);
    this._nodeElements = nodeElements;
    this._linkElements = linkElements;
  }

  public render(): JSX.Element {
    return (
      <FocusZone>
        <div className={this._classNames?.root}>
          <svg
            className="svgTree"
            width={this.state._width - this._margin.left! - this._margin.right!}
            height={this.state._height - this._margin.top! - this._margin.bottom!}
          >
            <g className="svgNode">{this._nodeElements.map(element => element)}</g>
            <g className="svgLink">{this._linkElements.map(element => element)}</g>
          </svg>
        </div>
      </FocusZone>
    );
  }
}
