import * as React from 'react';
import { IWizardProps, IWizardStyles, IWizardStyleProps } from './Wizard.types';
import { SubwayNav } from '../SubwayNav/SubwayNav';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getStepToShow } from './Wizard.utils';
import { TransitionGroup, Transition, TransitionStatus } from 'react-transition-group';
import { wizardAnimationDurationMilliSec } from './Wizard.animation';

const getClassNames = classNamesFunction<IWizardStyleProps, IWizardStyles>();

/** Component for Wizard Base */
export class WizardBase extends React.PureComponent<IWizardProps, {}> {
  private lastStepIndexShown: number;

  constructor(props: IWizardProps) {
    super(props);

    const wizardStepProps = this.props.stepToShow ? this.props.stepToShow : getStepToShow(this.props);
    this.lastStepIndexShown = wizardStepProps.index!;
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
      clickedForward: this.lastStepIndexShown <= wizardStepProps.index! ? true : false
    };

    // Update the step index showing
    this.lastStepIndexShown = wizardStepProps.index!;

    const classNames = getClassNames(this.props.styles!, wizardStyleProps);

    const contentAnimKey = 'contentSectionAnim-' + wizardStepProps.id;
    const contentSectionKey = 'contentSection-' + wizardStepProps.id;
    const contentTitleKey = 'contentTitle-' + wizardStepProps.id;
    const contentKey = 'content-' + wizardStepProps.id;
    let animationToApply: string;
    return (
      <div className={classNames.wizardContentNavContainer}>
        <div className={classNames.subwayNavSection}>
          <SubwayNav steps={steps} wizardComplete={this.props.wizardComplete} />
        </div>
        <div className={classNames.contentSectionContainer}>
          <TransitionGroup component={null}>
            <Transition timeout={wizardAnimationDurationMilliSec} key={contentAnimKey}>
              {(state: TransitionStatus) => {
                let hideScroll;
                if (state === 'entering' || state === 'exiting') {
                  animationToApply = state === 'entering' ? classNames.stepSlideUpEnterActive : classNames.stepSlideUpExitActive;
                  hideScroll = true;
                } else if (state === 'exited') {
                  hideScroll = false;
                }
                return (
                  <div
                    key={contentSectionKey}
                    className={classNames.contentSection + ` ${animationToApply}`}
                    {...hideScroll && { style: { overflow: 'hidden' } }}
                  >
                    <div key={contentTitleKey} className={classNames.contentTitle}>
                      {wizardStepProps.wizardContent!.contentTitleElement}
                    </div>
                    <div key={contentKey} className={classNames.content}>
                      {wizardStepProps.wizardContent!.content}
                    </div>
                  </div>
                );
              }}
            </Transition>
          </TransitionGroup>
        </div>
      </div>
    );
  }
}
