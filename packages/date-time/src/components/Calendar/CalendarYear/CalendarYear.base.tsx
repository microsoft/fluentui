import * as React from 'react';
import {
  ICalendarYearStrings,
  ICalendarYearProps,
  ICalendarYearRange,
  ICalendarYearHeaderProps,
  ICalendarYearStyleProps,
  ICalendarYearStyles,
} from './CalendarYear.types';
import { KeyCodes, getRTL, classNamesFunction, css, format, IRefObject } from '@fluentui/react-internal/lib/Utilities';
import { FocusZone } from '@fluentui/react-internal/lib/FocusZone';
import { Icon } from '@fluentui/react-internal/lib/Icon';
import { ICalendarIconStrings } from '../Calendar.types';
import { useMergedRefs, usePrevious } from '@uifabric/react-hooks';

const getClassNames = classNamesFunction<ICalendarYearStyleProps, ICalendarYearStyles>();

const CELL_COUNT = 12;
const CELLS_PER_ROW = 4;

const DefaultCalendarYearStrings: ICalendarYearStrings = {
  prevRangeAriaLabel: undefined,
  nextRangeAriaLabel: undefined,
};

const DefaultNavigationIcons: ICalendarIconStrings = {
  leftNavigation: 'Up',
  rightNavigation: 'Down',
  closeIcon: 'CalculatorMultiply',
};

interface ICalendarYearGrid {
  focus(): void;
}

interface ICalendarYearGridCellProps extends ICalendarYearProps {
  year: number;
  current?: boolean;
  selected?: boolean;
  disabled?: boolean;
  onSelectYear?: (year: number) => void;
  onRenderYear?: (year: number) => React.ReactNode;
}

interface ICalendarYearGridProps extends ICalendarYearProps, ICalendarYearRange {
  selectedYear?: number;
  animateBackwards?: boolean;
  componentRef?: IRefObject<ICalendarYearGridCell>;
}

interface ICalendarYearGridCell {
  focus(): void;
}

const CalendarYearGridCell = React.forwardRef(
  (props: ICalendarYearGridCellProps, forwardedRef: React.Ref<HTMLButtonElement>) => {
    const {
      styles,
      theme,
      className,
      highlightCurrentYear,
      highlightSelectedYear,
      year,
      selected,
      disabled,
      componentRef,
      onSelectYear,
      onRenderYear,
    } = props;

    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const mergedRef = useMergedRefs(buttonRef, forwardedRef);

    React.useImperativeHandle(
      componentRef,
      () => ({
        focus() {
          buttonRef.current?.focus?.();
        },
      }),
      [],
    );

    const onClick = () => {
      onSelectYear?.(year);
    };

    const onKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
      if (ev.which === KeyCodes.enter) {
        onSelectYear?.(year);
      }
    };

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
      highlightCurrent: highlightCurrentYear,
      highlightSelected: highlightSelectedYear,
    });

    return (
      <button
        className={css(classNames.itemButton, {
          [classNames.selected]: selected,
          [classNames.disabled]: disabled,
        })}
        type="button"
        role="gridcell"
        onClick={!disabled ? onClick : undefined}
        onKeyDown={!disabled ? onKeyDown : undefined}
        disabled={disabled}
        aria-label={String(year)}
        aria-selected={selected}
        ref={mergedRef}
        aria-readonly={true} // prevent grid from being "editable"
      >
        {onRenderYear?.(year) ?? year}
      </button>
    );
  },
);
CalendarYearGridCell.displayName = 'CalendarYearGridCell';

const CalendarYearGrid = React.forwardRef(
  (props: ICalendarYearGridProps, forwardedRef: React.Ref<HTMLButtonElement>) => {
    const {
      styles,
      theme,
      className,
      fromYear,
      toYear,
      animationDirection,
      animateBackwards,
      minYear,
      maxYear,
      onSelectYear,
      selectedYear,
      componentRef,
    } = props;

    const selectedCellRef = React.useRef<ICalendarYearGridCell>(null);
    const currentCellRef = React.useRef<ICalendarYearGridCell>(null);

    React.useImperativeHandle(
      componentRef,
      () => ({
        focus() {
          (selectedCellRef.current || currentCellRef.current)?.focus?.();
        },
      }),
      [],
    );

    const renderCell = (yearToRender: number): React.ReactNode => {
      const selected = yearToRender === selectedYear;
      const disabled =
        (minYear !== undefined && yearToRender < minYear) || (maxYear !== undefined && yearToRender > maxYear);
      const current = yearToRender === new Date().getFullYear();

      return (
        <CalendarYearGridCell
          {...props}
          key={yearToRender}
          year={yearToRender}
          selected={selected}
          current={current}
          disabled={disabled}
          onSelectYear={onSelectYear}
          componentRef={selected ? selectedCellRef : current ? currentCellRef : undefined}
          ref={forwardedRef}
          theme={theme}
        />
      );
    };

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
      animateBackwards: animateBackwards,
      animationDirection: animationDirection,
    });

    let year = fromYear;
    const cells: React.ReactNode[][] = [];

    for (let i = 0; i < (toYear - fromYear + 1) / CELLS_PER_ROW; i++) {
      cells.push([]);
      for (let j = 0; j < CELLS_PER_ROW; j++) {
        cells[i].push(renderCell(year));
        year++;
      }
    }

    return (
      <FocusZone>
        <div className={classNames.gridContainer} role="grid">
          {cells.map((cellRow: React.ReactNode[], index: number) => {
            return (
              <div key={'yearPickerRow_' + index + '_' + fromYear} role="row" className={classNames.buttonRow}>
                {...cellRow}
              </div>
            );
          })}
        </div>
      </FocusZone>
    );
  },
);
CalendarYearGrid.displayName = 'CalendarYearGrid';

