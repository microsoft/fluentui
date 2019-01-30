import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { SubwayNav } from './SubwayNav';
import { ISubwayNavStep } from '@uifabric/dashboard/lib/components/SubwayNav/SubwayNavStep.types';

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

function clickedStep(step: ISubwayNavStep, subStep: ISubwayNavStep | undefined) {
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

describe('SubwayNav', () => {
  it('renders SubwayNav correctly', () => {
    SubwayNav.prototype.componentDidMount = jest.fn();

    const component = renderer.create(
      // tslint:disable-next-line:jsx-no-lambda
      <SubwayNav steps={[]} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can complete rendering', done => {
    const wrapper = mount(<SubwayNav steps={mockData(10, false)} />);
    wrapper.setProps({ items: mockData(10, true), onPagesUpdated: (pages: any) => done() });
  });
});
