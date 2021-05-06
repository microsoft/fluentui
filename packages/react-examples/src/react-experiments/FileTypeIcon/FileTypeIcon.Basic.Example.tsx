import * as React from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { getFileTypeIconProps, FileIconType, initializeFileTypeIcons } from '@fluentui/react-file-type-icons';

initializeFileTypeIcons(undefined);

export class FileTypeIconBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <h3>Size 16 accdb icon as .png</h3>
        <Icon {...getFileTypeIconProps({ extension: 'mdb', size: 16, imageFileType: 'png' })} />
        <h3>Size 20 archive icon as .png</h3>
        <Icon {...getFileTypeIconProps({ extension: '7z', size: 20, imageFileType: 'png' })} />
        <h3>Size 32 audio icon as .png</h3>
        <Icon {...getFileTypeIconProps({ extension: 'oga', size: 32, imageFileType: 'png' })} />
        <h3>Size 40 code icon as .png</h3>
        <Icon {...getFileTypeIconProps({ extension: '.cpp', size: 40, imageFileType: 'png' })} />
        <h3>Size 48 csv icon as .png</h3>
        <Icon {...getFileTypeIconProps({ extension: 'csv', size: 48, imageFileType: 'png' })} />
        <h3>Size 64 model icon as .png</h3>
        <Icon {...getFileTypeIconProps({ extension: 'blend', size: 64, imageFileType: 'png' })} />
        <h3>Size 96 docx icon as .png</h3>
        <Icon {...getFileTypeIconProps({ extension: 'docx', size: 96, imageFileType: 'png' })} />
        <h3>Size 16 dotx icon as .svg</h3>
        <Icon {...getFileTypeIconProps({ extension: 'dot', size: 16, imageFileType: 'svg' })} />
        <h3>Size 20 email icon as .svg</h3>
        <Icon {...getFileTypeIconProps({ extension: 'msg', size: 20, imageFileType: 'svg' })} />
        <h3>Size 32 exe icon as .svg</h3>
        <Icon {...getFileTypeIconProps({ extension: 'msi', size: 32 })} />
        <h3>Size 40 script icon as .svg</h3>
        <Icon {...getFileTypeIconProps({ extension: 'osts', size: 40 })} />
        <h3>Size 48 html icon as .svg</h3>
        <Icon {...getFileTypeIconProps({ extension: 'html', size: 48 })} />
        <h3>Size 64 mpp icon as .svg</h3>
        <Icon {...getFileTypeIconProps({ extension: 'mpp', size: 64 })} />
        <h3>Size 96 link icon as .svg</h3>
        <Icon {...getFileTypeIconProps({ extension: 'url', size: 96 })} />
        <h3>Size 16 docset icon as .png</h3>
        <Icon {...getFileTypeIconProps({ type: FileIconType.docset, size: 16, imageFileType: 'png' })} />
        <h3>Size 20 folder icon as .svg</h3>
        <Icon {...getFileTypeIconProps({ type: FileIconType.folder, size: 20, imageFileType: 'svg' })} />
        <h3>Size 40 genericfile icon as .png</h3>
        <Icon {...getFileTypeIconProps({ size: 40, imageFileType: 'png' })} />
        <h3>Size 48 listitem icon as .svg</h3>
        <Icon {...getFileTypeIconProps({ type: FileIconType.listItem, size: 48, imageFileType: 'svg' })} />
        <h3>Size 64 sharedfolder icon as .png</h3>
        <Icon {...getFileTypeIconProps({ type: FileIconType.sharedFolder, size: 64, imageFileType: 'png' })} />
        <h3>Size 64 linkedfolder icon as .png</h3>
        <Icon {...getFileTypeIconProps({ type: FileIconType.linkedFolder, size: 64, imageFileType: 'png' })} />
      </div>
    );
  }
}
