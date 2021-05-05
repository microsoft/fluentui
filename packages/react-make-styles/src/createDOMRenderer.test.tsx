import { createDOMRenderer } from '@fluentui/make-styles';
import * as React from 'react';
import { hydrate } from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';

import { makeStyles } from './makeStyles';
import { RendererProvider } from './RendererContext';
import { renderToStyleElements } from './renderToStyleElements';

describe('createDOMRenderer', () => {
  it('rehydrateCache() avoids double insertion', () => {
    // This test validates a scenario for Server-Side rendering

    const clientRenderer = createDOMRenderer(document);
    const serverRenderer = createDOMRenderer(
      // we should use "null" as "undefined" will fallback to "document" which is present in this environment
      (null as unknown) as undefined,
    );

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

    //
    // Server
    // A "server" renders components to static HTML that will be transferred to a client
    //

    const componentHTML = renderToStaticMarkup(
      <RendererProvider renderer={serverRenderer}>
        <ExampleComponent />
      </RendererProvider>,
    );
    const stylesHTML = renderToStaticMarkup(<>{renderToStyleElements(serverRenderer)}</>);

    // There is no DOM on a server, style nodes should not be present
    expect(document.querySelector('style')).toBe(null);

    //
    // Client
    // Creates an element to render components and inserts HTML rendered from a server
    //

    const container = document.createElement('div');
    document.body.appendChild(container);

    container.innerHTML = componentHTML;
    document.head.innerHTML = stylesHTML;

    // As all style came from a server, we should not insert any CSS on a client
    // (this tests internal implementation, but there is no other way?)
    const styleElementsBeforeHydration = document.querySelectorAll<HTMLStyleElement>('style');
    const insertRules = [...((styleElementsBeforeHydration as unknown) as HTMLStyleElement[])].map(styleEl =>
      jest.spyOn(styleEl.sheet!, 'insertRule'),
    );

    hydrate(
      // "RendererProvider" is not required there, we need it only for Jest spies
      <RendererProvider renderer={clientRenderer}>
        <ExampleComponent />
      </RendererProvider>,
      container,
    );

    const styleElementsAfterHydration = document.querySelectorAll<HTMLStyleElement>('style');

    insertRules.forEach(insertRule => {
      expect(insertRule).not.toHaveBeenCalled();
    });
    // We also would to ensure that new elements have not been inserted
    expect(styleElementsBeforeHydration.length).toBe(styleElementsAfterHydration.length);
  });
});
