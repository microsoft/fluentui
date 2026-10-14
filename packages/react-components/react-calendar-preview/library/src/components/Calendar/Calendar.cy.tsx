import * as React from 'react';
import { flushSync } from 'react-dom';
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
    it('pages from the arrow-focused day rather than the original anchor', () => {
      const onDisplayedDateChange = cy.stub().as('onDisplayedDateChange');
      mountFluent(<Calendar today={today} defaultValue={today} onDisplayedDateChange={onDisplayedDateChange} />);

      cy.get(day('September 18, 2020')).focus().realPress('ArrowDown');
      cy.focused().find('button').should('have.attr', 'aria-label', 'September 25, 2020');
      cy.focused().realPress('PageDown');

      cy.focused().find('button').should('have.attr', 'aria-label', 'October 25, 2020');
      cy.get('@onDisplayedDateChange').should('have.been.calledOnce');
      cy.get('@onDisplayedDateChange')
        .its('firstCall.args.1.displayedDate')
        .should('deep.equal', new Date(2020, 9, 25));
    });

    it('lets a surrounding container handle Escape when Calendar does not own dismissal', () => {
      const onKeyDown = cy.stub().as('onParentKeyDown');
      mountFluent(
        <div onKeyDown={onKeyDown}>
          <Calendar today={today} defaultValue={today} />
        </div>,
      );
      cy.get(day('September 18, 2020')).focus().realPress('Escape');
      cy.get('@onParentKeyDown').should('have.been.calledOnce');
    });

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

    it('navigates a month with PageDown and a year with Shift+PageDown', () => {
      mountFluent(<Calendar today={today} value={today} />);

      cy.get(day('September 18, 2020')).focus().trigger('keydown', { key: 'PageDown', bubbles: true });
      cy.get(heading).should('have.text', 'October 2020');

      cy.get(day('October 18, 2020')).focus().trigger('keydown', { key: 'PageDown', shiftKey: true, bubbles: true });
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
      cy.get('@onSelectDate').its('firstCall.args.1.selectedDateRange').should('have.length', 7);
    });

    it('resolves the same date range when selecting with Enter', () => {
      const onSelectDate = cy.stub().as('onSelectDate');
      mountFluent(<Calendar today={today} dateRangeType="week" onSelectDate={onSelectDate} />);

      cy.get(day('September 16, 2020')).focus().realPress('Enter');

      cy.get('td[data-selected]').should('have.length', 7);
      cy.get('@onSelectDate').its('firstCall.args.1.selectedDateRange').should('have.length', 7);
    });

    it('resolves the same date range when selecting with Space', () => {
      const onSelectDate = cy.stub().as('onSelectDate');
      mountFluent(<Calendar today={today} dateRangeType="week" onSelectDate={onSelectDate} />);

      cy.get(day('September 16, 2020')).focus().realPress('Space');

      cy.get('td[data-selected]').should('have.length', 7);
      cy.get('@onSelectDate').its('firstCall.args.1.selectedDateRange').should('have.length', 7);
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
    it('is focusable but cannot activate when disabled with allFocusable', () => {
      const onDisplayedDateChange = cy.stub().as('onDisplayedDateChange');
      mountFluent(
        <Calendar today={today} defaultValue={today} allFocusable onDisplayedDateChange={onDisplayedDateChange} />,
      );
      cy.get(goToToday).should('be.enabled').and('have.attr', 'aria-disabled', 'true').focus().realPress('Enter');
      cy.get(goToToday).should('be.focused').realPress('Space');
      cy.get('@onDisplayedDateChange').should('not.have.been.called');
    });

    it('reaches today when only an earlier week of the same month is visible', () => {
      mountFluent(
        <Calendar
          today={today}
          defaultValue={null}
          defaultDisplayedDate={new Date(2020, 8, 1)}
          monthPicker={null}
          dayPicker={{ weeksToShow: 1 }}
        />,
      );
      cy.get(day('September 18, 2020')).should('not.exist');
      cy.get(goToToday).should('be.enabled').click();
      cy.focused().find('button').should('have.attr', 'aria-label', 'September 18, 2020');
      cy.get(goToToday).should('be.disabled');
    });

    it('reveals and focuses today in a five-week grid when the month needs six rows', () => {
      const onSelectDate = cy.stub().as('onSelectDate');
      mountFluent(
        <Calendar
          today={new Date(2020, 7, 31)}
          defaultValue={null}
          defaultDisplayedDate={new Date(2020, 7, 1)}
          monthPicker={null}
          dayPicker={{ weeksToShow: 5 }}
          onSelectDate={onSelectDate}
        />,
      );
      cy.get(day('August 31, 2020')).should('not.exist');
      cy.get(goToToday).should('be.enabled').click();
      cy.get(day('August 31, 2020')).should('be.visible').and('be.focused');
      cy.get('tbody > tr:not([aria-hidden="true"])').should('have.length', 6);
      cy.get(goToToday).should('be.disabled');
      cy.get('@onSelectDate').should('not.have.been.called');
    });

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
      mountFluent(<Calendar today={today} value={today} layout="overlay" />);

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

  describe('custom slot content and focus ownership', () => {
    it('does not reclaim outside focus from a queued paging request', () => {
      mountFluent(
        <>
          <Calendar today={today} defaultValue={today} />
          <button type="button" data-testid="outside-action">
            Outside action
          </button>
        </>,
      );
      cy.get(day('September 18, 2020'))
        .focus()
        .then(cell => {
          flushSync(() => cell[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true })));
          cell[0].ownerDocument.querySelector<HTMLButtonElement>('[data-testid="outside-action"]')!.focus();
        });
      cy.get(heading).should('have.text', 'October 2020');
      cy.window().then(
        win =>
          new Cypress.Promise<void>(resolve => {
            win.requestAnimationFrame(() => resolve());
          }),
      );
      cy.contains('button', 'Outside action').should('be.focused');
    });

    it('preserves input editing and native custom-button Enter activation', () => {
      const onClick = cy.stub().as('onCustomClick');
      mountFluent(
        <Calendar
          today={today}
          defaultValue={today}
          layout="sideBySide"
          dayPicker={{
            heading: {
              children: (
                <>
                  <input aria-label="Custom header" defaultValue="2020" />
                  <button type="button" onClick={onClick}>
                    Custom action
                  </button>
                </>
              ),
            },
          }}
        />,
      );
      cy.get('input[aria-label="Custom header"]').focus().realPress('End').realPress('Backspace');
      cy.get('input[aria-label="Custom header"]').should('have.value', '202');
      cy.contains('button', 'Custom action').focus().realPress('Enter');
      cy.get('@onCustomClick').should('have.been.calledOnce');
    });

    it('does not reclaim outside focus when a responsive breakpoint hides the old picker', () => {
      cy.viewport(1000, 800);
      mountFluent(
        <>
          <Calendar today={today} defaultValue={today} layout="auto" />
          <button type="button">Outside action</button>
        </>,
      );
      cy.get(`.${calendarMonthGridCellClassNames.root}`).contains('Sep').focus();
      cy.contains('button', 'Outside action').focus();
      cy.viewport(360, 800);
      cy.get(`.${calendarMonthClassNames.root}`).should('not.exist');
      cy.contains('button', 'Outside action').should('be.focused');
    });
  });
});
