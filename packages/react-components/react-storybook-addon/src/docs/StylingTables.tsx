import * as React from 'react';
import { TabsState } from 'storybook/internal/components';
import { makeStyles, mergeClasses } from '@griffel/react';
import { ChevronRightRegular } from '@fluentui/react-icons';

import {
  getClassNameRows,
  getDataAttributeRows,
  type ClassNameRow,
  type DataAttributeRow,
  type DataAttributeValue,
  type StylingMetadata,
} from './stylingMetadata';

// Colors and sizes mirror Storybook's args table so Props, Data attributes and Classes read as one family.
const border = '1px solid rgba(38, 74, 115, 0.15)';

const useStyles = makeStyles({
  reference: {
    marginBlock: '24px 40px',
  },
  section: {
    '& + &': {
      borderTop: border,
    },
    '&[open] > summary > svg': {
      transform: 'rotate(90deg)',
    },
  },
  summary: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    paddingBlock: '12px',
    cursor: 'pointer',
    listStyle: 'none',
    color: 'rgb(92, 101, 112)',
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '20px',
    textTransform: 'uppercase',
    '::-webkit-details-marker': {
      display: 'none',
    },
    ':hover': {
      color: 'rgb(46, 52, 56)',
    },
    '& > svg': {
      flexShrink: 0,
      fontSize: '20px',
      transitionProperty: 'transform',
      transitionDuration: '0.1s',
    },
  },
  panel: {
    paddingBlockEnd: '16px',
    // Storybook's args table adds its own block margins; the panel owns spacing.
    '& .docblock-argstable': {
      marginBlock: 0,
    },
  },
  scroll: {
    overflowX: 'auto',
    // Room for the tbody shadow inside the scroll container.
    padding: '4px',
    margin: '-4px',
    ':focus-visible': {
      outline: '2px solid rgb(2, 156, 253)',
      outlineOffset: '2px',
    },
  },
  table: {
    width: '100%',
    margin: 0,
    border: 0,
    borderCollapse: 'collapse',
    borderSpacing: 0,
    background: 'transparent',
    color: 'rgb(46, 52, 56)',
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'start',
    '& tr': {
      border: 0,
      background: 'transparent',
    },
    '& th, & td': {
      border: 0,
      padding: '10px 15px 10px 20px',
      textAlign: 'start',
      verticalAlign: 'top',
    },
    '& th:last-child, & td:last-child': {
      paddingInlineEnd: '20px',
    },
    '& th': {
      background: 'transparent',
      color: 'rgb(92, 101, 112)',
      fontWeight: 700,
    },
    '& tbody': {
      filter: 'drop-shadow(rgba(0, 0, 0, 0.1) 0 1px 3px)',
    },
    '& td': {
      background: 'rgb(255, 255, 255)',
    },
    '& tbody tr:not(:first-child) td': {
      borderTop: border,
    },
    '& tbody tr:first-child td:first-child': {
      borderStartStartRadius: '4px',
    },
    '& tbody tr:first-child td:last-child': {
      borderStartEndRadius: '4px',
    },
    '& tbody tr:last-child td:last-child': {
      borderEndEndRadius: '4px',
    },
    '& code': {
      display: 'inline-block',
      margin: 0,
      padding: '2px 5px',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      borderRadius: '3px',
      background: 'rgb(247, 250, 252)',
      color: 'rgba(46, 52, 56, 0.9)',
      fontFamily:
        'ui-monospace, Menlo, Monaco, "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Droid Sans Mono", "Courier New", monospace',
      fontSize: '12px',
      lineHeight: 1,
      whiteSpace: 'nowrap',
    },
    '@media (forced-colors: active)': {
      '& td, & code': {
        border: '1px solid CanvasText',
      },
    },
  },
  /** The slot cell reaching the last row owns the table's bottom-start rounded corner. */
  bottomStart: {
    borderEndStartRadius: '4px',
  },
  values: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    gap: '4px',
  },
});

const AttributeValues = ({ values }: { values: readonly DataAttributeValue[] | undefined }) => {
  const styles = useStyles();

  if (values === undefined) {
    return <code>boolean</code>;
  }

  if (values.length === 0) {
    return <code>string</code>;
  }

  return (
    <span className={styles.values}>
      {values.map((value, index) => (
        <code key={index}>{typeof value === 'string' ? JSON.stringify(value) : String(value)}</code>
      ))}
    </span>
  );
};

