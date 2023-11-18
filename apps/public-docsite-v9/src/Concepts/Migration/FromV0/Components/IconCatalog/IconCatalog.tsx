import * as React from 'react';
import { Provider, teamsV2Theme } from '@fluentui/react-northstar';
import * as v0Icons from '@fluentui/react-icons-northstar';
import * as v9Icons from '@fluentui/react-icons';
import { Input, Switch, Label } from '@fluentui/react-components';
import type { InputProps, SwitchProps } from '@fluentui/react-components';
import { iconMapping as rawMapping } from './iconMapping';
import { IconGrid } from './IconGrid';
import { useDebounce } from './useDebounce';
import { V0IconComponent, V9IconComponent } from './types';
import { useIconCatalogStyles } from './IconCatalog.styles';

const _mapping = rawMapping
  .map(entry => {
    const v0IconName = `${entry.v0}`;
    const v9IconName = `${entry.v9}Regular`;
    const V0Icon = (v0Icons as unknown as Record<string, V0IconComponent>)[v0IconName];
    const V9Icon = (v9Icons as unknown as Record<string, V9IconComponent | undefined>)[v9IconName];

    if (!V0Icon) {
      return null;
    }

    return {
      v9Search: entry.v9?.toLowerCase(),
      v0Search: entry.v0.toLowerCase(),
      V0Icon,
      V9Icon,
    };
  })
  .filter(Boolean);
const mapping = _mapping.filter(Boolean) as Array<NonNullable<(typeof _mapping)[number]>>;

const IconCatalogInner: React.FC = () => {
  const styles = useIconCatalogStyles();

  const [searchTerm, setSearchTerm] = React.useState<string | undefined>(undefined);
  const [searchV0, setSearchV0] = React.useState(true);

  const updateSearch = React.useCallback(
    (newSearchTerm: string) => {
      setSearchTerm(newSearchTerm.toLowerCase());
    },
    [setSearchTerm],
  );

  const updateSearchDebounced = useDebounce(updateSearch, 220);

  const entries = React.useMemo(
    () =>
      mapping.filter(entry => {
        if (!searchTerm) {
          return true;
        }

        if (searchV0) {
          return entry.v0Search.includes(searchTerm);
        }

        return entry.v9Search?.includes(searchTerm);
      }),
    [searchTerm, searchV0],
  );

  const onInputChange: InputProps['onChange'] = React.useCallback(
    (e, { value }) => updateSearchDebounced(value),
    [updateSearchDebounced],
  );
  const onSwitchChange: SwitchProps['onChange'] = React.useCallback((e, { checked }) => setSearchV0(checked), []);

  return (
    <>
      <div>
        <div className={styles.searchPanel}>
          <Input
            aria-label={`Search across ${mapping.length} icons`}
            placeholder={`Search across ${mapping.length} icons`}
            onChange={onInputChange}
          />
          <div className={styles.switch}>
            <Label htmlFor="searchToggle">{searchV0 ? 'Searching  Northstar icons ' : 'Searching V9 icons'}</Label>
            <Switch id="searchToggle" checked={searchV0} onChange={onSwitchChange} />
          </div>
        </div>
      </div>
      <div role="status">{entries.length} icon entries</div>
      <IconGrid entries={entries} />
    </>
  );
};

// Simply hoists the northstar provider above the catalog to avoid unnecessarily
// re-rendering the provider.
const northstarTheme = { ...teamsV2Theme, staticStyles: [] };
export const IconCatalog: React.FC = () => (
  <Provider theme={northstarTheme}>
    <IconCatalogInner />
  </Provider>
);
