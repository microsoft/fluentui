import * as React from 'react';
import { css, classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getStyles, IButtonBasicExampleStyleProps, IButtonBasicExampleStyles } from './Button.Basic.Example.styles';
import { CompoundButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class ButtonCompoundExample extends React.Component<IButtonProps> {
  public constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    const { disabled, checked } = this.props;

    const getClassNames = classNamesFunction<IButtonBasicExampleStyleProps, IButtonBasicExampleStyles>();
    const classNames = getClassNames(getStyles, {});

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
