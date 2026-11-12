import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  ProgressBar,
  Skeleton,
  SkeletonItem,
  Spinner,
  renderProgressBar_unstable,
  renderSpinner_unstable,
  useProgressBar_unstable,
  useSkeletonItemStyles_unstable,
  useSpinner_unstable,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import * as CalendarCompat from '@fluentui/react-calendar-compat';
import * as CalendarPreview from '@fluentui/react-calendar-preview';
import * as DatePickerCompat from '@fluentui/react-datepicker-compat';
import * as TimePickerCompat from '@fluentui/react-timepicker-compat';
import * as MenuGridPreview from '@fluentui/react-menu-grid-preview';
import { RangeSlider, renderRangeSlider_unstable, useRangeSlider_unstable } from '@fluentui/react-range-slider-preview';
// Explicit `.ts` imports bypass the CSS Modules resolution, giving the original Griffel implementations.
import { useProgressBarStyles_unstable as useGriffelProgressBarStyles } from '../../../packages/react-components/react-progress/library/src/components/ProgressBar/useProgressBarStyles.styles.ts';
import { useSpinnerStyles_unstable as useGriffelSpinnerStyles } from '../../../packages/react-components/react-spinner/library/src/components/Spinner/useSpinnerStyles.styles.ts';
import { useRangeSliderStyles_unstable as useGriffelRangeSliderStyles } from '../../../packages/react-components/react-range-slider-preview/library/src/components/RangeSlider/useRangeSliderStyles.styles.ts';
import * as griffelSkeleton from '../../../packages/react-components/react-skeleton/library/src/components/Skeleton/useSkeletonStyles.styles.ts';
import * as griffelSkeletonItem from '../../../packages/react-components/react-skeleton/library/src/components/SkeletonItem/useSkeletonItemStyles.styles.ts';
import * as griffelCompatCalendar from '../../../packages/react-components/react-calendar-compat/library/src/components/Calendar/useCalendarStyles.styles.ts';
import * as griffelCompatCalendarDay from '../../../packages/react-components/react-calendar-compat/library/src/components/CalendarDay/useCalendarDayStyles.styles.ts';
import * as griffelCompatCalendarDayGrid from '../../../packages/react-components/react-calendar-compat/library/src/components/CalendarDayGrid/useCalendarDayGridStyles.styles.ts';
import * as griffelCompatWeekCorner from '../../../packages/react-components/react-calendar-compat/library/src/components/CalendarDayGrid/useWeekCornerStyles.styles.ts';
import * as griffelCompatCalendarMonth from '../../../packages/react-components/react-calendar-compat/library/src/components/CalendarMonth/useCalendarMonthStyles.styles.ts';
import * as griffelCompatCalendarPicker from '../../../packages/react-components/react-calendar-compat/library/src/components/CalendarPicker/useCalendarPickerStyles.styles.ts';
import * as griffelCompatCalendarYear from '../../../packages/react-components/react-calendar-compat/library/src/components/CalendarYear/useCalendarYearStyles.styles.ts';
import * as griffelPreviewCalendar from '../../../packages/react-components/react-calendar-preview/library/src/components/Calendar/useCalendarStyles.styles.ts';
import * as griffelPreviewCalendarDay from '../../../packages/react-components/react-calendar-preview/library/src/components/CalendarDay/useCalendarDayStyles.styles.ts';
import * as griffelPreviewCalendarMonth from '../../../packages/react-components/react-calendar-preview/library/src/components/CalendarMonth/useCalendarMonthStyles.styles.ts';
import * as griffelPreviewCalendarYear from '../../../packages/react-components/react-calendar-preview/library/src/components/CalendarYear/useCalendarYearStyles.styles.ts';
import * as griffelPreviewCalendarItem from '../../../packages/react-components/react-calendar-preview/library/src/hooks/useCalendarItemStyles.styles.ts';
import * as griffelPreviewCalendarPicker from '../../../packages/react-components/react-calendar-preview/library/src/hooks/useCalendarPickerStyles.styles.ts';
import * as griffelDatePicker from '../../../packages/react-components/react-datepicker-compat/library/src/components/DatePicker/useDatePickerStyles.styles.ts';
import * as griffelTimePicker from '../../../packages/react-components/react-timepicker-compat/library/src/components/TimePicker/useTimePickerStyles.styles.ts';
import * as griffelCombobox from '../../../packages/react-components/react-combobox/library/src/components/Combobox/useComboboxStyles.styles.ts';
import * as griffelListbox from '../../../packages/react-components/react-combobox/library/src/components/Listbox/useListboxStyles.styles.ts';
import * as griffelOption from '../../../packages/react-components/react-combobox/library/src/components/Option/useOptionStyles.styles.ts';
import * as griffelMenuGrid from '../../../packages/react-components/react-menu-grid-preview/library/src/components/MenuGrid/useMenuGridStyles.styles.ts';
import * as griffelMenuGridCell from '../../../packages/react-components/react-menu-grid-preview/library/src/components/MenuGridCell/useMenuGridCellStyles.styles.ts';
import * as griffelMenuGridGroup from '../../../packages/react-components/react-menu-grid-preview/library/src/components/MenuGridGroup/useMenuGridGroupStyles.styles.ts';
import * as griffelMenuGridGroupHeader from '../../../packages/react-components/react-menu-grid-preview/library/src/components/MenuGridGroupHeader/useMenuGridGroupHeaderStyles.styles.ts';
import * as griffelMenuGridItem from '../../../packages/react-components/react-menu-grid-preview/library/src/components/MenuGridItem/useMenuGridItemStyles.styles.ts';
import * as griffelMenuGridRow from '../../../packages/react-components/react-menu-grid-preview/library/src/components/MenuGridRow/useMenuGridRowStyles.styles.ts';
import { describeParity, griffel } from './harness';
import type { AnyComponent, ComponentSpec, Implementation } from './harness';

