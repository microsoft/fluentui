import * as React from 'react';
import {
  BaseComponent,
  css,
  getRTL,
  createRef
} from '../../Utilities';
import { FocusZone } from '../../FocusZone';
import { Icon } from '../../Icon';
import { ICalendarIconStrings } from "./Calendar.types";
import * as stylesImport from './Calendar.scss';
const styles: any = stylesImport;

const cellCount = 12;

const DefaultIconStrings: ICalendarIconStrings = {
  leftNavigation: "Up",
  rightNavigation: "Down"
};

interface IYearRangeStringFunc {
  (from: number, to: number): string;
}

interface ICalendarYearStrings {
  prevRangeAriaLabel?: string | IYearRangeStringFunc
  nextRangeAriaLabel?: string | IYearRangeStringFunc
}

const DefaultCalendarYearStrings: ICalendarYearStrings = {
  prevRangeAriaLabel: "Previous Year Range",
  nextRangeAriaLabel: "Next Year Range"
};

interface ICalendarYear {
  focus(): void;
}

interface ICalendarYearProps {
  componentRef?: (c: ICalendarYear) => void;
  navigationIcons?: ICalendarIconStrings;
  selectedYear?: number;
  minYear?: number;
  maxYear?: number;
  onSelectYear?: (year: number) => void;
  className?: string;
  strings?: ICalendarYearStrings;
  onHeaderSelect?: (focus: boolean) => void;
}

interface ICalendarYearState {
  fromYear: number;
  selectedYear?: number;
}

interface ICalendarYearGridCellProps {
  year: number;
  current?: boolean;
  selected?: boolean;
  disabled?: boolean;
  onYearSelect?: (year: number) => void;
}

interface ICalendarYearGridCell {
  focus(): void;
}

class CalendarYearGridCell extends React.Component<ICalendarYearGridCellProps, any> implements ICalendarYearGridCell {
  private _buttonRef = createRef<HTMLButtonElement>();
  private _onClick = () => {
    if (this.props.onYearSelect) {
      this.props.onYearSelect(this.props.year);
    }
  }
  render() {
    const { year, current, selected, disabled, onYearSelect } = this.props;
    return (
      <button
        className={ css('ms-DatePicker-yearOption', styles.yearOption, {
          ['ms-DatePicker-year--current ' + styles.yearIsCurrentYear]: current,
          ['ms-DatePicker-day--highlighted ' + styles.yearIsHighlighted]: selected,
          ['ms-DatePicker-yearOption--disabled ' + styles.yearOptionIsDisabled]: disabled
        }) }
        type="button"
        role="gridcell"
        onClick={ onYearSelect ? this._onClick : undefined }
        disabled={ disabled }
        ref={ this._buttonRef }>
        { year }
      </ button>
    )
  }
  focus() {
    if (this._buttonRef && this._buttonRef.current) {
      this._buttonRef.current.focus();
    }
  }
}

