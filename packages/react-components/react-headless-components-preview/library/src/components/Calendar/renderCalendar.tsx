/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import * as React from 'react';
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type {
  CalendarCellData,
  CalendarCellProps,
  CalendarPanelSlots,
  CalendarPanelState,
  CalendarRenderFunction,
  CalendarRowData,
  CalendarRowProps,
  CalendarSlots,
  CalendarState,
  CalendarWeekdayCellProps,
} from './Calendar.types';

const renderCell = ({ root, button, label, marker }: CalendarCellProps, cell: CalendarCellData): JSXElement => {
  const Cell = cell.type === 'day' ? 'td' : 'div';
  return (
    <Cell {...(root as {})}>
      <button {...button}>
        {button.children === undefined && label ? (
          <>
            <span {...label} />
            {marker && <span {...marker} />}
          </>
        ) : (
          button.children
        )}
      </button>
    </Cell>
  );
};

const renderRow = ({ root, weekNumber, children }: CalendarRowProps, row: CalendarRowData): JSXElement => {
  const Row = row.type === 'month' || row.type === 'year' ? 'div' : 'tr';
  return (
    <Row {...(root as {})}>
      {weekNumber && <th {...weekNumber} />}
      {children}
    </Row>
  );
};

const renderWeekdayCell = ({ root }: CalendarWeekdayCellProps): JSXElement => <th {...root} />;

/** Renders a repeated element with the consumer's render function, if any, otherwise with the built-in markup. */
const renderItem = <TProps, TData>(
  key: React.Key,
  props: TProps,
  data: TData,
  defaultRender: (props: TProps, data: TData) => JSXElement,
  customRender: CalendarRenderFunction<TProps, TData> | undefined,
): JSXElement => (
  <React.Fragment key={key}>
    {customRender ? customRender(props, data, nextProps => defaultRender(nextProps, data)) : defaultRender(props, data)}
  </React.Fragment>
);

const renderPanel = (state: CalendarState, panel: CalendarPanelState): JSXElement => {
  assertSlots<CalendarPanelSlots>(panel);

  // Rows are resolved only when rendered, so custom grid children skip the row and cell resolution.
  const rows =
    panel.grid.children === undefined
      ? panel.rows.map(row =>
          renderItem(
            row.key,
            {
              ...state.resolveRowProps(row),
              children:
                row.type === 'weekday'
                  ? row.cells.map(weekday =>
                      renderItem(
                        weekday.key,
                        state.resolveWeekdayCellProps(weekday),
                        weekday,
                        renderWeekdayCell,
                        state.renderWeekdayCell,
                      ),
                    )
                  : row.cells.map((cell: CalendarCellData) =>
                      renderItem(cell.key, state.resolveCellProps(cell), cell, renderCell, state.renderCell),
                    ),
            },
            row,
            renderRow,
            state.renderRow,
          ),
        )
      : undefined;

  return (
    <panel.root key={panel.view === 'day' ? 'day' : 'month'}>
      <panel.header>
        <panel.heading>
          {panel.heading.children === undefined ? <panel.headingLabel /> : panel.heading.children}
        </panel.heading>
        <panel.navigation>
          <panel.previousButton />
          <panel.nextButton />
          {panel.closeButton && <panel.closeButton />}
        </panel.navigation>
      </panel.header>
      <panel.grid>
        {!rows ? (
          panel.grid.children
        ) : panel.view === 'day' ? (
          // Each table section is optional; removing one removes its rows.
          <>
            {panel.gridHeader && <panel.gridHeader>{rows[0]}</panel.gridHeader>}
            {panel.gridBody && <panel.gridBody>{rows.slice(1)}</panel.gridBody>}
          </>
        ) : (
          rows
        )}
      </panel.grid>
    </panel.root>
  );
};

/**
 * Renders Calendar: the live region, each visible panel and the go-to-today button.
 */
export const renderCalendar = (state: CalendarState): JSXElement => {
  assertSlots<CalendarSlots>(state);
  const [first, second] = state.panels;

  return (
    <state.root>
      <state.liveRegion />
      {first && renderPanel(state, first)}
      {second && <state.divider />}
      {second && renderPanel(state, second)}
      {state.goToTodayButton && <state.goToTodayButton />}
    </state.root>
  );
};
