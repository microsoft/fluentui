import * as React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnnounceProvider } from '@fluentui/react-shared-contexts';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverCarousel } from './TeachingPopoverCarousel';
import type { TeachingPopoverCarouselProps } from './TeachingPopoverCarousel.types';
import { TeachingPopoverCarouselCard } from '../TeachingPopoverCarouselCard/TeachingPopoverCarouselCard';
import { TeachingPopoverCarouselFooter } from '../TeachingPopoverCarouselFooter/TeachingPopoverCarouselFooter';
import { TeachingPopoverTitle } from '../TeachingPopoverTitle/TeachingPopoverTitle';

const Example = (props: TeachingPopoverCarouselProps) => (
  <TeachingPopoverCarousel defaultValue={props.value === undefined ? 'one' : undefined} {...props}>
    <TeachingPopoverCarouselCard value="one">
      <TeachingPopoverTitle>Step one</TeachingPopoverTitle>
    </TeachingPopoverCarouselCard>
    <TeachingPopoverCarouselCard value="two">
      <TeachingPopoverTitle>Step two</TeachingPopoverTitle>
    </TeachingPopoverCarouselCard>
    <TeachingPopoverCarouselCard value="three">
      <TeachingPopoverTitle>Step three</TeachingPopoverTitle>
    </TeachingPopoverCarouselCard>
    <TeachingPopoverCarouselFooter next="Next" previous="Previous" initialStepText="Close" finalStepText="Finish" />
  </TeachingPopoverCarousel>
);

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
  const renderExample = (props: TeachingPopoverCarouselProps = {}) => render(<Example {...props} />, { wrapper });

  beforeEach(() => announce.mockClear());

  it('renders a default state', () => {
    const result = render(
      <TeachingPopoverCarousel defaultValue="">Default TeachingPopoverCarousel</TeachingPopoverCarousel>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it.each([
    ['one', 'Next'],
    ['three', 'Previous'],
  ])('calls the formatter after navigating from %s without moving focus', async (defaultValue, buttonName) => {
    const announcement = jest.fn(value => {
      expect(screen.getByRole('heading', { name: 'Step two' })).toBeDefined();
      expect(screen.queryByRole('heading', { name: `Step ${defaultValue}` })).toBeNull();
      return `Custom ${value}`;
    });
    renderExample({ defaultValue, announcement });
    const button = screen.getByRole('button', { name: buttonName });
    button.focus();
    fireEvent.click(button);
    await waitFor(() => expect(announce).toHaveBeenCalledWith('Custom two', { polite: true }));
    expect(announcement).toHaveBeenCalledTimes(1);
    expect(announcement).toHaveBeenCalledWith('two');
    expect(button.ownerDocument.activeElement).toBe(button);
  });

  it('supports repeated keyboard navigation with callback-only announcements', async () => {
    renderExample({ announcement: value => `Custom ${value}` });
    const next = screen.getByRole('button', { name: 'Next' });
    next.focus();
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(announce).toHaveBeenCalledTimes(1));
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(announce).toHaveBeenCalledTimes(2));
    expect(next.ownerDocument.activeElement).toBe(next);
    const previous = screen.getByRole('button', { name: 'Previous' });
    previous.focus();
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(announce).toHaveBeenCalledTimes(3));
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(announce).toHaveBeenCalledTimes(4));
    expect(previous.ownerDocument.activeElement).toBe(previous);
    expect(announce.mock.calls).toEqual([
      ['Custom two', { polite: true }],
      ['Custom three', { polite: true }],
      ['Custom two', { polite: true }],
      ['Custom one', { polite: true }],
    ]);
  });

  it('stays silent when no callback is supplied', async () => {
    const view = renderExample({ value: 'one' });
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    await act(() => Promise.resolve());
    expect(announce).not.toHaveBeenCalled();
    view.rerender(<Example value="two" />);
    await act(() => Promise.resolve());
    expect(screen.getByRole('heading', { name: 'Step two' })).toBeDefined();
    view.rerender(<Example value="three" />);
    await act(() => Promise.resolve());
    expect(announce).not.toHaveBeenCalled();
  });

  it('preserves an empty custom announcement as intentional silence', async () => {
    const announcement = jest.fn(() => '');
    renderExample({ announcement });
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    await waitFor(() => expect(announcement).toHaveBeenCalledWith('two'));
    expect(announcement).toHaveBeenCalledTimes(1);
    expect(announce).not.toHaveBeenCalled();
  });

  it('announces controlled acceptance, not rejected requests or unchanged values', async () => {
    const announcement = jest.fn(value => `Custom ${value}`);
    const onValueChange = jest.fn();
    const view = renderExample({ value: 'one', announcement, onValueChange });
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    await act(() => Promise.resolve());
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(announcement).not.toHaveBeenCalled();
    view.rerender(<Example value="two" announcement={announcement} />);
    await waitFor(() => expect(announce).toHaveBeenCalledWith('Custom two', { polite: true }));
    view.rerender(<Example value="two" announcement={announcement} className="rerender" />);
    await act(() => Promise.resolve());
    expect(announcement).toHaveBeenCalledTimes(1);
    expect(announce).toHaveBeenCalledTimes(1);
  });

  it('announces synchronously accepted controlled navigation once', async () => {
    const ControlledExample = () => {
      const [value, setValue] = React.useState('one');
      return (
        <Example
          value={value}
          announcement={newValue => `Custom ${newValue}`}
          onValueChange={(_, data) => setValue(data.value!)}
        />
      );
    };
    render(<ControlledExample />, { wrapper });
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    await waitFor(() => expect(announce).toHaveBeenCalledWith('Custom two', { polite: true }));
    expect(announce).toHaveBeenCalledTimes(1);
  });

  it.each([false, true])('stays silent on initial mount and StrictMode replay (strict=%s)', async strict => {
    const example = <Example announcement={value => `Custom ${value}`} />;
    render(strict ? <React.StrictMode>{example}</React.StrictMode> : example, { wrapper });
    await act(() => Promise.resolve());
    expect(announce).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    await waitFor(() => expect(announce).toHaveBeenCalledTimes(1));
  });

  it('waits for empty destination cards to become active', async () => {
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

  it('discards pending announcements when the callback is removed and later restored', async () => {
    const announcement = jest.fn(value => `Custom ${value}`);
    const example = (
      value: string,
      callback?: TeachingPopoverCarouselProps['announcement'],
      showDestination = false,
    ) => (
      <TeachingPopoverCarousel value={value} announcement={callback}>
        <TeachingPopoverCarouselCard value="one" />
        {showDestination && <TeachingPopoverCarouselCard value="two" />}
      </TeachingPopoverCarousel>
    );
    const view = render(example('one', announcement), { wrapper });
    view.rerender(example('two', announcement));
    await act(() => Promise.resolve());
    expect(announcement).not.toHaveBeenCalled();

    view.rerender(example('two'));
    view.rerender(example('two', announcement, true));
    await act(() => Promise.resolve());
    expect(announcement).not.toHaveBeenCalled();
    expect(announce).not.toHaveBeenCalled();

    view.rerender(example('one', announcement, true));
    await waitFor(() => expect(announce).toHaveBeenCalledWith('Custom one', { polite: true }));
    expect(announcement).toHaveBeenCalledTimes(1);
  });
});
