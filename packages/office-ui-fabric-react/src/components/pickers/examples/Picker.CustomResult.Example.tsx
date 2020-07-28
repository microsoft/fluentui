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
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Checkbox, ICheckboxStyles } from 'office-ui-fabric-react/lib/Checkbox';
import {
  IBasePickerProps,
  BasePickerListBelow,
  IPickerItemProps,
  ISuggestionItemProps,
} from 'office-ui-fabric-react/lib/Pickers';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

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

export interface IDocumentPickerProps extends IBasePickerProps<IFullDocumentCardProps> {}

const rootClass = mergeStyles({
  maxWidth: 500,
});

const baseProductionCdnUrl = 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/';
const TestImages = {
  documentPreview: baseProductionCdnUrl + 'document-preview.png',
  documentPreviewTwo: baseProductionCdnUrl + 'document-preview2.png',
  documentPreviewThree: baseProductionCdnUrl + 'document-preview3.png',
  iconPpt: 'https://static2.sharepointonline.com/files/fabric/assets/item-types/32/pptx.png',
  personaFemale: baseProductionCdnUrl + 'persona-female.png',
};

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
          accentColor: '#ce4b1f',
        },
      ],
    },
    documentCardProps: {},
    documentActionsProps: {
      actions: [
        {
          iconProps: { iconName: 'Share' },
          onClick: (ev: any) => {
            console.log('You clicked the share action.');
            ev.preventDefault();
            ev.stopPropagation();
          },
        },
        {
          iconProps: { iconName: 'Pin' },
          onClick: (ev: any) => {
            console.log('You clicked the pin action.');
            ev.preventDefault();
            ev.stopPropagation();
          },
        },
        {
          iconProps: { iconName: 'Ringer' },
          onClick: (ev: any) => {
            console.log('You clicked the Ringer action.');
            ev.preventDefault();
            ev.stopPropagation();
          },
        },
      ] as IButtonProps[],
    },
    documentActivityProps: {
      activity: 'Created Feb 23, 2016',
      people: [
        { name: 'Kat Larrson', profileImageSrc: TestImages.personaFemale },
        { name: 'Josh Hancock', profileImageSrc: '', initials: 'JH' },
        { name: 'Tina Dasani', profileImageSrc: TestImages.personaFemale },
      ],
    },
    documentTitleProps: {
      title: 'Document1',
      shouldTruncate: true,
    },
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
          accentColor: '#ce4b1f',
        },
      ],
    },
    documentCardProps: {},
    documentActionsProps: {
      actions: [
        {
          iconProps: { iconName: 'Share' },
          onClick: (ev: any) => {
            console.log('You clicked the share action.');
            ev.preventDefault();
            ev.stopPropagation();
          },
        },
        {
          iconProps: { iconName: 'Pin' },
          onClick: (ev: any) => {
            console.log('You clicked the pin action.');
            ev.preventDefault();
            ev.stopPropagation();
          },
        },
        {
          iconProps: { iconName: 'Ringer' },
          onClick: (ev: any) => {
            console.log('You clicked the Ringer action.');
            ev.preventDefault();
            ev.stopPropagation();
          },
        },
      ],
    },
    documentActivityProps: {
      activity: 'Created Feb 23, 2016',
      people: [
        { name: 'Kat Larrson', profileImageSrc: TestImages.personaFemale },
        { name: 'Josh Hancock', profileImageSrc: '', initials: 'JH' },
        { name: 'Tina Dasani', profileImageSrc: TestImages.personaFemale },
      ],
    },
    documentTitleProps: {
      title: 'Document2',
      shouldTruncate: true,
    },
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
          accentColor: '#ce4b1f',
        },
      ],
    },
    documentCardProps: {},
    documentActionsProps: {
      actions: [
        {
          iconProps: { iconName: 'Share' },
          onClick: (ev: any) => {
            console.log('You clicked the share action.');
            ev.preventDefault();
            ev.stopPropagation();
          },
        },
        {
          iconProps: { iconName: 'Pin' },
          onClick: (ev: any) => {
            console.log('You clicked the pin action.');
            ev.preventDefault();
            ev.stopPropagation();
          },
        },
        {
          iconProps: { iconName: 'Ringer' },
          onClick: (ev: any) => {
            console.log('You clicked the Ringer action.');
            ev.preventDefault();
            ev.stopPropagation();
          },
        },
      ],
    },
    documentActivityProps: {
      activity: 'Created Feb 23, 2016',
      people: [
        { name: 'Kat Larrson', profileImageSrc: TestImages.personaFemale },
        { name: 'Josh Hancock', profileImageSrc: '', initials: 'JH' },
        { name: 'Tina Dasani', profileImageSrc: TestImages.personaFemale },
      ],
    },
    documentTitleProps: {
      title: 'Document3',
      shouldTruncate: true,
    },
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
          accentColor: '#ce4b1f',
        },
      ],
    },
    documentCardProps: {},
    documentActionsProps: {
      actions: [
        {
          iconProps: { iconName: 'Share' },
          onClick: (ev: any) => {
            console.log('You clicked the share action.');
            ev.preventDefault();
            ev.stopPropagation();
          },
        },
        {
          iconProps: { iconName: 'Pin' },
          onClick: (ev: any) => {
            console.log('You clicked the pin action.');
            ev.preventDefault();
            ev.stopPropagation();
          },
        },
        {
          iconProps: { iconName: 'Ringer' },
          onClick: (ev: any) => {
            console.log('You clicked the Ringer action.');
            ev.preventDefault();
            ev.stopPropagation();
          },
        },
      ],
    },
    documentActivityProps: {
      activity: 'Created Feb 23, 2016',
      people: [
        { name: 'Kat Larrson', profileImageSrc: TestImages.personaFemale },
        { name: 'Josh Hancock', profileImageSrc: '', initials: 'JH' },
        { name: 'Tina Dasani', profileImageSrc: TestImages.personaFemale },
      ],
    },
    documentTitleProps: {
      title: 'Document4',
      shouldTruncate: true,
    },
  },
];

