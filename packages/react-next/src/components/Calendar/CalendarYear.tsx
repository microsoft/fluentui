import * as React from 'react';
import { KeyCodes, css, getRTL } from '../../Utilities';
import { ICalendarIconStrings } from './Calendar.types';
import { FocusZone } from '../../FocusZone';
import * as stylesImport from './Calendar.scss';
import { Icon } from '../../Icon';

const styles: any = stylesImport;

const CELL_COUNT = 12;

export interface ICalendarYearRange {
  fromYear: number;
  toYear: number;
}

export interface ICalendarYearRangeToString {
  (range: ICalendarYearRange): string;
}

export interface ICalendarYearStrings {
  rangeAriaLabel?: string | ICalendarYearRangeToString;
  prevRangeAriaLabel?: string | ICalendarYearRangeToString;
  nextRangeAriaLabel?: string | ICalendarYearRangeToString;
}

export interface ICalendarYear {
  focus(): void;
}

export interface ICalendarYearProps {
  navigationIcons?: ICalendarIconStrings;
  navigatedYear?: number;
  selectedYear?: number;
  minYear?: number;
  maxYear?: number;
  onHeaderSelect?: (focus: boolean) => void;
  onSelectYear?: (year: number) => void;
  onRenderTitle?: (props: ICalendarYearHeaderProps) => React.ReactNode;
  onRenderYear?: (year: number) => React.ReactNode;
  className?: string;
  strings?: ICalendarYearStrings;
  componentRef?: React.Ref<ICalendarYear>;
}

const DefaultCalendarYearStrings: ICalendarYearStrings = {
  prevRangeAriaLabel: undefined,
  nextRangeAriaLabel: undefined,
};

const DefaultNavigationIcons: ICalendarIconStrings = {
  leftNavigation: 'Up',
  rightNavigation: 'Down',
  closeIcon: 'CalculatorMultiply',
};

interface ICalendarYearGridCell {
  focus(): void;
}

interface ICalendarYearGridCellProps {
  year: number;
  current?: boolean;
  selected?: boolean;
  disabled?: boolean;
  onSelectYear?: (year: number) => void;
  onRenderYear?: (year: number) => React.ReactNode;
}

const CalendarYearGridCell = React.memo(
  React.forwardRef((props: ICalendarYearGridCellProps, forwardedRef: React.Ref<ICalendarYearGridCell>) => {
    const _buttonRef = React.useRef<HTMLButtonElement>(null);

    const focus = React.useCallback(() => {
      _buttonRef.current?.focus?.();
    }, []);

    React.useImperativeHandle(forwardedRef, () => ({ focus }), [focus]);

    const { year, selected, disabled, onSelectYear, onRenderYear } = props;

    const _onClick = React.useCallback(() => {
      onSelectYear?.(year);
    }, [onSelectYear, year]);

    const _onKeyDown = React.useCallback(
      (ev: React.KeyboardEvent<HTMLElement>) => {
        if (ev.which === KeyCodes.enter) {
          onSelectYear?.(year);
        }
      },
      [onSelectYear, year],
    );

    return (
      <button
        className={css('ms-DatePicker-yearOption', styles.yearOption, {
          ['ms-DatePicker-day--highlighted ' + styles.yearIsHighlighted]: selected,
          ['ms-DatePicker-yearOption--disabled ' + styles.yearOptionIsDisabled]: disabled,
        })}
        type="button"
        role="gridcell"
        onClick={!disabled && onSelectYear ? _onClick : undefined}
        onKeyDown={!disabled && onSelectYear ? _onKeyDown : undefined}
        disabled={disabled}
        aria-label={String(year)}
        aria-selected={selected}
        ref={_buttonRef}
      >
        {onRenderYear ? onRenderYear(year) : year}
      </button>
    );
  }),
);

interface ICalendarYearGrid {
  focus(): void;
}

interface ICalendarYearGridProps extends ICalendarYearProps, ICalendarYearRange {
  selectedYear?: number;
}

