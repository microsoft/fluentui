import * as React from 'react';
import TextField from '../textField/TextField';

import './DatePicker.scss';

class DatePickerDay extends React.Component<any, any> {
    render() {
        return (
            <div className="ms-DatePicker-dayPicker">
            <div className="ms-DatePicker-header">
                <div className="ms-DatePicker-month">February</div>
                    <div className="ms-DatePicker-year">2016</div>
                    <div className="picker__nav--prev" data-nav="-1" role="button" aria-components="P141847190_table"
                    title="Previous month"> </div>
                    <div className="picker__nav--next" data-nav="1" role="button" aria-components="P141847190_table"
                    title="Next month"> </div>
                </div>
                <table className="ms-DatePicker-table" id="P141847190_table" role="grid" aria-components="P141847190"
                aria-readonly="true">
                    <thead>
                        <tr>
                            <th className="ms-DatePicker-weekday" scope="col" title="Sunday">S</th>
                            <th className="ms-DatePicker-weekday" scope="col" title="Monday">M</th>
                            <th className="ms-DatePicker-weekday" scope="col" title="Tuesday">T</th>
                            <th className="ms-DatePicker-weekday" scope="col" title="Wednesday">W</th>
                            <th className="ms-DatePicker-weekday" scope="col" title="Thursday">T</th>
                            <th className="ms-DatePicker-weekday" scope="col" title="Friday">F</th>
                            <th className="ms-DatePicker-weekday" scope="col" title="Saturday">S</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--outfocus" data-pick="1454198400000"
                                role="gridcell">31</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1454284800000" role="gridcell">1</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1454371200000" role="gridcell">2</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1454457600000" role="gridcell">3</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1454544000000" role="gridcell">4</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1454630400000" role="gridcell">5</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1454716800000" role="gridcell">6</div>
                            </td>
                        </tr>
                        <tr>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1454803200000" role="gridcell">7</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1454889600000" role="gridcell">8</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus ms-DatePicker-day--today ms-DatePicker-day--highlighted"
                                data-pick="1454976000000" role="gridcell" aria-activedescendant="true">9</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1455062400000" role="gridcell">10</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1455148800000" role="gridcell">11</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1455235200000" role="gridcell">12</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1455321600000" role="gridcell">13</div>
                            </td>
                        </tr>
                        <tr>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1455408000000" role="gridcell">14</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1455494400000" role="gridcell">15</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1455580800000" role="gridcell">16</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1455667200000" role="gridcell">17</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1455753600000" role="gridcell">18</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1455840000000" role="gridcell">19</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1455926400000" role="gridcell">20</div>
                            </td>
                        </tr>
                        <tr>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1456012800000" role="gridcell">21</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1456099200000" role="gridcell">22</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1456185600000" role="gridcell">23</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1456272000000" role="gridcell">24</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1456358400000" role="gridcell">25</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1456444800000" role="gridcell">26</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1456531200000" role="gridcell">27</div>
                            </td>
                        </tr>
                        <tr>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1456617600000" role="gridcell">28</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--infocus" data-pick="1456704000000" role="gridcell">29</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--outfocus" data-pick="1456790400000"
                                role="gridcell">1</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--outfocus" data-pick="1456876800000"
                                role="gridcell">2</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--outfocus" data-pick="1456963200000"
                                role="gridcell">3</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--outfocus" data-pick="1457049600000"
                                role="gridcell">4</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--outfocus" data-pick="1457136000000"
                                role="gridcell">5</div>
                            </td>
                        </tr>
                        <tr>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--outfocus" data-pick="1457222400000"
                                role="gridcell">6</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--outfocus" data-pick="1457308800000"
                                role="gridcell">7</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--outfocus" data-pick="1457395200000"
                                role="gridcell">8</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--outfocus" data-pick="1457481600000"
                                role="gridcell">9</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--outfocus" data-pick="1457568000000"
                                role="gridcell">10</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--outfocus" data-pick="1457654400000"
                                role="gridcell">11</div>
                            </td>
                            <td role="presentation">
                                <div className="ms-DatePicker-day ms-DatePicker-day--outfocus" data-pick="1457740800000"
                                role="gridcell">12</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

class DatePickerMonth extends React.Component<any, any> {
    render() {
        return (
            <div className="ms-DatePicker-monthPicker">
                <div className="ms-DatePicker-header">
                    <div className="ms-DatePicker-yearComponents">
                        <span className="ms-DatePicker-nextYear js-nextYear"><i className="ms-Icon ms-Icon--chevronRight"></i></span>
                        <span className="ms-DatePicker-prevYear js-prevYear"><i className="ms-Icon ms-Icon--chevronLeft"></i></span>
                    </div>
                    <div className="ms-DatePicker-currentYear js-showYearPicker"></div>
                </div>
                <div className="ms-DatePicker-optionGrid">
                        <span className="ms-DatePicker-monthOption js-changeDate" data-month="0">Jan</span>
                        <span className="ms-DatePicker-monthOption js-changeDate" data-month="1">Feb</span>
                        <span className="ms-DatePicker-monthOption js-changeDate" data-month="2">Mar</span>
                        <span className="ms-DatePicker-monthOption js-changeDate" data-month="3">Apr</span>
                        <span className="ms-DatePicker-monthOption js-changeDate" data-month="4">May</span>
                        <span className="ms-DatePicker-monthOption js-changeDate" data-month="5">Jun</span>
                        <span className="ms-DatePicker-monthOption js-changeDate" data-month="6">Jul</span>
                        <span className="ms-DatePicker-monthOption js-changeDate" data-month="7">Aug</span>
                        <span className="ms-DatePicker-monthOption js-changeDate" data-month="8">Sep</span>
                        <span className="ms-DatePicker-monthOption js-changeDate" data-month="9">Oct</span>
                        <span className="ms-DatePicker-monthOption js-changeDate" data-month="10">Nov</span>
                        <span className="ms-DatePicker-monthOption js-changeDate" data-month="11">Dec</span>
                </div>
            </div>
        );
    }
}

class DatePickerMonthComponents extends React.Component<any, any> {
    render() {
        return (
            <div className="ms-DatePicker-monthComponents">
                <span className="ms-DatePicker-nextMonth js-nextMonth"><i className="ms-Icon ms-Icon--chevronRight"></i></span>
                <span className="ms-DatePicker-prevMonth js-prevMonth"><i className="ms-Icon ms-Icon--chevronLeft"></i></span>
                <div className="ms-DatePicker-headerToggleView js-showMonthPicker"></div>
            </div>
        );
    }
}

class DatePickerYear extends React.Component<any, any> {
    render() {
        return (
            <div className="ms-DatePicker-yearPicker">
                <div className="ms-DatePicker-decadeComponents">
                <span className="ms-DatePicker-nextDecade js-nextDecade"><i className="ms-Icon ms-Icon--chevronRight"></i></span>
                <span className="ms-DatePicker-prevDecade js-prevDecade"><i className="ms-Icon ms-Icon--chevronLeft"></i></span>
                </div>
            </div>
        );
    }
}

export interface IDatePickerProps {
    onSelectDate?: () => void;
}

export default class DatePicker extends React.Component<IDatePickerProps, any> {
  render() {
    let rootClass = 'ms-DatePicker';

    return (
        <div className={ rootClass }>
            <TextField label="Start date" iconClass="ms-DatePicker-event ms-Icon ms-Icon--event">        
                <div className="ms-DatePicker-picker ms-DatePicker-picker--focused ms-DatePicker-picker--opened" id="P1479034051_root" aria-hidden="false">
                    <div className="ms-DatePicker-frame">
                        <div className="ms-DatePicker-wrap">
                            <DatePickerDay onSelectDate={this.props.onSelectDate}></DatePickerDay>
                            <span className="ms-DatePicker-goToday js-goToday">Go to today</span>
                            <DatePickerMonthComponents></DatePickerMonthComponents>
                            <DatePickerMonth></DatePickerMonth>
                            <DatePickerYear></DatePickerYear>
                        </div>
                    </div>
                </div>
            </TextField>           
        </div>
    );
  }
}