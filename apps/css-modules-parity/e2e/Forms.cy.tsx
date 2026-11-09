import * as React from 'react';
import {
  AlphaSlider,
  ColorArea,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  Combobox,
  Dropdown,
  EmptySwatch,
  Field,
  ImageSwatch,
  InfoButton,
  InfoLabel,
  Listbox,
  Option,
  OptionGroup,
  Rating,
  RatingDisplay,
  RatingItem,
  SearchBox,
  Slider,
  SpinButton,
  SwatchPicker,
  SwatchPickerRow,
  renderAlphaSlider_unstable,
  renderColorArea_unstable,
  renderColorPicker_unstable,
  renderColorSlider_unstable,
  renderColorSwatch_unstable,
  renderCombobox_unstable,
  renderDropdown_unstable,
  renderEmptySwatch_unstable,
  renderField_unstable,
  renderImageSwatch_unstable,
  renderInfoButton_unstable,
  renderInfoLabel_unstable,
  renderListbox_unstable,
  renderOptionGroup_unstable,
  renderOption_unstable,
  renderRatingDisplay_unstable,
  renderRatingItem_unstable,
  renderRating_unstable,
  renderSearchBox_unstable,
  renderSlider_unstable,
  renderSpinButton_unstable,
  renderSwatchPickerRow_unstable,
  renderSwatchPicker_unstable,
  tokens,
  useAlphaSlider_unstable,
  useColorArea_unstable,
  useColorPicker_unstable,
  useColorSlider_unstable,
  useColorSwatch_unstable,
  useComboboxContextValues,
  useCombobox_unstable,
  useDropdown_unstable,
  useEmptySwatch_unstable,
  useFieldContextValues_unstable,
  useField_unstable,
  useImageSwatch_unstable,
  useInfoButton_unstable,
  useInfoLabel_unstable,
  useListboxContextValues,
  useListbox_unstable,
  useOptionGroup_unstable,
  useOption_unstable,
  useRatingContextValues,
  useRatingDisplayContextValues,
  useRatingDisplay_unstable,
  useRatingItem_unstable,
  useRating_unstable,
  useSearchBox_unstable,
  useSlider_unstable,
  useSpinButton_unstable,
  useSwatchPickerContextValues,
  useSwatchPickerRow_unstable,
  useSwatchPicker_unstable,
} from '@fluentui/react-components';
import { useColorPickerContextValues } from '@fluentui/react-color-picker';
import type { JSXElement } from '@fluentui/react-utilities';
// Explicit `.ts` imports bypass the CSS Modules resolution, giving the original Griffel implementations.
import { useFieldStyles_unstable as useGriffelFieldStyles } from '../../../packages/react-components/react-field/library/src/components/Field/useFieldStyles.styles.ts';
import { useComboboxStyles_unstable as useGriffelComboboxStyles } from '../../../packages/react-components/react-combobox/library/src/components/Combobox/useComboboxStyles.styles.ts';
import { useDropdownStyles_unstable as useGriffelDropdownStyles } from '../../../packages/react-components/react-combobox/library/src/components/Dropdown/useDropdownStyles.styles.ts';
import { useListboxStyles_unstable as useGriffelListboxStyles } from '../../../packages/react-components/react-combobox/library/src/components/Listbox/useListboxStyles.styles.ts';
import { useOptionStyles_unstable as useGriffelOptionStyles } from '../../../packages/react-components/react-combobox/library/src/components/Option/useOptionStyles.styles.ts';
import { useOptionGroupStyles_unstable as useGriffelOptionGroupStyles } from '../../../packages/react-components/react-combobox/library/src/components/OptionGroup/useOptionGroupStyles.styles.ts';
import { useSearchBoxStyles_unstable as useGriffelSearchBoxStyles } from '../../../packages/react-components/react-search/library/src/components/SearchBox/useSearchBoxStyles.styles.ts';
import { useSpinButtonStyles_unstable as useGriffelSpinButtonStyles } from '../../../packages/react-components/react-spinbutton/library/src/components/SpinButton/useSpinButtonStyles.styles.ts';
import { useSliderStyles_unstable as useGriffelSliderStyles } from '../../../packages/react-components/react-slider/library/src/components/Slider/useSliderStyles.styles.ts';
import { useRatingStyles_unstable as useGriffelRatingStyles } from '../../../packages/react-components/react-rating/library/src/components/Rating/useRatingStyles.styles.ts';
import { useRatingItemStyles_unstable as useGriffelRatingItemStyles } from '../../../packages/react-components/react-rating/library/src/components/RatingItem/useRatingItemStyles.styles.ts';
import { useRatingDisplayStyles_unstable as useGriffelRatingDisplayStyles } from '../../../packages/react-components/react-rating/library/src/components/RatingDisplay/useRatingDisplayStyles.styles.ts';
import { useInfoLabelStyles_unstable as useGriffelInfoLabelStyles } from '../../../packages/react-components/react-infolabel/library/src/components/InfoLabel/useInfoLabelStyles.styles.ts';
import { useInfoButtonStyles_unstable as useGriffelInfoButtonStyles } from '../../../packages/react-components/react-infolabel/library/src/components/InfoButton/useInfoButtonStyles.styles.ts';
import { useSwatchPickerStyles_unstable as useGriffelSwatchPickerStyles } from '../../../packages/react-components/react-swatch-picker/library/src/components/SwatchPicker/useSwatchPickerStyles.styles.ts';
import { useSwatchPickerRowStyles_unstable as useGriffelSwatchPickerRowStyles } from '../../../packages/react-components/react-swatch-picker/library/src/components/SwatchPickerRow/useSwatchPickerRowStyles.styles.ts';
import { useColorSwatchStyles_unstable as useGriffelColorSwatchStyles } from '../../../packages/react-components/react-swatch-picker/library/src/components/ColorSwatch/useColorSwatchStyles.styles.ts';
import { useImageSwatchStyles_unstable as useGriffelImageSwatchStyles } from '../../../packages/react-components/react-swatch-picker/library/src/components/ImageSwatch/useImageSwatchStyles.styles.ts';
import { useEmptySwatchStyles_unstable as useGriffelEmptySwatchStyles } from '../../../packages/react-components/react-swatch-picker/library/src/components/EmptySwatch/useEmptySwatchStyles.styles.ts';
import { useColorPickerStyles_unstable as useGriffelColorPickerStyles } from '../../../packages/react-components/react-color-picker/library/src/components/ColorPicker/useColorPickerStyles.styles.ts';
import { useColorSliderStyles_unstable as useGriffelColorSliderStyles } from '../../../packages/react-components/react-color-picker/library/src/components/ColorSlider/useColorSliderStyles.styles.ts';
import { useAlphaSliderStyles_unstable as useGriffelAlphaSliderStyles } from '../../../packages/react-components/react-color-picker/library/src/components/AlphaSlider/useAlphaSliderStyles.styles.ts';
import { useColorAreaStyles_unstable as useGriffelColorAreaStyles } from '../../../packages/react-components/react-color-picker/library/src/components/ColorArea/useColorAreaStyles.styles.ts';
import { describeParity, griffel, icon } from './harness';
import type { AnyComponent, Implementation } from './harness';

