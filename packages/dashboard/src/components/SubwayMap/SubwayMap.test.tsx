import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { SubwayMap } from './SubwayMap';
import { ISubwayMapStep } from '@uifabric/dashboard/lib/components/SubwayMap/SubwayMap.types';

/**
 * generate Random id
 */
function generateRandomId(): string {
  return (
    Math.random()
      .toString(36)
      .substring(2) + new Date().getTime().toString(36)
  );
}

function clickedStep(step: ISubwayMapStep, subStep: ISubwayMapStep | undefined) {
  console.log('step clicked = ' + step.label);
  if (subStep !== undefined) {
    console.log('sub step clicked - ' + subStep.label);
  }
}

// Populate mock data for testing
function mockData(count: number, formComplete: boolean): any {
  const data = [];
  let _data = {};

  for (let i = 0; i < count; i++) {
    _data = {
      key: generateRandomId(),
      label: 'Step ' + i,
      onClickStep: () => clickedStep
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
    const wrapper = mount(<SubwayMap steps={mockData(10, false)} />);
    wrapper.setProps({ items: mockData(10, true), onPagesUpdated: (pages: any) => done() });
  });
});
