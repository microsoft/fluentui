import { ComponentStyleFunctionParam, emptyTheme, ThemeInput } from '@fluentui/styles';
import * as React from 'react';
import { mount } from 'enzyme';

import { Provider } from 'src/components/Provider/Provider';
import { ProviderConsumer } from 'src/components/Provider/ProviderConsumer';

const styleParam: ComponentStyleFunctionParam = {
  disableAnimations: false,
  props: {},
  rtl: false,
  theme: emptyTheme,
  variables: {},
};

describe('ProviderConsumer', () => {
  test('is exported', () => {
    expect(require('src/index.ts').ProviderConsumer).toEqual(ProviderConsumer);
  });

  test('is a subcomponent of the Provider', () => {
    expect(Provider.Consumer).toEqual(ProviderConsumer);
  });

  describe('render', () => {
    test('is a callback that receives the prepared theme', () => {
      expect.assertions(11);

      const inputTheme: ThemeInput = {
        siteVariables: { a: 'b' },
        componentVariables: { Button: { color: 'red' } },
        componentStyles: { Button: { root: { color: 'red' } } },
        fontFaces: [{ name: 'name', paths: ['path.woff2'], props: { fontWeight: 400 } }],
        staticStyles: ['body{margin:0;}', { body: { margin: 0 } }],
      };

      mount(
        <Provider theme={inputTheme}>
          <Provider.Consumer
            render={preparedTheme => {
              // siteVariables
              expect(preparedTheme).toHaveProperty('siteVariables.a', 'b');

              // componentVariables
              expect(preparedTheme).toHaveProperty('componentVariables.Button');
              expect(preparedTheme.componentVariables.Button).toBeInstanceOf(Function);
              expect(preparedTheme.componentVariables.Button()).toMatchObject(inputTheme.componentVariables.Button);

              // componentStyles
              expect(preparedTheme).toHaveProperty('componentStyles.Button.root');
              expect(preparedTheme.componentStyles.Button.root).toBeInstanceOf(Function);
              expect(preparedTheme.componentStyles.Button.root(styleParam)).toMatchObject(
                inputTheme.componentStyles.Button.root,
              );

              // fontFaces
              expect(preparedTheme).toHaveProperty('fontFaces');
              expect(preparedTheme.fontFaces).toMatchObject(inputTheme.fontFaces);

              // staticStyles
              expect(preparedTheme).toHaveProperty('staticStyles');
              expect(preparedTheme.staticStyles).toMatchObject(inputTheme.staticStyles);

              return null;
            }}
          />
        </Provider>,
      );
    });
  });
});
