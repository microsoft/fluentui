'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import type { VegaDeclarativeChartProps, VegaDeclarativeChartState } from './VegaDeclarativeChart.types';
import type { VegaLiteSpec, VegaLiteSemanticMode } from './VegaLiteTypes';
import { validateVegaLiteSpec } from './VegaLiteDiagnostics';
import type { VegaLiteDiagnostic } from './VegaLiteDiagnostics';
import { resolveVegaLiteResources } from './VegaLiteResourceLoader';
import type { VegaDataResolver } from './VegaLiteResourceLoader';
import { buildVegaViewTree } from './VegaLiteViewTree';
import { planVegaDeclarativeChartViews } from './VegaDeclarativeChartView';
import { useIsDarkTheme, useColorMapping } from './VegaDeclarativeChartHooks';

const MAX_DEPTH = 15;
const safetyCodes = new Set(['unsafe-accessor', 'unsafe-value', 'cycle', 'depth-limit', 'work-limit']);
const own = (value: unknown, key: string): unknown =>
  value && typeof value === 'object' ? Object.getOwnPropertyDescriptor(value, key)?.value : undefined;
const ownArray = (value: unknown): unknown[] =>
  Array.isArray(value)
    ? Object.keys(value)
        .filter(key => /^(0|[1-9]\d*)$/.test(key))
        .map(key => own(value, key))
    : [];

/** Preserve the legacy bounded depth guard after safe preflight. Never invoke accessors. */
function validateJsonDepth(value: unknown, depth = 0): void {
  if (depth > MAX_DEPTH) {
    throw new Error('VegaDeclarativeChart: Maximum JSON depth exceeded');
  }
  if (value !== null && typeof value === 'object') {
    Object.keys(value).forEach(key => validateJsonDepth(own(value, key), depth + 1));
  }
}

function diagnosticError(diagnostics: VegaLiteDiagnostic[]): Error {
  return new Error(
    `VegaDeclarativeChart: ${diagnostics
      .map(item => `${item.path} [${item.code}] ${item.message} ${item.remedy}`)
      .join('\n')}`,
  );
}

// Walk only declared resource locations after bounded preflight, not arbitrary data-row properties.
function hasResources(spec: VegaLiteSpec): boolean {
  if (
    own(own(spec, 'data'), 'url') !== undefined ||
    ownArray(own(spec, 'transform')).some(
      transform =>
        own(transform, 'lookup') !== undefined && own(own(own(transform, 'from'), 'data'), 'url') !== undefined,
    )
  ) {
    return true;
  }
  return ['hconcat', 'vconcat', 'concat', 'layer']
    .flatMap(key => ownArray(own(spec, key)))
    .concat(own(spec, 'spec') ? [own(spec, 'spec')] : [])
    .some(child => hasResources(child as VegaLiteSpec));
}

/** Bound statically declared repeat expansion before authorizing host I/O. */
function declaredViewCount(spec: VegaLiteSpec): number {
  const repeat = own(spec, 'repeat');
  if (repeat !== undefined) {
    const row = own(repeat, 'row');
    const columns = Array.isArray(repeat) ? repeat : own(repeat, 'repeat') ?? own(repeat, 'column');
    const count = (Array.isArray(row) ? row.length : 1) * (Array.isArray(columns) ? columns.length : 1);
    return count * declaredViewCount(own(spec, 'spec') as VegaLiteSpec);
  }
  const children = ['hconcat', 'vconcat', 'concat'].flatMap(key => ownArray(own(spec, key)));
  return 1 + children.reduce<number>((total, child) => total + declaredViewCount(child as VegaLiteSpec), 0);
}

type ResourceRequest = {
  spec: VegaLiteSpec;
  resolver?: VegaDataResolver;
  origins?: readonly string[];
  baseUrl?: string;
  mode: VegaLiteSemanticMode;
};
type ResourceState = { request: ResourceRequest; spec?: VegaLiteSpec; error?: Error };

