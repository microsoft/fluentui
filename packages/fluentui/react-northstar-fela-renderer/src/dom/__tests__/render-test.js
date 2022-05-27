import { html as beautify } from 'js-beautify';

import render from '../render';
import rehydrate from '../rehydrate';
import renderToMarkup from '../../server/renderToMarkup';

import createRenderer from '../../../../fela/src/createRenderer';

import getStyleSheetStyle from '../__helpers__/getStyleSheetStyle';
import cleanHead from '../__helpers__/cleanHead';

beforeEach(cleanHead);

describe('render (production)', () => {
  it('should create style nodes and render CSS rules', () => {
    const renderer = createRenderer();
    renderer.renderRule(() => ({
      backgroundColor: 'red',
      color: 'blue',
    }));
    renderer.renderKeyframe(() => ({
      '0%': {
        color: 'yellow',
      },
      '100%': {
        color: 'orange',
      },
    }));
    renderer.renderFont('Lato', ['../Lato.ttf'], {
      fontWeight: 300,
    });
    render(renderer);

    const styleSheets = Object.keys(renderer.nodes).map(key => getStyleSheetStyle(renderer.nodes[key].node));

    expect(styleSheets).toMatchSnapshot();
  });

  it('should not render multiple times', () => {
    const renderer = createRenderer();

    render(renderer);
    render(renderer);

    renderer.renderRule(() => ({
      backgroundColor: 'red',
      color: 'blue',
    }));

    const styleSheets = Object.keys(renderer.nodes).map(key => getStyleSheetStyle(renderer.nodes[key].node));

    expect(styleSheets).toMatchSnapshot();
  });

  it('should not overwrite rehydrated styles', () => {
    const serverRenderer = createRenderer({
      filterClassName: cls => cls !== 'a',
    });

    serverRenderer.renderRule(() => ({
      color: 'yellow',
      ':hover': {
        color: 'red',
      },
      '@media (max-width: 800px)': {
        color: 'blue',
      },
      '@supports (display:flex)': {
        color: 'green',
      },
    }));

    document.head.innerHTML = renderToMarkup(serverRenderer);

    const clientRenderer = createRenderer({
      filterClassName: cls => cls !== 'a',
    });

    rehydrate(clientRenderer);

    clientRenderer.renderRule(() => ({
      backgroundColor: 'red',
      ':hover': {
        color: 'red',
      },
      color: 'blue',
      '@supports (display:flex)': {
        color: 'green',
      },
      '@supports (display:grid)': {
        color: 'black',
      },
    }));

    const styleSheets = Object.keys(clientRenderer.nodes).map(key =>
      getStyleSheetStyle(clientRenderer.nodes[key].node),
    );

    expect(styleSheets).toMatchSnapshot();
  });

  it('should correctly sort rules', () => {
    const renderer = createRenderer();
    render(renderer);

    renderer.renderRule(() => ({
      color: 'blue',
      ':focus-within': {
        color: 'black',
      },
      ':hover': {
        color: 'red',
      },
      ':active': {
        color: 'yellow',
      },
    }));

    renderer.renderRule(() => ({
      color: 'red',
      ':hover': {
        color: 'blue',
      },
      ':active': {
        color: 'yellow',
      },
    }));

    const styleSheets = Object.keys(renderer.nodes).map(key => getStyleSheetStyle(renderer.nodes[key].node));

    expect(styleSheets).toMatchSnapshot();
  });
});

describe('render (development)', () => {
  it('should create style nodes and render CSS rules', () => {
    const renderer = createRenderer({ devMode: true });
    renderer.renderRule(() => ({
      backgroundColor: 'red',
      color: 'blue',
    }));
    renderer.renderKeyframe(() => ({
      '0%': {
        color: 'yellow',
      },
      '100%': {
        color: 'orange',
      },
    }));
    renderer.renderFont('Lato', ['../Lato.ttf'], {
      fontWeight: 300,
    });
    render(renderer);

    expect(
      beautify(document.documentElement.outerHTML, {
        indent_size: 2,
      }),
    ).toMatchSnapshot();
  });

  it('should not render multiple times', () => {
    const renderer = createRenderer({ devMode: true });

    render(renderer);
    render(renderer);

    renderer.renderRule(() => ({
      backgroundColor: 'red',
      color: 'blue',
    }));

    expect(
      beautify(document.documentElement.outerHTML, {
        indent_size: 2,
      }),
    ).toMatchSnapshot();
  });

  it('should not overwrite rehydrated styles', () => {
    const serverRenderer = createRenderer({
      filterClassName: cls => cls !== 'a',
      devMode: true,
    });

    serverRenderer.renderRule(() => ({
      color: 'yellow',
      ':hover': {
        color: 'red',
      },
      '@media (max-width: 800px)': {
        color: 'blue',
      },
      '@supports (display:flex)': {
        color: 'green',
      },
    }));

    document.head.innerHTML = renderToMarkup(serverRenderer);

    const clientRenderer = createRenderer({
      filterClassName: cls => cls !== 'a',
      devMode: true,
    });

    rehydrate(clientRenderer);

    clientRenderer.renderRule(() => ({
      backgroundColor: 'red',
      ':hover': {
        color: 'red',
      },
      color: 'blue',
    }));

    expect(
      beautify(document.documentElement.outerHTML, {
        indent_size: 2,
      }),
    ).toMatchSnapshot();
  });

  it('should correctly sort rules', () => {
    const renderer = createRenderer({ devMode: true });
    render(renderer);

    renderer.renderRule(() => ({
      color: 'blue',
      ':focus-within': {
        color: 'black',
      },
      ':hover': {
        color: 'red',
      },
      ':active': {
        color: 'yellow',
      },
    }));

    renderer.renderRule(() => ({
      color: 'red',
      ':hover': {
        color: 'blue',
      },
      ':active': {
        color: 'yellow',
      },
    }));

    expect(
      beautify(document.documentElement.outerHTML, {
        indent_size: 2,
      }),
    ).toMatchSnapshot();
  });
});
