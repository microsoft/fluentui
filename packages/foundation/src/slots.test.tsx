import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { withSlots, createFactory, getSlots } from './slots';
import { IHTMLElementSlot, IHTMLSlot } from './IHTMLSlots';
import {
  ExtractProps,
  ExtractShorthand,
  IProcessedSlotProps,
  ISlot,
  ISlotDefinition,
  ISlotOptions,
  ISlotProp,
  ISlottableProps,
  ISlotRender,
} from './ISlots';

describe('typings', () => {
  type ITestProps = { testProp?: number };
  const TestProps = { testProp: 42 };
  const TestRender: ISlotRender<ITestProps> = (props: ITestProps, defaultComponent: React.ComponentType<ITestProps>) =>
    null;
  const TestComponent: React.FunctionComponent<ITestProps> = () => null;

  it('do not generate TS compile errors on getSlots usage', () => {
    interface IComponentSlots {
      testHtmlSlot?: IHTMLSlot;
      testElementSlot?: IHTMLElementSlot<'button'>;
      testSlot?: ISlotProp<ITestProps, string>;
      testSlotNoShorthand?: ISlotProp<ITestProps>;
    }

    interface IComponentProps extends ISlottableProps<IComponentSlots> {
      someProp?: number;
    }

    getSlots<IComponentProps, IComponentSlots>(
      {},
      {
        testHtmlSlot: 'div',
        testElementSlot: 'button',
        testSlot: TestComponent,
        testSlotNoShorthand: TestComponent,
      },
    );
  });

  it('do not generate TS compile error on valid ISlotProp assignments', () => {
    const p00: ISlotProp<ITestProps> = TestProps;
    const p01: ISlotProp<ITestProps, string> = TestProps;
    const p02: ISlotProp<ITestProps, number> = TestProps;
    const p03: ISlotProp<ITestProps, boolean> = TestProps;
    const p10: ISlotProp<ITestProps> = {};
    const p11: ISlotProp<ITestProps, string> = {};
    const p12: ISlotProp<ITestProps, number> = {};
    const p13: ISlotProp<ITestProps, boolean> = {};
    const p20: ISlotProp<ITestProps, string> = 'test';
    const p21: ISlotProp<ITestProps, number> = 42;
    const p22: ISlotProp<ITestProps, boolean> = false;

    // TODO: it'd be great to use ts-ignore to only ignore unused variables, but that's not currently possible:
    // https://github.com/Microsoft/TypeScript/issues/19139
    // Until then, pretend they're used:
    // eslint-disable-next-line no-empty-pattern
    const [] = [p00, p01, p02, p03, p10, p11, p12, p13, p20, p21, p22];
  });

  it('do not generate TS compile error on valid ISlotOption assignments', () => {
    // TODO: assigning TestRender to component and TestComponent to render does not cause errors.
    // why? because context is any?
    const p00: ISlotOptions<ITestProps> = {};
    const p01: ISlotOptions<ITestProps> = {};
    const p02: ISlotOptions<ITestProps> = {};
    const p03: ISlotOptions<ITestProps> = {};
    const p10: ISlotOptions<ITestProps> = { component: TestComponent };
    const p11: ISlotOptions<ITestProps> = { component: TestComponent };
    const p12: ISlotOptions<ITestProps> = { component: TestComponent };
    const p13: ISlotOptions<ITestProps> = { component: TestComponent };
    const p20: ISlotOptions<ITestProps> = { render: TestRender };
    const p21: ISlotOptions<ITestProps> = { render: TestRender };
    const p22: ISlotOptions<ITestProps> = { render: TestRender };
    const p23: ISlotOptions<ITestProps> = { render: TestRender };

    // TODO: it'd be great to use ts-ignore to only ignore unused variables, but that's not currently possible:
    // https://github.com/Microsoft/TypeScript/issues/19139
    // Until then, pretend they're used:
    // eslint-disable-next-line no-empty-pattern
    const [] = [p00, p01, p02, p03, p10, p11, p12, p13, p20, p21, p22, p23];
  });

  // TODO: what will happen with HTML slots?
  // it('do not generate TS compile error on valid IHTMLSlot assignments', () => {
  //   // IHTMLSlot should accept both generic and specialized elements.
  //   let tHtml: IHTMLSlot = { component: 'b' };
  //   tHtml = { component: 'div' };
  //   tHtml = { component: 'button' };

  //   // IHTMLElementSlot should accept its specified element and elements sharing the same shared subset
  //   // of its attributes.
  //   let tDiv: IHTMLElementSlot<'div'> = { component: 'div' };
  //   tDiv = { component: 'b' };

  //   let tButton: IHTMLElementSlot<'button'> = { component: 'button' };
  //   tButton = { component: 'b' };

  //   // TODO: it'd be great to use ts-ignore to only ignore unused variables, but that's not currently possible:
  //   // https://github.com/Microsoft/TypeScript/issues/19139
  //   // Until then, pretend they're used:
  //   const [] = [tHtml, tDiv, tButton];
  // });

  it('do not generate TS compile error on valid ExtractProp assignments', () => {
    const p0: ExtractProps<ISlotProp<ITestProps>> = { testProp: 42 };
    const p1: ExtractProps<ISlotProp<ITestProps, string>> = { testProp: 42 };
    const p2: ExtractProps<ISlotProp<ITestProps, number>> = { testProp: 42 };
    const p3: ExtractProps<ISlotProp<ITestProps, boolean>> = { testProp: 42 };
    const p4: ExtractProps<ISlotProp<ITestProps>> = {};
    const p5: ExtractProps<ISlotProp<ITestProps, string>> = {};
    const p6: ExtractProps<ISlotProp<ITestProps, number>> = {};
    const p7: ExtractProps<ISlotProp<ITestProps, boolean>> = {};

    // TODO: it'd be great to use ts-ignore to only ignore unused variables, but that's not currently possible:
    // https://github.com/Microsoft/TypeScript/issues/19139
    // Until then, pretend they're used:
    // eslint-disable-next-line no-empty-pattern
    const [] = [p0, p1, p2, p3, p4, p5, p6, p7];
  });

  it('do not generate TS compile error on valid ExtractShorthand assignments', () => {
    const p0: ExtractShorthand<ISlotProp<ITestProps, string>> = 'test';
    const p1: ExtractShorthand<ISlotProp<ITestProps, number>> = 42;
    const p2: ExtractShorthand<ISlotProp<ITestProps, boolean>> = false;

    // TODO: it'd be great to use ts-ignore to only ignore unused variables, but that's not currently possible:
    // https://github.com/Microsoft/TypeScript/issues/19139
    // Until then, pretend they're used:
    // eslint-disable-next-line no-empty-pattern
    const [] = [p0, p1, p2];
  });
});

