import * as React from 'react';
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
  DocumentCardTitle,
  SelectionZone,
  FocusZone,
  ImageFit,
  IBasePickerProps
} from '../../../../index';
import {
  BasePicker
} from '../../../../components/Pickers/BasePicker';
import {
    IPickerItemProps
} from '../../../../components/Pickers/PickerItem.Props';
import './Picker.CustomResult.Example.scss';

export interface IPeoplePickerExampleState {
  contextualMenuVisible?: boolean;
  contextualMenuTarget?: HTMLElement;
}

export interface IFullDocumentCardProps {
  documentCardProps?: IDocumentCardProps;
  documentActionsProps?: IDocumentCardActionsProps;
  documentPreviewProps?: IDocumentCardPreviewProps;
  documentActivityProps?: IDocumentCardActivityProps;
  documentTitleProps?: IDocumentCardTitleProps;
}

export interface IDocumentPickerProps extends IBasePickerProps {
}

const data: IFullDocumentCardProps[] = [
  {
    documentPreviewProps: {
      previewImages: [
        {
          previewImageSrc: 'dist/document-preview.png',
          iconSrc: 'dist/icon-ppt.png',
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        },
        {
          previewImageSrc: 'dist/document-preview2.png',
          iconSrc: 'dist/icon-ppt.png',
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        },
        {
          previewImageSrc: 'dist/document-preview3.png',
          iconSrc: 'dist/icon-ppt.png',
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
        { name: 'Kat Larrson', profileImageSrc: 'dist/avatar-kat.png' },
        { name: 'Josh Hancock', profileImageSrc: '', initials: 'JH' },
        { name: 'Tina Dasani', profileImageSrc: 'dist/avatar-kat.png' }
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
          previewImageSrc: 'dist/document-preview.png',
          iconSrc: 'dist/icon-ppt.png',
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        },
        {
          previewImageSrc: 'dist/document-preview2.png',
          iconSrc: 'dist/icon-ppt.png',
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        },
        {
          previewImageSrc: 'dist/document-preview3.png',
          iconSrc: 'dist/icon-ppt.png',
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
        { name: 'Kat Larrson', profileImageSrc: 'dist/avatar-kat.png' },
        { name: 'Josh Hancock', profileImageSrc: '', initials: 'JH' },
        { name: 'Tina Dasani', profileImageSrc: 'dist/avatar-kat.png' }
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
          previewImageSrc: 'dist/document-preview.png',
          iconSrc: 'dist/icon-ppt.png',
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        },
        {
          previewImageSrc: 'dist/document-preview2.png',
          iconSrc: 'dist/icon-ppt.png',
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        },
        {
          previewImageSrc: 'dist/document-preview3.png',
          iconSrc: 'dist/icon-ppt.png',
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
        { name: 'Kat Larrson', profileImageSrc: 'dist/avatar-kat.png' },
        { name: 'Josh Hancock', profileImageSrc: '', initials: 'JH' },
        { name: 'Tina Dasani', profileImageSrc: 'dist/avatar-kat.png' }
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
          previewImageSrc: 'dist/document-preview.png',
          iconSrc: 'dist/icon-ppt.png',
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        },
        {
          previewImageSrc: 'dist/document-preview2.png',
          iconSrc: 'dist/icon-ppt.png',
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        },
        {
          previewImageSrc: 'dist/document-preview3.png',
          iconSrc: 'dist/icon-ppt.png',
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
        { name: 'Kat Larrson', profileImageSrc: 'dist/avatar-kat.png' },
        { name: 'Josh Hancock', profileImageSrc: '', initials: 'JH' },
        { name: 'Tina Dasani', profileImageSrc: 'dist/avatar-kat.png' }
      ]
    },
    documentTitleProps: {
      title: 'Document4',
      shouldTruncate: true
    }
  }
];

export const SuggestedDocumentItem: (documentProps: IFullDocumentCardProps) => JSX.Element = (documentProps: IFullDocumentCardProps) => {
  return (<div> { documentProps.documentTitleProps.title } </div>);
};

export const SelectedDocumentItem: (documentProps: IPickerItemProps) => JSX.Element = (documentProps: IPickerItemProps) => {
  let {
    documentActionsProps,
    documentPreviewProps,
    documentActivityProps,
    documentTitleProps
  } = documentProps.item;
  let actions = [];
  documentActionsProps.actions.forEach((action) => actions.push(action));
 actions.push({
    icon: 'Cancel', onClick: (ev: any) => { documentProps.onRemoveItem(); }
  });

  return (
    <DocumentCard
      onClick={ () => { console.log('You clicked the card.'); } }
      >
      <DocumentCardPreview { ...documentPreviewProps }/>
      <DocumentCardLocation location='Marketing Documents' locationHref='http://microsoft.com' ariaLabel='Location, Marketing Documents'/>
      <DocumentCardTitle { ...documentTitleProps }/>
      <DocumentCardActivity { ...documentActivityProps }/>
      <DocumentCardActions actions={ actions }/>
    </DocumentCard>
  );
};

export class PickerCustomResultExample extends React.Component<any, IPeoplePickerExampleState> {
  constructor() {
    super();
    this._onFilterChanged = this._onFilterChanged.bind(this);
  }

  public render() {
    return (
      <DocumentPicker
        onResolveSuggestions={this._onFilterChanged}
        onRenderItem={SelectedDocumentItem}
        onRenderSuggestion={SuggestedDocumentItem}
        getTextFromItem={(props: any) => props.documentTitleProps.title}
        />
    );
  }

  private _onFilterChanged(filterText: string) {
    return filterText ? data : [];
  }
}

export class DocumentPicker extends BasePicker<IDocumentPickerProps> {
  public render() {
    let { displayValue } = this.state;

    return (
      <div>
        <div ref='root' className='ms-BasePicker' onKeyDown={ this._onKeyDown }>
          <SelectionZone selection={ this._selection }>
            <div className='ms-BasePicker-text'>
              <input ref='input'
                onFocus={ this._onInputFocus }
                onChange={ this._onInputChange }
                value={ displayValue }
                className='ms-BasePicker-input'
                />
            </div>
          </SelectionZone>
        </div>
        <FocusZone ref='focusZone'>
          { this.renderItems() }
        </FocusZone>
        { this.renderSuggestions() }
      </div>
    );
  }
  protected _onBackSpace(ev: React.KeyboardEvent) {
    let { value } = this.state;
    if (ev.target === this.refs.input) {
      if (value && this.refs.input.selectionStart !== this.refs.input.selectionEnd) {
        this.setState({
          displayValue: value.substring(0, this.refs.input.selectionStart)
        });
      }
    }
  }
}