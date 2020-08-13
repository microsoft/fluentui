import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { ChoiceGroupOption } from './ChoiceGroupOption';
import { IChoiceGroupOptionProps } from './ChoiceGroupOption.types';

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
      </div>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('custom renders correctly', () => {
    const component = renderer.create(
      <div>
        <ChoiceGroupOption
          key="A"
          text="Option A"
          onRenderLabel={(option: IChoiceGroupOptionProps): JSX.Element => {
            return <span>{option.text}</span>;
          }}
        />
        <ChoiceGroupOption
          key="B"
          text="Option B"
          onRenderLabel={(
            option: IChoiceGroupOptionProps,
            defaultRender: (props?: IChoiceGroupOptionProps) => JSX.Element,
          ): JSX.Element => {
            return defaultRender(option);
          }}
        />
        <ChoiceGroupOption
          key="C"
          text="Option C"
          onRenderLabel={(
            option: IChoiceGroupOptionProps,
            defaultRender: (props?: IChoiceGroupOptionProps) => JSX.Element,
          ): JSX.Element => {
            return <div className="customWrapper">{defaultRender(option)}</div>;
          }}
        />
      </div>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
