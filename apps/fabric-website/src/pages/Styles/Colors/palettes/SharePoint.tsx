import * as React from 'react';
import { ColorPalette, IColor } from '@uifabric/example-app-base/lib/index2';
import { SharePointNeutrals, SharePointThemes } from './sharePointThemes';

export class SharePoint extends React.Component<{}, { activeThemeName?: string }> {
  public readonly state = {
    activeThemeName: null
  };

  public render() {
    const { activeThemeName } = this.state;
    const activeThemeData = SharePointThemes.filter(theme => theme.name === activeThemeName)[0];
    const activeThemeColors = activeThemeData && activeThemeData.colors;
    const activeNeutralData = activeThemeData && SharePointNeutrals.filter(theme => theme.background === activeThemeData.background)[0];
    const activeNeutralColors = activeNeutralData && activeNeutralData.colors;

    return (
      <>
        <h2>SharePoint</h2>

        <h3>Themes</h3>
        <ColorPalette
          colors={SharePointThemes.map(theme => ({
            name: theme.name,
            hex: theme.colors.filter(color => color.name === 'themePrimary')[0].hex,
            code: theme.colors.filter(color => color.name === 'themePrimary')[0].code
          }))}
          // tslint:disable-next-line jsx-no-lambda
          onColorSelected={this._changeTheme}
        />

        {activeThemeColors && (
          <>
            <h3>{`${activeThemeName} theme`}</h3>
            <ColorPalette colors={activeThemeColors} />

            <h3>{`Neutrals for ${activeThemeName} theme (${activeThemeData.background} background)`}</h3>
            <ColorPalette colors={activeNeutralColors} />
          </>
        )}
      </>
    );
  }

  private _changeTheme = (theme: IColor) => {
    this.setState(
      prevState =>
        prevState.activeThemeName !== theme.name && {
          activeThemeName: theme.name
        }
    );
  };
}
