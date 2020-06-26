import * as React from 'react';
import * as path from 'path';
import * as renderer from 'react-test-renderer';
import { isConformant } from '@fluentui/react-conformance';
import { Button } from './Button';

describe('Button', () => {
  isConformant({
    componentPath: path.join(__dirname, 'Button.tsx'),
    Component: Button,
    displayName: 'Button',
    disabledTests: ['has-docblock'],
  });

  it('Correctly renders a button', () => {
    const component = renderer.create(<Button icon="X">Hello, world</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
