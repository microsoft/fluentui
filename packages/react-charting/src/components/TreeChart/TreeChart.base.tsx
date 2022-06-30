import * as React from 'react';
import { createRef } from 'react';
import { select, Selection } from 'd3-selection';
import { hierarchy, tree } from 'd3-hierarchy';

import { ITreeProps, ITreeState, ITreeDataStructure, ITreeChartDataPoint } from '../../index';

// Create a parent class for common tree components
class StandardTree {
  public treeData: ITreeChartDataPoint;
  public svg: Selection<SVGSVGElement | null, unknown, null, undefined>;
  constructor(treeData: ITreeChartDataPoint, svg: Selection<SVGSVGElement | null, unknown, null, undefined>) {
    this.treeData = treeData;
    this.svg = svg;
  }

  public addNodeShapetoSVG(
    name: string,
    subname: string,
    xCoordinate: number,
    yCoordinate: number,
    fillColor: string,
    rectangleWidth: number,
    rectangleHeight: number,
  ) {
    this.svg
      .append('rect')
      .attr('width', rectangleWidth)
      .attr('height', rectangleHeight)
      .attr('x', xCoordinate)
      .attr('y', yCoordinate)
      .attr('padding', '10px')
      .attr('rx', '1')
      .style('stroke', fillColor)
      .style('stroke-width', '2px')
      .style('fill', 'white');

    this.svg
      .append('text')
      .style('fill', 'black')
      // Text position y = y + rectHeight/2.5, 2.5 is ratio for depth
      .attr('dy', yCoordinate + rectangleHeight / 2.5)
      // Text position x = x + rectWidth/3.5, 3.5 is ratio for length
      .attr('x', () => {
        return xCoordinate + rectangleWidth / 3.5;
      })
      .attr('text-anchor', () => {
        return 'start';
      })
      .text(() => {
        return name;
      })
      .append('tspan')
      .attr('dy', '1.4em')
      // Sub-text position x = x + rectWidth/3.5, 3.5 is ratio for length
      .attr('x', () => {
        return xCoordinate + rectangleWidth / 3.5;
      })
      .text(() => {
        return subname;
      });
  }

  // Creates a rectangular path from parent to the child nodes

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public addLinktoNodes(parent: any, child: any, leaf: boolean, rectWidth: number, gap: number): any {
    // gap adds ratio for parent.y to child.y
    const path = `M${child.x + rectWidth / 2},${child.y - gap} H${parent.x + rectWidth / 2} V${parent.y}`;
    const leafpath = `M${parent.x + rectWidth / 2},${parent.y} V${parent.y + gap * 5} H${parent.x - gap / 2} H${
      parent.x + rectWidth + gap / 2
    }`;
    // based on the type of node return leafpath or path element
    return leaf ? leafpath : path;
  }
}
// Create child class to Add Tree component based on treeHeight
class LayeredTree extends StandardTree {
  public composition: number | undefined;

  constructor(
    treeData: ITreeChartDataPoint,
    composition: number | undefined,
    svg: Selection<SVGSVGElement | null, unknown, null, undefined>,
  ) {
    super(treeData, svg);
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
        id: `${TreeID}`,
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
          this.addNodeShapetoSVG(d.dataName, d.subName, d.x, d.y, d.fill, rectWidth, newHeight);
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
              );
              dy += newHeight + gap / 2;
            }
          }
        }
      }

      if (d.children || treeHeight <= 2) {
        this.addNodeShapetoSVG(d.dataName, d.subName, d.x, d.y, d.fill, rectWidth, rectHeight);
      }
    }

    // <------------------ Links section ------------------>

    // Create path element
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const link = this.svg.selectAll('path.link').data(nodes.slice(1), (d: any) => {
      return d.id;
    });

    // UPDATE the link
    const linkUpdate = link
      .enter()
      .insert('path', 'g')
      .attr('class', 'link')
      .style('fill', 'none')
      .style('stroke', 'black')
      .style('stroke-width', '2px');

    const linkParentSet = new Set();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    linkUpdate.attr('d', (d: any) => {
      if (treeHeight === 3) {
        // leaf nodes with more than 2 sibling nodes
        if (!d.children && !linkParentSet.has(d?.parent.id)) {
          linkParentSet.add(d?.parent.id);
          return this.addLinktoNodes(treeDataStructure[d.parent.id], treeDataStructure[d.id], true, rectWidth, gap);
        }
        // non-leaf node
        if (d.children || d.parent.children?.length <= 1) {
          return this.addLinktoNodes(d.parent, d, false, rectWidth, gap);
        }
      } else {
        return this.addLinktoNodes(d.parent, d, false, rectWidth, gap);
      }
      return '';
    });
  }
}

export class TreeBase extends React.Component<ITreeProps, ITreeState> {
  public svgRef = createRef<SVGSVGElement>();
  private margin: { left: number; right: number; top: number; bottom: number };

  private width: number;
  private height: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private treeData: any;
  private composition: number | undefined;

  constructor(props: ITreeProps) {
    super(props);
    this.margin = this.props.margin;
    this.width = this.props.width - this.margin.left - this.margin.right;
    this.height = this.props.height - this.margin.top - this.margin.bottom;
    this.treeData = this.props.treeData;
    this.composition = this.props?.composition;
  }

  public componentDidMount() {
    this.createTreeChart();
  }

  public createTreeChart() {
    const svg = select(this.svgRef.current);
    svg.selectAll('*').remove();
    svg.attr('width', this.width).attr('height', this.height).append('g');

    const twoLayerTree = new LayeredTree(this.treeData, this.composition, svg);
    const threeLayerTree = new LayeredTree(this.treeData, this.composition, svg);
    twoLayerTree.createTree();
    threeLayerTree.createTree();
  }

  public render() {
    return (
      <div>
        <svg ref={this.svgRef} className={'svgTree'} />
      </div>
    );
  }
}
