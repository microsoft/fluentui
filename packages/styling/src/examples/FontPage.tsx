import * as React from 'react';
import { BaseComponent } from '@uifabric/utilities';
import { css, CSSProperties } from 'glamor';
import { Page, PageHeader } from './components';
import { getTheme, ITheme } from '@uifabric/styling';
import { getStyles } from './FontPage.styles';

export class FontPage extends BaseComponent<{}, {}> {

  public render(): JSX.Element {
    const theme: ITheme = getTheme();
    const styles: CSSProperties = getStyles(theme);

    return (
      <Page>
        <PageHeader text='Fonts' />
        <table>
          <tbody>
            {
              Object.keys(theme.fonts)
                .filter((fontName: string) => theme.fonts[fontName].fontSize !== undefined)
                .map((fontName: string) => (
                  <tr { ...css(styles.row) } key={ fontName }>
                    <td {...css(styles.cell) }>{ `${fontName}` }</td>
                    <td { ...css(styles.cell) }>{ `${theme.fonts[fontName].fontSize}` }</td>
                    <td { ...css(theme.fonts[fontName]) }>The quick brown fox jumps over the lazy dog</td>
                  </tr>
                )) }
          </tbody>
        </table>
      </Page>
    );
  }
}
