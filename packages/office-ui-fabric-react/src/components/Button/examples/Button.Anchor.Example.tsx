import * as React from 'react';
import { css, classNamesFunction } from '../../../Utilities';
import {
  getStyles,
  IButtonBasicExampleStyleProps,
  IButtonBasicExampleStyles
} from './Button.Basic.Example.styles';
import {
  IButtonProps,
  DefaultButton
} from 'office-ui-fabric-react/lib/Button';

export class ButtonAnchorExample extends React.Component<IButtonProps> {
  public render() {
    const { disabled, checked } = this.props;

    const getClassNames = classNamesFunction<IButtonBasicExampleStyleProps, IButtonBasicExampleStyles>();
    const classNames = getClassNames(getStyles);

    return (
      <div className={ css(classNames.example) }>
        <DefaultButton
          data-automation-id='test'
          disabled={ disabled }
          checked={ checked }
          href='http://bing.com'
          target='_blank'
          title='let us bing!'
        >
          Bing
        </DefaultButton>
      </div >
    );
  }
}
