import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { makeStyles } from '@griffel/react';
import { teamsLightTheme, tokens } from '@fluentui/react-theme';
import { FluentProvider } from '@fluentui/react-provider';
import { DatePicker as DatePickerCompat } from '@fluentui/react-datepicker-compat';
import { DateRangeType, DayOfWeek } from '@fluentui/react-calendar-compat';
import type { DatePickerProps as CompatProps } from '@fluentui/react-datepicker-compat';
import { DatePicker } from '@fluentui/react-datepicker-preview';
import type { DatePickerProps } from '@fluentui/react-datepicker-preview';
import type { JSXElement } from '@fluentui/react-utilities';
import { DARK_MODE, HIGH_CONTRAST, RTL, getStoryVariant, TestWrapperDecorator } from '../../utilities';

const today = new Date(2030, 0, 15);
const useStyles = makeStyles({
  pair: { display: 'flex', flexWrap: 'wrap', gap: tokens.spacingHorizontalXXXL },
  example: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: tokens.spacingVerticalM },
});

export default {
  title: 'DatePicker Preview',
  component: DatePicker,
  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: { steps: new Steps().snapshot('rest', { cropTo: '.testWrapper' }).end() },
  } satisfies StoryParameters,
} satisfies Meta<typeof DatePicker>;

const Pair = ({ preview = {}, compat = {} }: { preview?: DatePickerProps; compat?: CompatProps }): JSXElement => {
  const styles = useStyles();
  const [compatSize, setCompatSize] = React.useState({ width: 0, height: 0 });
  const [previewSize, setPreviewSize] = React.useState({ width: 0, height: 0 });
  const measureCompat = React.useCallback((node: HTMLDivElement | null) => {
    const surface = node?.querySelector('[role="dialog"]');
    if (surface) {
      const { width, height } = surface.getBoundingClientRect();
      setCompatSize({ width, height });
    }
  }, []);
  const measurePreview = React.useCallback((node: HTMLDivElement | null) => {
    const surface = node?.querySelector('[role="dialog"]');
    if (surface) {
      const { width, height } = surface.getBoundingClientRect();
      setPreviewSize({ width, height });
    }
  }, []);
  return (
    <div className={styles.pair}>
      <div
        ref={measureCompat}
        data-testid="compat"
        className={styles.example}
        style={{ minWidth: compatSize.width, paddingBottom: compatSize.height }}
      >
        <span>Compat reference</span>
        <DatePickerCompat today={today} value={today} inlinePopup {...compat} />
      </div>
      <div
        ref={measurePreview}
        data-testid="preview"
        className={styles.example}
        style={{ minWidth: previewSize.width, paddingBottom: previewSize.height }}
      >
        <span>Preview</span>
        <DatePicker today={today} value={today} inlinePopup {...preview} />
      </div>
    </div>
  );
};

