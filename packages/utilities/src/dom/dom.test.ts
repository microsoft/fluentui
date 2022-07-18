import { portalContainsElement } from './portalContainsElement';
import { DATA_PORTAL_ATTRIBUTE, setPortalAttribute } from './setPortalAttribute';
import { elementContains } from './elementContains';
import { getParent } from './getParent';

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

describe('setPortalAttribute', () => {
  it('sets attribute', () => {
    let testDiv = document.createElement('div');
    expect(testDiv.getAttribute(DATA_PORTAL_ATTRIBUTE)).toBeFalsy();
    setPortalAttribute(testDiv);
    expect(testDiv.getAttribute(DATA_PORTAL_ATTRIBUTE)).toBeTruthy();
  });
});

describe('portalContainsElement', () => {
  let root: HTMLElement;
  let leaf: HTMLElement;
  let parent: HTMLElement;
  let portal: HTMLElement;
  let unlinked: HTMLElement;

  beforeEach(() => {
    root = document.createElement('div');
    leaf = document.createElement('div');
    parent = document.createElement('div');
    portal = document.createElement('div');
    unlinked = document.createElement('div');

    setPortalAttribute(portal);
  });

  it('works with and without parent specified', () => {
    root.appendChild(parent);
    parent.appendChild(portal);
    portal.appendChild(leaf);
    expect(portalContainsElement(root)).toBeFalsy();
    expect(portalContainsElement(parent)).toBeFalsy();
    expect(portalContainsElement(portal)).toBeTruthy();
    expect(portalContainsElement(leaf)).toBeTruthy();
    expect(portalContainsElement(leaf, parent)).toBeTruthy();
  });

  it('works correctly when parent and child are in same portal', () => {
    root.appendChild(portal);
    portal.appendChild(parent);
    parent.appendChild(leaf);
    expect(portalContainsElement(parent)).toBeTruthy();
    expect(portalContainsElement(leaf, parent)).toBeFalsy();
  });

  it('works with hierarchically invalid parents', () => {
    root.appendChild(parent);
    parent.appendChild(portal);
    portal.appendChild(leaf);
    // When parent is invalid, searches should go to root
    expect(portalContainsElement(root, leaf)).toBeFalsy();
    expect(portalContainsElement(parent, leaf)).toBeFalsy();
    expect(portalContainsElement(portal, leaf)).toBeTruthy();
    expect(portalContainsElement(leaf, unlinked)).toBeTruthy();
  });

  it('works when element is parent', () => {
    root.appendChild(parent);
    parent.appendChild(portal);
    portal.appendChild(leaf);
    expect(portalContainsElement(root, root)).toBeFalsy();
    expect(portalContainsElement(parent, parent)).toBeFalsy();
    expect(portalContainsElement(portal, portal)).toBeTruthy();
    expect(portalContainsElement(leaf, leaf)).toBeFalsy();
  });
});
