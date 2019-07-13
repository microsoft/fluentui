import * as React from 'react';
import { ActionButton, css, classNamesFunction, IButtonProps, IStyle } from 'office-ui-fabric-react';

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

export class ButtonActionExample extends React.Component<IButtonProps> {
  public render(): JSX.Element {
    const { disabled, checked } = this.props;

    return (
      <div className={css(classNames.example)}>
        <ActionButton
          data-automation-id="test"
          iconProps={{ iconName: 'AddFriend' }}
          allowDisabledFocus={true}
          disabled={disabled}
          checked={checked}
        >
          Create account
        </ActionButton>
      </div>
    );
  }
}
