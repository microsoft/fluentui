import * as React from 'react';
import {
  ICalendarYearStrings,
  ICalendarYearProps,
  ICalendarYearRange,
  ICalendarYearRangeToString,
  ICalendarYear,
  ICalendarYearHeaderProps,
  ICalendarYearStyleProps,
  ICalendarYearStyles
} from './CalendarYear.types';
import { BaseComponent, KeyCodes, getRTL, classNamesFunction, css } from 'office-ui-fabric-react/lib/Utilities';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { ICalendarIconStrings } from '../Calendar.types';

const getClassNames = classNamesFunction<ICalendarYearStyleProps, ICalendarYearStyles>();

const CELL_COUNT = 12;

const DefaultCalendarYearStrings: ICalendarYearStrings = {
  prevRangeAriaLabel: undefined,
  nextRangeAriaLabel: undefined
};

const DefaultNavigationIcons: ICalendarIconStrings = {
  leftNavigation: 'Up',
  rightNavigation: 'Down',
  closeIcon: 'CalculatorMultiply'
};

export interface ICalendarYearState {
  fromYear: number;
  navigatedYear?: number;
  selectedYear?: number;
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
}

interface ICalendarYearGridCell {
  focus(): void;
}

class CalendarYearGridCell extends React.Component<ICalendarYearGridCellProps, {}> implements ICalendarYearGridCell {
  private _buttonRef: HTMLButtonElement;

  public focus(): void {
    if (this._buttonRef) {
      this._buttonRef.focus();
    }
  }

  public render(): JSX.Element {
    const { styles, theme, className, highlightCurrentYear, highlightSelectedYear, year, selected, disabled, onSelectYear } = this.props;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
      highlightCurrent: highlightCurrentYear,
      highlightSelected: highlightSelectedYear
    });

    return (
      <button
        className={css(classNames.itemButton, {
          [classNames.selected]: selected,
          [classNames.disabled]: disabled
        })}
        type="button"
        role="gridcell"
        onClick={!disabled && onSelectYear ? this._onClick : undefined}
        onKeyDown={!disabled && onSelectYear ? this._onKeyDown : undefined}
        disabled={disabled}
        aria-label={String(year)}
        aria-selected={selected}
        ref={this._onButtonRef}
      >
        {this._onRenderYear()}
      </button>
    );
  }

  private _onRenderYear = () => {
    const { year, onRenderYear } = this.props;
    if (onRenderYear) {
      return onRenderYear(year);
    }
    return year;
  };

  private _onButtonRef = (ref: HTMLButtonElement) => {
    this._buttonRef = ref;
  };

  private _onClick = () => {
    if (this.props.onSelectYear) {
      this.props.onSelectYear(this.props.year);
    }
  };

  private _onKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
    if (this.props.onSelectYear && ev.which === KeyCodes.enter) {
      this.props.onSelectYear(this.props.year);
    }
  };
}

class CalendarYearGrid extends React.Component<ICalendarYearGridProps, {}> implements ICalendarYearGrid {
  private _selectedCellRef: CalendarYearGridCell;
  private _currentCellRef: CalendarYearGridCell;

  public focus(): void {
    if (this._selectedCellRef) {
      this._selectedCellRef.focus();
    } else if (this._currentCellRef) {
      this._currentCellRef.focus();
    }
  }

  public render(): JSX.Element {
    const { styles, theme, className, fromYear, toYear } = this.props;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className
    });

    let year = fromYear;
    const cells = [];

    while (year <= toYear) {
      cells.push(this._renderCell(year));
      year++;
    }

    return (
      <FocusZone>
        <div className={classNames.gridContainer} role="grid">
          <div role="row">{cells}</div>
        </div>
      </FocusZone>
    );
  }

  private _renderCell = (year: number): React.ReactNode => {
    const { theme, minYear, maxYear, onSelectYear, selectedYear } = this.props;
    const selected = year === selectedYear;
    const disabled = (minYear !== undefined && year < minYear) || (maxYear !== undefined && year > maxYear);
    const current = year === new Date().getFullYear();

    return (
      <CalendarYearGridCell
        {...this.props}
        key={year}
        year={year}
        selected={selected}
        current={current}
        disabled={disabled}
        onSelectYear={onSelectYear}
        ref={selected ? this._onSelectedCellRef : current ? this._onCurrentCellRef : undefined}
        theme={theme}
      />
    );
  };

  private _onSelectedCellRef = (ref: CalendarYearGridCell) => {
    this._selectedCellRef = ref;
  };

  private _onCurrentCellRef = (ref: CalendarYearGridCell) => {
    this._currentCellRef = ref;
  };
}

class CalendarYearNavPrev extends React.Component<ICalendarYearHeaderProps, {}> {
  public render(): JSX.Element {
    const { styles, theme, className, navigationIcons, strings, onSelectPrev } = this.props;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className
    });

    const iconStrings = navigationIcons || DefaultNavigationIcons;
    const yearStrings = strings || DefaultCalendarYearStrings;
    const prevRangeAriaLabel = yearStrings.prevRangeAriaLabel || yearStrings.rangeAriaLabel;
    const prevAriaLabel = prevRangeAriaLabel
      ? typeof prevRangeAriaLabel === 'string'
        ? (prevRangeAriaLabel as string)
        : (prevRangeAriaLabel as ICalendarYearRangeToString)(this.props)
      : undefined;
    const disabled = this.isDisabled;

    return (
      <button
        className={css(classNames.navigationButton, {
          [classNames.disabled]: disabled
        })}
        onClick={!disabled && onSelectPrev ? this._onSelectPrev : undefined}
        onKeyDown={!disabled && onSelectPrev ? this._onKeyDown : undefined}
        type="button"
        aria-label={prevAriaLabel}
        disabled={disabled}
      >
        <Icon iconName={getRTL() ? iconStrings.rightNavigation : iconStrings.leftNavigation} />
      </button>
    );
  }

  get isDisabled(): boolean {
    const { minYear } = this.props;
    return minYear !== undefined && this.props.fromYear < minYear;
  }

  private _onSelectPrev = () => {
    if (!this.isDisabled && this.props.onSelectPrev) {
      this.props.onSelectPrev();
    }
  };

  private _onKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
    if (ev.which === KeyCodes.enter) {
      this._onSelectPrev();
    }
  };
}

