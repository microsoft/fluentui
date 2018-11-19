import * as React from 'react';
import { CompoundButton } from 'office-ui-fabric-react/lib/Button';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { ICompoundButtonStackProps, ICompoundButtonStackStyles, ICompoundAction, ButtonSize } from './CompoundButtonStack.types';
import { getStyles } from './CompoundButtonStack.styles';
import { getCustomCompoundButtonStyles } from './CompoundButton.styles';

export class CompoundButtonStack extends React.Component<ICompoundButtonStackProps, {}> {
  public static defaultProps = {
    buttonSize: ButtonSize.normal
  };

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<ICompoundButtonStackProps, ICompoundButtonStackStyles>();
    const classNames = getClassNames(getStyles!);
    const { buttonSize } = this.props;
    const customStyles = getCustomCompoundButtonStyles(buttonSize);

    const renderCompoundButtons = () => {
      return this.props.actions.map((action: ICompoundAction, index: number) => {
        if (buttonSize === ButtonSize.small) {
          action.description = '';
        }
        return (
          <CompoundButton
            key={index}
            secondaryText={action.description}
            primary={action.primary}
            ariaLabel={action.title}
            text={action.title}
            onClick={action.action}
            styles={customStyles}
          />
        );
      });
    };
    return <div className={classNames.root}>{renderCompoundButtons()}</div>;
  }
}
