import * as React from 'react';
import { CommandButton } from 'office-ui-fabric-react/lib/Button';
import { IStyleFunction, classNamesFunction, styled } from 'office-ui-fabric-react/lib/Utilities';
import { ICodepenProps, ICodepenStyleProps, ICodepenStyles } from './CodepenComponent.types';

const getStyles: IStyleFunction<ICodepenStyleProps, ICodepenStyles> = () => ({});

const getClassNames = classNamesFunction<ICodepenStyleProps, ICodepenStyles>();

function script(path: string) {
  return `<script src="//unpkg.com/${path}"></script>`;
}

const CodepenComponentBase: React.StatelessComponent<ICodepenProps> = props => {
  const { jsContent, buttonAs: ButtonType = CommandButton, styles, theme } = props;

  const classNames = getClassNames(styles, { theme: theme! });
  const buttonStyles = classNames.subComponentStyles.button;

  // boilerplate for codepen API
  const htmlContent = [
    script('office-ui-fabric-react@7/dist/office-ui-fabric-react.js'),
    script('@uifabric/example-data@7/dist/example-data.js'),
    '<div id="content"></div>'
  ];

  const headContent = [script('react@16.8.6/umd/react.development.js'), script('react-dom@16.8.6/umd/react-dom.development.js')].join('\n');

  const valueData = {
    title: 'Fabric Example Pen',
    html: htmlContent,
    head: headContent,
    js: jsContent,
    js_pre_processor: 'typescript',
    css_pre_processor: 'scss'
  };

  // reformat the JSON string to take out the quotes so it'll work with the Codepen API
  const JSONstring = JSON.stringify(valueData)
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

  return (
    <form action="https://codepen.io/pen/define" method="POST" target="_blank">
      <input type="hidden" name="data" value={JSONstring} />
      <ButtonType
        type="submit"
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