const GriffelField = griffel(
  'Field',
  useField_unstable,
  useGriffelFieldStyles,
  renderField_unstable,
  useFieldContextValues_unstable,
);
const GriffelCombobox = griffel(
  'Combobox',
  useCombobox_unstable,
  useGriffelComboboxStyles,
  renderCombobox_unstable,
  useComboboxContextValues,
);
const GriffelDropdown = griffel(
  'Dropdown',
  useDropdown_unstable,
  useGriffelDropdownStyles,
  renderDropdown_unstable,
  useComboboxContextValues,
);
const GriffelListbox = griffel(
  'Listbox',
  useListbox_unstable,
  useGriffelListboxStyles,
  renderListbox_unstable,
  useListboxContextValues,
);
const GriffelOption = griffel('Option', useOption_unstable, useGriffelOptionStyles, renderOption_unstable);
const GriffelOptionGroup = griffel(
  'OptionGroup',
  useOptionGroup_unstable,
  useGriffelOptionGroupStyles,
  renderOptionGroup_unstable,
);
const GriffelSearchBox = griffel(
  'SearchBox',
  useSearchBox_unstable,
  useGriffelSearchBoxStyles,
  renderSearchBox_unstable,
);
const GriffelSpinButton = griffel(
  'SpinButton',
  useSpinButton_unstable,
  useGriffelSpinButtonStyles,
  renderSpinButton_unstable,
);
const GriffelSlider = griffel('Slider', useSlider_unstable, useGriffelSliderStyles, renderSlider_unstable);
const GriffelRating = griffel(
  'Rating',
  useRating_unstable,
  useGriffelRatingStyles,
  renderRating_unstable,
  useRatingContextValues,
);
const GriffelRatingItem = griffel(
  'RatingItem',
  useRatingItem_unstable,
  useGriffelRatingItemStyles,
  renderRatingItem_unstable,
);
const GriffelRatingDisplay = griffel(
  'RatingDisplay',
  useRatingDisplay_unstable,
  useGriffelRatingDisplayStyles,
  renderRatingDisplay_unstable,
  useRatingDisplayContextValues,
);
const GriffelInfoLabel = griffel(
  'InfoLabel',
  useInfoLabel_unstable,
  useGriffelInfoLabelStyles,
  renderInfoLabel_unstable,
);
const GriffelInfoButton = griffel(
  'InfoButton',
  useInfoButton_unstable,
  useGriffelInfoButtonStyles,
  renderInfoButton_unstable,
);
const GriffelSwatchPicker = griffel(
  'SwatchPicker',
  useSwatchPicker_unstable,
  useGriffelSwatchPickerStyles,
  renderSwatchPicker_unstable,
  useSwatchPickerContextValues,
);
const GriffelSwatchPickerRow = griffel(
  'SwatchPickerRow',
  useSwatchPickerRow_unstable,
  useGriffelSwatchPickerRowStyles,
  renderSwatchPickerRow_unstable,
);
const GriffelColorSwatch = griffel(
  'ColorSwatch',
  useColorSwatch_unstable,
  useGriffelColorSwatchStyles,
  renderColorSwatch_unstable,
);
const GriffelImageSwatch = griffel(
  'ImageSwatch',
  useImageSwatch_unstable,
  useGriffelImageSwatchStyles,
  renderImageSwatch_unstable,
);
const GriffelEmptySwatch = griffel(
  'EmptySwatch',
  useEmptySwatch_unstable,
  useGriffelEmptySwatchStyles,
  renderEmptySwatch_unstable,
);
const GriffelColorPicker = griffel(
  'ColorPicker',
  useColorPicker_unstable,
  useGriffelColorPickerStyles,
  renderColorPicker_unstable,
  useColorPickerContextValues,
);
const GriffelColorSlider = griffel(
  'ColorSlider',
  useColorSlider_unstable,
  useGriffelColorSliderStyles,
  renderColorSlider_unstable,
);
const GriffelAlphaSlider = griffel(
  'AlphaSlider',
  useAlphaSlider_unstable,
  useGriffelAlphaSliderStyles,
  renderAlphaSlider_unstable,
);
const GriffelColorArea = griffel(
  'ColorArea',
  useColorArea_unstable,
  useGriffelColorAreaStyles,
  renderColorArea_unstable,
);

