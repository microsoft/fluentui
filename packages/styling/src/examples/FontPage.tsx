import * as React from 'react';
import { BaseComponent } from '@uifabric/utilities';
import { css, CSSProperties } from 'glamor';
import { fonts } from '../styles/fonts';
import { Page, PageHeader } from './components';
import { classNames } from '../classNames';

const styles: CSSProperties = {
  row: {
    paddingBottom: '10px',
    borderBottom: '1px solid #aaa',
    userSelect: 'none'
  },
  cell: {
    ...fonts.small
  }
};

export class FontPage extends BaseComponent<{}, {}> {

  public render(): JSX.Element {
    return (
      <Page>
        <PageHeader text='Fonts' />
        <table>
          { Object.keys(fonts).map(fontName => (
            <tr { ...css(styles.row) } key={ fontName }>
              <td {...css(styles.cell) }>{ `fonts.${fontName}` }</td>
              <td { ...css(styles.cell) }>{ `${fonts[fontName].fontSize}` }</td>
              <td { ...css(fonts[fontName]) }>The quick brown fox jumps over the lazy dog</td>
            </tr>
          )) }
        </table>
      </Page>
    );
  }
}

