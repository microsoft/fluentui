import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { MessageBar } from './MessageBar';
import { AnnounceProvider_unstable } from '@fluentui/react-shared-contexts';
import { MessageBarBody } from '../MessageBarBody/MessageBarBody';
import { MessageBarTitle } from '../MessageBarTitle/MessageBarTitle';
import { MessageBarActions } from '../MessageBarActions/MessageBarActions';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { MessageBarProps } from './MessageBar.types';

describe('MessageBar', () => {
  beforeAll(() => {
    // https://github.com/jsdom/jsdom/issues/3368
    global.ResizeObserver = class ResizeObserver {
      public observe() {
        // do nothing
      }
      public unobserve() {
        // do nothing
      }
      public disconnect() {
        // do nothing
      }
    };
  });

  beforeEach(() => {
    resetIdsForTests();
  });

  isConformant<MessageBarProps>({
    Component: MessageBar,
    displayName: 'MessageBar',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            icon: 'Icon',
            layout: 'multiline',
          },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(<MessageBar>Default MessageBar</MessageBar>);
    expect(result.container).toMatchSnapshot();
  });

  it.each([
    ['assertive', 'error'] as const,
    ['assertive', 'warning'] as const,
    ['assertive', 'success'] as const,
    ['polite', 'info'] as const,
  ])('should announce %s with %s intent', (politeness, intent) => {
    const announce = jest.fn();
    render(
      <AnnounceProvider_unstable value={{ announce }}>
        <MessageBar intent={intent}>
          <MessageBarBody>
            <MessageBarTitle>Title</MessageBarTitle>Body
          </MessageBarBody>
        </MessageBar>
      </AnnounceProvider_unstable>,
    );

    expect(announce).toHaveBeenCalledTimes(1);
    expect(announce).toHaveBeenCalledWith('TitleBody', {
      alert: politeness === 'assertive',
      polite: politeness === 'polite',
    });
  });

  it('should announce actions', () => {
    const announce = jest.fn();
    render(
      <AnnounceProvider_unstable value={{ announce }}>
        <MessageBar>
          <MessageBarBody>
            <MessageBarTitle>Title</MessageBarTitle>Body
          </MessageBarBody>
          <MessageBarActions containerAction={<button>Container action</button>}>
            <button>Action 1</button>
            <button>Action 2</button>
          </MessageBarActions>
        </MessageBar>
      </AnnounceProvider_unstable>,
    );

    expect(announce).toHaveBeenCalledTimes(1);
    expect(announce).toHaveBeenCalledWith('TitleBody,Action 1Action 2', expect.anything());
  });
});
