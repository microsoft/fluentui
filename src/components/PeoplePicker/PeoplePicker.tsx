import * as React from 'react';

export interface IPeoplePickerProps {
}

export default class PeoplePicker extends React.Component<IPeoplePickerProps, any> {
  render() {
    let rootClass = 'ms-PeoplePicker';

    return (
      <div className={ rootClass }>
      </div>
    );
  }
}