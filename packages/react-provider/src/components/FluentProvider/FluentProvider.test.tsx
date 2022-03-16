import { resetIdsForTests } from '@fluentui/react-utilities';
import { TextDirectionProvider } from '@griffel/react';
import * as React from 'react';
import { FluentProvider } from './FluentProvider';
import * as renderer from 'react-test-renderer';
import { isConformant } from '../../common/isConformant';
import { ProviderContext } from '@fluentui/react-shared-contexts';

describe('FluentProvider', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(noop);
  });

  isConformant({
    disabledTests: ['component-handles-classname'],
    Component: FluentProvider,
    displayName: 'FluentProvider',
    helperComponents: [ProviderContext.Provider, TextDirectionProvider],
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
});
