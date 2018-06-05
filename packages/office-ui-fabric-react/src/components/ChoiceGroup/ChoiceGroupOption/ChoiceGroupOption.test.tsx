/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as renderer from 'react-test-renderer';

import { ChoiceGroupOption } from './ChoiceGroupOption';

describe('ChoiceGroupOption', () => {
  it('renders ChoiceGroup correctly', () => {
    const component = renderer.create(
      <div>
        <ChoiceGroupOption key="A" text="Option A" />
        <ChoiceGroupOption key="B" text="Option B" focused />
        <ChoiceGroupOption key="C" text="Option C" focused checked />
        <ChoiceGroupOption key="D" text="Option D" disabled />
        <ChoiceGroupOption key="E" text="Option E" disabled checked />
        <ChoiceGroupOption iconProps={{ iconName: 'Calendar' }} key="F" text="Option F" />
        <ChoiceGroupOption iconProps={{ iconName: 'CalendarWeek' }} key="G" text="Option G" focused />
        <ChoiceGroupOption iconProps={{ iconName: 'CalendarDay' }} key="H" text="Option H" checked />
        <ChoiceGroupOption iconProps={{ iconName: 'CalendarWeek' }} key="I" text="Option I" disabled />
      </div>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
