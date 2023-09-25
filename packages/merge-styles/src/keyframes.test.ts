import { keyframes } from './keyframes';
import { Stylesheet, InjectionMode } from './Stylesheet';
import { setRTL } from './StyleOptionsState';

const _stylesheet: Stylesheet = Stylesheet.getInstance();

_stylesheet.setConfig({ injectionMode: InjectionMode.none });

describe('keyframes', () => {
  beforeEach(() => {
    _stylesheet.reset();
  });

  afterEach(() => {
    setRTL(false);
  });

  it('can register from/to keyframes', () => {
    keyframes({
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    });

    expect(_stylesheet.getRules()).toEqual('@keyframes css-0{from{opacity:0;}to{opacity:1;}}');
  });

  it('can register from/to keyframes in rtl', () => {
    setRTL(true);
    keyframes({
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    });

    expect(_stylesheet.getRules()).toEqual('@keyframes css-0{from{opacity:0;}to{opacity:1;}}');
  });

  it('can register percentage keyframes', () => {
    keyframes({
      '0%': {
        opacity: 0,
      },
      '50%': {
        opacity: 0.8,
      },
      '100%': {
        opacity: 1,
      },
    });

    expect(_stylesheet.getRules()).toEqual('@keyframes css-0{0%{opacity:0;}50%{opacity:0.8;}100%{opacity:1;}}');
  });

  it('caches keyframe definitions', () => {
    const definition = {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    };
    keyframes(definition);
    keyframes(definition);
    keyframes(definition);

    expect(_stylesheet.getRules()).toEqual('@keyframes css-0{from{opacity:0;}to{opacity:1;}}');
  });
});
