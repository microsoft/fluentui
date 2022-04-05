import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { print, test } from './index';
import { Stylesheet, InjectionMode, mergeStyles, keyframes } from '@fluentui/merge-styles';

const indent = (val: string): string => '    ' + val;

const _stylesheet: Stylesheet = Stylesheet.getInstance();
_stylesheet.setConfig({ injectionMode: InjectionMode.none });

describe('test', () => {
  beforeEach(() => {
    _stylesheet.reset();
  });

  it('returns true if the attribute value contains merged styles', () => {
    mergeStyles({ background: 'red', color: 'white' });
    expect(test('a b css-0')).toEqual(true);
    expect(test('a b')).toEqual(false);
  });
});

describe('print', () => {
  beforeEach(() => {
    _stylesheet.reset();
  });

  it('can format, sort, and indent the class names', () => {
    const classNames = mergeStyles('ms-GlobalClassName', {
      color: 'white',
      background: 'red',
      selectors: {
        ':hover': {
          background: 'green',
        },
      },
    });

    expect(print(classNames, () => '', indent)).toEqual(
      [
        '',
        indent('ms-GlobalClassName'),
        indent('{'),
        indent('  background: red;'),
        indent('  color: white;'),
        indent('}'),
        indent('&:hover {'),
        indent('  background: green;'),
        indent('}'),
      ].join('\n'),
    );
  });

  it('can format, sort, and indent the class names without selectors wrapper', () => {
    const classNames = mergeStyles('ms-GlobalClassName', {
      color: 'white',
      background: 'red',
      ':hover': {
        background: 'green',
      },
    });

    expect(print(classNames, () => '', indent)).toEqual(
      [
        '',
        indent('ms-GlobalClassName'),
        indent('{'),
        indent('  background: red;'),
        indent('  color: white;'),
        indent('}'),
        indent('&:hover {'),
        indent('  background: green;'),
        indent('}'),
      ].join('\n'),
    );
  });

  it('can expand animation class names', () => {
    const fadeInClassName = keyframes({
      from: { opacity: 0 },
      to: { opacity: 1 },
    });
    const leftInClassName = keyframes({
      from: { left: -100 },
      to: { left: 0 },
    });
    const className = mergeStyles({
      animationName: `${fadeInClassName},${leftInClassName}`,
    });

    expect(print(className, () => '', indent)).toEqual(
      [
        '',
        '',
        indent('{'),
        indent(
          '  ' +
            'animation-name: ' +
            'keyframes from{opacity:0;}to{opacity:1;} ' +
            'keyframes from{left:-100px;}to{left:0px;};',
        ),
        indent('}'),
      ].join('\n'),
    );
  });

  it('can be used in snapshots', () => {
    const fadeInAnimationName = keyframes({
      from: { opacity: 0, color: 'red' },
      to: { opacity: 1, color: 'green' },
    });
    const fadeInClassName = mergeStyles({
      animationName: fadeInAnimationName,
      animationDelay: '500ms',
    });

    expect(renderer.create(<div className={fadeInClassName} />).toJSON()).toMatchSnapshot();
  });
});
