import * as React from 'react';
import {
  Button,
  Dropdown,
  Field,
  FluentProvider,
  Input,
  Link,
  Option,
  Popover,
  PopoverSurface,
  PopoverTrigger,
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
  AddRegular,
  ArrowClockwiseRegular,
  ArrowMaximizeRegular,
  ArrowMinimizeRegular,
  ArrowResetRegular,
  CodeRegular,
  CopyRegular,
  DeleteRegular,
  DocumentRegular,
  ErrorCircleRegular,
  EyeRegular,
  LinkRegular,
  PlayRegular,
  TextGrammarWandRegular,
} from '@fluentui/react-icons';

import type { PlaygroundSetupMetadata } from '../setup';
import {
  RECOMMENDED_MAX_URL_LENGTH,
  createPlaygroundHash,
  createPlaygroundUrl,
  type CssModuleSource,
  type PlaygroundHashIssue,
} from '../url';
import { compile, formatDiagnostics, type CompileDiagnostic, type CompileResult } from './compiler';
import { ConsolePanel } from './ConsolePanel';
import { appendConsoleEntry, type ConsoleEntry } from './consoleEntries';
import {
  compileCssModule,
  createCssModuleSource,
  cssModuleBasename,
  getUniqueCssModuleName,
  normalizeCssModuleName,
  updateCssModuleSource,
  validateCssModuleName,
  type CompiledCssModule,
} from './cssModules';
import { Editor, TSX_FILE_PATH, type EditorFile } from './Editor';
import { getNextFileTabIndex } from './fileTabs';
import { registerFormatter } from './formatter';
import { monaco } from './monaco';
import { COMPACT_TOOLBAR_QUERY, usePlaygroundStyles } from './Playground.styles';
import { Preview } from './Preview';
import { PlaygroundError, assertAllowedModules, getRequiredModules } from './runner';
import type { PlaygroundRuntimeErrorKind, ResolvedPlaygroundRuntimeManifest } from './runtime';
import { getFormatShortcutLabel, getRunShortcutLabel, getSaveShortcutLabel, isSaveShortcut } from './shortcuts';
import { getThemeOption } from './themes';
import { enableSemanticValidation, getImportedModules, TypingsLoader } from './typings';
import type { TypingsStatus } from './typings';
import { useMediaQuery } from './useMediaQuery';
import { useModelErrorCount } from './useModelErrorCount';
import { useSplitPane } from './useSplitPane';

export interface PlaygroundProps {
  initialCode: string | null;
  initialCssModules?: CssModuleSource[];
  /** Problems found while reading the shared link, shown once on start. */
  initialIssues?: readonly PlaygroundHashIssue[];
  /** Name of the example, e.g. the story it was opened from; shown in the header and the document title. */
  initialTitle?: string;
  manifest: ResolvedPlaygroundRuntimeManifest;
}

interface PlaygroundErrorState {
  title: string;
  message: string;
  /** Compiler diagnostics with editor locations, rendered as links that jump to the code. */
  diagnostics?: CompileDiagnostic[];
  previewRetained?: boolean;
}

/** Which panes are visible: both side by side, or one of them maximized. */
type PaneLayout = 'split' | 'editor' | 'preview';

type RunStatus = 'idle' | 'compiling' | 'ready' | 'error';

const RUN_DEBOUNCE_MS = 150;
const HASH_SYNC_DEBOUNCE_MS = 500;
const EMPTY_METADATA: PlaygroundSetupMetadata = { themes: [] };
const EMPTY_CSS_MODULES: CssModuleSource[] = [];

export const VIEWPORT_PRESETS = [
  { id: 'fill', label: 'Fill', width: undefined },
  { id: 'mobile', label: 'Mobile · 375', width: 375 },
  { id: 'tablet', label: 'Tablet · 768', width: 768 },
  { id: 'desktop', label: 'Desktop · 1280', width: 1280 },
] as const;
type ViewportId = (typeof VIEWPORT_PRESETS)[number]['id'];

