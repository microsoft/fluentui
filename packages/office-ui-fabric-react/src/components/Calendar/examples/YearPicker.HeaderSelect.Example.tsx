import * as React from "react";
import { YearPicker } from "../YearPicker";

class YearPickerHeaderSelectExample extends React.Component<any, any> {
  private _onYearSelect = (year: number) => {
    console.log("-- On Year Select: " + year);
  }
  private _onHeaderSelect = (focus: boolean) => {
    console.log("-- On Header Select: " + focus);
  }
  render() {
    return (
      <div>
        <YearPicker onYearSelect={ this._onYearSelect } onHeaderSelect={ this._onHeaderSelect } />
      </div>
    )
  }
}

export { YearPickerHeaderSelectExample }