// Keeps every Griffel style module in the bundle, so `griffelPackages` can redirect to them.
const griffelStyleModules = [
  griffelSkeleton,
  griffelSkeletonItem,
  griffelCompatCalendar,
  griffelCompatCalendarDay,
  griffelCompatCalendarDayGrid,
  griffelCompatWeekCorner,
  griffelCompatCalendarMonth,
  griffelCompatCalendarPicker,
  griffelCompatCalendarYear,
  griffelPreviewCalendar,
  griffelPreviewCalendarDay,
  griffelPreviewCalendarMonth,
  griffelPreviewCalendarYear,
  griffelPreviewCalendarItem,
  griffelPreviewCalendarPicker,
  griffelDatePicker,
  griffelTimePicker,
  griffelCombobox,
  griffelListbox,
  griffelOption,
  griffelMenuGrid,
  griffelMenuGridCell,
  griffelMenuGridGroup,
  griffelMenuGridGroupHeader,
  griffelMenuGridItem,
  griffelMenuGridRow,
];

type WebpackFactory = (module: { exports: unknown }, exports: unknown, require: unknown) => void;
// eslint-disable-next-line @typescript-eslint/naming-convention -- webpack runtime global
declare const __webpack_require__: ((id: string) => unknown) & Record<string, unknown>;
// eslint-disable-next-line @typescript-eslint/naming-convention -- webpack runtime global
declare const __webpack_modules__: Record<string, WebpackFactory>;

/**
 * Several components here can not be recomposed with `griffel(...)`: they render internal sub-components (Calendar
 * days/months/years, MenuGridItem rows/cells, Skeleton items) or call another package's style hook (TimePicker calls
 * `useComboboxStyles_unstable`), each importing its own CSS Modules style hook. This re-instantiates the webpack
 * module graph of `packages` (their source modules only; plain dependencies such as FluentProvider stay shared) with
 * every `*.styles.css.ts` request redirected to the original `*.styles.ts` module, producing a Griffel baseline of
 * the whole package.
 */
function griffelPackages<T>(entryPackage: string, packages: string[], dependencyPackages: string[] = []): T {
  if (!griffelStyleModules.length) {
    throw new Error('Griffel style modules are missing from the bundle');
  }
  const cache: Record<string, { exports: unknown }> = {};
  const packageOf = (id: string) =>
    [...packages, ...dependencyPackages].find(name =>
      id.startsWith(`../../packages/react-components/${name}/library/src/`),
    );
  const require = Object.assign((requestedId: string): unknown => {
    let id = requestedId;
    const name = packageOf(id);
    if (!name || id.endsWith('.css')) {
      return __webpack_require__(id);
    }
    if (id.endsWith('.styles.css.ts')) {
      const griffelId = id.replace(/\.styles\.css\.ts$/, '.styles.ts');
      if (griffelId in __webpack_modules__) {
        id = griffelId;
      } else if (packages.includes(name)) {
        // Only dependency packages may keep style hooks unused by the components under test.
        throw new Error(`The Griffel style module ${griffelId} is not in the bundle; import it in this spec`);
      }
    }
    if (!cache[id]) {
      const module = { exports: {} };
      cache[id] = module;
      __webpack_modules__[id].call(module.exports, module, module.exports, require);
    }
    return cache[id].exports;
  }, __webpack_require__);
  return require(`../../packages/react-components/${entryPackage}/library/src/index.ts`) as T;
}

