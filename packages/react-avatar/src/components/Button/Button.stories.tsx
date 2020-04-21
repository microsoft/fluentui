import * as React from 'react';
import { Button } from './Button';
import { Provider, themes, Button as FUIButton, Loader } from '@fluentui/react-northstar';
import { DefaultButton, IconButton, PrimaryButton } from '@fluentui/react';
import { StoryExample } from '../utils/StoryExample';
// tslint:disable:no-any
import { ThemeProvider } from '../utils/ThemeProvider';
import { convertTeamsTheme } from '../utils/convertTeamsTheme';

export const ButtonFela = () => (
  <Provider theme={themes.teams}>
    <StoryExample title="Button (fela)">
      <FUIButton icon="X" content="Hello, world" />
      <FUIButton primary content="Hello, world" />
      <FUIButton circular icon="X" />
      <FUIButton disabled content="Hello, world" />
      <FUIButton disabled primary content="Hello, world" />
      <FUIButton disabled circular icon="X" />
    </StoryExample>
  </Provider>
);

const FakeIcon = () => <span>X</span>;

export const ButtonMergeStyles = () => (
  <StoryExample title="Button (merge-styles)">
    <DefaultButton onRenderIcon={FakeIcon} text="Hello, world" />
    <PrimaryButton text="Hello, world" />
    <IconButton onRenderIcon={FakeIcon} />
    <DefaultButton disabled onRenderIcon={FakeIcon} text="Hello, world" />
    <PrimaryButton disabled text="Hello, world" />
    <IconButton disabled onRenderIcon={FakeIcon} />
  </StoryExample>
);

const lightTheme = convertTeamsTheme(themes.teams);
const darkTheme = convertTeamsTheme(themes.teamsDark);
const hcTheme = convertTeamsTheme(themes.teamsHighContrast);

export const ButtonCss = () => (
  <ThemeProvider theme={lightTheme}>
    <StoryExample title="Button (css)">
      <Button icon="X" content="Hello, world" />
      <Button primary content="Hello, world" />
      <Button circular icon="X" />
      <Button disabled content="Hello, world" />
      <Button disabled primary content="Hello, world" />
      <Button disabled circular icon="X" />
    </StoryExample>
  </ThemeProvider>
);

export const ButtonCssThemes = () => (
  <>
    <ThemeProvider theme={lightTheme}>
      <StoryExample title="Button (css, custom theme provider, light)">
        <Button icon="X" content="Hello, world" />
        <Button primary content="Hello, world" />
        <Button circular icon="X" />
        <Button disabled content="Hello, world" />
        <Button disabled primary content="Hello, world" />
        <Button disabled circular icon="X" />
      </StoryExample>
    </ThemeProvider>
    <ThemeProvider theme={darkTheme}>
      <StoryExample title="Button (css, custom theme provider, dark)">
        <Button icon="X" content="Hello, world" />
        <Button primary content="Hello, world" />
        <Button circular icon="X" />
        <Button disabled content="Hello, world" />
        <Button disabled primary content="Hello, world" />
        <Button disabled circular icon="X" />
      </StoryExample>
    </ThemeProvider>
    <ThemeProvider theme={hcTheme}>
      <StoryExample title="Button (css, custom theme provider, hc)">
        <Button icon="X" content="Hello, world" />
        <Button primary content="Hello, world" />
        <Button circular icon="X" />
        <Button disabled content="Hello, world" />
        <Button disabled primary content="Hello, world" />
        <Button disabled circular icon="X" />
      </StoryExample>
    </ThemeProvider>
  </>
);
