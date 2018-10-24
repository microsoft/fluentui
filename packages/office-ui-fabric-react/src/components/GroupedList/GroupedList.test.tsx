import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { GroupedList } from './GroupedList';
import { List } from 'office-ui-fabric-react/lib/components/List';

import { createGroups } from 'office-ui-fabric-react/lib/utilities/exampleData';

// Populate mock data for testing
function mockData(count: number): any {
  const data = [];
  let _data = {};

  for (let i = 0; i < count; i++) {
    _data = {
      key: i,
      name: 'Item ' + i,
      value: i
    };
    data.push(_data);
  }

  return data;
}

describe('GroupedList', () => {
  it('renders grouped list correctly', () => {
    List.prototype.componentDidMount = jest.fn();

    const component = renderer.create(
      // tslint:disable-next-line:jsx-no-lambda
      <GroupedList items={mockData(3)} onRenderCell={() => null} groups={createGroups(3, 3, 0, 3)} />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders grouped list with custom expand button aria label correctly', () => {
    List.prototype.componentDidMount = jest.fn();

    const component = renderer.create(
      <GroupedList
        items={mockData(3)}
        // tslint:disable-next-line:jsx-no-lambda
        onRenderCell={() => null}
        groups={createGroups(3, 3, 0, 3)}
        groupProps={{
          headerProps: {
            expandButtonProps: {
              'aria-label': 'Custom aria label'
            }
          }
        }}
      />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
