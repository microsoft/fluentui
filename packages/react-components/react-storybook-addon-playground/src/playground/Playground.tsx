import * as React from 'react';
import {
  Dropdown,
  FluentProvider,
  Option,
  Spinner,
  Text,
  Toast,
  ToastBody,
  ToastTitle,
  Toaster,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  Tooltip,
  mergeClasses,
  useFluent,
  useId,
  useToastController,
  type OptionOnSelectData,
  type SelectionEvents,
} from '@fluentui/react-components';
import {
  ArrowResetRegular,
  CodeRegular,
  DocumentRegular,
  ErrorCircleRegular,
  EyeRegular,
  LinkRegular,
  PlayRegular,
  TextGrammarWandRegular,
} from '@fluentui/react-icons';

import { createCodeHash } from '../url';
import { compile, formatDiagnostics } from './compiler';
import { Editor } from './Editor';
import { registerFormatter } from './formatter';
import { monaco } from './monaco';
import { moduleLoaders } from './modules';
import { COMPACT_TOOLBAR_QUERY, usePlaygroundStyles } from './Playground.styles';
import { Preview } from './Preview';
import { evaluate, PlaygroundError, type PlaygroundComponent } from './runner';
import { getFormatShortcutLabel, getRunShortcutLabel } from './shortcuts';
import { defaultThemeOption, getThemeOption, themeOptions } from './themes';
import { registerTypings } from './typings';
import { useMediaQuery } from './useMediaQuery';
import { useSplitPane } from './useSplitPane';

export interface PlaygroundProps {
  initialCode: string;
}

interface PlaygroundErrorState {
  title: string;
  message: string;
  /** `true` when the rendered component crashed (caught by the preview's error boundary). */
  fromBoundary?: boolean;
}

type RunStatus = 'idle' | 'compiling' | 'ready' | 'error';
type TypingsStatus = 'loading' | 'ready' | 'error';

const RUN_DEBOUNCE_MS = 400;
const HASH_SYNC_DEBOUNCE_MS = 500;
const FILE_NAME = 'example.tsx';

function toErrorState(error: unknown): PlaygroundErrorState {
  if (error instanceof PlaygroundError) {
    const titles: Record<PlaygroundError['kind'], string> = {
      compile: 'Compilation error',
      import: 'Import error',
      runtime: 'Runtime error',
      export: 'Nothing to render',
    };
    return { title: titles[error.kind], message: error.message };
  }

  if (error instanceof Error) {
    return { title: 'Runtime error', message: `${error.name}: ${error.message}` };
  }

  return { title: 'Error', message: String(error) };
}

interface ToolbarActionProps {
  icon: React.ReactElement;
  label: string;
  tooltip: string;
  compact: boolean;
  appearance?: 'primary' | 'subtle';
  className?: string;
  onClick: () => void;
}

/** Toolbar button that collapses to an icon (keeping an accessible name) when the toolbar is compact. */
const ToolbarAction = React.forwardRef<HTMLButtonElement, ToolbarActionProps>((props, ref) => {
  const { icon, label, tooltip, compact, appearance, className, onClick } = props;

  return (
    <Tooltip content={tooltip} relationship="description">
      <ToolbarButton
        ref={ref}
        icon={icon}
        appearance={appearance}
        className={className}
        onClick={onClick}
        aria-label={compact ? label : undefined}
      >
        {compact ? null : label}
      </ToolbarButton>
    </Tooltip>
  );
});
ToolbarAction.displayName = 'ToolbarAction';

type StatusTone = 'neutral' | 'success' | 'danger' | 'warning';

interface StatusIndicatorProps {
  tone: StatusTone;
  /** Shows a spinner instead of the dot for in-progress states. */
  busy?: boolean;
  children: React.ReactNode;
}

