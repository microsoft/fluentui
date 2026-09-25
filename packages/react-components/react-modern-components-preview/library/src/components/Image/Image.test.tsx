import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Image, imageClassNames } from './';

describe('Image', () => {
  it('renders with default visual state', () => {
    render(<Image alt="Example" src="example.png" />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('data-fit', 'default');
    expect(image).toHaveAttribute('data-shape', 'square');
    expect(image).toHaveClass(imageClassNames.root);
    expect(image).not.toHaveAttribute('data-fit-fill');
  });

  it('maps visual props and preserves the consumer class name', () => {
    render(
      <Image
        alt="Styled example"
        block
        bordered
        className="custom-image"
        fit="cover"
        shadow
        shape="rounded"
        src="example.png"
      />,
    );

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('data-block');
    expect(image).toHaveAttribute('data-bordered');
    expect(image).toHaveAttribute('data-fit', 'cover');
    expect(image).toHaveAttribute('data-fit-fill');
    expect(image).toHaveAttribute('data-shadow');
    expect(image).toHaveAttribute('data-shape', 'rounded');
    expect(image).toHaveClass(imageClassNames.root, 'custom-image');
  });

  it('does not apply fit-fill sizing when an explicit dimension is provided', () => {
    render(<Image alt="Sized example" fit="contain" height={100} src="example.png" />);

    expect(screen.getByRole('img')).not.toHaveAttribute('data-fit-fill');
  });
});