const implementations = {
  griffel: {
    Listbox: GriffelListbox,
    Option: GriffelOption,
    Rating: GriffelRating,
    RatingItem: GriffelRatingItem,
    SwatchPicker: GriffelSwatchPicker,
    ColorSwatch: GriffelColorSwatch,
    ColorPicker: GriffelColorPicker,
    ColorSlider: GriffelColorSlider,
    AlphaSlider: GriffelAlphaSlider,
    ColorArea: GriffelColorArea,
  },
  css: {
    Listbox: Listbox as AnyComponent,
    Option: Option as unknown as AnyComponent,
    Rating: Rating as AnyComponent,
    RatingItem: RatingItem as AnyComponent,
    SwatchPicker: SwatchPicker as AnyComponent,
    ColorSwatch: ColorSwatch as unknown as AnyComponent,
    ColorPicker: ColorPicker as AnyComponent,
    ColorSlider: ColorSlider as AnyComponent,
    AlphaSlider: AlphaSlider as AnyComponent,
    ColorArea: ColorArea as AnyComponent,
  },
};

const color = { h: 210, s: 0.6, v: 0.8, a: 0.7 };
const imageSource = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'/%3E";

const ratingItems = (implementation: Implementation) => {
  const { RatingItem: Item } = implementations[implementation];
  return [1, 2, 3, 4, 5].map(value => <Item key={value} value={value} />);
};

/** Option variants request selection through a `data-selected` attribute, applied by the parent Listbox. */
const wrapInListbox = (element: JSXElement, implementation: Implementation) => {
  const { Listbox: List, Option: Opt } = implementations[implementation];
  const selected = (element.props as Record<string, unknown>)['data-selected'] === true;
  return (
    <List selectedOptions={selected ? ['Parity'] : []} multiselect={selected}>
      {element}
      <Opt value="Other">Other</Opt>
    </List>
  );
};

