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

// Function that goes through all the existing tokens and returns the tokens matching the input value
const searchToken = (inputValue: string) => {
  const tokensFoundBySearch = tokens.filter(
    token =>
      token.toLowerCase().includes(inputValue) ||
      theme.webLight[token].toString().includes(inputValue) ||
      theme.webDark[token].toString().includes(inputValue) ||
      theme.teamsLight[token].toString().includes(inputValue) ||
      theme.teamsDark[token].toString().includes(inputValue) ||
      theme.teamsHighContrast[token].toString().includes(inputValue),
  );
  return tokensFoundBySearch;
};

export const Colors = () => {
  const [tokensSearchResult, setTokensSearchResult] = React.useState<Array<keyof Theme>>(tokens);

  // Text typed in the input bar
  const [inputValue, setInputValue] = React.useState('');

  // Value checked from the filter menu button
  const [checkedValue, setCheckedValue] = React.useState<Record<string, string[]>>();

  const styles = useStyles();

  const onInputChange: InputProps['onChange'] = (_, data) => {
    setInputValue(data.value.trim().toLocaleLowerCase());
    setCheckedValue(undefined);
  };

  React.useEffect(() => {
    // Trigger the token's search
    setTokensSearchResult(searchToken(inputValue));
  }, [inputValue]);

  const applyFilter: MenuProps['onCheckedValueChange'] = (_, { name, checkedItems }) => {
    // Filteringchecked items remove the selection and display the full list of tokens
    if (checkedItems[0] === checkedValue?.usecase[0]) {
      setCheckedValue(undefined);
      setTokensSearchResult(tokens);
      setInputValue('');
    } else {
      setCheckedValue(s => ({ ...s, [name]: checkedItems }));
      setTokensSearchResult(searchToken(checkedItems[0]));
      setInputValue(checkedItems[0]);
    }
  };

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
