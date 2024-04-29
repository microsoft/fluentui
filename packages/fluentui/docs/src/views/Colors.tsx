import { CodeSnippet } from '@fluentui/docs-components';
import {
  Provider,
  ProviderConsumer,
  Grid,
  Header,
  Box,
  Text,
  Alert,
  mergeThemes,
  teamsTheme,
  teamsHighContrastTheme,
  teamsDarkTheme,
} from '@fluentui/react-northstar';
import * as _ from 'lodash';
import * as React from 'react';
import { Link } from 'react-router-dom';

import ColorBox, { colorBoxStyles, colorBoxVariables } from '../components/ColorBox';
import Fader, { faderStyles } from '../components/Fader';
import SystemColors from '../components/SystemColors';
import ColorVariants, { colorVariantsStyles } from '../components/ColorVariants';
import DocPage from '../components/DocPage/DocPage';
import ExampleSnippet from '../components/ExampleSnippet';
import ColorSchemes from '../components/ColorSchemes';
import GuidesNavigationFooter from '../components/GuidesNavigationFooter';
import { link, code } from '../utils/helpers';

const theme = {
  componentVariables: {
    Box: ({ colorScheme }) => ({
      color: colorScheme.brand.foreground3,
      backgroundColor: colorScheme.brand.background3,
    }),
  },
  componentStyles: {
    Box: {
      root: ({ variables }) => ({
        color: variables.color,
        backgroundColor: variables.backgroundColor,
      }),
    },
  },
};

