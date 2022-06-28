/* eslint-disable dot-notation */
/* eslint-disable one-var */
/* eslint-disable @fluentui/max-len */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable prefer-const */
import * as React from 'react';
import { createRef } from 'react';
import { select, Selection } from 'd3-selection';
import { hierarchy, tree } from 'd3-hierarchy';

import { ITreeProps, ITreeState, ITreeDataStructure, IDataStructure } from '../../index';

// Create a parent class for common tree components
class StandardTree {
  public treeData: IDataStructure;
  public svg: Selection<SVGSVGElement | null, unknown, null, undefined>;
  constructor(treeData: IDataStructure, svg: Selection<SVGSVGElement | null, unknown, null, undefined>) {
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
      .attr('dy', yCoordinate + rectangleHeight / 2.5)
      .attr('x', () => {
        return xCoordinate + rectangleWidth / 3.6;
      })
      .attr('text-anchor', () => {
        return 'start';
      })
      .text(function () {
        return name;
      })
      .append('tspan')
      .attr('dy', '1.4em')
      .attr('x', () => {
        return xCoordinate + rectangleWidth / 3.4;
      })
      .text(() => {
        return subname;
      });
  }
  // Creates a rectangular path from parent to the child nodes
  public addLinktoNodes(child: any, parent: any, leaf: boolean, rectWidth: number, gap: number): any {
    let path = `M${child.x + rectWidth / 2},${child.y - gap} H${parent.x + rectWidth / 2} V${parent.y}`;
    let leafpath = `M${parent.x + rectWidth / 2},${parent.y} V${parent.y + gap * 5} H${parent.x - gap / 2} H${
      parent.x + rectWidth + gap / 2
    }`;
    return leaf ? leafpath : path;
  }
}

class LayeredTree extends StandardTree {
  public composition: number | undefined;
  constructor(
    treeData: IDataStructure,
    composition: number | undefined,
    svg: Selection<SVGSVGElement | null, unknown, null, undefined>,
  ) {
    super(treeData, svg);
    this.composition = composition;
  }
  public createTree() {
    let root = hierarchy(this.treeData, function (d: any) {
      return d.children;
    });

    let treeHeight = root?.height + 1;

    // Create tree layout, for 2 layered width is 150, 3 layered width is 75
    let treemap = tree().nodeSize([treeHeight === 2 ? 150 : 60, 50]);

    // Assigns the x and y position for the nodes
    let treeData = treemap(root);

    // Compute the new tree layout.
    let nodes = treeData.descendants();

    // Normalize for fixed-depth and width
    nodes.forEach(function (d) {
      d.y = d.depth * 120 + 6;
      d.x += 400;
    });

    // <------------------ Nodes section ------------------>

    // Create tree data structure
    const BFS: Array<ITreeDataStructure> = [];
    let TreeID: number = 0;
    root.eachBefore((d: any) => {
      // make id to find parentID from parent object
      d['id'] = TreeID;
      BFS.push({
        id: `${TreeID}`,
        children: d.children,
        visualID: `depth: ${d.depth}`,
        dataName: `${d.data.name}`,
        subName: `${d.data.subname}`,
        fill: d.data.fill,
        x: d.x,
        y: d.y,
        parentID: d.parent?.id,
      });
      TreeID++;
    });

    let rectHeight = 60,
      rectWidth = 120,
      gap: number = 20;
    let parentSet = new Set();

    for (const d of BFS) {
      // check for leaf nodes
      if (!d.children && !parentSet.has(d.parentID) && treeHeight === 3) {
        const newWidth = 70,
          newHeight = 60;
        parentSet.add(d.parentID);

        let children: any = BFS[d.parentID]?.children;
        // if the parent has 1 child
        if (children.length === 1) {
          this.addNodeShapetoSVG(d.dataName, d.subName, d.x, d.y, d.fill, rectWidth, newHeight);
        }

        // if the parent has more than 2 child

        let dx1: number = BFS[d.parentID]?.x - newWidth * 1.6,
          dy: number = children[0]?.y,
          dx2: number = BFS[d.parentID]?.x;

        if (children.length >= 2) {
          for (let itr = 0; itr < children.length; ++itr) {
            const child = children[itr];
            // For compact compostion
            if (this.composition === 0) {
              if (itr % 2 === 0) {
                this.addNodeShapetoSVG(
                  child.data.name,
                  child.data.subname,
                  dx1 + gap * 4,
                  dy,
                  child.data.fill,
                  newWidth,
                  newHeight,
                );
              }
              if (itr % 2 === 1) {
                this.addNodeShapetoSVG(
                  child.data.name,
                  child.data.subname,
                  dx2 + gap * 4,
                  dy,
                  child.data.fill,
                  newWidth,
                  newHeight,
                );
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

      if (d.children || treeHeight === 2) {
        this.addNodeShapetoSVG(d.dataName, d.subName, d.x, d.y, d.fill, rectWidth, rectHeight);
      }
    }

    // <------------------ Links section ------------------>

    // Create path element
    let link = this.svg.selectAll('path.link').data(nodes.slice(1), function (d: any) {
      return d.id;
    });

    // UPDATE the link
    let linkUpdate = link
      .enter()
      .insert('path', 'g')
      .attr('class', 'link')
      .style('fill', 'none')
      .style('stroke', 'black')
      .style('stroke-width', '2px');

    let linkParentSet = new Set();
    linkUpdate.attr('d', (d: any) => {
      if (treeHeight === 3) {
        // leaf nodes with more than 2 sibling nodes
        if (!d.children && !linkParentSet.has(d?.parent.id)) {
          linkParentSet.add(d?.parent.id);
          return this.addLinktoNodes(BFS[d.id], BFS[d.parent.id], true, rectWidth, gap);
        }
        // non-leaf node
        if (d.children || d.parent.children?.length <= 1) {
          return this.addLinktoNodes(d, d.parent, false, rectWidth, gap);
        }
      } else {
        return this.addLinktoNodes(d, d.parent, false, rectWidth, gap);
      }
      return '';
    });
  }
}

export class TreeBase extends React.Component<ITreeProps, ITreeState> {
  public svgRef = createRef<SVGSVGElement>();
  private margin = {
    top: 30,
    right: 20,
    bottom: 30,
    left: 50,
  };

  private width: number;
  private height: number;
  private treeData: IDataStructure;
  private composition: number | undefined;

  constructor(props: ITreeProps) {
    super(props);
    // this.state = {
    //   data: this.props.treeData,
    // };
    this.width = 1000 - this.margin.left - this.margin.right;
    this.height = 700 - this.margin.top - this.margin.bottom;
    this.treeData = this.props.treeData;
    this.composition = this.props?.composition;
  }

  public componentDidMount() {
    this.createTreeChart();
    // this.setState({
    //   data: this.treeData,
    // });
  }

  public createTreeChart() {
    let svg = select(this.svgRef.current);
    svg.selectAll('*').remove();
    svg.attr('width', this.width).attr('height', this.height).append('g');

    let twoLayerTree = new LayeredTree(this.treeData, this.composition, svg);
    let threeLayerTree = new LayeredTree(this.treeData, this.composition, svg);
    twoLayerTree.createTree();
    threeLayerTree.createTree();
  }

  public render() {
    return (
      <div>
        <svg ref={this.svgRef}></svg>
      </div>
    );
  }
}
