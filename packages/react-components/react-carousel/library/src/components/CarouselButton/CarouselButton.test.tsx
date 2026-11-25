import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { CarouselButton } from './CarouselButton';
import type { CarouselButtonProps } from './CarouselButton.types';
import { CarouselProvider, carouselContextDefaultValue } from '../CarouselContext';
import type { CarouselContextValue } from '../CarouselContext.types';

const subscribeForValues: CarouselContextValue['subscribeForValues'] = listener => {
  listener({ activeIndex: 0, navItemsCount: 2, groupIndexList: [[0], [1]], slideNodes: [], canLoop: true });
  return () => undefined;
};

const Navigation = ({
  initialIndex = 0,
  circular = false,
  rejectNavigation = false,
  previousDisabled,
  onClick,
}: {
  initialIndex?: number;
  circular?: boolean;
  rejectNavigation?: boolean;
  previousDisabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const [activeIndex, setActiveIndex] = React.useState(initialIndex);
  const containerRef = React.useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef}>
      <CarouselProvider
        value={{
          ...carouselContextDefaultValue,
          activeIndex,
          circular,
          containerRef,
          subscribeForValues,
          selectPageByDirection: (_, direction) => {
            const nextIndex = direction === 'next' ? 1 : 0;
            if (!rejectNavigation) {
              setActiveIndex(nextIndex);
            }
            return nextIndex;
          },
        }}
      >
        <CarouselButton navType="prev" onClick={onClick} {...(previousDisabled && { disabled: true })}>
          Previous
        </CarouselButton>
        <CarouselButton navType="next" onClick={onClick}>
          Next
        </CarouselButton>
      </CarouselProvider>
      <button>Outside</button>
    </div>
  );
};

describe('CarouselButton', () => {
  isConformant({
    Component: CarouselButton as React.FunctionComponent<CarouselButtonProps>,
    displayName: 'CarouselButton',
    requiredProps: {
      navType: 'next',
    },
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            icon: 'Test Icon',
          },
        },
      ],
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CarouselButton navType="next">{'next'}</CarouselButton>);
    expect(result.container).toMatchSnapshot();
  });

  describe('endpoint focus', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it.each([
      { initialIndex: 0, sourceName: 'Next', targetName: 'Previous' },
      { initialIndex: 1, sourceName: 'Previous', targetName: 'Next' },
    ])(
      'waits for the opposite button to be enabled from index $initialIndex',
      ({ initialIndex, sourceName, targetName }) => {
        const { getByRole } = render(<Navigation initialIndex={initialIndex} />);
        const source = getByRole('button', { name: sourceName });
        const target = getByRole('button', { name: targetName });
        source.focus();
        expect(target).toBeDisabled();
        fireEvent.click(source);
        expect(source).toBeDisabled();
        expect(target).not.toHaveFocus();
        act(() => jest.runAllTimers());
        expect(target).toHaveFocus();
      },
    );

    it('does not introduce focus for a programmatic click', () => {
      const { getByRole } = render(<Navigation />);
      fireEvent.click(getByRole('button', { name: 'Next' }));
      act(() => jest.runAllTimers());
      expect(getByRole('button', { name: 'Previous' })).not.toHaveFocus();
    });

    it('does not steal focus moved by a consumer during activation', () => {
      const outsideRef = React.createRef<HTMLButtonElement>();
      const { getByRole } = render(
        <>
          <Navigation onClick={() => outsideRef.current?.focus()} />
          <button ref={outsideRef}>Consumer target</button>
        </>,
      );
      const next = getByRole('button', { name: 'Next' });
      next.focus();
      fireEvent.click(next);
      act(() => jest.runAllTimers());
      expect(outsideRef.current).toHaveFocus();
    });

    it('does not transfer focus for a rejected controlled update', () => {
      const { getByRole } = render(<Navigation rejectNavigation />);
      const next = getByRole('button', { name: 'Next' });
      next.focus();
      fireEvent.click(next);
      act(() => jest.runAllTimers());
      expect(next).toHaveFocus();
    });

    it('does not steal focus moved before the scheduled frame', () => {
      const { getByRole } = render(<Navigation />);
      const next = getByRole('button', { name: 'Next' });
      const outside = getByRole('button', { name: 'Outside' });
      next.focus();
      fireEvent.click(next);
      outside.focus();
      act(() => jest.runAllTimers());
      expect(outside).toHaveFocus();
    });

    it('does not attempt to focus an explicitly disabled opposite button', () => {
      const { getByRole } = render(<Navigation previousDisabled />);
      const previous = getByRole('button', { name: 'Previous' });
      const focus = jest.spyOn(previous, 'focus');
      const next = getByRole('button', { name: 'Next' });
      next.focus();
      fireEvent.click(next);
      act(() => jest.runAllTimers());
      expect(focus).not.toHaveBeenCalled();
    });

    it('cancels a pending transfer when the source unmounts', () => {
      const { getByRole, unmount } = render(<Navigation />);
      const previous = getByRole('button', { name: 'Previous' });
      const focus = jest.spyOn(previous, 'focus');
      const next = getByRole('button', { name: 'Next' });
      next.focus();
      fireEvent.click(next);
      unmount();
      act(() => jest.runAllTimers());
      expect(focus).not.toHaveBeenCalled();
    });

    it('keeps focus on circular navigation', () => {
      const { getByRole } = render(<Navigation circular />);
      const next = getByRole('button', { name: 'Next' });
      next.focus();
      fireEvent.click(next);
      act(() => jest.runAllTimers());
      expect(next).toHaveFocus();
    });
  });
});
