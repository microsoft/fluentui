import * as React from 'react';
import { IWizardProps, IWizardStyles, IWizardStyleProps, IWizardStepProps } from './Wizard.types';
import { SubwayNav } from '../SubwayNav/SubwayNav';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getStepToShow } from './Wizard.utils';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';

const getClassNames = classNamesFunction<IWizardStyleProps, IWizardStyles>();

/** Component for Wizard Base */
export class WizardBase extends React.Component<IWizardProps, {}> {
  constructor(props: IWizardProps) {
    super(props);
  }

  public render(): React.ReactNode {
    const { steps } = this.props;

    if (steps.length === 0) {
      throw new Error('Wizard must have atleast one step.');
    }

    // if the step to render is already passed in, use that
    const wizardStepProps = this.props.stepToShow ? this.props.stepToShow : getStepToShow(this.props);

    const classNames = getClassNames(this.props.styles!, {
      theme: this.props.theme!,
      isSubStep: wizardStepProps.isSubStep!,
      isFirstSubStep: wizardStepProps.isFirstSubStep!
    });

    return (
      <div className={classNames.wizardContentNavContainer}>
        <div className={classNames.subwayNavSection}>
          <SubwayNav steps={steps} wizardComplete={this.props.wizardComplete} />
        </div>
        {this._onRenderContentSection(wizardStepProps, classNames)}
      </div>
    );
  }

  private _onRenderContentSection = (wizardStep: IWizardStepProps, styleClassNames: IProcessedStyleSet<IWizardStyles>): React.ReactNode => {
    return (
      <div className={styleClassNames.contentSection}>
        {this._onRenderContentTitle(wizardStep, styleClassNames)}
        {this._onRenderContent(wizardStep, styleClassNames)}
      </div>
    );
  };

  private _onRenderContentTitle = (wizardStep: IWizardStepProps, styleClassNames: IProcessedStyleSet<IWizardStyles>): React.ReactNode => {
    if (wizardStep.wizardContent!.contentTitleElement) {
      return <div className={styleClassNames.contentTitle}>{wizardStep.wizardContent!.contentTitleElement}</div>;
    }
  };

  private _onRenderContent = (wizardStep: IWizardStepProps, styleClassNames: IProcessedStyleSet<IWizardStyles>): React.ReactNode => {
    return <div className={styleClassNames.content}>{wizardStep.wizardContent!.content}</div>;
  };
}
