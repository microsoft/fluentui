import { IFullParentWizardProps, IFullParentWizardStyleProps, IFullParentWizardStyles } from './FullParentWizard.types';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';
import { Wizard } from './Wizard';
import { getStepContentToShow } from './Wizard.utils';

const getClassNames = classNamesFunction<IFullParentWizardStyleProps, IFullParentWizardStyles>();

export class FullParentWizardBase extends React.Component<IFullParentWizardProps, {}> {
  public render(): JSX.Element {
    const classNames = getClassNames(this.props.styles, { theme: this.props.theme! });
    const step = getStepContentToShow(this.props);

    return (
      <div className={classNames.parentContainer}>
        <div className={classNames.headerContainer}>{step.titleElement}</div>
        <Wizard {...this.props} />
        <div className={classNames.footerContainer}>{step.footerElement}</div>
      </div>
    );
  }
}
