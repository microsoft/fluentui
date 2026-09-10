import * as React from 'react';
import {
  Dropdown,
  FluentProvider,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
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
  useFluent,
  useId,
  useToastController,
  type OptionOnSelectData,
  type SelectionEvents,
} from '@fluentui/react-components';
import { ArrowResetRegular, LinkRegular, PlayRegular, TextGrammarWandRegular } from '@fluentui/react-icons';

import { createCodeHash } from '../url';
import { compile, formatDiagnostics } from './compiler';
import { Editor } from './Editor';
import { registerFormatter } from './formatter';
import { monaco } from './monaco';
import { moduleLoaders } from './modules';
import { usePlaygroundStyles } from './Playground.styles';
import { Preview } from './Preview';
import { evaluate, PlaygroundError, type PlaygroundComponent } from './runner';
import { defaultThemeOption, getThemeOption, themeOptions } from './themes';
import { registerTypings } from './typings';

export interface PlaygroundProps {
  initialCode: string;
}

interface PlaygroundErrorState {
  title: string;
  message: string;
}

const RUN_DEBOUNCE_MS = 400;
const HASH_SYNC_DEBOUNCE_MS = 500;

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

export const Playground = React.forwardRef<HTMLDivElement, PlaygroundProps>((props, ref) => {
  const { initialCode } = props;
  const styles = usePlaygroundStyles();
  const { targetDocument } = useFluent();
  const targetWindow = targetDocument?.defaultView;

  const [code, setCode] = React.useState(initialCode);
  const [model, setModel] = React.useState<monaco.editor.ITextModel | null>(null);
  const [component, setComponent] = React.useState<PlaygroundComponent | null>(null);
  const [runId, setRunId] = React.useState(0);
  const [status, setStatus] = React.useState<'idle' | 'compiling' | 'ready' | 'error'>('idle');
  const [error, setError] = React.useState<PlaygroundErrorState | null>(null);
  const [themeId, setThemeId] = React.useState(defaultThemeOption.id);
  const [typingsStatus, setTypingsStatus] = React.useState<'loading' | 'ready' | 'error'>('loading');

  const runCounter = React.useRef(0);
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const toasterId = useId('playground-toaster');
  const { dispatchToast } = useToastController(toasterId);
  const themeOption = getThemeOption(themeId);

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

  // Prettier as "Format Document" provider (Shift+Alt+F and the toolbar button)
  React.useEffect(() => {
    const disposable = registerFormatter(monaco, {
      // Prettier appends a code frame to syntax errors, the first line (message + location) is enough for a toast
      onError: err => notify('Cannot format code', 'error', err.message.split('\n')[0]),
    });

    return () => disposable.dispose();
  }, [notify]);

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
    setError(toErrorState(err));
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

  return (
    <FluentProvider theme={themeOption.theme}>
      <div ref={ref} className={styles.root}>
        <header className={styles.header}>
          <Text as="h1" size={400} className={styles.title}>
            Fluent UI React v9 Playground
          </Text>
          <span className={styles.status} aria-live="polite">
            {status === 'compiling' ? <Spinner size="extra-tiny" label="Compiling…" labelPosition="after" /> : null}
            {status === 'ready' ? <Text size={200}>Ready</Text> : null}
            {status === 'error' ? <Text size={200}>Error</Text> : null}
          </span>
          {typingsStatus === 'loading' ? (
            <span className={styles.status}>
              <Spinner size="extra-tiny" label="Loading IntelliSense…" labelPosition="after" />
            </span>
          ) : null}
          <Toolbar aria-label="Playground actions" className={styles.toolbar}>
            <Tooltip content="Re-run the code (remounts the preview)" relationship="description">
              <ToolbarButton icon={<PlayRegular />} onClick={run}>
                Run
              </ToolbarButton>
            </Tooltip>
            <Tooltip content="Restore the initial code" relationship="description">
              <ToolbarButton icon={<ArrowResetRegular />} onClick={handleReset}>
                Reset
              </ToolbarButton>
            </Tooltip>
            <Tooltip content="Format the code with Prettier (Shift+Alt+F)" relationship="description">
              <ToolbarButton icon={<TextGrammarWandRegular />} onClick={handleFormat}>
                Format
              </ToolbarButton>
            </Tooltip>
            <Tooltip content="Copy a shareable link with the current code" relationship="description">
              <ToolbarButton icon={<LinkRegular />} onClick={handleCopyLink}>
                Copy link
              </ToolbarButton>
            </Tooltip>
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

        <main className={styles.main}>
          <section className={styles.editorPane} aria-label="Code editor">
            <Editor
              value={code}
              onChange={setCode}
              onModelReady={setModel}
              onEditorReady={handleEditorReady}
              dark={themeOption.dark}
            />
          </section>
          <section className={styles.previewPane} aria-label="Preview">
            <Preview component={component} runId={runId} theme={themeOption.theme} onError={handleRuntimeError} />
            {error ? (
              <MessageBar intent="error" layout="multiline" className={styles.errorBar}>
                <MessageBarBody>
                  <MessageBarTitle>{error.title}</MessageBarTitle>
                  <pre className={styles.errorMessage}>{error.message}</pre>
                </MessageBarBody>
              </MessageBar>
            ) : null}
          </section>
        </main>

        <Toaster toasterId={toasterId} position="bottom-end" />
      </div>
    </FluentProvider>
  );
});

Playground.displayName = 'Playground';
