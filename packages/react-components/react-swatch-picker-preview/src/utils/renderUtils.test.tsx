import * as React from 'react';
import { render } from '@testing-library/react';
import { SwatchPicker } from '..';
import { SwatchPickerRow, ColorSwatch } from '..';
import { renderSwatchPickerGrid, SwatchProps } from './renderUtils';

const colors: SwatchProps[] = [
  { color: '#FF1921', value: 'FF1921', 'aria-label': 'red' },
  { color: '#FF7A00', value: '#FF7A00', 'aria-label': 'orange' },
  { color: '#90D057', value: '90D057', 'aria-label': 'light green' },
  { color: '#00B053', value: '00B053', 'aria-label': 'green' },
  { color: '#00AFED', value: '00AFED', 'aria-label': 'light blue' },
  { color: '#006EBD', value: '006EBD', 'aria-label': 'blue' },
];

const images: SwatchProps[] = [
  {
    src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-swatch.jpg',
    value: 'sea',
    'aria-label': 'sea',
  },
  {
    src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-swatch.jpg',
    value: 'bridge',
    'aria-label': 'bridge',
  },
  {
    src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-swatch.jpg',
    value: 'park',
    'aria-label': 'park',
  },
];

const items: SwatchProps[] = [...colors, ...images];

describe('Render utils of SwatchPicker', () => {
  it('renders default grid layout', () => {
    const result = render(
      <SwatchPicker layout="grid" aria-label="SwatchPicker grid layout">
        {renderSwatchPickerGrid({
          items,
          columnCount: 3,
        })}
      </SwatchPicker>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('renders custom row', () => {
    const result = render(
      <SwatchPicker layout="grid" aria-label="SwatchPicker grid layout">
        {renderSwatchPickerGrid({
          items,
          columnCount: 3,
          renderRow: ({ children, rowId }) => (
            <SwatchPickerRow className="custom-row" key={rowId}>
              {children}
            </SwatchPickerRow>
          ),
        })}
      </SwatchPicker>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('renders custom swatch', () => {
    const result = render(
      <SwatchPicker layout="grid" aria-label="SwatchPicker grid layout">
        {renderSwatchPickerGrid({
          items: colors,
          columnCount: 3,
          renderSwatch: item => (
            <ColorSwatch className="custom-swatch" key={item.value} color={item.color || ''} {...item} />
          ),
        })}
      </SwatchPicker>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
