import { ChoiceGroup } from './index';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class ChoiceGroupVPage extends React.Component<any, any> {
  public render() {
    return <div>
      <div style={ { backgroundColor: 'white' } }>
        <ChoiceGroup label='Choice Group'
          className='ChoiceGroup'
          defaultSelectedKey='bar'
          options={
            [{
              key: 'bar',
              text: 'Bar chart'

            }, {
              key: 'pie',
              text: 'Pie chart'
            }
            ]
          } />
      </div>
      <div style={ { backgroundColor: 'white' } }>
        <ChoiceGroup label='Choice Group Icon'
          className='ChoiceGroupIcon'
          defaultSelectedKey='day'
          options={
            [{
              key: 'day',
              iconProps: { iconName: 'CalendarDay' },
              text: 'Day'

            }, {
              key: 'week',
              iconProps: { iconName: 'CalendarWeek' },
              text: 'Week'
            }]
          } />
      </div>
      <div style={ { backgroundColor: 'white' } }>
        <ChoiceGroup label='Choice Group Disabled'
          className='ChoiceGroupDisabled'
          defaultSelectedKey='bar'
          disabled={ true }
          options={
            [{
              key: 'bar',
              text: 'Bar chart'

            }, {
              key: 'pie',
              text: 'Pie chart'
            }
            ]
          } />
      </div>
    </div>;
  }
}