/** Label with a spinner while busy or a colored dot for the success / error / warning states. */
const StatusIndicator = React.forwardRef<HTMLSpanElement, StatusIndicatorProps>((props, ref) => {
  const { tone, busy, children } = props;
  const styles = usePlaygroundStyles();
  const toneClass: Record<StatusTone, string | undefined> = {
    neutral: undefined,
    success: styles.statusSuccess,
    danger: styles.statusDanger,
    warning: styles.statusWarning,
  };

  return (
    <span ref={ref} className={mergeClasses(styles.status, toneClass[tone])}>
      {busy ? <Spinner size="extra-tiny" /> : null}
      {!busy && tone !== 'neutral' ? <span className={styles.statusDot} aria-hidden="true" /> : null}
      <span className={styles.statusLabel}>{children}</span>
    </span>
  );
});
StatusIndicator.displayName = 'StatusIndicator';

export const Playground = React.forwardRef<HTMLDivElement, PlaygroundProps>((props, ref) => {
  const { initialCode } = props;
  const styles = usePlaygroundStyles();
  const { targetDocument } = useFluent();
  const targetWindow = targetDocument?.defaultView;

  const [code, setCode] = React.useState(initialCode);
  const [model, setModel] = React.useState<monaco.editor.ITextModel | null>(null);
  const [component, setComponent] = React.useState<PlaygroundComponent | null>(null);
  const [runId, setRunId] = React.useState(0);
  const [status, setStatus] = React.useState<RunStatus>('idle');
  const [error, setError] = React.useState<PlaygroundErrorState | null>(null);
  const [themeId, setThemeId] = React.useState(defaultThemeOption.id);
  const [typingsStatus, setTypingsStatus] = React.useState<TypingsStatus>('loading');

  const runCounter = React.useRef(0);
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const mainRef = React.useRef<HTMLElement | null>(null);
  const toasterId = useId('playground-toaster');
  const { dispatchToast } = useToastController(toasterId);
  const themeOption = getThemeOption(themeId);
  const compactToolbar = useMediaQuery(COMPACT_TOOLBAR_QUERY);
  const split = useSplitPane(mainRef);

  const notify = React.useCallback(
    (title: string, intent: 'success' | 'error', body?: string) => {
      dispatchToast(
        <Toast>
          <ToastTitle>{title}</ToastTitle>
          {body ? <ToastBody>{body}</ToastBody> : null}
        </Toast>,
        { intent },
      );
    },
    [dispatchToast],
  );

  // IntelliSense: load type declarations of the allowlisted dependencies into the TypeScript worker
  React.useEffect(() => {
    if (!targetWindow) {
      return;
    }

    let cancelled = false;

    registerTypings(monaco, targetWindow).then(
      () => !cancelled && setTypingsStatus('ready'),
      (err: unknown) => {
        if (!cancelled) {
          setTypingsStatus('error');
          // eslint-disable-next-line no-console
          console.warn('Playground: failed to load type declarations, IntelliSense is limited.', err);
        }
      },
    );

    return () => {
      cancelled = true;
    };
  }, [targetWindow]);

  // Prettier as "Format Document" provider (Monaco's format shortcut and the toolbar button)
  React.useEffect(() => {
    const disposable = registerFormatter(monaco, {
      // Prettier appends a code frame to syntax errors, the first line (message + location) is enough for a toast
      onError: err => notify('Cannot format code', 'error', err.message.split('\n')[0]),
    });

    return () => disposable.dispose();
  }, [notify]);

  const userAgent = targetWindow?.navigator.userAgent ?? '';
  const formatShortcut = getFormatShortcutLabel(userAgent);
  const runShortcut = getRunShortcutLabel(userAgent);

  const handleFormat = React.useCallback(() => {
    editorRef.current?.getAction('editor.action.formatDocument')?.run();
  }, []);

  const handleEditorReady = React.useCallback((editor: monaco.editor.IStandaloneCodeEditor | null) => {
    editorRef.current = editor;
  }, []);

  const run = React.useCallback(async () => {
    if (!model) {
      return;
    }

    const currentRun = ++runCounter.current;
    const isStale = () => currentRun !== runCounter.current;

    setStatus('compiling');

    try {
      const result = await compile(monaco, model);
      if (isStale()) {
        return;
      }

      if (result.diagnostics.length > 0) {
        throw new PlaygroundError('compile', formatDiagnostics(result.diagnostics));
      }

      const nextComponent = await evaluate(result.code, moduleLoaders);
      if (isStale()) {
        return;
      }

      setComponent(() => nextComponent);
      setRunId(id => id + 1);
      setError(null);
      setStatus('ready');
    } catch (err) {
      if (isStale()) {
        return;
      }
      setError(toErrorState(err));
      setStatus('error');
    }
  }, [model]);

  // Auto-run (debounced) whenever the code changes or the editor model becomes available.
  // Waits for the type declarations first: registering them restarts the TypeScript worker, which would abort an
  // in-flight compilation.
  React.useEffect(() => {
    if (!model || !targetWindow || typingsStatus === 'loading') {
      return;
    }

    const timeout = targetWindow.setTimeout(run, RUN_DEBOUNCE_MS);
    return () => targetWindow.clearTimeout(timeout);
  }, [code, model, run, targetWindow, typingsStatus]);

  // Keep the URL hash in sync so a refresh / copied URL restores the current code
  React.useEffect(() => {
    if (!targetWindow) {
      return;
    }

    const timeout = targetWindow.setTimeout(() => {
      targetWindow.history.replaceState(null, '', createCodeHash(code));
    }, HASH_SYNC_DEBOUNCE_MS);
    return () => targetWindow.clearTimeout(timeout);
  }, [code, targetWindow]);

  const handleRuntimeError = React.useCallback((err: Error) => {
    setError({ ...toErrorState(err), fromBoundary: true });
    setStatus('error');
  }, []);

  const handleReset = React.useCallback(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCopyLink = React.useCallback(async () => {
    if (!targetWindow) {
      return;
    }

    const url = `${targetWindow.location.origin}${targetWindow.location.pathname}${createCodeHash(code)}`;
    await targetWindow.navigator.clipboard.writeText(url);

    notify('Link copied to clipboard', 'success');
  }, [code, notify, targetWindow]);

  const handleThemeSelect = React.useCallback((_event: SelectionEvents, data: OptionOnSelectData) => {
    if (data.optionValue) {
      setThemeId(data.optionValue);
    }
  }, []);

  const renderRunStatus = () => {
    switch (status) {
      case 'idle':
        return (
          <StatusIndicator tone="neutral" busy>
            Preparing
          </StatusIndicator>
        );
      case 'compiling':
        return (
          <StatusIndicator tone="neutral" busy>
            Compiling
          </StatusIndicator>
        );
      case 'ready':
        return <StatusIndicator tone="success">Ready</StatusIndicator>;
      case 'error':
        return <StatusIndicator tone="danger">Error</StatusIndicator>;
    }
  };

  const renderTypingsStatus = () => {
    switch (typingsStatus) {
      case 'loading':
        return (
          <StatusIndicator tone="neutral" busy>
            Loading types
          </StatusIndicator>
        );
      case 'ready':
        return (
          <Tooltip
            content="Auto-completion and type checking for the pre-installed packages"
            relationship="description"
          >
            <StatusIndicator tone="neutral">TypeScript</StatusIndicator>
          </Tooltip>
        );
      case 'error':
        return (
          <Tooltip content="Type declarations could not be loaded, completions are limited" relationship="description">
            <StatusIndicator tone="warning">Limited IntelliSense</StatusIndicator>
          </Tooltip>
        );
    }
  };

  const renderPlaceholder = () => {
    if (status === 'error') {
      return (
        <div className={styles.placeholder} role="status">
          <ErrorCircleRegular className={styles.placeholderIcon} aria-hidden="true" />
          <span className={styles.placeholderTitle}>Nothing to preview</span>
          <span>Fix the error below and the preview updates automatically.</span>
        </div>
      );
    }

    return (
      <div className={styles.placeholder} role="status">
        <Spinner size="small" label={status === 'idle' ? 'Preparing the playground…' : 'Compiling…'} />
      </div>
    );
  };

  const splitStyle = { '--playground-split': `${split.percent}%` } as React.CSSProperties;

  return (
    <FluentProvider theme={themeOption.theme}>
      <div
        ref={ref}
        className={mergeClasses(
          styles.root,
          themeOption.dark ? styles.rootDark : styles.rootLight,
          split.dragging && styles.rootDragging,
        )}
      >
        <header className={styles.header}>
          <div className={styles.brand}>
            <span className={styles.brandIcon} aria-hidden="true">
              <CodeRegular />
            </span>
            <h1 className={styles.title}>Fluent UI Playground</h1>
            <span className={styles.subtitle}>React v9</span>
          </div>

          <Toolbar aria-label="Playground actions" className={styles.toolbar}>
            <ToolbarAction
              icon={<PlayRegular />}
              label="Run"
              tooltip={`Run the code and remount the preview (${runShortcut})`}
              appearance="primary"
              compact={compactToolbar}
              onClick={run}
            />
            <ToolbarAction
              icon={<TextGrammarWandRegular />}
              label="Format"
              tooltip={`Format the code with Prettier (${formatShortcut})`}
              compact={compactToolbar}
              onClick={handleFormat}
            />
            <ToolbarAction
              icon={<ArrowResetRegular />}
              label="Reset"
              tooltip="Restore the initial code"
              compact={compactToolbar}
              onClick={handleReset}
            />
            <ToolbarDivider />
            <ToolbarAction
              icon={<LinkRegular />}
              label="Copy link"
              tooltip="Copy a shareable link with the current code"
              compact={compactToolbar}
              onClick={handleCopyLink}
            />
            <ToolbarDivider />
            <Dropdown
              aria-label="Theme"
              className={styles.themePicker}
              size="small"
              value={themeOption.label}
              selectedOptions={[themeOption.id]}
              onOptionSelect={handleThemeSelect}
            >
              {themeOptions.map(option => (
                <Option key={option.id} value={option.id}>
                  {option.label}
                </Option>
              ))}
            </Dropdown>
          </Toolbar>
        </header>

        <main ref={mainRef} className={styles.main} style={splitStyle}>
          <section className={styles.pane} aria-label="Code editor">
            <div className={styles.paneHeader}>
              <span className={styles.paneTitle}>
                <DocumentRegular />
                <span className={styles.fileName}>{FILE_NAME}</span>
              </span>
              <span className={styles.paneMeta}>{renderTypingsStatus()}</span>
            </div>
            <Editor
              value={code}
              onChange={setCode}
              onModelReady={setModel}
              onEditorReady={handleEditorReady}
              onRun={run}
              themeOption={themeOption}
            />
          </section>

          <div
            {...split.separatorProps}
            aria-label="Resize editor and preview"
            className={mergeClasses(styles.separator, split.dragging && styles.separatorActive)}
          />

          <section className={mergeClasses(styles.pane, styles.previewPane)} aria-label="Preview">
            <div className={styles.paneHeader}>
              <span className={styles.paneTitle}>
                <EyeRegular />
                Preview
              </span>
              <span className={styles.paneMeta} aria-live="polite">
                {renderRunStatus()}
              </span>
            </div>
            <Preview
              component={component}
              runId={runId}
              theme={themeOption.theme}
              onError={handleRuntimeError}
              placeholder={renderPlaceholder()}
            />
            {error ? (
              <div className={styles.errorBar} role="alert">
                <span className={styles.errorDot} aria-hidden="true" />
                <div>
                  <p className={styles.errorTitle}>{error.title}</p>
                  <pre className={styles.errorMessage}>{error.message}</pre>
                  {component && !error.fromBoundary ? (
                    <Text size={200} className={styles.errorHint}>
                      The preview shows the last successful render.
                    </Text>
                  ) : null}
                </div>
              </div>
            ) : null}
          </section>
        </main>

        <Toaster toasterId={toasterId} position="bottom-end" />
      </div>
    </FluentProvider>
  );
});

Playground.displayName = 'Playground';
