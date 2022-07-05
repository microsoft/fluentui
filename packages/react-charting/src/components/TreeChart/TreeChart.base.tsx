import * as React from 'react';
import { createRef } from 'react';
import { select, Selection } from 'd3-selection';
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
  constructor(treeData: ITreeChartDataPoint, styleClassNames: { link: string; rectNode: string; rectText: string }) {
    this.treeData = treeData;
    this.styleClassNames = styleClassNames;
  }
  public addNodeShapetoSVG(
    name: string,
    subname: string,
    xCoordinate: number,
    yCoordinate: number,
    fillColor: string,
    rectangleWidth: number,
    rectangleHeight: number,
    svg: Selection<SVGGElement | null, unknown, null, undefined>,
  ) {
    svg
      .append('rect')
      .attr('width', rectangleWidth)
      .attr('height', rectangleHeight)
      .attr('x', xCoordinate)
      .attr('y', yCoordinate)
      .attr('focusable', false)
      .attr('role', 'document')
      .attr('aria-hidden', true)
      .attr('data-name', name)
      .attr('tabindex', 0)
      .attr('aria-label', name)
      .attr('class', this.styleClassNames.rectNode)
      .attr('rx', '1')
      .style('stroke', fillColor);

    // Text position y = y + rectHeight/2.5, 2.5 is ratio for depth
    // Text position x = x + rectWidth/3.5, 3.5 is ratio for length
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('class', this.styleClassNames.rectText)
      .attr('dy', yCoordinate + rectangleHeight / 2.5)
      .attr('x', xCoordinate + rectangleWidth / 2)
      .text(() => {
        return name;
      })
      // Sub-text position x = x + rectWidth/3.5, 3.5 is ratio for length
      .append('tspan')
      .attr('class', 'rectSubText')
      .attr('dy', '1.4em')
      .attr('x', () => {
        return xCoordinate + rectangleWidth / 2;
      })
      .text(() => {
        return subname;
      });
  }

  // Create a rectangular path from parent to the child nodes

  public addLinktoNodes(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parent: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    child: any,
    leaf: boolean,
    rectWidth: number,
    rectHeight: number,
    gap: number,
  ): string {
    // gap adds ratio for parent.y to child.y
    const path = `M${child.x + rectWidth / 2},${child.y - gap} H${parent.x + rectWidth / 2} V${
      parent.y + rectHeight + gap / 2
    }`;
    const leafpath = `M${parent.x + rectWidth / 2},${parent.y + rectHeight + gap / 2} V${parent.y + gap * 5} H${
      parent.x - gap / 2
    } H${parent.x + rectWidth + gap / 2}`;

    // based on the type of node return leafpath or path element
    return leaf ? leafpath : path;
  }
}
// Create child class to Add Tree component based on treeHeight
class LayeredTree extends StandardTree {
  public composition: number | undefined;
  public svg: Selection<SVGSVGElement | null, unknown, null, undefined>;
  constructor(
    treeData: ITreeChartDataPoint,
    composition: number | undefined,
    svg: Selection<SVGSVGElement | null, unknown, null, undefined>,
    styleClassNames: { link: string; rectNode: string; rectText: string },
  ) {
    super(treeData, styleClassNames);
    this.composition = composition;
    this.svg = svg;
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

    // <------------------ Nodes section ------------------>

    // Create tree data structure
    const treeDataStructure: Array<ITreeDataStructure> = [];
    let TreeID: number = 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    root.eachBefore((d: any) => {
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

    const rectHeight = 60;
    const rectWidth = 120;
    const gap: number = 20;
    const parentSet = new Set();
    const svgNode = this.svg.append('g').attr('class', 'svgNode');

    for (const d of treeDataStructure) {
      // check for leaf nodes
      if (!d.children && !parentSet.has(d.parentID) && treeHeight === 3) {
        const newWidth = 70;
        const newHeight = 60;
        parentSet.add(d.parentID);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const children: any = treeDataStructure[d.parentID]?.children;
        // if the parent has 1 child
        if (children.length === 1) {
          this.addNodeShapetoSVG(d.dataName, d.subName, d.x, d.y, d.fill, rectWidth, newHeight, svgNode);
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
                svgNode,
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
                svgNode,
              );
              dy += newHeight + gap / 2;
            }
          }
        }
      }

      if (d.children || treeHeight <= 2) {
        this.addNodeShapetoSVG(d.dataName, d.subName, d.x, d.y, d.fill, rectWidth, rectHeight, svgNode);
      }
    }

    // <------------------ Links section ------------------>

    // Create path element
    const svgLink = this.svg.append('g').attr('class', 'svgLink');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const link = svgLink.selectAll('path.link').data(nodes.slice(1), (d: any) => {
      return d.id;
    });

    // UPDATE the link
    const linkUpdate = link.enter().insert('path', 'g').attr('class', this.styleClassNames.link);

    const linkParentSet = new Set();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    linkUpdate.attr('d', (d: any): any => {
      if (treeHeight === 3) {
        // leaf nodes with more than 2 sibling nodes
        if (!d.children && !linkParentSet.has(d?.parent.id)) {
          linkParentSet.add(d?.parent.id);
          return this.addLinktoNodes(
            treeDataStructure[d.parent.id],
            treeDataStructure[d.id],
            true,
            rectWidth,
            rectHeight,
            gap,
          );
        }
        // non-leaf node
        if (d.children || d.parent.children?.length <= 1) {
          return this.addLinktoNodes(d.parent, d, false, rectWidth, rectHeight, gap);
        }
      } else {
        return this.addLinktoNodes(d.parent, d, false, rectWidth, rectHeight, gap);
      }
    });
  }
}

export class TreeChartBase extends React.Component<ITreeProps, ITreeState> {
  private _treeData: ITreeChartDataPoint;
  private _svgRef = createRef<SVGSVGElement>();
  private _width: number | undefined;
  private _height: number | undefined;
  private _composition: number | undefined;
  private _classNames: IProcessedStyleSet<ITreeStyles>;
  private _rootElem: HTMLElement | null;
  private _margin: { left: number; right: number; top: number; bottom: number };

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
    const svg = select(this._svgRef.current);

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
      const twoLayerTree = new LayeredTree(this._treeData, this._composition, svg, styleClassNames);
      twoLayerTree.createTree();
    } else {
      const threeLayerTree = new LayeredTree(this._treeData, this._composition, svg, styleClassNames);
      threeLayerTree.createTree();
    }
  }

  public render(): JSX.Element {
    return (
      <div className="svgTreeDiv" ref={(rootElem: HTMLElement | null) => (this._rootElem = rootElem)}>
        <svg ref={this._svgRef} className="svgTree" />
      </div>
    );
  }
}
