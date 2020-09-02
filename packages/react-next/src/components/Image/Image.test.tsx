import { mount } from 'enzyme';
import * as React from 'react';
import { create } from '@uifabric/utilities/lib/test';
import { Image } from './Image';
import { ImageBase } from './Image.base';
import { ImageFit } from './Image.types';
import { act } from 'react-dom/test-utils';
import * as path from 'path';
import { isConformant } from '../../common/isConformant';

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
    componentPath: path.join(__dirname, 'Image.tsx'),
    Component: Image,
    displayName: 'Image',
    disabledTests: ['component-has-displayname'],
  });

  it('renders an image', done => {
    const component = mount(<ImageBase src={testImage1x1} onLoad={() => done()} />);

    act(() => {
      component.find('img').simulate('load');
    });
  });

  it('can cover a portrait (tall) frame with a square image', () => {
    const component = mount(
      <div>
        <Image src={testImage1x1} width={1} height={3} imageFit={ImageFit.cover} className="is-portraitFrame" />
      </div>,
    );

    act(() => {
      component.find('img').simulate('load');
    });
    expect(component.find('.ms-Image-image--landscape')).toHaveLength(1);
  });

  it('can cover a landscape (wide) frame with a square image', () => {
    const component = mount(
      <div>
        <Image src={testImage1x1} width={3} height={1} imageFit={ImageFit.cover} className="is-landscapeFrame" />
      </div>,
    );
    act(() => {
      component.find('img').simulate('load');
    });
    expect(component.find('.ms-Image-image--portrait')).toHaveLength(1);
  });

  it('can cover a landscape (wide) parent element with a square image', () => {
    const component = mount(
      <div style={{ width: '10px', height: '20px' }}>
        <Image className="is-frameMaximizedPortrait" imageFit={ImageFit.cover} maximizeFrame src={testImage1x1} />
      </div>,
    );

    // Manually set client height and width since there is no DOM
    Object.defineProperty(HTMLDivElement.prototype, 'clientHeight', { get: () => 10, configurable: true });
    Object.defineProperty(HTMLDivElement.prototype, 'clientWidth', { get: () => 20, configurable: true });
    act(() => {
      component.find('img').simulate('load');
    });

    expect(component.getDOMNode().querySelector('.ms-Image-image--portrait')).toBeDefined();
  });

  it('can cover a portrait (tall) parent element with a square image', () => {
    const component = mount(
      <div style={{ width: '10px', height: '20px' }}>
        <Image src={testImage1x1} imageFit={ImageFit.cover} className="is-frameMaximizedLandscape" maximizeFrame />
      </div>,
    );

    // Manually set client height and width since there is no DOM
    Object.defineProperty(HTMLDivElement.prototype, 'clientHeight', { get: () => 20, configurable: true });
    Object.defineProperty(HTMLDivElement.prototype, 'clientWidth', { get: () => 10, configurable: true });

    act(() => {
      component.find('img').simulate('load');
    });
    expect(component.getDOMNode().querySelector('.ms-Image-image--landscape')).toBeDefined();
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
    const component = mount(<ImageBase src={brokenImage} onError={() => done()} />);

    act(() => {
      component.find('img').simulate('error');
    });
  });
});
