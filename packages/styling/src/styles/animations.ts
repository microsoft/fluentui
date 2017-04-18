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

const slideRightIn10: string = _createSlideInX(-10);
const slideRightIn20: string = _createSlideInX(-20);
const slideRightIn40: string = _createSlideInX(-40);
const slideRightIn400: string = _createSlideInX(-400);
const slideLeftIn10: string = _createSlideInX(10);
const slideLeftIn20: string = _createSlideInX(20);
const slideLeftIn40: string = _createSlideInX(40);
const slideLeftIn400: string = _createSlideInX(400);
const slideUpIn10: string = _createSlideInY(10);
const slideUpIn20: string = _createSlideInY(20);
const slideDownIn10: string = _createSlideInY(-10);
const slideDownIn20: string = _createSlideInY(-20);

const slideRightOut10: string = _createSlideOutX(10);
const slideRightOut20: string = _createSlideOutX(20);
const slideRightOut40: string = _createSlideOutX(40);
const slideRightOut400: string = _createSlideOutX(400);
const slideLeftOut10: string = _createSlideOutX(-10);
const slideLeftOut20: string = _createSlideOutX(-20);
const slideLeftOut40: string = _createSlideOutX(-40);
const slideLeftOut400: string = _createSlideOutX(-400);
const slideUpOut10: string = _createSlideOutY(-10);
const slideUpOut20: string = _createSlideOutY(-20);
const slideDownOut10: string = _createSlideOutY(10);
const slideDownOut20: string = _createSlideOutY(20);

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
  from: { transform: 'rotateZ(0deg)' },
  to: { transform: 'rotateZ(-90deg)' }
});

export interface IAnimations {
  slideRightIn10: CSSProperties;
  slideRightIn20: CSSProperties;
  slideRightIn40: CSSProperties;
  slideRightIn400: CSSProperties;
  slideLeftIn10: CSSProperties;
  slideLeftIn20: CSSProperties;
  slideLeftIn40: CSSProperties;
  slideLeftIn400: CSSProperties;
  slideUpIn10: CSSProperties;
  slideUpIn20: CSSProperties;
  slideDownIn10: CSSProperties;
  slideDownIn20: CSSProperties;
  slideRightOut10: CSSProperties;
  slideRightOut20: CSSProperties;
  slideRightOut40: CSSProperties;
  slideRightOut400: CSSProperties;
  slideLeftOut10: CSSProperties;
  slideLeftOut20: CSSProperties;
  slideLeftOut40: CSSProperties;
  slideLeftOut400: CSSProperties;
  slideUpOut10: CSSProperties;
  slideUpOut20: CSSProperties;
  slideDownOut10: CSSProperties;
  slideDownOut20: CSSProperties;
  scaleUpIn100: CSSProperties;
  scaleDownIn100: CSSProperties;
  scaleUpOut103: CSSProperties;
  scaleDownOut98: CSSProperties;
  fadeIn100: CSSProperties;
  fadeIn200: CSSProperties;
  fadeIn400: CSSProperties;
  fadeIn500: CSSProperties;
  fadeOut100: CSSProperties;
  fadeOut200: CSSProperties;
  fadeOut400: CSSProperties;
  fadeOut500: CSSProperties;
  rotate90deg: CSSProperties;
  rotateN90deg: CSSProperties;
}

export const animations: IAnimations = {
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

  slideRightOut10: _createAnimation(`${fadeOut},${slideRightOut10}`, duration3, ease1),
  slideRightOut20: _createAnimation(`${fadeOut},${slideRightOut20}`, duration3, ease1),
  slideRightOut40: _createAnimation(`${fadeOut},${slideRightOut40}`, duration3, ease1),
  slideRightOut400: _createAnimation(`${fadeOut},${slideRightOut400}`, duration3, ease1),
  slideLeftOut10: _createAnimation(`${fadeOut},${slideLeftOut10}`, duration3, ease1),
  slideLeftOut20: _createAnimation(`${fadeOut},${slideLeftOut20}`, duration3, ease1),
  slideLeftOut40: _createAnimation(`${fadeOut},${slideLeftOut40}`, duration3, ease1),
  slideLeftOut400: _createAnimation(`${fadeOut},${slideLeftOut400}`, duration3, ease1),
  slideUpOut10: _createAnimation(`${fadeOut},${slideUpOut10}`, duration3, ease1),
  slideUpOut20: _createAnimation(`${fadeOut},${slideUpOut20}`, duration3, ease1),
  slideDownOut10: _createAnimation(`${fadeOut},${slideDownOut10}`, duration3, ease1),
  slideDownOut20: _createAnimation(`${fadeOut},${slideDownOut20}`, duration3, ease1),

  scaleUpIn100: _createAnimation(`${fadeIn},${scaleUp100}`, duration3, ease1),
  scaleDownIn100: _createAnimation(`${fadeIn},${scaleDown100}`, duration3, ease1),
  scaleUpOut103: _createAnimation(`${fadeOut},${scaleUp103}`, duration1, ease2),
  scaleDownOut98: _createAnimation(`${fadeOut},${scaleDown98}`, duration1, ease2),

  fadeIn100: _createAnimation(fadeIn, duration1, ease2),
  fadeIn200: _createAnimation(fadeIn, duration2, ease2),
  fadeIn400: _createAnimation(fadeIn, duration3, ease2),
  fadeIn500: _createAnimation(fadeIn, duration4, ease2),

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

function _createSlideInX(fromX: number): string {
  return keyframes({
    from: { transform: `translate3d(${fromX}px,0,0)` },
    to: { transform: `translate3d(0,0,0)` }
  });
}

function _createSlideInY(fromY: number): string {
  return keyframes({
    from: { transform: `translate3d(0,${fromY}px,0)` },
    to: { transform: `translate3d(0,0,0)` }
  });
}

function _createSlideOutX(toX: number): string {
  return keyframes({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(${toX}px,0,0)` }
  });
}

function _createSlideOutY(toY: number): string {
  return keyframes({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${toY}px,0)` }
  });
}