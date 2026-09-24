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
  liveUpdate?: boolean;
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

interface SandboxFrameProps extends PreviewProps {
  hidden: boolean;
}

const SandboxFrame: ForwardRefComponent<SandboxFrameProps> = React.forwardRef((props, ref) => {
  const {
    code,
    requiredModules,
    runId,
    liveUpdate,
    preserveState,
    paused,
    themeId,
    cssModules,
    manifest,
    onMetadata,
    onSuccess,
    onError,
    hidden,
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
        preserveState: liveUpdate && preserveState,
      },
      '*',
    );
  }, [code, cssModules, liveUpdate, paused, preserveState, requiredModules, runId, themeId, token]);

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
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
    />
  );
});
SandboxFrame.displayName = 'SandboxFrame';

const ignoreMetadata = () => undefined;

function frameKey(props: PreviewProps): string {
  return `${props.manifest.buildId}:${props.restartId ?? 0}:${props.liveUpdate ? 'live' : props.runId}`;
}

/**
 * Prepare each run in a fresh opaque-origin iframe, keeping the previous successful frame visible until the
 * replacement renders. Once swapped, removing the old iframe also disposes its timers and other asynchronous work.
 * Opt-in live updates reuse one iframe until the mode, runtime build or explicit restart ID changes.
 */
export const Preview = React.forwardRef<HTMLDivElement, PreviewProps>((props, ref) => {
  const styles = usePreviewStyles();
  const [successful, setSuccessful] = React.useState<PreviewProps | null>(null);
  const [failedKey, setFailedKey] = React.useState<string | null>(null);
  const currentKey = frameKey(props);
  const successfulKey = successful && frameKey(successful);
  const retained =
    !props.liveUpdate &&
    successful &&
    !successful.liveUpdate &&
    successfulKey !== currentKey &&
    successful.manifest === props.manifest &&
    successful.restartId === props.restartId;
  const frames = retained ? [successful, props] : [props];
  const handleSuccess = React.useCallback(
    (runId: number) => {
      if (runId === props.runId) {
        setSuccessful(props);
        props.onSuccess(runId);
      }
    },
    [props],
  );
  const handleError = React.useCallback(
    (error: Parameters<PreviewProps['onError']>[0]) => {
      if (error.runId === props.runId) {
        setFailedKey(currentKey);
        const previewRetained = Boolean(retained || (props.liveUpdate && error.previewRetained));
        if (!previewRetained) {
          setSuccessful(null);
        }
        props.onError({ ...error, previewRetained });
      }
    },
    [currentKey, props, retained],
  );

  return (
    <div ref={ref} className={mergeClasses(styles.root, props.className)}>
      {frames.map(frame => {
        const key = frameKey(frame);
        if (key === failedKey && retained) {
          return null;
        }
        const isCurrent = key === currentKey;
        const hidden = Boolean(retained && isCurrent);
        return (
          <SandboxFrame
            {...frame}
            key={key}
            hidden={hidden}
            className={mergeClasses(styles.frame, hidden && styles.pendingFrame)}
            onMetadata={isCurrent ? props.onMetadata : ignoreMetadata}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        );
      })}
      {props.code === null && props.placeholder ? <div className={styles.placeholder}>{props.placeholder}</div> : null}
    </div>
  );
});

Preview.displayName = 'Preview';
