jest.mock('react-dom');
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { IDataStructure, TreeChart } from './index';

const treeData: IDataStructure = {
  name: 'Root Node',
  subname: 'subtext',
  fill: '#0099BC',
  children: [
    { name: 'Child 1', subname: 'subtext', fill: 'pink' },
    { name: 'Child 2', subname: 'subtext', fill: 'pink' },
    { name: 'Child 3', subname: 'subtext', fill: 'pink' },
    { name: 'Child 4', subname: 'subtext', fill: 'pink' },
  ],
};

describe('TreeChart snapshot testing', () => {
  it('renders treechart two layer correctly', () => {
    const component = renderer.create(<TreeChart treeData={treeData} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
