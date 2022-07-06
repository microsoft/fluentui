import * as React from 'react';
import { select } from 'd3-selection';
import { hierarchy, tree } from 'd3-hierarchy';
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
import { IProcessedStyleSet } from '@fluentui/react/lib/Styling';

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
  public styleClassNames: { link: string; rectNode: string; rectText: string };

  private _nodeElements: Array<React.SVGProps<SVGRectElement> | React.SVGProps<SVGTextElement>> = [];
  private _linkElements: Array<React.SVGProps<SVGPathElement>> = [];

  constructor(
    treeData: ITreeChartDataPoint,
    styleClassNames: { link: string; rectNode: string; rectText: string },
    _nodeElements: Array<React.SVGProps<SVGRectElement> | React.SVGProps<SVGTextElement>> = [],
    _linkElements: Array<React.SVGProps<SVGPathElement>> = [],
  ) {
    this.treeData = treeData;
    this.styleClassNames = styleClassNames;
    this._nodeElements = _nodeElements;
    this._linkElements = _linkElements;
  }

  // Append node elements
  public addNodeShapetoSVG(
    name: string,
    subname: string,
    xCoordinate: number,
    yCoordinate: number,
    fillColor: string,
    rectangleWidth: number,
    rectangleHeight: number,
    // nodeId to create unique key
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
        data-is-focusable={true}
        aria-label={ariaLabel}
        className={this.styleClassNames.rectNode}
        rx={1.5}
        stroke={fillColor}
        key={`${nodeId}${this.styleClassNames.rectNode}`}
      />,
    );

    // Text position y = y + rectHeight/2.5, 2.5 is ratio for depth
    // Text position x = x + rectWidth/2, 2 is ratio for length
    // Sub-text position x = x + rectWidth/2, 2 is ratio for length
    this._nodeElements.push(
      <text
        textAnchor="middle"
        className={this.styleClassNames.rectText}
        dy={yCoordinate + rectangleHeight / 2.5}
        x={xCoordinate + rectangleWidth / 2}
        key={`${nodeId}${this.styleClassNames.rectText}`}
      >
        {name}
        <tspan className={'rectSubtext'} dy="1.4em" x={xCoordinate + rectangleWidth / 2}>
          {subname}
        </tspan>
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
    const leafpath = `M${parentX + rectWidth / 2},${parentY + rectHeight + gap / 2} V${parentY + gap * 5} H${
      parentX - gap / 2
    } H${parentX + rectWidth + gap / 2}`;

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
  constructor(
    treeData: ITreeChartDataPoint,
    composition: number | undefined,
    styleClassNames: { link: string; rectNode: string; rectText: string },
    _nodeElements: Array<React.SVGProps<SVGRectElement> | React.SVGProps<SVGTextElement>> = [],
    _linkElements: Array<React.SVGProps<SVGPathElement>> = [],
  ) {
    super(treeData, styleClassNames, _nodeElements, _linkElements);
    this.composition = composition;
  }
  public createTree() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const root = hierarchy(this.treeData, (d: any) => {
      return d.children;
    });

    // Find tree Height
    const treeHeight = root?.height + 1;

    // Create tree layout, for two-layered width is 150, three-layered width is 60; height = 50
    // for treeheight == 1, width = 60
    // nodeSize([width, height])
    const treemap = tree().nodeSize([treeHeight === 2 ? 150 : 60, 50]);

    // Assigns the x and y position for the nodes
    const treeData = treemap(root);

    // Compute the new tree layout.
    const nodes = treeData.descendants();

    // Normalize for fixed-depth and width
    nodes.forEach(d => {
      // Normalise y coordinate by depth of each node by a factor of 130
      d.y = d.depth === 0 ? 10 : d.depth * 130;
      // Normalise x coordinate by start coordinate 0 with 400
      d.x += 400;
    });

    // <------------------ Traversal section ------------------>

    // Create tree data structure
    const treeDataStructure: Array<ITreeDataStructure> = [];
    let nLeafNodes = 0;
    let TreeID: number = 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    root.each((d: any) => {
      // Find number of leaf nodes to decide composition
      if (d.depth === 2) {
        nLeafNodes++;
      }
      // make id to find parentID from parent object
      // eslint-disable-next-line dot-notation
      d['id'] = TreeID;
      treeDataStructure.push({
        id: TreeID,
        children: d.children,
        dataName: `${d.data.name}`,
        subName: `${d.data.subname}`,
        fill: d.data.fill,
        x: d.x,
        y: d.y,
        parentID: d.parent?.id,
      });
      TreeID++;
    });

    // eslint-disable-next-line no-console
    console.log(nLeafNodes);

    const rectHeight = 60;
    const rectWidth = 120;
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
        const newWidth = 70;
        const newHeight = 60;
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
        // if the parent has 1 child
        if (children.length === 1) {
          this.addNodeShapetoSVG(d.dataName, d.subName, d.x, d.y, d.fill, rectWidth, newHeight, d.id, parentInfo);
        }

        // if the parent has more than 2 child
        if (children.length >= 2) {
          const dx1: number = treeDataStructure[d.parentID]?.x - newWidth * 1.6;
          let dy: number = children[0]?.y;
          const dx2: number = treeDataStructure[d.parentID]?.x;

          for (let itr = 0; itr < children.length; ++itr) {
            const child = children[itr];
            // For compact compostion
            if (this.composition === 0) {
              this.addNodeShapetoSVG(
                child.data.name,
                child.data.subname,
                (itr % 2 === 0 ? dx1 : dx2) + gap * 4,
                dy,
                child.data.fill,
                newWidth,
                newHeight,
                child.id,
                parentInfo,
              );
              if (itr % 2 === 1) {
                dy += newHeight + gap / 2;
              }
            }
            // For long compostion
            else {
              this.addNodeShapetoSVG(
                child.data.name,
                child.data.subname,
                dx1 + gap * 5.5,
                dy,
                child.data.fill,
                rectWidth,
                newHeight,
                child.id,
                parentInfo,
              );
              dy += newHeight + gap / 2;
            }
          }
        }
      }

      if (d.children || treeHeight <= 2) {
        // <------------------ Nodes section ------------------>
        this.addNodeShapetoSVG(d.dataName, d.subName, d.x, d.y, d.fill, rectWidth, rectHeight, d.id, parentInfo);

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

  constructor(props: ITreeProps) {
    super(props);
    this._margin = { top: 30, right: 20, bottom: 30, left: 50 };
    this._width = this.props.width;
    this._height = this.props.height;
    this._treeData = this.props.treeData;
    this._composition = this.props?.composition;

    this.state = {
      _width: this._width || 900,
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
    };

    // Instantiate inherited class and call createTree function for the object
    if (this._composition === undefined) {
      const twoLayerTree = new LayeredTree(
        this._treeData,
        this._composition,
        styleClassNames,
        this._nodeElements,
        this._linkElements,
      );
      twoLayerTree.createTree();
    } else {
      const threeLayerTree = new LayeredTree(
        this._treeData,
        this._composition,
        styleClassNames,
        this._nodeElements,
        this._linkElements,
      );
      threeLayerTree.createTree();
    }
  }

  public render(): JSX.Element {
    return (
      <div className="svgTreeDiv" ref={(rootElem: HTMLElement | null) => (this._rootElem = rootElem)}>
        <svg className="svgTree">
          <g className="svgNode">{this._nodeElements.map(element => element)}</g>
          <g className="svgLink">{this._linkElements.map(element => element)}</g>
        </svg>
      </div>
    );
  }
}
