import * as React from 'react';
import { mergeClasses } from '@griffel/react';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useIdNamespaceDemoStyles } from './IdNamespaceDemo.styles';

export type IdNamespaceDemoProps = {
  baseUrl?: string;
  scenario?: string;
};

const Scenario: ForwardRefComponent<{ baseUrl: string; name: string }> = React.forwardRef(({ baseUrl, name }, ref) => {
  const styles = useIdNamespaceDemoStyles();
  const { targetDocument } = useFluent_unstable();
  const frame = React.useRef<HTMLIFrameElement>(null);
  const [state, setState] = React.useState({ value: '', ready: false });
  const [generation, setGeneration] = React.useState(0);
  const src = `${baseUrl}/${name}/index.html`;
  const origin = targetDocument ? new URL(src, targetDocument.baseURI).origin : undefined;

  const command = React.useCallback((action: 'unmount' | 'updateTheme' | 'getState', app?: 'host' | 'embedded') => {
    if (origin && frame.current?.contentWindow) {
      frame.current.contentWindow.postMessage({ type: 'id-namespace-command', action, name: app }, origin);
    }
  }, [origin]);

  useIsomorphicLayoutEffect(() => {
    const view = targetDocument?.defaultView;
    if (!view) {
      return;
    }
    const receive = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow || event.origin !== origin) {
        return;
      }
      const data: unknown = event.data;
      if (
        typeof data === 'object' &&
        data !== null &&
        'type' in data &&
        data.type === 'id-namespace-state' &&
        'value' in data &&
        typeof data.value === 'string' &&
        'ready' in data &&
        typeof data.ready === 'boolean'
      ) {
        setState({ value: data.value, ready: data.ready });
      }
    };
    view.addEventListener('message', receive);
    command('getState');
    return () => view.removeEventListener('message', receive);
  }, [targetDocument, origin, command]);

  return (
    <section ref={ref} className={styles.panel} data-demo-panel={name}>
      <h3>{name === 'broken' ? 'Unconfigured: collisions are possible' : `Protected: ${name}`}</h3>
      <div className={styles.controls}>
        <button disabled={!state.ready} onClick={() => command('updateTheme', 'embedded')}>
          Update embedded theme
        </button>
        <button disabled={!state.ready} onClick={() => command('unmount', 'embedded')}>
          Unmount embedded app
        </button>
        <button disabled={!state.ready} onClick={() => command('unmount', 'host')}>
          Unmount host app
        </button>
        <button
          onClick={() => {
            setState({ value: '', ready: false });
            setGeneration(value => value + 1);
          }}
        >
          Reset scenario
        </button>
      </div>
      <iframe
        key={generation}
        ref={frame}
        className={styles.frame}
        title={`ID namespace ${name}`}
        src={src}
        data-scenario={name}
        onLoad={() => command('getState')}
      />
      <h4>Computed tokens and identifiers</h4>
      <pre className={styles.readout} data-demo-state="" aria-live="polite">
        {state.value || 'Waiting for the independent applications...'}
      </pre>
    </section>
  );
});

export const IdNamespaceDemo: ForwardRefComponent<IdNamespaceDemoProps> = React.forwardRef(
  ({ baseUrl = './id-namespace-demo', scenario }, ref) => {
    const styles = useIdNamespaceDemoStyles();
    const scenarios = scenario ? [scenario] : ['broken', 'build'];
    return (
      <div ref={ref} className={mergeClasses(styles.root, scenario && styles.single)}>
        {scenarios.map(name => (
          <Scenario key={name} baseUrl={baseUrl} name={name} />
        ))}
      </div>
    );
  },
);
