import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { BreadcrumbDivider } from './BreadcrumbDivider';
import { isConformant } from '../../testing/isConformant';
import { useBreadcrumbDividerBase_unstable } from './useBreadcrumbDivider';

describe('BreadcrumbDivider', () => {
  isConformant({
    Component: BreadcrumbDivider,
    displayName: 'BreadcrumbDivider',
  });

  it('renders a default state', () => {
    const result = render(<BreadcrumbDivider />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <li
          aria-hidden="true"
          class="fui-BreadcrumbDivider"
        >
          <svg
            aria-hidden="true"
            class="fui-Icon"
            data-fui-icon=""
            fill="currentColor"
            height="1em"
            viewBox="0 0 20 20"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.65 4.15c.2-.2.5-.2.7 0l5.49 5.46c.21.22.21.57 0 .78l-5.49 5.47a.5.5 0 0 1-.7-.71L12.8 10 7.65 4.85a.5.5 0 0 1 0-.7"
              fill="currentColor"
            />
          </svg>
        </li>
      </div>
    `);
  });

  it('forwards native attributes not in the old allow-list', () => {
    const { container } = render(<BreadcrumbDivider autoCapitalize="off" />);

    expect((container.firstElementChild as HTMLElement).getAttribute('autocapitalize')).toBe('off');
  });
});

describe('useBreadcrumbDividerBase_unstable base hook', () => {
  it('sets aria-hidden on the root slot', () => {
    const { result } = renderHook(() => useBreadcrumbDividerBase_unstable({}, React.createRef()));

    expect(result.current.root).toMatchObject({
      'aria-hidden': true,
    });
  });
});
