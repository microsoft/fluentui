import * as React from 'react';
import { css, classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getStyles, IButtonBasicExampleStyleProps, IButtonBasicExampleStyles } from './Button.Basic.Example.styles';
import { PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export class ButtonScreenReaderExample extends React.Component<IButtonProps, {}> {
  public render(): JSX.Element {
    const { disabled, checked } = this.props;

    const getClassNames = classNamesFunction<IButtonBasicExampleStyleProps, IButtonBasicExampleStyles>();
    const classNames = getClassNames(getStyles, {});

    return (
      <div className={css(classNames.example)}>
        <PrimaryButton
          data-automation-id="test"
          disabled={disabled}
          checked={checked}
          ariaDescription="This is aria description used for screen reader."
        >
          Aria Description
        </PrimaryButton>
      </div>
    );
  }
}