/** Owns validation, preparation, resources and interaction state; performs I/O only after commit. */
export function useVegaDeclarativeChart(
  props: VegaDeclarativeChartProps,
  forwardedRef: React.Ref<HTMLDivElement>,
): VegaDeclarativeChartState {
  const { vegaLiteSpec } = props.chartSchema;
  const { onDiagnostics, onSchemaChange } = props;
  const { targetDocument } = useFluent_unstable();
  const colorMap = useColorMapping();
  const isDarkTheme = useIsDarkTheme();
  const [activeLegends, setActiveLegends] = React.useState<string[]>(() => props.chartSchema.selectedLegends ?? []);
  const [resourceState, setResourceState] = React.useState<ResourceState>();
  const request = React.useMemo<ResourceRequest>(
    () => ({
      spec: vegaLiteSpec,
      resolver: props.dataResolver,
      origins: props.allowedDataOrigins,
      baseUrl: props.dataBaseUrl,
      mode: props.semanticMode ?? 'legacy',
    }),
    [vegaLiteSpec, props.dataResolver, props.allowedDataOrigins, props.dataBaseUrl, props.semanticMode],
  );

  const preflight = React.useMemo(() => {
    if (!vegaLiteSpec) {
      return {
        diagnostics: [] as VegaLiteDiagnostic[],
        error: new Error('VegaDeclarativeChart: vegaLiteSpec is required in chartSchema'),
      };
    }
    const diagnostics = validateVegaLiteSpec(request.spec, {
      mode: request.mode,
      allowExternalData: !!request.resolver,
    });
    const fatal = diagnostics.filter(
      item =>
        safetyCodes.has(item.code) ||
        (item.code === 'invalid-spec' && item.message.includes('safely')) ||
        (request.mode === 'strict' && item.severity === 'error'),
    );
    if (fatal.length) {
      return { diagnostics, error: diagnosticError(fatal) };
    }
    if (declaredViewCount(request.spec) > 10000) {
      return { diagnostics, error: new Error('VegaDeclarativeChart: declared view expansion budget exceeds 10000') };
    }
    if (request.mode === 'legacy') {
      try {
        validateJsonDepth(request.spec);
      } catch (error) {
        return { diagnostics, error: error as Error };
      }
    }
    return { diagnostics, error: undefined };
  }, [request, vegaLiteSpec]);

  const needsResources = React.useMemo(
    () => !preflight.error && !!request.resolver && hasResources(request.spec),
    [preflight.error, request],
  );
  const currentResource = resourceState?.request === request ? resourceState : undefined;
  const preparedSource = needsResources ? currentResource?.spec : request.spec;
  const prepared = React.useMemo(() => {
    if (preflight.error || !preparedSource) {
      return { tree: undefined, error: undefined, diagnostics: preflight.diagnostics };
    }
    const diagnostics =
      preparedSource === request.spec
        ? preflight.diagnostics
        : validateVegaLiteSpec(preparedSource, { mode: request.mode });
    const fatal = diagnostics.filter(
      item => safetyCodes.has(item.code) || (request.mode === 'strict' && item.severity === 'error'),
    );
    if (fatal.length) {
      return { tree: undefined, error: diagnosticError(fatal), diagnostics };
    }
    try {
      return { tree: buildVegaViewTree(preparedSource, { mode: request.mode }), error: undefined, diagnostics };
    } catch (error) {
      return { tree: undefined, error: new Error(`Failed to transform Vega-Lite spec: ${error}`), diagnostics };
    }
  }, [preflight, preparedSource, request]);

  const planned = React.useMemo(() => {
    if (!prepared.tree || !preparedSource) {
      return { plan: undefined, error: undefined };
    }
    try {
      return {
        plan: planVegaDeclarativeChartViews(prepared.tree, preparedSource, colorMap, isDarkTheme, request.mode),
        error: undefined,
      };
    } catch (error) {
      return { plan: undefined, error: new Error(`Failed to transform Vega-Lite spec: ${error}`) };
    }
  }, [prepared.tree, preparedSource, colorMap, isDarkTheme, request.mode]);

  const onActiveLegendsChange = React.useCallback(
    (keys: string[]) => {
      setActiveLegends(keys);
      onSchemaChange?.({ vegaLiteSpec, selectedLegends: keys });
    },
    [onSchemaChange, vegaLiteSpec],
  );

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Preserve post-commit synchronization with the host's selected schema.
    setActiveLegends(props.chartSchema.selectedLegends ?? []);
  }, [props.chartSchema.selectedLegends]);

  React.useEffect(() => {
    if (!needsResources || !request.resolver) {
      return;
    }
    const view = targetDocument?.defaultView as (Window & typeof globalThis) | null | undefined;
    if (!view?.AbortController) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Report client-only I/O capability failures accessibly after commit, not during SSR.
      setResourceState({ request, error: new Error('Vega data resolution requires a document AbortController') });
      return;
    }
    const controller = new view.AbortController();
    let cancelled = false;
    resolveVegaLiteResources(request.spec, {
      resolveData: request.resolver,
      allowedOrigins: request.origins,
      baseUrl: request.baseUrl,
      signal: controller.signal,
    }).then(
      spec => {
        if (!cancelled) {
          setResourceState({ request, spec });
        }
      },
      error => {
        if (!cancelled) {
          setResourceState({ request, error: error instanceof Error ? error : new Error(String(error)) });
        }
      },
    );
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [needsResources, request, targetDocument]);

  React.useEffect(() => {
    if (!preflight.error) {
      onDiagnostics?.(prepared.diagnostics);
    }
  }, [preflight.error, prepared.diagnostics, onDiagnostics]);

  // All hooks are unconditional across validation, loading and error transitions.
  if (preflight.error) {
    throw preflight.error;
  }
  const error = currentResource?.error ?? (needsResources ? prepared.error : undefined);
  if (!error && prepared.error) {
    throw prepared.error;
  }
  if (planned.error) {
    throw planned.error;
  }
  return {
    components: { root: 'div' },
    root: slot.always({ ref: forwardedRef, className: props.className, style: props.style }, { elementType: 'div' }),
    plan: planned.plan,
    mode: request.mode,
    isDarkTheme,
    legendProps: { canSelectMultipleLegends: true, onChange: onActiveLegendsChange, selectedLegends: activeLegends },
    error,
    loading: needsResources && !prepared.tree,
  };
}
