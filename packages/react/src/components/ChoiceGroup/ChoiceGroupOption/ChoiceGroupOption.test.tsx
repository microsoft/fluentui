import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { ChoiceGroupOption } from './ChoiceGroupOption';

describe('ChoiceGroupOption', () => {
  it('renders ChoiceGroup correctly', () => {
    const component = renderer.create(
      <div>
        <ChoiceGroupOption itemKey="A" text="Option A" />
        <ChoiceGroupOption itemKey="B" text="Option B" focused />
        <ChoiceGroupOption itemKey="C" text="Option C" focused checked />
        <ChoiceGroupOption itemKey="D" text="Option D" disabled />
        <ChoiceGroupOption itemKey="E" text="Option E" disabled checked />
        <ChoiceGroupOption iconProps={{ iconName: 'Calendar' }} itemKey="F" text="Option F" />
        <ChoiceGroupOption iconProps={{ iconName: 'CalendarWeek' }} itemKey="G" text="Option G" focused />
        <ChoiceGroupOption iconProps={{ iconName: 'CalendarDay' }} itemKey="H" text="Option H" checked />
        <ChoiceGroupOption iconProps={{ iconName: 'CalendarWeek' }} itemKey="I" text="Option I" disabled />
      </div>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('custom renders correctly', () => {
    const component = renderer.create(
      <div>
        <ChoiceGroupOption
          itemKey="A"
          text="Option A"
          onRenderLabel={option => {
            return <span>{option?.text}</span>;
          }}
        />
        <ChoiceGroupOption itemKey="B" text="Option B" />
        <ChoiceGroupOption
          itemKey="C"
          text="Option C"
          onRenderLabel={(option, defaultRender) => {
            return <div className="customWrapper">{defaultRender!(option!)}</div>;
          }}
        />
      </div>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