const GriffelCalendarCompat = griffelPackages<typeof CalendarCompat>('react-calendar-compat', [
  'react-calendar-compat',
]);
const GriffelCalendarPreview = griffelPackages<typeof CalendarPreview>('react-calendar-preview', [
  'react-calendar-preview',
]);
// DatePicker renders the Calendar of react-calendar-compat; both packages use their Griffel styles.
const GriffelDatePickerCompat = griffelPackages<typeof DatePickerCompat>('react-datepicker-compat', [
  'react-datepicker-compat',
  'react-calendar-compat',
]);
// TimePicker's style hook applies Combobox styles: the baseline uses the Griffel Combobox styles too.
const GriffelTimePickerCompat = griffelPackages<typeof TimePickerCompat>(
  'react-timepicker-compat',
  ['react-timepicker-compat'],
  ['react-combobox'],
);
const GriffelMenuGridPreview = griffelPackages<typeof MenuGridPreview>('react-menu-grid-preview', [
  'react-menu-grid-preview',
]);
const GriffelSkeleton = griffelPackages<{
  Skeleton: AnyComponent;
  SkeletonItem: AnyComponent;
  // eslint-disable-next-line @typescript-eslint/naming-convention -- public hook name
  useSkeletonItemStyles_unstable: unknown;
}>('react-skeleton', ['react-skeleton']);

const calendar = { css: CalendarCompat, griffel: GriffelCalendarCompat };
const calendarPreview = { css: CalendarPreview, griffel: GriffelCalendarPreview };
const datePicker = { css: DatePickerCompat, griffel: GriffelDatePickerCompat };
const timePicker = { css: TimePickerCompat, griffel: GriffelTimePickerCompat };
const menuGrid = { css: MenuGridPreview, griffel: GriffelMenuGridPreview };
const skeleton = { css: { Skeleton, SkeletonItem }, griffel: GriffelSkeleton };

const as = (component: unknown) => component as AnyComponent;
const query = (selector: string) => (container: HTMLElement) => {
  const element = container.querySelector<HTMLElement>(selector);
  if (!element) {
    throw new Error(`No element matches ${selector}`);
  }
  return element;
};

/** Opens the year picker of a preview Calendar, from its month picker heading. */
const openYearPicker = (container: HTMLElement) => {
  if (!container.querySelector('.fui-CalendarYearGridCell')) {
    const heading = query('.fui-CalendarMonth__heading')(container);
    ReactDOM.flushSync(() => heading.click());
  }
  return container;
};

const today = new Date(2024, 4, 15);
const value = new Date(2024, 4, 20);

/** Compat Calendar props: a fixed date, so both implementations render the same days. */
const compatCalendarProps = { today, value, showGoToToday: true, highlightSelectedMonth: true };
const previewCalendarProps = { today, defaultValue: value, highlightSelectedMonth: true };

const calendarCompatSpec = (spec: Omit<ComponentSpec, 'css' | 'griffel'>): ComponentSpec => ({
  css: as(calendar.css.Calendar),
  griffel: as(calendar.griffel.Calendar),
  ...spec,
});
const calendarPreviewSpec = (spec: Omit<ComponentSpec, 'css' | 'griffel'>): ComponentSpec => ({
  css: as(calendarPreview.css.Calendar),
  griffel: as(calendarPreview.griffel.Calendar),
  ...spec,
});

const MenuGridOf = (implementation: Implementation) => menuGrid[implementation];
const menuGridItemProps = {
  icon: <button aria-label="Profile">P</button>,
  children: 'Ada Lovelace',
  subText: 'Available',
  firstSubAction: <button aria-label="Remove">R</button>,
  secondSubAction: <button aria-label="More">M</button>,
};
const inMenuGrid = (element: JSXElement, implementation: Implementation) => {
  const { MenuGrid } = MenuGridOf(implementation);
  return <MenuGrid>{element}</MenuGrid>;
};

