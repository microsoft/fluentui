// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE in the project root for license information.
// 'use strict';

export const SCROLL_FRAME_RATE: number = 10;

export interface ITransitionObj {
  element: HTMLElement;
  props: any;
  transformations: any;
  tweenObj?: any;
  duration?: number;
  delay?: number;
  ease?: string;
  onEnd?: () => {};
  onEndArgs?: Array<any>;
  [key: string]: any;
}

export interface IAnimationObj {
  element: HTMLElement;
  keyframes: string;
  props: any;
  tweenObj?: any;
  duration?: number;
  ease?: string;
  delay?: number;
  onEnd?: () => {};
  onEndArgs?: Array<any>;
  [key: string]: any;
}

export interface IScrollObj {
  element: HTMLElement;
  props: any;
  step: number;
  beginTop?: number;
  change?: number;
  onEnd?: () => {};
  onEndArgs?: Array<any>;
}

export class Animate {
  private static _transformProps: Array<string> = [
    'x',
    'y',
    'z',
    'scaleX',
    'scaleY',
    'scaleZ',
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'skewX',
    'skewY'
  ];
  private static _filters: Array<string> = [
    'blur',
    'brightness',
    'contrast',
    'dropShadow',
    'grayscale',
    'hueRotate',
    'invert',
    'saturate',
    'sepia'
  ];
  private static _timeProps: Array<string> = ['duration', 'ease', 'delay'];
  private static _callbackProps: Array<string> = ['onEnd', 'onEndArgs'];
  private static _animationObjects: Array<any> = [];

  /**
   * @param {HTMLElement} element
   * @param {object} props Transition properties
   * @param {number} props.duration The duration of the transition in seconds
   * @param {number} props.delay A delay in seconds that occurs before the transition starts
   * @param {string} props.ease An easing equation applied to the transition
   * @param {function} props.onEnd A function that is called when the transition ends
   * @param {array} props.onEndArgs An array of parameters applied to the onEnd function
   * @param {number} props.x props.y props.left, props.opacity etc... CSS values to transition to
   */
  public static transition(element: HTMLElement, props: any): void {
    let obj: ITransitionObj = { element: element, props: props, transformations: {} };
    Animate._animationObjects.push(obj);
    Animate._parseProperties(obj);
    Animate._createTransition(obj);
    setTimeout(Animate._setProperties, 0, obj);
    Animate._setCallback(obj);
  }

  /**
   * @param {HTMLElement} element
   * @param {string} keyframes A name of a keyframe animation
   * @param {object} props Animation properties
   * @param {number} props.duration The duration of the animation in seconds
   * @param {number} props.delay A delay in seconds that occurs before the animation starts
   * @param {string} props.ease An easing equation applied to the animation
   * @param {function} props.onEnd A function that is called when the animation ends
   * @param {array} props.onEndArgs An array of parameters applied to the onEnd function
   */
  public static animation(element: HTMLElement, keyframes: string, props: any): void {
    let obj: IAnimationObj = { element: element, keyframes: keyframes, props: props };
    Animate._animationObjects.push(obj);
    Animate._parseProperties(obj);
    Animate._createAnimation(obj);
    Animate._setCallback(obj);
  }

  /**
   * @param {HTMLElement} element
   * @param {object} props Scroll animation properties
   * @param {number} props.duration The duration of the transition in seconds
   * @param {number} props.top The end scroll position of the element
   * @param {number} props.delay A delay in seconds that occurs before the scroll starts
   * @param {function} props.onEnd A function that is called when the scrolling animation ends
   * @param {array} props.onEndArgs An array of parameters applied to the onEnd function
   */
  public static scrollTo(element: HTMLElement, props: any): void {
    let obj: IScrollObj = { element: element, props: props, step: 0 };
    Animate._setScrollProperties(obj);
    if (obj.props.delay) {
      setTimeout(Animate._animationObjects, obj.props.delay * 1000, obj);
    } else {
      Animate._animateScroll(obj);
    }
    Animate._animationObjects.push(obj);
  }

  private static _setScrollProperties(obj: IScrollObj): void {
    obj.beginTop = obj.element.scrollTop;
    obj.change = obj.props.top - obj.beginTop;
    obj.props.duration = obj.props.duration * 1000;
  }

