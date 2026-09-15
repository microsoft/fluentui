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

import type { PlaygroundSetupMetadata } from '../setup';
import { createPlaygroundHash, type CssModuleSource } from '../url';
import { compile, formatDiagnostics } from './compiler';
import { compileCssModules, cssModuleBasename, updateCssModuleSource } from './cssModules';
import { Editor, TSX_FILE_PATH, type EditorFile } from './Editor';
import { registerFormatter } from './formatter';
import { monaco } from './monaco';
import { COMPACT_TOOLBAR_QUERY, usePlaygroundStyles } from './Playground.styles';
import { Preview } from './Preview';
import { PlaygroundError, assertAllowedModules, getRequiredModules } from './runner';
import type { PlaygroundRuntimeErrorKind, ResolvedPlaygroundRuntimeManifest } from './runtime';
import { getFormatShortcutLabel, getRunShortcutLabel } from './shortcuts';
import { getThemeOption } from './themes';
import { registerTypings } from './typings';
import { useMediaQuery } from './useMediaQuery';
import { useSplitPane } from './useSplitPane';

export interface PlaygroundProps {
  initialCode: string | null;
  initialCssModules?: CssModuleSource[];
  manifest: ResolvedPlaygroundRuntimeManifest;
}

interface PlaygroundErrorState {
  title: string;
  message: string;
}

type RunStatus = 'idle' | 'compiling' | 'ready' | 'error';
type TypingsStatus = 'loading' | 'ready' | 'error';

const RUN_DEBOUNCE_MS = 400;
const HASH_SYNC_DEBOUNCE_MS = 500;
const EMPTY_METADATA: PlaygroundSetupMetadata = { themes: [] };
const EMPTY_CSS_MODULES: CssModuleSource[] = [];

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

function runtimeErrorTitle(kind: PlaygroundRuntimeErrorKind): string {
  switch (kind) {
    case 'import':
      return 'Import error';
    case 'export':
      return 'Nothing to render';
    case 'runtime':
      return 'Runtime error';
  }
}

interface ToolbarActionProps {
  icon: React.ReactElement;
  label: string;
  tooltip: string;
  compact: boolean;
  appearance?: 'primary' | 'subtle';
  onClick: () => void;
}

