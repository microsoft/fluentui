import * as React from 'react';
import * as path from 'path';
import { mount } from 'enzyme';
import { isConformant } from '@fluentui/react-conformance';
import { Button } from './Button';

describe('Button', () => {
  isConformant({
    componentPath: path.join(__dirname, 'Button.tsx'),
    Component: Button,
    displayName: 'Button',
    disabledTests: ['has-docblock'],
  });

  it('replaces slots with children if children is provided as a prop', () => {
    const component = mount(
      <Button content="Slots content" icon="X">
        Actual content
      </Button>,
    );
    expect(component.find('button').html()).toEqual('<button>Actual content</button>');
  });
});