describe('withSlots', () => {
  let reactCalls: number;

  beforeEach(() => {
    jest.spyOn(React, 'createElement').mockImplementation((() => {
      reactCalls += 1;
    }) as any);
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
  const componentProps = {
    component: 'componentValue',
    id: 'componentIdValue',
    children: ['Component Child 1', 'Component Child 2'],
  };
  const userProps: ISlotProp<any, any> = {
    user: 'userValue',
    id: 'userIdValue',
    children: ['User Child 1', 'User Child 2'],
  };
  const renderProps = { render: 'renderValue', id: 'renderIdValue', children: ['Render Child 1', 'Render Child 2'] };
  const userPropString = 'userPropString';
  const emptyClassName = { className: '' };

  type TComponentProps = typeof componentProps;

  const defaultProp: keyof TComponentProps = 'id';
  const factoryOptions = { defaultProp };

  const TestDiv = (props: any) => {
    return <div {...props} />;
  };

  it(`passes componentProps without userProps`, () => {
    const component = mount(
      createFactory<TComponentProps, any>(TestDiv)(componentProps, undefined, undefined, undefined) as JSX.Element,
    );
    expect(component.props()).toEqual({ ...componentProps, ...emptyClassName });
  });

  it(`passes userProp string as child`, () => {
    const component = mount(
      createFactory<TComponentProps, string>(TestDiv)(
        componentProps,
        userPropString,
        undefined,
        undefined,
      ) as JSX.Element,
    );
    expect(component.props()).toEqual({ ...componentProps, children: userPropString, ...emptyClassName });
  });

  it(`passes userProp integer as child`, () => {
    const component = mount(
      createFactory<TComponentProps, number>(TestDiv)(componentProps, 42, undefined, undefined) as JSX.Element,
    );
    expect(component.props()).toEqual({ ...componentProps, children: 42, ...emptyClassName });
  });

  it(`passes userProp string as defaultProp`, () => {
    const component = mount(
      createFactory<TComponentProps, string>(TestDiv, factoryOptions)(
        componentProps,
        userPropString,
        undefined,
        undefined,
      ) as JSX.Element,
    );
    expect(component.props()).toEqual({ ...componentProps, [defaultProp]: userPropString, ...emptyClassName });
  });

  it(`passes userProp integer as defaultProp`, () => {
    const component = mount(
      createFactory<TComponentProps, number>(TestDiv, factoryOptions)(
        componentProps,
        42,
        undefined,
        undefined,
      ) as JSX.Element,
    );
    expect(component.props()).toEqual({ ...componentProps, [defaultProp]: 42, ...emptyClassName });
  });

  it('merges userProps over componentProps', () => {
    const component = mount(
      createFactory<TComponentProps>(TestDiv, factoryOptions)(
        componentProps,
        userProps,
        undefined,
        undefined,
      ) as JSX.Element,
    );
    expect(component.props()).toEqual({ ...componentProps, ...userProps, ...emptyClassName });
  });

  it('renders div and userProp integer as children', () => {
    const component = renderer.create(
      createFactory<TComponentProps, number>(TestDiv)(componentProps, 42, undefined, undefined) as JSX.Element,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders div and userProp string as children', () => {
    const component = renderer.create(
      createFactory<TComponentProps, string>(TestDiv)(
        componentProps,
        userPropString,
        undefined,
        undefined,
      ) as JSX.Element,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders userProp span JSX with one prop', () => {
    const component = renderer.create(
      createFactory(TestDiv)(
        componentProps,
        <span id="I should be the only prop in the output" />,
        undefined,
        undefined,
      ) as JSX.Element,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders userProp span function without component props', () => {
    const component = renderer.create(
      createFactory(TestDiv)(
        componentProps,
        undefined,
        {
          render: () => <span id="I should be the only prop in the output" />,
        },
        undefined,
      ) as JSX.Element,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders userProp span function with component props', () => {
    const component = renderer.create(
      createFactory(TestDiv)(
        componentProps,
        undefined,
        {
          render: props => <span {...props} id="I should be present alongside componentProps" />,
        },
        undefined,
      ) as JSX.Element,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders userProp span component with component props', () => {
    const component = renderer.create(
      createFactory(TestDiv)(
        componentProps,
        { id: 'I should be present alongside componentProps' },
        { component: 'span' },
        undefined,
      ) as JSX.Element,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`passes props and type arguments to userProp function`, done => {
    const slotOptions: ISlotOptions<typeof userProps.props | typeof renderProps> = {
      render: (props, DefaultComponent) => {
        expect(props).toEqual({ ...componentProps, ...renderProps, ...emptyClassName });
        expect(DefaultComponent).toEqual(TestDiv);
        done();
        return <div {...props} />;
      },
    };

    createFactory(TestDiv, factoryOptions)(componentProps, renderProps, slotOptions, undefined);
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
        testSlot1Prop: 'userProp1',
      },
      testSlot2: {
        className: 'testSlot2Classname',
      },
    };

    const testSlot1Props: ITestSlotComponent1Props = {
      testSlot1Prop: 'slotProp1',
    };
    const testSlot2Props: ITestSlotComponent2Props = {
      testSlot2Prop: 'slotProp1',
    };

    const testSlotDefinition: ISlotDefinition<Required<ITestSlots>> = {
      testSlot1: props => {
        // User props should override slot props
        expect(props).toEqual({
          ...testUserProps.testSlot1,
          className: testUserProps.testSlot1.className,
        });
        return null;
      },
      testSlot2: props => {
        // No user prop for slot in this case, so slot props should be present
        expect(props).toEqual({
          ...testSlot2Props,
          className: testUserProps.testSlot2.className,
        });
        done();
        return null;
      },
    };

    // Simulate inserting _defaultStyles as createComponent would
    const createdSlots = getSlots<ITestProps, ITestSlots>(
      { ...testUserProps, _defaultStyles: {} } as ITestProps,
      testSlotDefinition,
    );

    expect(createdSlots.testSlot1).toBeDefined();
    expect(createdSlots.testSlot1.isSlot).toBeTruthy();
    expect(createdSlots.testSlot2).toBeDefined();
    expect(createdSlots.testSlot2.isSlot).toBeTruthy();

    // Mount to trigger slot component render functions
    mount(createdSlots.testSlot1(testSlot1Props) as JSX.Element);
    mount(createdSlots.testSlot2(testSlot2Props) as JSX.Element);
  });
});
