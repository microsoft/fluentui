import * as React from 'react';
import { WeeklyDayPicker } from './WeeklyDayPicker';
import { resetIds } from '@uifabric/utilities';
import { safeCreate } from '@uifabric/test-utilities';
import { DayOfWeek } from '@fluentui/date-time-utilities';
import { WeeklyDayPickerStrings } from './defaults';
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
    safeCreate(<WeeklyDayPicker strings={WeeklyDayPickerStrings} today={new Date('Jan 1 2019')} />, component => {
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it('renders WeeklyDayPicker with FirstDayOfWeek=Wednesday correctly', () => {
    safeCreate(
      <WeeklyDayPicker
        strings={WeeklyDayPickerStrings}
        firstDayOfWeek={DayOfWeek.Friday}
        today={new Date('Jan 1 2019')}
      />,
      component => {
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      },
    );
  });

  isConformant({
    Component: WeeklyDayPicker,
    displayName: 'WeeklyDayPicker',
  });
});
