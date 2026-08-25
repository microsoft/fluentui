import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

import { Calendar } from './Calendar';
import { calendarClassNames } from './useCalendarStyles.styles';
import { calendarDayClassNames } from '../CalendarDay/useCalendarDayStyles.styles';
import { calendarMonthClassNames } from '../CalendarMonth/useCalendarMonthStyles.styles';
import { calendarMonthGridCellClassNames } from '../CalendarMonthGridCell/useCalendarMonthGridCellStyles.styles';
import { calendarYearGridCellClassNames } from '../CalendarYearGridCell/useCalendarYearGridCellStyles.styles';
import type { JSXElement } from '@fluentui/react-utilities';

const mountFluent = (element: JSXElement) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

/**
 * Friday, September 18 2020. September 2020 renders as Aug 30 - Oct 3 with a Sunday week start.
 */
const today = new Date(2020, 8, 18);

/**
 * Days are keyed off the accessible name of the inner button, which is unique across the grid.
 * The `tr` filter excludes the two off-screen transition rows.
 */
const day = (label: string) => `tr:not([aria-hidden="true"]) td[role="gridcell"]:has(button[aria-label="${label}"])`;

const heading = `.${calendarDayClassNames.heading}`;
const nextMonth = `.${calendarDayClassNames.nextMonthButton}`;
const goToToday = `.${calendarClassNames.goToTodayButton}`;

