import { DefaultFontStyles, keyframes } from 'office-ui-fabric-react';

import { ISubwayNavStyles, ISubwayNavStyleProps } from './SubwayNav.types';
import { ISubwayNavNodeProps, SubwayNavNodeState } from './SubwayNode.types';
import { subwayColors } from './SubwayNode.styles';

const itemSpacing = 36;
const lineMargin = 4;
const emOffset = 1.22;

const lineFadeIn = keyframes({
  from: {
    opacity: '0.0'
  },
  to: {
    opacity: '1.0'
  }
});

export const getSubwayNavStyles = (props: ISubwayNavStyleProps): ISubwayNavStyles => {
  const { steps, wizardComplete } = props;
  let stepIndex = 0;
  let subStepIndex = 0;
  let adjustProgressTrack = false;
  function getSelectedStep(nodeSteps: ISubwayNavNodeProps[], isSubSteps: boolean): void {
    nodeSteps.some((step: ISubwayNavNodeProps, index: number, array: ISubwayNavNodeProps[]) => {
      if (step.state === SubwayNavNodeState.Current || step.state === SubwayNavNodeState.CurrentWithSubSteps) {
        isSubSteps ? (subStepIndex = index + 1) : (stepIndex = index);
        if (step.subSteps) {
          adjustProgressTrack = stepIndex === array.length - 1;
          getSelectedStep(step.subSteps, true);
        }
        return true;
      } else {
        return false;
      }
    });
  }

  getSelectedStep(steps, false);
  const currentLineHeight = stepIndex * 60 + subStepIndex * 43;
  const trackLineAdjustment = adjustProgressTrack ? 3 : 0;
  return {
    root: [
      DefaultFontStyles.medium,
      {
        margin: 0,
        padding: 0,
        position: 'relative',
        zIndex: 0,
        selectors: {
          ':before': {
            content: '""',
            width: '2px',
            height: `calc(100% - ${emOffset * 2}em - ${lineMargin * 2}px + ${trackLineAdjustment}px)`,
            backgroundColor: wizardComplete ? subwayColors.completedWizard : subwayColors.notStarted,
            position: 'absolute',
            top: `calc(${emOffset}em + ${lineMargin}px)`,
            left: '7px',
            zIndex: -2,
            animationName: lineFadeIn,
            animationDuration: '2s'
          },
          ':after': [
            {
              content: "''",
              width: '2px',
              height: `calc(${currentLineHeight}px - ${emOffset}em + ${lineMargin}px)`,
              backgroundColor: subwayColors.current,
              position: 'absolute',
              top: `calc(${emOffset}em + ${lineMargin}px)`,
              left: '7px',
              zIndex: -1,
              animationName: lineFadeIn,
              animationDuration: '2s'
            },
            wizardComplete && {
              display: 'none'
            }
          ],
          "*[dir='rtl'] &:before, *[dir='rtl'] &:after": {
            right: '7px'
          },
          '& > :nth-child(n)': {
            marginBottom: `${itemSpacing}px`
          },
          '& > :last-child': {
            marginBottom: '0px'
          }
        }
      }
    ]
  };
};
