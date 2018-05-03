import * as React from 'react';
import {
  BaseComponent,
  css,
  getRTL
} from '../../Utilities';
import { FocusZone } from '../../FocusZone';
import { Icon } from '../../Icon';
import { ICalendarIconStrings } from "./Calendar.types";
import { IYearPickerStyles, getStyles } from './YearPicker.styles';
import { IYearPickerClassNames, getClassNames } from "./YearPicker.classNames";
import { ITheme } from "../../Styling";

const cellCount = 12;

const DefaultIconStrings: ICalendarIconStrings = {
  leftNavigation: "Up",
  rightNavigation: "Down"
};

interface IYearRangeStringFunc {
  (from: number, to: number): string;
}

interface IYearPickerStrings {
  prevRangeAriaLabel?: string | IYearRangeStringFunc
  nextRangeAriaLabel?: string | IYearRangeStringFunc
}

const DefaultYearPickerStrings: IYearPickerStrings = {
  prevRangeAriaLabel: "Previous Year Range",
  nextRangeAriaLabel: "Next Year Range"
};

interface IYearPicker {
  focus(): void;
}

interface IYearPickerProps {
  componentRef?: (c: IYearPicker) => void;
  navigationIcons?: ICalendarIconStrings;
  selectedYear?: number;
  minYear?: number;
  maxYear?: number;
  onYearSelect?: (year: number) => void;
  styles?: IYearPickerStyles;
  className?: string;
  theme?: ITheme;
  strings?: IYearPickerStrings;
  onHeaderSelect?: (focus: boolean) => void;
}

interface IYearPickerState {
  fromYear: number;
  selectedYear?: number;
}

interface IYearPickerGridCellProps {
  year: number;
  current?: boolean;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  onYearSelect?: (year: number) => void;
}

interface IYearPickerGridCell {
  focus(): void;
}

class YearPickerGridCell extends React.Component<IYearPickerGridCellProps, any> implements IYearPickerGridCell {
  private _ref: HTMLButtonElement;
  private _onRef = (ref: HTMLButtonElement) => {
    this._ref = ref;
  }
  private _onClick = () => {
    if (this.props.onYearSelect) {
      this.props.onYearSelect(this.props.year);
    }
  }
  render() {
    const { year, current, selected, disabled, className, onYearSelect } = this.props;
    return (
      <button type="button"
        role="gridcell"
        className={ css(className, { current: current ? true : false, selected: selected ? true : false, disabled: disabled ? true : false }) }
        onClick={ onYearSelect ? this._onClick : undefined }
        disabled={ disabled }
        ref={ this._onRef }>
        { year }
      </ button>
    )
  }
  focus() {
    if (this._ref) {
      this._ref.focus();
    }
  }
}

class YearPicker extends BaseComponent<IYearPickerProps, IYearPickerState> implements IYearPicker {
  private _classNames: IYearPickerClassNames;
  private _strings: IYearPickerStrings;
  private _iconStrings: ICalendarIconStrings;
  private _selectedCellRef: IYearPickerGridCell;
  constructor(props: IYearPickerProps) {
    super(props);
    this.state = this._getState(this.props);
  }
  private _getState(props: IYearPickerProps) {
    const navigationYear = props.selectedYear !== undefined ? props.selectedYear : new Date().getFullYear();
    const fromYear = Math.floor(navigationYear / 10) * 10;
    return {
      fromYear: fromYear,
      selectedYear: props.selectedYear
    };
  }
  componentWillReceiveProps(nextProps: IYearPickerProps) {
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
      <button className={ css(this._classNames.navPrev, { disabled: disabled }) }
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
      <button className={ css(this._classNames.navNext, { disabled: disabled }) }
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
      <div className={ this._classNames.navContainer }>
        { this._renderNavPrev() }
        { this._renderNavNext() }
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
        <button className={ css(this._classNames.title, { selectable: true }) }
          onClick={ this._onHeaderSelect }
          aria-label={ content }
          type="button"
          tabIndex={ 0 }
        >
          { content }
        </button>
      );
    }
    return (
      <div className={ this._classNames.title }>
        { content }
      </div>
    )
  }
  private _renderHeader(): React.ReactNode {
    return (
      <div className={ this._classNames.header }>
        { this._renderTitle() }
        { this._renderNavContainer() }
      </div>
    );
  }
  private _onYearSelect = (year: number) => {
    if (year !== this.state.selectedYear) {
      this.setState({ selectedYear: year });
      if (this.props.onYearSelect) {
        this.props.onYearSelect(year);
      }
    }
  }
  private _onYearGridCellRef = (ref: YearPickerGridCell) => {
    this._selectedCellRef = ref as IYearPickerGridCell;
  }
  private _renderYearCell(year: number): React.ReactNode {
    const selected = year === this.state.selectedYear;
    const { minYear, maxYear } = this.props;
    const disabled = (minYear !== undefined && year < minYear) || (maxYear !== undefined && year > maxYear);
    return (
      <YearPickerGridCell
        key={ year }
        year={ year }
        selected={ selected }
        current={ year === new Date().getFullYear() }
        disabled={ disabled }
        className={ this._classNames.optionGridCell }
        onYearSelect={ this._onYearSelect }
        ref={ selected ? this._onYearGridCellRef : undefined } />
    );
  }
  private _renderBody(): React.ReactNode {
    const { fromYear } = this.state;
    const toYear = fromYear + cellCount - 1;
    let year = fromYear;
    const cells = [];
    while (year <= toYear) {
      cells.push(this._renderYearCell(year));
      year++;
    }
    return (
      <FocusZone>
        <div className={ this._classNames.optionGrid } role="grid">
          { cells }
        </div>
      </FocusZone>
    );
  }
  render() {
    const { navigationIcons, strings, styles, theme } = this.props;
    this._classNames = getClassNames(getStyles(theme!, styles));
    this._strings = strings || DefaultYearPickerStrings;
    this._iconStrings = navigationIcons || DefaultIconStrings;

    return (
      <div className={ this._classNames.root }>
        <div className={ this._classNames.header }>
          { this._renderHeader() }
        </div>
        <div className={ this._classNames.body }>
          { this._renderBody() }
        </div>
      </ div>
    );
  }
  focus() {
    if (this._selectedCellRef) {
      this._selectedCellRef.focus();
    }
  }
}

export {
  IYearPickerStrings,
  IYearRangeStringFunc,
  IYearPicker,
  IYearPickerProps,
  IYearPickerState,
  YearPicker
}