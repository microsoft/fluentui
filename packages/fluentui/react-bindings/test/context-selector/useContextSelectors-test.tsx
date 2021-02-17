import { createContext, useContextSelectors } from '@fluentui/react-bindings';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

const TestContext = createContext<{ index: number; value: string }>({
  index: -1,
  value: '',
});

const TestComponent: React.FC<{ index: number; onUpdate?: () => void }> = props => {
  const context = useContextSelectors(TestContext, {
    active: v => v.index === props.index,
    value: v => v.value,
  });

  React.useEffect(() => {
    props.onUpdate && props.onUpdate();
  });

  return <div className="test-component" data-active={context.active} data-value={context.value} />;
};

const TestProvider: React.FC<{ value: any; children: any }> = props => {
  const [index, setIndex] = React.useState<number>(+props.value.index);
  const [value, setValue] = React.useState<string>(props.value.value);

  return (
    <div className="test-provider">
      <button className="set-index" onClick={e => setIndex(+(e.target as HTMLElement)?.dataset.index!)} />
      <button className="change-value" onClick={e => setValue((e.target as HTMLElement)?.dataset.value!)} />
      <TestContext.Provider value={{ index, value }}>{props.children}</TestContext.Provider>
    </div>
  );
};

describe('useContextSelectors', () => {
  let container: HTMLElement | null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container as HTMLElement);
    container = null;
  });

  it('propogates values via Context', () => {
    ReactDOM.render(
      <TestProvider value={{ index: 1, value: 'foo' }}>
        <TestComponent index={1} />
      </TestProvider>,
      container,
    );

    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.active).toBe('true');
    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.value).toBe('foo');
  });

  it('updates only on selector match', () => {
    const onUpdate = jest.fn();
    ReactDOM.render(
      <TestProvider value={{ index: -1, value: 'foo' }}>
        <TestComponent index={1} onUpdate={onUpdate} />
      </TestProvider>,
      container,
    );

    act(() => {
      // no-op to wait for effects
    });

    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.active).toBe('false');
    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.value).toBe('foo');
    expect(onUpdate).toBeCalledTimes(1);

    // No match, (v.index: 2, p.index: 1)
    act(() => {
      document.querySelector<HTMLElement>('.set-index')?.setAttribute('data-index', '2');
      document.querySelector<HTMLElement>('.change-value')?.setAttribute('data-value', 'foo');
      document.querySelector<HTMLElement>('.set-index')?.click();
      document.querySelector<HTMLElement>('.change-value')?.click();
    });
    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.active).toBe('false');
    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.value).toBe('foo');
    expect(onUpdate).toBeCalledTimes(1);

    // // Match => update, (v.index: 1, p.index: 1)
    act(() => {
      document.querySelector<HTMLElement>('.set-index')?.setAttribute('data-index', '1');
      document.querySelector<HTMLElement>('.change-value')?.setAttribute('data-value', 'foo');
      document.querySelector<HTMLElement>('.set-index')?.click();
      document.querySelector<HTMLElement>('.change-value')?.click();
    });
    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.active).toBe('true');
    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.value).toBe('foo');
    expect(onUpdate).toBeCalledTimes(2);

    // // Match previous => no update, (v.index: 1, p.index: 1)
    act(() => {
      document.querySelector<HTMLElement>('.set-index')?.setAttribute('data-index', '1');
      document.querySelector<HTMLElement>('.change-value')?.setAttribute('data-value', 'foo');
      document.querySelector<HTMLElement>('.set-index')?.click();
      document.querySelector<HTMLElement>('.change-value')?.click();
    });
    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.active).toBe('true');
    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.value).toBe('foo');
    expect(onUpdate).toBeCalledTimes(2);

    // Match => update, (v.value: 'bar')
    act(() => {
      document.querySelector<HTMLElement>('.set-index')?.setAttribute('data-index', '1');
      document.querySelector<HTMLElement>('.change-value')?.setAttribute('data-value', 'bar');
      document.querySelector<HTMLElement>('.set-index')?.click();
      document.querySelector<HTMLElement>('.change-value')?.click();
    });
    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.value).toBe('bar');
    expect(onUpdate).toBeCalledTimes(3);
  });

  it('updates are propogated inside React.memo()', () => {
    // https://reactjs.org/docs/react-api.html#reactmemo
    // Will never pass updates
    const MemoComponent = React.memo(TestComponent, () => true);

    const onUpdate = jest.fn();
    ReactDOM.render(
      <TestProvider value={{ index: 0, value: 'foo' }}>
        <MemoComponent index={1} onUpdate={onUpdate} />
      </TestProvider>,
      container,
    );

    act(() => {
      document.querySelector<HTMLElement>('.set-index')?.setAttribute('data-index', '1');
      document.querySelector<HTMLElement>('.change-value')?.setAttribute('data-value', 'foo');
      document.querySelector<HTMLElement>('.set-index')?.click();
      document.querySelector<HTMLElement>('.change-value')?.click();
    });
    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.active).toBe('true');
    expect(onUpdate).toBeCalledTimes(2);
  });
});
