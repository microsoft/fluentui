import * as React from 'react';
import { css, classNamesFunction } from '../../../Utilities';
import {
  getStyles,
  IButtonBasicExampleStyleProps,
  IButtonBasicExampleStyles
} from './Button.Basic.Example.styles';
import { PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export class ButtonPrimaryExample extends React.Component<IButtonProps> {
  public render() {
    const { disabled, checked } = this.props;

    const getClassNames = classNamesFunction<IButtonBasicExampleStyleProps, IButtonBasicExampleStyles>();
    const classNames = getClassNames(getStyles);

    return (
      <div className={ css(classNames.example) }>
        <PrimaryButton
          data-automation-id='test'
          disabled={ disabled }
          checked={ checked }
          text='Create account'
          // tslint:disable-next-line:jsx-no-lambda
          onClick={ () => alert('Clicked') }
        />
      </div>
    );
  }
}
