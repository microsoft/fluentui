import * as React from 'react';
import { css, classNamesFunction, IconButton, IButtonProps, IStyle } from 'office-ui-fabric-react';

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

export class ButtonIconExample extends React.Component<IButtonProps> {
  public render(): JSX.Element {
    const { disabled, checked } = this.props;

    return (
      <div className={css(classNames.example)}>
        <IconButton disabled={disabled} checked={checked} iconProps={{ iconName: 'Emoji2' }} title="Emoji" ariaLabel="Emoji" />
        <p>
          For a list of Icons, visit our <a href="https://developer.microsoft.com/en-us/fabric#/styles/icons">Icon documentation</a>.
        </p>
      </div>
    );
  }
}
