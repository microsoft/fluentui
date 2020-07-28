import * as React from 'react';
import { StylesheetProvider } from './StylesheetProvider';
import { useStylesheet } from './useStylesheet';
import { StylesheetContext, StylesheetContextType, registerStyles } from './StylesheetContext';
import { mount } from 'enzyme';

const FooStylesheet = 'Foo';
const ParentRenderingFooStylesheet = 'ParentRenderingFoo';

const Foo = () => {
  useStylesheet(FooStylesheet);

  return <div className="foo" />;
};

const ParentRenderingFoo = () => {
  useStylesheet(ParentRenderingFooStylesheet);

  return (
    <div className="foo">
      <Foo />
    </div>
  );
};

describe('StylesheetProvider', () => {
  let result: string[] = [];
  let customContext: StylesheetContextType;
  let lastContext: StylesheetContextType | undefined;

  const mountWithContext = (content: JSX.Element) =>
    mount(<StylesheetContext.Provider value={customContext}>{content}</StylesheetContext.Provider>);

  beforeEach(() => {
    result = [];
    lastContext = undefined;

    customContext = {
      registerStyles,
      target: document,
      styleCache: new WeakMap(),
      renderStyles: (sheets: string[], context: StylesheetContextType) => {
        result.push(...sheets);
        lastContext = context;
      },
    };
  });

  it('can render without the provider', () => {
    mountWithContext(<Foo />);

    expect(result).toEqual([FooStylesheet]);
  });

  it('can render with the provider', () => {
    mountWithContext(
      <StylesheetProvider>
        <Foo />
        <Foo />
      </StylesheetProvider>,
    );

    expect(result).toEqual([FooStylesheet]);
  });

  it('can provide a custom target', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const customTarget: any = {};

    mountWithContext(
      <StylesheetProvider target={customTarget}>
        <Foo />
        <Foo />
      </StylesheetProvider>,
    );

    expect(lastContext?.target).toBe(customTarget);
  });

  it('can register nested components', () => {
    mountWithContext(
      <StylesheetProvider>
        <ParentRenderingFoo />
      </StylesheetProvider>,
    );
    expect(result).toEqual([ParentRenderingFooStylesheet, FooStylesheet]);
  });
});
