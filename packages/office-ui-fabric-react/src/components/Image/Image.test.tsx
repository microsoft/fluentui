import { mount } from 'enzyme';
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import { Image } from './Image';
import { ImageBase } from './Image.base';
import { ImageFit } from './Image.types';

/* tslint:disable:no-unused-variable */
const testImage1x1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQImWP4DwQACfsD/eNV8pwAAAAASUVORK5CYII=';
const brokenImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgFcSJAAAAC0lEQVQImWP4DwQACfsD/eNV8pwAAAAASUVORK5CYII=';

describe('Image', () => {
  beforeAll(() => {
    // Manually set image height and width since there is no DOM
    Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', { get: () => 1 });
    Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', { get: () => 1 });
  });

  it('renders Image correctly', () => {
    const component = renderer.create(<Image src={testImage1x1} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an image', done => {
    const component = ReactTestUtils.renderIntoDocument(
      <ImageBase
        src={testImage1x1}
        // tslint:disable-next-line:jsx-no-lambda
        onLoad={() => done()}
      />
    );

    const image = ReactTestUtils.findRenderedDOMComponentWithTag(component as any, 'img');
    ReactTestUtils.Simulate.load(image);
  });

  it('can cover a portrait (tall) frame with a square image', () => {
    const component = mount(
      <div>
        <Image src={testImage1x1} width={1} height={3} imageFit={ImageFit.cover} className="is-portraitFrame" />
      </div>
    );

    component.find('img').simulate('load');
    expect(component.find('.ms-Image-image--landscape')).toHaveLength(1);
  });

  it('can cover a landscape (wide) frame with a square image', () => {
    const component = mount(
      <div>
        <Image src={testImage1x1} width={3} height={1} imageFit={ImageFit.cover} className="is-landscapeFrame" />
      </div>
    );
    component.find('img').simulate('load');
    expect(component.find('.ms-Image-image--portrait')).toHaveLength(1);
  });

  it('can cover a landscape (wide) parent element with a square image', () => {
    const component = mount(
      <div style={{ width: '10px', height: '20px' }}>
        <Image className="is-frameMaximizedPortrait" imageFit={ImageFit.cover} maximizeFrame src={testImage1x1} />
      </div>
    );

    // Manually set client height and width since there is no DOM
    Object.defineProperty(HTMLDivElement.prototype, 'clientHeight', { get: () => 10, configurable: true });
    Object.defineProperty(HTMLDivElement.prototype, 'clientWidth', { get: () => 20, configurable: true });
    component.find('img').simulate('load');

    expect(component.update().find('.ms-Image-image--portrait')).toHaveLength(1);
  });

  it('can cover a portrait (tall) parent element with a square image', () => {
    const component = mount(
      <div style={{ width: '10px', height: '20px' }}>
        <Image src={testImage1x1} imageFit={ImageFit.cover} className="is-frameMaximizedLandscape" maximizeFrame />
      </div>
    );

    // Manually set client height and width since there is no DOM
    Object.defineProperty(HTMLDivElement.prototype, 'clientHeight', { get: () => 20, configurable: true });
    Object.defineProperty(HTMLDivElement.prototype, 'clientWidth', { get: () => 10, configurable: true });

    component.find('img').simulate('load');
    expect(component.update().find('.ms-Image-image--landscape')).toHaveLength(1);
  });

  it('renders ImageFit.centerContain correctly', () => {
    const component = renderer.create(<Image src={testImage1x1} imageFit={ImageFit.centerContain} width={50} height={100} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders ImageFit.centerCover correctly', () => {
    const component = renderer.create(<Image src={testImage1x1} imageFit={ImageFit.centerCover} width={50} height={100} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('allows onError events to be attached', done => {
    const component = ReactTestUtils.renderIntoDocument(
      <ImageBase
        src={brokenImage}
        // tslint:disable-next-line:jsx-no-lambda
        onError={() => done()}
      />
    );

    const img = ReactTestUtils.findRenderedDOMComponentWithTag(component as any, 'img');
    ReactTestUtils.Simulate.error(img);
  });
});