const SuggestedBigItem: (documentProps: IFullDocumentCardProps, itemProps: ISuggestionItemProps<any>) => JSX.Element = (
  documentProps: IFullDocumentCardProps,
  itemProps: ISuggestionItemProps<any>,
) => {
  const { documentPreviewProps, documentTitleProps } = documentProps;

  return (
    <Persona
      imageUrl={documentPreviewProps && documentPreviewProps.previewImages[0].previewImageSrc}
      text={documentTitleProps && documentTitleProps.title}
      size={PersonaSize.size40}
    />
  );
};

const SelectedDocumentItem: (documentProps: IPickerItemProps<IFullDocumentCardProps>) => JSX.Element = (
  documentProps: IPickerItemProps<IFullDocumentCardProps>,
) => {
  const { documentActionsProps, documentPreviewProps, documentActivityProps, documentTitleProps } = documentProps.item;
  const actions: IButtonProps[] = [];
  if (documentActionsProps) {
    documentActionsProps.actions.forEach((action: IButtonProps) => actions.push(action));
    actions.push({
      iconProps: { iconName: 'Cancel' },
      onClick: (ev: any) => {
        if (documentProps.onRemoveItem) {
          documentProps.onRemoveItem();
        }
      },
    });
  }
  const log = (text: string): (() => void) => (): void => console.log(text);

  return (
    <DocumentCard onClick={log('You clicked the card.')}>
      <DocumentCardPreview {...(documentPreviewProps as IDocumentCardPreviewProps)} />
      <DocumentCardLocation
        location="Marketing Documents"
        locationHref="http://microsoft.com"
        ariaLabel="Location, Marketing Documents"
      />
      <DocumentCardTitle {...(documentTitleProps as IDocumentCardTitleProps)} />
      <DocumentCardActivity {...(documentActivityProps as IDocumentCardActivityProps)} />
      <DocumentCardActions actions={actions} />
    </DocumentCard>
  );
};

class DocumentPicker extends BasePickerListBelow<IFullDocumentCardProps, IDocumentPickerProps> {}

const checkboxStyles: Partial<ICheckboxStyles> = { root: { margin: '10px 0' } };

export class PickerCustomResultExample extends React.Component<{}, IPeoplePickerExampleState> {
  constructor(props: {}) {
    super(props);
    this._onFilterChanged = this._onFilterChanged.bind(this);
    this.state = {
      isPickerDisabled: false,
    };
  }

  public render(): JSX.Element {
    return (
      <div className={rootClass}>
        <Checkbox
          styles={checkboxStyles}
          label="Disable Document Picker"
          checked={this.state.isPickerDisabled}
          onChange={this._onDisabledButtonClick}
        />
        <DocumentPicker
          removeButtonAriaLabel="Remove"
          onRenderSuggestionsItem={SuggestedBigItem as any}
          onResolveSuggestions={this._onFilterChanged}
          onRenderItem={SelectedDocumentItem}
          getTextFromItem={this._getTextFromItem}
          pickerSuggestionsProps={{
            suggestionsHeaderText: 'Suggested Documents',
            noResultsFoundText: 'No Documents Found',
          }}
          disabled={this.state.isPickerDisabled}
          inputProps={{
            onFocus: () => console.log('onFocus called'),
            onBlur: () => console.log('onBlur called'),
            'aria-label': 'Document Picker',
          }}
        />
      </div>
    );
  }

  private _getTextFromItem(props: any): any {
    return props.documentTitleProps.title;
  }

  private _onDisabledButtonClick = (): void => {
    this.setState({
      isPickerDisabled: !this.state.isPickerDisabled,
    });
  };

  private _onFilterChanged(filterText: string, items?: IFullDocumentCardProps[]): IFullDocumentCardProps[] {
    if (!items) {
      return [];
    }

    return filterText
      ? data
          .filter(
            item =>
              item.documentTitleProps &&
              item.documentTitleProps.title.toLowerCase().indexOf(filterText.toLowerCase()) === 0,
          )
          .filter(item => !this._listContainsDocument(item, items))
      : [];
  }

  private _listContainsDocument(document: IFullDocumentCardProps, items: IFullDocumentCardProps[]): boolean {
    if (!items || !items.length || items.length === 0) {
      return false;
    }
    const documentTitle = document.documentTitleProps && document.documentTitleProps.title;
    return (
      items.filter(item => (item.documentTitleProps && item.documentTitleProps.title) === documentTitle).length > 0
    );
  }
}
