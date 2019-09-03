import * as React from 'react';
import { composed } from './composed';
import { IComponentStyles } from '../IComponent';
import { IComponent, IComponentOptions, IRecompositionComponentOptions } from './IComponent';
import { IHTMLElementSlot, IHTMLSlot } from '../IHTMLSlots';
import { ISlotCreator } from './ISlots';

describe('composed', () => {
  type ITestComponent = IComponent<ITestProps, ITestTokens, ITestStyles, ITestViewProps, ITestSlots>;
  interface ITestSlots {
    root?: IHTMLElementSlot<'div'>;
    content?: IHTMLSlot;
  }
  interface ITestProps extends ITestSlots {}
  interface ITestViewProps extends ITestProps {}
  interface ITestTokens {}
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
    const options: IComponentOptions<ITestProps, ITestTokens, ITestStyles, ITestViewProps, ITestSlots> = {
      displayName: 'TestComponent',
      slots: {
        root: 'div',
        content: 'span'
      },
      view: TestView
    };

    const TestComponent: React.FunctionComponent<ITestProps> = composed(options);

    expect(TestComponent.displayName).toEqual('TestComponent');
    expect((TestComponent as ISlotCreator<ITestProps, any, ITestTokens, ITestStyles>).__options).toEqual(options);

    const recompositionOptions: IRecompositionComponentOptions<ITestProps, ITestTokens, ITestStyles, ITestViewProps, ITestSlots> = {
      displayName: 'TestComponent2',
      slots: {
        content: 'a'
      }
    };

    const recomposedOptions = {
      displayName: 'TestComponent2',
      slots: {
        root: 'div',
        content: 'a'
      },
      view: TestView
    };

    const TestComponent2: React.FunctionComponent<ITestProps> = composed(TestComponent, recompositionOptions);

    expect(TestComponent2.displayName).toEqual('TestComponent2');
    expect((TestComponent2 as ISlotCreator<ITestProps, any, ITestTokens, ITestStyles>).__options).toEqual(recomposedOptions);
  });

  it("recomposes a component's view correctly", () => {
    const options: IComponentOptions<ITestProps, ITestTokens, ITestStyles, ITestViewProps, ITestSlots> = {
      displayName: 'TestComponent',
      slots: {
        root: 'div',
        content: 'span'
      },
      view: TestView
    };

    const TestComponent: React.FunctionComponent<ITestProps> = composed(options);

    expect(TestComponent.displayName).toEqual('TestComponent');
    expect((TestComponent as ISlotCreator<ITestProps, any, ITestTokens, ITestStyles>).__options).toEqual(options);

    const TestView2: ITestComponent['view'] = (props, slots) => {
      const { children, content } = props;
      return (
        <slots.root>
          {children}
          {content && <slots.content />}
        </slots.root>
      );
    };

    const recompositionOptions: IRecompositionComponentOptions<ITestProps, ITestTokens, ITestStyles, ITestViewProps, ITestSlots> = {
      displayName: 'TestComponent2',
      view: TestView2
    };

    const recomposedOptions = {
      displayName: 'TestComponent2',
      slots: {
        root: 'div',
        content: 'span'
      },
      view: TestView2
    };

    const TestComponent2: React.FunctionComponent<ITestProps> = composed(TestComponent, recompositionOptions);

    expect(TestComponent2.displayName).toEqual('TestComponent2');
    expect((TestComponent2 as ISlotCreator<ITestProps, any, ITestTokens, ITestStyles>).__options).toEqual(recomposedOptions);
  });
});
