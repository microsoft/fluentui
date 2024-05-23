import * as React from 'react';
import { mount } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { SwatchPicker } from './SwatchPicker';
import { ColorSwatch } from '../ColorSwatch';
import { ImageSwatch } from '../ImageSwatch';
import { SwatchPickerRow } from '../SwatchPickerRow';
import type { SwatchPickerProps, SwatchPickerOnSelectEventHandler } from '../SwatchPicker';
import { renderSwatchPickerGrid } from '../../utils/renderUtils';

const mountFluent = (element: JSX.Element) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

const colors = [
  { id: 'color-0', color: '#FF1921', value: 'FF1921', 'aria-label': 'red' },
  { id: 'color-1', color: '#FFC12E', value: 'FFC12E', 'aria-label': 'orange' },
  { id: 'color-2', color: '#FEFF37', value: 'FEFF37', 'aria-label': 'yellow' },
  { id: 'color-3', color: '#90D057', value: '90D057', 'aria-label': 'light green' },
  { id: 'color-4', color: '#00B053', value: '00B053', 'aria-label': 'green' },
  { id: 'color-5', color: '#00AFED', value: '00AFED', 'aria-label': 'light blue', disabled: true },
  { id: 'color-6', color: '#006EBD', value: '006EBD', 'aria-label': 'blue' },
  { id: 'color-7', color: '#712F9E', value: '712F9E', 'aria-label': 'purple' },
];

const images = [
  {
    swatchSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-swatch.jpg',
    value: 'image-0',
    label: 'sea',
    fullImageSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-full-img.jpg',
  },
  {
    swatchSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-swatch.jpg',
    value: 'image-1',
    label: 'bridge',
    disabled: true,
    fullImageSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-full-img.jpg',
  },
  {
    swatchSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-swatch.jpg',
    value: 'image-2',
    label: 'park',
    fullImageSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-full-img.jpg',
  },
];

const SwatchPickerRowColorSample = (props: SwatchPickerProps) => (
  <>
    <p tabIndex={0} id="before">
      Before
    </p>

    <SwatchPicker {...props} id="swatch-picker-color-row">
      <ColorSwatch color="#FF1921" value="FF1921" aria-label="red" id="swatch-0" />
      <ColorSwatch color="#FFC12E" value="FFC12E" aria-label="orange" id="swatch-1" />
      <ColorSwatch color="#00B053" value="00B053" aria-label="green" id="swatch-2" disabled />
      <ColorSwatch color="#00AFED" value="00AFED" aria-label="light blue" id="swatch-3" />
    </SwatchPicker>

    <p tabIndex={0} id="after">
      After
    </p>
  </>
);

const SwatchPickerRowImageSample = (props: SwatchPickerProps) => (
  <>
    <p tabIndex={0} id="before">
      Before
    </p>

    <SwatchPicker {...props} id="swatch-picker-image-row">
      {images.map(image => (
        <ImageSwatch
          key={image.value}
          src={image.swatchSrc}
          value={image.value}
          aria-label={image.label}
          id={image.value}
          disabled={image.disabled}
        />
      ))}
    </SwatchPicker>

    <p tabIndex={0} id="after">
      After
    </p>
  </>
);

const SwatchPickerGridColorSample = (props: SwatchPickerProps) => (
  <>
    <p tabIndex={0} id="before">
      Before
    </p>

    <SwatchPicker layout="grid" {...props} id="swatch-picker">
      {renderSwatchPickerGrid({ items: colors, columnCount: 3 })}
    </SwatchPicker>

    <p tabIndex={0} id="after">
      After
    </p>
  </>
);

const SwatchPickerRowSample = () => {
  const [selectedValue, setSelectedValue] = React.useState('FF1921');
  const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
    setSelectedValue(data.selectedValue);
  };

  return (
    <SwatchPicker selectedValue={selectedValue} onSelectionChange={handleSelect} id="swatch-picker-color-row">
      <ColorSwatch color="#FF1921" value="FF1921" aria-label="red" id="swatch-0" />
      <ColorSwatch color="#FFC12E" value="FFC12E" aria-label="orange" id="swatch-1" />
      <ColorSwatch color="#00B053" value="00B053" aria-label="green" id="swatch-2" disabled />
      <ColorSwatch color="#00AFED" value="00AFED" aria-label="light blue" id="swatch-3" />
      <ImageSwatch src="path/img.jpg" value="img" aria-label="img" id="swatch-4" />
    </SwatchPicker>
  );
};

const SwatchPickerGridSample = () => {
  const [selectedValue, setSelectedValue] = React.useState('FF1921');
  const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
    setSelectedValue(data.selectedValue);
  };

  return (
    <SwatchPicker
      layout="grid"
      selectedValue={selectedValue}
      onSelectionChange={handleSelect}
      id="swatch-picker-color-row"
    >
      <SwatchPickerRow>
        <ColorSwatch color="#FF1921" value="FF1921" aria-label="red" id="swatch-0" />
        <ColorSwatch color="#FFC12E" value="FFC12E" aria-label="orange" id="swatch-1" disabled />
      </SwatchPickerRow>
      <SwatchPickerRow>
        <ColorSwatch color="#00AFED" value="00AFED" aria-label="light blue" id="swatch-2" />
        <ImageSwatch src="path/img.jpg" value="img" aria-label="img" id="swatch-3" />
      </SwatchPickerRow>
    </SwatchPicker>
  );
};

