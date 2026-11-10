import * as React from 'react';
import { WeeklyDayPicker } from './WeeklyDayPicker';
import { resetIds } from '@fluentui/utilities';
import { render } from '@testing-library/react';
import { DayOfWeek } from '@fluentui/date-time-utilities';
import { defaultWeeklyDayPickerStrings } from './defaults';
import { isConformant } from '../../common/isConformant';

describe('WeeklyDayPicker', () => {
  beforeEach(() => {
    resetIds();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useFakeTimers();
  });

  it('renders default WeeklyDayPicker correctly', () => {
    const { container } = render(
      <WeeklyDayPicker strings={defaultWeeklyDayPickerStrings} today={new Date('Jan 1 2019')} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders WeeklyDayPicker with FirstDayOfWeek=Wednesday correctly', () => {
    const { container } = render(
      <WeeklyDayPicker
        strings={defaultWeeklyDayPickerStrings}
        firstDayOfWeek={DayOfWeek.Friday}
        today={new Date('Jan 1 2019')}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  isConformant({
    Component: WeeklyDayPicker,
    displayName: 'WeeklyDayPicker',
    // Problem: Doesn’t handle ref.
    // Solution: Add a ref to the root element.
    disabledTests: ['component-handles-ref', 'component-has-root-ref'],
  });
});
