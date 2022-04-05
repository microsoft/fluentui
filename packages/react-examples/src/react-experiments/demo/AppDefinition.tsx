import { IAppDefinition } from '@fluentui/react-docsite-components';
import { AppThemes } from './AppThemes';

export const AppDefinition: IAppDefinition = {
  appTitle: 'Fluent UI React - Experiments',
  themes: AppThemes,
  testPages: [],
  examplePages: [
    {
      links: [
        {
          component: require<any>('../CollapsibleSection/CollapsibleSectionPage').CollapsibleSectionPage,
          key: 'CollapsibleSection',
          name: 'CollapsibleSection',
          url: '#/examples/collapsiblesection',
        },
        {
          component: require<any>('../Chiclet/ChicletPage').ChicletPage,
          key: 'Chiclet',
          name: 'Chiclet',
          url: '#/examples/chiclet',
        },
        {
          component: require<any>('../FolderCover/FolderCoverPage').FolderCoverPage,
          key: 'FolderCover',
          name: 'FolderCover',
          url: '#/examples/foldercover',
        },
        {
          component: require<any>('../FileTypeIcon/FileTypeIconPage').FileTypeIconPage,
          key: 'FileTypeIcon',
          name: 'FileTypeIcon',
          url: '#/examples/filetypeicon',
        },
        {
          component: require<any>('../LayoutGroup/LayoutGroupPage').LayoutGroupPage,
          key: 'LayoutGroup',
          name: 'LayoutGroup',
          url: '#/examples/layoutgroup',
        },
        {
          component: require<any>('../MicroFeedback/MicroFeedbackPage').MicroFeedbackPage,
          key: 'MicroFeedback',
          name: 'MicroFeedback',
          url: '#/examples/microfeedback',
        },
        {
          component: require<any>('../Pagination/PaginationPage').PaginationPage,
          key: 'Pagination',
          name: 'Pagination',
          url: '#/examples/pagination',
        },
        {
          component: require<any>('../PersonaCoin/PersonaCoinPage').PersonaCoinPage,
          key: 'PersonaCoin',
          name: 'PersonaCoin',
          url: '#/examples/personacoin',
        },
        {
          component: require<any>('../Persona/PersonaPage').PersonaPage,
          key: 'Persona',
          name: 'Persona',
          url: '#/examples/persona',
        },
        {
          component: require<any>('../Signals/SignalsPage').SignalsPage,
          key: 'Signals',
          name: 'Signals',
          url: '#/examples/signals',
        },
        {
          component: require<any>('../Sidebar/SidebarPage').SidebarPage,
          key: 'Sidebar',
          name: 'Sidebar',
          url: '#/examples/sidebar',
        },
        {
          component: require<any>('../Slider/SliderPage').SliderPage,
          key: 'Slider',
          name: 'Slider',
          url: '#/examples/slider',
        },
        {
          component: require<any>('../Tile/TilePage').TilePage,
          key: 'Tile',
          name: 'Tile',
          url: '#/examples/tile',
        },
        {
          component: require<any>('../TilesList/TilesListPage').TilesListPage,
          key: 'TilesList',
          name: 'TilesList',
          url: '#/examples/tileslist',
        },
        {
          component: require<any>('../VirtualizedList/VirtualizedListPage').VirtualizedListPage,
          key: 'VirtualizedList',
          name: 'VirtualizedList',
          url: '#/examples/virtualizedlist',
        },
        {
          component: require<any>('../StaticList/StaticListPage').StaticListPage,
          key: 'StaticList',
          name: 'StaticList',
          url: '#/examples/staticlist',
        },
        {
          component: require<any>('../SelectedPeopleList/SelectedPeopleListPage').SelectedPeopleListPage,
          key: 'SelectedPeopleList',
          name: 'SelectedPeopleList',
          url: '#examples/selectedpeoplelist',
          category: 'Data Collections',
        },
        {
          component: require<any>('../FloatingPeopleSuggestions/FloatingSuggestionsPage').FloatingSuggestionsPage,
          key: 'FloatingSuggestionsPage',
          name: 'FloatingSuggestionsPage',
          url: '#examples/floatingpeoplesuggestions',
          category: 'Data Collections',
        },
        {
          component: require<any>('../Theming/ThemingPage').ThemingPage,
          key: 'ThemingPage',
          name: 'Theming',
          url: '#/examples/theming',
        },
        {
          component: require<any>('../UnifiedPeoplePicker/UnifiedPeoplePickerPage').UnifiedPeoplePickerPage,
          key: 'UnifiedPeoplePickerPage',
          name: 'UnifiedPeoplePickerPage',
          url: '#examples/unifiedpeoplepicker',
          category: 'Data Collections',
        },
      ],
    },
  ],
  headerLinks: [
    {
      name: 'Getting started',
      url: '#/',
    },
    {
      name: 'Fabric',
      url: 'https://developer.microsoft.com/en-us/fluentui',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/microsoft/fluentui',
    },
  ],
};
