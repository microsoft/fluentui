import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { createElementWrapper, createFactory, ISlot } from './slots';

describe('createElementWrapper', () => {
  let reactCalls: number;

  beforeEach(() => {
    jest.spyOn(React, 'createElement').mockImplementation(() => {
      reactCalls += 1;
    });
    reactCalls = 0;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('calls React.createElement by default', () => {
    createElementWrapper('span');

    expect(reactCalls).toEqual(1);
  });

  it('calls React.createElement without isSlot property present', () => {
    let factoryCalls = 0;
    const factoryComponent: ISlot<any> = () => {
      factoryCalls += 1;
      return <div />;
    };

    createElementWrapper(factoryComponent);

    expect(reactCalls).toEqual(1);
    expect(factoryCalls).toEqual(0);
  });

  it('does not call React.createElement with isSlot property present', () => {
    let factoryCalls = 0;
    const factoryComponent: ISlot<any> = () => {
      factoryCalls += 1;
      // prevent React.createElement from being called here by returning null
      return null as any;
    };
    factoryComponent.isSlot = true;

    createElementWrapper(factoryComponent);

    expect(reactCalls).toEqual(0);
    expect(factoryCalls).toEqual(1);
  });
});

describe('createFactory', () => {
  const componentProps = { component: 'componentValue', id: 'componentIdValue', children: ['Component Child 1', 'Component Child 2'] };
  const userProps = { user: 'userValue', id: 'userIdValue', children: ['User Child 1', 'User Child 2'] };
  const userPropString = 'userPropString';
  const defaultProp = 'shorthand-prop';
  const factoryOptions = { defaultProp };

  const TestComponent = (props: any) => {
    return <div {...props} />;
  };

  it(`renders without userProps`, () => {
    const component = mount(createFactory(TestComponent)(componentProps));
    expect(component.props()).toEqual(componentProps);
  });

  it(`renders userProp string as child`, () => {
    const component = mount(createFactory(TestComponent)(componentProps, userPropString));
    expect(component.props()).toEqual({ ...componentProps, children: userPropString });
  });

  it(`renders userProp integer as child`, () => {
    const component = mount(createFactory(TestComponent)(componentProps, 42));
    expect(component.props()).toEqual({ ...componentProps, children: 42 });
  });

  it(`renders userProp string as defaultProp`, () => {
    const component = mount(createFactory(TestComponent, factoryOptions)(componentProps, userPropString));
    expect(component.props()).toEqual({ ...componentProps, [defaultProp]: userPropString });
  });

  it(`renders userProp integer as defaultProp`, () => {
    const component = mount(createFactory(TestComponent, factoryOptions)(componentProps, 42));
    expect(component.props()).toEqual({ ...componentProps, [defaultProp]: 42 });
  });

  it('merges userProps over componentProps', () => {
    const component = mount(createFactory(TestComponent, factoryOptions)(componentProps, userProps));
    expect(component.props()).toEqual({ ...componentProps, ...userProps });
  });

  it('renders userProp JSX correctly', () => {
    const component = renderer.create(createFactory(TestComponent)(componentProps, <p id="I should be the only prop in the output" />));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders userProp function correctly', () => {
    const component = renderer.create(
      createFactory(TestComponent)(componentProps, () => <p id="I should be the only prop in the output" />)
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
