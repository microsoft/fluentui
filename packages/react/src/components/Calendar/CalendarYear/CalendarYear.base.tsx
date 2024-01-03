import * as React from 'react';
import { KeyCodes, getRTL, classNamesFunction, css, format } from '../../../Utilities';
import { FocusZone } from '../../../FocusZone';
import { Icon } from '../../../Icon';
import { usePrevious } from '@fluentui/react-hooks';
import { defaultCalendarNavigationIcons } from '../defaults';
import type {
  ICalendarYearStrings,
  ICalendarYearProps,
  ICalendarYearRange,
  ICalendarYearHeaderProps,
  ICalendarYearStyleProps,
  ICalendarYearStyles,
} from './CalendarYear.types';
import type { IRefObject } from '../../../Utilities';

const getClassNames = classNamesFunction<ICalendarYearStyleProps, ICalendarYearStyles>();

const CELL_COUNT = 12;
const CELLS_PER_ROW = 4;

const DefaultCalendarYearStrings: ICalendarYearStrings = {
  prevRangeAriaLabel: undefined,
  nextRangeAriaLabel: undefined,
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

const CalendarYearGridCell: React.FunctionComponent<ICalendarYearGridCellProps> = props => {
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
    // eslint-disable-next-line deprecation/deprecation
    if (ev.which === KeyCodes.enter) {
      onSelectYear?.(year);
    }
  };

  const classNames = getClassNames(styles, {
    theme: theme!,
    className,
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
      aria-selected={selected}
      ref={buttonRef}
    >
      {onRenderYear?.(year) ?? year}
    </button>
  );
};
CalendarYearGridCell.displayName = 'CalendarYearGridCell';

const CalendarYearGrid: React.FunctionComponent<ICalendarYearGridProps> = props => {
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
        theme={theme}
      />
    );
  };

  const classNames = getClassNames(styles, {
    theme: theme!,
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

  return (
    <FocusZone>
      <div className={classNames.gridContainer} role="grid" aria-label={gridAriaLabel}>
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
};
CalendarYearGrid.displayName = 'CalendarYearGrid';

const enum CalendarYearNavDirection {
  Previous,
  Next,
}

interface ICalendarYearNavArrowProps extends ICalendarYearHeaderProps {
  direction: CalendarYearNavDirection;
}

const CalendarYearNavArrow: React.FunctionComponent<ICalendarYearNavArrowProps> = props => {
  const {
    styles,
    theme,
    className,
    navigationIcons = defaultCalendarNavigationIcons,
    strings = DefaultCalendarYearStrings,
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
    // eslint-disable-next-line deprecation/deprecation
    if (ev.which === KeyCodes.enter) {
      onNavigate();
    }
  };

  // can be condensed, but leaving verbose for clarity due to regressions
  const isLeftNavigation = getRTL()
    ? direction === CalendarYearNavDirection.Next
    : direction === CalendarYearNavDirection.Previous;

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
    >
      <Icon iconName={isLeftNavigation ? navigationIcons.leftNavigation : navigationIcons.rightNavigation} />
    </button>
  );
};
CalendarYearNavArrow.displayName = 'CalendarYearNavArrow';

const CalendarYearNav: React.FunctionComponent<ICalendarYearHeaderProps> = props => {
  const { styles, theme, className } = props;

  const classNames = getClassNames(styles, {
    theme: theme!,
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

const CalendarYearTitle: React.FunctionComponent<ICalendarYearHeaderProps> = props => {
  const {
    styles,
    theme,
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
    // eslint-disable-next-line deprecation/deprecation
    if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
      onHeaderSelect();
    }
  };

  const onRenderYear = (year: number) => {
    return props.onRenderYear?.(year) ?? year;
  };

  const classNames = getClassNames(styles, {
    theme: theme!,
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
      ? format(headerAriaLabelFormatString, currentDateRange)
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

const CalendarYearHeader: React.FunctionComponent<ICalendarYearHeaderProps> = props => {
  const { styles, theme, className, animateBackwards, animationDirection, onRenderTitle } = props;

  const classNames = getClassNames(styles, {
    theme: theme!,
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

function useYearRangeState({ selectedYear, navigatedYear }: ICalendarYearProps) {
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

export const CalendarYearBase: React.FunctionComponent<ICalendarYearProps> = props => {
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
CalendarYearBase.displayName = 'CalendarYearBase';