const CalendarYearGrid = React.memo(
  React.forwardRef((props: ICalendarYearGridProps, forwardedRef: React.Ref<ICalendarYearGrid>) => {
    const _selectedCellRef = React.useRef<ICalendarYearGridCell>(null);
    const _currentCellRef = React.useRef<ICalendarYearGridCell>(null);

    const focus = React.useCallback(() => {
      if (_selectedCellRef.current) {
        _selectedCellRef.current.focus();
      } else if (_currentCellRef.current) {
        _currentCellRef.current.focus();
      }
    }, []);

    React.useImperativeHandle(forwardedRef, () => ({ focus }), [focus]);

    const { fromYear, toYear, selectedYear, minYear, maxYear, onSelectYear } = props;

    const _renderCell = (year: number): React.ReactNode => {
      const selected = year === selectedYear;
      const disabled = (minYear !== undefined && year < minYear) || (maxYear !== undefined && year > maxYear);
      const current = year === new Date().getFullYear();
      return (
        <CalendarYearGridCell
          key={year}
          year={year}
          selected={selected}
          current={current}
          disabled={disabled}
          onSelectYear={onSelectYear}
          ref={selected ? _selectedCellRef : current ? _currentCellRef : undefined}
        />
      );
    };

    let currentlyRenderedYear = fromYear;
    const cells = [];
    while (currentlyRenderedYear <= toYear) {
      cells.push(_renderCell(currentlyRenderedYear));
      currentlyRenderedYear++;
    }
    return (
      <FocusZone>
        <div className={css('ms-DatePicker-optionGrid', styles.optionGrid)} role="grid">
          <div role="row">{cells}</div>
        </div>
      </FocusZone>
    );
  }),
);

export interface ICalendarYearHeaderProps extends ICalendarYearProps, ICalendarYearRange {
  onSelectPrev?: () => void;
  onSelectNext?: () => void;
}

const CalendarYearNavDir = React.memo(
  ({
    minYear,
    maxYear,
    fromYear,
    toYear,
    navigationIcons,
    strings,
    onSelectPrev,
    onSelectNext,
    dir,
  }: ICalendarYearHeaderProps & { dir: 'prev' | 'next' }) => {
    const isPrev = dir === 'prev';
    const isDisabled = isPrev
      ? minYear !== undefined && fromYear < minYear
      : maxYear !== undefined && fromYear + CELL_COUNT > maxYear;

    const _onSelect = React.useCallback(() => {
      if (!isDisabled) {
        isPrev ? onSelectPrev?.() : onSelectNext?.();
      }
    }, [isDisabled, onSelectPrev, onSelectNext, dir]);

    const _onKeyDown = React.useCallback(
      (ev: React.KeyboardEvent<HTMLElement>) => {
        if (ev.which === KeyCodes.enter) {
          _onSelect();
        }
      },
      [_onSelect],
    );

    const iconStrings = navigationIcons || DefaultNavigationIcons;
    const rangeAriaLabel = (strings || DefaultCalendarYearStrings)[
      isPrev ? 'prevRangeAriaLabel' : 'nextRangeAriaLabel'
    ];
    const rangeOffset = isPrev ? -CELL_COUNT : CELL_COUNT;
    const range = { fromYear: fromYear + rangeOffset, toYear: toYear + rangeOffset };
    const ariaLabel = rangeAriaLabel
      ? typeof rangeAriaLabel === 'string'
        ? (rangeAriaLabel as string)
        : (rangeAriaLabel as ICalendarYearRangeToString)(range)
      : undefined;
    return (
      <button
        className={css('ms-DatePicker-prevDecade', styles.prevDecade, {
          ['ms-DatePicker-prevDecade--disabled ' + styles.prevDecadeIsDisabled]: isDisabled,
        })}
        onClick={!isDisabled && onSelectPrev ? _onSelect : undefined}
        onKeyDown={!isDisabled && onSelectPrev ? _onKeyDown : undefined}
        type="button"
        tabIndex={0}
        title={ariaLabel}
        disabled={isDisabled}
      >
        <Icon iconName={getRTL() ? iconStrings.rightNavigation : iconStrings.leftNavigation} />
      </button>
    );
  },
);

