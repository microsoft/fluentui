import * as React from 'react';
import { Steps } from 'storywright';
import {
  SwatchPicker,
  ColorSwatch,
  SwatchPickerProps,
  ImageSwatch,
  EmptySwatch,
  SwatchPickerRow,
} from '@fluentui/react-swatch-picker';
import { HeartRegular } from '@fluentui/react-icons';

export const steps = new Steps()
  .snapshot('default', { cropTo: '.testWrapper' })
  .hover('.breadcrumb-sample')
  .snapshot('hover', { cropTo: '.testWrapper' })
  .mouseDown('.breadcrumb-sample')
  .snapshot('pressed', { cropTo: '.testWrapper' })
  .focus('.breadcrumb-sample')
  .snapshot('focused', { cropTo: '.testWrapper' })
  .end();

export const SampleSwatchPickerColors = (props: SwatchPickerProps) => (
  <SwatchPicker defaultSelectedValue="00B053" {...props}>
    <ColorSwatch color="#FF1921" value="FF1921" aria-label="red" />
    <ColorSwatch color="#FFC12E" value="FFC12E" aria-label="orange" />
    <ColorSwatch icon={<HeartRegular />} color="#FEFF37" value="FEFF37" aria-label="yellow" />
    <ColorSwatch color="#90D057" value="90D057" aria-label="light green">
      A
    </ColorSwatch>
    <ColorSwatch color="#00B053" value="00B053" aria-label="green" />
    <ColorSwatch color="#00AFED" value="00AFED" aria-label="light blue" />
    <ColorSwatch color="#006EBD" value="006EBD" aria-label="blue" />
    <ColorSwatch disabled color="#011F5E" value="011F5E" aria-label="dark blue" />
    <ColorSwatch color="linear-gradient(0deg, #712F9E, #00AFED)" value="712F9E" aria-label="blue-purple" />
    <EmptySwatch />
  </SwatchPicker>
);

export const SampleSwatchPickerImages = (props: SwatchPickerProps) => (
  <SwatchPicker defaultSelectedValue="bridge" {...props}>
    <ImageSwatch
      value="sea"
      aria-label="sea"
      src="https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-swatch.jpg"
    />
    <ImageSwatch
      value="bridge"
      aria-label="bridge"
      src="https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-swatch.jpg"
    />
    <ImageSwatch
      value="park"
      aria-label="park"
      src="https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-swatch.jpg"
    />
  </SwatchPicker>
);

export const SampleSwatchPickerGrid = (props: SwatchPickerProps) => (
  <SwatchPicker layout="grid" defaultSelectedValue="00B053" {...props}>
    <SwatchPickerRow>
      <ColorSwatch color="#FF1921" value="FF1921" aria-label="red" />
      <ColorSwatch color="#FFC12E" value="FFC12E" aria-label="orange" />
      <ColorSwatch icon={<HeartRegular />} color="#FEFF37" value="FEFF37" aria-label="yellow" />
    </SwatchPickerRow>
    <SwatchPickerRow>
      <ColorSwatch color="#90D057" value="90D057" aria-label="light green" />
      <ColorSwatch color="#00B053" value="00B053" aria-label="green" />
      <ColorSwatch color="#00AFED" value="00AFED" aria-label="light blue" />
    </SwatchPickerRow>
    <SwatchPickerRow>
      <ColorSwatch color="#006EBD" value="006EBD" aria-label="blue" />
      <ColorSwatch disabled color="#011F5E" value="011F5E" aria-label="dark blue" />
      <ColorSwatch color="linear-gradient(0deg, #712F9E, #00AFED)" value="712F9E" aria-label="blue-purple" />
    </SwatchPickerRow>
  </SwatchPicker>
);
