import * as React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnnounceProvider } from '@fluentui/react-shared-contexts';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverCarousel } from './TeachingPopoverCarousel';
import type { TeachingPopoverCarouselProps } from './TeachingPopoverCarousel.types';
import { TeachingPopoverCarouselCard } from '../TeachingPopoverCarouselCard/TeachingPopoverCarouselCard';
import { TeachingPopoverCarouselFooter } from '../TeachingPopoverCarouselFooter/TeachingPopoverCarouselFooter';
import { TeachingPopoverCarouselNav } from '../TeachingPopoverCarouselNav/TeachingPopoverCarouselNav';
import { TeachingPopoverCarouselNavButton } from '../TeachingPopoverCarouselNavButton/TeachingPopoverCarouselNavButton';
import { TeachingPopoverTitle } from '../TeachingPopoverTitle/TeachingPopoverTitle';

type ExampleProps = TeachingPopoverCarouselProps & {
  firstTitle?: React.ReactNode;
  secondTitle?: React.ReactNode;
  removeNavigationOrigin?: boolean;
  autoFocus?: boolean;
};

const Example = ({
  firstTitle = <TeachingPopoverTitle>Step one</TeachingPopoverTitle>,
  secondTitle = <TeachingPopoverTitle>Step two</TeachingPopoverTitle>,
  removeNavigationOrigin,
  autoFocus,
  ...props
}: ExampleProps) => {
  const footer = (
    <TeachingPopoverCarouselFooter next="Next" previous="Previous" initialStepText="Close" finalStepText="Finish">
      <TeachingPopoverCarouselNav>
        {value => <TeachingPopoverCarouselNavButton aria-label={`Step ${value}`} />}
      </TeachingPopoverCarouselNav>
    </TeachingPopoverCarouselFooter>
  );

  return (
    <TeachingPopoverCarousel defaultValue={props.value === undefined ? 'one' : undefined} {...props}>
      <TeachingPopoverCarouselCard value="one">
        {firstTitle}
        <input aria-label="Step one input" />
        {removeNavigationOrigin && footer}
      </TeachingPopoverCarouselCard>
      <TeachingPopoverCarouselCard value="two">
        {secondTitle}
        <input aria-label="Step two input" autoFocus={autoFocus} />
      </TeachingPopoverCarouselCard>
      <TeachingPopoverCarouselCard value="three">
        <TeachingPopoverTitle>Step three</TeachingPopoverTitle>
      </TeachingPopoverCarouselCard>
      {!removeNavigationOrigin && footer}
    </TeachingPopoverCarousel>
  );
};

