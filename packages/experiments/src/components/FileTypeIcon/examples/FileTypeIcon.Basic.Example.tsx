
import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { getIconName } from '@uifabric/file-type-icons/lib/IconHelper';

export class FileTypeIconBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <h3>Size 16 docx icon</h3>
        <Icon iconName={ getIconName('docm', 16) } />
        <h3>Size 32 model icon</h3>
        <Icon iconName={ getIconName('blend', 32) } />
        <h3>Size 64 pptx icon</h3>
        <Icon iconName={ getIconName('pptx', 64) } />
      </div>
    );
  }
}
