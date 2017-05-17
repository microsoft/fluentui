import * as React from 'react';
import { BaseComponent } from '@uifabric/utilities';
import { Page } from '../Page/Page';
import { PageHeader } from '../PageHeader/PageHeader';
import {
  ITheme,
  getTheme,
  mergeStyles
} from '@uifabric/styling';
import { IFontPageRules, getStyles } from './FontPage.styles';

export class FontPage extends BaseComponent<{}, {}> {

  public render(): JSX.Element {
    const theme: ITheme = getTheme();
    const styles: IFontPageRules = getStyles(theme);

    return (
      <Page>
        <PageHeader text='Fonts' />
        <table>
          <tbody>
            {
              Object.keys(theme.fonts)
                .filter((fontName: string) => theme.fonts[fontName].fontSize !== undefined)
                .map((fontName: string) => (
                  <tr className={ styles.row as string } key={ fontName }>
                    <td className={ styles.cell as string }>{ `${fontName}` }</td>
                    <td className={ styles.cell as string }>{ `${theme.fonts[fontName].fontSize}` }</td>
                    <td className={ mergeStyles(theme.fonts[fontName]) as string }>
                      The quick brown fox jumps over the lazy dog
                    </td>
                  </tr>
                )) }
          </tbody>
        </table>
      </Page>
    );
  }
}
