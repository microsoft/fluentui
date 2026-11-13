import * as React from 'react';
import { render } from '@testing-library/react';
import { Provider, useProviderContext } from '@fluentui/react-headless-components-preview/provider';

import { FluentProvider, fluentProviderClassNames } from './FluentProvider';
import { isConformant } from '../../testing/isConformant';

/** Reads what the provider published to the headless context and stamps it on the DOM. */
const ContextProbe: React.FC<{ stub: Document }> = ({ stub }) => {
  const context = useProviderContext();

  return (
    <span
      data-testid="probe"
      data-ctx-dir={context.dir}
      data-ctx-doc={context.targetDocument === stub ? 'stub' : 'other'}
    />
  );
};

describe('FluentProvider', () => {
  isConformant({
    Component: FluentProvider,
    displayName: 'FluentProvider',
    requiredProps: { children: 'content' },
  });

  it('renders one div carrying the marker pair, the module class and the theme class', () => {
    const { container } = render(<FluentProvider theme="fui-theme-web-dark">content</FluentProvider>);

    // A real element, not the headless Fragment: the provider is a layout participant.
    expect(container.childNodes).toHaveLength(1);

    const el = container.firstElementChild as HTMLElement;

    expect(el.tagName).toBe('DIV');
    expect(el).toHaveClass('fui-fluent-provider');
    expect(el).toHaveClass('group/fui-fluent-provider');
    expect(el.classList[0]).toBe('fui-fluent-provider');
    expect(el.className).toContain(fluentProviderClassNames.root);
    expect(el.className).toMatch(/fuicm-/);
    expect(el).toHaveClass('fui-theme-web-dark');
    expect(el.textContent).toBe('content');
  });

  it('stamps dir even when the prop is omitted', () => {
    const { container } = render(<FluentProvider>content</FluentProvider>);

    expect(container.firstElementChild).toHaveAttribute('dir', 'ltr');
  });

  it('inherits dir from an enclosing headless Provider', () => {
    const { getByTestId } = render(
      <Provider dir="rtl">
        <FluentProvider data-testid="provider">content</FluentProvider>
      </Provider>,
    );

    expect(getByTestId('provider')).toHaveAttribute('dir', 'rtl');
  });

  it('merges the consumer className last and passes the rest through', () => {
    const { getByTestId } = render(
      <FluentProvider className="consumer" id="host" style={{ zIndex: 3 }} aria-label="themed" data-testid="provider">
        content
      </FluentProvider>,
    );

    const el = getByTestId('provider');
    const classes = el.className.split(' ');

    expect(classes[classes.length - 1]).toBe('consumer');
    expect(el).toHaveClass('fui-fluent-provider');
    expect(el).toHaveAttribute('id', 'host');
    expect(el).toHaveAttribute('aria-label', 'themed');
    expect(el.style.zIndex).toBe('3');
  });

  it('forwards its ref to the rendered div', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<FluentProvider ref={ref}>content</FluentProvider>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.tagName).toBe('DIV');
    expect(ref.current).toHaveClass('fui-fluent-provider');
  });

  it('T27 renders DOM byte-identical to a bare div carrying the same class', () => {
    const children = (
      <>
        <span>a</span>
        <button type="button">b</button>
      </>
    );

    const { container } = render(<FluentProvider className="probe">{children}</FluentProvider>);
    const el = container.firstElementChild as HTMLElement;

    // The css-var scope is published through a context provider, which emits no element, and
    // useMergedRefs sets no attribute — so the markup must not have moved at all.
    const bare = render(
      <div dir="ltr" className={el.className}>
        {children}
      </div>,
    );

    expect(container.innerHTML).toBe(bare.container.innerHTML);

    const strict = render(
      <React.StrictMode>
        <FluentProvider className="probe">{children}</FluentProvider>
      </React.StrictMode>,
    );

    expect(strict.container.innerHTML).toBe(bare.container.innerHTML);
  });

  it('T28 forwards its ref to the provider element through useMergedRefs', () => {
    const objectRef = React.createRef<HTMLDivElement>();
    const callbackTargets: (HTMLDivElement | null)[] = [];

    const { rerender } = render(<FluentProvider ref={objectRef}>content</FluentProvider>);

    expect(objectRef.current).toBeInstanceOf(HTMLDivElement);
    expect(objectRef.current).toHaveClass('fui-fluent-provider');

    rerender(
      <FluentProvider
        ref={(node: HTMLDivElement | null) => {
          callbackTargets.push(node);
        }}
      >
        content
      </FluentProvider>,
    );

    expect(callbackTargets.filter(Boolean)).toHaveLength(1);
    expect(callbackTargets[callbackTargets.length - 1]).toBeInstanceOf(HTMLDivElement);
  });

  it('provides dir and targetDocument to the headless context', () => {
    const stub = document.implementation.createHTMLDocument('stub');

    const { getByTestId } = render(
      <FluentProvider dir="rtl" targetDocument={stub}>
        <ContextProbe stub={stub} />
      </FluentProvider>,
    );

    expect(getByTestId('probe')).toHaveAttribute('data-ctx-dir', 'rtl');
    expect(getByTestId('probe')).toHaveAttribute('data-ctx-doc', 'stub');
  });
});
