import * as React from 'react';
import {
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  webLightTheme,
  webDarkTheme,
  Theme,
  Input,
  makeStyles,
  InputProps,
  MenuProps,
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

export const Colors = () => {
  const [tokensSearchResult, setTokensSearchResult] = React.useState<Array<keyof Theme> | undefined>(tokens);

  // Text typed in the input bar
  const [inputValue, setInputValue] = React.useState('');

  // Value checked from the filter menu button
  const [checkedValue, setCheckedValue] = React.useState<Record<string, string[]>>();

  const styles = useStyles();

  // It returns tokens matching the input value.
  const searchToken = React.useCallback(
    newSearchValue => {
      const tokensFoundBySearch = tokens.filter(
        token =>
          token.toLowerCase().includes(newSearchValue) ||
          theme.webLight[token].toString().includes(newSearchValue) ||
          theme.webDark[token].toString().includes(newSearchValue) ||
          theme.teamsLight[token].toString().includes(newSearchValue) ||
          theme.teamsDark[token].toString().includes(newSearchValue) ||
          theme.teamsHighContrast[token].toString().includes(newSearchValue),
      );
      setTokensSearchResult(tokensFoundBySearch);
    },
    [setTokensSearchResult],
  );

  const updateSearchDebounced = useDebounce(searchToken, 220);

  const onInputChange: InputProps['onChange'] = React.useCallback(
    (_, { value }) => {
      updateSearchDebounced(value.trim().toLocaleLowerCase());
      setInputValue(value.trim().toLocaleLowerCase());
      setCheckedValue(undefined);
    },
    [updateSearchDebounced],
  );

  const applyFilter: MenuProps['onCheckedValueChange'] = React.useCallback(
    (_, { name, checkedItems }) => {
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

const useDebounce = (fn: (...args: unknown[]) => void, duration: number) => {
  const timeoutRef = React.useRef(0);
  return React.useCallback(
    (...args: unknown[]) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        fn(...args);
      }, duration);
    },
    [duration, fn],
  );
};
