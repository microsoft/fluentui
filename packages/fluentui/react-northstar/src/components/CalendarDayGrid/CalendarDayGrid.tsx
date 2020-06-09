import { gridBehavior } from '@fluentui/accessibility';
import * as React from 'react';
import { ICalendarDayGridCommonProps, IDayInfo, getWeeks, findIndex, DAYS_IN_WEEK } from '@uifabric/utilities';
import { UIComponentProps, commonPropTypes, createShorthandFactory } from '../../utils';
import { WithAsProp, withSafeTypeForAs, FluentComponentStaticProps } from '../../types';
import Box from '../Box/Box';

import Grid from '../Grid/Grid';

export interface CalendarDayGridProps extends UIComponentProps, ICalendarDayGridCommonProps {}

export const CalendarDayGrid: React.FC<WithAsProp<CalendarDayGridProps>> &
  FluentComponentStaticProps<CalendarDayGridProps> = props => {
  const [weeks] = React.useState(getWeeks(props, () => {}));
  const { strings, firstDayOfWeek, weeksToShow } = props;

  function renderRows() {
    const visibleWeeks = weeks.slice(1, weeks.length - 2);
    return visibleWeeks.map(week => {
      return week.map(day => (
        <Box key={day.key} title={day.key} aria-label={day.key}>
          {day.date}
        </Box>
      ));
    });
  }

  const renderHeaderRow = () => {
    const dayLabels = [...strings.shortDays];
    const firstOfMonthIndex = findIndex(weeks![1], (day: IDayInfo) => day.originalDate.getDate() === 1);

    if (weeksToShow === 1 && firstOfMonthIndex >= 0) {
      // if we only show one week, replace the header with short month name
      dayLabels[firstOfMonthIndex] = strings.shortMonths[weeks![1][firstOfMonthIndex].originalDate.getMonth()];
    }

    return dayLabels.map((val: string, index: number) => {
      const i = (index + firstDayOfWeek) % DAYS_IN_WEEK;
      const label = index === firstOfMonthIndex ? `${strings.days[i]} ${dayLabels[i]}` : strings.days[i];

      return (
        <Box title={label} aria-label={label}>
          {dayLabels[index]}
        </Box>
      );
    });
  };

  const element = (
    <Grid accessibility={gridBehavior} columns={7}>
      {renderHeaderRow()}
      {renderRows()}
    </Grid>
  );

  return element;
};

CalendarDayGrid.defaultProps = {};

CalendarDayGrid.propTypes = {
  ...commonPropTypes.createCommon({ content: 'shorthand' }),
};

CalendarDayGrid.displayName = 'CalendarDayGrid';

CalendarDayGrid.handledProps = Object.keys(CalendarDayGrid.propTypes) as any;

CalendarDayGrid.create = createShorthandFactory({
  Component: CalendarDayGrid,
});

/**
 * An CalendarDayGrid is used to display a calendar with days.
 */
export default withSafeTypeForAs<typeof CalendarDayGrid, CalendarDayGridProps>(CalendarDayGrid);
