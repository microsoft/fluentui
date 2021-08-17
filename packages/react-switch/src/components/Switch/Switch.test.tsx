import * as React from 'react';
import { Switch } from './Switch';
import { render } from '@testing-library/react';

describe('Switch', () => {
  it('renders a basic Switch', () => {
    const renderedComponent = render(<Switch>Default Checkbox</Switch>);
    expect(renderedComponent.container).toMatchSnapshot();
    renderedComponent.unmount();
  });
});
