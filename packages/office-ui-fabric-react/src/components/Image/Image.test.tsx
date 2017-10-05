/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import { shallow, mount, ReactWrapper } from 'enzyme';

import { Image } from './Image';
import { ImageFit, ImageLoadState } from './Image.Props';

/* tslint:disable:no-unused-variable */
const testImage1x1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQImWP4DwQACfsD/eNV8pwAAAAASUVORK5CYII=';
const testImage1x2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWP4////fyYGBgYGAB32A/+PRyXoAAAAAElFTkSuQmCC';
const testImage2x1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAEUlEQVQImWP8////fwYGBgYAGfgD/hEzDhoAAAAASUVORK5CYII=';
const brokenImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgFcSJAAAAC0lEQVQImWP4DwQACfsD/eNV8pwAAAAASUVORK5CYII=';

describe('Image', () => {
  beforeAll(() => {
    // Manually set image height and width since there is no DOM
    Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', { get: () => 1 });
    Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', { get: () => 1 });
  });

  it('renders an image', (done) => {
    let component = ReactTestUtils.renderIntoDocument(
      <Image
        src={ testImage1x1 }
        onLoad={ () => done() }
      />
    );

    let image = ReactTestUtils.findRenderedDOMComponentWithTag(component as any, 'img');
    ReactTestUtils.Simulate.load(image);

  });

  it('can cover a portrait (tall) frame with a square image', () => {
    let component = mount(
      <div>
        <Image
          src={ testImage1x1 }
          width={ 1 }
          height={ 3 }
          imageFit={ ImageFit.cover }
          className='is-portraitFrame'
        />
      </div>
    );

    component.find('img').simulate('load');
    expect(component.find('.ms-Image-image--landscape')).toHaveLength(1);
  });

  it('can cover a landscape (wide) frame with a square image', () => {
    let component = mount(
      <div>
        <Image
          src={ testImage1x1 }
          width={ 3 }
          height={ 1 }
          imageFit={ ImageFit.cover }
          className='is-landscapeFrame'

        />
      </div>
    );
    component.find('img').simulate('load');
    expect(component.find('.ms-Image-image--portrait')).toHaveLength(1);
  });

  it('can cover a landscape (wide) parent element with a square image', () => {
    let component = mount(
      <div style={ { width: '10px', height: '20px' } }>
        <Image
          className='is-frameMaximizedPortrait'
          imageFit={ ImageFit.cover }
          maximizeFrame
          src={ testImage1x1 }
        />
      </div>);

    // Manually set client height and width since there is no DOM
    Object.defineProperty(HTMLDivElement.prototype, 'clientHeight', { get: () => 10, configurable: true });
    Object.defineProperty(HTMLDivElement.prototype, 'clientWidth', { get: () => 20, configurable: true });
    component.find('img').simulate('load');

    expect(component.update().find('.ms-Image-image--portrait')).toHaveLength(1);
  });

  it('can cover a portrait (tall) parent element with a square image', () => {
    let component = mount(
      <div style={ { width: '10px', height: '20px' } }>
        <Image
          src={ testImage1x1 }
          imageFit={ ImageFit.cover }
          className='is-frameMaximizedLandscape'
          maximizeFrame
        />
      </div>
    );

    // Manually set client height and width since there is no DOM
    Object.defineProperty(HTMLDivElement.prototype, 'clientHeight', { get: () => 20, configurable: true });
    Object.defineProperty(HTMLDivElement.prototype, 'clientWidth', { get: () => 10, configurable: true });

    component.find('img').simulate('load');
    expect(component.update().find('.ms-Image-image--landscape')).toHaveLength(1);
  });

  it('allows onError events to be attached', (done) => {
    let component = ReactTestUtils.renderIntoDocument(
      <Image
        src={ brokenImage }
        onError={ () => done() }
      />
    );

    let img = ReactTestUtils.findRenderedDOMComponentWithTag(component as any, 'img');
    ReactTestUtils.Simulate.error(img);
  });
});