class CalendarYear extends BaseComponent<ICalendarYearProps, ICalendarYearState> implements ICalendarYear {
  private _strings: ICalendarYearStrings;
  private _iconStrings: ICalendarIconStrings;
  private _selectedCell = createRef<ICalendarYearGridCell>();
  constructor(props: ICalendarYearProps) {
    super(props);
    this.state = this._getState(this.props);
  }
  private _getState(props: ICalendarYearProps) {
    const navigationYear = props.selectedYear !== undefined ? props.selectedYear : new Date().getFullYear();
    const fromYear = Math.floor(navigationYear / 10) * 10;
    return {
      fromYear: fromYear,
      selectedYear: props.selectedYear
    };
  }
  componentWillReceiveProps(nextProps: ICalendarYearProps) {
    this.setState(this._getState(nextProps));
  }
  private _onClickPrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ fromYear: this.state.fromYear - cellCount });
  }
  private _onClickNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ fromYear: this.state.fromYear + cellCount });
  }
  private _renderNavPrev(): React.ReactNode {
    const prevRangeAriaLabel = this._strings.prevRangeAriaLabel;
    const prevAriaLabel = typeof (prevRangeAriaLabel) === "string" ? prevRangeAriaLabel as string : (prevRangeAriaLabel as IYearRangeStringFunc)(0, 0);
    const { minYear } = this.props;
    const disabled = minYear !== undefined && this.state.fromYear < minYear;
    return (
      <button className={ css('ms-DatePicker-prevDecade', styles.prevDecade, {
        ['ms-DatePicker-prevDecade--disabled ' + styles.prevDecadeIsDisabled]: disabled
      }) }
        onClick={ this._onClickPrev }
        type="button"
        tabIndex={ 0 }
        aria-label={ prevAriaLabel }
        disabled={ disabled }
      >
        <Icon iconName={ getRTL() ? this._iconStrings.rightNavigation : this._iconStrings.leftNavigation } />
      </ button>
    );
  }
  private _renderNavNext(): React.ReactNode {
    const nextRangeAriaLabel = this._strings.nextRangeAriaLabel;
    const nextAriaLabel = typeof (nextRangeAriaLabel) === "string" ? nextRangeAriaLabel as string : (nextRangeAriaLabel as IYearRangeStringFunc)(0, 0);
    const { maxYear } = this.props;
    const disabled = maxYear !== undefined && this.state.fromYear + cellCount > maxYear;
    return (
      <button className={ css('ms-DatePicker-nextDecade', styles.nextDecade, {
        ['ms-DatePicker-nextDecade--disabled ' + styles.nextDecadeIsDisabled]: disabled
      }) }
        onClick={ this._onClickNext }
        type="button"
        tabIndex={ 0 }
        aria-label={ nextAriaLabel }
        disabled={ disabled }
      >
        <Icon iconName={ getRTL() ? this._iconStrings.leftNavigation : this._iconStrings.rightNavigation } />
      </ button>
    );
  }
  private _renderNavContainer(): React.ReactNode {
    return (
      <div className={ css('ms-DatePicker-decadeComponents', styles.decadeComponents) }>
        <div className={ css('ms-DatePicker-navContainer', styles.navContainer) }>
          { this._renderNavPrev() }
          { this._renderNavNext() }
        </div>
      </div>
    );
  }
  private _onHeaderSelect = () => {
    if (this.props.onHeaderSelect) {
      this.props.onHeaderSelect(true);
    }
  }
  private _renderTitle(): React.ReactNode {
    const content = `${this.state.fromYear} - ${this.state.fromYear + cellCount - 1}`;
    if (this.props.onHeaderSelect) {
      return (
        <div className={ css('ms-DatePicker-currentDecade js-showYearPicker', styles.currentDecade, styles.headerToggleView, { selectable: true }) }
          onClick={ this._onHeaderSelect }
          aria-label={ content }
          role="button"
          tabIndex={ 0 }
        >
          { content }
        </div>
      );
    }
    return (
      <div className={ css('ms-DatePicker-currentDecade', styles.currentDecade) }>
        { content }
      </div>
    )
  }
  private _renderHeader(): React.ReactNode {
    return (
      <div className={ css('ms-DatePicker-header', styles.header) }>
        { this._renderTitle() }
        { this._renderNavContainer() }
      </div>
    );
  }
  private _onYearSelect = (year: number) => {
    this.setState({ selectedYear: year });
    if (this.props.onSelectYear) {
      this.props.onSelectYear(year);
    }
  }
  private _renderYearCell(year: number): React.ReactNode {
    const selected = year === this.state.selectedYear;
    const { minYear, maxYear } = this.props;
    const disabled = (minYear !== undefined && year < minYear) || (maxYear !== undefined && year > maxYear);
    return (
      <CalendarYearGridCell
        key={ year }
        year={ year }
        selected={ selected }
        current={ year === new Date().getFullYear() }
        disabled={ disabled }
        onYearSelect={ this._onYearSelect }
        ref={ selected ? this._selectedCell : undefined } />
    );
  }
  private _renderGrid(): React.ReactNode {
    const { fromYear } = this.state;
    const toYear = fromYear + cellCount - 1;
    let year = fromYear;
    const cells = [];
    while (year <= toYear) {
      cells.push(this._renderYearCell(year));
      year++;
    }
    return (
      <div className={ css('ms-DatePicker-optionGrid', styles.optionGrid) } role='grid'>
        { cells }
      </div>
    );
  }
  render() {
    const { navigationIcons, strings } = this.props;
    this._strings = strings || DefaultCalendarYearStrings;
    this._iconStrings = navigationIcons || DefaultIconStrings;

    return (
      <div className={ css('ms-DatePicker-yearPicker', styles.yearPicker) }>
        { this._renderHeader() }
        <FocusZone>
          { this._renderGrid() }
        </FocusZone>
      </ div>
    );
  }
  focus() {
    if (this._selectedCell && this._selectedCell.current) {
      this._selectedCell.current.focus();
    }
  }
}

export {
  ICalendarYearStrings,
  IYearRangeStringFunc,
  ICalendarYear,
  ICalendarYearProps,
  ICalendarYearState,
  CalendarYear
}