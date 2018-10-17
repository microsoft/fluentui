import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';

// tslint:disable-next-line:no-any
const style = require('./FluentStyles.Example.scss') as any;

export class FluentStylesChoiceGroupExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div className="docs-ButtonExample">
        <div className={style.sidebyside}>
          <ChoiceGroup
            defaultSelectedKey="B"
            options={[
              {
                key: 'A',
                text: 'Rest',
                'data-automation-id': 'auto1'
              } as IChoiceGroupOption,
              {
                key: 'B',
                text: 'Selected'
              }
            ]}
            label="Active"
            required={true}
          />
          <br />
          <ChoiceGroup
            label="Active"
            defaultSelectedKey="week"
            options={[
              {
                key: 'day',
                iconProps: { iconName: 'CalendarDay' },
                text: 'Day'
              },
              {
                key: 'week',
                iconProps: { iconName: 'CalendarWeek' },
                text: 'Week'
              },
              {
                key: 'month',
                iconProps: { iconName: 'Calendar' },
                text: 'Month'
              }
            ]}
          />
        </div>
        <div className={style.sidebyside}>
          <ChoiceGroup
            defaultSelectedKey="D"
            options={[
              {
                key: 'C',
                text: 'Disabled',
                disabled: true
              },
              {
                key: 'D',
                text: 'Disabled Selected',
                disabled: true
              }
            ]}
            label="Disabled"
          />
          <br />
          <ChoiceGroup
            label="Disabled"
            defaultSelectedKey="week"
            options={[
              {
                key: 'day',
                iconProps: { iconName: 'CalendarDay' },
                text: 'Day',
                disabled: true
              },
              {
                key: 'week',
                iconProps: { iconName: 'CalendarWeek' },
                text: 'Week',
                disabled: true
              },
              {
                key: 'month',
                iconProps: { iconName: 'Calendar' },
                text: 'Month',
                disabled: true
              }
            ]}
          />
        </div>
      </div>
    );
  }
}