describe('Calendar', () => {
  describe('day grid keyboard navigation', () => {
    it('moves focus between days with the arrow keys', () => {
      mountFluent(<Calendar today={today} value={today} />);

      cy.get(day('September 18, 2020')).focus().trigger('keydown', { key: 'ArrowRight', bubbles: true });
      cy.focused().find('button').should('have.attr', 'aria-label', 'September 19, 2020');

      cy.focused().trigger('keydown', { key: 'ArrowDown', bubbles: true });
      cy.focused().find('button').should('have.attr', 'aria-label', 'September 26, 2020');

      cy.focused().trigger('keydown', { key: 'ArrowLeft', bubbles: true });
      cy.focused().find('button').should('have.attr', 'aria-label', 'September 25, 2020');
    });

    it('navigates to the next month when arrowing past the last visible day', () => {
      mountFluent(<Calendar today={today} value={today} />);

      cy.get(day('October 3, 2020')).focus().trigger('keydown', { key: 'ArrowRight', bubbles: true });

      cy.get(heading).should('have.text', 'October 2020');
      cy.focused().find('button').should('have.attr', 'aria-label', 'October 4, 2020');
    });

    it('navigates a month with PageUp and a year with Ctrl+PageUp', () => {
      mountFluent(<Calendar today={today} value={today} />);

      cy.get(day('September 18, 2020')).focus().trigger('keydown', { key: 'PageUp', bubbles: true });
      cy.get(heading).should('have.text', 'October 2020');

      cy.get(day('October 18, 2020')).focus().trigger('keydown', { key: 'PageUp', ctrlKey: true, bubbles: true });
      cy.get(heading).should('have.text', 'October 2021');
    });

    it('calls onDismiss on Escape', () => {
      const onDismiss = cy.stub().as('onDismiss');
      mountFluent(<Calendar today={today} value={today} onDismiss={onDismiss} />);

      cy.get(day('September 18, 2020')).focus().realPress('Escape');

      cy.get('@onDismiss').should('have.been.calledOnce');
    });
  });

  describe('range hover and selection', () => {
    it('highlights the whole week on hover when dateRangeType is week', () => {
      mountFluent(<Calendar today={today} value={today} dateRangeType="week" />);

      cy.get(day('September 16, 2020')).realHover();
      cy.get('td[data-range-hovered]').should('have.length', 7);

      cy.get(heading).realHover();
      cy.get('td[data-range-hovered]').should('not.exist');
    });

    it('marks the range as pressed while the mouse is down', () => {
      mountFluent(<Calendar today={today} value={today} dateRangeType="week" />);

      cy.get(day('September 16, 2020')).trigger('mousedown');
      cy.get('td[data-range-pressed]').should('have.length', 7);

      cy.get(day('September 16, 2020')).trigger('mouseup');
      cy.get('td[data-range-pressed]').should('not.exist');
    });

    it('highlights the configured number of days when daysToSelectInDayView is set', () => {
      mountFluent(<Calendar today={today} value={today} dayPicker={{ daysToSelectInDayView: 4 }} />);

      cy.get(day('September 15, 2020')).realHover();
      cy.get('td[data-range-hovered]').should('have.length', 4);
    });

    it('selects the whole week on click when dateRangeType is week', () => {
      const onSelectDate = cy.stub().as('onSelectDate');
      mountFluent(<Calendar today={today} dateRangeType="week" onSelectDate={onSelectDate} />);

      cy.get(day('September 16, 2020')).click();

      cy.get('td[data-selected]').should('have.length', 7);
      cy.get('@onSelectDate').its('firstCall.args.1.selectedDateRangeArray').should('have.length', 7);
    });

    it('resolves the same date range when selecting with Enter', () => {
      const onSelectDate = cy.stub().as('onSelectDate');
      mountFluent(<Calendar today={today} dateRangeType="week" onSelectDate={onSelectDate} />);

      cy.get(day('September 16, 2020')).focus().realPress('Enter');

      cy.get('td[data-selected]').should('have.length', 7);
      cy.get('@onSelectDate').its('firstCall.args.1.selectedDateRangeArray').should('have.length', 7);
    });

    it('does not select a restricted day', () => {
      const onSelectDate = cy.stub().as('onSelectDate');
      mountFluent(<Calendar today={today} restrictedDates={[new Date(2020, 8, 16)]} onSelectDate={onSelectDate} />);

      cy.get(day('September 16, 2020')).should('have.attr', 'data-outside-bounds');
      cy.get(day('September 16, 2020')).click({ force: true });

      cy.get('@onSelectDate').should('not.have.been.called');
    });
  });

  describe('go to today', () => {
    it('navigates back to today and moves focus to it', () => {
      mountFluent(<Calendar today={today} value={today} />);

      cy.get(nextMonth).click();
      cy.get(heading).should('have.text', 'October 2020');

      cy.get(goToToday).should('be.enabled').click();

      cy.get(heading).should('have.text', 'September 2020');
      cy.focused().find('button').should('have.attr', 'aria-label', 'September 18, 2020');
    });

    it('is disabled while today is already in view', () => {
      mountFluent(<Calendar today={today} value={today} />);

      cy.get(goToToday).should('be.disabled');
    });

    it('is not rendered when the go-to-today slot is null', () => {
      mountFluent(<Calendar today={today} value={today} goToTodayButton={null} />);

      cy.get(goToToday).should('not.exist');
    });
  });

  describe('month and year pickers', () => {
    it('keeps the month highlight on the navigated month', () => {
      mountFluent(<Calendar today={today} value={today} highlightSelectedMonth />);

      cy.get(`.${calendarMonthGridCellClassNames.root}[data-selected]`).should('have.text', 'Sep');

      cy.get(nextMonth).click();

      cy.get(`.${calendarMonthGridCellClassNames.root}[data-selected]`).should('have.text', 'Oct');
    });

    it('opens the year picker on the navigated year', () => {
      const december = new Date(2020, 11, 18);
      mountFluent(<Calendar today={december} value={december} />);

      cy.get(nextMonth).click();
      cy.get(`.${calendarMonthClassNames.heading}`).should('have.text', '2021').click();

      cy.get(`.${calendarYearGridCellClassNames.root}[data-selected]`).should('have.text', '2021');
    });

    it('navigates the day grid when a month is picked', () => {
      mountFluent(<Calendar today={today} value={today} />);

      cy.get(`.${calendarMonthGridCellClassNames.root}`).contains('Dec').click();

      cy.get(heading).should('have.text', 'December 2020');
      cy.focused().find('button').should('have.attr', 'aria-label', 'December 18, 2020');
    });

    it('toggles between the pickers when the day header is clicked in overlay mode', () => {
      mountFluent(<Calendar today={today} value={today} showMonthPickerAsOverlay />);

      cy.get(`.${calendarDayClassNames.root}`).should('exist');
      cy.get(`.${calendarMonthClassNames.root}`).should('not.exist');

      cy.get(heading).click();

      cy.get(`.${calendarMonthClassNames.root}`).should('be.visible');
      cy.get(`.${calendarDayClassNames.root}`).should('not.exist');
    });
  });

  describe('date boundaries', () => {
    it('keeps focus on the next month button once it reaches maxDate', () => {
      mountFluent(<Calendar today={today} value={today} maxDate={new Date(2020, 9, 31)} />);

      cy.get(nextMonth).focus().realPress('Enter');

      cy.get(heading).should('have.text', 'October 2020');
      cy.get(nextMonth).should('have.attr', 'aria-disabled', 'true').and('be.focused');
    });

    it('does not navigate past maxDate', () => {
      mountFluent(<Calendar today={today} value={today} maxDate={new Date(2020, 8, 30)} />);

      cy.get(nextMonth)
        .should('have.attr', 'aria-disabled', 'true')
        .and('have.css', 'pointer-events', 'none')
        .click({ force: true });

      cy.get(heading).should('have.text', 'September 2020');
    });

    it('marks days outside minDate and maxDate as out of bounds', () => {
      mountFluent(<Calendar today={today} value={today} minDate={new Date(2020, 8, 10)} maxDate={today} />);

      cy.get(day('September 9, 2020')).should('have.attr', 'data-outside-bounds');
      cy.get(day('September 10, 2020')).should('not.have.attr', 'data-outside-bounds');
      cy.get(day('September 19, 2020')).should('have.attr', 'data-outside-bounds');
    });
  });
});
