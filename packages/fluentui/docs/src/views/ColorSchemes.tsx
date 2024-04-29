import * as React from 'react';
import DocPage from '../components/DocPage/DocPage';
import GuidesNavigationFooter from '../components/GuidesNavigationFooter';
import ColorSchemes from '../components/ColorSchemes';

import {
  Dropdown,
  Flex,
  Provider,
  teamsTheme,
  teamsHighContrastTheme,
  teamsDarkTheme,
  teamsV2Theme,
  teamsDarkV2Theme,
} from '@fluentui/react-northstar';
import { faderStyles } from '../components/Fader';
import { colorVariantsStyles } from '../components/ColorVariants';
import { colorBoxStyles, colorBoxVariables } from '../components/ColorBox';
import { ThemeOption } from '../context/ThemeContext';
import ThemeDropdown from '../components/ThemeDropdown';

const themes = {
  teamsTheme: { light: teamsTheme, dark: teamsDarkTheme },
  teamsV2Theme: { light: teamsV2Theme, dark: teamsDarkV2Theme },
};

const themeOptions: ThemeOption[] = [
  { text: 'Teams', value: 'teamsTheme' },
  { text: 'Teams V2', value: 'teamsV2Theme' },
];

export default () => {
  const [theme, setTheme] = React.useState(themeOptions[1]);
  const changeTheme: (event: React.SyntheticEvent, data: { value: ThemeOption }) => void = (event, { value }) => {
    setTheme(value);
  };

  const themeSwitcher = <ThemeDropdown style={{ float: 'right' }} onChange={changeTheme} themeOptions={themeOptions} />;

  const [color, setColor] = React.useState('brand');
  return (
    <Provider
      theme={{
        componentStyles: {
          ColorBox: colorBoxStyles,
          ColorVariants: colorVariantsStyles,
          Fader: faderStyles,
          Header: {
            root: {
              fontWeight: 700,
            },
          },
        },
        componentVariables: {
          ColorBox: colorBoxVariables,
        },
      }}
    >
      <DocPage title="Color schemes" themeSwitcher={themeSwitcher}>
        <Flex column>
          <Dropdown
            items={['default', 'brand', 'red', 'green', 'yellow', 'orange', 'pink', 'silver', 'onyx', 'amethyst']}
            defaultValue={'brand'}
            placeholder="Select the color"
            onChange={(e, { value }) => setColor(value as string)}
          />
          <ColorSchemes
            themes={[themes[theme.value].light, teamsHighContrastTheme, themes[theme.value].dark]}
            headers={[
              {
                as: 'h3',
                content: 'Design token',
              },
              {
                as: 'h3',
                content: 'Light theme',
              },
              {
                as: 'h3',
                content: 'HC theme',
              },
              {
                as: 'h3',
                content: 'Dark theme',
              },
            ]}
            name={color}
          />
        </Flex>
        <GuidesNavigationFooter previous={{ name: 'Colors', url: 'colors' }} />
      </DocPage>
    </Provider>
  );
};