const enum CalendarYearNavDirection {
  Previous,
  Next,
}

interface ICalendarYearNavArrowProps extends ICalendarYearHeaderProps {
  direction: CalendarYearNavDirection;
}

const CalendarYearNavArrow = React.forwardRef(
  (props: ICalendarYearNavArrowProps, forwardedRef: React.Ref<HTMLButtonElement>) => {
    const {
      styles,
      theme,
      className,
      navigationIcons,
      strings,
      direction,
      onSelectPrev,
      onSelectNext,
      fromYear,
      toYear,
      maxYear,
      minYear,
    } = props;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
    });

    const iconStrings = navigationIcons || DefaultNavigationIcons;
    const yearStrings = strings || DefaultCalendarYearStrings;
    const ariaLabel =
      direction === CalendarYearNavDirection.Previous ? yearStrings.prevRangeAriaLabel : yearStrings.nextRangeAriaLabel;
    const newRangeOffset = direction === CalendarYearNavDirection.Previous ? -CELL_COUNT : CELL_COUNT;
    const newRange = { fromYear: fromYear + newRangeOffset, toYear: toYear + newRangeOffset };
    const ariaLabelString = ariaLabel ? (typeof ariaLabel === 'string' ? ariaLabel : ariaLabel(newRange)) : undefined;
    const disabled =
      direction === CalendarYearNavDirection.Previous
        ? minYear !== undefined && fromYear < minYear
        : maxYear !== undefined && props.fromYear + CELL_COUNT > maxYear;

    const onNavigate = () => {
      direction === CalendarYearNavDirection.Previous ? onSelectPrev?.() : onSelectNext?.();
    };

    const onKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
      if (ev.which === KeyCodes.enter) {
        onNavigate();
      }
    };

    return (
      <button
        className={css(classNames.navigationButton, {
          [classNames.disabled]: disabled,
        })}
        onClick={!disabled ? onNavigate : undefined}
        onKeyDown={!disabled ? onKeyDown : undefined}
        type="button"
        title={ariaLabelString}
        disabled={disabled}
        ref={forwardedRef}
      >
        <Icon
          iconName={
            (direction === CalendarYearNavDirection.Previous) !== getRTL()
              ? iconStrings.rightNavigation
              : iconStrings.leftNavigation
          }
        />
      </button>
    );
  },
);
CalendarYearNavArrow.displayName = 'CalendarYearNavArrow';

const CalendarYearNav = React.forwardRef((props: ICalendarYearHeaderProps, forwardedRef: React.Ref<HTMLDivElement>) => {
  const { styles, theme, className } = props;

  const classNames = getClassNames(styles, {
    theme: theme!,
    className: className,
  });

  return (
    <div className={classNames.navigationButtonsContainer} ref={forwardedRef}>
      <CalendarYearNavArrow {...props} direction={CalendarYearNavDirection.Previous} />
      <CalendarYearNavArrow {...props} direction={CalendarYearNavDirection.Next} />
    </div>
  );
});
CalendarYearNav.displayName = 'CalendarYearNav';

