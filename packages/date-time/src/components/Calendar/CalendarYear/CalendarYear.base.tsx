import * as React from 'react';
import {
  ICalendarYearStrings,
  ICalendarYearProps,
  ICalendarYearRange,
  ICalendarYearRangeToString,
  ICalendarYear,
  ICalendarYearHeaderProps,
  ICalendarYearStyleProps,
  ICalendarYearStyles,
} from './CalendarYear.types';
import {
  KeyCodes,
  getRTL,
  classNamesFunction,
  css,
  format,
  initializeComponentRef,
} from 'office-ui-fabric-react/lib/Utilities';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { ICalendarIconStrings } from '../Calendar.types';
import { useMergedRefs } from '@uifabric/react-hooks';

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

export interface ICalendarYearState {
  fromYear: number;
  previousFromYear?: number;
  navigatedYear?: number;
  selectedYear?: number;
  animateBackwards?: boolean;
  internalNavigate?: boolean;
}

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
    const ariaLabelString = ariaLabel
      ? typeof ariaLabel === 'string'
        ? (ariaLabel as string)
        : (ariaLabel as ICalendarYearRangeToString)(newRange)
      : undefined;
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

class CalendarYearNav extends React.Component<ICalendarYearHeaderProps, {}> {
  public render(): JSX.Element {
    const { styles, theme, className } = this.props;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
    });

    return (
      <div className={classNames.navigationButtonsContainer}>
        <CalendarYearNavArrow {...this.props} direction={CalendarYearNavDirection.Previous} />
        <CalendarYearNavArrow {...this.props} direction={CalendarYearNavDirection.Next} />
      </div>
    );
  }
}

class CalendarYearTitle extends React.Component<ICalendarYearHeaderProps, {}> {
  public render(): JSX.Element {
    const {
      styles,
      theme,
      className,
      fromYear,
      toYear,
      onHeaderSelect,
      strings,
      animateBackwards,
      animationDirection,
    } = this.props;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
      hasHeaderClickCallback: !!this.props.onHeaderSelect,
      animateBackwards: animateBackwards,
      animationDirection: animationDirection,
    });

    if (onHeaderSelect) {
      const rangeAriaLabel = (strings || DefaultCalendarYearStrings).rangeAriaLabel;
      const headerAriaLabelFormatString = strings!.headerAriaLabelFormatString;
      const currentDateRange = rangeAriaLabel
        ? typeof rangeAriaLabel === 'string'
          ? (rangeAriaLabel as string)
          : (rangeAriaLabel as ICalendarYearRangeToString)(this.props)
        : undefined;

      const ariaLabel = headerAriaLabelFormatString
        ? format(headerAriaLabelFormatString, currentDateRange)
        : currentDateRange;

      return (
        <button
          className={classNames.currentItemButton}
          onClick={this._onHeaderSelect}
          onKeyDown={this._onHeaderKeyDown}
          aria-label={ariaLabel}
          role="button"
          type="button"
          aria-atomic={true}
          // if this component rerenders when text changes, aria-live will not be announced, so make key consistent
          aria-live="polite"
        >
          {this._onRenderYear(fromYear)} - {this._onRenderYear(toYear)}
        </button>
      );
    }

    return (
      <div className={classNames.current}>
        {this._onRenderYear(fromYear)} - {this._onRenderYear(toYear)}
      </div>
    );
  }

  private _onHeaderSelect = () => {
    if (this.props.onHeaderSelect) {
      this.props.onHeaderSelect(true);
    }
  };

  private _onHeaderKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
    if (this.props.onHeaderSelect && (ev.which === KeyCodes.enter || ev.which === KeyCodes.space)) {
      this.props.onHeaderSelect(true);
    }
  };

  private _onRenderYear = (year: number) => {
    if (this.props.onRenderYear) {
      return this.props.onRenderYear(year);
    }
    return year;
  };
}

class CalendarYearHeader extends React.Component<ICalendarYearHeaderProps, {}> {
  constructor(props: ICalendarYearHeaderProps) {
    super(props);

    initializeComponentRef(this);
  }

