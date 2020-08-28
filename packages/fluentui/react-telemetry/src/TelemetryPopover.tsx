import { useEventListener } from '@fluentui/react-component-event-listener';
import { ProviderContextPrepared, Telemetry, Unstable_FluentContextProvider } from '@fluentui/react-bindings';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as styles from './styles';
import { TelemetryTable } from './TelemetryTable';
import { useTelemetryState } from './useTelemetryState';
import { TelemetryPerfFlags } from './TelemetryPerfFlags';

export type TelemetryPopoverProps = {
  mountNode?: HTMLElement;
  hotKeyHandler?: (e: KeyboardEvent) => boolean;
};

function defaultHotKeyHandler(e: KeyboardEvent) {
  return e.altKey && e.shiftKey && e.code === 'KeyT';
}

export const TelemetryPopover: React.FC<TelemetryPopoverProps> = props => {
  const { children, hotKeyHandler = defaultHotKeyHandler, mountNode = document.body } = props;

  const telemetry = React.useMemo(() => new Telemetry(), []);
  const [state, dispatch] = useTelemetryState();

  useEventListener({
    listener: e => {
      if (state.visible) {
        return;
      }

      if (hotKeyHandler(e)) {
        dispatch({ type: 'SET_VISIBILITY', value: true });
      }
    },
    target: mountNode.ownerDocument || mountNode,
    type: 'keydown',
  });

  const outgoingContext = React.useMemo<Partial<ProviderContextPrepared>>(
    () => ({
      performance: state.performanceFlags,
      telemetry,
    }),
    [telemetry, state.performanceFlags],
  );

  return (
    <>
      <Unstable_FluentContextProvider value={outgoingContext as ProviderContextPrepared}>
        {children}
      </Unstable_FluentContextProvider>

      {state.visible &&
        ReactDOM.createPortal(
          <div style={styles.panel({ position: state.position })}>
            <div style={styles.controls()}>
              <div>
                <button onClick={() => dispatch({ type: 'SET_POSITION', value: 'top-left' })}>↖</button>
                <button onClick={() => dispatch({ type: 'SET_POSITION', value: 'top-right' })}>↗</button>
                <button onClick={() => dispatch({ type: 'SET_POSITION', value: 'bottom-left' })}>↙</button>
                <button onClick={() => dispatch({ type: 'SET_POSITION', value: 'bottom-right' })}>↘</button>
              </div>

              <button onClick={() => dispatch({ type: 'SET_VISIBILITY', value: false })}>✕</button>
            </div>

            {state.activeTab === 'telemetry' && (
              <TelemetryTable
                expand={state.tableExpand}
                componentFilter={state.tableComponentFilter}
                sort={state.tableSort}
                telemetry={telemetry}
                onComponentFilterChange={filter => dispatch({ type: 'SET_TABLE_COMPONENT_FILTER', value: filter })}
                onExpandChange={(name, show) => dispatch({ type: 'SET_TABLE_EXPAND', name, value: show })}
                onSortChange={value => dispatch({ type: 'SET_TABLE_SORT', value })}
              />
            )}
            {state.activeTab === 'performance-flags' && (
              <TelemetryPerfFlags
                flags={state.performanceFlags}
                onChange={(name, value) => dispatch({ type: 'SET_PERFORMANCE_FLAG', name, value })}
              />
            )}

            <div style={styles.tabs()}>
              <button
                style={styles.tab({ active: state.activeTab === 'telemetry' })}
                onClick={() => dispatch({ type: 'SET_TELEMETRY_TAB', tab: 'telemetry' })}
              >
                Telemetry data
              </button>
              <button
                style={styles.tab({ active: state.activeTab === 'performance-flags' })}
                onClick={() => dispatch({ type: 'SET_TELEMETRY_TAB', tab: 'performance-flags' })}
              >
                Performance flags
              </button>
            </div>
          </div>,
          mountNode,
        )}
    </>
  );
};
