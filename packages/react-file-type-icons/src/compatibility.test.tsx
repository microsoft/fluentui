import * as React from 'react';
import * as styleUtilities from '@fluentui/style-utilities';
import { FileIconType } from './FileIconType';
import { FileTypeIconMap } from './FileTypeIconMap';
import { getFileTypeIconProps } from './getFileTypeIconProps';
import type { IFileTypeIconOptions } from './getFileTypeIconProps';
import { getFileTypeIconAsUrl } from './getFileTypeIconAsUrl';
import { getFileTypeIconAsHTMLString } from './getFileTypeIconAsHTMLString';
import { initializeFileTypeIcons, ICON_SIZES } from './initializeFileTypeIcons';

const { createHash } = jest.requireActual('crypto');
const baseUrl = 'https://example.com/item-types/';
const host = window;
const originalRatio = host.devicePixelRatio;

function digest(value: unknown): string {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

afterEach(() => {
  Object.defineProperty(host, 'devicePixelRatio', { configurable: true, value: originalRatio });
  jest.restoreAllMocks();
});

it('preserves the enum runtime and member-type contract', () => {
  const folder: FileIconType.folder = FileIconType.folder;
  expect(folder).toBe(2);
  expect(FileIconType[folder]).toBe('folder');
  expect(digest(FileIconType)).toMatchSnapshot();
});

it('preserves props, URLs and exact HTML across the full catalog and density boundaries', () => {
  const inputs: IFileTypeIconOptions[] = [
    {},
    { extension: 'unknown', type: FileIconType.folder },
    { extension: '.DOC' },
  ];
  for (const name of Object.keys(FileTypeIconMap).sort()) {
    for (const extension of FileTypeIconMap[name].extensions || []) {
      inputs.push({ extension });
    }
  }
  for (const key of Object.keys(FileIconType)) {
    const value = FileIconType[key as keyof typeof FileIconType];
    if (typeof value === 'number') {
      inputs.push({ type: value });
    }
  }
  const results: unknown[] = [];
  for (const ratio of [0, 1, 1.01, 1.5, 1.51, 2, 2.01, 3, 3.01, NaN]) {
    Object.defineProperty(host, 'devicePixelRatio', { configurable: true, value: ratio });
    for (const size of ICON_SIZES as NonNullable<IFileTypeIconOptions['size']>[]) {
      for (const imageFileType of ['svg', 'png'] as const) {
        for (const input of inputs) {
          const options = { ...input, size, imageFileType };
          results.push([
            getFileTypeIconProps(options),
            getFileTypeIconAsUrl(options, baseUrl),
            getFileTypeIconAsHTMLString(options, baseUrl),
          ]);
        }
      }
    }
  }
  expect(digest(results)).toMatchSnapshot();
});

it('preserves complete registration keys, image props, subset styles and options', () => {
  const register = jest.spyOn(styleUtilities, 'registerIcons').mockImplementation(() => undefined);
  const options = { disableWarnings: true };
  initializeFileTypeIcons(baseUrl, options);
  expect(register).toHaveBeenCalledTimes(8);
  const registrations = register.mock.calls.map(([subset, actualOptions]) => {
    expect(actualOptions).toBe(options);
    return {
      ...subset,
      icons: Object.keys(subset.icons!)
        .sort()
        .map(name => {
          const image = subset.icons![name] as React.ReactElement;
          return [name, image.type, image.props];
        }),
    };
  });
  expect(digest(registrations)).toMatchSnapshot();
});
