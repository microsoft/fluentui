import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  webLightTheme,
  webDarkTheme,
  Theme,
  Input,
  makeStyles,
  MenuCheckedValueChangeData,
} from '@fluentui/react-components';

import { ColorRampItem } from './ColorRamp.stories';
import { TokensFilterButton } from './FilterButton.stories';

// FIXME: hardcoded theme
const theme = {
  webLight: webLightTheme,
  webDark: webDarkTheme,
  teamsLight: teamsLightTheme,
  teamsDark: teamsDarkTheme,
  teamsHighContrast: teamsHighContrastTheme,
};

const useStyles = makeStyles({
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  inputSearch: {
    width: '100%',
  },
});

const tokens: Array<keyof Theme> = (Object.keys(theme.webLight) as Array<keyof Theme>).filter(
  tokenName => tokenName.match(/^color(?!Palette).*/) || tokenName.startsWith(`colorPalette`),
);

export const Colors = (): JSXElement => {
  const [tokensSearchResult, setTokensSearchResult] = React.useState<Array<keyof Theme> | undefined>(tokens);

  // Text typed in the input bar
  const [inputValue, setInputValue] = React.useState('');

  // Value checked from the filter menu button
  const [checkedValue, setCheckedValue] = React.useState<Record<string, string[]>>();

  const styles = useStyles();

  // It returns tokens matching the input value.
  const searchToken = React.useCallback(
    (newSearchValue: string) => {
      const tokensFoundBySearch = tokens.filter(token => {
        const tokensMatchSearchValue = (tokenItem?: string | number) => tokenItem?.toString().includes(newSearchValue);

        return (
          token.toLowerCase().includes(newSearchValue) ||
          tokensMatchSearchValue(theme.webLight[token]) ||
          tokensMatchSearchValue(theme.webDark[token]) ||
          tokensMatchSearchValue(theme.teamsLight[token]) ||
          tokensMatchSearchValue(theme.teamsDark[token]) ||
          tokensMatchSearchValue(theme.teamsHighContrast[token])
        );
      });
      setTokensSearchResult(tokensFoundBySearch);
    },
    [setTokensSearchResult],
  );

  const updateSearchDebounced = useDebounce(searchToken, 220);

  const onInputChange = React.useCallback(
    (_: React.ChangeEvent<HTMLInputElement>, { value }: { value: string }) => {
      updateSearchDebounced(value.trim().toLocaleLowerCase());
      setInputValue(value.trim().toLocaleLowerCase());
      setCheckedValue(undefined);
    },
    [updateSearchDebounced],
  );

  const applyFilter = React.useCallback(
    (_: React.MouseEvent | React.KeyboardEvent, { name, checkedItems }: MenuCheckedValueChangeData) => {
      // Filteringchecked items remove the selection and display the full list of tokens
      if (checkedItems[0] === checkedValue?.usecase[0]) {
        setCheckedValue(undefined);
        setTokensSearchResult(tokens);
        setInputValue('');
      } else {
        setCheckedValue(s => ({ ...s, [name]: checkedItems }));
        searchToken(checkedItems[0]);
        setInputValue(checkedItems[0]);
      }
    },
    [checkedValue, searchToken],
  );

  return (
    <>
      <div className={styles.searchContainer}>
        <TokensFilterButton checkedValues={checkedValue} onChange={applyFilter} />
        <Input
          placeholder={'Search for tokens by name or color'}
          size={'large'}
          onChange={onInputChange}
          value={inputValue}
          className={styles.inputSearch}
        />
      </div>

      <div
        style={{
          display: 'inline-grid',
          gridTemplateColumns: '24em repeat(5, auto)',
          columnGap: '1em',
          alignItems: 'stretch',
        }}
      >
        <h3 key="hrToken" style={{ padding: '1em', margin: 0 }}>
          Design Token
        </h3>
        <h3 key="hrLight" style={{ padding: '1em', margin: 0 }}>
          Light
        </h3>
        <h3 key="hrDark" style={{ padding: '1em', margin: 0 }}>
          Dark
        </h3>
        <h3 key="hrTeamsLight" style={{ padding: '1em', margin: 0 }}>
          Teams Light
        </h3>
        <h3 key="hrTeamsDark" style={{ padding: '1em', margin: 0 }}>
          Teams Dark
        </h3>
        <h3 key="hrHC" style={{ padding: '1em', margin: 0 }}>
          Teams High Contrast
        </h3>
        {tokensSearchResult?.map(name => [
          <div
            key={`${name}Token`}
            style={{ padding: '0 1em', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
          >
            {name}
          </div>,
          <ColorRampItem key={`${name}Light`} value={theme.webLight[name]} />,
          <ColorRampItem key={`${name}Dark`} value={theme.webDark[name]} />,
          <ColorRampItem key={`${name}TeamsLight`} value={theme.teamsLight[name]} />,
          <ColorRampItem key={`${name}TeamsDark`} value={theme.teamsDark[name]} />,
          <ColorRampItem key={`${name}HC`} value={theme.teamsHighContrast[name]} />,
        ])}
      </div>
    </>
  );
};

Colors.args = {};

const useDebounce = <T extends unknown>(fn: (...args: T[]) => void, duration: number) => {
  const timeoutRef = React.useRef(0);
  return React.useCallback(
    (...args: T[]) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        fn(...args);
      }, duration);
    },
    [duration, fn],
  );
};
