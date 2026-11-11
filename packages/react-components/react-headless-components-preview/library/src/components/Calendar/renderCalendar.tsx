/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarPanelSlots, CalendarPanelState, CalendarSlots, CalendarState } from './Calendar.types';

const renderPanel = (state: CalendarState, panel: CalendarPanelState) => {
  assertSlots<CalendarPanelSlots>(panel);
  const isDay = panel.view === 'day';
  const Row = isDay ? 'tr' : 'div';
  const Cell = isDay ? 'td' : 'div';

  // Rows are resolved only when rendered, so custom grid children skip the cell and row getters.
  const hasCustomGrid = panel.grid.children !== undefined;
  const rows = (hasCustomGrid ? [] : panel.rows).map(row => {
    const rowProps = state.resolveRowProps(row);
    return (
      <Row key={row.key} {...rowProps.root}>
        {rowProps.weekNumber && <th {...rowProps.weekNumber} />}
        {row.type === 'weekday'
          ? row.cells.map(cell => <th key={cell.key} {...state.resolveWeekdayCellProps(cell)} />)
          : row.cells.map(cell => {
              const cellProps = state.resolveCellProps(cell);
              return (
                <Cell key={cell.key} {...(cellProps.root as {})}>
                  {cellProps.label ? (
                    <button {...cellProps.button}>
                      {cellProps.button.children !== undefined ? (
                        cellProps.button.children
                      ) : (
                        <>
                          <span {...cellProps.label} />
                          {cellProps.marker && <span {...cellProps.marker} />}
                        </>
                      )}
                    </button>
                  ) : (
                    <button {...cellProps.button} />
                  )}
                </Cell>
              );
            })}
      </Row>
    );
  });

  return (
    <panel.root key={panel.view === 'day' ? 'day' : 'month'}>
      <panel.header>
        <panel.heading />
        <panel.navigation>
          <panel.previousButton />
          <panel.nextButton />
          {panel.closeButton && <panel.closeButton />}
        </panel.navigation>
      </panel.header>
      <panel.grid>
        {hasCustomGrid ? (
          panel.grid.children
        ) : isDay ? (
          <>
            <thead>{rows[0]}</thead>
            <tbody>{rows.slice(1)}</tbody>
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
