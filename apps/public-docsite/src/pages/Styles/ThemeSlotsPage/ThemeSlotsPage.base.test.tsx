import * as React from 'react';
import { render } from '@testing-library/react';
import { ColorPalette } from '@fluentui/react-docsite-components/lib/index2';
import type { IPageProps } from '@fluentui/react-docsite-components/lib/index2';
import { ThemeSlotsPageBase } from './ThemeSlotsPage.base';

jest.mock('@fluentui/react-docsite-components/lib/index2', () => {
  const react = jest.requireActual<typeof React>('react');
  return {
    PlatformContext: react.createContext('web'),
    Page: jest.fn(({ otherSections }: IPageProps) => (
      <>
        {otherSections?.map(section => (
          <react.Fragment key={section.sectionName}>{section.content}</react.Fragment>
        ))}
      </>
    )),
    MarkdownHeader: jest.fn(() => null),
    ColorPalette: jest.fn(() => null),
  };
});

jest.mock('./ThemeSlotsPage.doc', () => ({ ThemeSlotsPageProps: { web: {} } }));
jest.mock('../../../utilities/index', () => ({ getSubTitle: () => '' }));
jest.mock(
  '!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/ThemeSlotsPage/docs/web/ThemeSlotsImplementation.md',
  () => '',
  { virtual: true },
);

describe('ThemeSlotsPageBase', () => {
  it('renders the theme, neutral, and accent palettes from source data', () => {
    render(<ThemeSlotsPageBase />);

    const palettes = (ColorPalette as jest.Mock).mock.calls.map(([props]) => props.colors);
    expect(palettes).toEqual([
      require('../../../data/colors-theme-slots.json'),
      require('../../../data/colors-theme-neutrals.json'),
      require('../../../data/colors-theme-accents.json'),
    ]);
  });
});
