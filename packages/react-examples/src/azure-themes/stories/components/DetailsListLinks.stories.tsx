/* tslint:disable */
import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { Link } from 'office-ui-fabric-react';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

const classNames = mergeStyleSets({
  fileIconHeaderIcon: {
    padding: 0,
    fontSize: '16px',
  },
  fileIconCell: {
    textAlign: 'center',
    selectors: {
      '&:before': {
        content: '.',
        display: 'inline-block',
        verticalAlign: 'middle',
        height: '100%',
        width: '0px',
        visibility: 'hidden',
      },
    },
  },
  fileIconImg: {
    verticalAlign: 'middle',
    maxHeight: '16px',
    maxWidth: '16px',
  },
  controlWrapper: {
    display: 'flex',
  },
  exampleToggle: {
    display: 'inline-block',
    marginBottom: '10px',
    marginRight: '30px',
  },
  selectionDetails: {
    marginBottom: '20px',
  },
});

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 250, marginTop: 12, height: 28, lineHeight: 28 },
};

const options: IDropdownOption[] = [
  { key: 'Theme', text: 'Theme', itemType: DropdownMenuItemType.Header },
  { key: 'belonging', text: 'Belonging' },
  { key: 'race', text: 'Race' },
  { key: 'raceanddesign', text: 'Race + Design' },
  { key: 'LGBTQIA+', text: 'LGBTQIA+' },
  { key: 'Type', text: 'Type', itemType: DropdownMenuItemType.Header },
  { key: 'read', text: 'Read' },
  { key: 'watch', text: 'Watch' },
  { key: 'listen', text: 'Listen' },
  { key: 'listen', text: 'Various' },
];

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { height: 28, width: 250 } };

export interface IDetailsListDocumentsExampleState {
  columns: IColumn[];
  items: IDocument[];
  selectionDetails: string;
  isModalSelection: boolean;
  isCompactMode: boolean;
  announcedMessage?: string;
  filtering: Array<string>;
  searching: string;
}

export interface IDocument {
  key: string;
  name: string;
  value: string;
  modifiedBy: string;
  dateModified: string;
  fileSize: string;
  contentLength: string;
  theme: string;
  url: string;
}

export class DetailsListDocumentsExample extends React.Component<{}, IDetailsListDocumentsExampleState> {
  private _selection: Selection;
  private _allItems: IDocument[];

