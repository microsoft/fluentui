import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import type { JSXElement } from '@fluentui/react-utilities';

import { Provider } from '../Provider';
import { Calendar } from './Calendar';

const mount = (element: JSXElement) => mountBase(<Provider>{element}</Provider>);
const today = new Date(2020, 8, 18);
const day = (label: string) => `td[role="gridcell"]:has(button[aria-label="${label}"])`;
const month = (label: string) => `[role="gridcell"][aria-label="${label}"]`;

describe('Calendar', () => {
  it('returns to today with six weeks and three month columns without changing selection', () => {
    const onSelectDate = cy.spy().as('onSelectDate');
    mount(
      <Calendar
        today={today}
        calendarMonthColumns={3}
        defaultValue={new Date(2020, 9, 4)}
        dayPicker={{ weeksToShow: 6 }}
        onSelectDate={onSelectDate}
      />,
    );

    cy.get('table thead tr').should('have.length', 1);
    cy.get('table tbody tr').should('have.length', 6);
    cy.get('div[role="grid"] [role="row"]').should('have.length', 4).children().should('have.length', 12);
    cy.contains('button', 'Go to today').should(button => {
      expect(button[0].parentElement?.lastElementChild).to.equal(button[0]);
    });
    cy.contains('button', 'Go to today').prev().find('div[role="grid"]').should('exist');
    cy.contains('button', 'Go to today').click();
    cy.get(day('September 18, 2020')).should('be.focused');
    cy.get('td[data-selected] button').should('have.attr', 'aria-label', 'October 4, 2020');
    cy.get('@onSelectDate').should('not.have.been.called');
  });

  // TODO: Enable focusgroup keyboard cases when V2 grid support from microsoft/polyfills#64 is published.
  describe.skip('focusgroup grid navigation (requires the V2 grid polyfill)', () => {
    it('navigates a day grid with week headers and unavailable dates', () => {
      mount(
        <Calendar
          today={today}
          value={today}
          showWeekNumbers
          monthPicker={null}
          restrictedDates={[new Date(2020, 8, 19)]}
        />,
      );

      cy.get(day('September 18, 2020')).focus().realPress('ArrowRight');
      cy.get(day('September 20, 2020')).should('be.focused');
      cy.get(day('September 19, 2020')).should('not.have.attr', 'tabindex');
      cy.realPress('ArrowDown');
      cy.get(day('September 27, 2020')).should('be.focused');
    });

    it('preserves disabled coordinates in the month grid', () => {
      mount(<Calendar today={today} value={today} dayPicker={null} minDate={new Date(2020, 4, 1)} />);

      cy.get(month('September')).focus().realPress('ArrowUp');
      cy.get(month('May')).should('be.focused').realPress('ArrowUp');
      cy.get(month('May')).should('be.focused');
      cy.get(month('January')).should('be.disabled');
    });
  });

  // TODO: Enable the remaining focusgroup V2-dependent cases when the compatible polyfill is published.
  it.skip('pages from the arrow-focused day and restores focus', () => {
    mount(<Calendar today={today} defaultValue={today} />);

    cy.get(day('September 18, 2020')).focus().realPress('ArrowDown');
    cy.get(day('September 25, 2020')).should('be.focused').realPress('PageDown');
    cy.get(day('October 25, 2020')).should('be.focused');
  });

  it.skip('navigates the month grid in both dimensions', () => {
    mount(<Calendar today={today} value={today} layout="overlay" />);

    cy.get('button[aria-label="September 2020, change month"]').click();
    cy.get(month('September')).should('be.focused').realPress('ArrowRight');
    cy.get(month('October')).should('be.focused').realPress('ArrowUp');
    cy.get(month('June')).should('be.focused');
  });

  it.skip('opens and navigates the year grid', () => {
    mount(<Calendar today={today} value={today} />);

    cy.get('button[aria-label="2020, change year"]').click();
    cy.contains('[role="gridcell"]', '2020').should('be.focused').realPress('ArrowDown');
    cy.contains('[role="gridcell"]', '2024').should('be.focused').realPress('ArrowRight');
    cy.contains('[role="gridcell"]', '2025').should('be.focused');
  });

  it.skip('skips restricted dates in the day grid', () => {
    mount(<Calendar today={today} value={today} restrictedDates={[new Date(2020, 8, 19)]} monthPicker={null} />);

    cy.get(day('September 18, 2020')).focus().realPress('ArrowRight');
    cy.get(day('September 20, 2020')).should('be.focused');
  });

  it.skip('does not wrap the month grid at a horizontal row boundary', () => {
    mount(<Calendar today={today} value={today} dayPicker={null} />);

    cy.get(month('April')).focus().realPress('ArrowRight');
    cy.get(month('April')).should('be.focused').realPress('ArrowDown');
    cy.get(month('August')).should('be.focused').realPress('ArrowRight');
    cy.get(month('August')).should('be.focused');
  });

  it.skip('does not wrap the year grid at a horizontal row boundary', () => {
    mount(<Calendar today={today} value={today} dayPicker={null} />);
    cy.get('button[aria-label="2020, change year"]').click();

    cy.contains('[role="gridcell"]', '2023').focus().realPress('ArrowRight');
    cy.contains('[role="gridcell"]', '2023').should('be.focused').realPress('ArrowDown');
    cy.contains('[role="gridcell"]', '2027').should('be.focused').realPress('ArrowRight');
    cy.contains('[role="gridcell"]', '2027').should('be.focused');
  });

  ([3, 4] as const).forEach(columns => {
    (['ltr', 'rtl'] as const).forEach(dir => {
      it.skip(`uses ${columns} columns for month and year navigation in ${dir}`, () => {
        mount(
          <div dir={dir}>
            <Provider dir={dir}>
              <Calendar
                today={today}
                value={today}
                dayPicker={null}
                calendarMonthColumns={columns}
                calendarYearColumns={columns}
              />
            </Provider>
          </div>,
        );
        const next = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
        const checkGrid = () => {
          cy.get('[role="row"]').should('have.length', 12 / columns);
          cy.get('[role="row"]').each(row => expect(row.children()).to.have.length(columns));
          cy.get('[role="gridcell"]').eq(0).focus().realPress(next);
          cy.get('[role="gridcell"]').eq(1).should('be.focused').realPress('ArrowDown');
          cy.get('[role="gridcell"]')
            .eq(1 + columns)
            .should('be.focused');
          cy.get('[role="gridcell"]')
            .eq(columns - 1)
            .focus()
            .realPress(next);
          cy.get('[role="gridcell"]')
            .eq(columns - 1)
            .should('be.focused')
            .realPress('ArrowDown');
          cy.get('[role="gridcell"]')
            .eq(columns * 2 - 1)
            .should('be.focused');
        };
        checkGrid();
        cy.get('button[aria-label="2020, change year"]').click();
        checkGrid();
      });
    });
  });

  (['day', 'month', 'year'] as const).forEach(picker => {
    it.skip(`honors RTL arrows in the ${picker} grid`, () => {
      mount(
        <div dir="rtl">
          <Provider dir="rtl">
            <Calendar
              today={today}
              value={today}
              dayPicker={picker === 'day' ? undefined : null}
              monthPicker={picker === 'day' ? null : undefined}
            />
          </Provider>
        </div>,
      );
      if (picker === 'year') {
        cy.get('button[aria-label="2020, change year"]').click();
      }
      cy.get('[role="grid"]').should('have.css', 'direction', 'rtl');

      if (picker === 'day') {
        cy.get(day('September 18, 2020')).focus().realPress('ArrowLeft');
        cy.get(day('September 19, 2020')).should('be.focused');
      } else if (picker === 'month') {
        cy.get(month('September')).focus().realPress('ArrowLeft');
        cy.get(month('October')).should('be.focused');
      } else {
        cy.contains('[role="gridcell"]', '2020').focus().realPress('ArrowLeft');
        cy.contains('[role="gridcell"]', '2021').should('be.focused');
      }
    });

    it.skip(`honors capture cancellation without an intermediate focus hop in the ${picker} grid`, () => {
      const onFocus = cy.spy().as('onFocus');
      const onKeyDownCapture = cy
        .spy((event: React.KeyboardEvent<HTMLElement>) => event.preventDefault())
        .as('onKeyDownCapture');
      mount(
        <Calendar
          today={today}
          value={today}
          onFocus={onFocus}
          dayPicker={picker === 'day' ? { grid: { onKeyDownCapture } } : null}
          monthPicker={
            picker === 'day'
              ? null
              : picker === 'month'
              ? { grid: { onKeyDownCapture } }
              : { yearPicker: { grid: { onKeyDownCapture } } }
          }
        />,
      );
      if (picker === 'year') {
        cy.get('button[aria-label="2020, change year"]').click();
      }

      if (picker === 'day') {
        cy.get(day('September 18, 2020')).focus();
      } else if (picker === 'month') {
        cy.get(month('September')).focus();
      } else {
        cy.contains('[role="gridcell"]', '2020').focus();
      }
      cy.then(() => onFocus.resetHistory());
      cy.realPress('ArrowRight');
      cy.get('@onKeyDownCapture').should('have.been.calledOnce');
      cy.get('@onFocus').should('not.have.been.called');
      if (picker === 'day') {
        cy.get(day('September 18, 2020')).should('be.focused');
      } else if (picker === 'month') {
        cy.get(month('September')).should('be.focused');
      } else {
        cy.contains('[role="gridcell"]', '2020').should('be.focused');
      }
    });
  });

  [false, true].forEach(allFocusable => {
    it.skip(`preserves disabled month coordinates with allFocusable=${allFocusable}`, () => {
      const onSelectDate = cy.spy().as('onSelectDate');
      mount(
        <Calendar
          today={today}
          value={today}
          dayPicker={null}
          minDate={new Date(2020, 4, 1)}
          allFocusable={allFocusable}
          onSelectDate={onSelectDate}
        />,
      );

      cy.get(month('September')).focus().realPress('ArrowUp');
      cy.get(month('May')).should('be.focused').realPress('ArrowUp');
      cy.get(month(allFocusable ? 'January' : 'May')).should('be.focused');
      if (allFocusable) {
        cy.get(month('January')).should('have.attr', 'aria-disabled', 'true').realPress('Enter');
        cy.get('@onSelectDate').should('not.have.been.called');
        cy.get(month('January')).should('be.focused');
      }
    });

    it.skip(`preserves disabled year coordinates with allFocusable=${allFocusable}`, () => {
      const onSelectDate = cy.spy().as('onSelectDate');
      mount(
        <Calendar
          today={today}
          value={new Date(2024, 0, 1)}
          dayPicker={null}
          monthPicker={{ yearPicker: { navigatedYear: 2020 } }}
          minDate={new Date(2022, 0, 1)}
          allFocusable={allFocusable}
          onSelectDate={onSelectDate}
        />,
      );
      cy.get('button[aria-label="2024, change year"]').click();

      cy.contains('[role="gridcell"]', '2024').focus().realPress('ArrowDown');
      cy.contains('[role="gridcell"]', '2028').should('be.focused').realPress('ArrowUp');
      cy.contains('[role="gridcell"]', '2024').should('be.focused').realPress('ArrowUp');
      cy.contains('[role="gridcell"]', allFocusable ? '2020' : '2024').should('be.focused');
      if (allFocusable) {
        cy.contains('[role="gridcell"]', '2020').should('have.attr', 'aria-disabled', 'true').realPress('Enter');
        cy.get('@onSelectDate').should('not.have.been.called');
        cy.get('button[aria-label="2020 - 2031, change year"]').should('exist');
        cy.contains('[role="gridcell"]', '2020').should('be.focused');
      }
    });
  });

  [false, true].forEach(handlesArrow => {
    it.skip(`leaves arrows to a nested toolbar with custom navigation=${handlesArrow}`, () => {
      mount(
        <Calendar
          today={today}
          value={today}
          monthPicker={null}
          dayPicker={{
            getCellProps: dayInfo =>
              dayInfo.originalDate?.getTime() === today.getTime()
                ? {
                    button: {
                      children: (
                        <span
                          role="toolbar"
                          onKeyDown={event => {
                            if (handlesArrow && event.key === 'ArrowRight') {
                              event.currentTarget.querySelector<HTMLElement>('[data-testid="nested-second"]')?.focus();
                            }
                          }}
                        >
                          <span tabIndex={0} data-testid="nested-first">
                            First
                          </span>
                          <span tabIndex={0} data-testid="nested-second">
                            Second
                          </span>
                        </span>
                      ),
                    },
                  }
                : {},
          }}
        />,
      );

      cy.get('[data-testid="nested-first"]').focus().realPress('ArrowRight');

      cy.get(handlesArrow ? '[data-testid="nested-second"]' : '[data-testid="nested-first"]').should('be.focused');
    });
  });

  (['day', 'month', 'year'] as const).forEach(picker => {
    it.skip(`has one Tab entry/exit and remembered reentry in the ${picker} grid`, () => {
      mount(
        <>
          <Calendar
            today={today}
            value={today}
            dayPicker={picker === 'day' ? undefined : null}
            monthPicker={picker === 'day' ? null : undefined}
            goToTodayButton={null}
          />
          <button>After</button>
        </>,
      );
      if (picker === 'year') {
        cy.get('button[aria-label="2020, change year"]').click();
      }

      cy.get('[role="grid"]').prev().find('button').last().focus().realPress('Tab');
      cy.focused().should('have.attr', 'role', 'gridcell');
      cy.get('[role="grid"] [role="gridcell"][tabindex="0"]').should('have.length', 1);
      if (picker === 'day') {
        cy.get(day('September 18, 2020')).should('be.focused');
      } else if (picker === 'month') {
        cy.get(month('September')).should('be.focused');
      } else {
        cy.contains('[role="gridcell"]', '2020').should('be.focused');
      }

      if (picker === 'day') {
        cy.get(day('September 18, 2020')).focus().realPress('ArrowRight');
        cy.get(day('September 19, 2020')).should('be.focused').realPress('Tab');
      } else if (picker === 'month') {
        cy.get(month('September')).focus().realPress('ArrowRight');
        cy.get(month('October')).should('be.focused').realPress('Tab');
      } else {
        cy.contains('[role="gridcell"]', '2020').focus().realPress('ArrowRight');
        cy.contains('[role="gridcell"]', '2021').should('be.focused').realPress('Tab');
      }

      cy.contains('button', 'After').should('be.focused').realPress(['Shift', 'Tab']);
      if (picker === 'day') {
        cy.get(day('September 19, 2020')).should('be.focused');
      } else if (picker === 'month') {
        cy.get(month('October')).should('be.focused');
      } else {
        cy.contains('[role="gridcell"]', '2021').should('be.focused');
      }
    });
  });

  (['ltr', 'rtl'] as const).forEach(dir => {
    it.skip(`changes the displayed month when an arrow reaches an adjacent-month date in ${dir}`, () => {
      const onSelectDate = cy.spy().as('onSelectDate');
      mount(
        <div dir={dir}>
          <Provider dir={dir}>
            <Calendar today={today} value={today} monthPicker={null} onSelectDate={onSelectDate} />
          </Provider>
        </div>,
      );
      cy.get(day('September 30, 2020'))
        .focus()
        .realPress(dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight');
      cy.get(day('October 1, 2020')).should('be.focused');
      cy.get('table[role="grid"]')
        .should('have.attr', 'aria-label')
        .and('match', /^October 2020,/);
      cy.realPress(dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft');
      cy.get(day('September 30, 2020')).should('be.focused');
      cy.get('table[role="grid"]')
        .should('have.attr', 'aria-label')
        .and('match', /^September 2020,/);
      cy.get('@onSelectDate').should('not.have.been.called');
    });

    it.skip(`pages in both directions across the visible day-grid boundary in ${dir} without selecting`, () => {
      const onSelectDate = cy.spy().as('onSelectDate');
      mount(
        <div dir={dir}>
          <Provider dir={dir}>
            <Calendar today={today} value={today} monthPicker={null} onSelectDate={onSelectDate} />
          </Provider>
        </div>,
      );

      cy.get('[role="grid"]').should('have.css', 'direction', dir);
      cy.get(day('October 3, 2020'))
        .focus()
        .realPress(dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight');
      cy.get(day('October 4, 2020')).should('be.focused');
      cy.get(day('September 27, 2020'))
        .focus()
        .realPress(dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft');
      cy.get(day('September 26, 2020')).should('be.focused');
      cy.get('@onSelectDate').should('not.have.been.called');
    });
  });

  (['day', 'month', 'year'] as const).forEach(picker => {
    it.skip(`uses Home/End to reach eligible boundaries in the ${picker} grid without selecting`, () => {
      const onSelectDate = cy.spy().as('onSelectDate');
      mount(
        <Calendar
          today={today}
          value={picker === 'year' ? new Date(2024, 0, 1) : today}
          dayPicker={picker === 'day' ? undefined : null}
          monthPicker={
            picker === 'day' ? null : picker === 'year' ? { yearPicker: { navigatedYear: 2020 } } : undefined
          }
          minDate={picker === 'month' ? new Date(2020, 4, 1) : picker === 'year' ? new Date(2022, 0, 1) : undefined}
          maxDate={picker === 'month' ? new Date(2020, 9, 31) : picker === 'year' ? new Date(2028, 11, 31) : undefined}
          restrictedDates={picker === 'day' ? [new Date(2020, 8, 13), new Date(2020, 8, 19)] : undefined}
          onSelectDate={onSelectDate}
        />,
      );
      if (picker === 'day') {
        cy.get(day('September 18, 2020')).focus().realPress('Home');
        cy.get(day('September 14, 2020')).should('be.focused').realPress('End');
        cy.get(day('September 18, 2020')).should('be.focused');
      } else if (picker === 'month') {
        cy.get(month('September')).focus().realPress('Home');
        cy.get(month('May')).should('be.focused').realPress('End');
        cy.get(month('October')).should('be.focused');
      } else {
        cy.get('button[aria-label="2024, change year"]').click();
        cy.contains('[role="gridcell"]', '2024').focus().realPress('Home');
        cy.contains('[role="gridcell"]', '2022').should('be.focused').realPress('End');
        cy.contains('[role="gridcell"]', '2028').should('be.focused');
      }
      cy.get('[role="grid"] [role="gridcell"][tabindex="0"]').should('have.length', 1);
      cy.get('@onSelectDate').should('not.have.been.called');
    });
  });

  it.skip('skips a fully restricted month horizontally without collapsing its coordinate', () => {
    mount(
      <Calendar
        today={today}
        value={new Date(2020, 0, 18)}
        dayPicker={null}
        restrictedDates={Array.from({ length: 29 }, (_, index) => new Date(2020, 1, index + 1))}
      />,
    );
    cy.get(month('February')).should('be.disabled');
    cy.get(month('January')).focus().realPress('ArrowRight');
    cy.get(month('March')).should('be.focused').realPress('ArrowDown');
    cy.get(month('July')).should('be.focused');
  });

  it.skip('can focus but cannot select a restricted day with allFocusable', () => {
    const onSelectDate = cy.spy().as('onSelectDate');
    mount(
      <Calendar
        today={today}
        value={today}
        allFocusable
        restrictedDates={[new Date(2020, 8, 19)]}
        onSelectDate={onSelectDate}
      />,
    );
    cy.get(day('September 18, 2020')).focus().realPress('ArrowRight');
    cy.get(day('September 19, 2020')).should('be.focused').and('have.attr', 'aria-disabled', 'true');
    cy.realPress('Enter');
    cy.realPress('Space');
    cy.get('@onSelectDate').should('not.have.been.called');
  });

  it.skip('can focus visible out-of-bounds days without paging beyond the bounds with allFocusable', () => {
    const onDisplayedDateChange = cy.spy().as('onDisplayedDateChange');
    const onSelectDate = cy.spy().as('onSelectDate');
    mount(
      <Calendar
        today={today}
        value={today}
        allFocusable
        minDate={new Date(2020, 8, 1)}
        maxDate={new Date(2020, 8, 30)}
        onDisplayedDateChange={onDisplayedDateChange}
        onSelectDate={onSelectDate}
      />,
    );
    cy.get(day('September 30, 2020')).focus().realPress('ArrowRight');
    cy.get(day('October 1, 2020')).should('be.focused').and('have.attr', 'aria-disabled', 'true');
    cy.realPress('Enter');
    cy.get('@onSelectDate').should('not.have.been.called');
    cy.get('@onDisplayedDateChange').should('not.have.been.called');
  });

  it.skip('omits an all-unavailable day grid from the Tab order without trapping focus', () => {
    mount(
      <>
        <Calendar
          today={today}
          value={today}
          monthPicker={null}
          goToTodayButton={null}
          restrictedDates={Array.from({ length: 35 }, (_, index) => new Date(2020, 7, 30 + index))}
        />
        <button>After</button>
      </>,
    );
    cy.get('table [role="gridcell"][tabindex="0"]').should('not.exist');
    cy.get('button[title="Next month October"]').focus().realPress('Tab');
    cy.contains('button', 'After').should('be.focused');
  });

  it('pages from the focused day and restores focus', () => {
    mount(<Calendar today={today} defaultValue={today} />);

    cy.get(day('September 25, 2020')).focus().realPress('PageDown');
    cy.get(day('October 25, 2020')).should('be.focused');
  });

  it('restores focus when a consumer layout change removes the focused month picker', () => {
    mount(<Calendar today={today} value={today} layout="sideBySide" />).then(({ rerender }) => {
      cy.get(month('March')).focus();
      cy.then(() =>
        rerender(
          <Provider>
            <Calendar today={today} value={today} layout="overlay" />
          </Provider>,
        ),
      );

      cy.get(month('March')).should('not.exist');
      cy.get(day('September 18, 2020')).should('be.focused');
    });
  });

  it('does not reclaim focus moved outside before the month picker is removed', () => {
    mount(
      <>
        <Calendar today={today} value={today} layout="sideBySide" />
        <button>Outside</button>
      </>,
    ).then(({ rerender }) => {
      cy.get(month('March')).focus();
      cy.contains('button', 'Outside').focus();
      cy.then(() =>
        rerender(
          <Provider>
            <>
              <Calendar today={today} value={today} layout="overlay" />
              <button>Outside</button>
            </>
          </Provider>,
        ),
      );

      cy.get(month('March')).should('not.exist');
      cy.contains('button', 'Outside').should('be.focused');
    });
  });

  it('selects a month once with native Enter activation', () => {
    const onSelectDate = cy.stub().as('onSelectDate');
    mount(
      <Calendar
        today={today}
        defaultValue={null}
        defaultDisplayedDate={today}
        dayPicker={null}
        dateRangeType="month"
        onSelectDate={onSelectDate}
      />,
    );

    cy.get(month('October')).find('button').focus().realPress('Enter');

    cy.get('@onSelectDate').should('have.been.calledOnce');
    cy.get(month('October')).should('have.attr', 'aria-selected', 'true');
  });
});
