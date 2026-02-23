import { KEYFRAME_TYPE, RULE_TYPE } from 'fela-utils';

import { getNodeSibling } from '../src/dom/getNodeSibling';
import type { SortMediaQueryFn } from '../src/types';

function createMockNode(
  overrides: {
    media?: string;
    'data-fela-type'?: string;
    'data-fela-support'?: string;
    'data-fela-container'?: string;
  } = {},
): HTMLStyleElement {
  const attributes: Record<string, string> = {
    'data-fela-type': overrides['data-fela-type'] ?? 'RULE',
    ...overrides,
  };

  return {
    media: overrides.media ?? '',
    getAttribute: (name: string) => attributes[name] ?? null,
  } as unknown as HTMLStyleElement;
}

const sortMediaQuery: SortMediaQueryFn = (a, b) => a.localeCompare(b);

describe('getNodeSibling', () => {
  describe('KEYFRAME_TYPE', () => {
    test('returns the first node', () => {
      const nodes = [createMockNode(), createMockNode()];
      const result = getNodeSibling(nodes, { type: KEYFRAME_TYPE }, sortMediaQuery);

      expect(result).toBe(nodes[0]);
    });
  });

  describe('RULE_TYPE without media', () => {
    test('returns undefined when there are no special nodes and no media nodes', () => {
      const nodes = [createMockNode()];
      const result = getNodeSibling(nodes, { type: RULE_TYPE }, sortMediaQuery);

      expect(result).toBeUndefined();
    });

    test('returns the first media node when no support or container', () => {
      const mediaNode = createMockNode({ media: 'screen and (min-width: 1024px)' });
      const nodes = [createMockNode(), mediaNode];
      const result = getNodeSibling(nodes, { type: RULE_TYPE }, sortMediaQuery);

      expect(result).toBe(mediaNode);
    });

    test('plain rule inserts before a support node', () => {
      const supportNode = createMockNode({ 'data-fela-support': 'true' });
      const nodes = [createMockNode(), supportNode];
      const result = getNodeSibling(nodes, { type: RULE_TYPE }, sortMediaQuery);

      expect(result).toBe(supportNode);
    });

    test('plain rule inserts before a container node', () => {
      const containerNode = createMockNode({ 'data-fela-container': 'true' });
      const nodes = [createMockNode(), containerNode];
      const result = getNodeSibling(nodes, { type: RULE_TYPE }, sortMediaQuery);

      expect(result).toBe(containerNode);
    });

    test('plain rule inserts before the first special node when both support and container exist', () => {
      const supportNode = createMockNode({ 'data-fela-support': 'true' });
      const containerNode = createMockNode({ 'data-fela-container': 'true' });
      const nodes = [createMockNode(), supportNode, containerNode];
      const result = getNodeSibling(nodes, { type: RULE_TYPE }, sortMediaQuery);

      expect(result).toBe(supportNode);
    });

    test('support rule inserts before a container node', () => {
      const containerNode = createMockNode({ 'data-fela-container': 'true' });
      const nodes = [createMockNode(), containerNode];
      const result = getNodeSibling(nodes, { type: RULE_TYPE, support: 'true' }, sortMediaQuery);

      expect(result).toBe(containerNode);
    });

    test('support+container rule does not insert before a container-only node', () => {
      const containerNode = createMockNode({ 'data-fela-container': 'true' });
      const mediaNode = createMockNode({ media: 'screen and (min-width: 1024px)' });
      const nodes = [createMockNode(), containerNode, mediaNode];
      const result = getNodeSibling(
        nodes,
        { type: RULE_TYPE, support: 'true', container: 'sidebar (min-width: 800px)' },
        sortMediaQuery,
      );

      expect(result).toBe(mediaNode);
    });

    test('container rule does not insert before a support node', () => {
      const supportNode = createMockNode({ 'data-fela-support': 'true' });
      const mediaNode = createMockNode({ media: 'screen and (min-width: 1024px)' });
      const nodes = [createMockNode(), supportNode, mediaNode];
      const result = getNodeSibling(
        nodes,
        { type: RULE_TYPE, container: 'sidebar (min-width: 800px)' },
        sortMediaQuery,
      );

      expect(result).toBe(mediaNode);
    });
  });

  describe('RULE_TYPE with media', () => {
    test('returns the node for the next media query in sorted order', () => {
      const nodeA = createMockNode({ media: '(min-width: 100px)' });
      const nodeB = createMockNode({ media: '(min-width: 300px)' });
      const nodes = [nodeA, nodeB];

      const result = getNodeSibling(nodes, { type: RULE_TYPE, media: '(min-width: 200px)' }, sortMediaQuery);

      expect(result).toBe(nodeB);
    });

    test('returns undefined when the new media sorts last', () => {
      const nodeA = createMockNode({ media: '(min-width: 100px)' });
      const nodes = [nodeA];

      const result = getNodeSibling(nodes, { type: RULE_TYPE, media: '(min-width: 300px)' }, sortMediaQuery);

      expect(result).toBeUndefined();
    });

    test('container rule with media skips one extra position', () => {
      const nodeA = createMockNode({ media: '(min-width: 200px)' });
      const nodeB = createMockNode({ media: '(min-width: 300px)' });
      const nodes = [nodeA, nodeB];

      const result = getNodeSibling(
        nodes,
        { type: RULE_TYPE, media: '(min-width: 200px)', container: 'sidebar (min-width: 800px)' },
        sortMediaQuery,
      );

      expect(result).toBe(nodeB);
    });

    test('support+container rule with media skips one extra position via container branch', () => {
      const nodeA = createMockNode({ media: '(min-width: 200px)' });
      const nodeB = createMockNode({ media: '(min-width: 300px)' });
      const nodes = [nodeA, nodeB];

      const result = getNodeSibling(
        nodes,
        {
          type: RULE_TYPE,
          media: '(min-width: 200px)',
          support: 'true',
          container: 'sidebar (min-width: 800px)',
        },
        sortMediaQuery,
      );

      expect(result).toBe(nodeB);
    });

    test('support rule with media skips one extra position', () => {
      const nodeA = createMockNode({ media: '(min-width: 200px)' });
      const nodeB = createMockNode({ media: '(min-width: 300px)' });
      const nodes = [nodeA, nodeB];

      const result = getNodeSibling(
        nodes,
        { type: RULE_TYPE, media: '(min-width: 200px)', support: 'true' },
        sortMediaQuery,
      );

      expect(result).toBe(nodeB);
    });
  });

  describe('unknown type', () => {
    test('returns undefined for unknown type', () => {
      const nodes = [createMockNode()];
      const result = getNodeSibling(nodes, { type: 'UNKNOWN' as any }, sortMediaQuery);

      expect(result).toBeUndefined();
    });
  });
});