  private static _parseProperties(obj: ITransitionObj | IAnimationObj): void {
    const nonTweenProps: Array<string> = Animate._timeProps.concat(Animate._callbackProps);
    obj.tweenObj = {};
    for (let key in obj.props) {
      if (Animate._contains(nonTweenProps, key)) {
        obj[key] = obj.props[key];
      } else {
        obj.tweenObj[key] = obj.props[key];
      }
    }
  }

  private static _animateScroll(obj: IScrollObj): void {
    const totalSteps: number = obj.props.duration / SCROLL_FRAME_RATE;
    const top: number = Animate._easeOutExpo(obj.step++, obj.beginTop, obj.change, totalSteps);
    obj.element.scrollTop = top;
    if (obj.step >= totalSteps) {
      obj.element.scrollTop = obj.props.top;
      Animate._executeCallback(obj.props);
      Animate._removeAnimationObject(obj);
    } else {
      setTimeout(() => {
        requestAnimationFrame(() => {
          Animate._animateScroll(obj);
        });
      }, SCROLL_FRAME_RATE);
    }
  }

  private static _createTransition(obj: ITransitionObj): void {
    const duration: number = obj.duration || 0;
    const delay: number = obj.delay || 0;
    obj.element.style.transitionProperty = Animate._getTransitionProperties(obj.tweenObj);
    obj.element.style.transitionDuration = duration.toString() + 's';
    obj.element.style.transitionTimingFunction = obj.ease || 'linear';
    obj.element.style.transitionDelay = delay.toString() + 's';
  }

  private static _createAnimation(obj: IAnimationObj): void {
    const duration: number = obj.duration || 0;
    const delay: number = obj.delay || 0;
    obj.element.style.animationName = obj.keyframes;
    obj.element.style.animationDuration = duration.toString() + 's';
    obj.element.style.animationTimingFunction = obj.ease || 'linear';
    obj.element.style.animationDelay = delay.toString() + 's';
    obj.element.style.animationFillMode = 'both';
  }

  private static _getTransitionProperties(obj: ITransitionObj): string {
    let hasTransform: boolean = false;
    let hasFilter: boolean = false;
    let properties: Array<string> = [];

    for (let key in obj) {
      if (Animate._contains(Animate._transformProps, key)) {
        hasTransform = true;
      } else if (Animate._contains(Animate._filters, key)) {
        hasFilter = true;
      } else {
        properties.push(Animate._camelCaseToDash(key));
      }
    }

    if (hasTransform) {
      properties.push('transform');
    }
    if (hasFilter) {
      properties.push('-webkit-filter');
      properties.push('filter');
    }

    return properties.join(', ');
  }

  private static _setProperties(obj: ITransitionObj): void {
    for (let key in obj.tweenObj) {
      if (Animate._contains(Animate._transformProps, key)) {
        Animate._setTransformValues(obj, key);
      } else if (Animate._contains(Animate._filters, key)) {
        Animate._setFilterValues(obj, key);
      } else {
        Animate._setRegularValues(obj, key);
      }
    }
    if (obj.transformations) {
      Animate._setTransformations(obj);
    }
  }

  private static _setRegularValues(obj: ITransitionObj, key: string): void {
    let value: string = obj.tweenObj[key];
    if (value.toString().indexOf('%') === -1) {
      value += key !== 'opacity' && key !== 'backgroundColor' && key !== 'boxShadow' ? 'px' : '';
    }
    obj.element.style[<any>key] = value;
  }

  private static _setFilterValues(obj: ITransitionObj, key: string): void {
    let value: string = obj.tweenObj[key];
    if (key === 'hueRotate') {
      value = '(' + value + 'deg)';
    } else {
      value = key === 'blur' ? '(' + value + 'px)' : '(' + value + '%)';
    }
    key = Animate._camelCaseToDash(key);
    obj.element.style.webkitFilter = key + value;
    obj.element.style.filter = key + value;
  }

  private static _setTransformValues(obj: ITransitionObj, key: string): void {
    if (/x|y|z|scaleX|scaleY|scaleZ|rotate|rotateX|rotateY|rotateZ|skewX|skewY/.test(key)) {
      obj.transformations[key] = obj.tweenObj[key];
    }
  }

