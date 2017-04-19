import * as React from 'react';
import { BaseComponent } from '@uifabric/utilities';
import { css, CSSProperties } from 'glamor';
import { getTheme, ITheme, classNames } from '@uifabric/styling';
import { DetailsList, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { Page, PageHeader } from './components';

const { colors, fonts }: ITheme = getTheme();

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
  },
  example: {
    ...fonts.mediumPlus
  }
};

const COLUMNS: IColumn[] = [
  {
    key: 'name',
    name: 'Name',
    fieldName: 'name',
    minWidth: 200,
    maxWidth: 300
  },
  {
    key: 'colorValue',
    name: 'Color value',
    fieldName: 'colorValue',
    minWidth: 100,
    maxWidth: 200
  },
  {
    key: 'example',
    name: 'Example',
    fieldName: 'example',
    minWidth: 300,
    maxWidth: 400
  }
];

export interface IColorItem {
  key: string;
  colorValue: string;
  name: string;
}

export class ColorPage extends BaseComponent<{}, {}> {
  constructor() {
    super();

    this.state = { details: null };
  }
  public render(): JSX.Element {
    const items: IColorItem[] = [];

    Object.keys(colors).forEach((colorName: string) => {
      const colorValue: string = colors[colorName];

      ['', 'Hover', 'Background', 'BackgroundHover'].forEach((suffix: string) => {
        items.push({
          key: 'item' + items.length,
          name: colorName + suffix,
          colorValue
        });
      });
    });

    return (
      <Page>
        <PageHeader text='Colors' />
        <DetailsList
          items={ items }
          columns={ COLUMNS }
          onRenderItemColumn={ (item: IColorItem, index: number, column: IColumn): JSX.Element => (
            <div
              { ...css(styles.cell) }
            >
              { column.fieldName === 'colorValue' ? (
                <div>
                  <div { ...css(styles.swatch) } style={ { background: item.colorValue } } />
                  <div { ...css(styles.cell, styles.swatchText) }>{ item.colorValue }</div>
                </div>
              ) :
                column.key === 'example' ? (
                  <div
                    { ...css(styles.example) }
                    className={ classNames.colors[item.name] }
                  >
                    The quick brown fox jumps over the lazy dog.
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