const Colors = () => (
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
        Text: {
          root: ({ theme: { siteVariables } }) => ({
            '& a': {
              color: siteVariables.colorScheme.brand.foreground,
            },
          }),
        },
      },
      componentVariables: {
        ColorBox: colorBoxVariables,
      },
    }}
  >
    <ProviderConsumer
      render={({ siteVariables: { colors, contextualColors, naturalColors, transparentColors } }) => (
        <DocPage title="Colors">
          <Header as="h2">Introduction</Header>
          <p>
            The organizing of the colors for an application has many requirements and constraints. In Fluent UI, the
            colors mechanisms are completely based on the <code>siteVariables</code>.
          </p>
          <p>We have two concepts in order for colors to work transparently when the theme switching is in play:</p>
          <ul>
            <li>
              <Text weight="bold" color="primary">
                {link('Color palette', '#color-palette')}
              </Text>{' '}
              - central place for all colors available in the application,
            </li>
            <li>
              <Text weight="bold" color="primary">
                {link('Color scheme', '#color-scheme')}
              </Text>{' '}
              - design tokens for all colors used in the application that should be appropriately mapped in all themes.
            </li>
          </ul>
          <Alert info>
            Everything that follows it's our recommendation and not a requirement. You can make own decision on the
            structure you want to use in your theme.
          </Alert>
          <Header as="h2" content="Color palette" />
          <p>
            Colors in{' '}
            <Text color="brand" weight="bold">
              {link('Teams color palette', '/color-palette')}
            </Text>{' '}
            have the following categorization.
          </p>

          <Header as="h3">Primitive colors</Header>
          <p>
            This part of the palette contains colors that, semantically, cannot have any tints. This group is
            represented by two colors, {code('black')} and {code('white')} - as there is nothing blacker than black and
            nothing whiter than white.
          </p>

          <Grid columns={2} variables={{ gridGap: '.5rem', padding: '.75rem' }}>
            {_.map(['black', 'white'], color => (
              <div key={color}>
                <ColorBox name={color} rounded size="small" value={colors[color]} copyToClipboardIcon={false} />
              </div>
            ))}
          </Grid>

          <Header as="h3">Natural colors</Header>
          <p>
            This part of palette includes colors from those that are the most commonly used among popular frameworks (
            {code('blue')}, {code('green')}, {code('grey')},{code('orange')}, {code('pink')}, {code('purple')},{' '}
            {code('teal')}, {code('red')}, {code('yellow')}). Each color includes at least ten gradients, this allows us
            to satisfy most common needs.
          </p>
          <p>
            This decision is experienced from Material UI and allows to define more variants than by using semantical
            naming ({code('lightest')}, {code('lighter')}, etc.). However, there is no requirement for client to define
            all the gradient values for each color - it is just enough to define those that are actually used in the
            app.
          </p>
          <p>
            Below there is an example of base tints of Teams' natural colors provided. Full list of all gradient values
            for them can be found on{' '}
            <Text color="brand" weight="bold">
              {link('Teams color palette page', '/color-palette')}
            </Text>
            .
          </p>
          <Grid columns={2} variables={{ gridGap: '.5rem', padding: '.75rem' }}>
            {_.map(naturalColors, (variants, color) => (
              <div key={color}>
                <ColorBox name={color} rounded size="small" value={colors[color][600]} copyToClipboardIcon={false} />
              </div>
            ))}
          </Grid>

          <Header as="h3">Contextual colors</Header>
          <p>
            This part of the palette may include {code('brand')} color as well as {code('danger')}, {code('success')},{' '}
            {code('info')} colors, etc.
          </p>

          <Grid columns={2} variables={{ gridGap: '.5rem', padding: '.75rem' }}>
            {_.map(contextualColors, (variants, color) => (
              <div key={color}>
                <ColorBox name={color} rounded size="small" value={colors[color][600]} copyToClipboardIcon={false} />
              </div>
            ))}
          </Grid>

          <Header as="h3">All colors</Header>
          <p>
            If the theme requires more colors, they can be added to color palette as needed. These are all colors
            available in the Teams' theme color palette.
          </p>
          <Grid columns={2} variables={{ gridGap: '.5rem', padding: '.75rem' }}>
            {_.map(['black', 'white'], color => (
              <div key={color}>
                <ColorBox name={color} size="small" rounded value={colors[color]} copyToClipboardIcon={false} />
              </div>
            ))}
            {_.map({ ...contextualColors, ...naturalColors, ...transparentColors }, (variants, color) => (
              <div key={color}>
                <ColorVariants name={color} headerOnly size="small" />
              </div>
            ))}
          </Grid>
          <p>
            To see all colors variants in the palette, follow this{' '}
            <Text as={Link} weight="bold" content="link" color="brand" to="color-palette" />.
          </p>

          <Header as="h3">System colors</Header>
          <p>
            When styling web content for Windows high contrast mode, very little CSS rules should be required. In the
            case where the color needs to be explicitly set in high contrast mode, there is only a limited set of colors
            that can be used. The complete set of system colors can be found{' '}
            <Text
              as={Link}
              weight="bold"
              content="in the new CSS standard"
              color="brand"
              to={{ pathname: 'https://www.w3.org/TR/css-color-4/#css-system-colors' }}
            />
            .
          </p>

          <p>
            You can view this page in on windows in high contrast mode with different themes and see these colors change
            based on the high contrast theme you pick. You can find the instructions to turn on windows high contrast
            mode by folow this{' '}
            <Text
              as={Link}
              weight="bold"
              content="link"
              color="brand"
              to={{
                pathname:
                  'https://support.microsoft.com/en-us/windows/change-color-contrast-in-windows-fedc744c-90ac-69df-aed5-c8a90125e696',
              }}
            />
          </p>

          <SystemColors />

          <Header as="h2" content="Color scheme" />
          <p>
            Each our theme defines <b>color scheme</b>, which will define the design tokens usages of the different
            colors from the palette. The color scheme is a prop of {code('siteVariables')} via {code('colorScheme')}{' '}
            that contains all schemas for the colors available in the palette.
          </p>
          <p>
            The color tokens defined in the color scheme are mapped to actual values for all themes used in the
            application. This means that, if the developers use some token from the schema, it will be mapped to the
            correct color value provided by the current theme.
          </p>

          <ExampleSnippet
            value={`
import React from "react";
import { Box, Provider, mergeThemes, themes } from "@fluentui/react-northstar";

const theme = {
  componentVariables: {
    // 💡 \`colorScheme\` is the object containing all color tokens
    Box: ({ colorScheme }) => ({
      // \`brand\` contains all design tokens for the \`brand\` color
      color: colorScheme.brand.foreground3,
      backgroundColor: colorScheme.brand.background3
      // \`foreground3\` and \`background3\` are theme-dependent tokens that should
      // be used as value in styles, you can define own tokens 💪
    })
  },
  componentStyles: {
    Box: {
      // 🚀 We recomend to use \`colorScheme\` from variables mapping
      root: ({ variables }) => ({
        color: variables.color,
        backgroundColor: variables.backgroundColor
      })
    }
  }
};

const ColorSchemeExample = () => (
  <React.Fragment>
    <Provider theme={mergeThemes(teamsTheme, theme)}>
      <Box content="teamsTheme" />
    </Provider>
    <Provider theme={mergeThemes(teamsHighContrastTheme, theme)}>
      <Box content="teamsHighContrastTheme" />
    </Provider>
  </React.Fragment>
);

export default ColorSchemeExample;
        `}
            render={() => (
              <>
                <Provider theme={mergeThemes(teamsTheme, theme)}>
                  <Box content="teamsTheme" />
                </Provider>
                <Provider theme={mergeThemes(teamsHighContrastTheme, theme)}>
                  <Box content="teamsHighContrastTheme" />
                </Provider>
              </>
            )}
          />

          <p>
            You can add multiple color schemes per theme like {code('inverted')} or for specific parts of the
            application that look different. Your design team can provide you different names for the design tokens:
          </p>
          <CodeSnippet
            mode="js"
            value={`
// ⚠️ Be sure that they will be mapped to the correct color from the palette in each theme
export const colorScheme = {
  inverted: {
    inputBorder: colors.black[750],
    textAreaBorder: colors.black[450],
  }
}
          `}
          />

          <p>
            You can see use color schemes defined for Teams' themes as reference to create own, below is definition for{' '}
            <code>brand</code> color in in Teams light, high contrast and dark themes.
          </p>

          <Fader url={'color-schemes'}>
            <ColorSchemes
              themes={[teamsTheme, teamsHighContrastTheme, teamsDarkTheme]}
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
              name={'brand'}
            />
          </Fader>

          <GuidesNavigationFooter
            previous={{ name: 'Theming Examples', url: 'theming-examples' }}
            next={{ name: 'Layout', url: 'layout' }}
          />
        </DocPage>
      )}
    />
  </Provider>
);

export default Colors;