const Table = ({
  label,
  headers,
  children,
}: {
  label: string;
  headers: readonly string[];
  children: React.ReactNode;
}): React.ReactElement => {
  const styles = useStyles();

  return (
    <div className={styles.scroll} role="region" aria-label={label} tabIndex={0}>
      {/* `docblock-argstable` opts out of docsite global table rules, as for Storybook's props table. */}
      <table className={mergeClasses('docblock-argstable', styles.table)} aria-label={label}>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

/** Rows of one slot (consecutive, as slots are unique per component) share a single slot cell. */
const DataAttributeRows = ({ rows }: { rows: readonly DataAttributeRow[] }) => {
  const styles = useStyles();

  return (
    <>
      {rows.map((row, index) => {
        const first = index === 0 || rows[index - 1].slot !== row.slot;
        const rowSpan = rows.filter(next => next.slot === row.slot).length;

        return (
          <tr key={index}>
            {first && (
              <td
                rowSpan={rowSpan > 1 ? rowSpan : undefined}
                className={index + rowSpan === rows.length ? styles.bottomStart : undefined}
              >
                <code>{row.slot}</code>
              </td>
            )}
            <td>
              <code>{row.attribute}</code>
            </td>
            <td>
              <AttributeValues values={row.values ?? undefined} />
            </td>
          </tr>
        );
      })}
    </>
  );
};

const ClassNameRows = ({ rows }: { rows: readonly ClassNameRow[] }) => {
  const styles = useStyles();

  return (
    <>
      {rows.map((row, index) => (
        <tr key={row.slot}>
          <td className={index === rows.length - 1 ? styles.bottomStart : undefined}>
            <code>{row.slot}</code>
          </td>
          <td>
            <code>{row.className}</code>
          </td>
        </tr>
      ))}
    </>
  );
};

/** One tab per family component, matching Storybook's subcomponent tabs in the props table. */
const ComponentTabs = ({
  section,
  config,
  rows,
  children,
}: {
  section: string;
  config: { components?: Readonly<Record<string, unknown>> } | undefined;
  rows: readonly { component?: string }[];
  children: (component: string | undefined) => React.ReactNode;
}): React.ReactElement => {
  // Family components in config order; a single component renders without tabs.
  const present = new Set(rows.map(row => row.component));
  const components = config?.components ? Object.keys(config.components).filter(name => present.has(name)) : [];

  if (components.length <= 1) {
    return <>{children(components[0])}</>;
  }

  // `TabsState` renders each child's `title` as a tab and calls its function child with `{ active }`.
  const tabs = components.map(component => (
    <div key={component} id={`${section}_${component}`} title={component}>
      {(({ active }: { active: boolean }) => (active ? children(component) : null)) as unknown as React.ReactNode}
    </div>
  ));

  return <TabsState>{tabs as unknown as React.ComponentProps<typeof TabsState>['children']}</TabsState>;
};

const ApiSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const styles = useStyles();

  return (
    <details className={styles.section}>
      <summary className={styles.summary}>
        <ChevronRightRegular aria-hidden />
        {title}
      </summary>
      <div className={styles.panel}>{children}</div>
    </details>
  );
};

/**
 * "API Reference" with collapsible Props, Data attributes and Classes sections. Styling sections come from
 * `parameters.__generatedStylingMetadata` (or authored `parameters.reactStorybookAddon.docs`).
 *
 * Rows whose values could not be inferred (`null`) are omitted instead of rendered as unknown. Attributes on
 * non-slot elements (`elements`) stay in the metadata but are not rendered until slot types cover those elements.
 */
export const ApiReference = ({
  metadata,
  children,
}: {
  metadata: StylingMetadata;
  /** The props table. */
  children: React.ReactNode;
}): React.ReactElement => {
  const styles = useStyles();
  const dataRows = getDataAttributeRows(metadata.dataAttributes).filter(row => row.values !== null);
  const classRows = getClassNameRows(metadata.classNames);

  return (
    <div className={styles.reference}>
      <h2>API Reference</h2>
      <ApiSection title="Props">{children}</ApiSection>
      {dataRows.length > 0 && (
        <ApiSection title="Data attributes">
          <ComponentTabs section="data_attributes" config={metadata.dataAttributes} rows={dataRows}>
            {component => (
              <Table
                label={component ? `${component} data attributes` : 'Data attributes'}
                headers={['Slot', 'Attribute', 'Value']}
              >
                <DataAttributeRows rows={dataRows.filter(row => row.component === component)} />
              </Table>
            )}
          </ComponentTabs>
        </ApiSection>
      )}
      {classRows.length > 0 && (
        <ApiSection title="Classes">
          <ComponentTabs section="classes" config={metadata.classNames} rows={classRows}>
            {component => (
              <Table label={component ? `${component} classes` : 'Classes'} headers={['Slot', 'Class name']}>
                <ClassNameRows rows={classRows.filter(row => row.component === component)} />
              </Table>
            )}
          </ComponentTabs>
        </ApiSection>
      )}
    </div>
  );
};
