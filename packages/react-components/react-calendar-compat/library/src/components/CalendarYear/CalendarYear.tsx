import * as React from 'react';
import { Enter, Space } from '@fluentui/keyboard-keys';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { mergeClasses } from '@griffel/react';
import { useCalendarYearStyles_unstable } from './useCalendarYearStyles.styles';
import type {
  CalendarYearStrings,
  CalendarYearProps,
  CalendarYearRange,
  CalendarYearHeaderProps,
} from './CalendarYear.types';

const CELL_COUNT = 12;
const CELLS_PER_ROW = 4;

const DefaultCalendarYearStrings: CalendarYearStrings = {
  prevRangeAriaLabel: undefined,
  nextRangeAriaLabel: undefined,
};
interface CalendarYearGrid {
  focus(): void;
}

interface CalendarYearGridCellProps extends CalendarYearProps {
  year: number;
  current?: boolean;
  selected?: boolean;
  disabled?: boolean;
  onSelectYear?: (year: number) => void;
  onRenderYear?: (year: number) => React.ReactNode;
}

interface CalendarYearGridProps extends CalendarYearProps, CalendarYearRange {
  selectedYear?: number;
  animateBackwards?: boolean;
  componentRef?: React.RefObject<CalendarYearGridCell>;
}

interface CalendarYearGridCell {
  focus(): void;
}

const CalendarYearGridCell: React.FunctionComponent<CalendarYearGridCellProps> = props => {
  const {
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
    if (ev.key === Enter) {
      onSelectYear?.(year);
    }
  };

  const classNames = useCalendarYearStyles_unstable({
    className,
    highlightCurrent: highlightCurrentYear,
    highlightSelected: highlightSelectedYear,
  });

  return (
    <button
      className={mergeClasses(classNames.itemButton, selected && classNames.selected, disabled && classNames.disabled)}
      type="button"
      role="gridcell"
      onClick={!disabled ? onClick : undefined}
      onKeyDown={!disabled ? onKeyDown : undefined}
      disabled={disabled}
      aria-selected={selected}
      ref={buttonRef}
    >
      {onRenderYear?.(year) ?? year}
    </button>
  );
};
CalendarYearGridCell.displayName = 'CalendarYearGridCell';

const CalendarYearGrid: React.FunctionComponent<CalendarYearGridProps> = props => {
  const {
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

  const selectedCellRef = React.useRef<CalendarYearGridCell>(null);
  const currentCellRef = React.useRef<CalendarYearGridCell>(null);

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
      />
    );
  };

  const classNames = useCalendarYearStyles_unstable({
    className,
    animateBackwards,
    animationDirection,
  });

  const onRenderYear = (value: number) => {
    return props.onRenderYear?.(value) ?? value;
  };

  const gridAriaLabel = `${onRenderYear(fromYear)} - ${onRenderYear(toYear)}`;

  let year = fromYear;
  const cells: React.ReactNode[][] = [];

  for (let i = 0; i < (toYear - fromYear + 1) / CELLS_PER_ROW; i++) {
    cells.push([]);
    for (let j = 0; j < CELLS_PER_ROW; j++) {
      cells[i].push(renderCell(year));
      year++;
    }
  }

  const arrowNavigationAttributes = useArrowNavigationGroup({ axis: 'grid' });

  return (
    <div {...arrowNavigationAttributes} className={classNames.gridContainer} role="grid" aria-label={gridAriaLabel}>
      {cells.map((cellRow: React.ReactNode[], index: number) => {
        return (
          <div key={'yearPickerRow_' + index + '_' + fromYear} role="row" className={classNames.buttonRow}>
            {cellRow}
          </div>
        );
      })}
    </div>
  );
};
CalendarYearGrid.displayName = 'CalendarYearGrid';

const CalendarYearNavDirection = {
  Previous: 0 as const,
  Next: 1 as const,
};

interface CalendarYearNavArrowProps extends CalendarYearHeaderProps {
  direction: (typeof CalendarYearNavDirection)[keyof typeof CalendarYearNavDirection];
}

const CalendarYearNavArrow: React.FunctionComponent<CalendarYearNavArrowProps> = props => {
  const {
    className,
    strings = DefaultCalendarYearStrings,
    direction,
    onSelectPrev,
    onSelectNext,
    fromYear,
    toYear,
    maxYear,
    minYear,
    navigationIcons,
  } = props;

  const classNames = useCalendarYearStyles_unstable({
    className,
  });

  const ariaLabel =
    direction === CalendarYearNavDirection.Previous ? strings.prevRangeAriaLabel : strings.nextRangeAriaLabel;
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
    if (ev.key === Enter) {
      onNavigate();
    }
  };

  return (
    <button
      className={mergeClasses(classNames.navigationButton, disabled && classNames.disabled)}
      onClick={!disabled ? onNavigate : undefined}
      onKeyDown={!disabled ? onKeyDown : undefined}
      type="button"
      title={ariaLabelString}
      disabled={disabled}
    >
      {direction === CalendarYearNavDirection.Previous ? navigationIcons.upNavigation : navigationIcons.downNavigation}
    </button>
  );
};
CalendarYearNavArrow.displayName = 'CalendarYearNavArrow';

