import * as React from 'react';
import { render } from '@testing-library/react';
import { DrawerHeaderTitle } from './DrawerHeaderTitle';
import { isConformant } from '../../testing/isConformant';
import type { ExtractSlotProps, SlotRenderFunction } from '@fluentui/react-utilities';
import type { DrawerHeaderTitleProps, DrawerHeaderTitleSlots } from './DrawerHeaderTitle.types';
import { drawerHeaderTitleClassNames } from './useDrawerHeaderTitleStyles.styles';

describe('DrawerHeaderTitle', () => {
  isConformant<DrawerHeaderTitleProps>({
    Component: DrawerHeaderTitle,
    displayName: 'DrawerHeaderTitle',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            action: 'Action',
          },
          expectedClassNames: {
            root: drawerHeaderTitleClassNames.root,
            heading: drawerHeaderTitleClassNames.heading,
            action: drawerHeaderTitleClassNames.action,
          },
        },
      ],
    },
    disabledTests: ['component-has-static-classnames-object'],
  });

  it('renders a default state', () => {
    const result = render(<DrawerHeaderTitle>Default DrawerHeaderTitle</DrawerHeaderTitle>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fui-DrawerHeaderTitle"
        >
          <h2
            class="fui-DrawerHeaderTitle__heading fui-DialogTitle"
          >
            Default DrawerHeaderTitle
          </h2>
        </div>
      </div>
    `);
  });

  it('renders action', () => {
    const result = render(<DrawerHeaderTitle action={'Test'}>Default DrawerHeaderTitle</DrawerHeaderTitle>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fui-DrawerHeaderTitle"
        >
          <h2
            class="fui-DrawerHeaderTitle__heading fui-DialogTitle"
          >
            Default DrawerHeaderTitle
          </h2>
          <div
            class="fui-DrawerHeaderTitle__action fui-DialogTitle__action"
          >
            Test
          </div>
        </div>
      </div>
    `);
  });
});

describe('DrawerHeaderTitle DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      <DrawerHeaderTitle heading={{ as: 'h3' }} action={<button>Close</button>}>
        Title
      </DrawerHeaderTitle>,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual(['class']);
  });
});

describe('DrawerHeaderTitle root render function', () => {
  it('runs a root render function passed as children alongside an explicit heading', () => {
    const renderRoot: SlotRenderFunction<ExtractSlotProps<DrawerHeaderTitleSlots['root']>> = (Component, props) => (
      <section data-testid="custom-root">
        <Component {...props} />
      </section>
    );
    const { container } = render(<DrawerHeaderTitle heading="Title">{renderRoot}</DrawerHeaderTitle>);

    const customRoot = container.firstElementChild as HTMLElement;
    expect(customRoot.tagName).toBe('SECTION');
    expect(customRoot.getAttribute('data-testid')).toBe('custom-root');
    expect(customRoot.querySelector('h2')?.textContent).toBe('Title');
  });

  it('does not forward dangerouslySetInnerHTML to the root, which renders composed children', () => {
    const { container } = render(
      <DrawerHeaderTitle dangerouslySetInnerHTML={{ __html: 'Injected' }}>Title</DrawerHeaderTitle>,
    );

    expect((container.firstElementChild as HTMLElement).textContent).toBe('Title');
  });
});
