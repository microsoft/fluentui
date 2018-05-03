import * as React from "react";
import { YearPicker } from "../YearPicker";

class YearPickerExample extends React.Component<any, any> {
  private _onYearSelect = (year: number) => {
    console.log("-- On Year Select: " + year);
  }
  render() {
    return (
      <div>
        <YearPicker onYearSelect={ this._onYearSelect } minYear={ 1988 } maxYear={ 2052 } />
      </div>
    )
  }
}

export { YearPickerExample }