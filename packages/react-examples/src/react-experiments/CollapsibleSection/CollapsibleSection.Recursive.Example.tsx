import * as React from 'react';
import { FocusZone, Text } from '@fluentui/react';
import { CollapsibleSection } from '@fluentui/react-experiments/lib/CollapsibleSection';

import { lorem } from '@fluentui/example-data';

export interface IFileItem {
  name: string;
  iconName: string;
}

const _folderItems: string[] = [];
const _fileItems: IFileItem[] = [];

const fileIcons: { name: string }[] = [
  { name: 'accdb' },
  { name: 'audio' },
  { name: 'code' },
  { name: 'csv' },
  { name: 'docx' },
  { name: 'dotx' },
  { name: 'mpt' },
  { name: 'model' },
  { name: 'one' },
  { name: 'onetoc' },
  { name: 'pdf' },
  { name: 'photo' },
  { name: 'pptx' },
  { name: 'presentation' },
  { name: 'potx' },
  { name: 'pub' },
  { name: 'rtf' },
  { name: 'spreadsheet' },
  { name: 'txt' },
  { name: 'vector' },
  { name: 'vsdx' },
  { name: 'xlsx' },
  { name: 'xltx' },
  { name: 'xsn' },
];

/**
 * Simple file element showing icon and name.
 */
interface IExampleFileProps {
  iconSource: string;
  filename: string;
  indent: number;
}

const ExampleFile = (props: IExampleFileProps) => {
  return (
    <div
      data-is-focusable="true"
      style={{ display: 'flex', alignItems: 'center', height: 24, paddingLeft: 4 + props.indent * 18 }}
    >
      <img src={props.iconSource} style={{ maxWidth: 16, padding: 6 }} />
      <Text variant="small">{props.filename}</Text>
    </div>
  );
};

/**
 * Example recursive folder structure with a random number of subfolders and items.
 */
class CollapsibleSectionFolder extends React.Component<{ indent?: number }, {}> {
  private _folders: JSX.Element[] = [];
  private _files: JSX.Element[] = [];

  constructor(props: { indent?: number }) {
    super(props);

    // Generate random folders

    // Generate random files
    const randomFileCount = Math.floor(Math.random() * 10) + 1;
    for (let i = 0; i < randomFileCount; i++) {
      const randomFile = Math.floor(Math.random() * _fileItems.length);
      this._files.push(
        <ExampleFile
          indent={(props.indent || 0) + 1}
          key={i}
          iconSource={_fileItems[randomFile].iconName}
          filename={_fileItems[randomFile].name}
        />,
      );
    }

    const randomFolderCount = Math.floor(Math.random() * 10) + 5;
    for (let i = 0; i < randomFolderCount; i++) {
      const randomFolder = Math.floor(Math.random() * _folderItems.length);
      this._folders.push(
        <CollapsibleSection
          key={i}
          defaultCollapsed={true}
          title={_folderItems[randomFolder]}
          indent={this.props.indent}
        >
          <CollapsibleSectionFolder indent={(this.props.indent || 0) + 1} />
          {this._files}
        </CollapsibleSection>,
      );
    }
  }

  public render(): JSX.Element {
    return <div>{this._folders}</div>;
  }
}

export class CollapsibleSectionRecursiveExample extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);

    //  Populate with items for demo.
    if (_fileItems.length === 0) {
      for (let i = 0; i < 500; i++) {
        let randomFolderName: string = lorem(2).replace(/\W/g, '');
        randomFolderName = randomFolderName.charAt(0).toUpperCase() + randomFolderName.slice(1);
        _folderItems.push(randomFolderName);

        const randomFileType = this._randomFileIcon();
        let randomFileName: string = lorem(2).replace(/\W/g, '');
        randomFileName =
          randomFileName.charAt(0).toUpperCase() + randomFileName.slice(1).concat(`.${randomFileType.docType}`);
        _fileItems.push({ name: randomFileName, iconName: randomFileType.url });
      }
    }
  }

  public render(): JSX.Element {
    return (
      <div>
        <FocusZone>
          <CollapsibleSectionFolder indent={0} />
        </FocusZone>
      </div>
    );
  }

  private _randomFileIcon(): { docType: string; url: string } {
    const docType: string = fileIcons[Math.floor(Math.random() * fileIcons.length) + 0].name;
    return {
      docType,
      url: `https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/assets/item-types/16/${docType}.svg`,
    };
  }
}
