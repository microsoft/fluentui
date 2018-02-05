import {
  getDocument,
  getParent,
  getWindow,
  setSSR,
  elementContains
} from './dom';

let unattachedSvg = document.createElement('svg');
let unattachedDiv = document.createElement('div');
let parentDiv = document.createElement('div');
let childDiv = document.createElement('div');

parentDiv.appendChild(childDiv);

describe('elementContains', () => {
  it('can find a child', () => {
    expect(elementContains(parentDiv, childDiv)).toEqual(true);
  });

  it('can return false on an unattached child', () => {
    expect(elementContains(parentDiv, unattachedDiv)).toEqual(false);
  });

  it('can return false on a null child', () => {
    expect(elementContains(parentDiv, null)).toEqual(false);
  });

  it('can return false on a null parent', () => {
    expect(elementContains(null, null)).toEqual(false);
  });

  it('can return false when parent is an svg', () => {
    expect(elementContains(unattachedSvg, unattachedDiv)).toEqual(false);
  });
});

describe('getParent', () => {
  it('returns correct parent for inner SVG elements', () => {
    let childSvg = document.createElement('svg');
    let svgRectangle = document.createElement('rect');
    childSvg.appendChild(svgRectangle);
    parentDiv.appendChild(childSvg);

    expect(getParent(svgRectangle)).toEqual(childSvg);
    expect(getParent(childSvg)).toEqual(parentDiv);
  });
});

describe('getWindow', () => {
  it('returns undefined in server environment', () => {
    setSSR(true);
    expect(getWindow()).toEqual(undefined);
    setSSR(false);
  });
});

describe('getDocument', () => {
  it('returns undefined in server environment', () => {
    setSSR(true);
    expect(getDocument()).toEqual(undefined);
    setSSR(false);
  });
});
