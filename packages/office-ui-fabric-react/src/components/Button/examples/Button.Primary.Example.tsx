import * as React from 'react';
import { css, classNamesFunction, IButtonProps, IStyle, PrimaryButton } from 'office-ui-fabric-react';

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

export class ButtonPrimaryExample extends React.Component<IButtonProps> {
  public render(): JSX.Element {
    const { disabled, checked } = this.props;

    return (
      <div className={css(classNames.example)}>
        <PrimaryButton
          data-automation-id="test"
          disabled={disabled}
          checked={checked}
          text="Create account"
          // tslint:disable-next-line:jsx-no-lambda
          onClick={() => alert('Clicked')}
        />
      </div>
    );
  }
}
