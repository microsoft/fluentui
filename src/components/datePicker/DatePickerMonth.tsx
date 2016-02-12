import * as React from 'react';

export default class DatePickerMonth extends React.Component<any, any> {
  render() {
    return (
      <div className="ms-DatePicker-monthPicker">
        <div className="ms-DatePicker-header">
          <div className="ms-DatePicker-yearComponents">
            <span className="ms-DatePicker-nextYear js-nextYear" onClick={() => this.props.onSelectNextYear() }><i className="ms-Icon ms-Icon--chevronRight"></i></span>
            <span className="ms-DatePicker-prevYear js-prevYear" onClick={() => this.props.onSelectPrevYear() }><i className="ms-Icon ms-Icon--chevronLeft"></i></span>
          </div>
          <div className="ms-DatePicker-currentYear js-showYearPicker">{this.props.selectedDate.getFullYear() }</div>
        </div>
        <div className="ms-DatePicker-optionGrid">
          {this.props.strings.shortMonths.map((month, index) => {
            return (<span className="ms-DatePicker-monthOption" key={index} onClick={() => this.props.onSelectMonth(index) }>{month}</span>);
          }) }
        </div>
      </div>
    );
  }
}
