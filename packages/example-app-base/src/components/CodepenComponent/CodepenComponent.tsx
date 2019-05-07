import * as React from 'react';
import { CommandButton } from 'office-ui-fabric-react/lib/Button';
import { ICodepenProps, ICodepenStyleProps, ICodepenStyles } from './CodepenComponent.types';
import { IStyleFunction, classNamesFunction, styled } from 'office-ui-fabric-react/lib/Utilities';

const getStyles: IStyleFunction<ICodepenStyleProps, ICodepenStyles> = () => ({});

const getClassNames = classNamesFunction<ICodepenStyleProps, ICodepenStyles>();

const CodepenComponentBase: React.StatelessComponent<ICodepenProps> = props => {
  const { jsContent, buttonAs: ButtonType = CommandButton, buttonClassName, styles, theme } = props;

  const classNames = getClassNames(styles, { theme: theme! });
  const buttonStyles = classNames.subComponentStyles.button;

  // boilerplate for codepen API
  const htmlContent = '<script src="//unpkg.com/office-ui-fabric-react/dist/office-ui-fabric-react.js"></script>\n<div id="content"></div>';

  const headContent =
    '<script type="text/javascript" src="https://unpkg.com/react@16/umd/react.development.js"></script>\n<script type="text/javascript" src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>';

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
        className={buttonClassName}
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
