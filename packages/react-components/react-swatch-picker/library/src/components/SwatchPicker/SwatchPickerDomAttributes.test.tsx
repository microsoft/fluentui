import * as React from 'react';
import { render } from '@testing-library/react';
import { SwatchPicker } from './SwatchPicker';
import { SwatchPickerRow } from '../SwatchPickerRow/SwatchPickerRow';
import { ColorSwatch } from '../ColorSwatch/ColorSwatch';
import { ImageSwatch } from '../ImageSwatch/ImageSwatch';
import { EmptySwatch } from '../EmptySwatch/EmptySwatch';

const attributeNames = (element: Element) => element.getAttributeNames().sort();

describe('SwatchPicker DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { getByTestId } = render(
      <SwatchPicker
        aria-label="colors"
        data-testid="picker"
        defaultSelectedValue="red"
        focusMode="tab"
        layout="grid"
        onSelectionChange={jest.fn()}
        shape="circular"
        size="small"
        spacing="small"
      >
        <SwatchPickerRow data-testid="row">
          <ColorSwatch
            borderColor="black"
            color="red"
            data-testid="color"
            disabledIcon="d"
            icon="i"
            shape="square"
            size="large"
            value="red"
          />
          <ImageSwatch data-testid="image" shape="square" size="large" src="image.png" value="image" />
          <EmptySwatch data-testid="empty" shape="square" size="large" />
        </SwatchPickerRow>
      </SwatchPicker>,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect(attributeNames(getByTestId('picker'))).toEqual(['aria-label', 'class', 'data-testid', 'role']);
    expect(attributeNames(getByTestId('row'))).toEqual(['class', 'data-testid', 'role']);
    expect(attributeNames(getByTestId('color'))).toEqual([
      'aria-selected',
      'class',
      'data-testid',
      'role',
      'style',
      'type',
    ]);
    expect(attributeNames(getByTestId('image'))).toEqual([
      'aria-selected',
      'class',
      'data-testid',
      'role',
      'style',
      'type',
    ]);
    expect(attributeNames(getByTestId('empty'))).toEqual(['class', 'data-testid', 'role', 'type']);
  });
});
