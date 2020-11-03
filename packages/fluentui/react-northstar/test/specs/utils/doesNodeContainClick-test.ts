import { doesNodeContainClick } from 'src/utils';

const makeEvent = (event?: any) => ({ clientX: 0, clientY: 0, ...event });

const makeRect = (rect?: any) => ({ top: 0, bottom: 1, left: 0, right: 1, ...rect });

const makeNode = (rect?: any, node?: any) => ({
  contains: jest.fn(),
  offsetWidth: 1,
  offsetHeight: 1,
  getClientRects: jest.fn(() => ({ length: 1, 0: makeRect(rect) })),
  ...node,
});

describe('doesNodeContainClick', () => {
  describe('nil arguments', () => {
    test('returns false if the node is nil', () => {
      expect(doesNodeContainClick(null, makeEvent())).toBe(false);
      expect(doesNodeContainClick(undefined, makeEvent())).toBe(false);
    });

    test('returns false if the event is nil', () => {
      expect(doesNodeContainClick(makeNode(), null)).toBe(false);
      expect(doesNodeContainClick(makeNode(), undefined)).toBe(false);
    });
  });

  describe('e.target', () => {
    test('returns node.contains(e.target) if exists', () => {
      const node = document.createElement('div');
      const target = document.createElement('div');
      const event = makeEvent({ target });

      node.appendChild(target);
      document.body.appendChild(node);

      expect(doesNodeContainClick(node, event)).toBe(true);

      document.body.removeChild(node);
    });

    test("does not call node.contains(e.target) if doesn't exist", () => {
      const node = document.createElement('div');
      const target = null;
      const event = makeEvent({ target });

      document.body.appendChild(node);
      expect(doesNodeContainClick(node, event)).toBe(false);

      document.body.removeChild(node);
    });
  });

  describe('nil event properties', () => {
    test('returns false if the e.clientX is nil', () => {
      expect(doesNodeContainClick(makeNode(), { clientX: null } as any)).toBe(false);
      expect(doesNodeContainClick(makeNode(), { clientX: undefined } as any)).toBe(false);
    });

    test('returns false if the e.clientY is nil', () => {
      expect(doesNodeContainClick(makeNode(), { clientY: null } as any)).toBe(false);
      expect(doesNodeContainClick(makeNode(), { clientY: undefined } as any)).toBe(false);
    });

    test('does not call node.getClientRects if e.clientX is nil', () => {
      const node = makeNode();
      doesNodeContainClick(node, { clientX: null } as any);
      doesNodeContainClick(node, { clientX: undefined } as any);

      expect(node.getClientRects).not.toHaveBeenCalled();
    });

    test('does not call node.getClientRects if e.clientY is nil', () => {
      const node = makeNode();
      doesNodeContainClick(node, { clientY: null } as any);
      doesNodeContainClick(node, { clientY: undefined } as any);

      expect(node.getClientRects).not.toHaveBeenCalled();
    });
  });

  describe('invisible node', () => {
    test('returns false if there is no node.offsetWidth', () => {
      const e = makeEvent();

      expect(doesNodeContainClick(makeNode(null, { offsetWidth: 0 }), e)).toBe(false);
      expect(doesNodeContainClick(makeNode(null, { offsetWidth: null }), e)).toBe(false);
      expect(doesNodeContainClick(makeNode(null, { offsetWidth: undefined }), e)).toBe(false);
    });
    test('returns false if there is no node.offsetHeight', () => {
      const e = makeEvent();

      expect(doesNodeContainClick(makeNode(null, { offsetHeight: 0 }), e)).toBe(false);
      expect(doesNodeContainClick(makeNode(null, { offsetHeight: null }), e)).toBe(false);
      expect(doesNodeContainClick(makeNode(null, { offsetHeight: undefined }), e)).toBe(false);
    });
    test('returns false if there is node.getClientRects is empty', () => {
      const e = makeEvent();

      expect(doesNodeContainClick(makeNode(null, { getClientRects: () => [] }), e)).toBe(false);
      expect(doesNodeContainClick(makeNode(null, { getClientRects: () => ({ length: 0 }) }), e)).toBe(false);
      expect(doesNodeContainClick(makeNode(null, { getClientRects: () => ({ length: null }) }), e)).toBe(false);
      expect(doesNodeContainClick(makeNode(null, { getClientRects: () => ({ length: undefined }) }), e)).toBe(false);
    });
  });

  describe('nil node rect properties', () => {
    test('returns false if the node top is nil', () => {
      const nullNode = makeNode({ top: null });
      const undefNode = makeNode({ top: undefined });

      expect(doesNodeContainClick(nullNode, makeEvent())).toBe(false);
      expect(doesNodeContainClick(undefNode, makeEvent())).toBe(false);
    });

    test('returns false if the node bottom is nil', () => {
      const nullNode = makeNode({ bottom: null });
      const undefNode = makeNode({ bottom: undefined });

      expect(doesNodeContainClick(nullNode, makeEvent())).toBe(false);
      expect(doesNodeContainClick(undefNode, makeEvent())).toBe(false);
    });

    test('returns false if the node left is nil', () => {
      const nullNode = makeNode({ left: null });
      const undefNode = makeNode({ left: undefined });

      expect(doesNodeContainClick(nullNode, makeEvent())).toBe(false);
      expect(doesNodeContainClick(undefNode, makeEvent())).toBe(false);
    });

    test('returns false if the node right is nil', () => {
      const nullNode = makeNode({ right: null });
      const undefNode = makeNode({ right: undefined });

      expect(doesNodeContainClick(nullNode, makeEvent())).toBe(false);
      expect(doesNodeContainClick(undefNode, makeEvent())).toBe(false);
    });
  });

  describe('click outside node rect', () => {
    test('returns false if clientY < node top', () => {
      expect(doesNodeContainClick(makeNode({ top: 1 }), makeEvent({ clientY: 0 }))).toBe(false);
    });
    test('returns false if clientY > node bottom', () => {
      expect(doesNodeContainClick(makeNode({ bottom: 0 }), makeEvent({ clientY: 1 }))).toBe(false);
    });
    test('returns false if clientX < node left', () => {
      expect(doesNodeContainClick(makeNode({ left: 1 }), makeEvent({ clientX: 0 }))).toBe(false);
    });
    test('returns false if clientX > node right', () => {
      expect(doesNodeContainClick(makeNode({ right: 0 }), makeEvent({ clientX: 1 }))).toBe(false);
    });
  });

  describe('click inside of node rect', () => {
    test('returns true if clientY > node top && clientY < node bottom', () => {
      expect(doesNodeContainClick(makeNode({ top: 1, bottom: 3 }), makeEvent({ clientY: 2 }))).toBe(true);
    });
    test('returns true if clientX > node left && clientX < node right', () => {
      expect(doesNodeContainClick(makeNode({ left: 1, right: 3 }), makeEvent({ clientX: 2 }))).toBe(true);
    });
  });

  describe('click on node rect boundary', () => {
    test('returns true if clientY === node top', () => {
      expect(doesNodeContainClick(makeNode({ top: 1, bottom: 3 }), makeEvent({ clientY: 1 }))).toBe(true);
    });
    test('returns true if clientY === node bottom', () => {
      expect(doesNodeContainClick(makeNode({ top: 1, bottom: 3 }), makeEvent({ clientY: 3 }))).toBe(true);
    });
    test('returns true if clientX === node left', () => {
      expect(doesNodeContainClick(makeNode({ left: 1, right: 3 }), makeEvent({ clientX: 1 }))).toBe(true);
    });
    test('returns true if clientX === node right', () => {
      expect(doesNodeContainClick(makeNode({ left: 1, right: 3 }), makeEvent({ clientX: 3 }))).toBe(true);
    });
  });

  describe('decimal event and node rect values', () => {
    test('returns true when click is inside node rect', () => {
      const node = makeNode({ top: 0.1, bottom: 0.9, left: 0.1, right: 0.9 });
      const event = makeEvent({ clientX: 0.5, clientY: 0.5 });

      expect(doesNodeContainClick(node, event)).toBe(true);
    });

    test('returns false when click is outside node rect', () => {
      const node = makeNode({ top: 0.1, bottom: 0.9, left: 0.1, right: 0.9 });
      const event = makeEvent({ clientX: 1.1, clientY: 1.1 });

      expect(doesNodeContainClick(node, event)).toBe(false);
    });
  });
});
