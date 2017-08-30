import { assign, filteredAssign } from './object';

let { assert, expect } = chai;

describe('assign', () => {
  it('can copy an object', () => {
    let source = {
      a: 1,
      b: 'string',
      c: {
        d: 2
      }
    };

    let resultTarget = {};
    let result = assign(resultTarget, source);

    assert(result !== source, 'result was same as source');
    assert(result === resultTarget, 'target was not returned');

    expect(result).to.eql(source, 'result did not equal source');
  });
});

describe('filteredAssign', () => {
  it('can copy an object but avoid copying some parameters', () => {
    let source = {
      a: 1,
      b: 'string'
    };
    let result = filteredAssign((propName: string) => propName !== 'b', {}, source);

    expect(result.a).to.equal(1);
    expect(result.b).to.equal(undefined, 'b was not excluded');
  });
});