describeParity('feedback and compat components', {
  ProgressBar: {
    css: ProgressBar as AnyComponent,
    griffel: griffel('ProgressBar', useProgressBar_unstable, useGriffelProgressBarStyles, renderProgressBar_unstable),
    slot: 'bar',
    sampledSlots: ['fui-ProgressBar__bar'],
    interactive: false,
    props: {},
    variants: [
      { value: 0.5 },
      { value: 0.5, color: 'error' },
      { value: 0.75, color: 'warning', thickness: 'large' },
      { value: 1, color: 'success', shape: 'square' },
      {},
    ],
    // The indeterminate bar runs a motion (Web Animations API) that reduced motion does not stop: sample it at its
    // start, so both implementations are compared at the same animation time.
    findRoot: container => {
      container.getAnimations({ subtree: true }).forEach(animation => {
        animation.pause();
        animation.currentTime = 0;
      });
      return container.lastElementChild as HTMLElement;
    },
  },
  Spinner: {
    css: Spinner as AnyComponent,
    griffel: griffel('Spinner', useSpinner_unstable, useGriffelSpinnerStyles, renderSpinner_unstable),
    slot: 'label',
    sampledSlots: ['fui-Spinner__spinner', 'fui-Spinner__spinnerTail', 'fui-Spinner__label'],
    interactive: false,
    props: { label: 'Loading' },
    variants: [
      {},
      { size: 'tiny', labelPosition: 'before' },
      { size: 'extra-large', labelPosition: 'below' },
      { size: 'huge', labelPosition: 'above' },
      { appearance: 'inverted', size: 'small' },
    ],
  },
  Skeleton: {
    css: Skeleton as AnyComponent,
    griffel: GriffelSkeleton.Skeleton,
    sampledSlots: ['fui-SkeletonItem'],
    interactive: false,
    props: implementation => {
      const { SkeletonItem: Item } = skeleton[implementation];
      return {
        'aria-label': 'Loading content',
        children: (
          <>
            <Item shape="circle" size={24} />
            <Item />
          </>
        ),
      };
    },
    variants: [{}, { appearance: 'translucent' }, { animation: 'pulse' }, { as: 'span' }],
  },
  SkeletonItem: {
    css: SkeletonItem as AnyComponent,
    griffel: GriffelSkeleton.SkeletonItem,
    sampledSlots: [],
    interactive: false,
    props: {},
    variants: [
      {},
      { shape: 'circle', size: 48 },
      { shape: 'square', size: 32 },
      { size: 8 },
      { appearance: 'translucent', animation: 'pulse' },
    ],
  },
  RangeSlider: {
    css: RangeSlider as AnyComponent,
    griffel: griffel(
      'RangeSlider',
      useRangeSlider_unstable,
      useGriffelRangeSliderStyles,
      renderRangeSlider_unstable,
      undefined,
      // RangeSlider does not call a custom style hook.
      'useRangeSliderStyles_unstable (not called)',
    ),
    slot: 'rail',
    sampledSlots: ['fui-RangeSlider__rail', 'fui-RangeSlider__startThumb', 'fui-RangeSlider__endThumb'],
    interactive: true,
    props: { defaultValue: { start: 20, end: 80 }, 'aria-label': 'Range' },
    variants: [{}, { size: 'small' }, { vertical: true }, { disabled: true }],
  },
  TimePicker: {
    css: as(timePicker.css.TimePicker),
    griffel: as(timePicker.griffel.TimePicker),
    customStyleHook: 'useTimePickerCompatStyles_unstable',
    slot: 'input',
    sampledSlots: ['fui-TimePicker__input', 'fui-TimePicker__expandIcon'],
    interactive: true,
    props: { placeholder: 'Select a time', 'aria-label': 'Time' },
    variants: [
      { appearance: 'outline' },
      { appearance: 'underline' },
      { appearance: 'filled-darker' },
      { size: 'small' },
      { disabled: true },
    ],
  },
  TimePickerListbox: {
    css: as(timePicker.css.TimePicker),
    griffel: as(timePicker.griffel.TimePicker),
    customStyleHook: 'useTimePickerCompatStyles_unstable',
    slot: 'listbox',
    sampledSlots: ['fui-TimePicker__listbox', 'fui-Option'],
    interactive: false,
    props: {
      'aria-label': 'Time',
      open: true,
      inlinePopup: true,
      startHour: 9,
      endHour: 11,
      // The inline listbox needs room in the flow, so it does not overlap the next variant.
      style: { marginBottom: 200 },
    },
    variants: [{}, { size: 'large' }],
    findRoot: query('.fui-TimePicker__listbox'),
  },
  DatePicker: {
    css: as(datePicker.css.DatePicker),
    griffel: as(datePicker.griffel.DatePicker),
    // DatePicker does not call a custom style hook.
    sampledSlots: ['fui-Input__input', 'fui-Input__contentAfter'],
    interactive: true,
    props: { placeholder: 'Select a date', 'aria-label': 'Date' },
    variants: [{}, { appearance: 'underline' }, { appearance: 'filled-darker' }, { disabled: true }],
    findRoot: query('.fui-DatePicker'),
  },
  DatePickerPopup: {
    css: as(datePicker.css.DatePicker),
    griffel: as(datePicker.griffel.DatePicker),
    slot: 'popupSurface',
    sampledSlots: ['fui-DatePicker__calendar', 'fui-CalendarDayGrid__dayButton', 'fui-Calendar__goTodayButton'],
    interactive: false,
    props: {
      'aria-label': 'Date',
      open: true,
      inlinePopup: true,
      disableAutoFocus: true,
      today,
      value,
      showGoToToday: true,
    },
    variants: [{}, { showWeekNumbers: true }],
    // The inline popup is absolutely positioned: reserve its height in the flow.
    wrap: element => <div style={{ height: 380 }}>{element}</div>,
    findRoot: query('.fui-DatePicker__popupSurface'),
  },
  CalendarCompat: calendarCompatSpec({
    sampledSlots: [
      'fui-Calendar__divider',
      'fui-Calendar__goTodayButton',
      'fui-CalendarDay__monthAndYear',
      'fui-CalendarDay__headerIconButton',
      'fui-CalendarDayGrid__weekDayLabelCell',
      'fui-CalendarDayGrid__weekNumberCell',
      'fui-CalendarPicker__currentItemButton',
      'fui-CalendarPicker__navigationButton',
    ],
    interactive: false,
    props: compatCalendarProps,
    variants: [{}, { showWeekNumbers: true }, { isMonthPickerVisible: false }, { isDayPickerVisible: false }],
    findRoot: query('.fui-Calendar'),
  }),
  CalendarCompatDayButton: calendarCompatSpec({
    sampledSlots: [],
    interactive: true,
    states: ['rest', 'hover', 'pressed'],
    props: compatCalendarProps,
    variants: [{}],
    findRoot: query(
      '.fui-CalendarDayGrid__dayCell:not(.fui-CalendarDayGrid__daySelected) .fui-CalendarDayGrid__dayButton',
    ),
  }),
  CalendarCompatDayCell: calendarCompatSpec({
    sampledSlots: ['fui-CalendarDayGrid__dayButton', 'fui-CalendarDayGrid__dayTodayMarker'],
    interactive: true,
    states: ['rest', 'hover', 'pressed'],
    props: compatCalendarProps,
    variants: [{}, { dateRangeType: CalendarCompat.DateRangeType.Week }],
    findRoot: query('td[aria-selected="true"]'),
  }),
  CalendarCompatTodayCell: calendarCompatSpec({
    sampledSlots: ['fui-CalendarDayGrid__dayButton', 'fui-CalendarDayGrid__dayTodayMarker'],
    interactive: false,
    props: compatCalendarProps,
    variants: [{}],
    findRoot: query('td[aria-current="date"]'),
  }),
  CalendarCompatMonthButton: calendarCompatSpec({
    sampledSlots: [],
    interactive: true,
    states: ['rest', 'hover', 'pressed'],
    props: compatCalendarProps,
    variants: [{}],
    findRoot: query('.fui-CalendarPicker__itemButton:not(.fui-CalendarPicker__selected)'),
  }),
  CalendarCompatSelectedMonth: calendarCompatSpec({
    sampledSlots: [],
    interactive: true,
    states: ['rest', 'hover', 'pressed'],
    props: compatCalendarProps,
    variants: [{}],
    findRoot: query('.fui-CalendarPicker__selected'),
  }),
  CalendarPreview: calendarPreviewSpec({
    slot: 'goToTodayButton',
    sampledSlots: [
      'fui-Calendar__divider',
      'fui-Calendar__goToTodayButton',
      'fui-CalendarDay__monthAndYear',
      'fui-CalendarDay__previousMonthButton',
      'fui-CalendarDayGridHeaderCell',
      'fui-CalendarDayGridRow__weekNumberCell',
      'fui-CalendarMonth__heading',
      'fui-CalendarMonth__previousYearButton',
    ],
    interactive: false,
    props: previewCalendarProps,
    variants: [{}, { showWeekNumbers: true }, { layout: 'overlay' }, { layout: 'overlay', defaultView: 'month' }],
    findRoot: query('.fui-Calendar'),
  }),
  CalendarPreviewDayCell: calendarPreviewSpec({
    sampledSlots: ['fui-CalendarDayGridCell__button', 'fui-CalendarDayGridCell__dayLabel'],
    interactive: true,
    states: ['rest', 'hover', 'pressed'],
    props: previewCalendarProps,
    variants: [{}, { dateRangeType: 'week' }],
    findRoot: query('.fui-CalendarDayGridCell[aria-selected="true"]'),
  }),
  CalendarPreviewTodayCell: calendarPreviewSpec({
    sampledSlots: ['fui-CalendarDayGridCell__button', 'fui-CalendarDayGridCell__dayLabel'],
    interactive: false,
    props: previewCalendarProps,
    variants: [{}],
    findRoot: query('.fui-CalendarDayGridCell[data-today]'),
  }),
  CalendarPreviewDayButton: calendarPreviewSpec({
    sampledSlots: ['fui-CalendarDayGridCell__dayLabel'],
    interactive: true,
    states: ['rest', 'hover', 'pressed'],
    props: previewCalendarProps,
    variants: [{}],
    findRoot: query(
      '.fui-CalendarDayGridCell:not([data-selected]):not([data-today]):not([data-outside-month]) .fui-CalendarDayGridCell__button',
    ),
  }),
  CalendarPreviewMonthCell: calendarPreviewSpec({
    sampledSlots: [],
    interactive: true,
    states: ['rest', 'hover', 'pressed'],
    props: previewCalendarProps,
    variants: [{}],
    findRoot: query('.fui-CalendarMonthGridCell:not([data-selected])'),
  }),
  CalendarPreviewSelectedMonthCell: calendarPreviewSpec({
    sampledSlots: [],
    interactive: true,
    states: ['rest', 'hover', 'pressed'],
    props: previewCalendarProps,
    variants: [{}],
    findRoot: query('.fui-CalendarMonthGridCell[data-selected]'),
  }),
  CalendarPreviewYearCell: calendarPreviewSpec({
    sampledSlots: [],
    interactive: true,
    states: ['rest', 'hover', 'pressed'],
    props: previewCalendarProps,
    variants: [{}, { highlightSelectedMonth: false }],
    findRoot: container => query('.fui-CalendarYearGridCell:not([data-selected])')(openYearPicker(container)),
  }),
  CalendarPreviewSelectedYearCell: calendarPreviewSpec({
    sampledSlots: [],
    interactive: true,
    states: ['rest', 'hover', 'pressed'],
    props: previewCalendarProps,
    variants: [{}],
    findRoot: container => query('.fui-CalendarYearGridCell[data-selected]')(openYearPicker(container)),
  }),
  MenuGrid: {
    css: as(menuGrid.css.MenuGrid),
    griffel: as(menuGrid.griffel.MenuGrid),
    sampledSlots: ['fui-MenuGridItem', 'fui-MenuGridItem__content'],
    interactive: false,
    props: implementation => {
      const { MenuGridItem } = MenuGridOf(implementation);
      return {
        children: (
          <>
            <MenuGridItem {...menuGridItemProps} />
            <MenuGridItem>Grace Hopper</MenuGridItem>
          </>
        ),
      };
    },
    variants: [{}],
  },
  MenuGridItem: {
    css: as(menuGrid.css.MenuGridItem),
    griffel: as(menuGrid.griffel.MenuGridItem),
    slot: 'content',
    sampledSlots: [
      'fui-MenuGridItem__icon',
      'fui-MenuGridItem__content',
      'fui-MenuGridItem__subText',
      'fui-MenuGridItem__firstSubAction',
      'fui-MenuGridItem__secondSubAction',
    ],
    interactive: true,
    props: {},
    variants: [menuGridItemProps, { children: 'Grace Hopper' }],
    wrap: inMenuGrid,
    findRoot: query('.fui-MenuGridItem'),
  },
  MenuGridRow: {
    css: as(menuGrid.css.MenuGridRow),
    griffel: as(menuGrid.griffel.MenuGridRow),
    sampledSlots: ['fui-MenuGridCell'],
    interactive: true,
    props: implementation => {
      const { MenuGridCell } = MenuGridOf(implementation);
      return { children: <MenuGridCell>Cell</MenuGridCell> };
    },
    variants: [{}],
    wrap: inMenuGrid,
    findRoot: query('.fui-MenuGridRow'),
  },
  MenuGridCell: {
    css: as(menuGrid.css.MenuGridCell),
    griffel: as(menuGrid.griffel.MenuGridCell),
    sampledSlots: [],
    interactive: false,
    props: { children: 'Cell' },
    variants: [{}, { visuallyHidden: true }],
    wrap: (element, implementation) => {
      const { MenuGrid, MenuGridRow } = MenuGridOf(implementation);
      return (
        <MenuGrid>
          <MenuGridRow>{element}</MenuGridRow>
        </MenuGrid>
      );
    },
    findRoot: query('.fui-MenuGridCell'),
  },
  MenuGridGroup: {
    css: as(menuGrid.css.MenuGridGroup),
    griffel: as(menuGrid.griffel.MenuGridGroup),
    sampledSlots: ['fui-MenuGridGroupHeader', 'fui-MenuGridItem'],
    interactive: false,
    props: implementation => {
      const { MenuGridGroupHeader, MenuGridItem } = MenuGridOf(implementation);
      return {
        children: (
          <>
            <MenuGridGroupHeader>Team</MenuGridGroupHeader>
            <MenuGridItem>Grace Hopper</MenuGridItem>
          </>
        ),
      };
    },
    variants: [{}],
    wrap: inMenuGrid,
    findRoot: query('.fui-MenuGridGroup'),
  },
  MenuGridGroupHeader: {
    css: as(menuGrid.css.MenuGridGroupHeader),
    griffel: as(menuGrid.griffel.MenuGridGroupHeader),
    sampledSlots: [],
    interactive: false,
    props: { children: 'Team' },
    variants: [{}],
    wrap: (element, implementation) => {
      const { MenuGrid, MenuGridGroup } = MenuGridOf(implementation);
      return (
        <MenuGrid>
          <MenuGridGroup>{element}</MenuGridGroup>
        </MenuGrid>
      );
    },
    findRoot: query('.fui-MenuGridGroupHeader'),
  },
});

