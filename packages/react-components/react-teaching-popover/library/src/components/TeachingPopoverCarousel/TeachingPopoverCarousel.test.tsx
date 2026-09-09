import * as React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverCarousel } from './TeachingPopoverCarousel';
import { TeachingPopoverCarouselCard } from '../TeachingPopoverCarouselCard/TeachingPopoverCarouselCard';
import { TeachingPopoverCarouselFooter } from '../TeachingPopoverCarouselFooter/TeachingPopoverCarouselFooter';
import { TeachingPopoverCarouselNav } from '../TeachingPopoverCarouselNav/TeachingPopoverCarouselNav';
import { TeachingPopoverCarouselNavButton } from '../TeachingPopoverCarouselNavButton/TeachingPopoverCarouselNavButton';
import { TeachingPopoverTitle } from '../TeachingPopoverTitle/TeachingPopoverTitle';

const DeferredSecondPage = (props: {
  autoFocus?: boolean;
  removeNavigationOrigin?: boolean;
  revealTitleRef: React.RefObject<(() => void) | null>;
}) => {
  const [showTitle, setShowTitle] = React.useState(false);
  props.revealTitleRef.current = () => setShowTitle(true);
  const footer = (
    <TeachingPopoverCarouselFooter next="Next" previous="Previous" initialStepText="Close" finalStepText="Finish">
      Footer
    </TeachingPopoverCarouselFooter>
  );

  return (
    <TeachingPopoverCarousel defaultValue="one">
      <TeachingPopoverCarouselCard value="one">
        <TeachingPopoverTitle>Step one</TeachingPopoverTitle>
        {props.removeNavigationOrigin && footer}
      </TeachingPopoverCarouselCard>
      <TeachingPopoverCarouselCard value="two">
        {showTitle && <TeachingPopoverTitle>Step two</TeachingPopoverTitle>}
        <input aria-label="Step two input" autoFocus={props.autoFocus} />
      </TeachingPopoverCarouselCard>
      {!props.removeNavigationOrigin && footer}
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

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <TeachingPopoverCarousel defaultValue="">Default TeachingPopoverCarousel</TeachingPopoverCarousel>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('moves focus to the new page title when navigating to the next page', async () => {
    render(
      <TeachingPopoverCarousel defaultValue="one">
        <TeachingPopoverCarouselCard value="one">
          <TeachingPopoverTitle>Step one</TeachingPopoverTitle>
        </TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselCard value="two">
          <TeachingPopoverTitle>Step two</TeachingPopoverTitle>
        </TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselFooter next="Next" previous="Previous" initialStepText="Close" finalStepText="Finish">
          Footer
        </TeachingPopoverCarouselFooter>
      </TeachingPopoverCarousel>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));

    await waitFor(() => expect(screen.getByText('Step two')).toHaveFocus());
  });

  it('moves focus to the new page title when navigating to the previous page', async () => {
    render(
      <TeachingPopoverCarousel defaultValue="two">
        <TeachingPopoverCarouselCard value="one">
          <TeachingPopoverTitle>Step one</TeachingPopoverTitle>
        </TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselCard value="two">
          <TeachingPopoverTitle>Step two</TeachingPopoverTitle>
        </TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselFooter next="Next" previous="Previous" initialStepText="Close" finalStepText="Finish">
          Footer
        </TeachingPopoverCarouselFooter>
      </TeachingPopoverCarousel>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));

    await waitFor(() => expect(screen.getByText('Step one')).toHaveFocus());
  });

  it('keeps focus on the navigation tab when activating it', async () => {
    render(
      <TeachingPopoverCarousel defaultValue="one">
        <TeachingPopoverCarouselCard value="one">
          <TeachingPopoverTitle>Step one</TeachingPopoverTitle>
        </TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselCard value="two">
          <TeachingPopoverTitle>Step two</TeachingPopoverTitle>
        </TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselNav>
          {value => <TeachingPopoverCarouselNavButton aria-label={`Step ${value}`} />}
        </TeachingPopoverCarouselNav>
      </TeachingPopoverCarousel>,
    );

    const stepTwoTab = screen.getByRole('tab', { name: 'Step two' });
    stepTwoTab.focus();
    fireEvent.click(stepTwoTab);

    await waitFor(() => expect(screen.getByText('Step two')).toBeVisible());
    expect(stepTwoTab).toHaveFocus();
  });

  it('does not move focus to a deferred title after the user moves focus', async () => {
    const revealTitleRef: React.RefObject<(() => void) | null> = { current: null };
    render(<DeferredSecondPage revealTitleRef={revealTitleRef} />);

    const nextButton = screen.getByRole('button', { name: 'Next' });
    nextButton.focus();
    fireEvent.click(nextButton);

    const input = await screen.findByRole('textbox', { name: 'Step two input' });
    input.focus();
    expect(input).toHaveFocus();
    act(() => revealTitleRef.current?.());

    await waitFor(() => expect(screen.getByText('Step two')).toBeVisible());
    expect(input).toHaveFocus();
  });

  it('does not override autofocus when a deferred title mounts', async () => {
    const revealTitleRef: React.RefObject<(() => void) | null> = { current: null };
    render(<DeferredSecondPage autoFocus revealTitleRef={revealTitleRef} />);

    const nextButton = screen.getByRole('button', { name: 'Next' });
    nextButton.focus();
    fireEvent.click(nextButton);

    const input = await screen.findByRole('textbox', { name: 'Step two input' });
    expect(input).toHaveFocus();
    act(() => revealTitleRef.current?.());

    await waitFor(() => expect(screen.getByText('Step two')).toBeVisible());
    expect(input).toHaveFocus();
  });

  it('moves focus to a deferred title when the navigation origin still has focus', async () => {
    const revealTitleRef: React.RefObject<(() => void) | null> = { current: null };
    render(<DeferredSecondPage revealTitleRef={revealTitleRef} />);

    const nextButton = screen.getByRole('button', { name: 'Next' });
    nextButton.focus();
    fireEvent.click(nextButton);
    expect(nextButton).toHaveFocus();
    act(() => revealTitleRef.current?.());

    await waitFor(() => expect(screen.getByText('Step two')).toHaveFocus());
  });

  it('moves focus to a deferred title when the navigation origin was removed', async () => {
    const revealTitleRef: React.RefObject<(() => void) | null> = { current: null };
    render(<DeferredSecondPage removeNavigationOrigin revealTitleRef={revealTitleRef} />);

    const nextButton = screen.getByRole('button', { name: 'Next' });
    nextButton.focus();
    fireEvent.click(nextButton);

    await waitFor(() => expect(nextButton).not.toBeInTheDocument());
    expect(document.body).toHaveFocus();
    act(() => revealTitleRef.current?.());

    await waitFor(() => expect(screen.getByText('Step two')).toHaveFocus());
  });

  it('does not move focus when the controlled value changes directly', async () => {
    const ControlledCarousel = () => {
      const [value, setValue] = React.useState('one');

      return (
        <>
          <button type="button" onClick={() => setValue('two')}>
            Show step two
          </button>
          <TeachingPopoverCarousel value={value}>
            <TeachingPopoverCarouselCard value="one">
              <TeachingPopoverTitle>Step one</TeachingPopoverTitle>
            </TeachingPopoverCarouselCard>
            <TeachingPopoverCarouselCard value="two">
              <TeachingPopoverTitle>Step two</TeachingPopoverTitle>
            </TeachingPopoverCarouselCard>
          </TeachingPopoverCarousel>
        </>
      );
    };

    render(<ControlledCarousel />);

    const control = screen.getByRole('button', { name: 'Show step two' });
    control.focus();
    fireEvent.click(control);

    await waitFor(() => expect(screen.getByText('Step two')).toBeVisible());
    expect(control).toHaveFocus();
  });

  it('does not reuse a rejected controlled navigation request for a later external change', async () => {
    const ControlledCarousel = () => {
      const [value, setValue] = React.useState('one');

      return (
        <>
          <button type="button" onClick={() => setValue('two')}>
            Show step two
          </button>
          <TeachingPopoverCarousel value={value}>
            <TeachingPopoverCarouselCard value="one">
              <TeachingPopoverTitle>Step one</TeachingPopoverTitle>
            </TeachingPopoverCarouselCard>
            <TeachingPopoverCarouselCard value="two">
              <TeachingPopoverTitle>Step two</TeachingPopoverTitle>
            </TeachingPopoverCarouselCard>
            <TeachingPopoverCarouselFooter
              next="Next"
              previous="Previous"
              initialStepText="Close"
              finalStepText="Finish"
            >
              Footer
            </TeachingPopoverCarouselFooter>
          </TeachingPopoverCarousel>
        </>
      );
    };

    render(<ControlledCarousel />);

    const nextButton = screen.getByRole('button', { name: 'Next' });
    nextButton.focus();
    fireEvent.click(nextButton);
    expect(screen.getByText('Step one')).toBeVisible();

    const control = screen.getByRole('button', { name: 'Show step two' });
    control.focus();
    fireEvent.click(control);

    await waitFor(() => expect(screen.getByText('Step two')).toBeVisible());
    expect(control).toHaveFocus();
  });

  it('clears a pending directional focus request when the active navigation tab is selected', async () => {
    let showStepTwo: (() => void) | undefined;

    const ControlledCarousel = () => {
      const [value, setValue] = React.useState('one');
      showStepTwo = () => setValue('two');

      return (
        <TeachingPopoverCarousel value={value}>
          <TeachingPopoverCarouselCard value="one">
            <TeachingPopoverTitle>Step one</TeachingPopoverTitle>
          </TeachingPopoverCarouselCard>
          <TeachingPopoverCarouselCard value="two">
            <TeachingPopoverTitle>Step two</TeachingPopoverTitle>
          </TeachingPopoverCarouselCard>
          <TeachingPopoverCarouselNav>
            {pageValue => <TeachingPopoverCarouselNavButton aria-label={`Step ${pageValue}`} />}
          </TeachingPopoverCarouselNav>
          <TeachingPopoverCarouselFooter next="Next" previous="Previous" initialStepText="Close" finalStepText="Finish">
            Footer
          </TeachingPopoverCarouselFooter>
        </TeachingPopoverCarousel>
      );
    };

    render(<ControlledCarousel />);

    const nextButton = screen.getByRole('button', { name: 'Next' });
    nextButton.focus();
    fireEvent.click(nextButton);

    const activeTab = screen.getByRole('tab', { name: 'Step one' });
    activeTab.focus();
    fireEvent.click(activeTab);
    act(() => showStepTwo?.());

    await waitFor(() => expect(screen.getByText('Step two')).toBeVisible());
    expect(activeTab).toHaveFocus();
  });

  it('moves focus to the title after directional navigation in controlled mode', async () => {
    const ControlledCarousel = () => {
      const [value, setValue] = React.useState('one');

      return (
        <TeachingPopoverCarousel value={value} onValueChange={(_, data) => setValue(data.value!)}>
          <TeachingPopoverCarouselCard value="one">
            <TeachingPopoverTitle>Step one</TeachingPopoverTitle>
          </TeachingPopoverCarouselCard>
          <TeachingPopoverCarouselCard value="two">
            <TeachingPopoverTitle>Step two</TeachingPopoverTitle>
          </TeachingPopoverCarouselCard>
          <TeachingPopoverCarouselFooter next="Next" previous="Previous" initialStepText="Close" finalStepText="Finish">
            Footer
          </TeachingPopoverCarouselFooter>
        </TeachingPopoverCarousel>
      );
    };

    render(<ControlledCarousel />);

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));

    await waitFor(() => expect(screen.getByText('Step two')).toHaveFocus());
  });

  it('supports delayed controlled acceptance while the navigation origin retains focus', async () => {
    let acceptNavigation: (() => void) | undefined;

    const ControlledCarousel = () => {
      const [value, setValue] = React.useState('one');

      return (
        <TeachingPopoverCarousel
          value={value}
          onValueChange={(_, data) => {
            acceptNavigation = () => setValue(data.value!);
          }}
        >
          <TeachingPopoverCarouselCard value="one">
            <TeachingPopoverTitle>Step one</TeachingPopoverTitle>
          </TeachingPopoverCarouselCard>
          <TeachingPopoverCarouselCard value="two">
            <TeachingPopoverTitle>Step two</TeachingPopoverTitle>
          </TeachingPopoverCarouselCard>
          <TeachingPopoverCarouselFooter next="Next" previous="Previous" initialStepText="Close" finalStepText="Finish">
            Footer
          </TeachingPopoverCarouselFooter>
        </TeachingPopoverCarousel>
      );
    };

    render(<ControlledCarousel />);

    const nextButton = screen.getByRole('button', { name: 'Next' });
    nextButton.focus();
    fireEvent.click(nextButton);
    expect(screen.getByText('Step one')).toBeVisible();

    act(() => acceptNavigation?.());

    await waitFor(() => expect(screen.getByText('Step two')).toHaveFocus());
  });

  it('does not move focus to a deferred initial title in StrictMode', async () => {
    let revealInitialTitle: (() => void) | undefined;

    const StrictModeCarousel = () => {
      const [showTitle, setShowTitle] = React.useState(false);
      revealInitialTitle = () => setShowTitle(true);

      return (
        <TeachingPopoverCarousel defaultValue="one">
          <TeachingPopoverCarouselCard value="one">
            {showTitle && <TeachingPopoverTitle>Step one</TeachingPopoverTitle>}
          </TeachingPopoverCarouselCard>
        </TeachingPopoverCarousel>
      );
    };

    render(
      <React.StrictMode>
        <StrictModeCarousel />
      </React.StrictMode>,
    );

    expect(document.body).toHaveFocus();
    act(() => revealInitialTitle?.());

    await waitFor(() => expect(screen.getByText('Step one')).toBeVisible());
    expect(document.body).toHaveFocus();
    expect(screen.getByText('Step one')).not.toHaveFocus();
  });

  it('does not move focus when a title mounts on the active page outside of a navigation', async () => {
    const AsyncTitle = () => {
      const [loaded, setLoaded] = React.useState(false);

      React.useEffect(() => {
        setLoaded(true);
      }, []);

      return loaded ? <TeachingPopoverTitle>Async step one</TeachingPopoverTitle> : null;
    };

    render(
      <TeachingPopoverCarousel defaultValue="one">
        <TeachingPopoverCarouselCard value="one">
          <button type="button">Focus me</button>
          <AsyncTitle />
        </TeachingPopoverCarouselCard>
      </TeachingPopoverCarousel>,
    );

    const button = screen.getByRole('button', { name: 'Focus me' });
    button.focus();

    // Wait for the async title to mount, plus any pending microtasks (e.g. the carousel's mutation observer).
    await waitFor(() => expect(screen.getByText('Async step one')).toBeInTheDocument());
    await Promise.resolve();

    expect(button).toHaveFocus();
    expect(screen.getByText('Async step one')).not.toHaveFocus();
  });
});
