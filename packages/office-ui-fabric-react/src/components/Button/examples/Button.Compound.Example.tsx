import * as React from 'react';
import { css, classNamesFunction } from '../../../Utilities';
import {
  getStyles,
  IButtonBasicExampleStyleProps,
  IButtonBasicExampleStyles
} from './Button.Basic.Example.styles';
import {
  CompoundButton,
  IButtonProps
} from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class ButtonCompoundExample extends React.Component<IButtonProps> {
  public constructor(props: {}) {
    super(props);
  }

  public render() {
    const { disabled, checked } = this.props;

    const getClassNames = classNamesFunction<IButtonBasicExampleStyleProps, IButtonBasicExampleStyles>();
    const classNames = getClassNames(getStyles);

    return (
      <div className={ css(classNames.example, classNames.twoup) }>
        <div>
          <Label>Standard</Label>
          <CompoundButton
            description='You can create a new account here.'
            disabled={ disabled }
            checked={ checked }
          >
            Create account
          </CompoundButton>
        </div>
        <div>
          <Label>Primary</Label>
          <CompoundButton
            primary={ true }
            description='You can create a new account here.'
            disabled={ disabled }
            checked={ checked }
          >
            Create account
          </CompoundButton>
        </div>
      </div>
    );
  }
}