  private static _setTransformations(obj: ITransitionObj): void {
    let rotate: string = '',
      scale = '',
      skew = '',
      translate = '';
    let trans: any = obj.transformations;
    translate += trans.x !== undefined && trans.x ? 'translateX(' + trans.x + 'px) ' : '';
    translate += trans.y !== undefined && trans.y ? 'translateY(' + trans.y + 'px) ' : '';
    translate += trans.z !== undefined && trans.z ? 'translateZ(' + trans.z + 'px) ' : '';
    rotate += trans.rotate !== undefined && trans.rotate ? 'rotate(' + trans.rotate + 'deg) ' : '';
    rotate += trans.rotateX !== undefined && trans.rotateX ? 'rotateX(' + trans.rotateX + 'deg) ' : '';
    rotate += trans.rotateY !== undefined && trans.rotateY ? 'rotate(' + trans.rotateY + 'deg) ' : '';
    rotate += trans.rotateZ !== undefined && trans.rotateZ ? 'rotate(' + trans.rotateZ + 'deg) ' : '';
    scale += trans.scaleX !== undefined && trans.scaleX ? 'scaleX(' + trans.scaleX + ') ' : '';
    scale += trans.scaleY !== undefined && trans.scaleY ? 'scaleY(' + trans.scaleY + ') ' : '';
    scale += trans.scaleZ !== undefined && trans.scaleZ ? 'scaleZ(' + trans.scaleZ + ') ' : '';
    skew += trans.skewX !== undefined && trans.skewX ? 'skewX(' + trans.skewX + 'deg) ' : '';
    skew += trans.skewY !== undefined && trans.skewY ? 'skewY(' + trans.skewY + 'deg) ' : '';
    obj.element.style.transform = translate + rotate + scale + skew;
  }

  private static _setCallback(obj: ITransitionObj | IAnimationObj): void {
    obj.element.addEventListener('webkitTransitionEnd', Animate._complete, false);
    obj.element.addEventListener('transitionend', Animate._complete, false);
    obj.element.addEventListener('webkitAnimationEnd', Animate._complete, false);
    obj.element.addEventListener('animationend', Animate._complete, false);
  }

  private static _complete(event: Event): void {
    event.target.removeEventListener('webkitTransitionEnd', Animate._complete);
    event.target.removeEventListener('transitionend', Animate._complete);
    event.target.removeEventListener('webkitAnimationEnd', Animate._complete);
    event.target.removeEventListener('animationend', Animate._complete);
    let obj: ITransitionObj | IAnimationObj = Animate._getAnimationObjByElement(<HTMLElement>event.target);
    Animate._executeCallback(obj);
    Animate._removeAnimationObject(obj);
  }

  private static _getAnimationObjByElement(element: HTMLElement): ITransitionObj | IAnimationObj {
    let i: number = Animate._animationObjects.length;
    while (i--) {
      if (Animate._animationObjects[i].element === element) {
        return Animate._animationObjects[i];
      }
    }
    return null;
  }

  private static _removeAnimationObject(obj: ITransitionObj | IAnimationObj | IScrollObj): void {
    let i: number = Animate._animationObjects.length;
    while (i--) {
      if (Animate._animationObjects[i] === obj) {
        Animate._animationObjects.splice(i, 1);
      }
    }
  }

  private static _executeCallback(obj: ITransitionObj | IAnimationObj | IScrollObj): void {
    if (obj.onEnd) {
      let endArgs: Array<any> = obj.onEndArgs || [];
      obj.onEnd.apply(null, endArgs);
    }
  }

  private static _contains(array: Array<string>, value: string): boolean {
    let i: number = array.length;
    while (i--) {
      if (value === array[i]) {
        return true;
      }
    }
    return false;
  }

  private static _camelCaseToDash(value: string): string {
    return value
      .replace(/\W+/g, '-')
      .replace(/([a-z\d])([A-Z])/g, '$1-$2')
      .toLowerCase();
  }

  private static _easeOutExpo(time: number, begin: number, change: number, duration: number): number {
    return time === duration ? begin + change : change * (-Math.pow(2, (-10 * time) / duration) + 1) + begin;
  }

  // private static _easeInOutQuad (time: number, begin: number, change: number, duration: number) {
  //   if ((time /= duration / 2) < 1) {
  //     return change / 2 * time * time + begin;
  //   }
  //   return -change / 2 * ((--time) * (time - 2) - 1) + begin;
  // }
}
