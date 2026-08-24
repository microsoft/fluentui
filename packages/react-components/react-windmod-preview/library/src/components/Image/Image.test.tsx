import * as React from 'react';
import { render } from '@testing-library/react';

import { Image } from './Image';
import { isConformant } from '../../testing/isConformant';
import type { ImageState } from './Image.types';
import { imageClassNames, useImageStyles } from './useImageStyles';

import styles from './Image.module.css';

const src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

describe('Image', () => {
  isConformant({
    Component: Image,
    displayName: 'Image',
    requiredProps: { alt: '', src },
  });

  it('stamps the marker class', () => {
    const { getByTestId } = render(<Image data-testid="root" alt="" src={src} />);

    const root = getByTestId('root');

    expect(root.className).toContain(imageClassNames.root);
    expect(root).toHaveClass('fui-image');
    expect(root).toHaveClass('group/fui-image');
    expect(root.classList[0]).toBe('fui-image');
  });

  it('stamps no data attribute — every look prop resolves to a class', () => {
    const { getByTestId } = render(
      <Image data-testid="root" alt="" src={src} block bordered shadow fit="cover" shape="circular" />,
    );

    const root = getByTestId('root');

    expect(root.hasAttribute('data-block')).toBe(false);
    expect(root.hasAttribute('data-bordered')).toBe(false);
    expect(root.hasAttribute('data-fit')).toBe(false);
    expect(root.hasAttribute('data-shadow')).toBe(false);
    expect(root.hasAttribute('data-shape')).toBe(false);
  });

  it('renders an img and passes the intrinsic attributes through', () => {
    const { getByTestId } = render(<Image data-testid="root" alt="Alt" src={src} width={40} height={20} />);

    const root = getByTestId('root');

    expect(root.tagName).toBe('IMG');
    expect(root.getAttribute('src')).toBe(src);
    expect(root.getAttribute('alt')).toBe('Alt');
    expect(root.getAttribute('width')).toBe('40');
    expect(root.getAttribute('height')).toBe('20');
  });

  it('adds the boolean look classes only when the prop is on', () => {
    // The css-module proxy answers every key, so these pin the lookup keys, not class existence.
    const { getByTestId } = render(
      <>
        <Image data-testid="plain" alt="" src={src} />
        <Image data-testid="decorated" alt="" src={src} block bordered shadow />
      </>,
    );

    expect(getByTestId('plain')).not.toHaveClass(styles.block);
    expect(getByTestId('plain')).not.toHaveClass(styles.bordered);
    expect(getByTestId('plain')).not.toHaveClass(styles.shadow);
    expect(getByTestId('decorated')).toHaveClass(styles.block);
    expect(getByTestId('decorated')).toHaveClass(styles.bordered);
    expect(getByTestId('decorated')).toHaveClass(styles.shadow);
  });

  it('adds one shape class at a time', () => {
    const { getByTestId } = render(
      <>
        <Image data-testid="circular" alt="" src={src} shape="circular" />
        <Image data-testid="rounded" alt="" src={src} shape="rounded" />
      </>,
    );

    expect(getByTestId('circular')).toHaveClass(styles.circular);
    expect(getByTestId('circular')).not.toHaveClass(styles.rounded);
    expect(getByTestId('rounded')).toHaveClass(styles.rounded);
    expect(getByTestId('rounded')).not.toHaveClass(styles.circular);
  });

  it('looks up the root and fit classes by the keys the stylesheet authors', () => {
    const { getByTestId } = render(
      <>
        <Image data-testid="center" alt="" src={src} fit="center" />
        <Image data-testid="contain" alt="" src={src} fit="contain" />
        <Image data-testid="cover" alt="" src={src} fit="cover" />
        <Image data-testid="none" alt="" src={src} fit="none" />
      </>,
    );

    expect(getByTestId('center')).toHaveClass(styles.root);
    expect(getByTestId('center')).toHaveClass(styles.center);
    expect(getByTestId('contain')).toHaveClass(styles.contain);
    expect(getByTestId('cover')).toHaveClass(styles.cover);
    expect(getByTestId('cover')).not.toHaveClass(styles.contain);
    expect(getByTestId('none')).toHaveClass(styles.none);
  });

  it('applies fit-fill only for a non-default fit with no explicit size', () => {
    const { getByTestId } = render(
      <>
        <Image data-testid="cover" alt="" src={src} fit="cover" />
        <Image data-testid="default" alt="" src={src} />
        <Image data-testid="width" alt="" src={src} fit="cover" width={60} />
        <Image data-testid="height" alt="" src={src} fit="cover" height={40} />
        <Image data-testid="both" alt="" src={src} fit="cover" width={60} height={40} />
      </>,
    );

    expect(getByTestId('cover')).toHaveClass(styles.fitFill);
    expect(getByTestId('default')).not.toHaveClass(styles.fitFill);
    expect(getByTestId('width')).not.toHaveClass(styles.fitFill);
    expect(getByTestId('height')).not.toHaveClass(styles.fitFill);
    expect(getByTestId('both')).not.toHaveClass(styles.fitFill);
  });

  it('counts a zero size as explicit and a null size as absent', () => {
    const { getByTestId } = render(
      <>
        <Image data-testid="zero" alt="" src={src} fit="cover" width={0} />
        <Image data-testid="null" alt="" src={src} fit="cover" width={null as never} height={null as never} />
      </>,
    );

    expect(getByTestId('zero')).not.toHaveClass(styles.fitFill);
    expect(getByTestId('null')).toHaveClass(styles.fitFill);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      block: false,
      bordered: true,
      components: { root: 'img' },
      fit: 'cover',
      root: { as: 'img', alt: '', className: 'consumer', src },
      shadow: true,
      shape: 'circular',
    } as unknown as ImageState;

    const styled = useImageStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root.className).toBe('consumer');
    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(imageClassNames.root);
  });
});
