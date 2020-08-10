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
import { Toggle, IToggleStyles } from 'office-ui-fabric-react/lib/Toggle';
import {
  IBasePickerProps,
  BasePickerListBelow,
  IPickerItemProps,
  ISuggestionItemProps,
  IInputProps,
  IBasePickerSuggestionsProps,
} from 'office-ui-fabric-react/lib/Pickers';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { useBoolean } from '@uifabric/react-hooks';

export interface IFullDocumentCardProps {
  documentCardProps?: IDocumentCardProps;
  documentActionsProps?: IDocumentCardActionsProps;
  documentPreviewProps?: IDocumentCardPreviewProps;
  documentActivityProps?: IDocumentCardActivityProps;
  documentTitleProps?: IDocumentCardTitleProps;
}

export interface IDocumentPickerProps extends IBasePickerProps<IFullDocumentCardProps> {}

class DocumentPicker extends BasePickerListBelow<IFullDocumentCardProps, IDocumentPickerProps> {}

const toggleStyles: Partial<IToggleStyles> = { root: { margin: '10px 0' } };

const inputProps: IInputProps = {
  onFocus: () => console.log('onFocus called'),
  onBlur: () => console.log('onBlur called'),
  'aria-label': 'Document picker',
};

const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested documents',
  noResultsFoundText: 'No documents found',
};

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
      imageUrl={documentPreviewProps?.previewImages[0].previewImageSrc}
      text={documentTitleProps && documentTitleProps.title}
      size={PersonaSize.size40}
    />
  );
};

const log = (text: string): (() => void) => (): void => console.log(text);

const SelectedDocumentItem: (documentProps: IPickerItemProps<IFullDocumentCardProps>) => JSX.Element = (
  documentProps: IPickerItemProps<IFullDocumentCardProps>,
) => {
  const { documentActionsProps, documentPreviewProps, documentActivityProps, documentTitleProps } = documentProps.item;
  const actions: IButtonProps[] = documentActionsProps
    ? [
        ...documentActionsProps.actions,
        {
          iconProps: { iconName: 'Cancel' },
          onClick: (ev: any) => {
            if (documentProps.onRemoveItem) {
              documentProps.onRemoveItem();
            }
          },
        },
      ]
    : [];

  return (
    <DocumentCard onClick={log('You clicked the card.')}>
      <DocumentCardPreview {...documentPreviewProps!} />
      <DocumentCardLocation
        location="Marketing Documents"
        locationHref="http://microsoft.com"
        ariaLabel="Location, Marketing Documents"
      />
      <DocumentCardTitle {...documentTitleProps!} />
      <DocumentCardActivity {...documentActivityProps!} />
      <DocumentCardActions actions={actions} />
    </DocumentCard>
  );
};

const getTextFromItem = (props: IFullDocumentCardProps): string => {
  return props.documentTitleProps!.title;
};

const listContainsDocument = (document: IFullDocumentCardProps, items: IFullDocumentCardProps[]): boolean => {
  if (!items || !items.length || items.length === 0) {
    return false;
  }
  const documentTitle = document.documentTitleProps && document.documentTitleProps.title;
  return items.some(item => (item.documentTitleProps && item.documentTitleProps.title) === documentTitle);
};

const onFilterChanged = (filterText: string, items?: IFullDocumentCardProps[]): IFullDocumentCardProps[] => {
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
        .filter(item => !listContainsDocument(item, items))
    : [];
};

export const PickerCustomResultExample: React.FunctionComponent = () => {
  const [isPickerDisabled, { toggle: toggleIsPickerDisabled }] = useBoolean(false);

  return (
    <div className={rootClass}>
      <Toggle
        styles={toggleStyles}
        label="Disable document picker"
        checked={isPickerDisabled}
        onChange={toggleIsPickerDisabled}
      />
      <DocumentPicker
        removeButtonAriaLabel="Remove"
        onRenderSuggestionsItem={SuggestedBigItem as any}
        onResolveSuggestions={onFilterChanged}
        onRenderItem={SelectedDocumentItem}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={pickerSuggestionsProps}
        disabled={isPickerDisabled}
        inputProps={inputProps}
      />
    </div>
  );
};
