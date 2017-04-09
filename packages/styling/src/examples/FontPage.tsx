import * as React from 'react';
import { BaseComponent } from '@uifabric/utilities';
import { css } from 'glamor';
import { fonts } from '../styles/fonts';
import { defaultPalette } from '../styles/colors';

const styles: any = {
  root: {
    padding: '20px'
  },
  header: {
    ...fonts.xLarge,
    paddingBottom: '20px'
  },
  row: {
    paddingBottom: '10px',
    borderBottom: '1px solid #aaa',
    userSelect: 'none'
  },
  cell: {
    ...fonts.medium
  }
};

export class FontPage extends BaseComponent<{}, {}> {

  public render(): JSX.Element {
    return (
      <div { ...css(styles.root) }>
        <div { ...css(styles.header) }>Fonts</div>
        <table>
          { Object.keys(fonts).map(fontName => (
            <tr { ...css(styles.row) } key={ fontName }>
              <td { ...css(styles.cell) }>{ `fonts.${fontName}` }</td>
              <td { ...css(styles.cell) }>{ `${fonts[fontName].fontSize}` }</td>
              <td { ...css(fonts[fontName]) }>The quick brown fox jumps over the lazy dog</td>
            </tr>
          )) }
        </table>
      </div>
    );
  }
}

