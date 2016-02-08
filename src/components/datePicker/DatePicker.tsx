import * as React from 'react';

export interface IDatePickerProps {
}

export default class DatePicker extends React.Component<IDatePickerProps, any> {
  render() {
    let rootClass = 'ms-DatePicker';

    return (
      <div className={ rootClass }>
      </div>
    );
  }
}