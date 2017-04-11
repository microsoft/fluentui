import { keyframes, CSSProperties } from 'glamor';

const ease1: string = 'cubic-bezier(.1,.9,.2,1)';
const ease2: string = 'cubic-bezier(.1,.25,.75,.9)';
const duration1: string = '0.167s';
const duration2: string = '0.267s';
const duration3: string = '0.367s';
const duration4: string = '0.467s';

const fadeIn: string = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 }
});

const fadeOut: string = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 }
});

const slideRightIn10: string = _createSlideInX('-10px');
const slideRightIn20: string = _createSlideInX('-20px');
const slideRightIn40: string = _createSlideInX('-40px');
const slideRightIn400: string = _createSlideInX('-400px');
const slideLeftIn10: string = _createSlideInX('10px');
const slideLeftIn20: string = _createSlideInX('20px');
const slideLeftIn40: string = _createSlideInX('40px');
const slideLeftIn400: string = _createSlideInX('400px');
const slideUpIn10: string = _createSlideInY('10px');
const slideUpIn20: string = _createSlideInY('20px');
const slideDownIn10: string = _createSlideInY('-10px');
const slideDownIn20: string = _createSlideInY('-20px');

const slideRightOut10: string = _createSlideOutX('-10px');
const slideRightOut20: string = _createSlideOutX('-20px');
const slideRightOut40: string = _createSlideOutX('-40px');
const slideRightOut400: string = _createSlideOutX('-400px');
const slideLeftOut10: string = _createSlideOutX('10px');
const slideLeftOut20: string = _createSlideOutX('20px');
const slideLeftOut40: string = _createSlideOutX('40px');
const slideLeftOut400: string = _createSlideOutX('400px');
const slideUpOut10: string = _createSlideOutY('10px');
const slideUpOut20: string = _createSlideOutY('20px');
const slideDownOut10: string = _createSlideOutY('-10px');
const slideDownOut20: string = _createSlideOutY('-20px');

const scaleUp100: string = keyframes({
  from: { transform: 'scale3d(.98,.98,1)' },
  to: { transform: 'scale3d(1,1,1)' }
});

const scaleDown98: string = keyframes({
  from: { transform: 'scale3d(1,1,1)' },
  'top': { transform: 'scale3d(.98,.98,1)' },
});

const scaleDown100: string = keyframes({
  from: { transform: 'scale3d(1.03,1.03,1)' },
  to: { transform: 'scale3d(1,1,1)' }
});

const scaleUp103: string = keyframes({
  from: { transform: 'scale3d(1,1,1)' },
  to: { transform: 'scale3d(1.03,1.03,1)' }
});

const rotate90: string = keyframes({
  from: { transform: 'rotateZ(0deg)' },
  to: { transform: 'rotateZ(90deg)' }
});

const rotateN90: string = keyframes({
  from: { transform: 'rotateZ(90deg)' },
  to: { transform: 'rotateZ(0deg)' }
});

