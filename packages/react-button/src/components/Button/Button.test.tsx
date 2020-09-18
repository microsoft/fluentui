import * as React from 'react';
import * as path from 'path';
import { isConformant } from '@fluentui/react-conformance';
import { Button as ButtonComponent } from './Button';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import { MergeStylesProvider } from '@fluentui/react-theme-provider';
import { ButtonProps } from './Button.types';

/** Use merge-styles provider to ensure styles show up in snapshots. */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <MergeStylesProvider>
    <ButtonComponent {...props} ref={ref} />
  </MergeStylesProvider>
));

describe('Button', () => {
  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  isConformant({
    componentPath: path.join(__dirname, 'Button.tsx'),
    Component: ButtonComponent,
    displayName: 'Button',
    disabledTests: ['has-docblock', 'as-renders-html', 'as-passes-as-value', 'as-renders-react-class', 'as-renders-fc'],
  });

  /**
   * Note: see more visual regression tests for Button in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<Button>Default button</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders anchor when href prop is provided', () => {
    const component = renderer.create(<Button href="https://www.bing.com">Default button</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can be focused', () => {
    const rootRef = React.createRef<HTMLButtonElement>();

    wrapper = mount(<Button ref={rootRef}>Focus me</Button>);

    expect(typeof rootRef.current).toEqual('object');
    expect(document.activeElement).not.toEqual(rootRef.current);

    rootRef.current?.focus();

    expect(document.activeElement).toEqual(rootRef.current);
  });
});
