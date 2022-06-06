import {
  Provider,
  ProviderConsumer,
  Grid,
  Header,
  mergeThemes,
  teamsTheme,
  teamsV2Theme,
} from '@fluentui/react-northstar';
import * as _ from 'lodash';
import * as React from 'react';

import ColorBox, { colorBoxStyles, colorBoxVariables } from '../components/ColorBox';
import ColorVariants, { colorVariantsStyles } from '../components/ColorVariants';
import DocPage from '../components/DocPage/DocPage';
import GuidesNavigationFooter from '../components/GuidesNavigationFooter';
import ThemeDropdown from '../components/ThemeDropdown';
import { ThemeOption } from '../context/ThemeContext';

const themeOptions: ThemeOption[] = [
  { text: 'Teams', value: 'teamsTheme' },
  { text: 'Teams V2', value: 'teamsV2Theme' },
];

const themes = {
  teamsTheme,
  teamsV2Theme,
};

const ColorPalette = () => {
  const [theme, setTheme] = React.useState(themeOptions[1]);
  const changeTheme: (event: React.SyntheticEvent, data: { value: ThemeOption }) => void = (event, { value }) => {
    setTheme(value);
  };

  const themeSwitcher = <ThemeDropdown style={{ float: 'right' }} onChange={changeTheme} themeOptions={themeOptions} />;

  return (
    <Provider
      theme={mergeThemes(themes[theme.value], {
        componentStyles: {
          ColorBox: colorBoxStyles,
          ColorVariants: colorVariantsStyles,
          Header: {
            root: {
              fontWeight: 700,
            },
          },
        },
        componentVariables: {
          ColorBox: colorBoxVariables,
        },
      })}
    >
      <ProviderConsumer
        render={({ siteVariables: { colors, contextualColors, naturalColors, transparentColors } }) => (
          <DocPage title="Color palette" themeSwitcher={themeSwitcher}>
            <Header as="h2">Introduction</Header>
            <p>
              This page displays all colors available in Teams' theme. The page is not intended to be used for
              copy-pasting values directly, but as a reference to the designers about which colors are available.
            </p>
            <Grid columns={2} variables={{ gridGap: '2rem' }}>
              {_.map(['black', 'white'], color => (
                <div key={color}>
                  <ColorBox name={color} size="big" value={colors[color]} />
                </div>
              ))}
              {_.map({ ...contextualColors, ...naturalColors, ...transparentColors }, (variants, color) => (
                <div key={color}>
                  <ColorVariants name={color} />
                </div>
              ))}
            </Grid>

            <GuidesNavigationFooter previous={{ name: 'Colors', url: 'colors' }} />
          </DocPage>
        )}
      />
    </Provider>
  );
};

export default ColorPalette;
