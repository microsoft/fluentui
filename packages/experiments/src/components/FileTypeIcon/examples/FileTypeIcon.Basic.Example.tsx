
import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { getFileTypeIconName } from '@uifabric/file-type-icons/lib/IconHelper';
import FileIconType from '@uifabric/file-type-icons/lib/FileIconType';

export class FileTypeIconBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <h3>Size 16 accdb icon as .png</h3>
        <Icon iconName={ getFileTypeIconName({extension:'mdb', size: 16, imageFileType: 'png'}) } />
        <h3>Size 20 archive icon as .png</h3>
        <Icon iconName={ getFileTypeIconName({extension:'7z', size: 20, imageFileType: 'png'}) } />
        <h3>Size 32 audio icon as .png</h3>
        <Icon iconName={ getFileTypeIconName({extension:'oga', size: 32, imageFileType: 'png'}) } />
        <h3>Size 40 code icon as .png</h3>
        <Icon iconName={ getFileTypeIconName({extension:'.cpp', size: 40, imageFileType: 'png'}) } />
        <h3>Size 48 csv icon as .png</h3>
        <Icon iconName={ getFileTypeIconName({extension:'csv', size: 48, imageFileType: 'png'}) } />
        <h3>Size 96 docx icon as .png</h3>
        <Icon iconName={ getFileTypeIconName({extension: 'docx', size: 96, imageFileType: 'png'}) } />
        <h3>Size 16 dotx icon as .svg</h3>
        <Icon iconName={ getFileTypeIconName({extension:'dot', size: 16, imageFileType: 'svg'}) } />
        <h3>Size 20 email icon as .svg</h3>
        <Icon iconName={ getFileTypeIconName({extension:'.msg', size: 20, imageFileType: 'svg'}) } />
        <h3>Size 32 exe icon as .svg</h3>
        <Icon iconName={ getFileTypeIconName({extension:'msi', size: 32}) } />
        <h3>Size 40 font icon as .svg</h3>
        <Icon iconName={ getFileTypeIconName({extension:'.woff', size: 40}) } />
        <h3>Size 48 html icon as .svg</h3>
        <Icon iconName={ getFileTypeIconName({extension:'html', size: 48}) } />
        <h3>Size 96 link icon as .svg</h3>
        <Icon iconName={ getFileTypeIconName({extension: 'url', size: 96}) } />
        <h3>Size 16 docset icon as .png</h3>
        <Icon iconName={ getFileTypeIconName({type: FileIconType.Docset, size: 16, imageFileType: 'png'}) } />
        <h3>Size 20 folder icon as .svg</h3>
        <Icon iconName={ getFileTypeIconName({type: FileIconType.Folder, size: 20, imageFileType: 'svg'}) } />
        <h3>Size 40 genericfile icon as .png</h3>
        <Icon iconName={ getFileTypeIconName({size: 40, imageFileType: 'png'}) } />
        <h3>Size 48 listitem icon as .svg</h3>
        <Icon iconName={ getFileTypeIconName({type: FileIconType.ListItem, size: 48, imageFileType: 'svg'}) } />
        <h3>Size 96 sharedfolder icon as .png</h3>
        <Icon iconName={ getFileTypeIconName({type: FileIconType.SharedFolder, size: 96, imageFileType: 'png'}) } />
      </div>
    );
  }
}
