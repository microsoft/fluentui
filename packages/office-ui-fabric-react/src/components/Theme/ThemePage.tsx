import * as React from 'react';
import { loadTheme, FontClassNames, ITheme, IPalette } from 'office-ui-fabric-react/lib/Styling';
import { Highlight } from '@uifabric/example-app-base';
import { defaultTheme } from './defaultTheme';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { DetailsList, DetailsListLayoutMode as LayoutMode } from 'office-ui-fabric-react/lib/DetailsList';
import { SelectionMode } from 'office-ui-fabric-react/lib/Selection';
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';
import './ThemePage.scss';
const ThemeCodeExample = require('!raw-loader!office-ui-fabric-react/src/components/Theme/examples/ThemeCode.Example.tsx');

export class ThemePage extends React.Component<any, any> {

  public refs: {
    [key: string]: React.ReactInstance;
    list: DetailsList;
  };

  constructor() {
    super();

    this._onPickerDismiss = this._onPickerDismiss.bind(this);

    this.state = {
      colors: Object.keys(defaultTheme).map(variableName => ({
        key: variableName,
        name: variableName,
        value: defaultTheme[variableName],
        description: '',
        colorPickerProps: null
      }))
    };
  }

  public render() {
    let { colors, colorPickerProps } = this.state;

    return (
      <div className='Themes'>
        <h1 className={ FontClassNames.xxLarge }>Themes</h1>
        <p>The entire color pallete of the controls are themeable. We provide a set of sensible defaults, but you can override all colors individually.</p>
        <p>To override the themes, you need to call <span className='code'>loadTheme()</span> with the appropriate set of overrides:</p>

        <Highlight className='typescript'>
          { ThemeCodeExample }
        </Highlight>

        <h1 className={ FontClassNames.xLarge }>Define a theme</h1>
        <div>
          <DetailsList
            ref='list'
            items={ colors }
            selectionMode={ SelectionMode.none }
            layoutMode={ LayoutMode.fixedColumns }
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
                  <div className='ThemePage-colorSwatch' data-is-focusable='true' onClick={ this._onSwatchClicked.bind(this, item, index) }>
                    <span className='ThemePage-swatch' style={ { backgroundColor: item.value } } />
                    <span className='ThemePage-colorValue'>{ item.value }</span>
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
              targetElement={ colorPickerProps.targetElement }
              onDismiss={ this._onPickerDismiss }>

              <ColorPicker
                color={ colorPickerProps.value }
                onColorChanged={ this._onColorChanged.bind(this, colorPickerProps.index) }
              />

            </Callout>
          ) }

        </div>

      </div>
    );
  }

  private _onSwatchClicked(item: any, index: number, ev: React.MouseEvent<HTMLElement>) {
    this.setState({
      colorPickerProps: {
        targetElement: (ev.currentTarget as HTMLElement).children[0],
        value: item.value,
        index: index
      }
    });
  }

  private _onColorChanged(index: number, newColor: string) {
    let { colors } = this.state;
    let color = colors[index];
    let palette: Partial<IPalette> = {};

    color.value = newColor;

    for (let i = 0; i < colors.length; i++) {
      let themeColor = colors[i];

      palette[themeColor.key] = themeColor.value;
    }

    loadTheme({ palette });

    // The theme has changed values, but color state is the same. Force an update on the list.
    this.refs.list.forceUpdate();
  }

  private _onPickerDismiss() {
    this.setState({
      colorPickerProps: null
    });
  }

}
