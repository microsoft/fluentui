import * as React from 'react';
import {
  classNamesFunction,
  customizable,
} from '../../Utilities';
import {
  FontClassNames,
  IPalette,
  loadTheme,
} from 'office-ui-fabric-react/lib/Styling';
import {
  ComponentPage,
  Highlight,
  IComponentDemoPageProps,
  PageMarkdown,
} from '@uifabric/example-app-base';
import {
  IThemePageStyleProps,
  IThemePageStyles,
  IThemePageState,
} from './ThemePage.types';
import { defaultTheme } from './defaultTheme';
import { getStyles } from './ThemePage.styles';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { DetailsList, DetailsListLayoutMode } from 'office-ui-fabric-react/lib/DetailsList';
import { SelectionMode } from 'office-ui-fabric-react/lib/Selection';
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';

const getClassNames = classNamesFunction<IThemePageStyleProps, IThemePageStyles>();

export class ThemePage extends React.Component<IComponentDemoPageProps, IThemePageState> {
  private _list: DetailsList;

  constructor(props: IComponentDemoPageProps) {
    super(props);

    this._onPickerDismiss = this._onPickerDismiss.bind(this);

    this.state = {
      colors: Object.keys(defaultTheme).map(variableName => ({
        key: variableName,
        name: variableName,
        value: (defaultTheme as any)[variableName],
        description: '',
        colorPickerProps: undefined
      }))
    };
  }

  public render() {
    return (
      <ComponentPage
        title='Theme'
        componentName='ThemeExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Theme'
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Theme/docs/ThemeOverview.md') }
          </PageMarkdown>
        }
        otherSections={ [
          {
            title: 'Default Theme Values',
            section: this._defaultThemeList()
          }
        ] }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }

  private _defaultThemeList = () => {
    const classNames = getClassNames(getStyles);
    const { colors, colorPickerProps } = this.state;
    return (
      <div>
        <DetailsList
          componentRef={ this._createDetailsListRef }
          items={ colors }
          selectionMode={ SelectionMode.none }
          layoutMode={ DetailsListLayoutMode.fixedColumns }
          columns={ [
            {
              key: 'name',
              name: 'Name',
              fieldName: 'name',
              minWidth: 150,
              maxWidth: 150
            },
            {
              key: 'color',
              name: 'Color',
              fieldName: 'value',
              minWidth: 200,
              onRender: (item, index) => (
                <div className={ classNames.colorSwatch } data-is-focusable='true' onClick={ this._onSwatchClicked.bind(this, item, index) }>
                  <span className={ classNames.swatch } style={ { backgroundColor: item.value } } />
                  <span className={ classNames.colorValue }>{ item.value }</span>
                </div>
              )
            },
            {
              key: 'desc',
              name: 'Description',
              fieldName: 'description',
              minWidth: 90
            }
          ] }
        />

        { colorPickerProps && (
          <Callout
            isBeakVisible={ false }
            gapSpace={ 10 }
            target={ colorPickerProps.targetElement }
            onDismiss={ this._onPickerDismiss }
          >

            <ColorPicker
              color={ colorPickerProps.value }
              onColorChanged={ this._onColorChanged.bind(this, colorPickerProps.index) }
            />

          </Callout>
        ) }

      </div>
    );
  }

  private _createDetailsListRef = (component: DetailsList) => {
    this._list = component;
  }

  private _onSwatchClicked(item: any, index: number, ev: React.MouseEvent<HTMLElement>) {
    this.setState({
      colorPickerProps: {
        targetElement: (ev.currentTarget as HTMLElement).children[0] as HTMLElement,
        value: item.value,
        index: index
      }
    });
  }

  private _onColorChanged(index: number, newColor: string) {
    const { colors } = this.state;
    const color = colors[index];
    const palette: Partial<IPalette> = {};

    color.value = newColor;

    for (let i = 0; i < colors.length; i++) {
      const themeColor = colors[i];

      (palette as any)[themeColor.key] = themeColor.value;
    }

    loadTheme({ palette });

    // The theme has changed values, but color state is the same. Force an update on the list.
    this._list.forceUpdate();
  }

  private _onPickerDismiss() {
    this.setState({
      colorPickerProps: undefined
    });
  }
}