describe('CSS Modules parity in a Griffel application: feedback and compat Griffel baselines', () => {
  it('re-instantiated packages use the original Griffel style hooks', () => {
    const hooks: [string, unknown, unknown, unknown][] = [
      [
        'react-calendar-compat',
        GriffelCalendarCompat.useCalendarDayGridStyles_unstable,
        griffelCompatCalendarDayGrid.useCalendarDayGridStyles_unstable,
        CalendarCompat.useCalendarDayGridStyles_unstable,
      ],
      [
        'react-calendar-preview',
        GriffelCalendarPreview.useCalendarDayStyles_unstable,
        griffelPreviewCalendarDay.useCalendarDayStyles_unstable,
        CalendarPreview.useCalendarDayStyles_unstable,
      ],
      [
        'react-datepicker-compat',
        GriffelDatePickerCompat.useDatePickerStyles_unstable,
        griffelDatePicker.useDatePickerStyles_unstable,
        DatePickerCompat.useDatePickerStyles_unstable,
      ],
      [
        'react-timepicker-compat',
        GriffelTimePickerCompat.useTimePickerStyles_unstable,
        griffelTimePicker.useTimePickerStyles_unstable,
        TimePickerCompat.useTimePickerStyles_unstable,
      ],
      [
        'react-menu-grid-preview',
        GriffelMenuGridPreview.useMenuGridItemStyles_unstable,
        griffelMenuGridItem.useMenuGridItemStyles_unstable,
        MenuGridPreview.useMenuGridItemStyles_unstable,
      ],
      [
        'react-skeleton',
        GriffelSkeleton.useSkeletonItemStyles_unstable,
        griffelSkeletonItem.useSkeletonItemStyles_unstable,
        useSkeletonItemStyles_unstable,
      ],
    ];
    for (const [name, baseline, griffelHook, cssHook] of hooks) {
      expect(String(baseline), name).to.equal(String(griffelHook));
      expect(String(baseline), name).not.to.equal(String(cssHook));
    }
  });
});
