import * as React from 'react';
import { css, classNamesFunction, CompoundButton, IButtonProps, IStyle, Label } from 'office-ui-fabric-react';

type IButtonBasicExampleStyleProps = {};

interface IButtonBasicExampleStyles {
  example?: IStyle;
  twoup?: IStyle;
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
  ],
  twoup: [
    'ms-BasicButtonsTwoUp',
    {
      display: 'flex',
      selectors: {
        '& > *': {
          flexGrow: 1
        },
        '.ms-Label': {
          marginBottom: '10px'
        }
      }
    }
  ]
};

const getClassNames = classNamesFunction<IButtonBasicExampleStyleProps, IButtonBasicExampleStyles>();
const classNames = getClassNames(exampleStyles, {});

export class ButtonCompoundExample extends React.Component<IButtonProps> {
  public render(): JSX.Element {
    const { disabled, checked } = this.props;

    return (
      <div className={css(classNames.example, classNames.twoup)}>
        <div>
          <Label>Standard</Label>
          <CompoundButton secondaryText="You can create a new account here." disabled={disabled} checked={checked}>
            Create account
          </CompoundButton>
        </div>
        <div>
          <Label>Primary</Label>
          <CompoundButton primary={true} secondaryText="You can create a new account here." disabled={disabled} checked={checked}>
            Create account
          </CompoundButton>
        </div>
      </div>
    );
  }
}
