import * as React from 'react';
import { render } from '@testing-library/react';

import { TagItem } from './TagItem';
import { resetIds } from '@fluentui/utilities';
import { FontIcon } from '../../Icon';

describe('TagItem', () => {
  beforeEach(() => {
    resetIds();
  });

  it('renders correctly', () => {
    const { container } = render(
      <TagItem item={{ name: 'Red', key: 'red' }} index={0}>
        Red color
      </TagItem>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('defaults title to item name for non string children', () => {
    const { container } = render(
      <TagItem item={{ name: 'Red', key: 'red' }} index={0}>
        <FontIcon iconName="SquareShapeSolid" style={{ color: 'red' }} />
      </TagItem>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('accepts title override', () => {
    const { container } = render(
      <TagItem item={{ name: 'Red', key: 'red' }} title="Red color" index={0}>
        Red
      </TagItem>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('accepts remove-button-data-id', () => {
    const { container } = render(
      <TagItem item={{ name: 'Red', key: 'red' }} index={0} removeButtonProps={{ 'data-id': 'close-red-x' }}>
        Red color
      </TagItem>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
