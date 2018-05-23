import * as React from 'react';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { CollapsibleSection, CollapsibleSectionTitle } from '..';
import { lorem } from '@uifabric/example-app-base';

const _collapsibleSectionItems: string[] = [];
const _fileItems: string[] = [];

const fileIcons: { name: string; }[] = [
  { 'name': 'accdb' },
  { 'name': 'csv' },
  { 'name': 'docx' },
  { 'name': 'dotx' },
  { 'name': 'mpp' },
  { 'name': 'mpt' },
  { 'name': 'odp' },
  { 'name': 'ods' },
  { 'name': 'odt' },
  { 'name': 'one' },
  { 'name': 'onepkg' },
  { 'name': 'onetoc' },
  { 'name': 'potx' },
  { 'name': 'ppsx' },
  { 'name': 'pptx' },
  { 'name': 'pub' },
  { 'name': 'vsdx' },
  { 'name': 'vssx' },
  { 'name': 'vstx' },
  { 'name': 'xls' },
  { 'name': 'xlsx' },
  { 'name': 'xltx' },
  { 'name': 'xsn' }
];

export interface IACollapsibleSectionFolderProps {
  level: number;
}

// TODO: clean up use of multiple FocusZones

class CollapsibleSectionFolder extends React.Component<IACollapsibleSectionFolderProps, {}> {
  public render(): JSX.Element {
    return (
      <div>
        { _collapsibleSectionItems.map((fileItem: string, i: number) => {
          return (
            <CollapsibleSection
              key={ i }
              collapsed={ true }
              titleAs={ CollapsibleSectionTitle }
              titleProps={ {
                text: fileItem,
                indent: this.props.level,
              } }
            >
              <CollapsibleSectionFolder level={ this.props.level + 1 } />
            </CollapsibleSection>);
        }) }
        { _fileItems.map((fileItem: string, i: number) => { return (<Label key={ i }>{ fileItem }</Label>); }) }
      </div>);
  }
}

export class CollapsibleSectionRecursiveExample extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);

    //  Populate with items for demos.
    if (_fileItems.length === 0) {
      for (let i = 0; i < 5; i++) {
        let randomFolderName: string = lorem(2).replace(/\W/g, '');
        randomFolderName = randomFolderName.charAt(0).toUpperCase() + randomFolderName.slice(1);
        _collapsibleSectionItems.push(randomFolderName);
      }
      for (let i = 0; i < 5; i++) {
        const randomDocType: string = fileIcons[Math.floor(Math.random() * fileIcons.length) + 0].name;
        let randomFileName: string = lorem(2).replace(/\W/g, '');
        randomFileName = randomFileName.charAt(0).toUpperCase() + randomFileName.slice(1).concat(`.${randomDocType}`);
        _fileItems.push(randomFileName);
      }
    }
  }

  public render(): JSX.Element {
    return (
      <div>
        <FocusZone>
          <CollapsibleSectionFolder level={ 0 } />
        </FocusZone>
      </div>
    );
  }
}
