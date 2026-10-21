import * as React from 'react';
import { flushSync } from 'react-dom';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

import { Calendar } from './Calendar';
import { calendarClassNames } from './useCalendarStyles.styles';
import { calendarDayClassNames } from '../CalendarDay/useCalendarDayStyles.styles';
import { calendarMonthClassNames, calendarMonthGridClassNames } from '../CalendarMonth/useCalendarMonthStyles.styles';
import { calendarYearGridClassNames } from '../CalendarYear/useCalendarYearStyles.styles';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarProps } from './Calendar.types';

const mountFluent = (element: JSXElement, dir: 'ltr' | 'rtl' = 'ltr') => {
  mount(
    <FluentProvider theme={webLightTheme} dir={dir}>
      {element}
    </FluentProvider>,
  );
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
  describe('layout geometry', () => {
    const layouts: { name: string; props: CalendarProps; width: number; monthOnly?: boolean }[] = [
      { name: 'side by side', props: { layout: 'sideBySide' }, width: 440 },
      { name: 'side by side with week numbers', props: { layout: 'sideBySide', showWeekNumbers: true }, width: 470 },
      { name: 'day only', props: { monthPicker: null }, width: 220 },
      { name: 'day only with week numbers', props: { monthPicker: null, showWeekNumbers: true }, width: 250 },
      { name: 'overlay', props: { layout: 'overlay' }, width: 220 },
      { name: 'month only', props: { dayPicker: null, showWeekNumbers: true }, width: 220, monthOnly: true },
    ];

    for (const dir of ['ltr', 'rtl'] as const) {
      for (const sixWeeks of [false, true]) {
        for (const { name, props, width, monthOnly } of layouts) {
          it(`preserves ${name} dimensions with ${sixWeeks ? 'six' : 'five'} weeks in ${dir}`, () => {
            const date = sixWeeks ? new Date(2020, 7, 18) : today;
            const dayHeight = sixWeeks ? 248 : 220;
            const sideBySide = props.layout === 'sideBySide';
            const height = monthOnly ? 241 : sideBySide ? Math.max(dayHeight, 241) : dayHeight + 33;
            mountFluent(<Calendar today={date} defaultValue={date} {...props} />, dir);

            cy.get(`.${calendarClassNames.root}`).should(elements => {
              const root = elements[0];
              const bounds = root.getBoundingClientRect();
              expect(bounds.width).to.equal(width);
              expect(bounds.height).to.equal(height);
              const action = root.querySelector<HTMLButtonElement>(goToToday)!;
              const actionBounds = action.getBoundingClientRect();
              const actionStyles = getComputedStyle(action);
              expect(actionBounds.height).to.equal(30);
              expect(actionStyles.marginTop).to.equal('3px');
              expect(actionStyles.lineHeight).to.equal('30px');

              if (sideBySide) {
                const dayPicker = root.querySelector<HTMLElement>(`.${calendarDayClassNames.root}`)!;
                const monthPicker = root.querySelector<HTMLElement>(`.${calendarMonthClassNames.root}`)!;
                const dayBounds = dayPicker.getBoundingClientRect();
                const monthBounds = monthPicker.getBoundingClientRect();
                expect(dayBounds.width).to.equal(props.showWeekNumbers ? 250 : 220);
                expect(monthBounds.width).to.equal(220);
                expect(
                  dir === 'ltr' ? monthBounds.left - dayBounds.right : dayBounds.left - monthBounds.right,
                ).to.equal(1);
              }
            });
          });
        }
      }
    }

    it('does not reserve action space when the action is hidden', () => {
      mountFluent(<Calendar today={today} defaultValue={today} layout="sideBySide" goToTodayButton={null} />);
      cy.get(`.${calendarClassNames.root}`).should(elements => {
        const bounds = elements[0].getBoundingClientRect();
        expect(bounds.width).to.equal(440);
        expect(bounds.height).to.equal(220);
      });
      cy.get(goToToday).should('not.exist');
    });

    it('retains the single-picker footprint when overlay navigation switches views', () => {
      mountFluent(<Calendar today={today} defaultValue={today} layout="overlay" />);
      cy.get(heading).click();
      cy.get(`.${calendarMonthClassNames.root}`).should('be.visible');
      cy.get(`.${calendarClassNames.root}`).should(elements => {
        const bounds = elements[0].getBoundingClientRect();
        expect(bounds.width).to.equal(220);
        expect(bounds.height).to.equal(241);
      });
      cy.get(`.${calendarMonthClassNames.heading}`).click();
      cy.get(`.${calendarClassNames.root}`).should(elements => {
        const bounds = elements[0].getBoundingClientRect();
        expect(bounds.width).to.equal(220);
        expect(bounds.height).to.equal(241);
      });
    });

    it('preserves consumer root and action sizing overrides', () => {
      mountFluent(
        <Calendar
          today={today}
          defaultValue={today}
          style={{ width: 500 }}
          goToTodayButton={{ style: { height: 40, lineHeight: '40px', marginTop: 0 } }}
        />,
      );
      cy.get(`.${calendarClassNames.root}`).should('have.css', 'width', '500px');
      cy.get(goToToday).should('have.css', 'height', '40px').and('have.css', 'margin-top', '0px');
    });
  });

  describe('day grid keyboard navigation', () => {
    it('keeps enclosing custom content callbacks when a nested Calendar handles an arrow', () => {
      const onOuterKeyDown = cy.stub().as('onOuterKeyDown');
      mountFluent(
        <Calendar
          today={today}
          defaultValue={today}
          dayPicker={{
            renderDay: (dayCell, defaultContent) =>
              dayCell.originalDate?.getTime() === today.getTime() ? (
                <span onKeyDown={onOuterKeyDown}>
                  <Calendar today={today} defaultValue={today} />
                </span>
              ) : (
                defaultContent
              ),
          }}
        />,
      );

      cy.get(day('September 18, 2020'))
        .find('[role="grid"] button[aria-label="September 18, 2020"]')
        .last()
        .closest('td')
        .focus()
        .realPress('ArrowRight');
      cy.get('@onOuterKeyDown').should('have.been.calledOnce');
    });

    (['capture', 'bubble'] as const).forEach(phase => {
      it(`honors custom day content ${phase} cancellation before navigation`, () => {
        const onKeyDownCapture = cy.stub().callsFake((event: React.KeyboardEvent) => {
          if (phase === 'capture') {
            event.preventDefault();
          }
        });
        const onKeyDown = cy.stub().callsFake((event: React.KeyboardEvent) => {
          if (phase === 'bubble') {
            event.preventDefault();
          }
        });
        mountFluent(
          <Calendar
            today={today}
            defaultValue={today}
            dayPicker={{
              renderDay: () => (
                <span tabIndex={0} title="Custom day content" onKeyDownCapture={onKeyDownCapture} onKeyDown={onKeyDown}>
                  18
                </span>
              ),
            }}
          />,
        );
        cy.get(day('September 18, 2020')).find('[title="Custom day content"]').focus().realPress('ArrowRight');
        cy.get(day('September 18, 2020')).find('[title="Custom day content"]').should('be.focused');
        cy.wrap(onKeyDownCapture).should('have.been.calledOnce');
        cy.wrap(onKeyDown).should('have.been.calledOnce');
      });
    });

    it('lets a cell handler cancel day movement', () => {
      mountFluent(
        <Calendar
          today={today}
          defaultValue={today}
          dayPicker={{ getDayCellProps: () => ({ onKeyDown: event => event.preventDefault() }) }}
        />,
      );
      cy.get(day('September 18, 2020')).focus().realPress('ArrowRight');
      cy.get(day('September 18, 2020')).should('be.focused');
    });

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
    (['month', 'year'] as const).forEach(picker => {
      const cells = '[data-fui-calendar-picker="month"] button[role="gridcell"]';
      const openYearPicker = () => {
        if (picker === 'year') {
          cy.get(`.${calendarMonthClassNames.heading}`).click();
        }
      };

      it(`skips hidden ${picker} cells and still focuses tabIndex=-1 candidates`, () => {
        mountFluent(<Calendar today={today} defaultValue={today} layout="sideBySide" />);
        openYearPicker();

        cy.get(cells).eq(1).invoke('prop', 'hidden', true).should('not.be.visible');
        cy.get(cells).eq(2).invoke('attr', 'tabindex', '-1');
        cy.get(cells).eq(0).focus().realPress('ArrowRight');
        cy.get(cells).eq(2).should('be.focused');
      });

      it(`moves the ${picker} grid exactly once per arrow without wrapping rows or columns`, () => {
        const onSelectDate = cy.stub().as('onSelectDate');
        const onDisplayedDateChange = cy.stub().as('onDisplayedDateChange');
        mountFluent(
          <Calendar
            today={today}
            defaultValue={today}
            layout="sideBySide"
            onSelectDate={onSelectDate}
            onDisplayedDateChange={onDisplayedDateChange}
          />,
        );
        openYearPicker();

        cy.get(cells).eq(0).focus().realPress('ArrowRight');
        cy.get(cells).eq(1).should('be.focused').realPress('ArrowDown');
        cy.get(cells).eq(5).should('be.focused').realPress('ArrowLeft');
        cy.get(cells).eq(4).should('be.focused').realPress('ArrowUp');
        cy.get(cells).eq(0).should('be.focused').realPress('ArrowLeft');
        cy.get(cells).eq(0).should('be.focused');

        cy.get(cells).eq(3).focus().realPress('ArrowRight');
        cy.get(cells).eq(3).should('be.focused');
        cy.get(cells).eq(8).focus().realPress('ArrowDown');
        cy.get(cells).eq(8).should('be.focused');
        cy.get('@onSelectDate').should('not.have.been.called');
        cy.get('@onDisplayedDateChange').should('not.have.been.called');
      });

      it(`preserves RTL arrow navigation in the ${picker} grid`, () => {
        mountFluent(<Calendar today={today} defaultValue={today} layout="sideBySide" />, 'rtl');
        openYearPicker();

        cy.get(cells).eq(0).focus().realPress('ArrowLeft');
        cy.get(cells).eq(1).should('be.focused').realPress('ArrowDown');
        cy.get(cells).eq(5).should('be.focused').realPress('ArrowRight');
        cy.get(cells).eq(4).should('be.focused');
      });

      it(`preserves Tabster's single Tab stop for the ${picker} grid`, () => {
        mountFluent(
          <>
            <Calendar today={today} defaultValue={today} layout="sideBySide" goToTodayButton={null} />
            <button type="button">After Calendar</button>
          </>,
        );
        openYearPicker();

        cy.get(cells).eq(0).focus().realPress('ArrowRight');
        cy.get(cells).eq(1).should('be.focused').realPress('Tab');
        cy.contains('button', 'After Calendar').should('be.focused');
      });

      it(`honors consumer capture cancellation in the ${picker} grid`, () => {
        const onKeyDownCapture = cy.stub().callsFake((event: React.KeyboardEvent) => event.preventDefault());
        mountFluent(
          <Calendar
            today={today}
            defaultValue={today}
            layout="sideBySide"
            monthPicker={
              picker === 'month' ? { grid: { onKeyDownCapture } } : { yearPicker: { grid: { onKeyDownCapture } } }
            }
          />,
        );
        openYearPicker();

        cy.get(cells).eq(5).focus().realPress('ArrowDown');
        cy.get(cells).eq(5).should('be.focused');
        cy.wrap(onKeyDownCapture).should('have.been.calledOnce');
      });

      [false, true].forEach(allFocusable => {
        it(`respects unavailable ${picker} cells with allFocusable=${allFocusable}`, () => {
          const onSelectDate = cy.stub().as('onSelectDate');
          mountFluent(
            <Calendar
              today={today}
              defaultValue={today}
              layout="sideBySide"
              allFocusable={allFocusable}
              minDate={picker === 'month' ? new Date(2020, 1, 1) : new Date(2021, 0, 1)}
              monthPicker={{ yearPicker: { navigatedYear: 2020 } }}
              onSelectDate={onSelectDate}
            />,
          );
          openYearPicker();

          cy.get(cells).eq(1).focus().realPress('ArrowLeft');
          cy.get(cells)
            .eq(allFocusable ? 0 : 1)
            .should('be.focused');
          if (allFocusable) {
            cy.get(cells).eq(0).should('be.enabled').and('have.attr', 'aria-disabled', 'true').realPress('Enter');
            cy.get('@onSelectDate').should('not.have.been.called');
          }
        });
      });

      if (picker === 'year') {
        (['none', 'capture', 'bubble'] as const).forEach(phase => {
          it(
            phase === 'none'
              ? 'navigates after custom year content keydown'
              : `honors custom year content ${phase} cancellation`,
            () => {
              const onKeyDownCapture = cy.stub().callsFake((event: React.KeyboardEvent) => {
                if (phase === 'capture') {
                  event.preventDefault();
                }
              });
              const onKeyDown = cy.stub().callsFake((event: React.KeyboardEvent) => {
                if (phase === 'bubble') {
                  event.preventDefault();
                }
              });
              mountFluent(
                <Calendar
                  today={today}
                  defaultValue={today}
                  layout="sideBySide"
                  monthPicker={{
                    yearPicker: {
                      renderYear: year => (
                        <span
                          tabIndex={0}
                          title={`custom-year-${year}`}
                          onKeyDownCapture={onKeyDownCapture}
                          onKeyDown={onKeyDown}
                        >
                          {year}
                        </span>
                      ),
                    },
                  }}
                />,
              );
              openYearPicker();
              cy.get('[title="custom-year-2020"]').focus().realPress('ArrowRight');
              if (phase === 'none') {
                cy.get('[title="custom-year-2021"]').closest('[role="gridcell"]').should('be.focused');
              } else {
                cy.get('[title="custom-year-2020"]').should('be.focused');
              }
              cy.wrap(onKeyDownCapture).should('have.been.calledOnce');
              cy.wrap(onKeyDown).should('have.been.calledOnce');
            },
          );
        });
      }
    });

    it('keeps the month highlight on the navigated month', () => {
      mountFluent(<Calendar today={today} value={today} highlightSelectedMonth />);

      cy.get(`.${calendarMonthGridClassNames.cell}[data-selected]`).should('have.text', 'Sep');

      cy.get(nextMonth).click();

      cy.get(`.${calendarMonthGridClassNames.cell}[data-selected]`).should('have.text', 'Oct');
    });

    it('opens the year picker on the navigated year', () => {
      const december = new Date(2020, 11, 18);
      mountFluent(<Calendar today={december} value={december} />);

      cy.get(nextMonth).click();
      cy.get(`.${calendarMonthClassNames.heading}`).should('have.text', '2021').click();

      cy.get(`.${calendarYearGridClassNames.cell}[data-selected]`).should('have.text', '2021');
    });

    it('navigates the day grid when a month is picked', () => {
      mountFluent(<Calendar today={today} value={today} />);

      cy.get(`.${calendarMonthGridClassNames.cell}`).contains('Dec').click();

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
      cy.get(`.${calendarMonthGridClassNames.cell}`).contains('Sep').focus();
      cy.contains('button', 'Outside action').focus();
      cy.viewport(360, 800);
      cy.get(`.${calendarMonthClassNames.root}`).should('not.exist');
      cy.contains('button', 'Outside action').should('be.focused');
    });
  });
});
