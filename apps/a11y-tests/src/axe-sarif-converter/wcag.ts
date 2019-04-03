// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
export interface WCAG {
  text: string;
  url?: string;
  title?: string;
}
export interface WCAGData {
  [key: string]: WCAG;

  WCAG1_1_1: WCAG;
  WCAG1_2_1: WCAG;
  WCAG1_2_2: WCAG;
  WCAG1_2_4: WCAG;
  WCAG1_2_5: WCAG;
  WCAG1_3_1: WCAG;
  WCAG1_3_2: WCAG;
  WCAG1_3_3: WCAG;
  WCAG1_4_1: WCAG;
  WCAG1_4_2: WCAG;
  WCAG1_4_3: WCAG;
  WCAG1_4_4: WCAG;
  WCAG1_4_5: WCAG;
  WCAG2_1_1: WCAG;
  WCAG2_1_2: WCAG;
  WCAG2_2_1: WCAG;
  WCAG2_2_2: WCAG;
  WCAG2_3_1: WCAG;
  WCAG2_4_1: WCAG;
  WCAG2_4_2: WCAG;
  WCAG2_4_3: WCAG;
  WCAG2_4_5: WCAG;
  WCAG2_4_6: WCAG;
  WCAG2_4_7: WCAG;
  WCAG3_1_1: WCAG;
  WCAG3_1_2: WCAG;
  WCAG3_2_1: WCAG;
  WCAG3_2_2: WCAG;
  WCAG3_2_3: WCAG;
  WCAG3_2_4: WCAG;
  WCAG3_3_1: WCAG;
  WCAG3_3_2: WCAG;
  WCAG3_3_3: WCAG;
  WCAG3_3_4: WCAG;
  WCAG4_1_1: WCAG;
  WCAG4_1_2: WCAG;
  WCAG2_4_4: WCAG;
  WCAGBest_Practice: WCAG;
}

export const wcagLinkData: WCAGData = {
  WCAG1_1_1: {
    text: 'WCAG 1.1.1',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html',
    title: 'Non-text content'
  },
  WCAG1_2_1: {
    text: 'WCAG 1.2.1',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-only-and-video-only-prerecorded',
    title: 'Audio-only and Video-only (pre-recorded)'
  },
  WCAG1_2_2: {
    text: 'WCAG 1.2.2',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/captions-prerecorded.html',
    title: 'Captions (pre-recorded)'
  },
  WCAG1_2_4: {
    text: 'WCAG 1.2.4',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/captions-live.html',
    title: 'Captions (live)'
  },
  WCAG1_2_5: {
    text: 'WCAG 1.2.5',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-description-prerecorded',
    title: 'Audio description (pre-recorded)'
  },
  WCAG1_3_1: {
    text: 'WCAG 1.3.1',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships',
    title: 'Info and relationships'
  },
  WCAG1_3_2: {
    text: 'WCAG 1.3.2',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/meaningful-sequence.html',
    title: 'Meaningful sequence'
  },
  WCAG1_3_3: {
    text: 'WCAG 1.3.3',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/sensory-characteristics.html',
    title: 'Sensory characteristics'
  },
  WCAG1_4_1: {
    text: 'WCAG 1.4.1',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html',
    title: 'Use of color'
  },
  WCAG1_4_2: {
    text: 'WCAG 1.4.2',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-control.html',
    title: 'Audio control'
  },
  WCAG1_4_3: {
    text: 'WCAG 1.4.3',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html',
    title: 'Contrast (minimum)'
  },
  WCAG1_4_4: {
    text: 'WCAG 1.4.4',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html',
    title: 'Resize text'
  },
  WCAG1_4_5: {
    text: 'WCAG 1.4.5',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/images-of-text.html',
    title: 'Images of text'
  },
  WCAG2_1_1: {
    text: 'WCAG 2.1.1',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html',
    title: 'Keyboard'
  },
  WCAG2_1_2: {
    text: 'WCAG 2.1.2',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html',
    title: 'No keyboard trap'
  },
  WCAG2_2_1: {
    text: 'WCAG 2.2.1',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/timing-adjustable.html',
    title: 'Timing adjustable'
  },
  WCAG2_2_2: {
    text: 'WCAG 2.2.2',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide',
    title: 'Pause, stop, hide'
  },
  WCAG2_3_1: {
    text: 'WCAG 2.3.1',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/three-flashes-or-below-threshold.html',
    title: 'Three flashes or below threshold'
  },
  WCAG2_4_1: {
    text: 'WCAG 2.4.1',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks',
    title: 'Bypass blocks'
  },
  WCAG2_4_2: {
    text: 'WCAG 2.4.2',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/page-titled.html',
    title: 'Page titled'
  },
  WCAG2_4_3: {
    text: 'WCAG 2.4.3',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html',
    title: 'Focus order'
  },
  WCAG2_4_4: {
    text: 'WCAG 2.4.4',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html',
    title: 'Link purpose (in context)'
  },
  WCAG2_4_5: {
    text: 'WCAG 2.4.5',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/multiple-ways.html',
    title: 'Multiple ways'
  },
  WCAG2_4_6: {
    text: 'WCAG 2.4.6',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels',
    title: 'Headings and Labels'
  },
  WCAG2_4_7: {
    text: 'WCAG 2.4.7',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html',
    title: 'Focus visible'
  },
  WCAG3_1_1: {
    text: 'WCAG 3.1.1',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html',
    title: 'Language of page'
  },
  WCAG3_1_2: {
    text: 'WCAG 3.1.2',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/language-of-parts.html',
    title: 'Language of parts'
  },
  WCAG3_2_1: {
    text: 'WCAG 3.2.1',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/on-focus.html',
    title: 'On focus'
  },
  WCAG3_2_2: {
    text: 'WCAG 3.2.2',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/on-input.html',
    title: 'On input'
  },
  WCAG3_2_3: {
    text: 'WCAG 3.2.3',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/consistent-navigation',
    title: 'Consistent navigation'
  },
  WCAG3_2_4: {
    text: 'WCAG 3.2.4',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/consistent-identification',
    title: 'Consistent identification'
  },
  WCAG3_3_1: {
    text: 'WCAG 3.3.1',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html',
    title: 'Error identification'
  },
  WCAG3_3_2: {
    text: 'WCAG 3.3.2',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html',
    title: 'Labels or instructions'
  },
  WCAG3_3_3: {
    text: 'WCAG 3.3.3',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html',
    title: 'Error suggestion'
  },
  WCAG3_3_4: {
    text: 'WCAG 3.3.4',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/error-prevention-legal-financial-data.html',
    title: 'Error prevention (legal, financial, data)'
  },
  WCAG4_1_1: {
    text: 'WCAG 4.1.1',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/parsing.html',
    title: 'Parsing'
  },
  WCAG4_1_2: {
    text: 'WCAG 4.1.2',
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html',
    title: 'Name, role, value'
  },
  WCAGBest_Practice: {
    text: 'Best Practice'
  }
};
