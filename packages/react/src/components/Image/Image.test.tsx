import * as React from 'react';
import { create } from '@fluentui/test-utilities';
import { Image } from './Image';
import { ImageBase } from './Image.base';
import { ImageFit, ImageCoverStyle } from './Image.types';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';

/**
 * Helper function to simulate image load/error events that updates the component state
 * @param element - The image element to simulate the event on
 * @param eventType - The type of event to simulate ('load' or 'error')
 */
function simulateImageEvent(element: HTMLElement, eventType: 'load' | 'error'): void {
  act(() => {
    fireEvent[eventType](element);
  });
}

const testImage1x1 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQImWP4DwQACfsD/eNV8pwAAAAASUVORK5CYII=';
const brokenImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgFcSJAAAAC0lEQVQImWP4DwQACfsD/eNV8pwAAAAASUVORK5CYII=';

describe('Image', () => {
  beforeAll(() => {
    // Manually set image height and width since there is no DOM
    Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', { get: () => 1 });
    Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', { get: () => 1 });
  });

  it('renders Image correctly', () => {
    const component = create(<Image src={testImage1x1} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  isConformant({
    Component: Image,
    displayName: 'Image',
    // Problem: Ref is applied but not on root element
    // Solution: Ref should be applied to the root.
    disabledTests: ['component-has-root-ref'],
  });

  it('renders an image', done => {
    render(<ImageBase src={testImage1x1} onLoad={() => done()} />);
    const imgElement = screen.getByRole('img');
    simulateImageEvent(imgElement, 'load');
  });

  it('can cover a portrait (tall) frame with a square image', () => {
    const { container } = render(
      <div>
        <Image src={testImage1x1} width={1} height={3} imageFit={ImageFit.cover} className="is-portraitFrame" />
      </div>,
    );
    const imgElement = screen.getByRole('img');
    simulateImageEvent(imgElement, 'load');
    expect(container.querySelector('.ms-Image-image--landscape')).toBeTruthy();
  });

  it('can cover a landscape (wide) frame with a square image', () => {
    const { container } = render(
      <div>
        <Image src={testImage1x1} width={3} height={1} imageFit={ImageFit.cover} className="is-landscapeFrame" />
      </div>,
    );
    const imgElement = screen.getByRole('img');
    simulateImageEvent(imgElement, 'load');
    expect(container.querySelector('.ms-Image-image--portrait')).toBeTruthy();
  });

  it('can cover a landscape (wide) parent element with a square image', () => {
    const { container } = render(
      <div style={{ width: '10px', height: '20px' }}>
        <Image
          className="is-frameMaximizedPortrait"
          imageFit={ImageFit.cover}
          coverStyle={ImageCoverStyle.portrait}
          maximizeFrame
          src={testImage1x1}
        />
      </div>,
    );

    // Manually set client height and width since there is no DOM
    Object.defineProperty(HTMLDivElement.prototype, 'clientHeight', { get: () => 10, configurable: true });
    Object.defineProperty(HTMLDivElement.prototype, 'clientWidth', { get: () => 20, configurable: true });
    const imgElement = screen.getByRole('img');
    simulateImageEvent(imgElement, 'load');

    expect(container.querySelector('.ms-Image-image--portrait')).toBeTruthy();
  });

  it('can cover a portrait (tall) parent element with a square image', () => {
    const { container } = render(
      <div style={{ width: '10px', height: '20px' }}>
        <Image
          src={testImage1x1}
          imageFit={ImageFit.cover}
          coverStyle={ImageCoverStyle.landscape}
          className="is-frameMaximizedLandscape"
          maximizeFrame
        />
      </div>,
    );

    // Manually set client height and width since there is no DOM
    Object.defineProperty(HTMLDivElement.prototype, 'clientHeight', { get: () => 20, configurable: true });
    Object.defineProperty(HTMLDivElement.prototype, 'clientWidth', { get: () => 10, configurable: true });

    const imgElement = screen.getByRole('img');
    simulateImageEvent(imgElement, 'load');
    expect(container.querySelector('.ms-Image-image--landscape')).toBeTruthy();
  });

  it('renders ImageFit.centerContain correctly', () => {
    const component = create(<Image src={testImage1x1} imageFit={ImageFit.centerContain} width={50} height={100} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders ImageFit.centerCover correctly', () => {
    const component = create(<Image src={testImage1x1} imageFit={ImageFit.centerCover} width={50} height={100} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('allows onError events to be attached', done => {
    render(<ImageBase src={brokenImage} onError={() => done()} />);
    const imgElement = screen.getByRole('img');
    simulateImageEvent(imgElement, 'error');
  });
});
