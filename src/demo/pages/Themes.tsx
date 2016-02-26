import * as React from 'react';
import { defaultTheme } from '../../themes';
import { loadTheme } from 'load-themed-styles';
import TextField from '../../components/TextField/index';
import Button from '../../components/Button/index';
import { DetailsList, SelectionMode, DetailsListLayoutMode as LayoutMode } from '../../components/DetailsList/index';
import ColorPicker from '../../components/ColorPicker/index';
import { assign } from '../../utilities/object';

let Highlight = require('react-highlight');
let ThemeCodeExample = require('./ThemeCodeExample.txt');

export default class Themes extends React.Component<any, any> {
  constructor() {
    super();

    this.state = {
      colors: Object.keys(defaultTheme).map(variableName => ({
        key: variableName,
        name: variableName,
        value: defaultTheme[variableName],
        description: ''
      }))
    };
  }

  public render() {
    let { colors } = this.state;

    return (
      <div className='Themes'>
        <h1 className='ms-font-xxl'>Themes</h1>
        <p>The entire color pallete of the controls are themeable. We provide a set of sensible defaults, but you can override all colors individually.</p>
        <p>To override the themes, you need to call <span className='code'>loadTheme()</span> with the appropriate set of overrides:</p>

        <Highlight className='typescript'>
          { ThemeCodeExample }
        </Highlight>

        <h1 className='ms-font-xl'>Define a theme</h1>
        <div>
          <DetailsList
            items={ colors }
            selectionMode={ SelectionMode.none }
            layoutMode={ LayoutMode.fixedColumns }
            columns={[
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
                getCellContent: (item, index) => (
                  <ColorPicker
                    color={ item.value }
                    onColorChanged={ this._onColorChanged.bind(this, item, index) }
                  />
                )
              },
              {
                key: 'desc',
                name: 'Description',
                fieldName: 'description',
                minWidth: 90
              }
            ]}
          />
        </div>

      </div>
    );
  }

  private _onColorChanged(item: any, index: number, newColor: string) {
    let { colors } = this.state;
    let color = colors[index];
    let theme = {};

    color.value = newColor;

    for (let themeColor of colors) {
      theme[themeColor.key] = themeColor.value;
    }

    loadTheme(theme);
  }

}