const CalendarYearNav: React.FunctionComponent<CalendarYearHeaderProps> = props => {
  const { className } = props;

  const classNames = useCalendarYearStyles_unstable({
    className,
  });

  return (
    <div className={classNames.navigationButtonsContainer}>
      <CalendarYearNavArrow {...props} direction={CalendarYearNavDirection.Previous} />
      <CalendarYearNavArrow {...props} direction={CalendarYearNavDirection.Next} />
    </div>
  );
};
CalendarYearNav.displayName = 'CalendarYearNav';

const CalendarYearTitle: React.FunctionComponent<CalendarYearHeaderProps> = props => {
  const {
    className,
    fromYear,
    toYear,
    strings = DefaultCalendarYearStrings,
    animateBackwards,
    animationDirection,
  } = props;

  const onHeaderSelect = () => {
    props.onHeaderSelect?.(true);
  };

  const onHeaderKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
    if (ev.key === Enter || ev.key === Space) {
      onHeaderSelect();
    }
  };

  const onRenderYear = (year: number) => {
    return props.onRenderYear?.(year) ?? year;
  };

  const classNames = useCalendarYearStyles_unstable({
    className,
    hasHeaderClickCallback: !!props.onHeaderSelect,
    animateBackwards,
    animationDirection,
  });

  if (props.onHeaderSelect) {
    const rangeAriaLabel = strings.rangeAriaLabel;
    const headerAriaLabelFormatString = strings.headerAriaLabelFormatString;
    const currentDateRange = rangeAriaLabel
      ? typeof rangeAriaLabel === 'string'
        ? rangeAriaLabel
        : rangeAriaLabel(props)
      : undefined;

    const ariaLabel = headerAriaLabelFormatString
      ? headerAriaLabelFormatString.replace('{0}', currentDateRange ?? '')
      : currentDateRange;

    return (
      <button
        className={classNames.currentItemButton}
        onClick={onHeaderSelect}
        onKeyDown={onHeaderKeyDown}
        aria-label={ariaLabel}
        role="button"
        type="button"
      >
        <span aria-live="assertive" aria-atomic="true">
          {onRenderYear(fromYear)} - {onRenderYear(toYear)}
        </span>
      </button>
    );
  }

  return (
    <div className={classNames.current}>
      {onRenderYear(fromYear)} - {onRenderYear(toYear)}
    </div>
  );
};
CalendarYearTitle.displayName = 'CalendarYearTitle';

const CalendarYearHeader: React.FunctionComponent<CalendarYearHeaderProps> = props => {
  const { className, animateBackwards, animationDirection, onRenderTitle } = props;

  const classNames = useCalendarYearStyles_unstable({
    className,
    hasHeaderClickCallback: !!props.onHeaderSelect,
    animateBackwards,
    animationDirection,
  });

  return (
    <div className={classNames.headerContainer}>
      {onRenderTitle?.(props) ?? <CalendarYearTitle {...props} />}
      <CalendarYearNav {...props} />
    </div>
  );
};
CalendarYearHeader.displayName = 'CalendarYearHeader';

function useAnimateBackwards({ selectedYear, navigatedYear }: CalendarYearProps) {
  const rangeYear = selectedYear || navigatedYear || new Date().getFullYear();
  const fromYear = Math.floor(rangeYear / 10) * 10;

  const previousFromYearRef = React.useRef<number | undefined>(fromYear);
  React.useRef(() => {
    previousFromYearRef.current = fromYear;
  });
  const previousFromYear = previousFromYearRef.current;

  if (!previousFromYear || previousFromYear === fromYear) {
    return undefined;
  } else if (previousFromYear > fromYear) {
    return true;
  } else {
    return false;
  }
}

function useYearRangeState({ selectedYear, navigatedYear }: CalendarYearProps) {
  const rangeYear = React.useMemo(() => {
    return selectedYear || navigatedYear || Math.floor(new Date().getFullYear() / 10) * 10;
  }, [navigatedYear, selectedYear]);

  const [fromYear, setFromYear] = React.useState<number>(rangeYear);

  const onNavNext = () => {
    setFromYear(year => year + CELL_COUNT);
  };

  const onNavPrevious = () => {
    setFromYear(year => year - CELL_COUNT);
  };

  React.useEffect(() => {
    setFromYear(rangeYear);
  }, [rangeYear]);

  const toYear = fromYear + CELL_COUNT - 1;

  return [fromYear, toYear, onNavNext, onNavPrevious] as const;
}

/**
 * @internal
 */
export const CalendarYear: React.FunctionComponent<CalendarYearProps> = props => {
  const animateBackwards = useAnimateBackwards(props);
  const [fromYear, toYear, onNavNext, onNavPrevious] = useYearRangeState(props);

  const gridRef = React.useRef<CalendarYearGrid>(null);

  React.useImperativeHandle(props.componentRef, () => ({
    focus() {
      gridRef.current?.focus?.();
    },
  }));

  const { className } = props;

  const classNames = useCalendarYearStyles_unstable({
    className,
  });

  return (
    <div className={classNames.root}>
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
};
CalendarYear.displayName = 'CalendarYear';
