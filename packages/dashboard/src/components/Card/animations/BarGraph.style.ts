import { keyframes } from 'office-ui-fabric-react/lib/Styling';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';

const barGraphLoadingAnimationBar1Keyframes = keyframes({
  '65.7%': {
    transform: 'translateY(-100%)'
  },
  '100%': {
    transform: 'translateY(-100%)'
  }
});

const barGraphLoadingAnimationBar2Keyframes = keyframes({
  '10%': {
    transform: 'translateY(125%)'
  },
  '68.5%': {
    transform: 'translateY(-100%)'
  },
  '100%': {
    transform: 'translateY(-100%)'
  }
});

const barGraphLoadingAnimationBar3Keyframes = keyframes({
  '5.7%': {
    transform: 'translateY(125%)'
  },
  '69.9%': {
    transform: 'translateY(-100%)'
  },
  '100%': {
    transform: 'translateY(-100%)'
  }
});

const barGraphLoadingAnimationBar4Keyframes = keyframes({
  '15.7%': {
    transform: 'translateY(125%)'
  },
  '79.9%': {
    transform: 'translateY(-100%)'
  },
  '100%': {
    transform: 'translateY(-100%)'
  }
});

const barGraphLoadingAnimationBar5Keyframes = keyframes({
  '11.4%': {
    transform: 'translateY(125%)'
  },
  '68.4%': {
    transform: 'translateY(-100%)'
  },
  '100%': {
    transform: 'translateY(-100%)'
  }
});

const barGraphLoadingAnimationBar6Keyframes = keyframes({
  '21.4%': {
    transform: 'translateY(125%)'
  },
  '78.4%': {
    transform: 'translateY(-100%)'
  },
  '100%': {
    transform: 'translateY(-100%)'
  }
});

const barGraphLoadingAnimationBar7Keyframes = keyframes({
  '17.1%': {
    transform: 'translateY(125%)'
  },
  '85.6%': {
    transform: 'translateY(-100%)'
  },
  '100%': {
    transform: 'translateY(-100%)'
  }
});

const barGraphLoadingAnimationBar8Keyframes = keyframes({
  '27.1%': {
    transform: 'translateY(125%)'
  },
  '95.6%': {
    transform: 'translateY(-100%)'
  },
  '100%': {
    transform: 'translateY(-100%)'
  }
});

export interface IBarGraphStyles {
  barGraphLoading: IStyle;
  barGraphLoadingBar: IStyle;
  barGraphLoadingBarFirst: IStyle;
  barGraphLoadingBarSecond: IStyle;
}

export const getStyles = (): IBarGraphStyles => {
  return {
    barGraphLoading: {
      height: '200px',
      width: '200px',
      display: 'flex',
      alignItems: 'flex-end',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      opacity: '0.6',
      marginLeft: '15%',
      marginTop: '10%',
      selectors: {
        ' > :nth-child(1)': {
          height: '50%'
        },
        ' > :nth-child(1) > :nth-child(1)': {
          animationName: barGraphLoadingAnimationBar1Keyframes
        },
        ' > :nth-child(1) > :nth-child(2)': {
          animationName: barGraphLoadingAnimationBar2Keyframes
        },
        ' > :nth-child(2)': {
          height: '70%'
        },
        ' > :nth-child(2) > :nth-child(1)': {
          animationName: barGraphLoadingAnimationBar3Keyframes
        },
        ' > :nth-child(2) > :nth-child(2)': {
          animationName: barGraphLoadingAnimationBar4Keyframes
        },
        ' > :nth-child(3)': {
          height: '30%'
        },
        ' > :nth-child(3) > :nth-child(1)': {
          animationName: barGraphLoadingAnimationBar5Keyframes
        },
        ' > :nth-child(3) > :nth-child(2)': {
          animationName: barGraphLoadingAnimationBar6Keyframes
        },
        ' > :nth-child(4)': {
          height: '50%'
        },
        ' > :nth-child(4) > :nth-child(1)': {
          animationName: barGraphLoadingAnimationBar7Keyframes
        },
        ' > :nth-child(4) > :nth-child(2)': {
          animationName: barGraphLoadingAnimationBar8Keyframes
        }
      }
    },
    barGraphLoadingBar: {
      background: '#c2c2c2',
      width: '15%',
      overflow: 'hidden',
      position: 'relative',
      flex: '0 1 auto'
    },
    barGraphLoadingBarFirst: {
      background: '#62b2ed',
      position: 'absolute',
      height: '80%',
      width: '100%',
      transform: 'translateY(125%)',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'cubic-bezier(0.61, 0, 0.57, 1)',
      animationDuration: '3.5s'
    },
    barGraphLoadingBarSecond: {
      background: '#0078d4',
      position: 'absolute',
      height: '80%',
      width: '100%',
      transform: 'translateY(125%)',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'cubic-bezier(0.61, 0, 0.57, 1)',
      animationDuration: '3.5s'
    }
  };
};