const ToolbarAction = React.forwardRef<HTMLButtonElement, ToolbarActionProps>((props, ref) => {
  const { icon, label, tooltip, compact, appearance, onClick } = props;

  return (
    <Tooltip content={tooltip} relationship="description">
      <ToolbarButton
        ref={ref}
        icon={icon}
        appearance={appearance}
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
  busy?: boolean;
  children: React.ReactNode;
}

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
  const { initialCode, initialCssModules = EMPTY_CSS_MODULES, manifest } = props;
  const styles = usePlaygroundStyles();
  const { targetDocument } = useFluent();
  const targetWindow = targetDocument?.defaultView;

  const [metadata, setMetadata] = React.useState<PlaygroundSetupMetadata>(EMPTY_METADATA);
  const [runtimeReady, setRuntimeReady] = React.useState(false);
  const [code, setCode] = React.useState(initialCode ?? '');
  const [cssModules, setCssModules] = React.useState(initialCssModules);
  const [activeFileId, setActiveFileId] = React.useState(TSX_FILE_PATH);
  const compiledCssModules = React.useMemo(() => compileCssModules(cssModules), [cssModules]);
  const [previewCssModules, setPreviewCssModules] = React.useState(compiledCssModules);
  const [model, setModel] = React.useState<monaco.editor.ITextModel | null>(null);
  const [compiledCode, setCompiledCode] = React.useState<string | null>(null);
  const [runId, setRunId] = React.useState(0);
  const [status, setStatus] = React.useState<RunStatus>('idle');
  const [error, setError] = React.useState<PlaygroundErrorState | null>(null);
  const [themeId, setThemeId] = React.useState<string>();
  const [typingsStatus, setTypingsStatus] = React.useState<TypingsStatus>('loading');
  const [hasSuccessfulRun, setHasSuccessfulRun] = React.useState(false);

  const runCounter = React.useRef(0);
  const defaultCodeApplied = React.useRef(initialCode !== null);
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const mainRef = React.useRef<HTMLElement | null>(null);
  const toasterId = useId('playground-toaster');
  const { dispatchToast } = useToastController(toasterId);
  const compactToolbar = useMediaQuery(COMPACT_TOOLBAR_QUERY);
  const split = useSplitPane(mainRef);

  const selectedThemeMeta = metadata.themes.find(theme => theme.id === themeId);
  const shellDark = Boolean(selectedThemeMeta?.dark);
  const shellTheme = getThemeOption(shellDark ? 'web-dark' : 'web-light');

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

  React.useEffect(() => {
    if (!targetWindow) {
      return;
    }

    let cancelled = false;

    registerTypings(monaco, targetWindow, manifest.typings).then(
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
  }, [manifest.typings, targetWindow]);

  React.useEffect(() => {
    const disposable = registerFormatter(monaco, {
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

  const activeFile = React.useMemo((): EditorFile => {
    if (activeFileId !== TSX_FILE_PATH) {
      const cssModule = cssModules.find(mod => mod.name === activeFileId);
      if (cssModule) {
        return { path: cssModuleBasename(cssModule.name), language: 'css', value: cssModule.source };
      }
    }

    return { path: TSX_FILE_PATH, language: 'typescript', value: code };
  }, [activeFileId, code, cssModules]);

  const handleEditorChange = React.useCallback(
    (value: string) => {
      if (activeFileId === TSX_FILE_PATH) {
        setCode(value);
        return;
      }

      setCssModules(modules => updateCssModuleSource(modules, activeFileId, value));
    },
    [activeFileId],
  );

  const run = React.useCallback(async () => {
    if (!model || !runtimeReady) {
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

      assertAllowedModules(getRequiredModules(result.code), manifest.allowedModules);
      setCompiledCode(result.code);
      setRunId(id => id + 1);
      setError(null);
    } catch (err) {
      if (!isStale()) {
        setError(toErrorState(err));
        setStatus('error');
      }
    }
  }, [manifest.allowedModules, model, runtimeReady]);

  React.useEffect(() => {
    if (!model || !targetWindow || typingsStatus === 'loading' || !runtimeReady || !code) {
      return;
    }

    const timeout = targetWindow.setTimeout(run, RUN_DEBOUNCE_MS);
    return () => targetWindow.clearTimeout(timeout);
  }, [code, model, run, runtimeReady, targetWindow, typingsStatus]);

  React.useEffect(() => {
    if (!targetWindow || !code) {
      return;
    }

    const timeout = targetWindow.setTimeout(() => {
      targetWindow.history.replaceState(
        null,
        '',
        `${targetWindow.location.search}${createPlaygroundHash({ code, cssModules })}`,
      );
    }, HASH_SYNC_DEBOUNCE_MS);
    return () => targetWindow.clearTimeout(timeout);
  }, [code, cssModules, targetWindow]);

  React.useEffect(() => {
    if (!targetWindow) {
      return;
    }

    const timeout = targetWindow.setTimeout(() => {
      setPreviewCssModules(compiledCssModules);
    }, RUN_DEBOUNCE_MS);
    return () => targetWindow.clearTimeout(timeout);
  }, [compiledCssModules, targetWindow]);

  const handleMetadata = React.useCallback((nextMetadata: PlaygroundSetupMetadata) => {
    setMetadata(nextMetadata);
    setRuntimeReady(true);
    setThemeId(current => current ?? nextMetadata.themes[0]?.id);

    if (!defaultCodeApplied.current && nextMetadata.defaultCode) {
      defaultCodeApplied.current = true;
      setCode(nextMetadata.defaultCode);
    }
  }, []);

  const handleRuntimeSuccess = React.useCallback((successfulRunId: number) => {
    setRunId(currentRunId => {
      if (successfulRunId === currentRunId) {
        setStatus('ready');
        setHasSuccessfulRun(true);
      }
      return currentRunId;
    });
  }, []);

  const handleRuntimeError = React.useCallback(
    (runtimeError: { kind: PlaygroundRuntimeErrorKind; message: string; runId: number }) => {
      setRunId(currentRunId => {
        if (runtimeError.runId === currentRunId) {
          setError({ title: runtimeErrorTitle(runtimeError.kind), message: runtimeError.message });
          setStatus('error');
        }
        return currentRunId;
      });
    },
    [],
  );

  const editorFiles = React.useMemo(
    (): EditorFile[] => [
      { path: TSX_FILE_PATH, language: 'typescript', value: code },
      ...cssModules.map(mod => ({
        path: cssModuleBasename(mod.name),
        language: 'css' as const,
        value: mod.source,
      })),
    ],
    [code, cssModules],
  );

  const handleReset = React.useCallback(() => {
    const nextCode = metadata.defaultCode ?? initialCode ?? '';
    const nextCssModules = initialCssModules.map(mod => ({ ...mod }));
    setCode(nextCode);
    setCssModules(nextCssModules);
    setPreviewCssModules(compileCssModules(nextCssModules));
  }, [initialCode, initialCssModules, metadata.defaultCode]);

  const handleCopyLink = React.useCallback(async () => {
    if (!targetWindow) {
      return;
    }

    const url = `${targetWindow.location.origin}${targetWindow.location.pathname}${
      targetWindow.location.search
    }${createPlaygroundHash({ code, cssModules })}`;

    try {
      await targetWindow.navigator.clipboard.writeText(url);
      notify('Link copied to clipboard', 'success');
    } catch (err) {
      notify('Could not copy link', 'error', err instanceof Error ? err.message : String(err));
    }
  }, [code, cssModules, notify, targetWindow]);

  const handleThemeSelect = React.useCallback(
    (_event: SelectionEvents, data: OptionOnSelectData) => {
      if (!data.optionValue) {
        return;
      }

      setThemeId(data.optionValue);
      if (compiledCode) {
        setStatus('compiling');
        setRunId(id => id + 1);
      }
    },
    [compiledCode],
  );

  const selectedThemeLabel = selectedThemeMeta?.label ?? '';

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
          <Tooltip content="Auto-completion and type checking for the configured packages" relationship="description">
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
        <Spinner size="small" label={runtimeReady ? 'Compiling…' : 'Loading playground runtime…'} />
      </div>
    );
  };

  const splitStyle = { '--playground-split': `${split.percent}%` } as React.CSSProperties;

  return (
    <FluentProvider theme={shellTheme.theme}>
      <div ref={ref} className={mergeClasses(styles.root, split.dragging && styles.rootDragging)}>
        <header className={styles.header}>
          <div className={styles.brand}>
            <span className={styles.brandIcon} aria-hidden="true">
              <CodeRegular />
            </span>
            <h1 className={styles.title}>{metadata.title ?? 'React Playground'}</h1>
            {metadata.subtitle ? <span className={styles.subtitle}>{metadata.subtitle}</span> : null}
          </div>

          <Toolbar aria-label="Playground actions" className={styles.toolbar}>
            <ToolbarAction
              icon={<PlayRegular />}
              label="Run"
              tooltip={`Run the code (${runShortcut})`}
              appearance="primary"
              compact={compactToolbar}
              onClick={run}
            />
            <ToolbarAction
              icon={<TextGrammarWandRegular />}
              label="Format"
              tooltip={`Format the current file with Prettier (${formatShortcut})`}
              compact={compactToolbar}
              onClick={handleFormat}
            />
            <ToolbarAction
              icon={<ArrowResetRegular />}
              label="Reset"
              tooltip="Restore the initial code and styles"
              compact={compactToolbar}
              onClick={handleReset}
            />
            <ToolbarDivider />
            <ToolbarAction
              icon={<LinkRegular />}
              label="Copy link"
              tooltip="Copy a shareable link with the current code and styles"
              compact={compactToolbar}
              onClick={handleCopyLink}
            />
            {metadata.themes.length > 0 ? (
              <>
                <ToolbarDivider />
                <Dropdown
                  aria-label="Theme"
                  className={styles.themePicker}
                  size="small"
                  value={selectedThemeLabel}
                  selectedOptions={themeId ? [themeId] : []}
                  onOptionSelect={handleThemeSelect}
                >
                  {metadata.themes.map(theme => (
                    <Option key={theme.id} value={theme.id}>
                      {theme.label}
                    </Option>
                  ))}
                </Dropdown>
              </>
            ) : null}
          </Toolbar>
        </header>

        <main ref={mainRef} className={styles.main} style={splitStyle}>
          <section className={styles.pane} aria-label="Code editor">
            <div className={styles.paneHeader}>
              <span className={styles.paneTitle}>
                <DocumentRegular />
                {cssModules.length > 0 ? (
                  <span className={styles.fileTabs} role="tablist" aria-label="Playground files">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeFileId === TSX_FILE_PATH}
                      className={mergeClasses(styles.fileTab, activeFileId === TSX_FILE_PATH && styles.fileTabActive)}
                      onClick={() => setActiveFileId(TSX_FILE_PATH)}
                    >
                      {TSX_FILE_PATH}
                    </button>
                    {cssModules.map(mod => {
                      const tabId = mod.name;
                      const selected = activeFileId === tabId;

                      return (
                        <button
                          key={tabId}
                          type="button"
                          role="tab"
                          aria-selected={selected}
                          className={mergeClasses(styles.fileTab, selected && styles.fileTabActive)}
                          onClick={() => setActiveFileId(tabId)}
                        >
                          {cssModuleBasename(mod.name)}
                        </button>
                      );
                    })}
                  </span>
                ) : (
                  <span className={styles.fileName}>{TSX_FILE_PATH}</span>
                )}
              </span>
              <span className={styles.paneMeta}>
                {activeFile.language === 'css' ? (
                  <StatusIndicator tone="neutral">CSS</StatusIndicator>
                ) : (
                  renderTypingsStatus()
                )}
              </span>
            </div>
            <Editor
              file={activeFile}
              files={editorFiles}
              onChange={handleEditorChange}
              onModelReady={setModel}
              onEditorReady={handleEditorReady}
              onRun={run}
              themeOption={shellTheme}
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
              code={compiledCode}
              runId={runId}
              themeId={themeId}
              cssModules={previewCssModules}
              manifest={manifest}
              onMetadata={handleMetadata}
              onSuccess={handleRuntimeSuccess}
              onError={handleRuntimeError}
              placeholder={renderPlaceholder()}
            />
            {error ? (
              <div className={styles.errorBar} role="alert">
                <span className={styles.errorDot} aria-hidden="true" />
                <div>
                  <p className={styles.errorTitle}>{error.title}</p>
                  <pre className={styles.errorMessage}>{error.message}</pre>
                  {hasSuccessfulRun ? (
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
