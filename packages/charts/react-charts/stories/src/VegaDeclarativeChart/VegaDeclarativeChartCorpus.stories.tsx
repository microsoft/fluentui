import * as React from 'react';
import type { ForwardRefComponent, JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, useFluent as useFluent_unstable, useId, useMergedRefs } from '@fluentui/react-components';
import { VegaDeclarativeChart } from '@fluentui/react-charts';
import type { VegaDataResolver } from '@fluentui/react-charts';
import { specificationCorpus } from './VegaDeclarativeChartCorpus.fixtures';
import type { CorpusColumn, CorpusEntry } from './VegaDeclarativeChartCorpus.fixtures';

const expectedOutcomes = {
  'ema-encoding.vl.json': 'A has EMA 62/7 and B has EMA 7.2. Count includes the null row; valid does not.',
  'ema-transform-bias.vl.json':
    'Unbiased EMA and biased EMA differ: A is 62/7 versus 8.71875; B is 7.2 versus 6.75. Missing counts remain explicit.',
  'median-variance.vl.json':
    'Medians are 5 and 4. Sample variance divides by n−1; population variance divides by n, with separate encoding aliases.',
  'window-peers.vl.json':
    'Tied rows share cumulative amounts 6, 6, 14, 30 and costs 30, 30, 60, 100. Rank skips after ties; dense rank does not.',
  'window-ignore-peers.vl.json':
    'Trailing row frames produce amounts 2, 6, 12, 24. Rank and lag still use the full sorted partition, not the frame.',
  'window-forward-frame.vl.json':
    'Forward peer-expanded frames produce amounts 6, 14, 24, 16. Lead remains independent of the frame endpoints.',
  'utcday-encoding.vl.json':
    'UTC weekdays use the cyclic January 2012 reference dates: Sunday totals 6 and Monday totals 3.',
  'yearmonthdate-transform.vl.json':
    'Local calendar days are February 29 and March 1; offset-aware UTC days are March 1 and February 29 respectively.',
  'bin-transform.vl.json':
    'Bins [−4, 0), [0, 4), and [4, 8] each contain two observations; the maximum extent belongs to the final bin.',
  'flatten-parallel.vl.json':
    'Parallel arrays flatten into four rows. The third A row has a null-padded label rather than being dropped.',
  'pivot-escaped-field.vl.json':
    'Duplicate pivot keys sum to x/y values (3, 7) for A and (4, 8) for B; the dotted output key is literal.',
  'lookup-inline.vl.json':
    'Nested lookup aliases produce totals 6 and 10; the unmatched id receives the authored zero defaults and total 0.',
  'normalized-bar-order.vl.json':
    'Second precedes First in each stack despite the color-domain order. Shares are 75% and 25%; tooltip amounts stay raw.',
  'xoffset-not-color.vl.json':
    'Left/right xOffset slots are independent of Warm/Cool colors. The negative B-left bar extends below the zero baseline.',
  'yoffset-named-group.vl.json':
    'Horizontal yOffset slots run top to bottom independently of color. The negative B-left bar extends left of zero.',
  'ranged-negative-corners.vl.json':
    'Both primary and secondary endpoints are retained. The negative interval rounds its bottom; the positive interval its top.',
  'center-bars.vl.json':
    'Stacks center against the maximum total. B’s negative contribution has absolute height, with starts offset by 2.',
  'recursive-concat-dataset.vl.json':
    'Three recursively composed views use the named dataset. Inherited transforms run once: the first two show (1, 5), (2, 9); the last shows (2, 8).',
  'facet-missing-cells.vl.json':
    'Six facet cells include the missing-region group and the full Cartesian matrix. Three cells say No data; only three contain plot SVGs.',
  'repeat-matrix.vl.json':
    'Four repeat cells bind their own x/y fields and types: (a, a), (b, a), (a, b), and (b, b). All four contain plot SVGs.',
  'filtered-tooltip-newlines.vl.json':
    'Only x=1 and x=3 survive the field predicates. Explicit tooltips keep multiline notes, formatted amounts, and literal dotted fields, but not private fields.',
  'tooltip-field-filter.vl.json':
    'All three plot rows remain. Tooltip filters omit zero/non-numeric values as authored, preserve explicit null, and keep private fields out of per-mark ARIA.',
  'managed-resource.vl.json':
    'An exact-URL offline host resolver supplies two string-valued records. Parsing and calculate run once, producing UTC dates with amounts 6 and 12; no fetch is used.',
};

