import * as React from 'react';
import { render } from '@testing-library/react';
import { Progress } from './Progress';
import { isConformant } from '../../common/isConformant';

describe('Progress', () => {
  isConformant({
    Component: Progress,
    displayName: 'Progress',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            label: 'Test Label',
            description: 'Test Description',
          },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(<Progress>Default Progress</Progress>);
    expect(result.container).toMatchSnapshot();
  });
  it('has role progressbar', () => {
    const result = render(<Progress />);
    expect(result.getByRole('progressbar')).toBeDefined();
  });
  it('does not add aria attributes for indeterminate', () => {
    const result = render(<Progress />);
    expect(result.container.getElementsByClassName('fui-Progress__bar')[0].getAttribute('aria-valuenow')).toBeFalsy();
    expect(result.container.getElementsByClassName('fui-Progress__bar')[0].getAttribute('aria-valuemax')).toBeFalsy();
    expect(result.container.getElementsByClassName('fui-Progress__bar')[0].getAttribute('aria-valuemin')).toBeFalsy();
  });
  it('adds aria attributes for determinate', () => {
    const result = render(<Progress value={0.52} />);
    expect(result.container.getElementsByClassName('fui-Progress__bar')[0].getAttribute('aria-valuenow')).toEqual(
      '0.52',
    );
    expect(result.container.getElementsByClassName('fui-Progress__bar')[0].getAttribute('aria-valuemin')).toEqual('0');
    expect(result.container.getElementsByClassName('fui-Progress__bar')[0].getAttribute('aria-valuemax')).toEqual('1');
  });
});
