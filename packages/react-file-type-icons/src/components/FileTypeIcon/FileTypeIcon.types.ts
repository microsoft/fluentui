import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ImageFileType, IFileTypeIconOptions } from '../../getFileTypeIconProps';

export type FileTypeIconSlots = {
  root: Slot<'img'>;
};

export type FileTypeIconProps = Omit<ComponentProps<FileTypeIconSlots>, 'src'> &
  IFileTypeIconOptions & {
    /**
     * Optional base URL used to resolve image URLs.
     * @default DEFAULT_BASE_URL
     */
    baseUrl?: string;
  };

export type FileTypeIconState = ComponentState<FileTypeIconSlots> &
  Required<Pick<IFileTypeIconOptions, 'size' | 'imageFileType'>> & {
    baseUrl?: string;
    iconName: string;
    src?: string;
    extension?: string;
    type?: IFileTypeIconOptions['type'];
  };

export type { ImageFileType };
