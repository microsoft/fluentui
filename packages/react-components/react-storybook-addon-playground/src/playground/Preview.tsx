import * as React from 'react';
import { mergeClasses, useFluent } from '@fluentui/react-components';

import type { PlaygroundSetupMetadata } from '../setup';
import type {
  PlaygroundRuntimeErrorKind,
  PlaygroundRuntimeMessage,
  ResolvedPlaygroundRuntimeManifest,
} from './runtime';
import { createSandboxDocument } from './sandbox';
import { usePreviewStyles } from './Preview.styles';

export const PREVIEW_SANDBOX = 'allow-scripts';

export interface PreviewProps {
  code: string | null;
  requiredModules?: string[];
  runId: number;
  themeId?: string;
  cssModules?: Array<{ name: string; specifier: string; locals: Record<string, string>; cssText: string }>;
  manifest: ResolvedPlaygroundRuntimeManifest;
  onMetadata: (metadata: PlaygroundSetupMetadata) => void;
  onSuccess: (runId: number) => void;
  onError: (error: { kind: PlaygroundRuntimeErrorKind; message: string; runId: number }) => void;
  placeholder?: React.ReactNode;
  className?: string;
}

/**
 * Sandboxed preview iframe. A distinct opaque-origin iframe (`sandbox="allow-scripts"`) is created for every run,
 * preventing asynchronous work from a previous run from affecting the current preview.
 */
export const Preview = React.forwardRef<HTMLDivElement, PreviewProps>((props, ref) => {
  const {
    code,
    requiredModules,
    runId,
    themeId,
    cssModules,
    manifest,
    onMetadata,
    onSuccess,
    onError,
    placeholder,
    className,
  } = props;
  const styles = usePreviewStyles();
  const { targetDocument } = useFluent();
  const frameRef = React.useRef<HTMLIFrameElement | null>(null);
  const readyRef = React.useRef(false);
  // Each run gets an isolated iframe so asynchronous work from a previous run cannot affect the current preview.
  const token = React.useMemo(
    () => `${manifest.buildId}:${runId}:${Math.random().toString(36).slice(2)}`,
    [manifest.buildId, runId],
  );
  const source = React.useMemo(() => createSandboxDocument(manifest, token), [manifest, token]);

  React.useEffect(() => {
    readyRef.current = false;
  }, [token]);

  const postRun = React.useCallback(() => {
    if (!readyRef.current || code === null || !frameRef.current?.contentWindow) {
      return;
    }

    frameRef.current.contentWindow.postMessage(
      {
        source: 'fluentui-playground',
        token,
        type: 'run',
        code,
        requiredModules,
        cssModules,
        themeId,
        runId,
      },
      '*',
    );
  }, [code, cssModules, requiredModules, runId, themeId, token]);

  React.useEffect(() => {
    const targetWindow = targetDocument?.defaultView;
    if (!targetWindow) {
      return;
    }

    const handleMessage = (event: MessageEvent<PlaygroundRuntimeMessage>) => {
      const message = event.data;
      if (event.source !== frameRef.current?.contentWindow || message?.token !== token) {
        return;
      }

      if (message.type === 'ready') {
        readyRef.current = true;
        onMetadata(message.metadata);
        postRun();
      } else if (message.type === 'success') {
        onSuccess(message.runId);
      } else if (message.type === 'error') {
        onError(message);
      }
    };

    targetWindow.addEventListener('message', handleMessage);
    return () => targetWindow.removeEventListener('message', handleMessage);
  }, [onError, onMetadata, onSuccess, postRun, targetDocument, token]);

  // Send the current run once its sandbox is ready.
  React.useEffect(() => {
    postRun();
  }, [postRun]);

  return (
    <div ref={ref} className={mergeClasses(styles.root, className)}>
      <iframe
        key={token}
        ref={frameRef}
        title="Playground preview"
        // User code is evaluated with `new Function` inside this opaque-origin iframe. Do not add `allow-same-origin`.
        sandbox={PREVIEW_SANDBOX}
        srcDoc={source}
        className={styles.frame}
      />
      {code === null && placeholder ? <div className={styles.placeholder}>{placeholder}</div> : null}
    </div>
  );
});

Preview.displayName = 'Preview';
