/**
 * @jest-environment node
 */

// 👆 this is intentionally to test in SSR like environment

import { createDOMRenderer } from '@fluentui/make-styles';
import * as prettier from 'prettier';
import * as React from 'react';
import * as ReactDOM from 'react-dom/server';

import { makeStyles } from './makeStyles';
import { RendererProvider } from './RendererContext';
import { renderToStyleElements } from './renderToStyleElements';

expect.addSnapshotSerializer({
  test(value) {
    return typeof value === 'string';
  },
  print(value: string) {
    return prettier.format(value, { parser: 'html' }).trim();
  },
});

describe('renderToStyleElements', () => {
  it('supports overrides', () => {
    const useExampleStyles = makeStyles({
      root: {
        color: 'red',
        ':hover': { color: 'pink' },
      },
    });
    const ExampleComponent: React.FC = () => {
      const classes = useExampleStyles();

      return <div className={classes.root} />;
    };

    const renderer = createDOMRenderer();

    ReactDOM.renderToStaticMarkup(
      <RendererProvider renderer={renderer}>
        <ExampleComponent />
      </RendererProvider>,
    );

    expect(ReactDOM.renderToStaticMarkup(<>{renderToStyleElements(renderer)}</>)).toMatchInlineSnapshot(`
      <style data-make-styles-bucket="default" data-make-styles-rehydration="true">
        .fe3e8s9 {
          color: red;
        }</style
      ><style data-make-styles-bucket="h" data-make-styles-rehydration="true">
        .f14hep94:hover {
          color: pink;
        }
      </style>
    `);
  });

  it('handles @at rules', () => {
    const useExampleStyles = makeStyles({
      media: {
        '@media screen and (max-width: 992px)': {
          ':hover': { color: 'blue' },
        },
      },
    });
    const ExampleComponent: React.FC = () => {
      const classes = useExampleStyles();

      return <div className={classes.media} />;
    };

    const renderer = createDOMRenderer();

    ReactDOM.renderToStaticMarkup(
      <RendererProvider renderer={renderer}>
        <ExampleComponent />
      </RendererProvider>,
    );

    expect(ReactDOM.renderToStaticMarkup(<>{renderToStyleElements(renderer)}</>)).toMatchInlineSnapshot(`
      <style data-make-styles-bucket="t" data-make-styles-rehydration="true">
        @media screen and (max-width: 992px) {
          .fnao3vb:hover {
            color: blue;
          }
        }
      </style>
    `);
  });

  it('handles keyframes', () => {
    const useExampleStyles = makeStyles({
      keyframe: {
        animationName: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
      },
    });
    const ExampleComponent: React.FC = () => {
      const classes = useExampleStyles();

      return <div className={classes.keyframe} />;
    };

    const renderer = createDOMRenderer();

    ReactDOM.renderToStaticMarkup(
      <RendererProvider renderer={renderer}>
        <ExampleComponent />
      </RendererProvider>,
    );

    expect(ReactDOM.renderToStaticMarkup(<>{renderToStyleElements(renderer)}</>)).toMatchInlineSnapshot(`
      <style data-make-styles-bucket="default" data-make-styles-rehydration="true">
        .f1g6ul6r {
          -webkit-animation-name: f1q8eu9e;
          animation-name: f1q8eu9e;
        }</style
      ><style data-make-styles-bucket="k" data-make-styles-rehydration="true">
        @-webkit-keyframes f1q8eu9e {
          from {
            -webkit-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          to {
            -webkit-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
        @keyframes f1q8eu9e {
          from {
            -webkit-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          to {
            -webkit-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
      </style>
    `);
  });
});
