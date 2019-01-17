import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { SubwayMap } from './SubwayMap';
import { SubwayMapStepState } from './SubwayMap.types';

// Populate mock data for testing
function mockData(count: number, state: SubwayMapStepState): any {
  const data = [];
  let _data = {};

  for (let i = 0; i < count; i++) {
    _data = {
      label: 'Step ' + i,
      content: { content: <div>Step {i} Under construction</div>, mandatoryFieldComplete: false }
    };

    data.push(_data);
  }

  return data;
}

describe('SubwayMap', () => {
  it('renders SubwayMap correctly', () => {
    SubwayMap.prototype.componentDidMount = jest.fn();

    const component = renderer.create(
      // tslint:disable-next-line:jsx-no-lambda
      <SubwayMap steps={[]} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can complete rendering', done => {
    const wrapper = mount(<SubwayMap steps={mockData(10, SubwayMapStepState.NotStarted)} />);
    wrapper.setProps({ items: mockData(10, SubwayMapStepState.Completed), onPagesUpdated: (pages: any) => done() });
  });
});
