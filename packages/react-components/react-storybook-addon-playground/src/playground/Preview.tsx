import * as React from 'react';
import { mergeClasses, useFluent, useMergedRefs, type ForwardRefComponent } from '@fluentui/react-components';

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
  restartId?: number;
  preserveState?: boolean;
  paused?: boolean;
  themeId?: string;
  cssModules?: Array<{ name: string; specifier: string; locals: Record<string, string>; cssText: string }>;
  manifest: ResolvedPlaygroundRuntimeManifest;
  onMetadata: (metadata: PlaygroundSetupMetadata) => void;
  onSuccess: (runId: number) => void;
  onError: (error: {
    kind: PlaygroundRuntimeErrorKind;
    message: string;
    runId: number;
    previewRetained?: boolean;
  }) => void;
  placeholder?: React.ReactNode;
  className?: string;
}

const SandboxFrame: ForwardRefComponent<PreviewProps> = React.forwardRef((props, ref) => {
  const {
    code,
    requiredModules,
    runId,
    preserveState,
    paused,
    themeId,
    cssModules,
    manifest,
    onMetadata,
    onSuccess,
    onError,
    className,
  } = props;
  const { targetDocument } = useFluent();
  const frameRef = React.useRef<HTMLIFrameElement | null>(null);
  const mergedRef = useMergedRefs(ref, frameRef);
  const readyRef = React.useRef(false);
  const postedRunRef = React.useRef<number | undefined>(undefined);
  // Live updates reuse this token; only replacing the iframe resets its environment.
  const [token] = React.useState(() => `${manifest.buildId}:${runId}:${Math.random().toString(36).slice(2)}`);
  const source = React.useMemo(() => createSandboxDocument(manifest, token), [manifest, token]);

  React.useEffect(() => {
    readyRef.current = false;
  }, [token]);

  const postRun = React.useCallback(() => {
    if (!readyRef.current || !frameRef.current?.contentWindow) {
      return;
    }

    if (paused) {
      frameRef.current.contentWindow.postMessage({ source: 'fluentui-playground', token, type: 'invalidate' }, '*');
      return;
    }
    if (code === null || postedRunRef.current === runId) {
      return;
    }
    postedRunRef.current = runId;
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
        preserveState,
      },
      '*',
    );
  }, [code, cssModules, paused, preserveState, requiredModules, runId, themeId, token]);

  React.useEffect(() => {
    const targetWindow = targetDocument?.defaultView;
    if (!targetWindow) {
      return;
    }

    const handleMessage = (event: MessageEvent<PlaygroundRuntimeMessage>) => {
      const message = event.data;
      if (
        event.source !== frameRef.current?.contentWindow ||
        message?.source !== 'fluentui-playground' ||
        message.token !== token
      ) {
        return;
      }

      if (message.type === 'ready') {
        readyRef.current = true;
        onMetadata(message.metadata);
        postRun();
      } else if (message.type === 'success' && message.runId === runId && !paused) {
        onSuccess(message.runId);
      } else if (message.type === 'error' && message.runId === runId && !paused) {
        onError(message);
      }
    };

    targetWindow.addEventListener('message', handleMessage);
    return () => targetWindow.removeEventListener('message', handleMessage);
  }, [onError, onMetadata, onSuccess, paused, postRun, runId, targetDocument, token]);

  // Send the current run once its sandbox is ready.
  React.useEffect(() => {
    postRun();
  }, [postRun]);

  return (
    <iframe
      ref={mergedRef}
      title="Playground preview"
      // User code is evaluated with `new Function` inside this opaque-origin iframe. Do not add `allow-same-origin`.
      sandbox={PREVIEW_SANDBOX}
      srcDoc={source}
      className={className}
    />
  );
});
SandboxFrame.displayName = 'SandboxFrame';

/**
 * Reuse the opaque-origin sandbox and its loaded packages until the runtime build or explicit restart ID changes.
 */
export const Preview = React.forwardRef<HTMLDivElement, PreviewProps>((props, ref) => {
  const styles = usePreviewStyles();

  return (
    <div ref={ref} className={mergeClasses(styles.root, props.className)}>
      <SandboxFrame {...props} key={`${props.manifest.buildId}:${props.restartId ?? 0}`} className={styles.frame} />
      {props.code === null && props.placeholder ? <div className={styles.placeholder}>{props.placeholder}</div> : null}
    </div>
  );
});

Preview.displayName = 'Preview';
