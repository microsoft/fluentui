import * as React from 'react';
import { BaseComponent } from '@uifabric/utilities';
import { css } from 'glamor';
import { defaultPalette } from '../styles/colors';
import { fonts } from '../styles/fonts';
import { cssColor, rgb2hsv } from '../utilities/colors';
import { DetailsList } from 'office-ui-fabric-react/lib/DetailsList';

const styles = {
  root: {
    padding: '20px'
  },
  header: {
    ...fonts.xLarge,
    paddingBottom: '20px'
  },
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
    ...fonts.code
  }
};

export class ColorPage extends BaseComponent<{}, { details?: any }> {
  constructor() {
    super();

    this.state = { details: null };
  }
  public render(): JSX.Element {
    let { details } = this.state;
    let items = Object.keys(defaultPalette).map(colorName => {
      let colorValue = defaultPalette[colorName];
      let rgb = cssColor(colorValue);
      let hsv = rgb ? rgb2hsv(rgb.r, rgb.g, rgb.b) : null;

      return {
        colorValue,
        colorName,
        ...rgb,
        ...hsv
      };
    });

    return (
      <div { ...css(styles.root) }>
        <div { ...css(styles.header) }>Colors</div>
        <DetailsList
          items={ items }
          onRenderItemColumn={ (item, index, column) => (
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
      </div>
    );
  }
}
