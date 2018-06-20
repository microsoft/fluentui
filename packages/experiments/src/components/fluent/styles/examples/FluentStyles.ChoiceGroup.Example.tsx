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
                text: 'Option A',
                'data-automation-id': 'auto1'
              } as IChoiceGroupOption,
              {
                key: 'B',
                text: 'Option B'
              },
              {
                key: 'C',
                text: 'Option C',
                disabled: true
              },
              {
                key: 'D',
                text: 'Option D',
                disabled: true
              }
            ]}
            label="Pick one"
            required={true}
          />
        </div>
        <div className={style.sidebyside}>
          <ChoiceGroup
            label="Pick one icon"
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
