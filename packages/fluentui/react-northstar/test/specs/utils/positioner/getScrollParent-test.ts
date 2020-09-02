import * as _ from 'lodash';

import { getScrollParent } from 'src/utils/positioner/getScrollParent';

const overflowStyles: Partial<CSSStyleDeclaration>[] = [
  { overflow: 'scroll' },
  { overflowX: 'auto' },
  { overflowY: 'overlay' },
  { overflowX: 'scroll', overflowY: 'auto' },
  { overflowX: 'scroll', overflowY: 'auto', overflow: 'overlay' },
];

const setStylesForElement = (element: HTMLElement, style: Partial<CSSStyleDeclaration>) => {
  Object.keys(style).forEach(prop => {
    element.style[prop] = style[prop];
  });
};

const setStylesForElements = (elements: HTMLElement[], style: Partial<CSSStyleDeclaration>) =>
  elements.forEach(element => setStylesForElement(element, style));

const resetOverflowStyles = (element: HTMLElement) =>
  ['overflow', 'overflowX', 'overflowY'].map(prop => (element.style[prop] = ''));

const testsSetupFactory = () => {
  const treeElements = _.range(4).map(() => document.createElement('div'));
  const [element, nonScrollableParent, scrollableParent, scrollableGrandparent] = treeElements;

  return {
    element,
    scrollableParent,
    scrollableGrandparent,

    init() {
      nonScrollableParent.appendChild(element); // first parent is non scrollable
      scrollableParent.appendChild(nonScrollableParent); // 2nd parent is scrollable; this is the result of the getScrollParent function
      scrollableGrandparent.appendChild(scrollableParent); // 3nd parent is not scrollable; this is the result of the getScrollParent function
      document.body.appendChild(scrollableGrandparent);
    },

    resetStyles() {
      treeElements.forEach(treeElement => resetOverflowStyles(treeElement));
    },

    destroy() {
      document.body.removeChild(scrollableGrandparent);
    },
  };
};

describe('getScrollParent', () => {
  const testsSetup = testsSetupFactory();
  beforeAll(() => testsSetup.init());
  beforeEach(() => testsSetup.resetStyles());

  describe('when argument is <body />', () => {
    test('returns <body />', () => {
      expect(getScrollParent(document.body)).toBe(document.body);
    });
  });

  describe('when argument is <html />', () => {
    test('returns <body />', () => {
      expect(getScrollParent(document.documentElement)).toBe(document.body);
    });
  });

  describe('when argument is <document />', () => {
    test('returns <body />', () => {
      expect(getScrollParent(document)).toBe(document.body);
    });
  });

  describe('when there is no scrollable parent for the node argument', () => {
    test('returns <body />', () => {
      expect(getScrollParent(testsSetup.element)).toBe(document.body);
    });
  });

  describe('when there are scrollable parents for the node argument', () => {
    test('returns the first scrollable parent node', () => {
      overflowStyles.forEach(styles => {
        setStylesForElements([testsSetup.scrollableParent, testsSetup.scrollableGrandparent], styles);

        expect(getScrollParent(testsSetup.element)).toBe(testsSetup.scrollableParent);
      });
    });
  });

  describe('when there are scrollable parents for the node argument and the node argument is scrollable', () => {
    test('returns the first scrollable parent node', () => {
      overflowStyles.forEach(styles => {
        setStylesForElements(
          [testsSetup.element, testsSetup.scrollableParent, testsSetup.scrollableGrandparent],
          styles,
        );

        expect(getScrollParent(testsSetup.element)).toBe(testsSetup.scrollableParent);
      });
    });
  });

  afterAll(() => testsSetup.destroy());
});
