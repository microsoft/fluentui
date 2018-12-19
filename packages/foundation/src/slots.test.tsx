import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { createElementWrapper, createFactory, getSlots, ISlot, ISlotProp, ISlotRenderFunction, ISlotDefinition, IUserProps } from './slots';

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

  it(`passes componentProps without userProps`, () => {
    const component = mount(createFactory(TestComponent)(componentProps));
    expect(component.props()).toEqual(componentProps);
  });

  it(`passes userProp string as child`, () => {
    const component = mount(createFactory(TestComponent)(componentProps, userPropString));
    expect(component.props()).toEqual({ ...componentProps, children: userPropString });
  });

  it(`passes userProp integer as child`, () => {
    const component = mount(createFactory(TestComponent)(componentProps, 42));
    expect(component.props()).toEqual({ ...componentProps, children: 42 });
  });

  it(`passes userProp string as defaultProp`, () => {
    const component = mount(createFactory(TestComponent, factoryOptions)(componentProps, userPropString));
    expect(component.props()).toEqual({ ...componentProps, [defaultProp]: userPropString });
  });

  it(`passes userProp integer as defaultProp`, () => {
    const component = mount(createFactory(TestComponent, factoryOptions)(componentProps, 42));
    expect(component.props()).toEqual({ ...componentProps, [defaultProp]: 42 });
  });

  it('merges userProps over componentProps', () => {
    const component = mount(createFactory(TestComponent, factoryOptions)(componentProps, userProps));
    expect(component.props()).toEqual({ ...componentProps, ...userProps });
  });

  it('renders userProp integer as children', () => {
    const component = renderer.create(createFactory(TestComponent)(componentProps, 42));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders userProp string as children', () => {
    const component = renderer.create(createFactory(TestComponent)(componentProps, userPropString));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders userProp JSX with one prop', () => {
    const component = renderer.create(createFactory(TestComponent)(componentProps, <p id="I should be the only prop in the output" />));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders userProp function with one prop', () => {
    const component = renderer.create(
      createFactory(TestComponent)(componentProps, () => <p id="I should be the only prop in the output" />)
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`passes props and type arguments to userProp function`, done => {
    const userPropsFunction: ISlotRenderFunction<typeof userProps> = (props, type) => {
      expect(props).toEqual(componentProps);
      expect(type).toEqual(TestComponent);
      done();
      return <div {...props} />;
    };

    createFactory(TestComponent, factoryOptions)(componentProps, userPropsFunction);
  });
});

describe('getSlots', () => {
  interface ITestSlotComponent1Props {
    testSlot1Prop?: string;
  }
  interface ITestSlotComponent2Props {
    testSlot2Prop?: string;
  }
  interface ITestSlots {
    testSlot1?: ISlotProp<ITestSlotComponent1Props>;
    testSlot2?: ISlotProp<ITestSlotComponent2Props>;
  }

  interface ITestProps extends ITestSlots, IUserProps<ITestSlots> {}

  it(`creates slots and passes merged props to them`, done => {
    const testUserProps: ITestProps = {
      testSlot1: { testSlot1Prop: 'userProp1' },
      classNames: {
        testSlot1: 'testSlot1Classname',
        testSlot2: 'testSlot2Classname'
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
          className: testUserProps.classNames.testSlot1
        });
        return null;
      },
      testSlot2: props => {
        // No user prop for slot in this case, so slot props should be present
        expect(props).toEqual({
          ...testSlot2Props,
          className: testUserProps.classNames.testSlot2
        });
        done();
        return null;
      }
    };

    const createdSlots = getSlots<ITestProps, ITestSlots>(testUserProps, testSlotDefinition);

    expect(createdSlots.testSlot1).toBeDefined();
    expect(createdSlots.testSlot1.isSlot).toBeTruthy();
    expect(createdSlots.testSlot2).toBeDefined();
    expect(createdSlots.testSlot2.isSlot).toBeTruthy();

    // Mount to trigger slot component render functions
    mount(createdSlots.testSlot1(testSlot1Props));
    mount(createdSlots.testSlot2(testSlot2Props));
  });
});
