import React from 'react';
import { Stack, Text, Link, FontWeights, IStackTokens } from '@fluentui/react';
import logo from './logo.svg';
import './App.css';

const boldStyle = { root: { fontWeight: FontWeights.semibold } };
const stackTokens: IStackTokens = { childrenGap: 15 };

export const App: React.FunctionComponent = () => {
  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      verticalFill
      styles={{
        root: {
          width: '960px',
          margin: '0 auto',
          textAlign: 'center',
          color: '#605e5c',
        },
      }}
      tokens={stackTokens}
    >
      <img className="App-logo" src={logo} alt="logo" />
      <Text variant="xxLarge" styles={boldStyle}>
        Welcome to Your Fluent UI App
      </Text>
      <Text variant="large">For a guide on how to customize this project, check out the Fluent UI documentation.</Text>
      <Text variant="large" styles={boldStyle}>
        Essential Links
      </Text>
      <Stack horizontal tokens={stackTokens} horizontalAlign="center">
        <Link href="https://developer.microsoft.com/en-us/fluentui#/get-started/web">Docs</Link>
        <Link href="https://stackoverflow.com/questions/tagged/office-ui-fabric">Stack Overflow</Link>
        <Link href="https://github.com/microsoft/fluentui/">Github</Link>
        <Link href="https://twitter.com/fluentui">Twitter</Link>
      </Stack>
      <Text variant="large" styles={boldStyle}>
        Design System
      </Text>
      <Stack horizontal tokens={stackTokens} horizontalAlign="center">
        <Link href="https://developer.microsoft.com/en-us/fluentui#/styles/web/icons">Icons</Link>
        <Link href="https://developer.microsoft.com/en-us/fluentui#/styles/web">Styles</Link>
        <Link href="https://aka.ms/themedesigner">Theme Designer</Link>
      </Stack>
    </Stack>
  );
};
