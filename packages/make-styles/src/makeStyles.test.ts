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
});
