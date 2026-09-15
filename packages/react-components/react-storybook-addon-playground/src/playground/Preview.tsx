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

export interface PreviewProps {
  code: string | null;
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
 * Sandboxed preview iframe. The iframe document is created once per manifest (opaque origin via
 * `sandbox="allow-scripts"`); subsequent runs postMessage compiled code without remounting.
 */
export const Preview = React.forwardRef<HTMLDivElement, PreviewProps>((props, ref) => {
  const { code, runId, themeId, cssModules, manifest, onMetadata, onSuccess, onError, placeholder, className } = props;
  const styles = usePreviewStyles();
  const { targetDocument } = useFluent();
  const frameRef = React.useRef<HTMLIFrameElement | null>(null);
  const readyRef = React.useRef(false);
  // Stable for the lifetime of this manifest so recompiles don't tear down the sandbox
  const token = React.useMemo(() => `${manifest.buildId}:${Math.random().toString(36).slice(2)}`, [manifest.buildId]);
  const source = React.useMemo(() => createSandboxDocument(manifest, token), [manifest, token]);

  React.useEffect(() => {
    readyRef.current = false;
  }, [token]);

  const postRun = React.useCallback(() => {
    if (!readyRef.current || !code || !frameRef.current?.contentWindow) {
      return;
    }

    frameRef.current.contentWindow.postMessage(
      {
        source: 'fluentui-playground',
        token,
        type: 'run',
        code,
        cssModules,
        themeId,
        runId,
      },
      '*',
    );
  }, [code, cssModules, runId, themeId, token]);

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

  // When code / theme / runId change after the sandbox is ready, send another run without remounting
  React.useEffect(() => {
    postRun();
  }, [postRun]);

  return (
    <div ref={ref} className={mergeClasses(styles.root, className)}>
      <iframe
        key={token}
        ref={frameRef}
        title="Playground preview"
        sandbox="allow-scripts"
        srcDoc={source}
        className={styles.frame}
      />
      {!code && placeholder ? <div className={styles.placeholder}>{placeholder}</div> : null}
    </div>
  );
});

Preview.displayName = 'Preview';
