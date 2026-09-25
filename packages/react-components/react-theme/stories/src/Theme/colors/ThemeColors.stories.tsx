import * as React from 'react';
import type { ForwardRefComponent, Theme } from '@fluentui/react-components';
import {
  Button,
  Input,
  makeStyles,
  mergeClasses,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  webLightTheme,
  webDarkTheme,
  tokens,
} from '@fluentui/react-components';
import { DismissRegular, SearchRegular } from '@fluentui/react-icons';

import { TokensFilterButton } from './FilterButton.stories';

const themes = [
  { name: 'Light', value: webLightTheme },
  { name: 'Dark', value: webDarkTheme },
  { name: 'Teams Light', value: teamsLightTheme },
  { name: 'Teams Dark', value: teamsDarkTheme },
  { name: 'Teams High Contrast', value: teamsHighContrastTheme },
];

const colorTokens = (Object.keys(webLightTheme) as Array<keyof Theme>).filter(name => name.startsWith('color'));

const useStyles = makeStyles({
  root: {
    minWidth: 0,
    color: tokens.colorNeutralForeground1,
  },
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    paddingBottom: tokens.spacingVerticalM,
  },
  search: {
    flexGrow: 1,
    flexBasis: '18rem',
    minWidth: 0,
  },
  summary: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: tokens.spacingHorizontalS,
    paddingBottom: tokens.spacingVerticalXL,
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  count: {
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
    fontVariantNumeric: 'tabular-nums',
  },
  token: {
    margin: 0,
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalXL,
    borderTop: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  name: {
    display: 'block',
    marginBottom: tokens.spacingVerticalM,
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
    fontWeight: tokens.fontWeightSemibold,
    overflowWrap: 'anywhere',
  },
  comparisons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 8rem), 1fr))',
    gap: tokens.spacingHorizontalM,
    margin: 0,
  },
  sample: { minWidth: 0 },
  theme: {
    marginBottom: tokens.spacingVerticalS,
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  value: { margin: 0 },
  swatch: {
    display: 'block',
    height: `calc(${tokens.spacingVerticalXXXL} * 2)`,
    borderRadius: tokens.borderRadiusMedium,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    overflow: 'hidden',
    backgroundColor: tokens.colorNeutralBackground1,
    backgroundImage: `conic-gradient(${tokens.colorNeutralBackground4} 25%, transparent 0 50%, ${tokens.colorNeutralBackground4} 0 75%, transparent 0)`,
    backgroundSize: `${tokens.spacingHorizontalL} ${tokens.spacingVerticalL}`,
  },
  color: { display: 'block', width: '100%', height: '100%', forcedColorAdjust: 'none' },
  code: {
    display: 'block',
    marginTop: tokens.spacingVerticalS,
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    overflowWrap: 'anywhere',
    userSelect: 'all',
  },
  empty: {
    paddingBlock: tokens.spacingVerticalXXXL,
    borderTop: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
});

export const Colors: ForwardRefComponent<React.ComponentProps<'div'>> = React.forwardRef((props, ref) => {
  const styles = useStyles();
  const [query, setQuery] = React.useState('');
  const [filter, setFilter] = React.useState<string>();
  const search = query.trim().toLowerCase();
  const results = colorTokens.filter(
    name =>
      (!filter || name.toLowerCase().includes(filter)) &&
      (name.toLowerCase().includes(search) ||
        themes.some(theme => String(theme.value[name]).toLowerCase().includes(search))),
  );
  const clear = () => {
    setQuery('');
    setFilter(undefined);
  };

  return (
    <div {...props} ref={ref} className={mergeClasses(styles.root, props.className)} data-color-explorer>
      <div className={styles.toolbar}>
        <Input
          aria-label="Search color tokens"
          placeholder="Search by token name or color value"
          size="large"
          contentBefore={<SearchRegular />}
          value={query}
          onChange={(_, data) => setQuery(data.value)}
          className={styles.search}
        />
        <TokensFilterButton
          checkedValues={{ usecase: filter ? [filter] : [] }}
          onChange={(_, data) =>
            setFilter(current => (data.checkedItems[0] === current ? undefined : data.checkedItems[0]))
          }
        />
        {query || filter ? (
          <Button appearance="subtle" icon={<DismissRegular />} onClick={clear}>
            Clear
          </Button>
        ) : null}
      </div>
      <div className={styles.summary}>
        <span className={styles.count} role="status" aria-live="polite">
          {results.length} of {colorTokens.length} color tokens{filter ? ` · ${filter}` : ''}
        </span>
        <span>Compare the same token across five themes.</span>
      </div>
      {results.length === 0 ? (
        <div className={styles.empty}>
          <p>No color tokens match your search{filter ? ' and filter' : ''}.</p>
          <Button onClick={clear}>Clear search and filter</Button>
        </div>
      ) : (
        results.map(name => (
          <figure key={name} className={styles.token}>
            <figcaption className={styles.name}>{name}</figcaption>
            <dl className={styles.comparisons}>
              {themes.map(theme => (
                <div key={theme.name} className={styles.sample}>
                  <dt className={styles.theme}>{theme.name}</dt>
                  <dd className={styles.value}>
                    <span className={styles.swatch} aria-hidden="true">
                      <span className={styles.color} style={{ backgroundColor: String(theme.value[name]) }} />
                    </span>
                    <code className={styles.code}>{theme.value[name]}</code>
                  </dd>
                </div>
              ))}
            </dl>
          </figure>
        ))
      )}
    </div>
  );
});

Colors.displayName = 'Colors';
