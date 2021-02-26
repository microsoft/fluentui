import { createContext } from './createContext';
import { useContextSelector } from './useContextSelector';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import * as React from 'react';

const TestContext = createContext<{ index: number }>({ index: -1 });

const TestComponent: React.FC<{ index: number; onUpdate?: () => void }> = props => {
  const active = useContextSelector(TestContext, v => v.index === props.index);

  React.useEffect(() => {
    props.onUpdate && props.onUpdate();
  });

  return <div className="test-component" data-active={active} />;
};

const TestProvider: React.FC = props => {
  const [index, setIndex] = React.useState<number>(0);

  return (
    <div className="test-provider" onClick={() => setIndex(prevIndex => prevIndex + 1)}>
      <TestContext.Provider value={{ index }}>{props.children}</TestContext.Provider>
    </div>
  );
};

describe('useContextSelector', () => {
  let container: HTMLElement | null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container as HTMLElement);
    container = null;
  });

  it('updates only on selector match', () => {
    const onUpdate = jest.fn();
    ReactDOM.render(
      <TestProvider>
        <TestComponent index={1} onUpdate={onUpdate} />
      </TestProvider>,
      container,
    );

    act(() => {
      // no-op to wait for effects
    });

    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.active).toBe('false');
    expect(onUpdate).toBeCalledTimes(1);

    // Match => update, (v.index: 1, p.index: 1)
    act(() => {
      document.querySelector<HTMLElement>('.test-provider')?.click();
    });
    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.active).toBe('true');
    expect(onUpdate).toBeCalledTimes(2);

    // No match, but update because "active" changed, (v.index: 2, p.index: 1)
    act(() => {
      document.querySelector<HTMLElement>('.test-provider')?.click();
    });
    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.active).toBe('false');
    expect(onUpdate).toBeCalledTimes(3);

    // Match previous => no update, (v.index: 3, p.index: 1)
    act(() => {
      document.querySelector<HTMLElement>('.test-provider')?.click();
    });
    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.active).toBe('false');
    expect(onUpdate).toBeCalledTimes(3);
  });

  it('updates are propogated inside React.memo()', () => {
    // https://reactjs.org/docs/react-api.html#reactmemo
    // Will never pass updates
    const MemoComponent = React.memo(TestComponent, () => true);
    const onUpdate = jest.fn();

    ReactDOM.render(
      <TestProvider>
        <MemoComponent index={1} onUpdate={onUpdate} />
      </TestProvider>,
      container,
    );

    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.active).toBe('false');

    act(() => {
      document.querySelector<HTMLElement>('.test-provider')?.click();
    });
    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.active).toBe('true');
    expect(onUpdate).toBeCalledTimes(2);
  });
});
