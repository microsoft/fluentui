import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { SwatchPicker } from './SwatchPicker';
import { ColorSwatch } from '../ColorSwatch/ColorSwatch';
import { ImageSwatch } from '../ImageSwatch/ImageSwatch';
import { EmptySwatch } from '../EmptySwatch/EmptySwatch';

describe('SwatchPicker', () => {
  isConformant({
    Component: SwatchPicker,
    displayName: 'SwatchPicker',
  });

  it('renders with swatches', () => {
    const result = render(
      <SwatchPicker>
        <ColorSwatch color="#f09" value="#f09" />
        <ColorSwatch disabled color="#0f0" value="#0f0" />
        <ImageSwatch src="path/img.png" value="path/img.png" />
        <EmptySwatch />
      </SwatchPicker>,
    );
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fui-SwatchPicker"
          data-tabster="{\\"mover\\":{\\"cyclic\\":true,\\"direction\\":0,\\"memorizeCurrent\\":true}}"
          role="radiogroup"
        >
          <button
            aria-checked="false"
            class="fui-ColorSwatch"
            role="radio"
            style="--fui-SwatchPicker--color: #f09; --fui-SwatchPicker--borderColor: var(--colorTransparentStroke);"
            type="button"
          />
          <button
            aria-checked="false"
            class="fui-ColorSwatch"
            disabled=""
            role="radio"
            style="--fui-SwatchPicker--color: #0f0; --fui-SwatchPicker--borderColor: var(--colorTransparentStroke);"
            type="button"
          >
            <span
              class=""
            >
              <svg
                aria-hidden="true"
                class=""
                fill="currentColor"
                height="1em"
                viewBox="0 0 20 20"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-1.5 0c0-1.52-.53-2.93-1.4-4.04L5.96 15.1A6.5 6.5 0 0 0 16.5 10ZM4.9 14.04l9.14-9.14a6.5 6.5 0 0 0-9.13 9.13Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </button>
          <button
            aria-checked="false"
            class="fui-ImageSwatch"
            role="radio"
            style="background-image: url(path/img.png);"
          />
          <button
            aria-checked="false"
            class="fui-EmptySwatch"
            role="radio"
          />
        </div>
      </div>
    `);
  });
});
