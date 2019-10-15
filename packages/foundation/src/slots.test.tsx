import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { withSlots, createFactory, getSlots } from './slots';
import { IProcessedSlotProps, ISlot, ISlotProp, ISlotPropRenderFunction, ISlotDefinition } from './ISlots';

describe('withSlots', () => {
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
    withSlots('span');

    expect(reactCalls).toEqual(1);
  });

  it('calls React.createElement without isSlot property present', () => {
    let factoryCalls = 0;
    const factoryComponent: ISlot<any> = () => {
      factoryCalls += 1;
      return <div />;
    };

    withSlots(factoryComponent);

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

    withSlots(factoryComponent);

    expect(reactCalls).toEqual(0);
    expect(factoryCalls).toEqual(1);
  });
});

describe('createFactory', () => {
  const componentProps = { component: 'componentValue', id: 'componentIdValue', children: ['Component Child 1', 'Component Child 2'] };
  const userProps = { user: 'userValue', id: 'userIdValue', children: ['User Child 1', 'User Child 2'] };
  const renderProps = { render: 'renderValue', id: 'renderIdValue', children: ['Render Child 1', 'Render Child 2'] };
  const userPropString = 'userPropString';
  const defaultProp = 'shorthand-prop';
  const emptyClassName = { className: '' };
  const factoryOptions = { defaultProp };

  const TestComponent = (props: any) => {
    return <div {...props} />;
  };

  it(`passes componentProps without userProps`, () => {
    const component = mount(createFactory(TestComponent)(componentProps, undefined, undefined));
    expect(component.props()).toEqual({ ...componentProps, ...emptyClassName });
  });

  it(`passes userProp string as child`, () => {
    const component = mount(createFactory(TestComponent)(componentProps, userPropString, undefined));
    expect(component.props()).toEqual({ ...componentProps, children: userPropString, ...emptyClassName });
  });

  it(`passes userProp integer as child`, () => {
    const component = mount(createFactory(TestComponent)(componentProps, 42, undefined));
    expect(component.props()).toEqual({ ...componentProps, children: 42, ...emptyClassName });
  });

  it(`passes userProp string as defaultProp`, () => {
    const component = mount(createFactory(TestComponent, factoryOptions)(componentProps, userPropString, undefined));
    expect(component.props()).toEqual({ ...componentProps, [defaultProp]: userPropString, ...emptyClassName });
  });

  it(`passes userProp integer as defaultProp`, () => {
    const component = mount(createFactory(TestComponent, factoryOptions)(componentProps, 42, undefined));
    expect(component.props()).toEqual({ ...componentProps, [defaultProp]: 42, ...emptyClassName });
  });

  it('merges userProps over componentProps', () => {
    const component = mount(createFactory(TestComponent, factoryOptions)(componentProps, userProps, undefined));
    expect(component.props()).toEqual({ ...componentProps, ...userProps, ...emptyClassName });
  });

  it('renders userProp integer as children', () => {
    const component = renderer.create(createFactory(TestComponent)(componentProps, 42, undefined));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders userProp string as children', () => {
    const component = renderer.create(createFactory(TestComponent)(componentProps, userPropString, undefined));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders userProp JSX with one prop', () => {
    const component = renderer.create(
      createFactory(TestComponent)(componentProps, <p id="I should be the only prop in the output" />, undefined)
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders userProp function with one prop', () => {
    const component = renderer.create(
      createFactory(TestComponent)(componentProps, () => <p id="I should be the only prop in the output" />, undefined)
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`passes props and type arguments to userProp function`, done => {
    const userPropsFunction: ISlotPropRenderFunction<typeof userProps | typeof renderProps> = render =>
      render((type, props) => {
        expect(props).toEqual({ ...componentProps, ...renderProps, ...emptyClassName });
        expect(type).toEqual(TestComponent);
        done();
        return <div {...props} />;
      }, renderProps);

    createFactory(TestComponent, factoryOptions)(componentProps, userPropsFunction, undefined);
  });
});

describe('getSlots', () => {
  interface ITestSlotComponent1Props extends IProcessedSlotProps {
    testSlot1Prop?: string;
  }
  interface ITestSlotComponent2Props extends IProcessedSlotProps {
    testSlot2Prop?: string;
  }
  interface ITestSlots {
    testSlot1: ISlotProp<ITestSlotComponent1Props>;
    testSlot2: ISlotProp<ITestSlotComponent2Props>;
  }

  interface ITestProps extends ITestSlots {}

  it(`creates slots and passes merged props to them`, done => {
    const testUserProps = {
      testSlot1: {
        className: 'testSlot1Classname',
        testSlot1Prop: 'userProp1'
      },
      testSlot2: {
        className: 'testSlot2Classname'
      }
    };

    const testSlot1Props: ITestSlotComponent1Props = {
      testSlot1Prop: 'slotProp1'
    };
    const testSlot2Props: ITestSlotComponent2Props = {
      testSlot2Prop: 'slotProp1'
    };

    const testSlotDefinition: ISlotDefinition<Required<ITestSlots>> = {
      testSlot1: props => {
        // User props should override slot props
        expect(props).toEqual({
          ...testUserProps.testSlot1,
          className: testUserProps.testSlot1.className
        });
        return null;
      },
      testSlot2: props => {
        // No user prop for slot in this case, so slot props should be present
        expect(props).toEqual({
          ...testSlot2Props,
          className: testUserProps.testSlot2.className
        });
        done();
        return null;
      }
    };

    // Simulate inserting _defaultStyles as createComponent would
    const createdSlots = getSlots<ITestProps, ITestSlots>({ ...testUserProps, _defaultStyles: {} } as any, testSlotDefinition);

    expect(createdSlots.testSlot1).toBeDefined();
    expect(createdSlots.testSlot1.isSlot).toBeTruthy();
    expect(createdSlots.testSlot2).toBeDefined();
    expect(createdSlots.testSlot2.isSlot).toBeTruthy();

    // Mount to trigger slot component render functions
    mount(createdSlots.testSlot1(testSlot1Props));
    mount(createdSlots.testSlot2(testSlot2Props));
  });
});
