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

const getClassNames = classNamesFunction<ITreeStyleProps, ITreeStyles>();

// Create a parent class for common tree components
class StandardTree {
  public treeData: ITreeChartDataPoint;
  public styleClassNames: {
    rectmetricText: string | undefined;
    rectSubText: string | undefined;
    link: string;
    rectNode: string;
    rectText: string;
  };

  private _nodeElements: Array<React.SVGProps<SVGRectElement> | React.SVGProps<SVGTextElement>> = [];
  private _linkElements: Array<React.SVGProps<SVGPathElement>> = [];
  constructor(
    treeData: ITreeChartDataPoint,
    styleClassNames: { link: string; rectNode: string; rectText: string; rectSubText: string; rectmetricText: string },
    _nodeElements: Array<React.SVGProps<SVGRectElement> | React.SVGProps<SVGTextElement>> = [],
    _linkElements: Array<React.SVGProps<SVGPathElement>> = [],
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

    if (styleClass !== undefined) {
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
    metricName: string | undefined,
    xCoordinate: number,
    yCoordinate: number,
    fillColor: string,
    rectangleWidth: number,
    rectangleHeight: number,
    nodeId: number,
    parentInfo: string,
  ) {
    const ariaLabel = `nodeId: ${nodeId} \nnodeMainText: ${name}\nsubText ${subname} ${parentInfo}`;
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

    if (subname !== undefined) {
      subname = this.truncateText(subname, rectangleWidth, rectangleWidth / 4, this.styleClassNames.rectSubText);
    }
    if (metricName !== undefined) {
      metricName = this.truncateText(
        metricName,
        rectangleWidth,
        rectangleWidth / 4,
        this.styleClassNames.rectmetricText,
      );
    }
    name = this.truncateText(name, rectangleWidth, rectangleWidth / 4, this.styleClassNames.rectText);

    // Text position y = y + rectHeight/2, 2 is ratio for depth
    // Text position x = x + rectWidth/2, 2 is ratio for length
    // Sub-text position x = x + rectWidth/2, 2 is ratio for length

    const subValue =
      metricName !== undefined ? (
        <tspan className={this.styleClassNames.rectmetricText} dy="1.4em" x={xCoordinate + rectangleWidth / 2}>
          {metricName}
        </tspan>
      ) : (
        <tspan className={this.styleClassNames.rectSubText} dy="1.4em" x={xCoordinate + rectangleWidth / 2}>
          {subname}
        </tspan>
      );

    if (subname === undefined && metricName === undefined) {
      this._nodeElements.push(
        <text
          textAnchor="middle"
          className={this.styleClassNames.rectmetricText}
          dy={yCoordinate + rectangleHeight / 1.6}
          x={xCoordinate + rectangleWidth / 2}
          key={`${nodeId}${this.styleClassNames.rectText}`}
        >
          {name}
        </text>,
      );
    } else {
      this._nodeElements.push(
        <text
          textAnchor="middle"
          className={metricName !== undefined ? this.styleClassNames.rectSubText : this.styleClassNames.rectText}
          dy={metricName !== undefined ? yCoordinate + rectangleHeight / 2.5 : yCoordinate + rectangleHeight / 2}
          x={xCoordinate + rectangleWidth / 2}
          key={`${nodeId}${this.styleClassNames.rectText}`}
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

    const path = `M${childX},${childY - gap} H${childXMax + rectWidth} M${parentX + rectWidth / 2},${childY - gap}
    V${parentY + rectHeight + gap / 2}`;

    const leafpath = `M${parentX + rectWidth / 2},${parentY + rectHeight + gap / 2} V${
      parentY + gap * 5
    } H${parentX} H${parentX + rectWidth}`;

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
    styleClassNames: { link: string; rectNode: string; rectText: string; rectSubText: string; rectmetricText: string },
    _nodeElements: Array<React.SVGProps<SVGRectElement> | React.SVGProps<SVGTextElement>> = [],
    _linkElements: Array<React.SVGProps<SVGPathElement>> = [],
    _treeTraversal: number | undefined,
  ) {
    super(treeData, styleClassNames, _nodeElements, _linkElements);
    this.composition = composition;
    this._treeTraversal = _treeTraversal;
  }
  public createTree(givenLayoutWidth: number | undefined, screenWidth: number) {
    if (givenLayoutWidth !== undefined) {
      if (givenLayoutWidth < 65) {
        givenLayoutWidth = 65;
      }
      if (givenLayoutWidth > 90) {
        givenLayoutWidth = 90;
      }
    }
    const layoutWidth = givenLayoutWidth || 75;
    const root = hierarchy(this.treeData, d => {
      return d.children;
    });

    // Find tree Height
    const treeHeight = root?.height + 1;

    // Create tree layout, width: layoutWidth, height: layoutWidth/1.5 and add node separation
    const treemap = tree()
      .nodeSize([layoutWidth, layoutWidth / 1.5])
      .separation((a, b) => {
        return a.parent === root && b.parent === root ? 3.5 : 1;
      });

    // Assigns the x and y position for the nodes
    const treeData = treemap(root);

    // Compute the new tree layout.
    const nodes = treeData.descendants();

    // Normalize for fixed-depth and width
    // Normalise y coordinate by depth of each node by a factor of 130
    // Normalise x coordinate by start coordinate 0 with screenSize/3
    nodes.forEach(d => {
      d.y = d.depth === 0 ? 10 : d.depth * 130;
      d.x += screenWidth / 3;
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
        const newWidth = (rectWidth - gap) / 2;
        const newHeight = rectHeight;
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

        const dx1: number = treeDataStructure[d.parentID]?.x;
        const dx2: number = treeDataStructure[d.parentID]?.x + newWidth + gap;
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
                child.data.metricName,
                itr % 2 === 0 ? dx1 : dx2,
                dy,
                child.data.fill,
                children.length === 1 ? rectWidth : newWidth,
                rectHeight,
                child.id,
                parentInfo,
              );
              if (itr % 2 === 1) {
                dy += newHeight + gap;
              }
            }
            // For long compostion
            else {
              this.addNodeShapetoSVG(
                child.data.name,
                child.data.subname,
                child.data.metricName,
                dx1,
                dy,
                child.data.fill,
                rectWidth,
                rectHeight,
                child.id,
                parentInfo,
              );
              dy += newHeight + gap;
            }
          }

          // Automatic Node Composition
          else {
            if (children.length > 2) {
              this.addNodeShapetoSVG(
                child.data.name,
                child.data.subname,
                child.data.metricName,
                itr % 2 === 0 ? dx1 : dx2,
                dy,
                child.data.fill,
                children.length === 1 ? rectWidth : newWidth,
                rectHeight,
                child.id,
                parentInfo,
              );
              if (itr % 2 === 1) {
                dy += newHeight + gap;
              }
            } else {
              this.addNodeShapetoSVG(
                child.data.name,
                child.data.subname,
                child.data.metricName,
                dx1,
                dy,
                child.data.fill,
                rectWidth,
                rectHeight,
                child.id,
                parentInfo,
              );
              dy += newHeight + gap;
            }
          }
        }
      }

      if (d.children || treeHeight <= 2) {
        // <------------------ Nodes section ------------------>
        this.addNodeShapetoSVG(
          d.dataName,
          d.subName,
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
  private _margin: { left: number; right: number; top: number; bottom: number };
  private _nodeElements: Array<React.SVGProps<SVGRectElement> | React.SVGProps<SVGTextElement>> = [];
  private _linkElements: Array<React.SVGProps<SVGPathElement>> = [];
  private _treeTraversal: number | undefined;

  constructor(props: ITreeProps) {
    super(props);
    this._margin = { top: 30, right: 20, bottom: 30, left: 50 };
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
    const nodeElements: Array<React.SVGProps<SVGRectElement> | React.SVGProps<SVGTextElement>> = [];
    const linkElements: Array<React.SVGProps<SVGPathElement>> = [];

    // Create styleClass object to access it in parent class
    const styleClassNames = {
      link: this._classNames.link,
      rectNode: this._classNames.rectNode,
      rectText: this._classNames.rectText,
      rectSubText: this._classNames.rectSubText,
      rectmetricText: this._classNames.rectMetricText,
    };
    // Instantiate inherited class and call createTree function for the object
    const treeObject = new LayeredTree(
      this._treeData,
      this._composition,
      styleClassNames,
      nodeElements,
      linkElements,
      this._treeTraversal,
    );
    treeObject.createTree(this.props.layoutWidth, this._width);
    this._nodeElements = nodeElements;
    this._linkElements = linkElements;
  }

  public render(): JSX.Element {
    return (
      <FocusZone>
        <div className={this._classNames?.root}>
          <svg
            className="svgTree"
            width={this.state._width - this._margin.left - this._margin.right}
            height={this.state._height - this._margin.top - this._margin.bottom}
          >
            <g className="svgNode">{this._nodeElements.map(element => element)}</g>
            <g className="svgLink">{this._linkElements.map(element => element)}</g>
          </svg>
        </div>
      </FocusZone>
    );
  }
}
