import { createDOMRenderer } from './renderer/createDOMRenderer';
import { makeStyles } from './makeStyles';

const renderer = createDOMRenderer();

describe('makeStyles', () => {
  it('returns a single classname for a single style', () => {
    const computeClasses = makeStyles([[null, { color: 'red' }]]);
    expect(computeClasses({}, { renderer, tokens: {} })).toBe('__ncdyee0 fe3e8s90');
  });

  it('returns multiple classnames for complex rules', () => {
    const computeClasses = makeStyles([[null, { color: 'red', position: 'absolute' }]]);
    expect(computeClasses({}, { renderer, tokens: {} })).toBe('__1fslksb fe3e8s90 f1euv43f');
  });

  it('handles RTL for keyframes', () => {
    const computeClasses = makeStyles([
      [
        null,
        {
          animationName: {
            from: {
              transform: 'rotate(0deg)',
            },
            to: {
              transform: 'rotate(360deg)',
            },
          },
          animationIterationCount: 'infinite',
          animationDuration: '5s',
        },
      ],
    ]);
    expect(computeClasses({}, { renderer, tokens: {}, rtl: true })).toBe('__la4fka0 rfkf6eed0 f1cpbl36 f1t9cprh');
  });

  it('handles static css', () => {
    const computeClasses = makeStyles([
      [
        null,
        {
          body: {
            background: 'blue',
          },
          '.foo': {
            background: 'yellow',
            marginLeft: '5px',
          },
        },
      ],
    ]);
    expect(computeClasses({}, { renderer, tokens: {} })).toBe('');
  });
});
