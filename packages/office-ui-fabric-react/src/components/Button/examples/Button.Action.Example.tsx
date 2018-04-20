import * as React from 'react';
import { css, classNamesFunction } from '../../../Utilities';
import {
  getStyles,
  IButtonBasicExampleStyleProps,
  IButtonBasicExampleStyles
} from './Button.Basic.Example.styles';
import {
  ActionButton,
  IButtonProps
} from 'office-ui-fabric-react/lib/Button';

export class ButtonActionExample extends React.Component<IButtonProps> {
  public constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    const { disabled, checked } = this.props;

    const getClassNames = classNamesFunction<IButtonBasicExampleStyleProps, IButtonBasicExampleStyles>();
    const classNames = getClassNames(getStyles);

    return (
      <div className={ css(classNames.example) }>
        <ActionButton
          data-automation-id='test'
          iconProps={ { iconName: 'AddFriend' } }
          disabled={ disabled }
          checked={ checked }
        >
          Create account
        </ActionButton>
      </div>
    );
  }
}
