import * as React from 'react';
import { IWizardProps, IWizardStyles, IWizardStyleProps } from './Wizard.types';
import { SubwayNav } from '../SubwayNav/SubwayNav';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getStepToShow } from './Wizard.utils';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { wizardAnimationDurationMilliSec } from './Wizard.styles';

const getClassNames = classNamesFunction<IWizardStyleProps, IWizardStyles>();

export interface IWizardState {
  currentIndexShowing: number;
}

/** Component for Wizard Base */
export class WizardBase extends React.Component<IWizardProps, IWizardState> {
  constructor(props: IWizardProps) {
    super(props);

    this.state = {
      currentIndexShowing: 0
    };
  }

  // If currentIndexShowing state is being updated, then we should not render the component.
  // Because, we are sure that other props are not changed if currentIndexShowing is different,
  // as it is done only from componentDidUpdate method
  // tslint:disable-next-line: no-any
  public shouldComponentUpdate(nextProps: IWizardProps, nextState: IWizardState, nextContext: any): boolean {
    // currentIndexShowing will change only post render of new step, so, we dont need to re-render if this is changed
    if (this.state.currentIndexShowing !== nextState.currentIndexShowing) {
      return false;
    }
    return true;
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

    let mainStepTransitionClass = {
      enter: classNames.stepSlideUpEnter,
      enterActive: classNames.stepSlideUpEnterActive,
      exit: classNames.stepSlideUpExit,
      exitActive: classNames.stepSlideUpExitActive,
      exitDone: classNames.stepSlideUpExitDone
    };

    if (!wizardStyleProps.clickedForward) {
      mainStepTransitionClass = {
        enter: classNames.stepSlideDownEnter,
        enterActive: classNames.stepSlideDownEnterActive,
        exit: classNames.stepSlideDownExit,
        exitActive: classNames.stepSlideDownExitActive,
        exitDone: classNames.stepSlideDownExitDone
      };
    }

    return (
      <div className={classNames.wizardContentNavContainer}>
        <div className={classNames.subwayNavSection}>
          <SubwayNav steps={steps} wizardComplete={this.props.wizardComplete} />
        </div>
        <div className={classNames.contentAnimSection}>
          <TransitionGroup>
            <CSSTransition
              key={contentAnimKey}
              className={classNames.contentSection}
              classNames={mainStepTransitionClass}
              timeout={wizardAnimationDurationMilliSec}
            >
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
      </div>
    );
  }
}
