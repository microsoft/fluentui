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
}

const DefaultCalendarYearStrings: ICalendarYearStrings = {
  prevRangeAriaLabel: undefined,
  nextRangeAriaLabel: undefined
};

const DefaultNavigationIcons: ICalendarIconStrings = {
  leftNavigation: 'Up',
  rightNavigation: 'Down',
  closeIcon: 'CalculatorMultiply'
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

class CalendarYearGridCell extends React.Component<ICalendarYearGridCellProps, {}> implements ICalendarYearGridCell {
  private _buttonRef = React.createRef<HTMLButtonElement>();

  public focus() {
    if (this._buttonRef.current) {
      this._buttonRef.current.focus();
    }
  }

  public render() {
    const { year, selected, disabled, onSelectYear } = this.props;
    return (
      <button
        className={css('ms-DatePicker-yearOption', styles.yearOption, {
          ['ms-DatePicker-day--highlighted ' + styles.yearIsHighlighted]: selected,
          ['ms-DatePicker-yearOption--disabled ' + styles.yearOptionIsDisabled]: disabled
        })}
        type="button"
        role="gridcell"
        onClick={!disabled && onSelectYear ? this._onClick : undefined}
        onKeyDown={!disabled && onSelectYear ? this._onKeyDown : undefined}
        disabled={disabled}
        aria-label={String(year)}
        aria-selected={selected}
        ref={this._buttonRef}
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

interface ICalendarYearGrid {
  focus(): void;
}

interface ICalendarYearGridProps extends ICalendarYearProps, ICalendarYearRange {
  selectedYear?: number;
}

class CalendarYearGrid extends React.Component<ICalendarYearGridProps, {}> implements ICalendarYearGrid {
  private _selectedCellRef = React.createRef<CalendarYearGridCell>();
  private _currentCellRef = React.createRef<CalendarYearGridCell>();

  public focus() {
    if (this._selectedCellRef.current) {
      this._selectedCellRef.current.focus();
    } else if (this._currentCellRef.current) {
      this._currentCellRef.current.focus();
    }
  }

  public render() {
    const { fromYear, toYear } = this.props;
    let year = fromYear;
    const cells = [];
    while (year <= toYear) {
      cells.push(this._renderCell(year));
      year++;
    }
    return (
      <FocusZone>
        <div className={css('ms-DatePicker-optionGrid', styles.optionGrid)} role="grid">
          <div role="row">{cells}</div>
        </div>
      </FocusZone>
    );
  }

  private _renderCell = (year: number): React.ReactNode => {
    const selected = year === this.props.selectedYear;
    const { minYear, maxYear, onSelectYear } = this.props;
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
        ref={selected ? this._selectedCellRef : current ? this._currentCellRef : undefined}
      />
    );
  };
}

export interface ICalendarYearHeaderProps extends ICalendarYearProps, ICalendarYearRange {
  onSelectPrev?: () => void;
  onSelectNext?: () => void;
}

class CalendarYearNavPrev extends React.Component<ICalendarYearHeaderProps, any> {
  public render() {
    const iconStrings = this.props.navigationIcons || DefaultNavigationIcons;
    const strings = this.props.strings || DefaultCalendarYearStrings;
    const prevRangeAriaLabel = strings.prevRangeAriaLabel || strings.rangeAriaLabel;
    const prevAriaLabel = prevRangeAriaLabel
      ? typeof prevRangeAriaLabel === 'string'
        ? (prevRangeAriaLabel as string)
        : (prevRangeAriaLabel as ICalendarYearRangeToString)(this.props)
      : undefined;
    const disabled = this.isDisabled;
    const { onSelectPrev } = this.props;
    return (
      <button
        className={css('ms-DatePicker-prevDecade', styles.prevDecade, {
          ['ms-DatePicker-prevDecade--disabled ' + styles.prevDecadeIsDisabled]: disabled
        })}
        onClick={!disabled && onSelectPrev ? this._onSelectPrev : undefined}
        onKeyDown={!disabled && onSelectPrev ? this._onKeyDown : undefined}
        type="button"
        tabIndex={0}
        aria-label={prevAriaLabel}
        disabled={disabled}
      >
        <Icon iconName={getRTL() ? iconStrings.rightNavigation : iconStrings.leftNavigation} />
      </button>
    );
  }

  get isDisabled() {
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

class CalendarYearNavNext extends React.Component<ICalendarYearHeaderProps, any> {
  public render() {
    const iconStrings = this.props.navigationIcons || DefaultNavigationIcons;
    const strings = this.props.strings || DefaultCalendarYearStrings;
    const nextRangeAriaLabel = strings.nextRangeAriaLabel || strings.rangeAriaLabel;
    const nextAriaLabel = nextRangeAriaLabel
      ? typeof nextRangeAriaLabel === 'string'
        ? (nextRangeAriaLabel as string)
        : (nextRangeAriaLabel as ICalendarYearRangeToString)(this.props)
      : undefined;
    const { onSelectNext } = this.props;
    const disabled = this.isDisabled;
    return (
      <button
        className={css('ms-DatePicker-nextDecade', styles.nextDecade, {
          ['ms-DatePicker-nextDecade--disabled ' + styles.nextDecadeIsDisabled]: disabled
        })}
        onClick={!disabled && onSelectNext ? this._onSelectNext : undefined}
        onKeyDown={!disabled && onSelectNext ? this._onKeyDown : undefined}
        type="button"
        tabIndex={0}
        aria-label={nextAriaLabel}
        disabled={this.isDisabled}
      >
        <Icon iconName={getRTL() ? iconStrings.leftNavigation : iconStrings.rightNavigation} />
      </button>
    );
  }

  get isDisabled() {
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

class CalendarYearNav extends React.Component<ICalendarYearHeaderProps, any> {
  public render() {
    return (
      <div className={css('ms-DatePicker-decadeComponents', styles.decadeComponents)}>
        <div className={css('ms-DatePicker-navContainer', styles.navContainer)}>
          <CalendarYearNavPrev {...this.props} />
          <CalendarYearNavNext {...this.props} />
        </div>
      </div>
    );
  }
}

class CalendarYearTitle extends React.Component<ICalendarYearHeaderProps, any> {
  public render() {
    const { fromYear, toYear, onHeaderSelect } = this.props;
    if (onHeaderSelect) {
      const strings = this.props.strings || DefaultCalendarYearStrings;
      const rangeAriaLabel = strings.rangeAriaLabel;
      const ariaLabel = rangeAriaLabel
        ? typeof rangeAriaLabel === 'string'
          ? (rangeAriaLabel as string)
          : (rangeAriaLabel as ICalendarYearRangeToString)(this.props)
        : undefined;
      return (
        <div
          className={css('ms-DatePicker-currentDecade js-showYearPicker', styles.currentDecade, styles.headerToggleView)}
          onClick={this._onHeaderSelect}
          onKeyDown={this._onHeaderKeyDown}
          aria-label={ariaLabel}
          role="button"
          tabIndex={0}
        >
          {this._onRenderYear(fromYear)} - {this._onRenderYear(toYear)}
        </div>
      );
    }
    return (
      <div className={css('ms-DatePicker-currentDecade js-showYearPicker', styles.currentDecade)}>
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

class CalendarYearHeader extends React.Component<ICalendarYearHeaderProps, any> {
  public render() {
    return (
      <div className={css('ms-DatePicker-header', styles.header)}>
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

export interface ICalendarYearState {
  fromYear: number;
  navigatedYear?: number;
  selectedYear?: number;
}

export class CalendarYear extends React.Component<ICalendarYearProps, ICalendarYearState> implements ICalendarYear {
  private _gridRef = React.createRef<CalendarYearGrid>();

  public constructor(props: ICalendarYearProps) {
    super(props);
    this.state = this._calculateInitialStateFromProps(props);
  }

  public focus() {
    if (this._gridRef.current) {
      this._gridRef.current.focus();
    }
  }

  public render() {
    return (
      <div className={css('ms-DatePicker-yearPicker', styles.yearPicker)}>
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
      <CalendarYearGrid {...this.props} fromYear={this.state.fromYear} toYear={this.state.fromYear + CELL_COUNT - 1} ref={this._gridRef} />
    );
  };

  private _calculateInitialStateFromProps(props: ICalendarYearProps): ICalendarYearState {
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