describe('TeachingPopoverCarousel', () => {
  isConformant({
    Component: TeachingPopoverCarousel,
    displayName: 'TeachingPopoverCarousel',
    requiredProps: {
      defaultValue: '',
    },
    disabledTests: ['component-has-static-classnames-object'],
  });

  const announce = jest.fn();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AnnounceProvider value={{ announce }}>{children}</AnnounceProvider>
  );
  const renderExample = (props: ExampleProps = {}) => render(<Example {...props} />, { wrapper });

  beforeEach(() => announce.mockClear());

  it('renders a default state', () => {
    const result = render(
      <TeachingPopoverCarousel defaultValue="">Default TeachingPopoverCarousel</TeachingPopoverCarousel>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it.each([
    ['one', 'Next', 'Step two'],
    ['three', 'Previous', 'Step two'],
  ])('announces the destination and retains %s navigation focus', async (defaultValue, buttonName, title) => {
    renderExample({ defaultValue });
    const button = screen.getByRole('button', { name: buttonName });
    button.focus();
    fireEvent.click(button);

    expect(screen.getByRole('heading', { name: title })).toBeVisible();
    expect(button).toHaveFocus();
    await waitFor(() => expect(announce).toHaveBeenCalledTimes(1));
    expect(announce).toHaveBeenCalledWith(title, { polite: true });
  });

  it('supports repeated keyboard navigation without tabbing back to Next or Previous', async () => {
    renderExample();
    const next = screen.getByRole('button', { name: 'Next' });
    next.focus();
    await userEvent.keyboard('{Enter}');
    expect(next).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(next).toHaveFocus();
    expect(screen.getByRole('heading', { name: 'Step three' })).toBeVisible();

    const previous = screen.getByRole('button', { name: 'Previous' });
    previous.focus();
    await userEvent.keyboard('{Enter}');
    expect(previous).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(previous).toHaveFocus();
    expect(screen.getByRole('heading', { name: 'Step one' })).toBeVisible();
    expect(announce.mock.calls).toEqual([
      ['Step two', { polite: true }],
      ['Step three', { polite: true }],
      ['Step two', { polite: true }],
      ['Step one', { polite: true }],
    ]);
  });

  it('announces tab selection without moving focus off the tab', async () => {
    renderExample();
    const tab = screen.getByRole('tab', { name: 'Step two' });
    tab.focus();
    fireEvent.click(tab);
    expect(tab).toHaveFocus();
    await waitFor(() => expect(announce).toHaveBeenCalledWith('Step two', { polite: true }));
    fireEvent.click(tab);
    await act(() => Promise.resolve());
    expect(announce).toHaveBeenCalledTimes(1);
  });

  it('calls the custom announcement after the new page renders instead of using the title', async () => {
    const announcement = jest.fn(value => {
      expect(screen.getByRole('heading', { name: 'Step two' })).toBeVisible();
      expect(screen.queryByRole('heading', { name: 'Step one' })).not.toBeInTheDocument();
      return `Custom ${value}`;
    });
    renderExample({ announcement });
    expect(announcement).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    await waitFor(() => expect(announcement).toHaveBeenCalledTimes(1));
    expect(announcement).toHaveBeenCalledWith('two');
    expect(announce).toHaveBeenCalledTimes(1);
    expect(announce).toHaveBeenCalledWith('Custom two', { polite: true });
  });

  it('preserves an empty custom announcement as intentional silence', async () => {
    const announcement = jest.fn(() => '');
    renderExample({ announcement });
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    await act(() => Promise.resolve());
    expect(announcement).toHaveBeenCalledWith('two');
    expect(announce).not.toHaveBeenCalled();
  });

  it('announces custom messages after empty cards become active', async () => {
    const announcement = jest.fn(value => `Custom ${value}`);
    const example = (value: string) => (
      <TeachingPopoverCarousel value={value} announcement={announcement}>
        <TeachingPopoverCarouselCard value="one" />
        <TeachingPopoverCarouselCard value="two" />
      </TeachingPopoverCarousel>
    );
    const view = render(example('one'), { wrapper });
    view.rerender(example('two'));
    await waitFor(() => expect(announce).toHaveBeenCalledWith('Custom two', { polite: true }));
    expect(announcement).toHaveBeenCalledTimes(1);
  });

  it('normalizes title whitespace and excludes slotted dismiss content', async () => {
    renderExample({
      secondTitle: (
        <TeachingPopoverTitle dismissButton={{ children: 'Close title', 'aria-hidden': false }}>
          {'  Step\n'}
          <span>two</span>
          {'  '}
        </TeachingPopoverTitle>
      ),
    });
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    await waitFor(() => expect(announce).toHaveBeenCalledWith('Step two', { polite: true }));
    expect(screen.getByRole('button', { name: 'dismiss' })).toHaveTextContent('Close title');
  });

  it.each([null, <TeachingPopoverTitle key="empty">{' \n '}</TeachingPopoverTitle>])(
    'does not fabricate an announcement for a missing or empty title',
    async secondTitle => {
      renderExample({ secondTitle });
      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      await act(() => Promise.resolve());
      expect(announce).not.toHaveBeenCalled();
    },
  );

  it('announces direct controlled changes without moving focus', async () => {
    const view = renderExample({ value: 'one' });
    const next = screen.getByRole('button', { name: 'Next' });
    next.focus();
    view.rerender(<Example value="two" />);
    expect(next).toHaveFocus();
    await waitFor(() => expect(announce).toHaveBeenCalledTimes(1));
    expect(announce).toHaveBeenCalledWith('Step two', { polite: true });
    view.rerender(<Example value="two" className="rerender" />);
    await act(() => Promise.resolve());
    expect(announce).toHaveBeenCalledTimes(1);
  });

  it('waits for controlled acceptance rather than announcing rejected requests', async () => {
    const announcement = jest.fn(value => `Custom ${value}`);
    const onValueChange = jest.fn();
    const view = renderExample({ value: 'one', announcement, onValueChange });
    const next = screen.getByRole('button', { name: 'Next' });
    next.focus();
    fireEvent.click(next);
    await act(() => Promise.resolve());
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(announcement).not.toHaveBeenCalled();
    expect(announce).not.toHaveBeenCalled();
    expect(screen.getByRole('heading', { name: 'Step one' })).toBeVisible();

    view.rerender(<Example value="one" announcement={announcement} onValueChange={onValueChange} />);
    expect(announce).not.toHaveBeenCalled();
    view.rerender(<Example value="two" announcement={announcement} onValueChange={onValueChange} />);
    expect(next).toHaveFocus();
    await waitFor(() => expect(announcement).toHaveBeenCalledTimes(1));
    expect(announce).toHaveBeenCalledWith('Custom two', { polite: true });
  });

  it('announces synchronously accepted controlled navigation once', async () => {
    const ControlledExample = () => {
      const [value, setValue] = React.useState('one');
      return <Example value={value} onValueChange={(_, data) => setValue(data.value!)} />;
    };
    render(<ControlledExample />, { wrapper });
    const next = screen.getByRole('button', { name: 'Next' });
    next.focus();
    fireEvent.click(next);
    expect(next).toHaveFocus();
    await waitFor(() => expect(announce).toHaveBeenCalledTimes(1));
    expect(announce).toHaveBeenCalledWith('Step two', { polite: true });
  });

  it.each([false, true])('stays silent on initial mount and StrictMode replay (strict=%s)', async strict => {
    const view = render(
      strict ? (
        <React.StrictMode>
          <Example />
        </React.StrictMode>
      ) : (
        <Example />
      ),
      { wrapper },
    );
    await act(() => Promise.resolve());
    expect(announce).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    await waitFor(() => expect(announce).toHaveBeenCalledTimes(1));
    view.unmount();
  });

  it.each([false, true])('announces a deferred title once without stealing focus (autofocus=%s)', async autoFocus => {
    const view = renderExample({ secondTitle: null, autoFocus });
    const next = screen.getByRole('button', { name: 'Next' });
    next.focus();
    fireEvent.click(next);
    expect(announce).not.toHaveBeenCalled();
    const input = screen.getByRole('textbox', { name: 'Step two input' });
    if (!autoFocus) {
      input.focus();
    }
    expect(input).toHaveFocus();
    view.rerender(<Example autoFocus={autoFocus} />);
    await waitFor(() => expect(announce).toHaveBeenCalledWith('Step two', { polite: true }));
    expect(input).toHaveFocus();
    view.rerender(<Example secondTitle={<TeachingPopoverTitle>Updated step two</TeachingPopoverTitle>} />);
    await act(() => Promise.resolve());
    expect(announce).toHaveBeenCalledTimes(1);
  });

  it('does not recover heading focus when a custom footer unmounts', async () => {
    const view = renderExample({ removeNavigationOrigin: true, secondTitle: null });
    const next = screen.getByRole('button', { name: 'Next' });
    next.focus();
    fireEvent.click(next);
    expect(next).not.toBeInTheDocument();
    view.rerender(<Example removeNavigationOrigin />);
    await waitFor(() => expect(announce).toHaveBeenCalledWith('Step two', { polite: true }));
    expect(screen.getByRole('heading', { name: 'Step two' })).not.toHaveFocus();
    expect(view.container.ownerDocument.body).toHaveFocus();
  });

  it('cancels deferred announcements when a newer page commits', async () => {
    const view = renderExample({ value: 'one', secondTitle: null });
    view.rerender(<Example value="two" secondTitle={null} />);
    expect(announce).not.toHaveBeenCalled();
    view.rerender(<Example value="three" />);
    await act(() => Promise.resolve());
    expect(announce.mock.calls).toEqual([['Step three', { polite: true }]]);
  });

  it('does not announce deferred content after unmount', async () => {
    const view = renderExample({ secondTitle: null });
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    view.rerender(<Example />);
    view.unmount();
    await act(() => Promise.resolve());
    expect(announce).not.toHaveBeenCalled();
  });

  it('does not announce a deferred initial title or a same-page title update', async () => {
    const view = renderExample({ firstTitle: null });
    view.rerender(<Example />);
    await act(() => Promise.resolve());
    expect(announce).not.toHaveBeenCalled();
    view.rerender(<Example firstTitle={<TeachingPopoverTitle>Updated step one</TeachingPopoverTitle>} />);
    await act(() => Promise.resolve());
    expect(announce).not.toHaveBeenCalled();
  });
});
