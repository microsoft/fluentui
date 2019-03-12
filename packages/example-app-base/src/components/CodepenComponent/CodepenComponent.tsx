import * as React from 'react';
import { css, IComponentAs } from 'office-ui-fabric-react/lib/Utilities';
import '../ExampleCard/ExampleCard.scss';
import { CommandButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export interface ICodepenProps {
  /* JS string to be passed into Codepen */
  jsContent: string;
  /* Optional button type */
  buttonAs?: IComponentAs<IButtonProps>;
}

export class CodepenComponent extends React.Component<ICodepenProps> {
  constructor(props: ICodepenProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { jsContent, buttonAs: ButtonType = CommandButton } = this.props;

    // boilerplate for codepen API
    const htmlContent =
      '<script src="//unpkg.com/office-ui-fabric-react/dist/office-ui-fabric-react.js"></script>\n<div id=\'content\'></div>';

    const headContent =
      '<script type="text/javascript" src="https://unpkg.com/react@16/umd/react.development.js"></script>\n<script type="text/javascript" src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>';

    const valueData = {
      title: 'Fabric Example Pen',
      html: htmlContent,
      head: headContent,
      js: jsContent,
      js_pre_processor: 'typescript'
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
          className={css('ExampleCard-codeButton')}
        />
      </form>
    );
  }
}
