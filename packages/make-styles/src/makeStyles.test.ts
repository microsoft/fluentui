import { createDOMRenderer } from './renderer/createDOMRenderer';
import { makeStyles } from './makeStyles';

const renderer = createDOMRenderer();

describe('makeStyles', () => {
  it('returns a single classname for a single style', () => {
    const computeClasses = makeStyles([[null, { color: 'red' }]]);
    expect(computeClasses({}, { renderer, tokens: {} })).toBe(' fe3e8s9');
  });

  it('returns multiple classnames for complex rules', () => {
    const computeClasses = makeStyles([[null, { color: 'red', position: 'absolute' }]]);
    expect(computeClasses({}, { renderer, tokens: {} })).toBe(' fe3e8s9 f1euv43f');
  });

  it('performs classnames concatenation', () => {
    const computeClasses = makeStyles([[null, { color: 'red', position: 'absolute' }]]);
    expect(computeClasses({}, { renderer, tokens: {} }, 'foo', 'bar')).toBe('foo bar  fe3e8s9 f1euv43f');
  });

  it('handles overrides', () => {
    const baseClasses = makeStyles([[null, { color: 'red', position: 'absolute' }]]);
    const overrides = makeStyles([[null, { color: 'green' }]]);

    expect(baseClasses({}, { renderer, tokens: {} }, overrides({}, { renderer, tokens: {} }))).toBe(
      '  fka9v86 f1euv43f',
    );
  });
});
