import * as React from 'react';
import { ColorPalette, IColorSwatch, MarkdownHeader } from '@fluentui/react-docsite-components/lib/index2';
import { SharePointNeutrals, SharePointThemes } from './sharePointThemes';

type SharePointState = { activeThemeName?: string };
export class SharePoint extends React.Component<{}, SharePointState> {
  public readonly state = {
    activeThemeName: undefined,
  } as SharePointState;

  public render() {
    const { activeThemeName } = this.state;
    const activeThemeData = SharePointThemes.filter(theme => theme.name === activeThemeName)[0];
    const activeThemeColors = activeThemeData && activeThemeData.colors;
    const activeNeutralData =
      activeThemeData && SharePointNeutrals.filter(theme => theme.background === activeThemeData.background)[0];
    const activeNeutralColors = activeNeutralData && activeNeutralData.colors;

    return (
      <>
        <MarkdownHeader as="h2">SharePoint</MarkdownHeader>

        <MarkdownHeader as="h3">Themes</MarkdownHeader>
        <ColorPalette
          colors={SharePointThemes.map(theme => ({
            name: theme.name,
            hex: theme.colors.filter(color => color.name === 'themePrimary')[0].hex,
            code: theme.colors.filter(color => color.name === 'themePrimary')[0].code,
          }))}
          onColorSelected={this._changeTheme}
        />

        {activeThemeColors && (
          <>
            <MarkdownHeader as="h3">{`${activeThemeName} theme`}</MarkdownHeader>
            <ColorPalette colors={activeThemeColors} />

            <MarkdownHeader as="h3">
              Neutrals for {activeThemeName} theme ({activeThemeData.background} background)
            </MarkdownHeader>
            <ColorPalette colors={activeNeutralColors} />
          </>
        )}
      </>
    );
  }

  private _changeTheme = (theme: IColorSwatch) => {
    this.setState(prevState =>
      prevState.activeThemeName !== theme.name
        ? {
            activeThemeName: theme.name,
          }
        : {},
    );
  };
}
