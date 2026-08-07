/**
 * `HeadlessDataAttributes` — docs block that renders automatically extracted
 * data-attribute metadata from the `HEADLESS_STATE_DATA_ATTRIBUTES` webpack
 * global.  Rendered after the Args table for the primary component and all
 * declared subcomponents.
 */
import * as React from 'react';

import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { FluentDocsPageStory } from '@fluentui/react-storybook-addon';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface HeadlessDataAttributesProps {
  story: FluentDocsPageStory;
}

type DataAttributeEntry = {
  name: `data-${string}`;
  type: string;
  description: string;
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const useStyles = makeStyles({
  section: {
    marginTop: tokens.spacingVerticalXXL,
  },
  heading: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase500,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalL,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    paddingBottom: tokens.spacingVerticalS,
  },
  componentHeading: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground1,
    margin: `${tokens.spacingVerticalL} 0 ${tokens.spacingVerticalS}`,
  },
  tableWrapper: {
    overflowX: 'auto',
    marginBottom: tokens.spacingVerticalL,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
  },
  th: {
    textAlign: 'left',
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    borderBottom: `${tokens.strokeWidthThick} solid ${tokens.colorNeutralStroke1}`,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    textTransform: 'uppercase',
  },
  td: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    verticalAlign: 'top',
  },
  code: {
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusSmall,
    padding: `0 ${tokens.spacingHorizontalXS}`,
    color: tokens.colorNeutralForeground1,
  },
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Read the webpack-injected global defensively so that missing injection
 * (e.g. in a test environment or a plain Storybook build) degrades to an
 * empty map rather than throwing a ReferenceError.
 */
const DATA_ATTRIBUTES_MAP: Record<string, DataAttributeEntry[]> =
  typeof HEADLESS_STATE_DATA_ATTRIBUTES !== 'undefined' ? HEADLESS_STATE_DATA_ATTRIBUTES : {};

/**
 * Build an ordered list of candidate lookup names for a component:
 *   1. component.displayName  (most specific)
 *   2. component.name         (function name fallback)
 *   3. last segment of title  (last resort; only when title contains "/")
 *
 * Returns the first candidate that has a non-empty entry in the metadata
 * map, or `null` when nothing matches.
 */
function resolvePrimaryComponentName(
  component: FluentDocsPageStory['component'],
  title: FluentDocsPageStory['title'],
): string | null {
  const candidates: string[] = [];

  if (component) {
    const displayName = (component as { displayName?: string }).displayName;
    if (displayName) {
      candidates.push(displayName);
    }
    const fnName = (component as { name?: string }).name;
    if (fnName) {
      candidates.push(fnName);
    }
  }

  // Title-segment fallback — only when it looks like a path ("Foo/Bar")
  if (title && title.includes('/')) {
    const lastSegment = title.split('/').pop()?.trim();
    if (lastSegment) {
      candidates.push(lastSegment);
    }
  }

  for (const name of candidates) {
    if (DATA_ATTRIBUTES_MAP[name]?.length) {
      return name;
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Renders the "Data attributes" docs section for the primary component and all
 * declared subcomponents.  Returns `null` when no metadata is found.
 */
export function HeadlessDataAttributes({ story }: HeadlessDataAttributesProps): React.ReactElement | null {
  const classes = useStyles();

  // ------------------------------------------------------------------
  // 1. Collect component names to look up
  // ------------------------------------------------------------------
  const componentNames: Array<{ label: string; entries: DataAttributeEntry[] }> = [];

  // Primary component — try displayName, name, then title segment in order
  const primaryName = resolvePrimaryComponentName(story.component, story.title);
  if (primaryName) {
    const entries = DATA_ATTRIBUTES_MAP[primaryName];
    if (entries && entries.length > 0) {
      componentNames.push({ label: primaryName, entries });
    }
  }

  // Subcomponents — prefer explicit keys from story.subcomponents
  const subcomponents = story.subcomponents as Record<string, unknown> | undefined;
  if (subcomponents) {
    for (const [key, comp] of Object.entries(subcomponents)) {
      // The key is the canonical display name; use it directly.
      let name = key;

      // If the key doesn't find a hit, try component.displayName / .name as fallback
      if (!DATA_ATTRIBUTES_MAP[name]) {
        const fallback =
          (comp as { displayName?: string } | null)?.displayName ?? (comp as { name?: string } | null)?.name;
        if (fallback) {
          name = fallback;
        }
      }

      const entries = DATA_ATTRIBUTES_MAP[name];
      if (entries && entries.length > 0) {
        // Skip if already added (e.g. primary and subcomponent share same name)
        if (!componentNames.some(c => c.label === name)) {
          componentNames.push({ label: name, entries });
        }
      }
    }
  }

  // ------------------------------------------------------------------
  // 2. Bail out when there is nothing to show
  // ------------------------------------------------------------------
  if (componentNames.length === 0) {
    return null;
  }

  // ------------------------------------------------------------------
  // 3. Render
  // ------------------------------------------------------------------
  const sectionId = 'headless-data-attributes-heading';

  return (
    <section className={classes.section}>
      <h2 id={sectionId} className={classes.heading}>
        Data attributes
      </h2>
      {componentNames.map(({ label, entries }) => {
        const headingId = `headless-data-attr-${label.replace(/\s+/g, '-').toLowerCase()}`;
        return (
          <div key={label}>
            {componentNames.length > 1 && (
              <h3 id={headingId} className={classes.componentHeading}>
                {label}
              </h3>
            )}
            <div className={classes.tableWrapper}>
              <table className={classes.table} aria-labelledby={componentNames.length > 1 ? headingId : sectionId}>
                <thead>
                  <tr>
                    <th scope="col" className={classes.th}>
                      Attribute
                    </th>
                    <th scope="col" className={classes.th}>
                      Type/Values
                    </th>
                    <th scope="col" className={classes.th}>
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map(entry => (
                    <tr key={entry.name}>
                      <td className={classes.td}>
                        <code className={classes.code}>{entry.name}</code>
                      </td>
                      <td className={classes.td}>
                        <code className={classes.code}>{entry.type}</code>
                      </td>
                      <td className={classes.td}>{entry.description || '\u2014'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </section>
  );
}