/** Color picker sub-parts render inside a ColorPicker of the same implementation. */
const wrapInColorPicker = (element: JSXElement, implementation: Implementation) => {
  const { ColorPicker: Picker } = implementations[implementation];
  return <Picker color={color}>{element}</Picker>;
};

const findFirst = (className: string) => (container: HTMLElement) =>
  container.querySelector<HTMLElement>(`.${className}`)!;

describeParity('forms', {
  Field: {
    css: Field as AnyComponent,
    griffel: GriffelField,
    slot: 'label',
    sampledSlots: [
      'fui-Field__label',
      'fui-Field__validationMessage',
      'fui-Field__validationMessageIcon',
      'fui-Field__hint',
    ],
    interactive: false,
    props: { label: 'Label', hint: 'Hint', children: <input /> },
    variants: [
      {},
      { validationState: 'error', validationMessage: 'Error' },
      { validationState: 'warning', validationMessage: 'Warning' },
      { validationState: 'success', validationMessage: 'Success' },
      { validationState: 'none', validationMessage: 'None', required: true },
      { orientation: 'horizontal', size: 'large' },
    ],
  },
  Combobox: {
    css: Combobox as AnyComponent,
    griffel: GriffelCombobox,
    slot: 'expandIcon',
    sampledSlots: ['fui-Combobox__input', 'fui-Combobox__expandIcon'],
    interactive: true,
    props: { placeholder: 'Pick one', children: <Option>Parity</Option> },
    variants: [
      { appearance: 'outline' },
      { appearance: 'underline' },
      { appearance: 'filled-darker' },
      { size: 'small' },
      { size: 'large', appearance: 'filled-lighter' },
      { disabled: true },
    ],
  },
  Dropdown: {
    css: Dropdown as AnyComponent,
    griffel: GriffelDropdown,
    slot: 'expandIcon',
    sampledSlots: ['fui-Dropdown__button', 'fui-Dropdown__expandIcon'],
    interactive: true,
    props: { placeholder: 'Pick one', children: <Option>Parity</Option> },
    variants: [
      { appearance: 'outline' },
      { appearance: 'underline' },
      { appearance: 'filled-darker' },
      { size: 'small' },
      { size: 'large', appearance: 'filled-lighter' },
      { disabled: true },
    ],
  },
  Listbox: {
    css: Listbox as AnyComponent,
    griffel: GriffelListbox,
    sampledSlots: ['fui-Option'],
    interactive: false,
    props: (implementation: Implementation) => {
      const { Option: Opt } = implementations[implementation];
      return { children: [<Opt key="a">Parity</Opt>, <Opt key="b">Other</Opt>] };
    },
    variants: [{}, { multiselect: true, selectedOptions: ['Parity'] }],
  },
  Option: {
    css: Option as unknown as AnyComponent,
    griffel: GriffelOption,
    slot: 'checkIcon',
    sampledSlots: ['fui-Option__checkIcon'],
    interactive: true,
    props: { value: 'Parity', children: 'Parity' },
    variants: [{}, { 'data-selected': true }, { disabled: true }],
    wrap: wrapInListbox,
    findRoot: findFirst('fui-Option'),
  },
  OptionGroup: {
    css: OptionGroup as AnyComponent,
    griffel: GriffelOptionGroup,
    slot: 'label',
    sampledSlots: ['fui-OptionGroup__label'],
    interactive: false,
    props: (implementation: Implementation) => {
      const { Option: Opt } = implementations[implementation];
      return { label: 'Group', children: <Opt>Parity</Opt> };
    },
    variants: [{}],
    wrap: (element, implementation) => {
      const { Listbox: List, Option: Opt } = implementations[implementation];
      return (
        <List>
          {element}
          <Opt>Other</Opt>
        </List>
      );
    },
    findRoot: findFirst('fui-OptionGroup'),
  },
  SearchBox: {
    css: SearchBox as AnyComponent,
    griffel: GriffelSearchBox,
    slot: 'contentBefore',
    sampledSlots: ['fui-SearchBox__input', 'fui-SearchBox__contentBefore', 'fui-SearchBox__dismiss'],
    interactive: true,
    props: { placeholder: 'Search' },
    variants: [
      { appearance: 'outline' },
      { appearance: 'underline' },
      { appearance: 'filled-darker', defaultValue: 'Query' },
      { size: 'small', defaultValue: 'Query' },
      { size: 'large' },
      { disabled: true },
    ],
  },
  SpinButton: {
    css: SpinButton as AnyComponent,
    griffel: GriffelSpinButton,
    slot: 'incrementButton',
    sampledSlots: ['fui-SpinButton__input', 'fui-SpinButton__incrementButton', 'fui-SpinButton__decrementButton'],
    interactive: true,
    props: { defaultValue: 5 },
    variants: [
      { appearance: 'outline' },
      { appearance: 'underline' },
      { appearance: 'filled-darker' },
      { size: 'small' },
      { disabled: true },
    ],
  },
  Slider: {
    css: Slider as AnyComponent,
    griffel: GriffelSlider,
    slot: 'thumb',
    sampledSlots: ['fui-Slider__rail', 'fui-Slider__thumb'],
    interactive: true,
    props: { defaultValue: 40 },
    variants: [{}, { size: 'small' }, { vertical: true }, { disabled: true }],
  },
  Rating: {
    css: Rating as AnyComponent,
    griffel: GriffelRating,
    sampledSlots: ['fui-RatingItem', 'fui-RatingItem__selectedIcon', 'fui-RatingItem__unselectedIcon'],
    interactive: false,
    props: (implementation: Implementation) => ({ defaultValue: 3, children: ratingItems(implementation) }),
    variants: [
      {},
      { color: 'brand' },
      { color: 'marigold', size: 'small' },
      { size: 'large' },
      { size: 'extra-large' },
    ],
  },
  RatingItem: {
    css: RatingItem as AnyComponent,
    griffel: GriffelRatingItem,
    slot: 'selectedIcon',
    sampledSlots: ['fui-RatingItem__selectedIcon', 'fui-RatingItem__unselectedIcon'],
    interactive: true,
    props: {},
    variants: [{ value: 2 }, { value: 4 }],
    wrap: (element, implementation) => {
      const { Rating: Parent, RatingItem: Item } = implementations[implementation];
      return (
        <Parent defaultValue={3} color="brand">
          {element}
          <Item value={5} />
        </Parent>
      );
    },
    findRoot: findFirst('fui-RatingItem'),
  },
  RatingDisplay: {
    css: RatingDisplay as AnyComponent,
    griffel: GriffelRatingDisplay,
    slot: 'valueText',
    sampledSlots: ['fui-RatingDisplay__valueText', 'fui-RatingDisplay__countText'],
    interactive: false,
    props: { value: 3.5, count: 1200 },
    variants: [{}, { compact: true }, { size: 'small' }, { size: 'large', color: 'brand' }, { color: 'marigold' }],
  },
  InfoLabel: {
    css: InfoLabel as AnyComponent,
    griffel: GriffelInfoLabel,
    slot: 'label',
    sampledSlots: ['fui-InfoLabel__label', 'fui-InfoLabel__infoButton'],
    interactive: false,
    props: { info: 'Info', children: 'Label' },
    variants: [{}, { size: 'small' }, { size: 'large', weight: 'semibold' }, { required: true }, { disabled: true }],
  },
  InfoButton: {
    css: InfoButton as AnyComponent,
    griffel: GriffelInfoButton,
    sampledSlots: [],
    interactive: true,
    props: { info: 'Info' },
    variants: [{}, { size: 'small' }, { size: 'large' }],
  },
  SwatchPicker: {
    css: SwatchPicker as AnyComponent,
    griffel: GriffelSwatchPicker,
    sampledSlots: ['fui-ColorSwatch'],
    interactive: false,
    props: (implementation: Implementation) => {
      const { ColorSwatch: Swatch } = implementations[implementation];
      return {
        'aria-label': 'Swatches',
        defaultSelectedValue: 'a',
        children: [
          <Swatch key="a" value="a" color={tokens.colorPaletteRedBackground3} />,
          <Swatch key="b" value="b" color={tokens.colorPaletteBlueBackground2} />,
        ],
      };
    },
    variants: [{}, { spacing: 'small' }, { size: 'large', shape: 'circular' }, { size: 'extra-small' }],
  },
  SwatchPickerRow: {
    css: SwatchPickerRow as AnyComponent,
    griffel: GriffelSwatchPickerRow,
    sampledSlots: [],
    interactive: false,
    props: (implementation: Implementation) => {
      const { ColorSwatch: Swatch } = implementations[implementation];
      return { children: <Swatch value="a" color={tokens.colorPaletteRedBackground3} /> };
    },
    variants: [{}, { 'data-spacing': 'small' }],
    wrap: (element, implementation) => {
      const { SwatchPicker: Picker } = implementations[implementation];
      const spacing = (element.props as Record<string, unknown>)['data-spacing'] as 'small' | undefined;
      return (
        <Picker layout="grid" aria-label="Swatches" spacing={spacing}>
          {element}
        </Picker>
      );
    },
    findRoot: findFirst('fui-SwatchPickerRow'),
  },
  ColorSwatch: {
    css: ColorSwatch as unknown as AnyComponent,
    griffel: GriffelColorSwatch,
    slot: 'icon',
    sampledSlots: ['fui-ColorSwatch__icon', 'fui-ColorSwatch__disabledIcon'],
    interactive: true,
    props: { value: 'a', color: tokens.colorPaletteRedBackground3, icon },
    variants: [{}, { value: 'selected' }, { disabled: true }, { 'data-shape': 'circular' }, { 'data-size': 'large' }],
    wrap: (element, implementation) => {
      const { SwatchPicker: Picker } = implementations[implementation];
      const props = element.props as Record<string, unknown>;
      return (
        <Picker
          aria-label="Swatches"
          selectedValue="selected"
          shape={props['data-shape'] as 'circular' | undefined}
          size={props['data-size'] as 'large' | undefined}
        >
          {element}
        </Picker>
      );
    },
    findRoot: findFirst('fui-ColorSwatch'),
  },
  ImageSwatch: {
    css: ImageSwatch as unknown as AnyComponent,
    griffel: GriffelImageSwatch,
    sampledSlots: [],
    interactive: true,
    props: { value: 'a', src: imageSource },
    variants: [{}, { value: 'selected' }],
    wrap: (element, implementation) => {
      const { SwatchPicker: Picker } = implementations[implementation];
      return (
        <Picker aria-label="Swatches" selectedValue="selected">
          {element}
        </Picker>
      );
    },
    findRoot: findFirst('fui-ImageSwatch'),
  },
  EmptySwatch: {
    css: EmptySwatch as AnyComponent,
    griffel: GriffelEmptySwatch,
    sampledSlots: [],
    interactive: true,
    props: { 'aria-label': 'Empty' },
    variants: [{}, { 'data-shape': 'circular' }],
    wrap: (element, implementation) => {
      const { SwatchPicker: Picker } = implementations[implementation];
      const shape = (element.props as Record<string, unknown>)['data-shape'] as 'circular' | undefined;
      return (
        <Picker aria-label="Swatches" shape={shape}>
          {element}
        </Picker>
      );
    },
    findRoot: findFirst('fui-EmptySwatch'),
  },
  ColorPicker: {
    css: ColorPicker as AnyComponent,
    griffel: GriffelColorPicker,
    sampledSlots: ['fui-ColorArea', 'fui-ColorSlider', 'fui-AlphaSlider'],
    interactive: false,
    props: (implementation: Implementation) => {
      const { ColorArea: Area, ColorSlider: HueSlider, AlphaSlider: Alpha } = implementations[implementation];
      return {
        color,
        children: [<Area key="area" />, <HueSlider key="hue" />, <Alpha key="alpha" />],
      };
    },
    variants: [{}, { shape: 'square' }],
  },
  ColorSlider: {
    css: ColorSlider as AnyComponent,
    griffel: GriffelColorSlider,
    slot: 'thumb',
    sampledSlots: ['fui-ColorSlider__rail', 'fui-ColorSlider__thumb'],
    interactive: true,
    props: {},
    variants: [{}, { vertical: true }, { channel: 'saturation' }, { channel: 'value' }],
    wrap: wrapInColorPicker,
    findRoot: findFirst('fui-ColorSlider'),
  },
  AlphaSlider: {
    css: AlphaSlider as AnyComponent,
    griffel: GriffelAlphaSlider,
    slot: 'thumb',
    sampledSlots: ['fui-AlphaSlider__rail', 'fui-AlphaSlider__thumb'],
    interactive: true,
    props: {},
    variants: [{}, { vertical: true }, { transparency: true }],
    wrap: wrapInColorPicker,
    findRoot: findFirst('fui-AlphaSlider'),
  },
  ColorArea: {
    css: ColorArea as AnyComponent,
    griffel: GriffelColorArea,
    slot: 'thumb',
    sampledSlots: ['fui-ColorArea__thumb'],
    interactive: true,
    props: {},
    variants: [{}],
    wrap: wrapInColorPicker,
    findRoot: findFirst('fui-ColorArea'),
  },
});
