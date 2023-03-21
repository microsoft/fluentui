import { resetIdsForTests, SSRProvider } from '@fluentui/react-utilities';
import { render } from '@testing-library/react';
import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { FluentProvider } from './FluentProvider';
import { isConformant } from '../../testing/isConformant';
import { teamsLightTheme } from '@fluentui/react-theme';

describe('FluentProvider', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(noop);
  });

  isConformant({
    disabledTests: ['component-handles-classname'],
    Component: FluentProvider,
    renderOptions: {
      wrapper: SSRProvider,
    },
    displayName: 'FluentProvider',
  });

  afterEach(() => {
    resetIdsForTests();
  });

  /**
   * Note: see more visual regression tests for FluentProvider in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(
      <FluentProvider theme={{ colorBrandBackground2: '#fff' }}>Default FluentProvider</FluentProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders style element with css variables if wrapped with a SSRProvider', () => {
    const { container } = render(
      <SSRProvider>
        <FluentProvider theme={{ colorNeutralBackground1: 'white', colorNeutralForeground1: 'black' }}>
          foo
        </FluentProvider>
      </SSRProvider>,
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fui-FluentProvider fui-FluentProvider1"
          dir="ltr"
        >
          <style
            class="fui-FluentProvider__serverStyle"
            id="fui-FluentProvider1"
          >
            .fui-FluentProvider1 { --colorNeutralBackground1: white; --colorNeutralForeground1: black;  }
          </style>
          foo
        </div>
      </div>
    `);
  });

  it('does not render style element with css variables if not wrapped with a SSRProvider', () => {
    const { container } = render(<FluentProvider theme={teamsLightTheme} />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fui-FluentProvider fui-FluentProvider1"
          dir="ltr"
        />
      </div>
    `);
  });

  describe('applies "dir" attribute', () => {
    it('ltr', () => {
      const { getByText } = render(<FluentProvider dir="ltr">Test</FluentProvider>);
      const element = getByText('Test');

      expect(element).toHaveAttribute('dir', 'ltr');
      expect(element).toHaveStyle({ textAlign: 'left' });
    });

    it('rtl', () => {
      const { getByText } = render(<FluentProvider dir="rtl">Test</FluentProvider>);
      const element = getByText('Test');

      expect(element).toHaveAttribute('dir', 'rtl');
      expect(element).toHaveStyle({ textAlign: 'right' });
    });
  });
});
