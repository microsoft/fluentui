import * as React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { SiteNav, ISiteNavProps } from './SiteNav';
import { Nav } from '../Nav/Nav';

describe('SiteNav', () => {
  let matches: boolean;
  let changeBreakpoint: () => void;
  let mediaQuery: MediaQueryList;
  const onNavigate = jest.fn();

  const renderNavigation = (props: Partial<ISiteNavProps> = {}) => (
    <SiteNav pagePath="#/controls/ios" onNavigate={onNavigate} {...props}>
      {props.children ||
        (isSmallScreen => (
          <nav aria-label="Controls section navigation" data-small-screen={isSmallScreen}>
            <input aria-label="Find controls" />
            <a href="#/controls/ios/button">Button</a>
            <a href="#/controls/ios/avatar">Avatar</a>
            <a href="#/controls/ios/button" target="_blank">
              New tab
            </a>
            <a href="https://example.com/">External</a>
            <button>Change platform</button>
          </nav>
        ))}
    </SiteNav>
  );

  const open = () => fireEvent.click(screen.getByRole('button', { name: 'Section navigation' }));
  const getRegion = () =>
    screen.getByRole('button', { name: 'Section navigation', hidden: true }).getAttribute('aria-controls')!;

  beforeEach(() => {
    matches = true;
    changeBreakpoint = () => undefined;
    mediaQuery = {
      get matches() {
        return !matches;
      },
      media: '(min-width: 768px)',
      onchange: null,
      addListener: jest.fn(listener => {
        changeBreakpoint = () =>
          listener?.call(mediaQuery, Object.assign(new Event('change'), { matches, media: mediaQuery.media }));
      }),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
    Object.defineProperty(window, 'matchMedia', { configurable: true, value: jest.fn(() => mediaQuery) });
  });

  it('starts collapsed on mobile with an accessible button controlling the navigation', () => {
    const { container } = render(renderNavigation());
    const button = screen.getByRole('button', { name: 'Section navigation' });

    expect(button.tagName).toBe('BUTTON');
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(container.querySelector(`#${getRegion()}`)?.hasAttribute('hidden')).toBe(true);
    expect(screen.queryByRole('navigation')).toBeNull();

    open();

    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByRole('navigation').getAttribute('aria-label')).toBe('Controls section navigation');
    expect(screen.getAllByRole('link')).toHaveLength(4);
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('retains the same navigation and search state across disclosure toggles', () => {
    render(renderNavigation());
    open();
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'avatar' } });
    open();
    open();

    expect(screen.getByRole('textbox')).toBe(input);
    expect((input as HTMLInputElement).value).toBe('avatar');
  });

  it('closes on Escape and returns focus to the trigger', () => {
    render(renderNavigation());
    open();
    screen.getByRole('link', { name: 'Button' }).focus();
    fireEvent.keyDown(screen.getByRole('navigation'), { key: 'Escape' });

    expect(screen.queryByRole('navigation')).toBeNull();
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Section navigation' }));
  });

  it('does not handle an Escape already consumed by a nested control', () => {
    render(
      renderNavigation({
        children: () => (
          <input aria-label="Nested popup" onKeyDown={ev => ev.key === 'Escape' && ev.preventDefault()} />
        ),
      }),
    );
    open();
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Escape' });

    expect(screen.getByRole('button', { name: 'Section navigation' }).getAttribute('aria-expanded')).toBe('true');
  });

  it('closes for normal route-link activation and delegates content focus', () => {
    render(renderNavigation());
    open();
    fireEvent.click(screen.getByRole('link', { name: 'Button' }));

    expect(screen.queryByRole('navigation')).toBeNull();
    expect(onNavigate).toHaveBeenCalledWith('#/controls/ios/button');
  });

  it.each(['ctrlKey', 'metaKey', 'shiftKey', 'altKey'])('preserves the disclosure for %s clicks', modifier => {
    render(renderNavigation());
    open();
    fireEvent.click(screen.getByRole('link', { name: 'Button' }), { [modifier]: true });

    expect(screen.getByRole('navigation')).not.toBeNull();
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('preserves the disclosure for new-tab links', () => {
    render(renderNavigation());
    open();
    fireEvent.click(screen.getByRole('link', { name: 'New tab' }));

    expect(screen.getByRole('navigation')).not.toBeNull();
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('does not collapse when a non-navigation control changes platform state', () => {
    const { rerender } = render(renderNavigation());
    open();
    const button = screen.getByRole('button', { name: 'Change platform' });
    button.focus();
    fireEvent.click(button);
    rerender(renderNavigation());

    expect(screen.getByRole('navigation')).not.toBeNull();
    expect(document.activeElement).toBe(button);
  });

  it('closes on history navigation and hands off focus only when focus was inside', () => {
    const { rerender } = render(renderNavigation());
    open();
    screen.getByRole('link', { name: 'Button' }).focus();
    rerender(renderNavigation({ pagePath: '#/controls/ios/button' }));

    expect(screen.queryByRole('navigation')).toBeNull();
    expect(onNavigate).toHaveBeenCalledTimes(1);
  });

  it('preserves the focus handoff when routing replaces the focused navigation subtree', () => {
    const { rerender } = render(renderNavigation());
    open();
    screen.getByRole('link', { name: 'Button' }).focus();
    rerender(
      renderNavigation({
        pagePath: '#/controls/ios/avatar',
        children: () => <nav key="avatar" aria-label="Controls section navigation" />,
      }),
    );

    expect(screen.queryByRole('navigation')).toBeNull();
    expect(onNavigate).toHaveBeenCalledTimes(1);
  });

  it('shows the sidebar without a disclosure on desktop', () => {
    matches = false;
    render(renderNavigation());

    expect(screen.getByRole('navigation')).not.toBeNull();
    expect(screen.queryByRole('button', { name: 'Section navigation' })).toBeNull();
  });

  it('keeps focused navigation visible when entering the mobile layout', () => {
    matches = false;
    render(renderNavigation());
    const link = screen.getByRole('link', { name: 'Button' });
    link.focus();
    act(() => {
      matches = true;
      changeBreakpoint();
    });

    expect(screen.getByRole('button', { name: 'Section navigation' }).getAttribute('aria-expanded')).toBe('true');
    expect(document.activeElement).toBe(link);
  });

  it('moves focus into the visible sidebar when the mobile trigger disappears', () => {
    jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(1);
    render(renderNavigation());
    screen.getByRole('button', { name: 'Section navigation' }).focus();
    act(() => {
      matches = false;
      changeBreakpoint();
    });

    expect(screen.queryByRole('button', { name: 'Section navigation' })).toBeNull();
    expect(screen.getByRole('navigation').contains(document.activeElement)).toBe(true);
  });

  it('removes its breakpoint listener when unmounted', () => {
    const { unmount } = render(renderNavigation());
    unmount();

    expect(mediaQuery.removeListener).toHaveBeenCalledWith(jest.mocked(mediaQuery.addListener).mock.calls[0][0]);
  });

  it('preserves the focused link when switching to and from the desktop FocusZone', () => {
    jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(1);
    render(
      renderNavigation({
        children: isSmallScreen => (
          <Nav
            pages={[
              { title: 'Button', url: '#/controls/ios/button' },
              { title: 'Avatar', url: '#/controls/ios/avatar' },
            ]}
            isSmallScreen={isSmallScreen}
            navigationLabel="Controls section navigation"
          />
        ),
      }),
    );
    open();
    screen.getByRole('link', { name: 'Avatar' }).focus();
    act(() => {
      matches = false;
      changeBreakpoint();
    });
    expect(document.activeElement).toBe(screen.getByRole('link', { name: 'Avatar' }));

    act(() => {
      matches = true;
      changeBreakpoint();
    });
    expect(document.activeElement).toBe(screen.getByRole('link', { name: 'Avatar' }));
    expect(screen.getByRole('button', { name: 'Section navigation' }).getAttribute('aria-expanded')).toBe('true');
  });
});