  constructor(props: {}) {
    super(props);

    this._allItems = _generateDocuments();

    const columns: IColumn[] = [
      {
        key: 'column0',
        name: 'Theme',
        fieldName: 'theme',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
      },
      {
        key: 'column1',
        name: 'Title',
        fieldName: 'name',
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
        onRender: (item: IDocument) => {
          return <Link href={item.url}>{item.name}</Link>;
        },
      },
      {
        key: 'column2',
        name: 'Who',
        fieldName: 'whoCol',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        data: 'string',
        onRender: (item: IDocument) => {
          return <span>{item.dateModified}</span>;
        },
        isPadded: true,
      },
      {
        key: 'column3',
        name: 'Type',
        fieldName: 'modifiedBy',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsible: true,
        data: 'string',
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return <span>{item.modifiedBy}</span>;
        },
        isPadded: true,
      },
      {
        key: 'column4',
        name: 'Length',
        fieldName: 'contentLength',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsible: true,
        data: 'string',
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return <span>{item.fileSize}</span>;
        },
      },
    ];

    this._selection = new Selection({
      onSelectionChanged: () => {
        this.setState({
          selectionDetails: this._getSelectionDetails(),
        });
      },
    });

    this.state = {
      items: this._allItems,
      columns: columns,
      selectionDetails: this._getSelectionDetails(),
      isModalSelection: false,
      isCompactMode: true,
      announcedMessage: undefined,
      filtering: [],
      searching: '',
    };
  }

  public render() {
    const { columns, isCompactMode, items } = this.state;

    return (
      <div>
        <div className={classNames.controlWrapper}>
          <div style={{ alignSelf: 'flex-end', marginRight: 8 }}>
            <TextField styles={textFieldStyles} placeholder="Search for resource" onChange={this._onChangeText} />
          </div>
          <Dropdown
            placeholder="Filter theme and type"
            multiSelect
            options={options}
            styles={dropdownStyles}
            onChange={this.onChangeDropDown}
          />
        </div>
        <DetailsList
          items={items}
          compact={isCompactMode}
          columns={columns}
          getKey={this._getKey}
          setKey="none"
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
          onItemInvoked={this._onItemInvoked}
        />
      </div>
    );
  }

  public componentDidUpdate(previousProps: any, previousState: IDetailsListDocumentsExampleState) {
    if (previousState.isModalSelection !== this.state.isModalSelection && !this.state.isModalSelection) {
      this._selection.setAllSelected(false);
    }
  }

  private _getKey(item: any, index?: number): string {
    return item.key;
  }

  private _onChangeText = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text?: string): void => {
    console.log(text);
    this.setState({
      searching: text as string,
    });

    this.setFilterStateItems(text as string, this.state.filtering);
  };

  private onChangeDropDown = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption): void => {
    if (item) {
      let temp = this.state.filtering;
      if (item.selected) {
        temp.push(item.text.toLowerCase());
      } else {
        temp = temp.filter(text => text !== item.text.toLowerCase());
      }
      this.setState({
        filtering: temp,
      });

      this.setFilterStateItems(this.state.searching, temp);
    }
  };

  private setFilterStateItems(value: string, set: Array<string>): void {
    let temp = value
      ? this._allItems.filter(i => i.name.toLowerCase().indexOf(value.toLowerCase()) > -1)
      : this._allItems;
    console.log('beofre', temp);
    console.log('state', this.state);
    temp = set[0]
      ? temp.filter(i => set.indexOf(i.theme.toLowerCase()) > -1 || set.indexOf(i.modifiedBy.toLowerCase()) > -1)
      : temp;

    console.log('after', temp);

    this.setState({
      items: temp,
    });
  }

  private _onItemInvoked(item: any): void {
    window.open(item.url, 'CNN_WindowName');
  }

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return '';
      case 1:
        return '';
      default:
        return ``;
    }
  }

  private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { columns, items } = this.state;
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        this.setState({
          announcedMessage: `${currColumn.name} is sorted ${
            currColumn.isSortedDescending ? 'descending' : 'ascending'
          }`,
        });
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = _copyAndSort(items, currColumn.fieldName!, currColumn.isSortedDescending);
    this.setState({
      columns: newColumns,
      items: newItems,
    });
  };
}

function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
  const key = columnKey as keyof T;
  return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}