export const animations = {
  slideRightIn10: _createAnimation(`${fadeIn},${slideRightIn10}`, duration3, ease1),
  slideRightIn20: _createAnimation(`${fadeIn},${slideRightIn20}`, duration3, ease1),
  slideRightIn40: _createAnimation(`${fadeIn},${slideRightIn40}`, duration3, ease1),
  slideRightIn400: _createAnimation(`${fadeIn},${slideRightIn400}`, duration3, ease1),
  slideLeftIn10: _createAnimation(`${fadeIn},${slideLeftIn10}`, duration3, ease1),
  slideLeftIn20: _createAnimation(`${fadeIn},${slideLeftIn20}`, duration3, ease1),
  slideLeftIn40: _createAnimation(`${fadeIn},${slideLeftIn40}`, duration3, ease1),
  slideLeftIn400: _createAnimation(`${fadeIn},${slideLeftIn400}`, duration3, ease1),
  slideUpIn10: _createAnimation(`${fadeIn},${slideUpIn10}`, duration3, ease1),
  slideUpIn20: _createAnimation(`${fadeIn},${slideUpIn20}`, duration3, ease1),
  slideDownIn10: _createAnimation(`${fadeIn},${slideDownIn10}`, duration3, ease1),
  slideDownIn20: _createAnimation(`${fadeIn},${slideDownIn20}`, duration3, ease1),

  slideRightOut10: _createAnimation(`${fadeIn},${slideRightOut10}`, duration3, ease1),
  slideRightOut20: _createAnimation(`${fadeIn},${slideRightOut20}`, duration3, ease1),
  slideRightOut40: _createAnimation(`${fadeIn},${slideRightOut40}`, duration3, ease1),
  slideRightOut400: _createAnimation(`${fadeIn},${slideRightOut400}`, duration3, ease1),
  slideLeftOut10: _createAnimation(`${fadeIn},${slideLeftOut10}`, duration3, ease1),
  slideLeftOut20: _createAnimation(`${fadeIn},${slideLeftOut20}`, duration3, ease1),
  slideLeftOut40: _createAnimation(`${fadeIn},${slideLeftOut40}`, duration3, ease1),
  slideLeftOut400: _createAnimation(`${fadeIn},${slideLeftOut400}`, duration3, ease1),
  slideUpOut10: _createAnimation(`${fadeIn},${slideUpOut10}`, duration3, ease1),
  slideUpOut20: _createAnimation(`${fadeIn},${slideUpOut20}`, duration3, ease1),
  slideDownOut10: _createAnimation(`${fadeIn},${slideDownOut10}`, duration3, ease1),
  slideDownOut20: _createAnimation(`${fadeIn},${slideDownOut20}`, duration3, ease1),

  scaleUpIn100: _createAnimation(`${fadeIn},${scaleUp100}`, duration3, ease1),
  scaleDownIn100: _createAnimation(`${fadeIn},${scaleDown100}`, duration3, ease1),

  scaleUpOut103: _createAnimation(`${fadeOut},${scaleUp103}`, duration1, ease2),
  scaleDownOut98: _createAnimation(`${fadeOut},${scaleDown98}`, duration1, ease2),

  fadeIn100: _createAnimation(fadeIn, duration1, ease2),
  fadeIn200: _createAnimation(fadeIn, duration2, ease2),
  fadeIn400: _createAnimation(fadeIn, duration3, ease2),
  fadeIn500: _createAnimation(fadeIn, duration4, ease2),

  /**
   * Useful for fading out in 100ms.
   */
  fadeOut100: _createAnimation(fadeOut, duration1, ease2),
  fadeOut200: _createAnimation(fadeOut, duration2, ease2),
  fadeOut400: _createAnimation(fadeOut, duration3, ease2),
  fadeOut500: _createAnimation(fadeOut, duration4, ease2),

  rotate90deg: _createAnimation(rotate90, '0.1s', ease2),
  rotateN90deg: _createAnimation(rotateN90, '0.1s', ease2)

  // expandCollapse 100/200/400, delay 100/200
};

function _createAnimation(
  animationName: string,
  animationDuration: string,
  animationTimingFunction: string
): CSSProperties {
  return {
    animationName,
    animationDuration,
    animationTimingFunction,
    animationFillMode: 'both'
  };
}

function _createSlideInX(fromX: string): string {
  return keyframes({
    from: { transform: `translate3d(${fromX},0,0)` },
    to: { transform: `translate3d(0,0,0)` }
  });
}

function _createSlideInY(fromY: string): string {
  return keyframes({
    from: { transform: `translate3d(0,${fromY},0)` },
    to: { transform: `translate3d(0,0,0)` }
  });
}

function _createSlideOutX(toX: string): string {
  return keyframes({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(${toX},0,0)` }
  });
}

function _createSlideOutY(toY: string): string {
  return keyframes({
    to: { transform: `translate3d(0,0,0)` },
    from: { transform: `translate3d(0,${toY},0)` }
  });
}