export const Default = (): JSXElement => <Pair preview={{ value: null }} compat={{ value: null }} />;
export const Selected = (): JSXElement => <Pair />;
export const Open = (): JSXElement => <Pair preview={{ open: true }} compat={{ open: true }} />;
export const Editable = (): JSXElement => <Pair preview={{ allowTextInput: true }} compat={{ allowTextInput: true }} />;
export const Disabled = (): JSXElement => <Pair preview={{ disabled: true }} compat={{ disabled: true }} />;
export const Invalid = (): JSXElement => <Pair preview={{ 'aria-invalid': true }} compat={{ 'aria-invalid': true }} />;
export const Underline = (): JSXElement => <Pair preview={{ appearance: 'underline' }} compat={{ underlined: true }} />;
export const FilledLighter = (): JSXElement => (
  <Pair preview={{ appearance: 'filled-lighter' }} compat={{ borderless: true }} />
);
export const Small = (): JSXElement => <Pair preview={{ size: 'small' }} compat={{ size: 'small' }} />;
export const Large = (): JSXElement => <Pair preview={{ size: 'large' }} compat={{ size: 'large' }} />;
export const SideBySide = (): JSXElement => (
  <Pair preview={{ open: true, calendar: { layout: 'sideBySide' } }} compat={{ open: true }} />
);
export const MonthOnly = (): JSXElement => (
  <Pair
    preview={{ open: true, calendar: { dayPicker: null } }}
    compat={{ open: true, calendar: { isDayPickerVisible: false } }}
  />
);
export const WeekRange = (): JSXElement => (
  <Pair
    preview={{ open: true, calendar: { dateRangeType: 'week', firstDayOfWeek: 'monday' } }}
    compat={{ open: true, firstDayOfWeek: DayOfWeek.Monday, calendar: { dateRangeType: DateRangeType.Week } }}
  />
);
export const WorkWeekRange = (): JSXElement => (
  <Pair
    preview={{ open: true, calendar: { dateRangeType: 'workWeek', firstDayOfWeek: 'monday' } }}
    compat={{ open: true, firstDayOfWeek: DayOfWeek.Monday, calendar: { dateRangeType: DateRangeType.WorkWeek } }}
  />
);
export const MonthRange = (): JSXElement => (
  <Pair
    preview={{ open: true, calendar: { dateRangeType: 'month' } }}
    compat={{ open: true, calendar: { dateRangeType: DateRangeType.Month } }}
  />
);
export const Restricted = (): JSXElement => (
  <Pair
    preview={{
      open: true,
      minDate: today,
      maxDate: new Date(2030, 0, 25),
      calendar: { restrictedDates: [new Date(2030, 0, 18)] },
    }}
    compat={{
      open: true,
      minDate: today,
      maxDate: new Date(2030, 0, 25),
      calendar: { restrictedDates: [new Date(2030, 0, 18)] },
    }}
  />
);
export const DayOnly = (): JSXElement => (
  <Pair
    preview={{ open: true, calendar: { monthPicker: null } }}
    compat={{ open: true, isMonthPickerVisible: false }}
  />
);
export const Overlay = (): JSXElement => (
  <Pair
    preview={{ open: true, calendar: { layout: 'overlay' } }}
    compat={{ open: true, showMonthPickerAsOverlay: true }}
  />
);
export const WeekNumbers = (): JSXElement => (
  <Pair preview={{ open: true, calendar: { showWeekNumbers: true } }} compat={{ open: true, showWeekNumbers: true }} />
);
export const OpenDark = getStoryVariant(Open, DARK_MODE);
export const OpenHighContrast = getStoryVariant(Open, HIGH_CONTRAST);
export const OpenRtl = getStoryVariant(Open, RTL);
export const OpenTeamsTheme = (): JSXElement => (
  <FluentProvider theme={teamsLightTheme}>
    <Open />
  </FluentProvider>
);
export const SmallOpen = (): JSXElement => (
  <Pair preview={{ open: true, size: 'small' }} compat={{ open: true, size: 'small' }} />
);
export const LargeOpen = (): JSXElement => (
  <Pair preview={{ open: true, size: 'large' }} compat={{ open: true, size: 'large' }} />
);
export const YearView = (): JSXElement => <MonthOnly />;
YearView.parameters = {
  storyWright: {
    steps: new Steps()
      .click('.fui-CalendarPicker__currentItemButton')
      .click('.fui-CalendarMonth__heading')
      .snapshot('year pickers', { cropTo: '.testWrapper' })
      .end(),
  },
} satisfies StoryParameters;
export const Focused = (): JSXElement => <Pair />;
Focused.parameters = {
  storyWright: {
    steps: new Steps()
      .focus('[data-testid="compat"] input')
      .snapshot('compat focus', { cropTo: '.testWrapper' })
      .focus('[data-testid="preview"] input')
      .snapshot('preview focus', { cropTo: '.testWrapper' })
      .end(),
  },
} satisfies StoryParameters;

export const Popup = (): JSXElement => <DatePicker today={today} defaultOpen />;
Popup.parameters = {
  storyWright: {
    steps: new Steps()
      .snapshot('positioned', { cropTo: 'body' })
      .keys('[role="dialog"]', 'Escape')
      .snapshot('dismissed', { cropTo: 'body' })
      .end(),
  },
} satisfies StoryParameters;
