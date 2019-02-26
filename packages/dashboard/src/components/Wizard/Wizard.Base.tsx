import * as React from 'react';
import { IWizardProps, IWizardStyles, IWizardStyleProps, IWizardContentProps } from './Wizard.types';
import { SubwayNav } from '../SubwayNav/SubwayNav';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getStepToShow } from './Wizard.utils';

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

    const classNames = getClassNames(this.props.styles!, { theme: this.props.theme! });

    // if the step to render is already passed in, use that
    const wizardStepProps = this.props.stepToShow ? this.props.stepToShow : getStepToShow(this.props);

    return (
      <div className={classNames.wizardContentNavContainer}>
        <div className={classNames.subwayNavSection}>
          <SubwayNav steps={steps} wizardComplete={this.props.wizardComplete} />
        </div>
        <div className={classNames.contentSection}>
          {this._onRenderContentTitle(wizardStepProps.wizardContent)}
          {this._onRenderContent(wizardStepProps.wizardContent)}
        </div>
      </div>
    );
  }

  private _onRenderContentTitle = (wizardContent: IWizardContentProps | undefined): React.ReactNode => {
    const classNames = getClassNames(this.props.styles!, { theme: this.props.theme! });

    return <div className={classNames.contentTitle}>{wizardContent!.contentTitleElement}</div>;
  };

  private _onRenderContent = (wizardContent: IWizardContentProps | undefined): React.ReactNode => {
    const classNames = getClassNames(this.props.styles!, { theme: this.props.theme! });

    return <div className={classNames.content}>{wizardContent!.content}</div>;
  };
}