type CorpusFile = keyof typeof expectedOutcomes;

function fixture(file: CorpusFile): CorpusEntry {
  const entry = specificationCorpus.find(candidate => candidate.file === file);
  if (!entry) {
    throw new Error(`Missing real Vega-Lite corpus fixture: ${file}`);
  }
  return entry;
}

function offlineResolver(entry: CorpusEntry): VegaDataResolver | undefined {
  const resource = entry.resource;
  if (!resource) {
    return undefined;
  }
  return request => {
    if (request.url !== resource.url || request.signal.aborted) {
      return Promise.reject(new Error('Unapproved or aborted offline corpus data request'));
    }
    // Fresh records for each mount; never mutate the manifest or silently fall back to network I/O.
    return Promise.resolve(resource.rows.map(row => ({ ...row })));
  };
}

const allowedDataOrigins = ['https://fixtures.example.test'];

const compositionPresentationNotice =
  'Presentation only: composed charts are uniformly scaled to fit the available width, including labels. ' +
  'The source JSON, authored unit dimensions, SVG geometry and independent expected tables are unchanged. ' +
  'Displayed CSS-pixel dimensions may differ from the authored chart dimensions.';

const useCorpusPresentationStyles = makeStyles({
  host: { minWidth: 0 },
  canvas: { width: 'max-content' },
});

// Keep this width-preserving presentation wrapper in sync with the runnable sample below.
// Measure the unzoomed canvas, not its scaled DOM bounds: zoom must never feed back into the next scale.
const CorpusPresentation: ForwardRefComponent<{ children: React.ReactNode }> = React.forwardRef(({ children }, ref) => {
  const classes = useCorpusPresentationStyles();
  const { targetDocument } = useFluent_unstable();
  const hostRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLDivElement>(null);
  const mergedRef = useMergedRefs(ref, hostRef);
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) {
      return;
    }
    const measure = () => {
      if (host.clientWidth > 0 && canvas.scrollWidth > 0) {
        setScale(Math.min(1, host.clientWidth / canvas.scrollWidth));
      }
    };
    measure();
    const ResizeObserverConstructor = targetDocument?.defaultView?.ResizeObserver;
    if (!ResizeObserverConstructor) {
      return;
    }
    const observer = new ResizeObserverConstructor(measure);
    observer.observe(host);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [targetDocument]);

  return (
    <div ref={mergedRef} className={classes.host}>
      <div ref={canvasRef} className={classes.canvas} style={{ zoom: scale }} data-corpus-presentation-scale={scale}>
        {children}
      </div>
    </div>
  );
});
CorpusPresentation.displayName = 'CorpusPresentation';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground2,
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  title: {
    margin: 0,
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase500,
  },
  paragraph: { margin: 0 },
  surface: {
    minWidth: 0,
    padding: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    overflowX: 'auto',
  },
  code: {
    margin: 0,
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    whiteSpace: 'pre-wrap',
    overflowWrap: 'anywhere',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalM,
    '& th, & td': {
      padding: tokens.spacingHorizontalS,
      textAlign: 'start',
      verticalAlign: 'top',
      borderBottomStyle: 'solid',
      borderBottomWidth: tokens.strokeWidthThin,
      borderBottomColor: tokens.colorNeutralStroke2,
      whiteSpace: 'pre-wrap',
    },
  },
});

function columnLabel(column: CorpusColumn): string {
  const label = column.field ?? column.channel ?? `tooltip[${column.tooltip}]`;
  return column.normalize ? `${label} (${column.normalize})` : label;
}

