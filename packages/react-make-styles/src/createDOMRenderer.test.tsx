import * as React from 'react';
import { hydrate } from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';

import { makeStyles } from './makeStyles';
import { RendererProvider } from './RendererContext';
import { createDOMRenderer } from '@fluentui/make-styles';
import { renderToStyleElements } from './renderToStyleElements';

describe('createDOMRenderer', () => {
  it('rehydrateCache() avoids double insertion', () => {
    const clientRenderer = createDOMRenderer({ target: document });
    const serverRenderer = createDOMRenderer({ target: (null as unknown) as undefined });

    const useExampleStyles = makeStyles({
      root: {
        animationName: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },

        color: 'red',
        '@media screen and (max-width: 992px)': { ':hover': { color: 'blue' } },
      },
    });
    const ExampleComponent: React.FC = () => {
      const classes = useExampleStyles();

      return <div className={classes.root} />;
    };

    const markup = renderToStaticMarkup(
      <RendererProvider renderer={serverRenderer}>
        <ExampleComponent />
      </RendererProvider>,
    );

    expect(document.querySelector('style')).toBe(null);

    const container = document.createElement('div');
    const stylesHTML = renderToStaticMarkup(<>{renderToStyleElements(serverRenderer)}</>);

    container.innerHTML = markup;

    document.head.innerHTML = stylesHTML;
    document.body.appendChild(container);

    const insertRules = [
      ...((document.querySelectorAll<HTMLStyleElement>('style') as unknown) as HTMLStyleElement[]),
    ].map(styleEl => jest.spyOn(styleEl.sheet, 'insertRule'));
    const rehydrateCache = jest.spyOn(clientRenderer, 'rehydrateCache');

    hydrate(
      <RendererProvider renderer={clientRenderer}>
        <ExampleComponent />
      </RendererProvider>,
      container,
    );

    expect(rehydrateCache).toHaveBeenCalled();
    insertRules.forEach(insertRule => {
      expect(insertRule).not.toHaveBeenCalled();
    });
  });
});
