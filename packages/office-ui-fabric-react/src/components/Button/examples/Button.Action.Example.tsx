import * as React from 'react';
import { css, classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getStyles, IButtonBasicExampleStyleProps, IButtonBasicExampleStyles } from './Button.Basic.Example.styles';
import { ActionButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

const getClassNames = classNamesFunction<IButtonBasicExampleStyleProps, IButtonBasicExampleStyles>();

export class ButtonActionExample extends React.Component<IButtonProps> {
  public render(): JSX.Element {
    const { disabled, checked } = this.props;
    const classNames = getClassNames(getStyles, {});

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