const CalendarYearNav = React.memo((props: ICalendarYearHeaderProps) => {
  return (
    <div className={css('ms-DatePicker-decadeComponents', styles.decadeComponents)}>
      <div className={css('ms-DatePicker-navContainer', styles.navContainer)}>
        <CalendarYearNavDir {...props} dir="prev" />
        <CalendarYearNavDir {...props} dir="next" />
      </div>
    </div>
  );
});

const CalendarYearTitle = React.memo((props: ICalendarYearHeaderProps) => {
  const { fromYear, toYear, onHeaderSelect, onRenderYear } = props;

  const _onRenderYear = (year: number) => onRenderYear?.(year) ?? year;

  const _onHeaderSelect = () => {
    onHeaderSelect?.(true);
  };

  const _onHeaderKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
    if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
      _onHeaderSelect();
    }
  };

  if (onHeaderSelect) {
    const strings = props.strings || DefaultCalendarYearStrings;
    const rangeAriaLabel = strings.rangeAriaLabel;
    const ariaLabel = rangeAriaLabel
      ? typeof rangeAriaLabel === 'string'
        ? (rangeAriaLabel as string)
        : (rangeAriaLabel as ICalendarYearRangeToString)(props)
      : undefined;
    return (
      <div
        className={css('ms-DatePicker-currentDecade js-showYearPicker', styles.currentDecade, styles.headerToggleView)}
        onClick={_onHeaderSelect}
        onKeyDown={_onHeaderKeyDown}
        aria-label={ariaLabel}
        role="button"
        aria-atomic={true}
        aria-live="polite"
        tabIndex={0}
      >
        {_onRenderYear(fromYear)} - {_onRenderYear(toYear)}
      </div>
    );
  }
  return (
    <div className={css('ms-DatePicker-currentDecade js-showYearPicker', styles.currentDecade)}>
      {_onRenderYear(fromYear)} - {_onRenderYear(toYear)}
    </div>
  );
});

const CalendarYearHeader = React.memo((props: ICalendarYearHeaderProps) => {
  const { onRenderTitle } = props;
  return (
    <div className={css('ms-DatePicker-header', styles.header)}>
      {onRenderTitle?.(props) ?? <CalendarYearTitle {...props} />}
      <CalendarYearNav {...props} />
    </div>
  );
});

export interface ICalendarYearState {
  fromYear: number;
  navigatedYear?: number;
  selectedYear?: number;
}

export const CalendarYear = React.memo(
  React.forwardRef((props: ICalendarYearProps, forwardedRef: React.Ref<HTMLDivElement>) => {
    const _gridRef = React.useRef<ICalendarYearGrid>(null);
    const [fromYear, offsetFromYear] = React.useReducer(
      (state: number, offset: number) => state + offset,
      undefined,
      () => Math.floor((props.selectedYear || props.navigatedYear || new Date().getFullYear()) / 10) * 10,
    );

    const focus = React.useCallback(() => {
      _gridRef.current?.focus?.();
    }, []);

    React.useImperativeHandle(props.componentRef, () => ({ focus }), [focus]);

    const _onNavNext = React.useCallback(() => {
      offsetFromYear(CELL_COUNT);
    }, []);

    const _onNavPrev = React.useCallback(() => {
      offsetFromYear(-CELL_COUNT);
    }, []);

    return (
      <div className={css('ms-DatePicker-yearPicker', styles.yearPicker)}>
        <CalendarYearHeader
          {...props}
          fromYear={fromYear}
          toYear={fromYear + CELL_COUNT - 1}
          onSelectPrev={_onNavPrev}
          onSelectNext={_onNavNext}
        />
        <CalendarYearGrid {...props} fromYear={fromYear} toYear={fromYear + CELL_COUNT - 1} ref={_gridRef} />
      </div>
    );
  }),
);
