import * as React from 'react';
import { IWizardProps, IWizardStyles, IWizardStyleProps } from './Wizard.types';
import { SubwayNav } from '../SubwayNav/SubwayNav';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getStepToShow } from './Wizard.utils';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './WizardCss.scss';

const getClassNames = classNamesFunction<IWizardStyleProps, IWizardStyles>();

export interface IWizardBaseState {
  currentIndexShowing: number;
}

/** Component for Wizard Base */
export class WizardBase extends React.Component<IWizardProps, IWizardBaseState> {
  constructor(props: IWizardProps) {
    super(props);

    this.state = {
      currentIndexShowing: 0
    };
  }

  // If currentIndexShowing state is being updated, then we should not render the component
  public shouldComponentUpdate(): boolean {
    let ret = true;
    const wizardStepProps = this.props.stepToShow ? this.props.stepToShow : getStepToShow(this.props);
    if (this.state.currentIndexShowing !== wizardStepProps.index!) {
      ret = false;
    }
    return ret;
  }

  // If update state currentIndexShowing to the new step, after component is rendered
  public componentDidUpdate(): void {
    console.log('componentDidUpdate');
    const wizardStepProps = this.props.stepToShow ? this.props.stepToShow : getStepToShow(this.props);
    if (this.state.currentIndexShowing !== wizardStepProps.index!) {
      this.setState({ currentIndexShowing: wizardStepProps.index! });
    }
  }

  public render(): React.ReactNode {
    const { steps } = this.props;

    if (steps.length === 0) {
      throw new Error('Wizard must have atleast one step.');
    }

    // if the step to render is already passed in, use that
    const wizardStepProps = this.props.stepToShow ? this.props.stepToShow : getStepToShow(this.props);

    const wizardStyleProps = {
      theme: this.props.theme!,
      isSubStep: wizardStepProps.isSubStep!,
      isFirstSubStep: wizardStepProps.isFirstSubStep!,
      clickedForward: this.state.currentIndexShowing <= wizardStepProps.index! ? true : false
    };

    const classNames = getClassNames(this.props.styles!, wizardStyleProps);

    const contentAnimKey = 'contentSectionAnim-' + wizardStepProps.id;
    const contentSectionKey = 'contentSection-' + wizardStepProps.id;
    const contentTitleKey = 'contentTitle-' + wizardStepProps.id;
    const contentKey = 'content-' + wizardStepProps.id;

    let mainStepTransitionClass = 'stepSlideUp';
    if (!wizardStyleProps.clickedForward) {
      mainStepTransitionClass = 'stepSlideDown';
    }

    return (
      <div className={classNames.wizardContentNavContainer}>
        <div className={classNames.subwayNavSection}>
          <SubwayNav steps={steps} wizardComplete={this.props.wizardComplete} />
        </div>
        <TransitionGroup className={classNames.contentSection}>
          <CSSTransition key={contentAnimKey} classNames={mainStepTransitionClass} timeout={500}>
            <div key={contentSectionKey}>
              <div key={contentTitleKey} className={classNames.contentTitle}>
                {wizardStepProps.wizardContent!.contentTitleElement}
              </div>
              <div key={contentKey} className={classNames.content}>
                {wizardStepProps.wizardContent!.content}
              </div>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}
