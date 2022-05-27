import { html as beautify } from 'js-beautify';

import createNode from '../createNode';

import { RULE_TYPE, STATIC_TYPE, KEYFRAME_TYPE } from '../../../../../fela-utils/src/styleTypes';

import cleanHead from '../../__helpers__/cleanHead';

beforeEach(cleanHead);

describe('Creating a style node', () => {
  it('should have the correct attributes', () => {
    const getHTML = (media, support) => ({
      _media: media,
      _support: support,
      html: createNode({}, 0, { type: RULE_TYPE, media, support }).outerHTML,
    });

    expect(getHTML()).toMatchSnapshot();
    expect(getHTML('(min-width:300px)')).toMatchSnapshot();
    expect(getHTML(undefined, '(display:flex)')).toMatchSnapshot();
    expect(getHTML('(min-width:300px)', '(display:flex)')).toMatchSnapshot();
  });

  it('should respect the correct order', () => {
    const nodes = {};

    function createAndAdd(score, attributes) {
      const node = createNode(nodes, score, attributes);
      nodes[JSON.stringify(attributes) + score] = { node, score };
    }

    createAndAdd(5, {
      type: RULE_TYPE,
      media: '(min-width:300px)',
    });

    createAndAdd(6, {
      type: RULE_TYPE,
      media: '(min-width:300px)',
      support: true,
    });

    createAndAdd(1, {
      type: STATIC_TYPE,
    });

    createAndAdd(4, {
      type: RULE_TYPE,
    });

    createAndAdd(2, {
      type: KEYFRAME_TYPE,
    });

    expect(
      beautify(document.head.outerHTML, {
        indent_size: 2,
      }),
    ).toMatchSnapshot();
  });
});
