import * as React from 'react';
import { mergeClasses } from '@fluentui/react-components';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';

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
  manifest: ResolvedPlaygroundRuntimeManifest;
  onMetadata: (metadata: PlaygroundSetupMetadata) => void;
  onSuccess: (runId: number) => void;
  onError: (error: { kind: PlaygroundRuntimeErrorKind; message: string; runId: number }) => void;
  placeholder?: React.ReactNode;
  className?: string;
}

export const Preview = React.forwardRef<HTMLDivElement, PreviewProps>((props, ref) => {
  const { code, runId, themeId, manifest, onMetadata, onSuccess, onError, placeholder, className } = props;
  const styles = usePreviewStyles();
  const { targetDocument } = useFluent_unstable();
  const frameRef = React.useRef<HTMLIFrameElement | null>(null);
  const token = React.useMemo(
    () => `${manifest.buildId}:${runId}:${Math.random().toString(36).slice(2)}`,
    [manifest.buildId, runId],
  );
  const source = React.useMemo(() => createSandboxDocument(manifest, token), [manifest, token]);

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
        onMetadata(message.metadata);
        if (code) {
          frameRef.current?.contentWindow?.postMessage(
            {
              source: 'fluentui-playground',
              token,
              type: 'run',
              code,
              themeId,
              runId,
            },
            '*',
          );
        }
      } else if (message.type === 'success') {
        onSuccess(message.runId);
      } else if (message.type === 'error') {
        onError(message);
      }
    };

    targetWindow.addEventListener('message', handleMessage);
    return () => targetWindow.removeEventListener('message', handleMessage);
  }, [code, onError, onMetadata, onSuccess, runId, targetDocument, themeId, token]);

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
