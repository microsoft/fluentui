import * as React from 'react';
import { BaseComponent } from '@uifabric/utilities';
import { css, CSSProperties } from 'glamor';
import { Page, PageHeader } from './components';
import { getTheme, ITheme } from '../styles/theme';

function getStyles(theme: ITheme): CSSProperties {
  return {
    row: {
      paddingBottom: '10px',
      borderBottom: '1px solid ' + theme.colors.themeLighterAlt,
      userSelect: 'none'
    },
    cell: {
      ...theme.fonts.small,
      paddingRight: '20px'
    }
  };
}

export class FontPage extends BaseComponent<{}, {}> {

  public render(): JSX.Element {
    const theme: ITheme = getTheme();
    const styles: CSSProperties = getStyles(theme);

    return (
      <Page>
        <PageHeader text='Fonts' />
        <table>
          <tbody>
            { Object.keys(theme.fonts).map(fontName => (
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

