import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { polyfillBodyAndObserve } from '@microsoft/focusgroup-polyfill';
import type { JSXElement, SlotRenderFunction } from '@fluentui/react-utilities';

import { Provider } from '../Provider';
import { Calendar } from './Calendar';
import type { CalendarDayHandle } from './CalendarDay';
import type { CalendarMonthHandle } from './CalendarMonth';
import type { CalendarYearHandle } from './CalendarYear';

polyfillBodyAndObserve();

const mount = (element: JSXElement) => mountBase(<Provider>{element}</Provider>);
const today = new Date(2020, 8, 18);
const day = (label: string) => `td[role="gridcell"]:has(button[aria-label="${label}"])`;
const month = (label: string) => `button[role="gridcell"][aria-label="${label}"]`;

describe('Calendar', () => {
  beforeEach(() => {
    const mode = Cypress.env('focusgroup');
    cy.document().then(doc => {
      const element = doc.createElement('div');
      const hasNativeFocusgroup = 'focusGroup' in element || 'focusgroup' in element;
      if (mode === 'native') {
        expect(hasNativeFocusgroup, 'native V1 focusgroup enabled').to.equal(true);
      } else if (mode === 'polyfill') {
        expect(hasNativeFocusgroup, 'native focusgroup disabled for the actual polyfill').to.equal(false);
      }
    });
  });

  it('pages from the arrow-focused day and restores focus with a consumer ref', () => {
    const dayRef = React.createRef<CalendarDayHandle>();
    mount(<Calendar today={today} defaultValue={today} dayPicker={{ ref: dayRef }} />);

    cy.get(day('September 18, 2020')).focus().realPress('ArrowDown');
    cy.get(day('September 25, 2020')).should('be.focused').realPress('PageDown');
    cy.get(day('October 25, 2020')).should('be.focused');
    cy.then(() => expect(dayRef.current?.focus).to.be.a('function'));
  });

  it('navigates the month grid in both dimensions with a consumer ref', () => {
    const monthRef = React.createRef<CalendarMonthHandle>();
    mount(<Calendar today={today} value={today} layout="overlay" monthPicker={{ ref: monthRef }} />);

    cy.get('button[aria-label="September 2020, change month"]').click();
    cy.get(month('September')).should('be.focused').realPress('ArrowRight');
    cy.get(month('October')).should('be.focused').realPress('ArrowUp');
    cy.get(month('June')).should('be.focused');
    cy.then(() => expect(monthRef.current?.focus).to.be.a('function'));
  });

  it('opens and navigates the year grid with a consumer ref', () => {
    const yearRef = React.createRef<CalendarYearHandle>();
    mount(<Calendar today={today} value={today} monthPicker={{ yearPicker: { ref: yearRef } }} />);

    cy.get('button[aria-label="2020, change year"]').click();
    cy.contains('button[role="gridcell"]', '2020').should('be.focused').realPress('ArrowDown');
    cy.contains('button[role="gridcell"]', '2024').should('be.focused').realPress('ArrowRight');
    cy.contains('button[role="gridcell"]', '2025').should('be.focused');
    cy.then(() => expect(yearRef.current?.focus).to.be.a('function'));
  });

  it('skips restricted dates and crosses the visible day-grid boundary', () => {
    mount(<Calendar today={today} value={today} restrictedDates={[new Date(2020, 8, 19)]} monthPicker={null} />);

    cy.get(day('September 18, 2020')).focus().realPress('ArrowRight');
    cy.get(day('September 20, 2020')).should('be.focused');
    cy.get(day('October 3, 2020')).focus().realPress('ArrowRight');
    cy.get(day('October 4, 2020')).should('be.focused');
  });

  it('does not wrap the month grid at a horizontal row boundary', () => {
    mount(<Calendar today={today} value={today} dayPicker={null} />);

    cy.get(month('April')).focus().realPress('ArrowRight');
    cy.get(month('April')).should('be.focused').realPress('ArrowDown');
    cy.get(month('August')).should('be.focused').realPress('ArrowRight');
    cy.get(month('August')).should('be.focused');
  });

  it('does not wrap the year grid at a horizontal row boundary', () => {
    mount(<Calendar today={today} value={today} dayPicker={null} />);
    cy.get('button[aria-label="2020, change year"]').click();

    cy.contains('button[role="gridcell"]', '2023').focus().realPress('ArrowRight');
    cy.contains('button[role="gridcell"]', '2023').should('be.focused').realPress('ArrowDown');
    cy.contains('button[role="gridcell"]', '2027').should('be.focused').realPress('ArrowRight');
    cy.contains('button[role="gridcell"]', '2027').should('be.focused');
  });

  (['day', 'month', 'year'] as const).forEach(picker => {
    it(`honors RTL arrows in the ${picker} grid`, () => {
      mount(
        <Provider dir="rtl">
          <Calendar
            today={today}
            value={today}
            dayPicker={picker === 'day' ? undefined : null}
            monthPicker={picker === 'day' ? null : undefined}
          />
        </Provider>,
      );
      if (picker === 'year') {
        cy.get('button[aria-label="2020, change year"]').click();
      }

      if (picker === 'day') {
        cy.get(day('September 18, 2020')).focus().realPress('ArrowLeft');
        cy.get(day('September 19, 2020')).should('be.focused');
      } else if (picker === 'month') {
        cy.get(month('September')).focus().realPress('ArrowLeft');
        cy.get(month('October')).should('be.focused');
      } else {
        cy.contains('button[role="gridcell"]', '2020').focus().realPress('ArrowLeft');
        cy.contains('button[role="gridcell"]', '2021').should('be.focused');
      }
    });

    it(`honors capture cancellation without an intermediate focus hop in the ${picker} grid`, () => {
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
        cy.contains('button[role="gridcell"]', '2020').focus();
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
        cy.contains('button[role="gridcell"]', '2020').should('be.focused');
      }
    });
  });

  [false, true].forEach(allFocusable => {
    it(`preserves disabled month coordinates with allFocusable=${allFocusable}`, () => {
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

    it(`preserves disabled year coordinates with allFocusable=${allFocusable}`, () => {
      mount(
        <Calendar
          today={today}
          value={new Date(2024, 0, 1)}
          dayPicker={null}
          monthPicker={{ yearPicker: { navigatedYear: 2020 } }}
          minDate={new Date(2022, 0, 1)}
          allFocusable={allFocusable}
        />,
      );
      cy.get('button[aria-label="2024, change year"]').click();

      cy.contains('button[role="gridcell"]', '2024').focus().realPress('ArrowUp');
      cy.contains('button[role="gridcell"]', allFocusable ? '2020' : '2024').should('be.focused');
      if (allFocusable) {
        cy.contains('button[role="gridcell"]', '2020').should('have.attr', 'aria-disabled', 'true').realPress('Enter');
        cy.get('button[aria-label="2020 - 2031, change year"]').should('exist');
        cy.contains('button[role="gridcell"]', '2020').should('be.focused');
      }
    });
  });

  (['toolbar inline', 'none'] as const).forEach(focusgroup => {
    it(`leaves arrows to a nested ${focusgroup} focusgroup`, () => {
      const renderDayButton: SlotRenderFunction<React.ComponentProps<'button'>> = (_Component, props) => (
        <span id={props.id} aria-label={props['aria-label']}>
          <span role="toolbar" focusgroup={focusgroup}>
            <span tabIndex={0} data-testid="nested-first">
              First
            </span>
            <span tabIndex={0} data-testid="nested-second">
              Second
            </span>
          </span>
        </span>
      );

      mount(
        <Calendar
          today={today}
          value={today}
          monthPicker={null}
          dayPicker={{
            getDayCellProps: date =>
              date.getTime() === today.getTime()
                ? {
                    button: {
                      children: renderDayButton,
                    },
                  }
                : {},
          }}
        />,
      );

      cy.get('[data-testid="nested-first"]').focus().realPress('ArrowRight');

      cy.get(focusgroup === 'none' ? '[data-testid="nested-first"]' : '[data-testid="nested-second"]').should(
        'be.focused',
      );
    });
  });

  (['day', 'month', 'year'] as const).forEach(picker => {
    it(`has one Tab entry/exit and remembered reentry in the ${picker} grid`, () => {
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

      if (picker === 'day') {
        cy.get(day('September 18, 2020')).focus().realPress('ArrowRight');
        cy.get(day('September 19, 2020')).should('be.focused').realPress('Tab');
      } else if (picker === 'month') {
        cy.get(month('September')).focus().realPress('ArrowRight');
        cy.get(month('October')).should('be.focused').realPress('Tab');
      } else {
        cy.contains('button[role="gridcell"]', '2020').focus().realPress('ArrowRight');
        cy.contains('button[role="gridcell"]', '2021').should('be.focused').realPress('Tab');
      }

      cy.contains('button', 'After').should('be.focused').realPress(['Shift', 'Tab']);
      if (picker === 'day') {
        cy.get(day('September 19, 2020')).should('be.focused');
      } else if (picker === 'month') {
        cy.get(month('October')).should('be.focused');
      } else {
        cy.contains('button[role="gridcell"]', '2021').should('be.focused');
      }
    });
  });

  it('restores focus when resizing removes the focused month picker', () => {
    cy.viewport(1000, 700);
    mount(<Calendar today={today} value={today} layout="auto" />);

    cy.get(month('March')).focus();
    cy.viewport(400, 700);

    cy.get(month('March')).should('not.exist');
    cy.get(day('September 18, 2020')).should('be.focused');
  });

  it('does not reclaim focus moved outside before the month picker is removed', () => {
    cy.viewport(1000, 700);
    mount(
      <>
        <Calendar today={today} value={today} layout="auto" />
        <button>Outside</button>
      </>,
    );

    cy.get(month('March')).focus();
    cy.contains('button', 'Outside').focus();
    cy.viewport(400, 700);

    cy.get(month('March')).should('not.exist');
    cy.contains('button', 'Outside').should('be.focused');
  });

  it('selects a month when the day picker is null', () => {
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

    cy.get('table[role="grid"]').should('not.exist');
    cy.get(month('October')).focus().realPress('Enter');

    cy.get('@onSelectDate').should('have.been.calledOnce');
    cy.get('@onSelectDate').its('firstCall.args.1.date').should('deep.equal', new Date(2020, 9, 18));
    cy.get(month('October')).should('have.attr', 'aria-selected', 'true');
    cy.get('table[role="grid"]').should('not.exist');
  });

  it('renders only the day picker when the month picker is null', () => {
    mount(<Calendar today={today} value={today} monthPicker={null} layout="overlay" />);

    cy.get('[role="grid"]').should('have.length', 1);
    cy.get('button[aria-label="September 2020, change month"]').should('not.exist');
    cy.get(day('September 18, 2020')).focus().realPress('Enter');
    cy.get(day('September 18, 2020')).should('have.attr', 'aria-selected', 'true');
  });
});
