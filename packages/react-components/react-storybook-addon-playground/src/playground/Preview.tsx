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
  // Each run gets an isolated iframe so asynchronous work from a previous run cannot affect the current preview.
  const [token] = React.useState(() => `${manifest.buildId}:${runId}:${Math.random().toString(36).slice(2)}`);
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
      } else if (message.type === 'success' && message.runId === runId) {
        onSuccess(message.runId);
      } else if (message.type === 'error' && message.runId === runId) {
        onError(message);
      }
    };

    targetWindow.addEventListener('message', handleMessage);
    return () => targetWindow.removeEventListener('message', handleMessage);
  }, [onError, onMetadata, onSuccess, postRun, runId, targetDocument, token]);

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

/**
 * Prepare each run in a fresh opaque-origin iframe, keeping the previous successful frame visible until the
 * replacement renders. Once swapped, removing the old iframe also disposes its timers and other asynchronous work.
 */
export const Preview = React.forwardRef<HTMLDivElement, PreviewProps>((props, ref) => {
  const styles = usePreviewStyles();
  const [successful, setSuccessful] = React.useState<PreviewProps | null>(null);
  const [failedKey, setFailedKey] = React.useState<string | null>(null);
  const currentKey = `${props.manifest.buildId}:${props.runId}`;
  const successfulKey = successful && `${successful.manifest.buildId}:${successful.runId}`;
  const retained = successful && successfulKey !== currentKey && successful.manifest === props.manifest;
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
        if (!retained) {
          setSuccessful(null);
        }
        props.onError({ ...error, previewRetained: Boolean(retained) });
      }
    },
    [currentKey, props, retained],
  );

  return (
    <div ref={ref} className={mergeClasses(styles.root, props.className)}>
      {frames.map(frame => {
        const key = `${frame.manifest.buildId}:${frame.runId}`;
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