function _generateDocuments() {
  const items: IDocument[] = [];
  for (let i = 0; i < content.length - 1; i++) {
    let fileName = content[i].title;

    let userName = _lorem(2);
    userName = userName
      .split(' ')
      .map((name: string) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(' ');
    items.push({
      key: i.toString(),
      name: fileName,
      value: fileName,
      modifiedBy: content[i].type,
      dateModified: content[i].who,
      fileSize: content[i].length,
      contentLength: 'lorem ipsum',
      theme: content[i].theme,
      url: content[i].url,
    });
  }
  return items;
}

const LOREM_IPSUM = (
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut ' +
  'labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut ' +
  'aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ' +
  'eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt '
).split(' ');
let loremIndex = 0;
function _lorem(wordCount: number): string {
  const startIndex = loremIndex + wordCount > LOREM_IPSUM.length ? 0 : loremIndex;
  loremIndex = startIndex + wordCount;
  return LOREM_IPSUM.slice(startIndex, loremIndex).join(' ');
}

const content = [
  {
    theme: 'Belonging',
    title: 'Dare to Lead',
    who: 'Brene Brown',
    type: 'Read',
    length: '323 pages',
    url: 'https://daretolead.brenebrown.com/',
  },
  {
    theme: 'Belonging',
    title: 'Belonging At Work: Everyday Actions You Can Take to Cultivate an Inclusive Organization',
    who: 'Rhodes Perry MP',
    type: 'Read',
    length: '221 pages',
    url: 'https://www.goodreads.com/book/show/42768745-belonging-at-work',
  },
  {
    theme: 'Belonging',
    title: 'Inclusify',
    who: 'Stefanie Johnson',
    type: 'Read',
    length: '288 pages',
    url: 'https://inclusifybook.com/',
  },
  {
    theme: 'Belonging',
    title: 'Subtle Acts of Exclusion',
    who: 'Tiffany Jana, Michael Baran',
    type: 'Read',
    length: '200 pages',
    url: 'https://subtleactsofexclusion.com/',
  },
  {
    theme: 'Belonging',
    title: "We're All in This Together",
    who: 'Mike Robbins',
    type: 'Read',
    length: '208 pages',
    url: 'https://mike-robbins.com/together/',
  },
  {
    theme: 'Belonging',
    title: 'Othering & Belonging Journal',
    who: 'Various',
    type: 'Read',
    length: 'Various',
    url: 'https://belonging.berkeley.edu/othering-belonging-journal',
  },
  {
    theme: 'Belonging',
    title: "Brene Brown's Dare to Lead Podcast",
    who: 'Brene Brown',
    type: 'Listen',
    length: '1 hr episodes',
    url: 'https://brenebrown.com/dtl-podcast/',
  },
  {
    theme: 'Belonging',
    title: 'Where You Belong Podcast',
    who: 'Various',
    type: 'Listen',
    length: '1 hr episodes',
    url: 'https://player.fm/series/2778187',
  },
  {
    theme: 'Belonging',
    title: "Who Belongs? A Podcast from UC Berkeley's Other & Belonging Institute",
    who: 'Various',
    type: 'Listen',
    length: '30-45 min episodes',
    url: 'https://player.fm/series/who-belongs-a-podcast-on-othering-belonging',
  },
  {
    theme: 'Belonging',
    title: 'Belonging Podcast',
    who: 'Becca Piastrelli',
    type: 'Listen',
    length: '1 hr episodes',
    url: 'https://player.fm/series/2415481',
  },

  {
    theme: 'Belonging',
    title: 'Wendy Knight Agard: From the Inside Out TED Talk',
    who: 'Wendy Knight Agard',
    type: 'Watch',
    length: '14 mins',
    url: 'https://www.ted.com/talks/wendy_knight_agard_from_the_inside_out_diversity_inclusion_belonging',
  },
  {
    theme: 'Belonging',
    title: "An Outsider's Guide to Belonging in the 21st Century",
    who: 'Liza Bel',
    type: 'Watch',
    length: '13 mins',
    url: 'https://www.ted.com/talks/liza_bel_an_outsider_s_guide_to_belonging_in_the_21st_century',
  },
  {
    theme: 'Belonging',
    title: "It's Not Them, It's You: Belonging as an Ability",
    who: 'Jacqueline Duong',
    type: 'Watch',
    length: '5 mins',
    url: 'https://www.ted.com/talks/jacqueline_duong_it_s_not_them_it_s_you_belonging_as_an_ability_jan_2019',
  },
  {
    theme: 'Belonging',
    title: 'From the Inside Out: Diversity, Inclusion, and Belonging',
    who: 'Wendy Knight Agard',
    type: 'Watch',
    length: '13 mins',
    url: 'https://www.ted.com/talks/wendy_knight_agard_from_the_inside_out_diversity_inclusion_belonging',
  },
  {
    theme: 'Belonging',
    title: 'Challenging the Perception of Belonging',
    who: 'Kathy Vinokurav',
    type: 'Watch',
    length: '9 mins',
    url: 'https://www.ted.com/talks/kathy_vinokurov_challenging_the_perception_of_belonging',
  },
  {
    theme: 'Belonging',
    title: 'Belonging Now: What It Takes to Create the Conditions for Belonging',
    who: 'Various',
    type: 'Watch',
    length: '1 hr 10 mins',
    url: 'https://studentexperiencenetwork.org/belonging-now-what-it-takes-to-create-the-conditions-for-belonging/',
  },
  {
    theme: 'Race',
    title: 'So You Want to Talk About Race',
    who: 'Ijeoma Oluo',
    type: 'Read',
    length: '248 pages',
    url: 'https://www.goodreads.com/book/show/35099718-so-you-want-to-talk-about-race',
  },
  {
    theme: 'Race',
    title: 'How to be Anti-Racist',
    who: 'Ibram Kendi',
    type: 'Read',
    length: '305 pages',
    url: 'https://www.goodreads.com/book/show/40265832-how-to-be-an-antiracist',
  },
  {
    theme: 'Race',
    title: 'Stamped from the Beginning',
    who: 'Ibram Kendi',
    type: 'Read',
    length: '592 pages',
    url: 'https://www.goodreads.com/book/show/25898216-stamped-from-the-beginning',
  },
  {
    theme: 'Race',
    title: 'Stamped: Racism, Anti-racism, and You',
    who: 'Jason Reynold, Ibram X Kendi',
    type: 'Read',
    length: '294 pages',
    url: 'https://www.goodreads.com/book/show/52220686-stamped',
  },
  {
    theme: 'Race',
    title: "White Fragility: Why It's So Hard for White People to Talk About Racism",
    who: 'Robin DiAngelo, Michael Eric Dyson',
    type: 'Read',
    length: '192 pages',
    url: 'https://www.goodreads.com/book/show/43708708-white-fragility',
  },
  {
    theme: 'Race',
    title: "Why I'm No Longer Talking to White People About Race",
    who: 'Reni Eddo-Lodge',
    type: 'Read',
    length: '249 pages',
    url: 'https://www.goodreads.com/book/show/33606119-why-i-m-no-longer-talking-to-white-people-about-race',
  },
  {
    theme: 'Race',
    title: 'Me and White Supremacy: Combat Racism, Change the World, and Become a Good Ancestor',
    who: 'Layla Saad, Robin DiAngelo',
    type: 'Read',
    length: '256 pages',
    url: 'https://www.goodreads.com/book/show/46002342-me-and-white-supremacy',
  },
  {
    theme: 'Race',
    title: 'Between the World and Me',
    who: 'Ta-nehisi Coates',
    type: 'Read',
    length: '152 pages',
    url: 'https://www.goodreads.com/book/show/25489625-between-the-world-and-me',
  },
  {
    theme: 'Race',
    title: 'The Latino Threat',
    who: 'Leo R. Chavez',
    type: 'Read',
    length: '272 pages',
    url: 'https://www.goodreads.com/book/show/4813368-the-latino-threat',
  },
  {
    theme: 'Race',
    title: 'Yellow',
    who: 'Frank H. Wu',
    type: 'Read',
    length: '416 pages',
    url: 'https://www.goodreads.com/book/show/235258.Yellow?from_search=true&from_srp=true&qid=Lsf4VUfFT8&rank=1',
  },
  {
    theme: 'Race',
    title: 'The New Jim Crow: Mass Incarceration in the Age of Colorblindness',
    who: 'Michelle Alexander ',
    type: 'Read',
    length: '290 pages',
    url: 'https://www.goodreads.com/book/show/6792458-the-new-jim-crow',
  },
  {
    theme: 'Race',
    title: 'Are Prisons Obsolete?',
    who: 'Angela Y. Davis',
    type: 'Read',
    length: '128 pages',
    url: 'https://www.goodreads.com/book/show/108428.Are_Prisons_Obsolete_',
  },
  {
    theme: 'Race',
    title: 'The End of Policing',
    who: 'Alex S. Vitale',
    type: 'Read',
    length: '272 pages',
    url: 'https://www.goodreads.com/en/book/show/35403039-the-end-of-policing',
  },
  {
    theme: 'Race',
    title: 'The Condemnation of Blackness: Race, Crime, and the Making of Modern Urban America',
    who: 'Khalil Gibran Muhammad',
    type: 'Read',
    length: '380 pages',
    url: 'https://www.goodreads.com/book/show/7093931-the-condemnation-of-blackness',
  },
  {
    theme: 'Race',
    title: 'Locking Up Our Own: Crime and Punishment in Black America',
    who: 'James Forman Jr. ',
    type: 'Read',
    length: '320 pages',
    url: 'https://www.goodreads.com/book/show/34846249-locking-up-our-own',
  },
  {
    theme: 'Race',
    title: 'Race for Profit: How Banks and the Real Estate Industry Undermined Black Homeownership',
    who: 'Keeanga-Yamahtta Taylor ',
    type: 'Read',
    length: '368 pages',
    url: 'https://www.goodreads.com/book/show/44601366-race-for-profit',
  },
  {
    theme: 'Race',
    title: 'Retrieving data. Wait a few seconds and try to cut or copy again.',
    who: 'Keeanga-Yamahtta Taylor ',
    type: 'Read',
    length: '368 pages',
    url: 'https://www.goodreads.com/book/show/44601366-race-for-profit',
  },
  {
    theme: 'Race',
    title: 'The Color of Law: A Forgotten History of How Our Government Segregated America',
    who: 'Richard Rothstein',
    type: 'Read',
    length: '369 pages',
    url: 'https://www.goodreads.com/book/show/32191706-the-color-of-law',
  },
  {
    theme: 'Race',
    title: 'Evicted: Poverty and Profit in the American City',
    who: 'Matthew Desmond ',
    type: 'Read',
    length: '432 pages',
    url: 'https://www.evictedbook.com/',
  },
  {
    theme: 'Race',
    title: 'One Person, No Vote: How Voter Suppression is Destroying Our Democracy',
    who: 'Carol Anderson',
    type: 'Read',
    length: '288 pages',
    url: 'https://www.goodreads.com/book/show/36711317-one-person-no-vote',
  },
  {
    theme: 'Race',
    title: 'White Negroes: When Cornrows Were in Vogue ... and Other Thoughts on Cultural Appropriation',
    who: 'Lauren Michele Jackson See Less  ',
    type: 'Read',
    length: '184 pages',
    url: 'https://www.goodreads.com/book/show/44140832-white-negroes',
  },
  {
    theme: 'Race',
    title: 'The 1619 Project',
    who: 'Various',
    type: 'Listen',
    length: 'Various',
    url: 'https://www.nytimes.com/column/1619-project',
  },
  {
    theme: 'Race',
    title: 'About Race',
    who: 'Reni Eddo-Lodge',
    type: 'Listen',
    length: '30 min episodes',
    url: 'https://www.aboutracepodcast.com/',
  },
  {
    theme: 'Race',
    title: 'Code Switch (NPR)',
    who: 'Various',
    type: 'Listen',
    length: 'Various',
    url: 'https://www.npr.org/sections/codeswitch/',
  },
  {
    theme: 'Race',
    title: 'Code Switch (NPR)',
    who: 'Various',
    type: 'Listen',
    length: 'Various',
    url: 'https://www.npr.org/sections/codeswitch/',
  },
  {
    theme: 'Race',
    title: 'The Diversity Gap',
    who: 'Bethaney Wilkinson',
    type: 'Listen',
    length: '45 min episodes',
    url: 'https://open.spotify.com/show/53n5hQoh67eBVbCtN4Iezy',
  },
  {
    theme: 'Race',
    title: 'Intersectionality Matters',
    who: 'Kimberle Crenshaw',
    type: 'Listen',
    length: '1 hr episodes',
    url: 'https://soundcloud.com/intersectionality-matters',
  },
  {
    theme: 'Race',
    title: 'Momentum: A Race Forward Podcast',
    who: 'Various',
    type: 'Listen',
    length: '45 min episodes',
    url: 'https://www.raceforward.org/media/podcast/momentum-race-forward-podcast',
  },
  {
    theme: 'Race',
    title: 'Pod for the Cause',
    who: 'Various',
    type: 'Listen',
    length: '45 min episodes',
    url: 'https://civilrights.org/podforthecause/',
  },
  {
    theme: 'Race',
    title: 'Pod Save the People',
    who: 'DeRay Mckesson',
    type: 'Listen',
    length: '1 hr episodes',
    url: 'https://open.spotify.com/show/1Y3colnIhnNfvBcK8O9y7p',
  },
  {
    theme: 'Race',
    title: 'Seeing White',
    who: 'John Biewen',
    type: 'Listen',
    length: 'Various',
    url: 'https://www.sceneonradio.org/seeing-white/',
  },
  {
    theme: 'Race',
    title: 'White Black',
    who: 'Various',
    type: 'Listen',
    length: 'Various',
    url: 'https://whileblackpodcast.podbean.com/',
  },
  {
    theme: 'Race',
    title: 'Is BlackEnglish a Dialect of a Language?',
    who: 'Various',
    type: 'Listen',
    length: 'Various',
    url:
      'http://www.slate.com/articles/podcasts/lexicon_valley/2012/02/lexicon_valley_is_black_english_a_dialect_or_a_language_.html',
  },
  {
    theme: 'Race',
    title: 'Abolish Big Data / Data for Black Lives keynote',
    who: 'Yeshimabeit Milner',
    type: 'Watch',
    length: '1 hr 18 mins',
    url: 'https://vimeo.com/375310799',
  },
  {
    theme: 'Race',
    title: 'How Studying Privilege Systems Can Strengthen Compassion',
    who: 'Peggy McIntosh',
    type: 'Watch',
    length: '18 mins',
    url: 'https://www.youtube.com/watch?v=e-BY9UEewHw',
  },
  {
    theme: 'Race',
    title: 'Designing for a More Equitable World ',
    who: 'Antionette Carroll',
    type: 'Watch',
    length: '5 mins',
    url: 'https://www.youtube.com/watch?v=z9XKBgdOrHU',
  },
  {
    theme: 'Race',
    title: 'Where are the Black Designers?',
    who: 'Various',
    type: 'Watch',
    length: 'Various',
    url: '',
  },
  {
    theme: 'Race',
    title: "Let's get the root of racial injustice",
    who: 'Megan Ming Francis',
    type: 'Watch',
    length: '19 mins',
    url: 'https://www.youtube.com/watch?v=-aCn72iXO9s',
  },
  {
    theme: 'Race',
    title: '13th',
    who: 'Various',
    type: 'Watch',
    length: '1 hr 40 mins',
    url: 'https://www.imdb.com/title/tt5895028/',
  },
  {
    theme: 'Race',
    title: 'Diverse Voices Presents: Exploring Antiracist AI',
    who: 'Dr. Timnit Gebru',
    type: 'Watch',
    length: '1 hr',
    url:
      'https://msit.microsoftstream.com/video/cfac0840-98dc-94b1-a344-f1eb9711f564?channelId=8113a4ff-0400-9fb2-5505-f1eb1d52527c',
  },
  {
    theme: 'Race + Design',
    title: 'Black Designers Missing in Action',
    who: 'Cheryl D Miller',
    type: 'Read',
    length: '11 pages',
    url: 'https://www.scribd.com/document/287765658/Black-Designers-Missing-in-Action-by-Cheryl-D-Miller',
  },
  {
    theme: 'Race + Design',
    title: 'Where are the Black Designers?',
    who: 'Maurice Cherry',
    type: 'Read',
    length: 'N/A',
    url: 'https://www.aiga.org/resources',
  },
  {
    theme: 'Race + Design',
    title: 'Racism and Inequity are Products of Design. They Can Be Redesigned.',
    who: 'equityXdesign',
    type: 'Read',
    length: '19 mins to read',
    url:
      'https://medium.com/equity-design/racism-and-inequity-are-products-of-design-they-can-be-redesigned-12188363cc6a',
  },
  {
    theme: 'Race + Design',
    title: 'On Design Thinking',
    who: 'Maggie Gram',
    type: 'Read',
    length: '',
    url: 'https://nplusonemag.com/issue-35/reviews/on-design-thinking/',
  },
  {
    theme: 'Race + Design',
    title: 'How to think differently about doin ggood as a creative person',
    who: 'Omayeli Arenyeka',
    type: 'Read',
    length: '',
    url: 'https://thecreativeindependent.com/guides/how-to-think-differently-about-doing-good-as-a-creative-person/',
  },
  {
    theme: 'LGBTQIA+',
    title: 'The Economic Case for LGBT Equality',
    who: 'M. V. Lee Badgett ',
    type: 'Read',
    length: '240 pages',
    url: 'https://www.goodreads.com/book/show/49656839-the-economic-case-for-lgbt-equality',
  },
  {
    theme: 'LGBTQIA+',
    title: 'We Are Everywhere: Protest, Power, and Pride in the History of Queer Liberation',
    who: 'Matthew Riemer and Leighton Brown',
    type: 'Read',
    length: '368 pages',
    url: 'https://www.goodreads.com/book/show/41429532-we-are-everywhere',
  },
  {
    theme: 'LGBTQIA+',
    title: 'LGBTQI+ Video Series',
    who: 'Various',
    type: 'Watch',
    length: 'Various',
    url: 'https://microsoft.sharepoint.com/sites/infopedia/globallearning/pages/lgbtqi-series.aspx',
  },
];