function structuralExpectation(entry: CorpusEntry): string {
  const empty = entry.expectedTables.filter(table => table.rows.length === 0).length;
  return (
    `Expected plot SVGs: ${entry.publicSvgCount} (excluding legend swatches). ` +
    (entry.composed ? `Composed cells: ${entry.expectedTables.length}; empty cells: ${empty}.` : 'Single chart view.')
  );
}

const CorpusExample: ForwardRefComponent<{ file: CorpusFile }> = React.forwardRef(({ file }, ref) => {
  const entry = fixture(file);
  const classes = useStyles();
  const titleId = useId('corpus-title-');
  const expectationId = useId('corpus-expectation-');
  const chartSchema = React.useMemo(() => ({ vegaLiteSpec: entry.spec }), [entry]);
  const dataResolver = React.useMemo(() => offlineResolver(entry), [entry]);
  const chart = (
    <VegaDeclarativeChart
      chartSchema={chartSchema}
      semanticMode="strict"
      dataResolver={dataResolver}
      allowedDataOrigins={entry.resource ? allowedDataOrigins : undefined}
    />
  );

  return (
    <section
      ref={ref}
      className={classes.root}
      aria-labelledby={titleId}
      aria-describedby={expectationId}
      data-corpus-fixture={file}
    >
      <h2 id={titleId} className={classes.title}>
        {entry.description}
      </h2>
      <p className={classes.paragraph}>
        Strict semantics · real JSON fixture: <code>{file}</code>
      </p>
      <p id={expectationId} className={classes.paragraph}>
        Expected outcome: {expectedOutcomes[file]}
      </p>
      <p className={classes.paragraph}>{structuralExpectation(entry)}</p>
      {entry.composed && <p className={classes.paragraph}>{compositionPresentationNotice}</p>}
      <div className={classes.surface} data-corpus-chart={file}>
        {entry.composed ? <CorpusPresentation>{chart}</CorpusPresentation> : chart}
      </div>
      <details className={classes.surface} open>
        <summary>Independently worked expected tables (not renderer-generated results)</summary>
        <p>
          Channel and tooltip headings refer to the authored encoding; generated aggregate/time-unit aliases are not
          hardcoded. Numbers show JavaScript precision; local-date columns compare calendar dates, not UTC instants.
        </p>
        {entry.expectedTables.map((table, tableIndex) => (
          <table className={classes.table} key={tableIndex}>
            <caption>{table.title ?? `Expected view ${tableIndex + 1}`}</caption>
            <thead>
              <tr>
                {table.columns.map((column, columnIndex) => (
                  <th scope="col" key={columnIndex}>
                    {columnLabel(column)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.length ? (
                table.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell === null ? 'null' : String(cell)}</td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={table.columns.length}>No data (empty composed cell; no plot SVG)</td>
                </tr>
              )}
            </tbody>
          </table>
        ))}
        {entry.geometry && (
          <>
            <p>Expected [x, y, width, height] in a 200 × 100 plot viewport, not outer SVG dimensions:</p>
            <pre className={classes.code}>{JSON.stringify(entry.geometry, null, 2)}</pre>
          </>
        )}
        {entry.tooltipLabels && (
          <>
            <p>Expected per-mark tooltip/ARIA labels (JSON escapes preserve the authored newlines):</p>
            <pre className={classes.code}>{JSON.stringify(entry.tooltipLabels, null, 2)}</pre>
          </>
        )}
      </details>
      <details className={classes.surface}>
        <summary>Source JSON: {file} (loaded from the real fixture, not a copied specification)</summary>
        <pre className={classes.code}>{JSON.stringify(entry.spec, null, 2)}</pre>
      </details>
      {entry.resource && (
        <details className={classes.surface} open>
          <summary>Offline host records for {entry.resource.url}</summary>
          <pre className={classes.code}>{JSON.stringify(entry.resource.rows, null, 2)}</pre>
        </details>
      )}
      <ul>
        {entry.sources.map(source => (
          <li key={source.tag}>
            <a href={source.url}>{source.tag} reference</a>
          </li>
        ))}
      </ul>
    </section>
  );
});
CorpusExample.displayName = 'CorpusExample';

// Public-API source for the same presentation wrapper; never rewrite the serialized fixture or its dimensions.
const corpusPresentationSource = [
  'const useCorpusPresentationStyles = makeStyles({',
  '  host: { minWidth: 0 },',
  "  canvas: { width: 'max-content' },",
  '});',
  '',
  '// Measure unzoomed layout dimensions so visual scaling never feeds back into the next scale.',
  'const CorpusPresentation: ForwardRefComponent<{ children: React.ReactNode }> = React.forwardRef(({ children }, ref) => {',
  '  const classes = useCorpusPresentationStyles();',
  '  const { targetDocument } = useFluent_unstable();',
  '  const hostRef = React.useRef<HTMLDivElement>(null);',
  '  const canvasRef = React.useRef<HTMLDivElement>(null);',
  '  const mergedRef = useMergedRefs(ref, hostRef);',
  '  const [scale, setScale] = React.useState(1);',
  '',
  '  React.useEffect(() => {',
  '    const host = hostRef.current;',
  '    const canvas = canvasRef.current;',
  '    if (!host || !canvas) {',
  '      return;',
  '    }',
  '    const measure = () => {',
  '      if (host.clientWidth > 0 && canvas.scrollWidth > 0) {',
  '        setScale(Math.min(1, host.clientWidth / canvas.scrollWidth));',
  '      }',
  '    };',
  '    measure();',
  '    const ResizeObserverConstructor = targetDocument?.defaultView?.ResizeObserver;',
  '    if (!ResizeObserverConstructor) {',
  '      return;',
  '    }',
  '    const observer = new ResizeObserverConstructor(measure);',
  '    observer.observe(host);',
  '    observer.observe(canvas);',
  '    return () => observer.disconnect();',
  '  }, [targetDocument]);',
  '',
  '  return (',
  '    <div ref={mergedRef} className={classes.host}>',
  '      <div ref={canvasRef} className={classes.canvas} style={{ zoom: scale }} data-corpus-presentation-scale={scale}>',
  '        {children}',
  '      </div>',
  '    </div>',
  '  );',
  '});',
  "CorpusPresentation.displayName = 'CorpusPresentation';",
  '',
].join('\n');

function corpusParameters(file: CorpusFile, storyName: string) {
  const entry = fixture(file);
  // Serialize the same loaded JSON used by the chart. This chart-only sample needs no internal fixture imports.
  const json = JSON.stringify(entry.spec, null, 2).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  const source = [
    "import * as React from 'react';",
    `import type { ${entry.composed ? 'ForwardRefComponent, ' : ''}JSXElement } from '@fluentui/react-components';`,
    ...(entry.composed
      ? ["import { makeStyles, useFluent as useFluent_unstable, useMergedRefs } from '@fluentui/react-components';"]
      : []),
    "import { VegaDeclarativeChart } from '@fluentui/react-charts';",
    `import type { VegaSchema${entry.resource ? ', VegaDataResolver' : ''} } from '@fluentui/react-charts';`,
    '',
    `// Real corpus fixture: ${file}`,
    `// Expected: ${expectedOutcomes[file]}`,
    `// ${structuralExpectation(entry)}`,
    '// Load the JSON document at the same untyped data boundary as a JSON-file import.',
    `const chartSchema: VegaSchema = { vegaLiteSpec: JSON.parse(\`${json}\`) };`,
    ...(entry.resource
      ? [
          `const resource = ${JSON.stringify(entry.resource, null, 2)};`,
          `const allowedDataOrigins = ${JSON.stringify(allowedDataOrigins)};`,
          'const dataResolver: VegaDataResolver = request => {',
          '  if (request.url !== resource.url || request.signal.aborted) {',
          "    return Promise.reject(new Error('Unapproved or aborted offline corpus data request'));",
          '  }',
          '  return Promise.resolve(resource.rows.map(row => ({ ...row })));',
          '};',
        ]
      : []),
    '',
    ...(entry.composed ? [corpusPresentationSource] : []),
    `export const ${storyName} = (): JSXElement => (`,
    ...(entry.composed ? ['  <>', `    <p>${compositionPresentationNotice}</p>`, '    <CorpusPresentation>'] : []),
    '  <VegaDeclarativeChart',
    '    chartSchema={chartSchema}',
    '    semanticMode="strict"',
    ...(entry.resource ? ['    dataResolver={dataResolver}', '    allowedDataOrigins={allowedDataOrigins}'] : []),
    '  />',
    ...(entry.composed ? ['    </CorpusPresentation>', '  </>'] : []),
    ');',
    '',
  ].join('\n');

  return {
    fullSource: source,
    fullSourceIsRunnable: true,
    fullSourceUnsupportedImports: [],
    docs: {
      description: {
        story:
          `**${file}** — ${expectedOutcomes[file]} ${structuralExpectation(entry)} ` +
          'The canvas shows the source JSON and independent expected tables. The source addon provides a runnable ' +
          'public-API example with the same JSON (and offline resolver where needed); expected-table chrome is omitted.' +
          (entry.composed ? ` ${compositionPresentationNotice} The runnable sample uses the same sizing wrapper.` : ''),
      },
    },
  };
}

const CorpusEmaEncoding = (): JSXElement => <CorpusExample file="ema-encoding.vl.json" />;
CorpusEmaEncoding.parameters = corpusParameters('ema-encoding.vl.json', 'CorpusEmaEncoding');

const CorpusEmaTransformBias = (): JSXElement => <CorpusExample file="ema-transform-bias.vl.json" />;
CorpusEmaTransformBias.parameters = corpusParameters('ema-transform-bias.vl.json', 'CorpusEmaTransformBias');

const CorpusMedianVariance = (): JSXElement => <CorpusExample file="median-variance.vl.json" />;
CorpusMedianVariance.parameters = corpusParameters('median-variance.vl.json', 'CorpusMedianVariance');

const CorpusWindowPeers = (): JSXElement => <CorpusExample file="window-peers.vl.json" />;
CorpusWindowPeers.parameters = corpusParameters('window-peers.vl.json', 'CorpusWindowPeers');

const CorpusWindowIgnorePeers = (): JSXElement => <CorpusExample file="window-ignore-peers.vl.json" />;
CorpusWindowIgnorePeers.parameters = corpusParameters('window-ignore-peers.vl.json', 'CorpusWindowIgnorePeers');

const CorpusWindowForwardFrame = (): JSXElement => <CorpusExample file="window-forward-frame.vl.json" />;
CorpusWindowForwardFrame.parameters = corpusParameters('window-forward-frame.vl.json', 'CorpusWindowForwardFrame');

const CorpusUtcdayEncoding = (): JSXElement => <CorpusExample file="utcday-encoding.vl.json" />;
CorpusUtcdayEncoding.parameters = corpusParameters('utcday-encoding.vl.json', 'CorpusUtcdayEncoding');

const CorpusYearmonthdateTransform = (): JSXElement => <CorpusExample file="yearmonthdate-transform.vl.json" />;
CorpusYearmonthdateTransform.parameters = corpusParameters(
  'yearmonthdate-transform.vl.json',
  'CorpusYearmonthdateTransform',
);

const CorpusBinTransform = (): JSXElement => <CorpusExample file="bin-transform.vl.json" />;
CorpusBinTransform.parameters = corpusParameters('bin-transform.vl.json', 'CorpusBinTransform');

const CorpusFlattenParallel = (): JSXElement => <CorpusExample file="flatten-parallel.vl.json" />;
CorpusFlattenParallel.parameters = corpusParameters('flatten-parallel.vl.json', 'CorpusFlattenParallel');

const CorpusPivotEscapedField = (): JSXElement => <CorpusExample file="pivot-escaped-field.vl.json" />;
CorpusPivotEscapedField.parameters = corpusParameters('pivot-escaped-field.vl.json', 'CorpusPivotEscapedField');

const CorpusLookupInline = (): JSXElement => <CorpusExample file="lookup-inline.vl.json" />;
CorpusLookupInline.parameters = corpusParameters('lookup-inline.vl.json', 'CorpusLookupInline');

const CorpusNormalizedBarOrder = (): JSXElement => <CorpusExample file="normalized-bar-order.vl.json" />;
CorpusNormalizedBarOrder.parameters = corpusParameters('normalized-bar-order.vl.json', 'CorpusNormalizedBarOrder');

const CorpusXoffsetNotColor = (): JSXElement => <CorpusExample file="xoffset-not-color.vl.json" />;
CorpusXoffsetNotColor.parameters = corpusParameters('xoffset-not-color.vl.json', 'CorpusXoffsetNotColor');

const CorpusYoffsetNamedGroup = (): JSXElement => <CorpusExample file="yoffset-named-group.vl.json" />;
CorpusYoffsetNamedGroup.parameters = corpusParameters('yoffset-named-group.vl.json', 'CorpusYoffsetNamedGroup');

const CorpusRangedNegativeCorners = (): JSXElement => <CorpusExample file="ranged-negative-corners.vl.json" />;
CorpusRangedNegativeCorners.parameters = corpusParameters(
  'ranged-negative-corners.vl.json',
  'CorpusRangedNegativeCorners',
);

const CorpusCenterBars = (): JSXElement => <CorpusExample file="center-bars.vl.json" />;
CorpusCenterBars.parameters = corpusParameters('center-bars.vl.json', 'CorpusCenterBars');

const CorpusRecursiveConcatDataset = (): JSXElement => <CorpusExample file="recursive-concat-dataset.vl.json" />;
CorpusRecursiveConcatDataset.parameters = corpusParameters(
  'recursive-concat-dataset.vl.json',
  'CorpusRecursiveConcatDataset',
);

const CorpusFacetMissingCells = (): JSXElement => <CorpusExample file="facet-missing-cells.vl.json" />;
CorpusFacetMissingCells.parameters = corpusParameters('facet-missing-cells.vl.json', 'CorpusFacetMissingCells');

const CorpusRepeatMatrix = (): JSXElement => <CorpusExample file="repeat-matrix.vl.json" />;
CorpusRepeatMatrix.parameters = corpusParameters('repeat-matrix.vl.json', 'CorpusRepeatMatrix');

const CorpusFilteredTooltipNewlines = (): JSXElement => <CorpusExample file="filtered-tooltip-newlines.vl.json" />;
CorpusFilteredTooltipNewlines.parameters = corpusParameters(
  'filtered-tooltip-newlines.vl.json',
  'CorpusFilteredTooltipNewlines',
);

const CorpusTooltipFieldFilter = (): JSXElement => <CorpusExample file="tooltip-field-filter.vl.json" />;
CorpusTooltipFieldFilter.parameters = corpusParameters('tooltip-field-filter.vl.json', 'CorpusTooltipFieldFilter');

const CorpusManagedResource = (): JSXElement => <CorpusExample file="managed-resource.vl.json" />;
CorpusManagedResource.parameters = corpusParameters('managed-resource.vl.json', 'CorpusManagedResource');

// Static CSF exports, deliberately separate from their declarations: the legacy file-granularity Babel plugin only
// injects source for exported declarations. Each story above already has its own complete public-API sample; do not
// let the plugin overwrite the last story with this internal-fixture module or mark that partial extraction runnable.
export {
  CorpusEmaEncoding,
  CorpusEmaTransformBias,
  CorpusMedianVariance,
  CorpusWindowPeers,
  CorpusWindowIgnorePeers,
  CorpusWindowForwardFrame,
  CorpusUtcdayEncoding,
  CorpusYearmonthdateTransform,
  CorpusBinTransform,
  CorpusFlattenParallel,
  CorpusPivotEscapedField,
  CorpusLookupInline,
  CorpusNormalizedBarOrder,
  CorpusXoffsetNotColor,
  CorpusYoffsetNamedGroup,
  CorpusRangedNegativeCorners,
  CorpusCenterBars,
  CorpusRecursiveConcatDataset,
  CorpusFacetMissingCells,
  CorpusRepeatMatrix,
  CorpusFilteredTooltipNewlines,
  CorpusTooltipFieldFilter,
  CorpusManagedResource,
};