function toErrorState(error: unknown): PlaygroundErrorState {
  if (error instanceof PlaygroundError) {
    const titles: Record<PlaygroundError['kind'], string> = {
      compile: 'Compilation error',
      import: 'Import error',
      runtime: 'Runtime error',
      export: 'Nothing to render',
    };
    return error.diagnostics?.length
      ? { title: titles[error.kind], message: error.message, diagnostics: error.diagnostics }
      : { title: titles[error.kind], message: error.message };
  }

  if (error instanceof Error) {
    if (error.name === 'CssSyntaxError') {
      return { title: 'CSS syntax error', message: error.message };
    }
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

interface DiagnosticLocationProps {
  diagnostic: CompileDiagnostic;
  onSelect: (diagnostic: CompileDiagnostic) => void;
}

const DiagnosticLocation = React.forwardRef<HTMLButtonElement, DiagnosticLocationProps>((props, ref) => {
  const { diagnostic, onSelect } = props;
  const styles = usePlaygroundStyles();
  const handleClick = React.useCallback(() => onSelect(diagnostic), [diagnostic, onSelect]);

  return (
    <Link ref={ref} as="button" className={styles.diagnosticLocation} onClick={handleClick}>
      {TSX_FILE_PATH}:{diagnostic.line}:{diagnostic.column ?? 1}
    </Link>
  );
});
DiagnosticLocation.displayName = 'DiagnosticLocation';

const noopSubscribe = () => () => undefined;
const getLoadingStatus = (): TypingsStatus => 'loading';

export const Playground = React.forwardRef<HTMLDivElement, PlaygroundProps>((props, ref) => {
  const { initialCode, initialCssModules = EMPTY_CSS_MODULES, initialIssues, initialTitle, manifest } = props;
  const styles = usePlaygroundStyles();
  const { targetDocument } = useFluent();
  const targetWindow = targetDocument?.defaultView;

  const [metadata, setMetadata] = React.useState<PlaygroundSetupMetadata>(EMPTY_METADATA);
  const [runtimeReady, setRuntimeReady] = React.useState(false);
  const [code, setCode] = React.useState(initialCode ?? '');
  const [cssModules, setCssModules] = React.useState(initialCssModules);
  const [activeFileId, setActiveFileId] = React.useState(TSX_FILE_PATH);
  const [previewCssModules, setPreviewCssModules] = React.useState<CompiledCssModule[]>([]);
  const [model, setModel] = React.useState<monaco.editor.ITextModel | null>(null);
  const [compiledCode, setCompiledCode] = React.useState<string | null>(null);
  const [requiredModules, setRequiredModules] = React.useState<string[]>([]);
  const [runId, setRunId] = React.useState(0);
  const [restartId, setRestartId] = React.useState(0);
  const [preserveState, setPreserveState] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [status, setStatus] = React.useState<RunStatus>('idle');
  const [error, setError] = React.useState<PlaygroundErrorState | null>(null);
  const [themeId, setThemeId] = React.useState<string>();
  const [viewportId, setViewportId] = React.useState<ViewportId>('fill');
  const [consoleEntries, setConsoleEntries] = React.useState<ConsoleEntry[]>([]);
  const [consoleExpanded, setConsoleExpanded] = React.useState(false);
  const [newCssOpen, setNewCssOpen] = React.useState(false);
  const [newCssName, setNewCssName] = React.useState('');
  const [paneLayout, setPaneLayout] = React.useState<PaneLayout>('split');
  const runCounter = React.useRef(0);
  const runIdRef = React.useRef(runId);
  runIdRef.current = runId;
  const consoleEntryId = React.useRef(0);
  const consoleMinRunId = React.useRef(0);
  const lastCompiledCode = React.useRef<string | null>(null);
  const emitCache = React.useRef<
    | {
        model: monaco.editor.ITextModel;
        version: number;
        result: Promise<CompileResult>;
      }
    | undefined
  >(undefined);
  const cssCache = React.useRef(new Map<string, { source: string; result: CompiledCssModule }>());
  const hasSuccessfulRunRef = React.useRef(false);
  const defaultCodeApplied = React.useRef(initialCode !== null);
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const mainRef = React.useRef<HTMLElement | null>(null);
  const toasterId = useId('playground-toaster');
  const fileTabId = useId('playground-file-tab');
  const editorPanelId = useId('playground-editor-panel');
  const { dispatchToast } = useToastController(toasterId);
  const compactToolbar = useMediaQuery(COMPACT_TOOLBAR_QUERY);
  const split = useSplitPane(mainRef);
  const typeErrorCount = useModelErrorCount(monaco, model);

  const [saveCount, setSaveCount] = React.useState(0);
  const savedCount = React.useRef(0);
  const pendingReveal = React.useRef<{ line: number; column: number } | null>(null);
  const [revealCount, setRevealCount] = React.useState(0);

  const selectedThemeMeta = metadata.themes.find(theme => theme.id === themeId);
  const playgroundTitle = metadata.title ?? 'React Playground';

  React.useEffect(() => {
    if (targetDocument) {
      targetDocument.title = initialTitle ? `${initialTitle} · ${playgroundTitle}` : playgroundTitle;
    }
  }, [initialTitle, playgroundTitle, targetDocument]);
  const shellDark = Boolean(selectedThemeMeta?.dark);
  const shellTheme = getThemeOption(shellDark ? 'web-dark' : 'web-light');

  const applyRuntimeDefaultCode = React.useCallback((nextMetadata: PlaygroundSetupMetadata) => {
    if (!defaultCodeApplied.current && nextMetadata.defaultCode) {
      defaultCodeApplied.current = true;
      setCode(nextMetadata.defaultCode);
    }
  }, []);

  const notify = React.useCallback(
    (title: string, intent: 'success' | 'warning' | 'error', body?: string) => {
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

  const typingsLoader = React.useMemo(
    () => (targetWindow ? new TypingsLoader(monaco, targetWindow) : null),
    [targetWindow],
  );
  const typingsStatus = React.useSyncExternalStore(
    typingsLoader?.subscribe ?? noopSubscribe,
    typingsLoader?.getStatus ?? getLoadingStatus,
    getLoadingStatus,
  );
  // Declarations of configured modules are fetched once the code imports them (older manifests bundle everything).
  const requiredTypings = React.useMemo(() => {
    const urls = new Set([manifest.typings]);
    getImportedModules(code).forEach(moduleName => {
      manifest.moduleTypings?.[moduleName]?.forEach(url => urls.add(url));
    });

    return Array.from(urls).join('\n');
  }, [code, manifest.moduleTypings, manifest.typings]);

  React.useEffect(() => {
    if (!typingsLoader) {
      return;
    }

    requiredTypings.split('\n').forEach(url => {
      typingsLoader.load(url).catch((err: unknown) => {
        // eslint-disable-next-line no-console
        console.warn('Playground: failed to load type declarations, IntelliSense is limited.', err);
      });
    });
  }, [requiredTypings, typingsLoader]);

  React.useEffect(() => {
    if (typingsStatus === 'ready') {
      enableSemanticValidation(monaco);
    }
  }, [typingsStatus]);

  const reportedInitialIssues = React.useRef(false);
  React.useEffect(() => {
    if (reportedInitialIssues.current || !initialIssues?.length) {
      return;
    }

    reportedInitialIssues.current = true;
    notify('This link could not be opened completely', 'warning', initialIssues.map(issue => issue.message).join(' '));
  }, [initialIssues, notify]);

  React.useEffect(() => {
    const disposable = registerFormatter(monaco, {
      onError: err => notify('Cannot format code', 'error', err.message.split('\n')[0]),
    });

    return () => disposable.dispose();
  }, [notify]);

  const userAgent = targetWindow?.navigator.userAgent ?? '';
  const formatShortcut = getFormatShortcutLabel(userAgent);
  const saveShortcut = getSaveShortcutLabel(userAgent);
  const runShortcut = getRunShortcutLabel(userAgent);

  const handleFormat = React.useCallback(() => {
    editorRef.current?.getAction('editor.action.formatDocument')?.run();
  }, []);

  const handleNextTypeError = React.useCallback(() => {
    const editor = editorRef.current;
    editor?.focus();
    editor?.getAction('editor.action.marker.next')?.run();
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
      // Invalidate in-flight work immediately, not only after the debounce for the next edit.
      ++runCounter.current;
      setPaused(true);
      setStatus('compiling');
      if (activeFileId === TSX_FILE_PATH) {
        setCode(value);
        return;
      }

      setCssModules(modules => updateCssModuleSource(modules, activeFileId, value));
    },
    [activeFileId],
  );

  const compileAndRun = React.useCallback(
    async (keepState: boolean) => {
      if (!model || !runtimeReady) {
        return;
      }

      const currentRun = ++runCounter.current;
      const version = model.getVersionId();
      const isStale = () => currentRun !== runCounter.current || version !== model.getVersionId();

      setStatus('compiling');

      try {
        let entry = emitCache.current;
        if (!entry || entry.model !== model || entry.version !== version) {
          entry = { model, version, result: compile(monaco, model) };
          emitCache.current = entry;
        }
        const result = await entry.result;
        if (isStale()) {
          return;
        }

        if (result.diagnostics.length > 0) {
          throw new PlaygroundError('compile', formatDiagnostics(result.diagnostics), result.diagnostics);
        }

        const nextRequiredModules = getRequiredModules(result.code);
        assertAllowedModules(nextRequiredModules, manifest.allowedModules);
        const nextCache = new Map(
          cssModules.map(mod => {
            const cached = cssCache.current.get(mod.name);
            return [
              mod.name,
              cached?.source === mod.source ? cached : { source: mod.source, result: compileCssModule(mod) },
            ];
          }),
        );
        cssCache.current = nextCache;
        const nextCssModules = Array.from(nextCache.values(), cached => cached.result);
        if (!keepState || result.code !== lastCompiledCode.current) {
          // Each remount starts a fresh log, like a page reload; output of the replaced version is dropped.
          consoleMinRunId.current = runIdRef.current + 1;
          setConsoleEntries([]);
        }
        lastCompiledCode.current = result.code;
        setCompiledCode(result.code);
        setRequiredModules(nextRequiredModules);
        setPreviewCssModules(nextCssModules);
        setPreserveState(keepState);
        setPaused(false);
        setRunId(id => id + 1);
        setError(null);
      } catch (err) {
        if (!isStale()) {
          // Failed worker requests must be retried, not kept in the emit cache.
          emitCache.current = undefined;
          setError({ ...toErrorState(err), previewRetained: hasSuccessfulRunRef.current });
          setStatus('error');
        }
      }
    },
    [cssModules, manifest.allowedModules, model, runtimeReady],
  );

  const handleRun = React.useCallback(() => {
    compileAndRun(false);
  }, [compileAndRun]);

  React.useEffect(() => {
    if (!model || !targetWindow || !runtimeReady) {
      return;
    }

    const counter = runCounter;
    const timeout = targetWindow.setTimeout(() => {
      compileAndRun(true);
    }, RUN_DEBOUNCE_MS);
    return () => {
      targetWindow.clearTimeout(timeout);
      ++counter.current;
    };
  }, [code, compileAndRun, model, runtimeReady, targetWindow]);

  React.useEffect(() => {
    if (!targetWindow) {
      return;
    }

    // Saving (Cmd/Ctrl+S) writes the link right away instead of after the typing debounce.
    const saved = saveCount !== savedCount.current;
    savedCount.current = saveCount;
    const timeout = targetWindow.setTimeout(
      () => {
        targetWindow.history.replaceState(
          null,
          '',
          `${targetWindow.location.pathname}${targetWindow.location.search}${createPlaygroundHash({
            code,
            cssModules,
            title: initialTitle,
          })}`,
        );
      },
      saved ? 0 : HASH_SYNC_DEBOUNCE_MS,
    );
    return () => targetWindow.clearTimeout(timeout);
  }, [code, cssModules, initialTitle, saveCount, targetWindow]);

  const handleMetadata = React.useCallback(
    (nextMetadata: PlaygroundSetupMetadata) => {
      setMetadata(nextMetadata);
      setRuntimeReady(true);
      setThemeId(current => current ?? nextMetadata.themes[0]?.id);
      applyRuntimeDefaultCode(nextMetadata);
    },
    [applyRuntimeDefaultCode],
  );

  const handleRuntimeSuccess = React.useCallback(
    (successfulRunId: number) => {
      if (successfulRunId === runId) {
        setStatus('ready');
        setError(null);
        hasSuccessfulRunRef.current = true;
      }
    },
    [runId],
  );

  const handleRuntimeError = React.useCallback(
    (runtimeError: { kind: PlaygroundRuntimeErrorKind; message: string; runId: number; previewRetained?: boolean }) => {
      if (runtimeError.runId === runId) {
        hasSuccessfulRunRef.current = Boolean(runtimeError.previewRetained);
        setError({
          title: runtimeErrorTitle(runtimeError.kind),
          message: runtimeError.message,
          previewRetained: runtimeError.previewRetained,
        });
        setStatus('error');
      }
    },
    [runId],
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

  const fileIds = React.useMemo(() => [TSX_FILE_PATH, ...cssModules.map(mod => mod.name)], [cssModules]);
  const activeFileIndex = Math.max(fileIds.indexOf(activeFileId), 0);
  const handleFileTabKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
      const nextIndex = getNextFileTabIndex(event.key, currentIndex, fileIds.length);
      if (nextIndex === null) {
        return;
      }

      event.preventDefault();
      setActiveFileId(fileIds[nextIndex]);
      targetDocument?.getElementById(`${fileTabId}-${nextIndex}`)?.focus();
    },
    [fileIds, fileTabId, targetDocument],
  );

  const handleReset = React.useCallback(() => {
    ++runCounter.current;
    setPaused(true);
    const nextCode = initialCode ?? metadata.defaultCode ?? '';
    const nextCssModules = initialCssModules.map(mod => ({ ...mod }));
    setCode(nextCode);
    setCssModules(nextCssModules);
  }, [initialCode, initialCssModules, metadata.defaultCode]);

  const handleRestart = React.useCallback(() => {
    ++runCounter.current;
    hasSuccessfulRunRef.current = false;
    setRuntimeReady(false);
    setCompiledCode(null);
    setError(null);
    setStatus('idle');
    setPaused(false);
    lastCompiledCode.current = null;
    setConsoleEntries([]);
    setRestartId(id => id + 1);
    setRunId(id => id + 1);
  }, []);

  const handleConsole = React.useCallback((entry: { level: ConsoleEntry['level']; message: string; runId: number }) => {
    if (entry.runId !== 0 && entry.runId < consoleMinRunId.current) {
      return;
    }
    setConsoleEntries(entries => appendConsoleEntry(entries, entry, ++consoleEntryId.current));
  }, []);
  const handleClearConsole = React.useCallback(() => setConsoleEntries([]), []);

  const newCssModuleName = normalizeCssModuleName(newCssName);
  const newCssError = newCssName.trim() ? validateCssModuleName(newCssModuleName, cssModules) : undefined;

  const handleNewCssOpenChange = React.useCallback(
    (_event: unknown, data: { open: boolean }) => {
      setNewCssOpen(data.open);
      if (data.open) {
        setNewCssName(getUniqueCssModuleName(cssModules));
      }
    },
    [cssModules],
  );
  const handleNewCssNameChange = React.useCallback(
    (_event: unknown, data: { value: string }) => setNewCssName(data.value),
    [],
  );

  const handleAddCssModule = React.useCallback(
    (event?: React.FormEvent) => {
      event?.preventDefault();
      if (!newCssName.trim() || validateCssModuleName(newCssModuleName, cssModules)) {
        return;
      }

      setCssModules(modules => [
        ...modules,
        { name: newCssModuleName, source: createCssModuleSource(newCssModuleName) },
      ]);
      setActiveFileId(newCssModuleName);
      setNewCssOpen(false);
    },
    [cssModules, newCssModuleName, newCssName],
  );

  const lastRemovedCss = React.useRef<{ module: CssModuleSource; index: number } | null>(null);
  const handleUndoRemoveCss = React.useCallback(() => {
    const removed = lastRemovedCss.current;
    if (!removed) {
      return;
    }

    lastRemovedCss.current = null;
    setCssModules(modules => {
      if (modules.some(mod => mod.name === removed.module.name)) {
        return modules;
      }
      const next = [...modules];
      next.splice(Math.min(removed.index, next.length), 0, removed.module);
      return next;
    });
    setActiveFileId(removed.module.name);
  }, []);

  const handleRemoveCssModule = React.useCallback(
    (name: string) => {
      const index = cssModules.findIndex(mod => mod.name === name);
      if (index === -1) {
        return;
      }

      const removed = cssModules[index];
      lastRemovedCss.current = { module: removed, index };
      ++runCounter.current;
      setPaused(true);
      setCssModules(modules => modules.filter(mod => mod.name !== name));
      setActiveFileId(TSX_FILE_PATH);
      dispatchToast(
        <Toast>
          <ToastTitle
            action={
              <Link as="button" onClick={handleUndoRemoveCss}>
                Undo
              </Link>
            }
          >
            Removed {cssModuleBasename(removed.name)}
          </ToastTitle>
        </Toast>,
        { intent: 'info' },
      );
    },
    [cssModules, dispatchToast, handleUndoRemoveCss],
  );
  const handleRemoveActiveCssModule = React.useCallback(
    () => handleRemoveCssModule(activeFileId),
    [activeFileId, handleRemoveCssModule],
  );
  const handleViewportSelect = React.useCallback((_event: SelectionEvents, data: OptionOnSelectData) => {
    const preset = VIEWPORT_PRESETS.find(candidate => candidate.id === data.optionValue);
    if (preset) {
      setViewportId(preset.id);
    }
  }, []);

  const handleCopyLink = React.useCallback(async () => {
    if (!targetWindow) {
      return;
    }

    const baseUrl = `${targetWindow.location.origin}${targetWindow.location.pathname}${targetWindow.location.search}`;
    const url = createPlaygroundUrl(code, baseUrl, cssModules, initialTitle);

    try {
      if (!targetWindow.navigator.clipboard?.writeText) {
        throw new Error('Clipboard API is not available in this browser context.');
      }

      await targetWindow.navigator.clipboard.writeText(url);
      if (url.length > RECOMMENDED_MAX_URL_LENGTH) {
        notify(
          'Link copied, but it is long',
          'warning',
          `The link has ${url.length.toLocaleString()} characters. Some apps truncate links over ${RECOMMENDED_MAX_URL_LENGTH.toLocaleString()} characters, so consider trimming the example.`,
        );
      } else {
        notify('Link copied to clipboard', 'success');
      }
    } catch (err) {
      notify('Could not copy link', 'error', err instanceof Error ? err.message : String(err));
    }
  }, [code, cssModules, initialTitle, notify, targetWindow]);

  const handleCopyCode = React.useCallback(async () => {
    try {
      if (!targetWindow?.navigator.clipboard?.writeText) {
        throw new Error('Clipboard API is not available in this browser context.');
      }

      await targetWindow.navigator.clipboard.writeText(activeFile.value);
      notify(`Copied ${activeFile.path}`, 'success');
    } catch (err) {
      notify('Could not copy code', 'error', err instanceof Error ? err.message : String(err));
    }
  }, [activeFile, notify, targetWindow]);

  const handleSave = React.useCallback(async () => {
    try {
      await editorRef.current?.getAction('editor.action.formatDocument')?.run();
    } finally {
      setSaveCount(count => count + 1);
      dispatchToast(
        <Toast>
          <ToastTitle
            action={
              <Link as="button" onClick={handleCopyLink}>
                Copy link
              </Link>
            }
          >
            Saved to the link
          </ToastTitle>
          <ToastBody>The address bar has a shareable link with your current code.</ToastBody>
        </Toast>,
        { intent: 'success' },
      );
    }
  }, [dispatchToast, handleCopyLink]);

  React.useEffect(() => {
    if (!targetWindow) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isSaveShortcut(event, targetWindow.navigator.userAgent)) {
        // Replaces the browser "Save page" dialog, which is not useful for the playground.
        event.preventDefault();
        if (!event.repeat) {
          handleSave();
        }
      }
    };

    targetWindow.addEventListener('keydown', handleKeyDown);
    return () => targetWindow.removeEventListener('keydown', handleKeyDown);
  }, [handleSave, targetWindow]);

  const handleGoToDiagnostic = React.useCallback((diagnostic: CompileDiagnostic) => {
    if (!diagnostic.line) {
      return;
    }

    pendingReveal.current = { line: diagnostic.line, column: diagnostic.column ?? 1 };
    setActiveFileId(TSX_FILE_PATH);
    setPaneLayout(layout => (layout === 'preview' ? 'split' : layout));
    setRevealCount(count => count + 1);
  }, []);

  React.useEffect(() => {
    const editor = editorRef.current;
    const target = pendingReveal.current;
    if (!editor || !target || activeFileId !== TSX_FILE_PATH) {
      return;
    }

    pendingReveal.current = null;
    editor.setPosition({ lineNumber: target.line, column: target.column });
    editor.revealPositionInCenterIfOutsideViewport({ lineNumber: target.line, column: target.column });
    editor.focus();
  }, [activeFileId, revealCount]);

  const handleToggleEditorMaximized = React.useCallback(
    () => setPaneLayout(layout => (layout === 'editor' ? 'split' : 'editor')),
    [],
  );
  const handleTogglePreviewMaximized = React.useCallback(
    () => setPaneLayout(layout => (layout === 'preview' ? 'split' : 'preview')),
    [],
  );

  const handleThemeSelect = React.useCallback(
    (_event: SelectionEvents, data: OptionOnSelectData) => {
      if (!data.optionValue) {
        return;
      }

      setThemeId(data.optionValue);
      if (compiledCode && !paused) {
        setPreserveState(true);
        setStatus('compiling');
        setRunId(id => id + 1);
      }
    },
    [compiledCode, paused],
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
        if (typeErrorCount > 0) {
          return (
            <Tooltip
              content="Type errors do not block the preview. Select to jump to the next one."
              relationship="description"
            >
              <Button appearance="transparent" size="small" className={styles.typeErrors} onClick={handleNextTypeError}>
                <StatusIndicator tone="warning">
                  {typeErrorCount} {typeErrorCount === 1 ? 'type error' : 'type errors'}
                </StatusIndicator>
              </Button>
            </Tooltip>
          );
        }
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
            <h1 className={styles.title}>{playgroundTitle}</h1>
            {initialTitle ? (
              <span className={styles.exampleTitle} title={initialTitle}>
                {initialTitle}
              </span>
            ) : null}
            {metadata.subtitle && !initialTitle ? <span className={styles.subtitle}>{metadata.subtitle}</span> : null}
          </div>

          <Toolbar aria-label="Playground actions" className={styles.toolbar}>
            <ToolbarAction
              icon={<PlayRegular />}
              label="Run"
              tooltip={`Reevaluate the code and remount the example (${runShortcut})`}
              appearance="primary"
              compact={compactToolbar}
              onClick={handleRun}
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
              tooltip={`Copy a shareable link with the current code and styles (${saveShortcut} formats and updates the link in the address bar)`}
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

        <main
          ref={mainRef}
          className={mergeClasses(styles.main, paneLayout !== 'split' && styles.mainMaximized)}
          style={splitStyle}
        >
          <section
            className={mergeClasses(styles.pane, paneLayout === 'preview' && styles.paneHidden)}
            aria-label={cssModules.length === 0 ? 'Code editor' : undefined}
            aria-labelledby={cssModules.length > 0 ? `${fileTabId}-${activeFileIndex}` : undefined}
            id={cssModules.length > 0 ? editorPanelId : undefined}
            role={cssModules.length > 0 ? 'tabpanel' : undefined}
          >
            <div className={styles.paneHeader}>
              <span className={styles.paneTitle}>
                <DocumentRegular />
                {cssModules.length > 0 ? (
                  <span className={styles.fileTabs} role="tablist" aria-label="Playground files">
                    <button
                      type="button"
                      role="tab"
                      id={`${fileTabId}-0`}
                      aria-controls={editorPanelId}
                      aria-selected={activeFileId === TSX_FILE_PATH}
                      tabIndex={activeFileId === TSX_FILE_PATH ? 0 : -1}
                      className={mergeClasses(styles.fileTab, activeFileId === TSX_FILE_PATH && styles.fileTabActive)}
                      onClick={() => setActiveFileId(TSX_FILE_PATH)}
                      onKeyDown={event => handleFileTabKeyDown(event, 0)}
                    >
                      {TSX_FILE_PATH}
                    </button>
                    {cssModules.map((mod, index) => {
                      const tabId = mod.name;
                      const selected = activeFileId === tabId;
                      const tabIndex = index + 1;

                      return (
                        <button
                          key={tabId}
                          type="button"
                          role="tab"
                          id={`${fileTabId}-${tabIndex}`}
                          aria-controls={editorPanelId}
                          aria-selected={selected}
                          tabIndex={selected ? 0 : -1}
                          className={mergeClasses(styles.fileTab, selected && styles.fileTabActive)}
                          onClick={() => setActiveFileId(tabId)}
                          onKeyDown={event => handleFileTabKeyDown(event, tabIndex)}
                        >
                          {cssModuleBasename(mod.name)}
                        </button>
                      );
                    })}
                  </span>
                ) : (
                  <span className={styles.fileName}>{TSX_FILE_PATH}</span>
                )}
                <Popover open={newCssOpen} onOpenChange={handleNewCssOpenChange} trapFocus positioning="below-start">
                  <PopoverTrigger disableButtonEnhancement>
                    <Tooltip content="Add CSS module" relationship="label">
                      <Button appearance="subtle" size="small" icon={<AddRegular />} />
                    </Tooltip>
                  </PopoverTrigger>
                  <PopoverSurface aria-label="Add CSS module">
                    <form className={styles.newFileForm} onSubmit={handleAddCssModule}>
                      <Field
                        label="CSS module name"
                        size="small"
                        validationState={newCssError ? 'error' : 'none'}
                        validationMessage={newCssError ?? `Import it with: import styles from './${newCssModuleName}';`}
                      >
                        <Input size="small" value={newCssName} onChange={handleNewCssNameChange} />
                      </Field>
                      <Button
                        type="submit"
                        appearance="primary"
                        size="small"
                        disabled={Boolean(newCssError) || !newCssName.trim()}
                      >
                        Add
                      </Button>
                    </form>
                  </PopoverSurface>
                </Popover>
              </span>
              <span className={styles.paneMeta}>
                {activeFile.language === 'css' ? (
                  <>
                    <StatusIndicator tone="neutral">CSS</StatusIndicator>
                    <Tooltip content={`Remove ${activeFile.path}`} relationship="label">
                      <Button
                        appearance="subtle"
                        size="small"
                        icon={<DeleteRegular />}
                        onClick={handleRemoveActiveCssModule}
                      />
                    </Tooltip>
                  </>
                ) : (
                  renderTypingsStatus()
                )}
                <Tooltip content={`Copy ${activeFile.path}`} relationship="label">
                  <Button appearance="subtle" size="small" icon={<CopyRegular />} onClick={handleCopyCode} />
                </Tooltip>
                <Tooltip content={paneLayout === 'editor' ? 'Show preview' : 'Maximize editor'} relationship="label">
                  <Button
                    appearance="subtle"
                    size="small"
                    aria-pressed={paneLayout === 'editor'}
                    icon={paneLayout === 'editor' ? <ArrowMinimizeRegular /> : <ArrowMaximizeRegular />}
                    onClick={handleToggleEditorMaximized}
                  />
                </Tooltip>
              </span>
            </div>
            <Editor
              file={activeFile}
              files={editorFiles}
              onChange={handleEditorChange}
              onModelReady={setModel}
              onEditorReady={handleEditorReady}
              onRun={handleRun}
              themeOption={shellTheme}
            />
          </section>

          <div
            {...split.separatorProps}
            aria-label="Resize editor and preview"
            className={mergeClasses(
              styles.separator,
              split.dragging && styles.separatorActive,
              paneLayout !== 'split' && styles.paneHidden,
            )}
          />

          <section
            className={mergeClasses(styles.pane, styles.previewPane, paneLayout === 'editor' && styles.paneHidden)}
            aria-label="Preview"
          >
            <div className={mergeClasses(styles.paneHeader, styles.previewHeader)}>
              <span className={styles.paneTitle}>
                <EyeRegular />
                Preview
              </span>
              <Toolbar aria-label="Preview actions" className={styles.toolbar}>
                <Dropdown
                  aria-label="Preview width"
                  className={styles.viewportPicker}
                  size="small"
                  appearance="underline"
                  value={VIEWPORT_PRESETS.find(preset => preset.id === viewportId)?.label}
                  selectedOptions={[viewportId]}
                  onOptionSelect={handleViewportSelect}
                >
                  {VIEWPORT_PRESETS.map(preset => (
                    <Option key={preset.id} value={preset.id}>
                      {preset.label}
                    </Option>
                  ))}
                </Dropdown>
                <ToolbarAction
                  icon={<ArrowClockwiseRegular />}
                  label="Restart preview"
                  tooltip="Start in a fresh sandbox, clearing previous timers, listeners and global side effects"
                  compact
                  onClick={handleRestart}
                />
                <ToolbarAction
                  icon={paneLayout === 'preview' ? <ArrowMinimizeRegular /> : <ArrowMaximizeRegular />}
                  label={paneLayout === 'preview' ? 'Show editor' : 'Maximize preview'}
                  tooltip={paneLayout === 'preview' ? 'Show the editor next to the preview' : 'Hide the editor'}
                  compact
                  onClick={handleTogglePreviewMaximized}
                />
              </Toolbar>
              <span className={styles.paneMeta} aria-live="polite">
                {renderRunStatus()}
              </span>
            </div>
            <Preview
              code={compiledCode}
              requiredModules={requiredModules}
              runId={runId}
              restartId={restartId}
              preserveState={preserveState}
              paused={paused}
              themeId={themeId}
              cssModules={previewCssModules}
              manifest={manifest}
              onMetadata={handleMetadata}
              onSuccess={handleRuntimeSuccess}
              onError={handleRuntimeError}
              onConsole={handleConsole}
              frameWidth={VIEWPORT_PRESETS.find(preset => preset.id === viewportId)?.width}
              placeholder={renderPlaceholder()}
            />
            {error ? (
              <div className={styles.errorBar} role="alert">
                <span className={styles.errorDot} aria-hidden="true" />
                <div>
                  <p className={styles.errorTitle}>{error.title}</p>
                  {error.diagnostics ? (
                    <ul className={styles.diagnostics}>
                      {error.diagnostics.map((diagnostic, index) => (
                        <li key={index} className={styles.errorMessage}>
                          {diagnostic.line ? (
                            <DiagnosticLocation diagnostic={diagnostic} onSelect={handleGoToDiagnostic} />
                          ) : null}
                          {diagnostic.message}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <pre className={styles.errorMessage}>{error.message}</pre>
                  )}
                  {error.previewRetained ? (
                    <Text size={200} className={styles.errorHint}>
                      The preview shows the last successful render.
                    </Text>
                  ) : null}
                </div>
              </div>
            ) : null}
            <ConsolePanel
              entries={consoleEntries}
              expanded={consoleExpanded}
              onExpandedChange={setConsoleExpanded}
              onClear={handleClearConsole}
            />
          </section>
        </main>

        <Toaster toasterId={toasterId} position="bottom-end" />
      </div>
    </FluentProvider>
  );
});

Playground.displayName = 'Playground';
