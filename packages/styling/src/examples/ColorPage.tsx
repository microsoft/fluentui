import * as React from 'react';
import { BaseComponent } from '@uifabric/utilities';
import { css, CSSProperties } from 'glamor';
import { defaultPalette } from '../styles/colors';
import { fonts } from '../styles/fonts';
import { cssColor, rgb2hsv } from '../utilities/colors';
import { DetailsList, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { Page, PageHeader } from './components';

const styles: CSSProperties = {
  swatch: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: 20,
    height: 20,
    borderRadius: '50%',
    marginRight: '8px'
  },
  cell: {
    ...fonts.small,
    display: 'inline-block',
    vertikcalAlign: 'middle',
  },
  swatchText: {
  }
};

export interface IColorItem {
  colorValue: string;
}

export class ColorPage extends BaseComponent<{}, {}> {
  constructor() {
    super();

    this.state = { details: null };
  }
  public render(): JSX.Element {
    const items = Object.keys(defaultPalette).map(colorName => {
      const colorValue = defaultPalette[colorName];
      const rgb = cssColor(colorValue);
      const hsv = rgb ? rgb2hsv(rgb.r, rgb.g, rgb.b) : null;

      return {
        colorValue,
        colorName,
        ...rgb,
        ...hsv
      };
    });

    return (
      <Page>
        <PageHeader text='Colors' />
        <DetailsList
          items={ items }
          onRenderItemColumn={ (item: IColorItem, index: number, column: IColumn): JSX.Element => (
            <div
              { ...css(styles.cell) }
            >
              { column.fieldName === 'colorValue' ? (
                <div>
                  <div { ...css(styles.swatch) } style={ { background: item.colorValue } } />
                  <div { ...css(styles.cell, styles.swatchText) }>{ item.colorValue }</div>
                </div>
              ) : (
                  <div>{ item[column.fieldName] }</div>
                ) }
            </div>
          ) }
        />
      </Page>
    );
  }
}
