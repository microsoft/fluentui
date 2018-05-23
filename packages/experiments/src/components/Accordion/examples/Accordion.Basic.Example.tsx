import * as React from 'react';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Accordion, AccordionTitle } from '..';
import { lorem } from '@uifabric/example-app-base';

const _accordionItems: string[] = [];
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

export interface IAccordionFolderProps {
  level: number;
}

// TODO: clean up use of multiple FocusZones

class AccordionFolder extends React.Component<IAccordionFolderProps, {}> {
  public render(): JSX.Element {
    return (
      <div>
        { _accordionItems.map((fileItem: string, i: number) => {
          return (
            <Accordion
              key={ i }
              collapsed={ true }
              titleAs={ AccordionTitle }
              titleProps={ {
                text: fileItem,
                indent: this.props.level,
              } }
            >
              <AccordionFolder level={ this.props.level + 1 } />
            </Accordion>);
        }) }
        { _fileItems.map((fileItem: string, i: number) => { return (<Label key={ i }>{ fileItem }</Label>); }) }
      </div>);
  }
}

export class AccordionBasicExample extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);

    //  Populate with items for demos.
    if (_fileItems.length === 0) {
      for (let i = 0; i < 5; i++) {
        let randomFolderName: string = lorem(2).replace(/\W/g, '');
        randomFolderName = randomFolderName.charAt(0).toUpperCase() + randomFolderName.slice(1);
        _accordionItems.push(randomFolderName);
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
          <AccordionFolder level={ 0 } />
        </FocusZone>
      </div>
    );
  }
}
