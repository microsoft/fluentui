import * as React from 'react';
import { CommandButton } from 'office-ui-fabric-react/lib/Button';
import { IStyleFunction, classNamesFunction, styled } from 'office-ui-fabric-react/lib/Utilities';
import { ICodepenProps, ICodepenStyleProps, ICodepenStyles } from './CodepenComponent.types';

/** ID to render the example into */
export const CONTENT_ID = 'content';

const getStyles: IStyleFunction<ICodepenStyleProps, ICodepenStyles> = () => ({});

const getClassNames = classNamesFunction<ICodepenStyleProps, ICodepenStyles>();

function script(path: string) {
  return `<script src="//unpkg.com/${path}"></script>`;
}

interface ICodepenPrefill {
  title: string;
  html: string;
  head: string;
  js: string;
  js_pre_processor: string;
  css_pre_processor: string;
  // and other options--see https://blog.codepen.io/documentation/api/prefill/
}

const CodepenComponentBase: React.FunctionComponent<ICodepenProps> = props => {
  const { jsContent = '', buttonAs: ButtonType = CommandButton, styles, theme } = props;

  const inputRef = React.useRef<HTMLInputElement>(null);

  const classNames = getClassNames(styles, { theme: theme! });
  const buttonStyles = classNames.subComponentStyles.button;

  // Wait to generate the JS content until the button is clicked, to ensure we export the latest code
  const onClick = React.useCallback(() => {
    const jsContentStr = typeof jsContent === 'string' ? jsContent : jsContent();

    // boilerplate for codepen API
    const htmlContent = [
      // load core Fabric bundle and hooks bundle
      script('office-ui-fabric-react@7/dist/office-ui-fabric-react.js'),
      script('@uifabric/react-hooks@7/dist/react-hooks.js'),
      // load example data bundle only if used
      jsContentStr.indexOf('window.FabricExampleData') !== -1 ? script('@uifabric/example-data@7/dist/example-data.js') : '',
      `<div id="${CONTENT_ID}"></div>`
    ]
      .filter(line => !!line)
      .join('\n');

    const headContent = `${script('react@16.8.6/umd/react.development.js')}\n${script('react-dom@16.8.6/umd/react-dom.development.js')}`;

    const valueData: ICodepenPrefill = {
      title: 'Fabric Example Pen',
      html: htmlContent,
      head: headContent,
      js: jsContentStr,
      js_pre_processor: 'typescript',
      css_pre_processor: 'scss'
    };

    // reformat the JSON string to take out the quotes so it'll work with the Codepen API
    const JSONstring = JSON.stringify(valueData)
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

    // set the value and allow the form submit action to continue
    inputRef.current!.value = JSONstring;
  }, [jsContent]);

  return (
    <form action="https://codepen.io/pen/define" method="POST" target="_blank">
      <input type="hidden" name="data" ref={inputRef} />
      <ButtonType
        type="submit"
        onClick={onClick}
        iconProps={{ iconName: 'OpenInNewWindow' }}
        text="Export to CodePen"
        styles={typeof buttonStyles === 'function' ? buttonStyles({}) : buttonStyles}
      />
    </form>
  );
};

export const CodepenComponent: React.StatelessComponent<ICodepenProps> = styled<ICodepenProps, ICodepenStyleProps, ICodepenStyles>(
  CodepenComponentBase,
  getStyles,
  undefined,
  { scope: 'CodepenComponent' }
);
