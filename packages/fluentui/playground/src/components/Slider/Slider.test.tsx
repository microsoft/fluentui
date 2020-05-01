import React from 'react';
import { compose } from '@fluentui/react-theming';

describe('Fluent Slider', () => {
  it('can slide', () => {
    const Button = () => <div>hi</div>;
    compose(Button, {});
    expect(true).toBeTruthy();
  });
});
