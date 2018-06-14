import * as React from 'react';
import { CompoundButton } from 'office-ui-fabric-react/lib/Button';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { ICompoundButtonStackProps, ICompoundButtonStackStyles, ICompoundAction } from './CompoundButtonStack.types';
import { getStyles } from './CompoundButtonStack.styles';
import { getCustomCompoundButtonStyles } from './CompoundButton.styles';

export class CompoundButtonStack extends React.Component<ICompoundButtonStackProps, {}> {
  render(): JSX.Element {
    const getClassNames = classNamesFunction<ICompoundButtonStackProps, ICompoundButtonStackStyles>();
    const classNames = getClassNames(getStyles!);
    const customStyles = getCustomCompoundButtonStyles();

    const renderCompoundButtons = () => {
      return this.props.actions.map((action: ICompoundAction, index) => {
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
