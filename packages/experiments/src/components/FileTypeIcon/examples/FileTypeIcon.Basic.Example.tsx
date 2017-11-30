
import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { getFileTypeIconName } from '@uifabric/file-type-icons/lib/IconHelper';

export class FileTypeIconBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <h3>Size 16 docx icon</h3>
        <Icon iconName={ getFileTypeIconName({extension:'docm', size: 16, imageFileType: 'png'}) } />
        <h3>Size 32 model icon</h3>
        <Icon iconName={ getFileTypeIconName({extension:'blend', size: 32, imageFileType: 'png'}) } />
        <h3>Size 48 pptx icon</h3>
        <Icon iconName={ getFileTypeIconName({extension:'pptx', size: 48, imageFileType: 'png'}) } />
      </div>
    );
  }
}
