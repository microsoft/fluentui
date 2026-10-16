import * as React from 'react';
import { Button, Tooltip, mergeClasses, useId } from '@fluentui/react-components';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import {
  ChevronDownRegular,
  ChevronRightRegular,
  DeleteRegular,
  ErrorCircleRegular,
  InfoRegular,
  WarningRegular,
} from '@fluentui/react-icons';

import { countConsoleEntries, type ConsoleEntry } from './consoleEntries';
import { useConsolePanelStyles } from './ConsolePanel.styles';

export interface ConsolePanelProps {
  entries: readonly ConsoleEntry[];
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  onClear: () => void;
}

const levelIcon = (level: ConsoleEntry['level']) => {
  switch (level) {
    case 'error':
      return <ErrorCircleRegular />;
    case 'warn':
      return <WarningRegular />;
    case 'info':
      return <InfoRegular />;
    default:
      return null;
  }
};

/**
 * Collapsible list of `console` output forwarded from the preview sandbox.
 */
export const ConsolePanel = React.forwardRef<HTMLDivElement, ConsolePanelProps>((props, ref) => {
  const { entries, expanded, onExpandedChange, onClear } = props;
  const styles = useConsolePanelStyles();
  const bodyId = useId('playground-console');
  const bodyRef = React.useRef<HTMLUListElement | null>(null);
  const errors = countConsoleEntries(entries, 'error');
  const warnings = countConsoleEntries(entries, 'warn');
  const total = entries.reduce((sum, entry) => sum + entry.count, 0);

  const handleToggle = React.useCallback(() => onExpandedChange(!expanded), [expanded, onExpandedChange]);

  useIsomorphicLayoutEffect(() => {
    const body = bodyRef.current;
    if (expanded && body) {
      body.scrollTop = body.scrollHeight;
    }
  }, [entries, expanded]);

  return (
    <div ref={ref} className={styles.root}>
      <div className={styles.header}>
        <Button
          appearance="transparent"
          size="small"
          className={styles.toggle}
          icon={expanded ? <ChevronDownRegular /> : <ChevronRightRegular />}
          aria-expanded={expanded}
          aria-controls={bodyId}
          onClick={handleToggle}
        >
          Console
          <span className={styles.counts}>
            {errors > 0 ? (
              <span className={styles.countError}>
                {errors} {errors === 1 ? 'error' : 'errors'}
              </span>
            ) : null}
            {warnings > 0 ? (
              <span className={styles.countWarn}>
                {warnings} {warnings === 1 ? 'warning' : 'warnings'}
              </span>
            ) : null}
            {errors === 0 && warnings === 0 && total > 0 ? (
              <span>
                {total} {total === 1 ? 'message' : 'messages'}
              </span>
            ) : null}
          </span>
        </Button>
        <Tooltip content="Clear console" relationship="label">
          <Button
            appearance="subtle"
            size="small"
            icon={<DeleteRegular />}
            disabled={entries.length === 0}
            onClick={onClear}
          />
        </Tooltip>
      </div>
      {expanded ? (
        <ul ref={bodyRef} id={bodyId} className={styles.body} role="log" aria-label="Console output">
          {entries.length === 0 ? (
            <li className={styles.empty}>Output from console.log and friends appears here.</li>
          ) : (
            entries.map(entry => (
              <li
                key={entry.id}
                className={mergeClasses(
                  styles.entry,
                  entry.level === 'error' && styles.entryError,
                  entry.level === 'warn' && styles.entryWarn,
                )}
              >
                <span className={styles.icon} aria-label={entry.level}>
                  {levelIcon(entry.level)}
                </span>
                <pre className={styles.message}>{entry.message}</pre>
                {entry.count > 1 ? (
                  <span className={styles.repeat} aria-label={`repeated ${entry.count} times`}>
                    {entry.count}
                  </span>
                ) : (
                  <span />
                )}
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
});

ConsolePanel.displayName = 'ConsolePanel';