class CalendarYearNavNext extends React.Component<ICalendarYearHeaderProps, {}> {
  public render(): JSX.Element {
    const { styles, theme, className, navigationIcons, strings, onSelectNext } = this.props;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className
    });

    const iconStrings = navigationIcons || DefaultNavigationIcons;
    const yearStrings = strings || DefaultCalendarYearStrings;
    const nextRangeAriaLabel = yearStrings.nextRangeAriaLabel || yearStrings.rangeAriaLabel;
    const nextAriaLabel = nextRangeAriaLabel
      ? typeof nextRangeAriaLabel === 'string'
        ? (nextRangeAriaLabel as string)
        : (nextRangeAriaLabel as ICalendarYearRangeToString)(this.props)
      : undefined;
    const disabled = this.isDisabled;

    return (
      <button
        className={css(classNames.navigationButton, {
          [classNames.disabled]: disabled
        })}
        onClick={!disabled && onSelectNext ? this._onSelectNext : undefined}
        onKeyDown={!disabled && onSelectNext ? this._onKeyDown : undefined}
        type="button"
        aria-label={nextAriaLabel}
        disabled={this.isDisabled}
      >
        <Icon iconName={getRTL() ? iconStrings.leftNavigation : iconStrings.rightNavigation} />
      </button>
    );
  }

  get isDisabled(): boolean {
    const { maxYear } = this.props;
    return maxYear !== undefined && this.props.fromYear + CELL_COUNT > maxYear;
  }

  private _onSelectNext = () => {
    if (!this.isDisabled && this.props.onSelectNext) {
      this.props.onSelectNext();
    }
  };

  private _onKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
    if (ev.which === KeyCodes.enter) {
      this._onSelectNext();
    }
  };
}

class CalendarYearNav extends React.Component<ICalendarYearHeaderProps, {}> {
  public render(): JSX.Element {
    const { styles, theme, className } = this.props;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className
    });

    return (
      <div className={classNames.navigationButtonsContainer}>
        <CalendarYearNavPrev {...this.props} />
        <CalendarYearNavNext {...this.props} />
      </div>
    );
  }
}

class CalendarYearTitle extends React.Component<ICalendarYearHeaderProps, {}> {
  public render(): JSX.Element {
    const { styles, theme, className, fromYear, toYear, onHeaderSelect, strings } = this.props;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
      hasHeaderClickCallback: !!this.props.onHeaderSelect
    });

    if (onHeaderSelect) {
      const rangeAriaLabel = (strings || DefaultCalendarYearStrings).rangeAriaLabel;
      const ariaLabel = rangeAriaLabel
        ? typeof rangeAriaLabel === 'string'
          ? (rangeAriaLabel as string)
          : (rangeAriaLabel as ICalendarYearRangeToString)(this.props)
        : undefined;

      return (
        <button
          className={classNames.currentItemButton}
          onClick={this._onHeaderSelect}
          onKeyDown={this._onHeaderKeyDown}
          aria-label={ariaLabel}
          role="button"
          type="button"
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

class CalendarYearHeader extends BaseComponent<ICalendarYearHeaderProps, {}> {
  public render(): JSX.Element {
    const { styles, theme, className } = this.props;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className,
      hasHeaderClickCallback: !!this.props.onHeaderSelect
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

export class CalendarYearBase extends BaseComponent<ICalendarYearProps, ICalendarYearState> implements ICalendarYear {
  private _gridRef: CalendarYearGrid;

  constructor(props: ICalendarYearProps) {
    super(props);
    this.state = this._getState(this.props);
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
      className: className
    });

    return (
      <div className={classNames.root}>
        {this._renderHeader()}
        {this._renderGrid()}
      </div>
    );
  }

  private _onNavNext = () => {
    this.setState({ fromYear: this.state.fromYear + CELL_COUNT });
  };

  private _onNavPrev = () => {
    this.setState({ fromYear: this.state.fromYear - CELL_COUNT });
  };

  private _renderHeader = (): React.ReactNode => {
    return (
      <CalendarYearHeader
        {...this.props}
        fromYear={this.state.fromYear}
        toYear={this.state.fromYear + CELL_COUNT - 1}
        onSelectPrev={this._onNavPrev}
        onSelectNext={this._onNavNext}
      />
    );
  };

  private _renderGrid = (): React.ReactNode => {
    return (
      <CalendarYearGrid
        {...this.props}
        fromYear={this.state.fromYear}
        toYear={this.state.fromYear + CELL_COUNT - 1}
        ref={this._onGridRef}
      />
    );
  };

  private _onGridRef = (ref: CalendarYearGrid) => {
    this._gridRef = ref;
  };

  private _getState(props: ICalendarYearProps): ICalendarYearState {
    const { selectedYear, navigatedYear } = props;
    const rangeYear = selectedYear || navigatedYear || new Date().getFullYear();
    const fromYear = Math.floor(rangeYear / 10) * 10;

    return {
      fromYear: fromYear,
      navigatedYear: navigatedYear,
      selectedYear: selectedYear
    };
  }
}
