import * as React from 'react';
import { BaseComponent } from '@uifabric/utilities';
import {
  DefaultPalette,
  ColorClassNames,
  ITheme,
  getTheme
} from '@uifabric/styling';
import { DetailsList, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { Page } from '../Page/Page';
import { PageHeader } from '../PageHeader/PageHeader';
import { IColorPageStyles, getStyles } from './ColorPage.styles';

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
    const theme: ITheme = getTheme();
    const styles: IColorPageStyles = getStyles();

    Object.keys(DefaultPalette).forEach((colorName: string) => {
      // tslint:disable-next-line:no-any
      const colorValue: string = (theme.palette as any)[colorName];

      ['', 'Hover', 'Background', 'BackgroundHover', 'Border', 'BorderHover'].forEach((suffix: string) => {
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
            <div className={ styles.cell as string }>
              { column.fieldName === 'colorValue' ? (
                <div>
                  <div className={ styles.swatch as string } style={ { background: item.colorValue } } />
                  <div className={ styles.swatchText as string }>{ item.colorValue }</div>
                </div>
              ) :
                column.key === 'example' ? (
                  <div
                    className={
                      // tslint:disable-next-line:no-any
                      (ColorClassNames as any)[item.name] +
                      ' ' +
                      (item.name.indexOf('Border') >= 0 ? styles.cellWithBorder : '')
                    }
                  >
                    The quick brown fox jumps over the lazy dog.
                  </div>
                ) : (
                    // tslint:disable-next-line:no-any
                    <div>{ (item as any)[column.fieldName] }</div>
                  ) }
            </div>
          )
          }
        />
      </Page >
    );
  }
}
