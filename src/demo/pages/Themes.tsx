import * as React from 'react';
import { defaultTheme } from '../../themes';
import { loadTheme } from 'load-themed-styles';
import TextField from '../../components/TextField/index';
import Button from '../../components/Button/index';

export default class Themes extends React.Component<any, any> {
  public render() {
    return (
      <div className='Themes'>
        <h1 className='ms-font-xxl'>Themes</h1>
        <p>The entire color pallete of the controls are themeable. We provide a set of sensible defaults, but you can override all colors individually.</p>
        <p>To override the themes, you need to call <span className='code'>loadTheme()</span> with the appropriate set of overrides:</p>
        <pre>code example</pre>
        <h1 className='ms-font-xl'>Define a theme</h1>
        <div>
          { Object.keys(defaultTheme).map(key => (
            <div>{ key }</div>
          ))}
        </div>
      </div>
    );
  }

  private _updateStyles() {
    let styleText = '{}';

    loadTheme(JSON.parse(styleText));
  }
}
