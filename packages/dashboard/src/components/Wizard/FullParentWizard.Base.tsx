import { IFullParentWizardProps, IFullParentWizardStyleProps, IFullParentWizardStyles } from './FullParentWizard.types';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';
import { Wizard } from './Wizard';
import { getStepToShow } from './Wizard.utils';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { wizardStyleOverride } from './FullParentWizard.styles';

const getClassNames = classNamesFunction<IFullParentWizardStyleProps, IFullParentWizardStyles>();

export class FullParentWizardBase extends React.Component<IFullParentWizardProps, {}> {
  public render(): JSX.Element {
    const classNames = getClassNames(this.props.styles, { theme: this.props.theme! });
    const step = getStepToShow(this.props.wizardProps);

    const wizardStyle = mergeStyleSets(wizardStyleOverride(this.props.theme!), this.props.wizardProps.styles);

    return (
      <div className={classNames.parentContainer}>
        <div className={classNames.headerContainer}>{step.titleElement}</div>
        <Wizard {...this.props.wizardProps} stepToShow={step} styles={wizardStyle} />
        <div className={classNames.footerContainer}>{step.footerElement}</div>
      </div>
    );
  }
}
