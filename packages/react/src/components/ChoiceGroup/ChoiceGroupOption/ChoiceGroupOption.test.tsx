import * as React from 'react';
import { render } from '@testing-library/react';

import { ChoiceGroupOption } from './ChoiceGroupOption';

describe('ChoiceGroupOption', () => {
  it('renders ChoiceGroup correctly', () => {
    const { container } = render(
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
    expect(container.firstChild).toMatchSnapshot();
  });
  it('custom renders correctly', () => {
    const { container } = render(
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
    expect(container.firstChild).toMatchSnapshot();
  });
});
