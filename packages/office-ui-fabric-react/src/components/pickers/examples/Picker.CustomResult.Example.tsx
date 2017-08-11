import * as React from 'react';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { SelectionZone } from 'office-ui-fabric-react/lib/DetailsList';
import {
  IDocumentCardActionsProps,
  IDocumentCardPreviewProps,
  IDocumentCardProps,
  IDocumentCardTitleProps,
  IDocumentCardActivityProps,
  DocumentCard,
  DocumentCardActions,
  DocumentCardActivity,
  DocumentCardLocation,
  DocumentCardPreview,
  DocumentCardTitle
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import {
  IBasePickerProps,
  BasePickerListBelow,
  BaseAutoFill,
  IPickerItemProps,
  ISuggestionsProps,
  ISuggestionItemProps
} from 'office-ui-fabric-react/lib/Pickers';
import './Picker.CustomResult.Example.scss';
import { TestImages } from '../../../common/TestImages';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';

export interface IPeoplePickerExampleState {
  contextualMenuVisible?: boolean;
  contextualMenuTarget?: HTMLElement;
  isPickerDisabled?: boolean;
}

export interface IFullDocumentCardProps {
  documentCardProps?: IDocumentCardProps;
  documentActionsProps?: IDocumentCardActionsProps;
  documentPreviewProps?: IDocumentCardPreviewProps;
  documentActivityProps?: IDocumentCardActivityProps;
  documentTitleProps?: IDocumentCardTitleProps;
}

export interface IDocumentPickerProps extends IBasePickerProps<IFullDocumentCardProps> {
}

const data: IFullDocumentCardProps[] = [
  {
    documentPreviewProps: {
      previewImages: [
        {
          previewImageSrc: TestImages.documentPreview,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        }
      ]
    },
    documentCardProps: {},
    documentActionsProps: {
      actions:
      [
        {
          icon: 'Share', onClick: (ev: any) => {
            console.log('You clicked the share action.');
            ev.preventDefault();
            ev.stopPropagation();
          }
        },
        {
          icon: 'Pin', onClick: (ev: any) => {
            console.log('You clicked the pin action.');
            ev.preventDefault();
            ev.stopPropagation();
          }
        },
        {
          icon: 'Ringer', onClick: (ev: any) => {
            console.log('You clicked the Ringer action.');
            ev.preventDefault();
            ev.stopPropagation();
          }
        },
      ]
    },
    documentActivityProps: {
      activity: 'Created Feb 23, 2016',
      people:
      [
        { name: 'Kat Larrson', profileImageSrc: TestImages.personaFemale },
        { name: 'Josh Hancock', profileImageSrc: '', initials: 'JH' },
        { name: 'Tina Dasani', profileImageSrc: TestImages.personaFemale }
      ]
    },
    documentTitleProps: {
      title: 'Document1',
      shouldTruncate: true
    }
  },
  {
    documentPreviewProps: {
      previewImages: [
        {
          previewImageSrc: TestImages.documentPreview,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        }
      ]
    },
    documentCardProps: {},
    documentActionsProps: {
      actions:
      [
        {
          icon: 'Share', onClick: (ev: any) => {
            console.log('You clicked the share action.');
            ev.preventDefault();
            ev.stopPropagation();
          }
        },
        {
          icon: 'Pin', onClick: (ev: any) => {
            console.log('You clicked the pin action.');
            ev.preventDefault();
            ev.stopPropagation();
          }
        },
        {
          icon: 'Ringer', onClick: (ev: any) => {
            console.log('You clicked the Ringer action.');
            ev.preventDefault();
            ev.stopPropagation();
          }
        },
      ]
    },
    documentActivityProps: {
      activity: 'Created Feb 23, 2016',
      people:
      [
        { name: 'Kat Larrson', profileImageSrc: TestImages.personaFemale },
        { name: 'Josh Hancock', profileImageSrc: '', initials: 'JH' },
        { name: 'Tina Dasani', profileImageSrc: TestImages.personaFemale }
      ]
    },
    documentTitleProps: {
      title: 'Document2',
      shouldTruncate: true
    }
  },
  {
    documentPreviewProps: {
      previewImages: [
        {
          previewImageSrc: TestImages.documentPreviewTwo,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        }
      ]
    },
    documentCardProps: {},
    documentActionsProps: {
      actions:
      [
        {
          icon: 'Share', onClick: (ev: any) => {
            console.log('You clicked the share action.');
            ev.preventDefault();
            ev.stopPropagation();
          }
        },
        {
          icon: 'Pin', onClick: (ev: any) => {
            console.log('You clicked the pin action.');
            ev.preventDefault();
            ev.stopPropagation();
          }
        },
        {
          icon: 'Ringer', onClick: (ev: any) => {
            console.log('You clicked the Ringer action.');
            ev.preventDefault();
            ev.stopPropagation();
          }
        },
      ]
    },
    documentActivityProps: {
      activity: 'Created Feb 23, 2016',
      people:
      [
        { name: 'Kat Larrson', profileImageSrc: TestImages.personaFemale },
        { name: 'Josh Hancock', profileImageSrc: '', initials: 'JH' },
        { name: 'Tina Dasani', profileImageSrc: TestImages.personaFemale }
      ]
    },
    documentTitleProps: {
      title: 'Document3',
      shouldTruncate: true
    }
  },
  {
    documentPreviewProps: {
      previewImages: [
        {
          previewImageSrc: TestImages.documentPreviewThree,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        }
      ]
    },
    documentCardProps: {},
    documentActionsProps: {
      actions:
      [
        {
          icon: 'Share', onClick: (ev: any) => {
            console.log('You clicked the share action.');
            ev.preventDefault();
            ev.stopPropagation();
          }
        },
        {
          icon: 'Pin', onClick: (ev: any) => {
            console.log('You clicked the pin action.');
            ev.preventDefault();
            ev.stopPropagation();
          }
        },
        {
          icon: 'Ringer', onClick: (ev: any) => {
            console.log('You clicked the Ringer action.');
            ev.preventDefault();
            ev.stopPropagation();
          }
        },
      ]
    },
    documentActivityProps: {
      activity: 'Created Feb 23, 2016',
      people:
      [
        { name: 'Kat Larrson', profileImageSrc: TestImages.personaFemale },
        { name: 'Josh Hancock', profileImageSrc: '', initials: 'JH' },
        { name: 'Tina Dasani', profileImageSrc: TestImages.personaFemale }
      ]
    },
    documentTitleProps: {
      title: 'Document4',
      shouldTruncate: true
    }
  }
];

export const SuggestedDocumentItem: (documentProps: IFullDocumentCardProps) => JSX.Element = (documentProps: IFullDocumentCardProps) => {
  return (<div> { documentProps.documentTitleProps && documentProps.documentTitleProps.title } </div>);
};

export const SuggestedBigItem: (documentProps: IFullDocumentCardProps, itemProps: ISuggestionItemProps<any>) => JSX.Element = (documentProps: IFullDocumentCardProps, itemProps: ISuggestionItemProps<any>) => {
  let {
    documentPreviewProps,
    documentTitleProps
  } = documentProps;
  let {
    onClick
  } = itemProps;
  return (
    <Persona
      imageUrl={ documentPreviewProps && documentPreviewProps.previewImages[0].previewImageSrc }
      primaryText={ documentTitleProps && documentTitleProps.title }
      size={ PersonaSize.small } />
  );
};

export const SelectedDocumentItem: (documentProps: IPickerItemProps<IFullDocumentCardProps>) => JSX.Element = (documentProps: IPickerItemProps<IFullDocumentCardProps>) => {
  let {
    documentActionsProps,
    documentPreviewProps,
    documentActivityProps,
    documentTitleProps
  } = documentProps.item;
  let actions: IButtonProps[] = [];
  if (documentActionsProps) {
    documentActionsProps.actions.forEach((action: IButtonProps) => actions.push(action));
    actions.push({
      icon: 'Cancel', onClick: (ev: any) => {
        if (documentProps.onRemoveItem) {
          documentProps.onRemoveItem();
        }
      }
    });
  }

  return (
    <DocumentCard
      onClick={ () => { console.log('You clicked the card.'); } }
    >
      <DocumentCardPreview { ...(documentPreviewProps as IDocumentCardPreviewProps) } />
      <DocumentCardLocation location='Marketing Documents' locationHref='http://microsoft.com' ariaLabel='Location, Marketing Documents' />
      <DocumentCardTitle { ...(documentTitleProps as IDocumentCardTitleProps) } />
      <DocumentCardActivity { ...(documentActivityProps as IDocumentCardActivityProps) } />
      <DocumentCardActions actions={ actions } />
    </DocumentCard>
  );
};

export class DocumentPicker extends BasePickerListBelow<IFullDocumentCardProps, IDocumentPickerProps> {
}
export class PickerCustomResultExample extends React.Component<any, IPeoplePickerExampleState> {
  constructor() {
    super();
    this._onFilterChanged = this._onFilterChanged.bind(this);
    this.state = {
      isPickerDisabled: false
    };
  }

  public render() {
    return (
      <div>
        <Checkbox label='Disable Document Picker' checked={ this.state.isPickerDisabled } onChange={ this._onDisabledButtonClick.bind(this) } />
        <DocumentPicker
          onRenderSuggestionsItem={ SuggestedBigItem as any }
          onResolveSuggestions={ this._onFilterChanged }
          onRenderItem={ SelectedDocumentItem }
          getTextFromItem={ (props: any) => props.documentTitleProps.title }
          pickerSuggestionsProps={
            {
              suggestionsHeaderText: 'Suggested Documents',
              noResultsFoundText: 'No Documents Found',
              suggestionsItemClassName: 'ms-DocumentPicker-bigSuggestion'
            }
          }
          disabled={ this.state.isPickerDisabled }
          inputProps={ {
            onFocus: () => console.log('onFocus called'),
            onBlur: () => console.log('onBlur called')
          } }
        />
      </div>
    );
  }

  private _onDisabledButtonClick(): void {
    this.setState({
      isPickerDisabled: !this.state.isPickerDisabled
    });
  }

  private _onFilterChanged(filterText: string, items: IFullDocumentCardProps[]) {
    return filterText ? data.filter(item => item.documentTitleProps && item.documentTitleProps.title.toLowerCase().indexOf(filterText.toLowerCase()) === 0).filter(item => !this._listContainsDocument(item, items)) : [];
  }

  private _listContainsDocument(document: IFullDocumentCardProps, items: IFullDocumentCardProps[]) {
    if (!items || !items.length || items.length === 0) {
      return false;
    }
    let documentTitle = document.documentTitleProps && document.documentTitleProps.title;
    return items.filter(item => (item.documentTitleProps && item.documentTitleProps.title) === documentTitle).length > 0;
  }
}
