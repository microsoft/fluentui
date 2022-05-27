import { html as beautify } from 'js-beautify';

import createSubscription from '../createSubscription';

import createRenderer from '../../../../../fela/src/createRenderer';

import getStyleSheetStyle from '../../__helpers__/getStyleSheetStyle';
import cleanHead from '../../__helpers__/cleanHead';

beforeEach(cleanHead);
afterEach(() => {
  process.env.NODE_ENV = 'test';
});

describe('Subscribing to the DOM', () => {
  it('should render rules to a DOM node', () => {
    const renderer = createRenderer({ devMode: true });

    const updateSubscription = createSubscription(renderer);
    renderer.subscribe(updateSubscription);

    renderer.renderRule(() => ({
      backgroundColor: 'red',
      color: 'blue',
      ':hover': {
        color: 'red',
      },
    }));

    expect(
      beautify(document.head.outerHTML, {
        indent_size: 2,
      }),
    ).toMatchSnapshot();
  });

  it('should render static styles to a DOM node', () => {
    const renderer = createRenderer();

    const updateSubscription = createSubscription(renderer);
    renderer.subscribe(updateSubscription);

    renderer.renderStatic(
      {
        backgroundColor: 'red',
        color: 'blue',
      },
      'body, html',
    );

    expect(
      beautify(document.head.outerHTML, {
        indent_size: 2,
      }),
    ).toMatchSnapshot();
  });

  it('should render keyframes to a DOM node', () => {
    const renderer = createRenderer();

    const updateSubscription = createSubscription(renderer);
    renderer.subscribe(updateSubscription);

    renderer.renderKeyframe(() => ({
      from: { color: 'red' },
      to: { color: 'blue' },
    }));

    expect(
      beautify(document.head.outerHTML, {
        indent_size: 2,
      }),
    ).toMatchSnapshot();
  });

  it('should render media rules and support rules to single DOM nodes (devMode)', () => {
    const renderer = createRenderer({ devMode: true });

    const updateSubscription = createSubscription(renderer);
    renderer.subscribe(updateSubscription);

    renderer.renderRule(() => ({
      color: 'blue',
      '@supports (display: flex)': {
        display: 'flex',
      },
      '@media (min-width: 300px)': {
        color: 'red',
        '@media (max-height: 500px)': {
          color: 'yellow',
          '@supports (display: grid)': {
            display: 'grid',
          },
        },
      },
    }));

    expect(
      beautify(document.head.outerHTML, {
        indent_size: 2,
      }),
    ).toMatchSnapshot();
  });

  it('should clear all DOM nodes', () => {
    const renderer = createRenderer({ devMode: true });

    const updateSubscription = createSubscription(renderer);
    renderer.subscribe(updateSubscription);

    renderer.renderRule(() => ({
      color: 'blue',
      '@media (min-width: 300px)': {
        color: 'red',
        '@media (max-height: 500px)': {
          color: 'yellow',
        },
      },
    }));

    renderer.renderKeyframe(() => ({
      from: { color: 'red' },
      to: { color: 'blue' },
    }));

    renderer.clear();

    expect(
      beautify(document.head.outerHTML, {
        indent_size: 2,
      }),
    ).toMatchSnapshot();
  });

  it('should correctly recreate nodes after clean', () => {
    const renderer = createRenderer({ devMode: true });

    const updateSubscription = createSubscription(renderer);
    renderer.subscribe(updateSubscription);

    renderer.renderRule(() => ({
      color: 'blue',
      '@media (min-width: 300px)': {
        color: 'red',
        '@media (max-height: 500px)': {
          color: 'yellow',
        },
      },
    }));

    renderer.renderKeyframe(() => ({
      from: { color: 'red' },
      to: { color: 'blue' },
    }));

    const beforeClean = document.head.outerHTML;

    renderer.clear();

    renderer.renderRule(() => ({
      color: 'blue',
      '@media (min-width: 300px)': {
        color: 'red',
        '@media (max-height: 500px)': {
          color: 'yellow',
        },
      },
    }));

    renderer.renderKeyframe(() => ({
      from: { color: 'red' },
      to: { color: 'blue' },
    }));

    expect(beforeClean === document.head.outerHTML);
    expect(
      beautify(document.head.outerHTML, {
        indent_size: 2,
      }),
    ).toMatchSnapshot();
  });

  it('should use insertRule in production', () => {
    const renderer = createRenderer();

    const updateSubscription = createSubscription(renderer);
    renderer.subscribe(updateSubscription);

    renderer.renderRule(() => ({
      color: 'blue',
      '@supports (display: flex)': {
        display: 'flex',
      },
      '@media (min-width: 300px)': {
        color: 'red',
        '@media (max-height: 500px)': {
          color: 'yellow',
          '@supports (display: grid)': {
            display: 'grid',
          },
        },
      },
    }));

    renderer.renderKeyframe(() => ({
      from: { color: 'red' },
      to: { color: 'blue' },
    }));

    const styleSheets = Object.keys(renderer.nodes).map(key => getStyleSheetStyle(renderer.nodes[key].node));

    expect(styleSheets).toMatchSnapshot();
  });
});
