# **TreeChart component**

# Common tree component

### Standard Tree Diagram Components

## Assumptions

- No more than four child or leaf nodes on any given level
- Do not add more than three total levels
- Compact or long compositions can only be used when all node elements are leaves (meaning, they are terminal ends). Whereas for the intermediate nodes, the implementation would be same as standard tree diagram.

## Features

Nodes

- Contains main text and subtext, positioned in the middle of rectangle.

![image](https://user-images.githubusercontent.com/59837325/177205565-cfb22522-ba11-4db3-8664-816387f7d66a.png)


Branch

- The branches have flexibility to support 1-4 child nodes
- Structure of branch is determined by `SVG <path> element,` based on the x,y coordinates of the child and parent node.
- Path Structure used in code:

```ts
M${child.x + rectWidth / 2}, ${child.y - gap} H${parent.x + rectWidth / 2} V${ parent.y + rectHeight + gap / 2}
```
![image](https://user-images.githubusercontent.com/59837325/177205587-727bcb6e-805c-4ed8-b9a9-0f00ec7e4d35.png)
![image](https://user-images.githubusercontent.com/59837325/177205597-d852e37b-c1f6-4dec-ba7d-0219c2e8e00b.png)


## Structure

- Build Data Structure in JSON format:

```ts
DataStructure: ITreeChartDataPoint {
    name: main text,
    subname: sub text,
    fill: border color,
    children: Array of child nodes
}
```

- Create Tree hierarchy and SVG object
- To traverse the tree create tree data structure with parentID.

```ts
ITreeDataStructure {
    id: node id,
    children: Node object,
    dataName: main text,
    subName: subtext,
    fill: node stroke color,
    x: x coordinate,
    y: y coordinate,
    parentID: parent ID
}
```

- Create parent class `StandardTree` with methods `addNodeShapetoSVG` to add rectangles with text and subtext and `addLinktoNodes` to add elbow connectors.

```ts
addNodeShapetoSVG(
    name: string,
    subname: string,
    xCoordinate: number,
    yCoordinate: number,
    fillColor: string,
    rectangleWidth: number,
    rectangleHeight: number,
    svg: Selection<SVGGElement | null, unknown, null, undefined>,
    tabIndex: number,
  )
```

```ts
addLinktoNodes(
    parent: any,
    child: any,
    leaf: boolean,
    rectWidth: number,
    rectHeight: number,
    gap: number,
  )
```

- Props used in the structure:

```ts
interface ITreeProps {
  treeData: ITreeChartDataPoint;
  composition?: number | undefined;
  width?: number;
  height?: number;
  styles?: IStyleFunctionOrObject<ITreeStyleProps, ITreeStyles>;
  className?: string;
  theme?: ITheme;
}
```

# Two Layer Chart

## Assumptions

- The maximum depth of the nodes is 2, and maximum nodes at any given level is 4.
- Branch width expands as the number of nodes increases.

## Features

- The main text and subtext are added consecutively, and rectangle shapes with specific width and height are added for both parents.
- The Node border color is extracted from the JSON Data Structure.
- Example of the two-layer structure:

![image](https://user-images.githubusercontent.com/59837325/177205659-1a6ff078-37c6-4d75-8d4e-5ea6bea8c6f0.png)

## Structure

- If `treeHeight == 2` use parent class addNodeShapetoSVG methods to append data.
- Similarly implement path links, using addLinktoNodes method.

# Three Layer Chart

## Assumptions

- In the compact composition if the parent node has 1 child node, the width of child node is same as parent.
- All the nodes in second level have children, i.e., it’s a full tree.

## Features

- The compact composition positions nodes in the form of two stacks, left stack and right stack.
- The links are generated differently for the leaf nodes.

![image](https://user-images.githubusercontent.com/59837325/177205690-d98a1d4c-6f86-4bb0-9e05-781d4ab8e70c.png)

- The long compositions positions nodes in form of a single stack in the middle.

![image](https://user-images.githubusercontent.com/59837325/177205723-5b6c3ca5-9393-442e-a434-158dd644e7c4.png)

## Structure

**For compact composition:**

- We add visited parents to a set and add all the children of that parent at once, and never visit children of that parent again.
- Stack the even/left leaf nodes i.e., leaf1, and leaf2 are positioned at dx1, and similarly stack right nodes at dx2, and increment dy.

![image](https://user-images.githubusercontent.com/59837325/177205763-ab02d924-c404-4503-8210-b36ecf29be91.png)

**For long composition:**

- We stack the nodes one by one, for long composition.
- Link implementation is similar to compact composition.

![image](https://user-images.githubusercontent.com/59837325/177205788-83659fd0-f34e-4056-8b54-340337612d9b.png)

# Component Styling

- Use to getClassNames from .types.tsx file.

```ts
const getClassNames = classNamesFunction<ITreeStyleProps, ITreeStyles>();
```

- Create `styleClassNames` object to access it in parent class.

```ts
const styleClassNames = {
  link: this._classNames.link,
  rectNode: this._classNames.rectNode,
  rectText: this._classNames.rectText,
};
```

# Testing

## Snapshot Testing

- The test verifies if the UI renders each component correctly.
- The behavior matches the expected behavior.
- Tests for string format snapshot tests.

## Interaction Testing

- Test if the svgNode and svgLink innerHTML should never be null using the className.
- For different types of charts and props test how many times `object[method]` is called from main `TreeChartBase` class component.
