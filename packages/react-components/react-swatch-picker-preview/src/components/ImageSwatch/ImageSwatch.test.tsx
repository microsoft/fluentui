import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { ImageSwatch } from './ImageSwatch';

describe('ImageSwatch', () => {
  isConformant({
    Component: ImageSwatch,
    displayName: 'ImageSwatch',
  });

  it('renders a default state', () => {
    const result = render(<ImageSwatch src="path/img.png" value="img" />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          aria-checked="false"
          class="fui-ImageSwatch"
          role="radio"
          style="background-image: url(path/img.png);"
        />
      </div>
    `);
  });
});
