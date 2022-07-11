import * as React from 'react';
import { select } from 'd3-selection';
import { hierarchy, tree } from 'd3-hierarchy';
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
import { IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import { FocusZone } from '@fluentui/react-focus';

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

  // Append node elements
  // nodeId to create unique key
  public addNodeShapetoSVG(
    name: string,
    subname: string,
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
  ): string {
    // gap adds ratio for parent.y to child.y
    const path = `M${childX + rectWidth / 2},${childY - gap} H${parentX + rectWidth / 2} V${
      parentY + rectHeight + gap / 2
    }`;
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
  ) {
    this._linkElements.push(
      <path
        className={this.styleClassNames.link}
        d={this.createPathLink(parentX, parentY, childX, childY, leaf, rectWidth, rectHeight, gap)}
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
  public createTree() {
    const root = hierarchy(this.treeData, d => {
      return d.children;
    });

    // Find tree Height
    const treeHeight = root?.height + 1;

    // Create tree layout, width: 70, height: 90 and add node separation
    const treemap = tree()
      .nodeSize([75, 50])
      .separation((a, b) => {
        return a.parent === root && b.parent === root ? 3.5 : 1;
      });

    // Assigns the x and y position for the nodes
    const treeData = treemap(root);

    // Compute the new tree layout.
    const nodes = treeData.descendants();

    // Normalize for fixed-depth and width
    // Normalise y coordinate by depth of each node by a factor of 130
    // Normalise x coordinate by start coordinate 0 with 450
    nodes.forEach(d => {
      d.y = d.depth === 0 ? 10 : d.depth * 130;
      d.x += 400;
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

    const rectHeight = 70;
    const rectWidth = 220;
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
        const newHeight = 70;
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
        if (d.id !== 0) {
          this.addLinktoSVG(
            d.id,
            treeDataStructure[d.parentID].x,
            treeDataStructure[d.parentID].y,
            treeDataStructure[d.id].x,
            treeDataStructure[d.id].y,
            false,
            rectWidth,
            rectHeight,
            gap,
          );
        }
      }
    }
  }
}

export class TreeChartBase extends React.Component<ITreeProps, ITreeState> {
  private _treeData: ITreeChartDataPoint;
  private _width: number | undefined;
  private _height: number | undefined;
  private _composition: number | undefined;
  private _classNames: IProcessedStyleSet<ITreeStyles>;
  private _rootElem: HTMLElement | null;
  private _margin: { left: number; right: number; top: number; bottom: number };
  private _nodeElements: Array<React.SVGProps<SVGRectElement> | React.SVGProps<SVGTextElement>> = [];
  private _linkElements: Array<React.SVGProps<SVGPathElement>> = [];
  private _treeTraversal: number | undefined;

  constructor(props: ITreeProps) {
    super(props);
    this._margin = { top: 30, right: 20, bottom: 30, left: 50 };
    this._width = this.props.width || 1200;
    this._height = this.props.height || 700;
    this._treeData = this.props.treeData;
    this._composition = this.props?.composition;
    this._treeTraversal = this.props.treeTraversal;

    this.state = {
      _width: this._width || 1000,
      _height: this._height || 700,
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
    const reducedHeight = this._rootElem && this._rootElem.offsetHeight / 5;
    this.setState({
      _width: (this._rootElem && this._rootElem!.offsetWidth)!,
      _height: (this._rootElem && this._rootElem!.offsetHeight - reducedHeight!)!,
    });
  }

  public createTreeChart() {
    const svg = select('.svgTree');

    // Set SVG width and height
    svg
      .attr('width', this.state._width - this._margin.left - this._margin.right)
      .attr('height', this.state._height - this._margin.top - this._margin.bottom);

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
      this._nodeElements,
      this._linkElements,
      this._treeTraversal,
    );
    treeObject.createTree();
  }

  public render(): JSX.Element {
    return (
      <FocusZone>
        <div className="svgTreeDiv" ref={(rootElem: HTMLElement | null) => (this._rootElem = rootElem)}>
          <svg className="svgTree">
            <g className="svgNode">{this._nodeElements.map(element => element)}</g>
            <g className="svgLink">{this._linkElements.map(element => element)}</g>
          </svg>
        </div>
      </FocusZone>
    );
  }
}