const CalendarYearTitle = React.forwardRef(
  (props: ICalendarYearHeaderProps, forwardedRef: React.Ref<HTMLButtonElement | HTMLDivElement>) => {
    const { styles, theme, className, fromYear, toYear, strings, animateBackwards, animationDirection } = props;

    const onHeaderSelect = () => {
      props.onHeaderSelect?.(true);
    };

    const onHeaderKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
      if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
        onHeaderSelect();
      }
    };

    const onRenderYear = (year: number) => {
      return props.onRenderYear?.(year) ?? year;
    };

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
      hasHeaderClickCallback: !!props.onHeaderSelect,
      animateBackwards: animateBackwards,
      animationDirection: animationDirection,
    });

    if (props.onHeaderSelect) {
      const rangeAriaLabel = (strings || DefaultCalendarYearStrings).rangeAriaLabel;
      const headerAriaLabelFormatString = strings!.headerAriaLabelFormatString;
      const currentDateRange = rangeAriaLabel
        ? typeof rangeAriaLabel === 'string'
          ? rangeAriaLabel
          : rangeAriaLabel(props)
        : undefined;

      const ariaLabel = headerAriaLabelFormatString
        ? format(headerAriaLabelFormatString, currentDateRange)
        : currentDateRange;

      return (
        <button
          ref={forwardedRef as React.Ref<HTMLButtonElement>}
          className={classNames.currentItemButton}
          onClick={onHeaderSelect}
          onKeyDown={onHeaderKeyDown}
          aria-label={ariaLabel}
          role="button"
          type="button"
          aria-atomic={true}
          // if this component rerenders when text changes, aria-live will not be announced, so make key consistent
          aria-live="polite"
        >
          {onRenderYear(fromYear)} - {onRenderYear(toYear)}
        </button>
      );
    }

    return (
      <div ref={forwardedRef as React.Ref<HTMLDivElement>} className={classNames.current}>
        {onRenderYear(fromYear)} - {onRenderYear(toYear)}
      </div>
    );
  },
);
CalendarYearTitle.displayName = 'CalendarYearTitle';

const CalendarYearHeader = React.forwardRef(
  (props: ICalendarYearHeaderProps, forwardedRef: React.Ref<HTMLDivElement>) => {
    const { styles, theme, className, animateBackwards, animationDirection, onRenderTitle } = props;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
      hasHeaderClickCallback: !!props.onHeaderSelect,
      animateBackwards: animateBackwards,
      animationDirection: animationDirection,
    });

    return (
      <div className={classNames.headerContainer} ref={forwardedRef}>
        {onRenderTitle?.(props) ?? <CalendarYearTitle {...props} />}
        <CalendarYearNav {...props} />
      </div>
    );
  },
);
CalendarYearHeader.displayName = 'CalendarYearHeader';

function useAnimateBackwards({ selectedYear, navigatedYear }: ICalendarYearProps) {
  const rangeYear = selectedYear || navigatedYear || new Date().getFullYear();
  const fromYear = Math.floor(rangeYear / 10) * 10;

  const previousFromYear = usePrevious(fromYear);

  if (!previousFromYear || previousFromYear === fromYear) {
    return undefined;
  } else if (previousFromYear > fromYear) {
    return true;
  } else {
    return false;
  }
}

const enum NavigationDirection {
  Previous,
  Next,
}

function useYearRangeState({ selectedYear, navigatedYear }: ICalendarYearProps) {
  const [fromYear, navigate] = React.useReducer(
    (state: number, action: NavigationDirection): number => {
      return state + (action === NavigationDirection.Next ? CELL_COUNT : -CELL_COUNT);
    },
    undefined,
    () => {
      const rangeYear = selectedYear || navigatedYear || new Date().getFullYear();
      return Math.floor(rangeYear / 10) * 10;
    },
  );
  const toYear = fromYear + CELL_COUNT - 1;

  const onNavNext = () => navigate(NavigationDirection.Next);
  const onNavPrevious = () => navigate(NavigationDirection.Previous);

  return [fromYear, toYear, onNavNext, onNavPrevious] as const;
}

export const CalendarYearBase = React.forwardRef(
  (props: ICalendarYearProps, forwardedRef: React.Ref<HTMLDivElement>) => {
    const animateBackwards = useAnimateBackwards(props);
    const [fromYear, toYear, onNavNext, onNavPrevious] = useYearRangeState(props);

    const gridRef = React.useRef<ICalendarYearGrid>(null);

    React.useImperativeHandle(props.componentRef, () => ({
      focus() {
        gridRef.current?.focus?.();
      },
    }));

    const { styles, theme, className } = props;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
    });

    return (
      <div className={classNames.root} ref={forwardedRef}>
        <CalendarYearHeader
          {...props}
          fromYear={fromYear}
          toYear={toYear}
          onSelectPrev={onNavPrevious}
          onSelectNext={onNavNext}
          animateBackwards={animateBackwards}
        />
        <CalendarYearGrid
          {...props}
          fromYear={fromYear}
          toYear={toYear}
          animateBackwards={animateBackwards}
          componentRef={gridRef}
        />
      </div>
    );
  },
);
CalendarYearBase.displayName = 'CalendarYearBase';