describe('SwatchPicker', () => {
  describe('focus behaviors', () => {
    describe('row layout', () => {
      it('picker with colors should be focusable', () => {
        mountFluent(<SwatchPickerRowColorSample />);

        cy.get('#before').focus();

        cy.get('#swatch-0').should('not.be.focused');

        cy.realPress('Tab');

        cy.get('#swatch-0').should('be.focused');
        cy.realPress('ArrowRight');
        cy.get('#swatch-1').should('be.focused');
        cy.realPress('ArrowDown');
        cy.get('#swatch-2').should('not.be.focused');
        cy.get('#swatch-3').should('be.focused');
      });

      it('picker with images should be focusable', () => {
        mountFluent(<SwatchPickerRowImageSample />);

        cy.get('#before').focus();

        cy.get('#image-0').should('not.be.focused');

        cy.realPress('Tab');

        cy.get('#image-0').should('be.focused');
        cy.realPress('ArrowRight');
        cy.get('#image-1').should('not.be.focused');
        cy.get('#image-2').should('be.focused');
      });
    });

    describe('grid layout', () => {
      it('should be focusable', () => {
        mountFluent(<SwatchPickerGridColorSample layout="grid" />);

        cy.get('#before').focus();

        cy.get('#color-0').should('not.be.focused');

        cy.realPress('Tab');

        cy.get('#color-0').should('be.focused');
        cy.realPress('ArrowRight');
        cy.get('#color-1').should('be.focused');
        cy.realPress('ArrowDown');
        cy.get('#color-4').should('be.focused');
        cy.realPress('ArrowRight');
        cy.get('#color-5').should('not.be.focused');
        cy.get('#color-6').should('be.focused');
      });
    });
  });

  describe('selection behaviors', () => {
    describe('row layout', () => {
      it('should select color swatch onClick', () => {
        mountFluent(<SwatchPickerRowSample />);
        cy.get('#swatch-0').should('have.attr', 'aria-checked', 'true');
        cy.get('#swatch-1').should('have.attr', 'aria-checked', 'false');
        cy.get('#swatch-1').realClick();
        cy.get('#swatch-1').should('have.attr', 'aria-checked', 'true');
      });
      it('should select color with the Space key', () => {
        mountFluent(<SwatchPickerRowSample />);
        cy.get('#swatch-1').should('have.attr', 'aria-checked', 'false');
        cy.get('#swatch-1').focus().realPress('Space');
        cy.get('#swatch-1').should('have.attr', 'aria-checked', 'true');
      });
      it('should select color with the Enter key', () => {
        mountFluent(<SwatchPickerRowSample />);
        cy.get('#swatch-1').should('have.attr', 'aria-checked', 'false');
        cy.get('#swatch-1').focus().realPress('Enter');
        cy.get('#swatch-1').should('have.attr', 'aria-checked', 'true');
      });
      it('should not select disabled color', () => {
        mountFluent(<SwatchPickerRowSample />);
        cy.get('#swatch-1').should('have.attr', 'aria-checked', 'false');
        cy.get('#swatch-2').realClick();
        cy.get('#swatch-2').should('have.attr', 'aria-checked', 'false');
      });
      it('defaultSelectedValue is correct', () => {
        mountFluent(<SwatchPickerRowColorSample defaultSelectedValue="00AFED" />);
        cy.get('#swatch-0').should('have.attr', 'aria-checked', 'false');
        cy.get('#swatch-3').should('have.attr', 'aria-checked', 'true');
      });
      it('selectedValue value is correct', () => {
        mountFluent(<SwatchPickerRowColorSample selectedValue="00AFED" />);
        cy.get('#swatch-0').should('have.attr', 'aria-checked', 'false');
        cy.get('#swatch-3').should('have.attr', 'aria-checked', 'true');
      });
    });
    describe('grid layout', () => {
      it('should select color swatch onClick', () => {
        mountFluent(<SwatchPickerGridSample />);
        cy.get('#swatch-0').should('have.attr', 'aria-selected', 'true');
        cy.get('#swatch-1').should('have.attr', 'aria-selected', 'false');
        cy.get('#swatch-2').realClick();
        cy.get('#swatch-2').should('have.attr', 'aria-selected', 'true');
      });
      it('should select color with the Space key', () => {
        mountFluent(<SwatchPickerGridSample />);
        cy.get('#swatch-2').should('have.attr', 'aria-selected', 'false');
        cy.get('#swatch-2').focus().realPress('Space');
        cy.get('#swatch-2').should('have.attr', 'aria-selected', 'true');
      });
      it('should select color with the Enter key', () => {
        mountFluent(<SwatchPickerGridSample />);
        cy.get('#swatch-2').should('have.attr', 'aria-selected', 'false');
        cy.get('#swatch-2').focus().realPress('Enter');
        cy.get('#swatch-2').should('have.attr', 'aria-selected', 'true');
      });
      it('should not select disabled color', () => {
        mountFluent(<SwatchPickerGridSample />);
        cy.get('#swatch-1').should('have.attr', 'aria-selected', 'false');
        cy.get('#swatch-1').realClick();
        cy.get('#swatch-1').should('have.attr', 'aria-selected', 'false');
      });
      it('defaultSelectedValue is correct', () => {
        mountFluent(<SwatchPickerGridColorSample defaultSelectedValue="FEFF37" />);
        cy.get('#color-0').should('have.attr', 'aria-selected', 'false');
        cy.get('#color-2').should('have.attr', 'aria-selected', 'true');
      });
      it('selectedValue value is correct', () => {
        mountFluent(<SwatchPickerGridColorSample selectedValue="00B053" />);
        cy.get('#color-0').should('have.attr', 'aria-selected', 'false');
        cy.get('#color-4').should('have.attr', 'aria-selected', 'true');
      });
    });
  });
});
