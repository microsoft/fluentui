import * as React from 'react';
import { css, classNamesFunction, DefaultButton, IButtonProps, IStyle } from 'office-ui-fabric-react';

type IButtonBasicExampleStyleProps = {};

interface IButtonBasicExampleStyles {
  example?: IStyle;
}

const exampleStyles: IButtonBasicExampleStyles = {
  example: [
    'ms-BasicButtonsExample',
    {
      selectors: {
        '.ms-Button': {
          margin: '10px 0'
        }
      }
    }
  ]
};

const getClassNames = classNamesFunction<IButtonBasicExampleStyleProps, IButtonBasicExampleStyles>();
const classNames = getClassNames(exampleStyles, {});

export class ButtonAnchorExample extends React.Component<IButtonProps> {
  public render(): JSX.Element {
    const { disabled, checked } = this.props;

    return (
      <div className={css(classNames.example)}>
        <DefaultButton
          data-automation-id="test"
          disabled={disabled}
          checked={checked}
          href="http://bing.com"
          target="_blank"
          title="let us bing!"
        >
          Bing
        </DefaultButton>
      </div>
    );
  }
}
