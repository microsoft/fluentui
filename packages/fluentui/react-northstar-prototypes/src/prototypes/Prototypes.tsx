import * as React from 'react';
import DocumentTitle from 'react-document-title';

import {
  Box,
  Dropdown,
  Flex,
  Header,
  ICSSInJSStyle,
  Provider,
  Segment,
  teamsDarkTheme,
  teamsDarkV2Theme,
  teamsHighContrastTheme,
  teamsTheme,
  teamsV2Theme,
  Text,
  ThemePrepared,
} from '@fluentui/react-northstar';

interface PrototypeSectionProps {
  title?: React.ReactNode;
  styles?: ICSSInJSStyle;
}

interface ComponentPrototypeProps extends PrototypeSectionProps {
  description?: React.ReactNode;
}

type ThemeName = 'Teams' | 'Teams Dark' | 'Teams High Contrast' | 'Teams V2' | 'Teams Dark V2';

const themes: Record<ThemeName, ThemePrepared> = {
  Teams: teamsTheme,
  'Teams Dark': teamsDarkTheme,
  'Teams High Contrast': teamsHighContrastTheme,
  'Teams V2': teamsV2Theme,
  'Teams Dark V2': teamsDarkV2Theme,
};

const ThemeContext = React.createContext<ThemeName>('Teams');

export const PrototypeSection: React.FunctionComponent<PrototypeSectionProps> = ({ children, styles, title }) => {
  const [theme, setTheme] = React.useState<ThemeName>('Teams');
  const changeTheme = React.useCallback((_, { value }) => setTheme(value), [setTheme]);

  return (
    <ThemeContext.Provider value={theme}>
      <DocumentTitle title={`Fluent UI - ${title || 'Prototype'}`} />
      <Flex
        gap="gap.medium"
        space="between"
        vAlign="center"
        styles={{
          backdropFilter: 'blur(10px)',
          background: '#dddddd88',
          borderBottom: '1px solid #00000022',
          padding: '20px',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <Flex.Item shrink={0}>
          <Header as="h1" content={title} style={{ marginBottom: '0', marginTop: '0' }} />
        </Flex.Item>
        <Dropdown
          items={Object.keys(themes)}
          onChange={changeTheme}
          placeholder="Theme"
          variables={{ width: '14rem' }}
        />
      </Flex>
      <Box styles={{ padding: '20px', ...styles }}>{children}</Box>
    </ThemeContext.Provider>
  );
};

export const ComponentPrototype: React.FunctionComponent<ComponentPrototypeProps> = ({
  children,
  description,
  styles,
  title,
}) => {
  const theme = React.useContext(ThemeContext);

  return (
    <Box styles={{ marginBottom: '30px', ...styles }}>
      {(title || description) && (
        <Segment style={{ borderBottom: '1px solid #dddddd' }}>
          {title && <Header as="h3" content={title} style={{ margin: '0' }} />}
          {description && <Text content={description} />}
        </Segment>
      )}
      <Segment>
        <Provider theme={themes[theme]}>{children}</Provider>
      </Segment>
    </Box>
  );
};
