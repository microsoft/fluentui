/** @jsxRuntime classic */
/** @jsx withSlots */
import * as renderer from 'react-test-renderer';
import { composed, resolveSlots } from './composed';
import { IComponentStyles } from '../IComponent';
import { IComponent, IComponentOptions, IRecompositionComponentOptions } from './IComponent';
import { IHTMLElementSlot, IHTMLSlot } from '../IHTMLSlots';
import { withSlots } from '../slots';
import { ISlotDefinition } from '../ISlots';

describe('composed', () => {
  type ITestComponent = IComponent<ITestProps, ITestTokens, ITestStyles, ITestViewProps, ITestSlots>;
  interface ITestSlots {
    root?: IHTMLElementSlot<'div'>;
    content?: IHTMLSlot;
  }
  interface ITestProps extends ITestSlots {}
  interface ITestViewProps extends ITestProps {}
  interface ITestTokens {
    testToken: number;
  }
  type ITestStyles = IComponentStyles<ITestSlots>;

  const TestView: ITestComponent['view'] = (props, slots) => {
    const { children, content } = props;
    return (
      <slots.root>
        {content && <slots.content />}
        {children}
      </slots.root>
    );
  };

  it("recomposes a component's slots correctly", () => {
    const baseSlots: ISlotDefinition<Required<ITestSlots>> = {
      root: 'div',
      content: 'span',
    };
    const options: IComponentOptions<ITestProps, ITestTokens, ITestStyles, ITestViewProps, ITestSlots> = {
      displayName: 'TestComponent',
      slots: baseSlots,
      view: TestView,
    };

    const TestComponent = composed(options);

    expect(TestComponent.displayName).toEqual('TestComponent');
    expect(TestComponent.__options).toEqual(options);

    const recompositionSlots: ISlotDefinition<ITestSlots> = {
      content: 'a',
    };
    const recompositionOptions: IRecompositionComponentOptions<
      ITestProps,
      ITestTokens,
      ITestStyles,
      ITestViewProps,
      ITestSlots
    > = {
      displayName: 'TestComponent2',
      slots: recompositionSlots,
    };

    const recomposedOptions: IComponentOptions<ITestProps, ITestTokens, ITestStyles, ITestViewProps, ITestSlots> = {
      displayName: 'TestComponent2',
      slots: props => ({
        ...resolveSlots(baseSlots, props),
        ...resolveSlots(recompositionSlots, props),
      }),
      view: TestView,
    };

    const TestComponent2 = composed(TestComponent, recompositionOptions);

    expect(TestComponent2.displayName).toEqual('TestComponent2');
    expect(TestComponent2.__options).toBeDefined();
    expect(TestComponent2.__options!.toString()).toEqual(recomposedOptions.toString());
    expect(TestComponent2.__options!.slots).toBeDefined();
    expect(recomposedOptions!.slots).toBeDefined();
    expect(typeof TestComponent2.__options!.slots).toEqual('function');
    expect(typeof recomposedOptions!.slots).toEqual('function');
    expect((TestComponent2.__options!.slots! as Function)({})).toEqual((recomposedOptions.slots! as Function)({}));
  });

  it("recomposes a component's view correctly", () => {
    const baseSlots: ISlotDefinition<Required<ITestSlots>> = {
      root: 'div',
      content: 'span',
    };
    const options: IComponentOptions<ITestProps, ITestTokens, ITestStyles, ITestViewProps, ITestSlots> = {
      displayName: 'TestComponent',
      slots: baseSlots,
      view: TestView,
    };

    const TestComponent = composed(options);

    expect(TestComponent.displayName).toEqual('TestComponent');
    expect(TestComponent.__options).toEqual(options);

    const TestView2: ITestComponent['view'] = (props, slots) => {
      const { children, content } = props;
      return (
        <slots.root>
          {children}
          {content && <slots.content />}
        </slots.root>
      );
    };

    const recompositionOptions: IRecompositionComponentOptions<
      ITestProps,
      ITestTokens,
      ITestStyles,
      ITestViewProps,
      ITestSlots
    > = {
      displayName: 'TestComponent2',
      view: TestView2,
    };

    const recomposedOptions: IComponentOptions<ITestProps, ITestTokens, ITestStyles, ITestViewProps, ITestSlots> = {
      displayName: 'TestComponent2',
      slots: props => ({
        ...resolveSlots(baseSlots, props),
      }),
      view: TestView2,
    };

    const TestComponent2 = composed(TestComponent, recompositionOptions);

    expect(TestComponent2.displayName).toEqual('TestComponent2');
    expect(TestComponent2.__options).toBeDefined();
    expect(TestComponent2.__options!.toString()).toEqual(recomposedOptions.toString());
    expect(TestComponent2.__options!.view).toBeDefined();
    expect(recomposedOptions.view).toBeDefined();
    expect(TestComponent2.__options!.view).toEqual(recomposedOptions.view);
  });

  it(`resolves tokens without a runtime error`, () => {
    const baseSlots: ISlotDefinition<Required<ITestSlots>> = {
      root: 'div',
      content: 'span',
    };
    const options: IComponentOptions<ITestProps, ITestTokens, ITestStyles, ITestViewProps, ITestSlots> = {
      displayName: 'TestComponent',
      slots: baseSlots,
      tokens: { testToken: 1 },
      view: TestView,
    };

    const TestComponent = composed(options);

    renderer.create(<TestComponent />);
  });
});
