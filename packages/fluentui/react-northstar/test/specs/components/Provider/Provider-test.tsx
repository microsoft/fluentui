import { useFluentContext, RendererContext } from '@fluentui/react-bindings';
import { CreateRenderer, noopRenderer } from '@fluentui/react-northstar-styles-renderer';
import { ThemeInput } from '@fluentui/styles';
import { mount } from 'enzyme';
import * as React from 'react';

import { Provider } from 'src/components/Provider/Provider';
import { ProviderConsumer } from 'src/components/Provider/ProviderConsumer';
import { PortalInner } from 'src/components/Portal/PortalInner';

const createDocumentMock = (): Document => {
  const externalDocument = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
  const externalWindow: Partial<Window> = {
    ontouchstart: () => {}, // whatInput asserts for this method

    addEventListener: () => {},
    removeEventListener: () => {},
  };

  externalDocument.documentElement.appendChild(externalDocument.createElement('body'));
  // `defaultView` is read-only by spec, getter is used as workaround
  // https://github.com/facebook/jest/issues/2227#issuecomment-430435133
  jest.spyOn(externalDocument, 'defaultView', 'get').mockReturnValue(externalWindow as any);

  return externalDocument;
};

describe('Provider', () => {
  test('is exported', () => {
    expect(require('src/index.ts').Provider).toEqual(Provider);
  });

  test('has a ProviderConsumer subcomponent', () => {
    expect(require('src/index.ts').Provider.Consumer).toEqual(ProviderConsumer);
  });

  describe('overwrite', () => {
    const outerTheme = { siteVariables: { brand: 'blue' } };
    const innerTheme = { siteVariables: { secondary: 'yellow' } };

    test('do not overwrite by default', () => {
      const getContext = jest.fn();
      const Consumer: React.FC = () => {
        getContext(useFluentContext());
        return null;
      };
      mount(
        <Provider theme={outerTheme}>
          <Provider theme={innerTheme}>
            <Consumer />
          </Provider>
        </Provider>,
      );

      expect(getContext).toBeCalledWith(
        expect.objectContaining({
          theme: expect.objectContaining({
            siteVariables: {
              brand: 'blue',
              secondary: 'yellow',
              fontSizes: {},
            },
          }),
        }),
      );
    });

    test('does overwrite when is true', () => {
      const getContext = jest.fn();
      const Consumer: React.FC = () => {
        getContext(useFluentContext());
        return null;
      };
      mount(
        <Provider theme={outerTheme}>
          <Provider overwrite theme={innerTheme}>
            <Consumer />
          </Provider>
        </Provider>,
      );

      expect(getContext).toBeCalledWith(
        expect.objectContaining({
          theme: expect.objectContaining({
            siteVariables: {
              secondary: 'yellow',
              fontSizes: {},
            },
          }),
        }),
      );
    });
  });

  describe('staticStyles', () => {
    test('are executed with the merged siteVariables', () => {
      const staticStyle = jest.fn();

      mount(
        <Provider theme={{ siteVariables: { brand: 'blue', background: 'red' } }}>
          <Provider
            theme={{
              siteVariables: { brand: 'yellow', gray: '#868686' },
              staticStyles: [staticStyle],
            }}
          >
            <span />
          </Provider>
        </Provider>,
      );

      expect(staticStyle).toHaveBeenCalledWith(
        expect.objectContaining({
          background: 'red',
          brand: 'yellow',
          gray: '#868686',
        }),
      );
    });

    test('are executed only once', () => {
      const firstStaticStyle = jest.fn();
      const secondStaticStyle = jest.fn();

      const providerInstance = mount(
        <Provider theme={{ staticStyles: [firstStaticStyle] }}>
          <span />
        </Provider>,
      );
      providerInstance.setProps({ theme: { staticStyles: [secondStaticStyle] } });

      expect(firstStaticStyle).toHaveBeenCalledTimes(1);
      expect(secondStaticStyle).not.toHaveBeenCalled();
    });
  });

  describe('RTL', () => {
    test('Sets dir="rtl" on the div for RTL theme', () => {
      const component = mount(
        <Provider id="top-level-provider" rtl>
          <span />
        </Provider>,
      );
      const providerDiv = component.find('div#top-level-provider');
      expect(providerDiv.exists()).toBe(true);
      expect(providerDiv.prop('dir')).toEqual('rtl');
    });

    test('Sets dir="ltr" on the div for LTR theme', () => {
      const component = mount(
        <Provider id="top-level-provider">
          <span />
        </Provider>,
      );
      const providerDiv = component.find('div#top-level-provider');
      expect(providerDiv.exists()).toBe(true);
      expect(providerDiv.prop('dir')).toEqual('ltr');
    });

    const parentChildMatrix = [
      {
        parentIsRtl: true,
        childIsRtl: true,
        expectedChildDir: undefined,
      },
      {
        parentIsRtl: true,
        childIsRtl: undefined,
        expectedChildDir: undefined,
      },
      {
        parentIsRtl: true,
        childIsRtl: false,
        expectedChildDir: 'ltr',
      },
      {
        parentIsRtl: false,
        childIsRtl: false,
        expectedChildDir: undefined,
      },
      {
        parentIsRtl: false,
        childIsRtl: undefined,
        expectedChildDir: undefined,
      },
      {
        parentIsRtl: false,
        childIsRtl: true,
        expectedChildDir: 'rtl',
      },
    ];

    parentChildMatrix.forEach(({ parentIsRtl, childIsRtl, expectedChildDir }) => {
      test(`Nested providers: parent is RTL: ${parentIsRtl}, child is RTL: ${childIsRtl}, expected child dir: ${expectedChildDir}`, () => {
        const component = mount(
          <Provider rtl={parentIsRtl}>
            <Provider id="nested-provider" rtl={childIsRtl}>
              <span />
            </Provider>
          </Provider>,
        );
        const nestedProviderDiv = component.find('div#nested-provider');
        expect(nestedProviderDiv.exists()).toBe(true);
        expect(nestedProviderDiv.prop('dir')).toEqual(expectedChildDir);
      });
    });
  });

  describe('calls provided renderer', () => {
    //
    // We don't support changing renderer on the fly.
    // So mocks for `target` are required to create a new renderer.
    //

    test('calls renderFont', () => {
      const theme: ThemeInput = {
        fontFaces: [
          {
            name: 'Segoe UI',
            paths: ['public/fonts/segoe-ui-regular.woff2'],
            props: { fontWeight: 400 },
          },
        ],
      };

      const renderFont = jest.fn();
      const createRenderer: CreateRenderer = () => ({
        ...noopRenderer,
        renderFont,
      });

      mount(
        <RendererContext.Provider value={createRenderer}>
          <Provider theme={theme} target={createDocumentMock()}>
            <div />
          </Provider>
        </RendererContext.Provider>,
      );

      expect(renderFont).toHaveBeenCalled();
    });
  });

  test('calls renderStatic', () => {
    const theme: ThemeInput = {
      staticStyles: [
        {
          a: {
            textDecoration: 'none',
          },
        },
      ],
    };
    const renderGlobal = jest.fn();

    const createRenderer: CreateRenderer = () => ({
      ...noopRenderer,
      renderGlobal,
    });

    mount(
      <RendererContext.Provider value={createRenderer}>
        <Provider theme={theme} target={createDocumentMock()}>
          <div />
        </Provider>
      </RendererContext.Provider>,
    );

    expect(renderGlobal).toHaveBeenCalled();
  });

  describe('target', () => {
    test('performs whatinput init on first Provider mount', () => {
      const externalDocument = createDocumentMock();

      const addEventListener = jest.spyOn(externalDocument.defaultView, 'addEventListener');
      const setAttribute = jest.spyOn(externalDocument.documentElement, 'setAttribute');

      mount(
        <Provider id="first-provider" target={externalDocument}>
          <Provider id="second-provider" target={externalDocument}>
            <div />
          </Provider>
        </Provider>,
      );

      // mousedown + touchstart + touchend + keyup + keydown
      expect(addEventListener).toHaveBeenCalledTimes(5);
      expect(setAttribute).toHaveBeenCalledWith('data-whatinput', expect.any(String));
    });

    test('performs whatinput cleanup on last Provider unmount', () => {
      const externalDocument = createDocumentMock();
      const removeEventListener = jest.spyOn(externalDocument.defaultView, 'removeEventListener');

      const wrapper = mount(
        <Provider id="first-provider" target={externalDocument}>
          <Provider id="second-provider" target={externalDocument}>
            <div />
          </Provider>
        </Provider>,
      );
      wrapper.unmount();

      // mousedown + touchstart + touchend + keyup + keydown
      expect(removeEventListener).toHaveBeenCalledTimes(5);
    });
  });

  describe('document.body', () => {
    it('adds an element to document.body', () => {
      const className = 'a-sample-classname';
      const wrapper = mount(
        <Provider className={className}>
          <div />
        </Provider>,
      );

      expect(document.querySelector(`.${className}`)).toBeInTheDocument();

      // element should be removed on unmount
      wrapper.unmount();
      expect(document.querySelector(`.${className}`)).not.toBeInTheDocument();
    });

    it('reacts on "className" update and keeps node in HTML tree', () => {
      const className = 'a-sample-classname';
      const wrapper = mount(
        <Provider className="foo">
          <PortalInner>
            <div id="sample" />
          </PortalInner>
        </Provider>,
      );

      expect(document.querySelector(`.${className}`)).toBeInTheDocument();
      expect(document.querySelector(`.${className} #sample`)).toBeInTheDocument();

      const newClassName = 'an-another-classname';
      wrapper.setProps({ className: newClassName });

      expect(document.querySelector(`.${className}`)).not.toBeInTheDocument();
      expect(document.querySelector(`.${newClassName}`)).toBeInTheDocument();
      expect(document.querySelector(`.${newClassName} #sample`)).toBeInTheDocument();
    });
  });
});
