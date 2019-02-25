import * as React from 'react';
import { IWizardProps, IWizardStyles, IWizardStyleProps, IWizardContentProps } from './Wizard.types';
import { SubwayNav } from '../SubwayNav/SubwayNav';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getStepContentToShow } from './Wizard.utils';

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
    const wizardContentProps = this.props.contentToShow ? this.props.contentToShow : getStepContentToShow(this.props);

    return (
      <div className={classNames.wizardContentNavContainer}>
        <div className={classNames.subwayNavSection}>
          <SubwayNav steps={steps} wizardComplete={this.props.wizardComplete} />
        </div>
        <div className={classNames.contentSection}>
          {this._onRenderContentTitle(wizardContentProps)}
          <div className={classNames.content}>{wizardContentProps!.content}</div>
        </div>
      </div>
    );
  }

  private _onRenderContentTitle = (wizardContent: IWizardContentProps): React.ReactNode => {
    const classNames = getClassNames(this.props.styles!, { theme: this.props.theme! });

    return <div className={classNames.contentTitle}>{wizardContent.contentTitleElement!}</div>;
  };
}
