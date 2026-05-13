import * as React from 'react';
import { DEFAULT_BASE_URL, ICON_SIZES, initializeFileTypeIcons } from './initializeFileTypeIcons';

type RegisteredIcon = {
  code: React.ReactElement<React.ImgHTMLAttributes<HTMLImageElement>>;
  subset: {
    mergeImageProps: boolean;
  };
};

type IconRecords = Record<string, RegisteredIcon | unknown>;

type GlobalWithSettings = typeof globalThis & {
  __globalSettings__?: {
    icons?: IconRecords;
  };
};

const expectImageIcon = (icon: unknown, props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const element = icon as React.ReactElement<React.ImgHTMLAttributes<HTMLImageElement>>;

  expect(element.type).toBe('img');
  expect(element.props).toMatchObject(props);
};

describe('initializeFileTypeIcons', () => {
  const globalWithSettings = globalThis as GlobalWithSettings;

  beforeEach(() => {
    delete globalWithSettings.__globalSettings__;
  });

  const getRegisteredIcons = () => globalWithSettings.__globalSettings__?.icons as IconRecords;

  const getRegisteredIcon = (iconName: string) => getRegisteredIcons()[iconName.toLowerCase()] as RegisteredIcon;

  it('registers file type icons using the default CDN base URL', () => {
    initializeFileTypeIcons();

    ICON_SIZES.forEach(size => {
      expect(getRegisteredIcon(`docx${size}_svg`)).toBeDefined();
    });

    expect(getRegisteredIcon('docx16_svg').subset.mergeImageProps).toBe(true);
    expectImageIcon(getRegisteredIcon('docx16_svg').code, {
      src: `${DEFAULT_BASE_URL}16/docx.svg`,
      height: 16,
      width: 16,
      alt: '',
    });
    expectImageIcon(getRegisteredIcon('docx16_png').code, {
      src: `${DEFAULT_BASE_URL}16/docx.png`,
      height: 16,
      width: 16,
      alt: '',
    });
    expectImageIcon(getRegisteredIcon('docx16_1.5x_svg').code, {
      src: `${DEFAULT_BASE_URL}16_1.5x/docx.svg`,
      height: 16,
      width: 16,
      alt: '',
    });
    expectImageIcon(getRegisteredIcon('docx16_2x_png').code, {
      src: `${DEFAULT_BASE_URL}16_2x/docx.png`,
      height: 16,
      width: 16,
      alt: '',
    });
  });

  it('registers file type icons using a custom base URL', () => {
    const baseUrl = 'https://example.com/assets/item-types/';

    initializeFileTypeIcons(baseUrl);

    expectImageIcon(getRegisteredIcon('docx16_svg').code, {
      src: `${baseUrl}16/docx.svg`,
      height: 16,
      width: 16,
      alt: '',
    });
  });

  it('redefines file type icons when initialized with a different base URL', () => {
    const baseUrl = 'https://example.com/assets/item-types/';
    initializeFileTypeIcons();
    initializeFileTypeIcons(baseUrl);

    expectImageIcon(getRegisteredIcon('docx16_svg').code, {
      src: `${baseUrl}16/docx.svg`,
      height: 16,
      width: 16,
      alt: '',
    });
  });

  it('keeps v8-compatible image prop merging metadata', () => {
    initializeFileTypeIcons();

    const { subset } = getRegisteredIcon('docx16_svg');

    expect(subset).toEqual({ mergeImageProps: true });
  });
});