  public render(): JSX.Element {
    const { styles, theme, className, animateBackwards, animationDirection } = this.props;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
      hasHeaderClickCallback: !!this.props.onHeaderSelect,
      animateBackwards: animateBackwards,
      animationDirection: animationDirection,
    });

    return (
      <div className={classNames.headerContainer}>
        {this._onRenderTitle()}
        {this._onRenderNav()}
      </div>
    );
  }

  private _onRenderTitle = () => {
    if (this.props.onRenderTitle) {
      return this.props.onRenderTitle(this.props);
    }
    return <CalendarYearTitle {...this.props} />;
  };

  private _onRenderNav = () => {
    return <CalendarYearNav {...this.props} />;
  };
}

export class CalendarYearBase extends React.Component<ICalendarYearProps, ICalendarYearState> implements ICalendarYear {
  private _gridRef: ICalendarYearGrid;

  public static getDerivedStateFromProps(
    nextProps: Readonly<ICalendarYearProps>,
    prevState: Readonly<ICalendarYearState>,
  ): Partial<ICalendarYearState> | null {
    if (prevState && prevState.internalNavigate) {
      return {
        ...prevState,
        internalNavigate: false,
      };
    }

    const newState = CalendarYearBase._getState(nextProps);

    return {
      ...newState,
      animateBackwards:
        prevState &&
        (prevState.animateBackwards !== undefined
          ? prevState.animateBackwards
          : prevState.fromYear > newState.fromYear),
    };
  }

  private static _getState = (props: ICalendarYearProps) => {
    const { selectedYear, navigatedYear } = props;
    const rangeYear = selectedYear || navigatedYear || new Date().getFullYear();
    const fromYear = Math.floor(rangeYear / 10) * 10;

    return {
      fromYear: fromYear,
      navigatedYear: navigatedYear,
      selectedYear: selectedYear,
    };
  };

  constructor(props: ICalendarYearProps) {
    super(props);

    initializeComponentRef(this);

    this.state = CalendarYearBase._getState(props);
  }

  public focus(): void {
    if (this._gridRef) {
      this._gridRef.focus();
    }
  }

  public render(): JSX.Element {
    const { styles, theme, className } = this.props;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
    });

    return (
      <div className={classNames.root}>
        {this._renderHeader()}
        {this._renderGrid()}
      </div>
    );
  }

  private _onNavNext = () => {
    const previousFromYear = this.state.fromYear;
    const nextFromYear = this.state.fromYear + CELL_COUNT;
    this.setState({
      previousFromYear: previousFromYear,
      fromYear: nextFromYear,
      animateBackwards: this._computeAnimateBackwards(previousFromYear, nextFromYear),
      internalNavigate: true,
    });
  };

  private _onNavPrev = () => {
    const previousFromYear = this.state.fromYear;
    const nextFromYear = this.state.fromYear - CELL_COUNT;
    this.setState({
      previousFromYear: previousFromYear,
      fromYear: nextFromYear,
      animateBackwards: this._computeAnimateBackwards(previousFromYear, nextFromYear),
      internalNavigate: true,
    });
  };

  private _computeAnimateBackwards = (previousYear: number, newYear: number): boolean | undefined => {
    if (!previousYear || !newYear) {
      return undefined;
    }

    if (previousYear < newYear) {
      return false;
    } else if (previousYear > newYear) {
      return true;
    }

    return undefined;
  };

  private _renderHeader = (): React.ReactNode => {
    return (
      <CalendarYearHeader
        {...this.props}
        fromYear={this.state.fromYear}
        toYear={this.state.fromYear + CELL_COUNT - 1}
        onSelectPrev={this._onNavPrev}
        onSelectNext={this._onNavNext}
        animateBackwards={this.state.animateBackwards}
      />
    );
  };

  private _renderGrid = (): React.ReactNode => {
    return (
      <CalendarYearGrid
        {...this.props}
        fromYear={this.state.fromYear}
        toYear={this.state.fromYear + CELL_COUNT - 1}
        animateBackwards={this.state.animateBackwards}
        componentRef={this._onGridRef}
      />
    );
  };

  private _onGridRef = (ref: ICalendarYearGrid) => {
    this._gridRef = ref;
  };
}
