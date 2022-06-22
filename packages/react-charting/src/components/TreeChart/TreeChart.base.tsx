/* eslint-disable one-var */
/* eslint-disable @fluentui/max-len */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable prefer-const */
import * as React from 'react';
import { select } from 'd3-selection';
import * as d3 from 'd3';

import { ITreeProps, ITreeState, ITreeDataStructure } from '../../index';
import { createRef } from 'react';

export class TreeBase extends React.Component<ITreeProps, ITreeState> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public svgRef = createRef<SVGSVGElement>();
  private margin = {
    top: 30,
    right: 20,
    bottom: 30,
    left: 50,
  };

  private width: number;
  private height: number;
  private treeData;

  constructor(props: ITreeProps) {
    super(props);
    this.state = {
      data: this.props.treeData,
    };
    this.width = 380 - this.margin.left - this.margin.right;
    this.height = 140 - this.margin.top - this.margin.bottom;
    this.treeData = this.props.treeData;
  }

  public componentDidMount() {
    console.log('componentDidMount');
    // const treeData = this.props.treeData;
    console.log('data->', this.treeData);
    this.createTree();
    this.setState({
      data: this.treeData,
    });
  }

  public createTree() {
    console.log(this.svgRef.current);
    let svg = select(this.svgRef.current);
    svg.selectAll('*').remove();
    svg.attr('width', this.width).attr('height', this.height).append('g');

    // Create tree layout, for 2 layered width is 150, 3 layered width is 75
    let treemap = d3.tree().nodeSize([120, 40]);

    // eslint-disable-next-line prefer-arrow-callback
    let root = d3.hierarchy(this.treeData, function (d: any) {
      return d.children;
    });

    // let TreeHeight = root?.height + 1;

    // Assigns the x and y position for the nodes
    let treeData = treemap(root);

    // Compute the new tree layout.
    let nodes = treeData.descendants();

    console.log('inside createtree', nodes);
    // Normalize for fixed-depth and width
    // eslint-disable-next-line prefer-arrow-callback
    nodes.forEach(function (d) {
      d.y = d.depth * 120;
      d.x += 100;
    });

    // <------------------ Nodes section ------------------>

    // Create data structure
    const BFS: Array<ITreeDataStructure> = [];
    let TreeID: number = 0;
    root.eachBefore((d: any) => {
      // make id to find parentID from parent object
      // eslint-disable-next-line dot-notation
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

    // eslint-disable-next-line @typescript-eslint/naming-convention
    // eslint-disable-next-line @fluentui/max-len
    // eslint-disable-next-line @typescript-eslint/naming-convention
    function AddNodetoSVG(
      name: string,
      subname: string,
      xCoordinate: number,
      yCoordinate: number,
      fillColor: string,
      rectangleWidth: number,
      rectangleHeight: number,
    ) {
      svg
        .append('rect')
        .attr('width', rectangleWidth)
        .attr('height', rectangleHeight)
        .attr('x', xCoordinate)
        .attr('y', yCoordinate)
        .attr('padding', '10px')
        .attr('rx', '3') // roundness
        .style('stroke', fillColor)
        .style('fill', 'white');

      svg
        .append('text')
        .style('fill', 'black')
        .attr('dy', yCoordinate + rectangleHeight / 2)
        .attr('x', () => {
          return xCoordinate + rectangleWidth / 3.5;
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

    let rectHeight = 70,
      rectWidth = 140;
    // let parentSet = new Set();
    let gap: number = 20;

    for (const d of BFS) {
      console.log(d);
      AddNodetoSVG(d.dataName, d.subName, d.x, d.y, d.fill, rectWidth, rectHeight);
    }
    // <------------------ Links section ------------------>

    // Create path element
    let link = svg.selectAll('path.link').data(nodes.slice(1), function (d: any) {
      return d.id;
    });

    // UPDATE the link
    let linkUpdate = link.enter().insert('path', 'g').attr('class', 'link');
    // let linkParentSet = new Set();
    linkUpdate
      // .transition()
      .attr('d', function (d: any): string {
        return AddLinktoNodes(d, d.parent, false);
      });

    // Creates a rectangular path from parent to the child nodes
    // eslint-disable-next-line @typescript-eslint/naming-convention
    function AddLinktoNodes(child: any, parent: any, leaf: boolean): string {
      let path = `M${child.x + rectWidth / 2},${child.y - gap} H${parent.x + rectWidth / 2} V${parent.y}`;
      let leafpath = `M${parent.x + rectWidth / 2},${parent.y} V${child.y - gap} H${parent.x - gap / 2} H${
        parent.x + rectWidth
      }`;
      return leaf ? leafpath : path;
    }
  }

  public render() {
    // eslint-disable-next-line react/self-closing-comp
    return <div>{this.state.data ? <svg ref={this.svgRef}></svg> : null}</div>;
  }
}
