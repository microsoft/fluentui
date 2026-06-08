import { html, ref, repeat } from '@microsoft/fast-element';

import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { DropdownOption as FluentOption } from '../option/option.js';
import { getStorybookHelpers } from '../../.storybook/wc-toolkit-helpers.js';
import type { Dropdown as FluentDropdown } from './dropdown.js';
import { DropdownAppearance, DropdownSize, DropdownType } from './dropdown.options.js';

type Story = StoryObj<FluentDropdown>;
const { argTypes } = getStorybookHelpers<FluentDropdown>('fluent-dropdown');

const optionTemplate = html<StoryArgs<FluentOption>>` <fluent-option
  ?disabled="${story => story.disabled}"
  ?selected="${story => story.selected}"
  value="${story => story.value}"
  placeholder="${story => story.placeholder}"
  >${story => story.slottedContent?.()}</fluent-option
>`;

const dropdownTemplate = html<StoryArgs<FluentDropdown>>`
  <fluent-dropdown
    appearance="${story => story.appearance}"
    ?disabled="${story => story.disabled}"
    ?multiple="${story => story.multiple}"
    ?required="${story => story.required}"
    name="${story => story.name}"
    size="${story => story.size}"
    id="${story => story.id}"
    placeholder="${story => story.placeholder}"
    slot="${story => story.slot}"
    type="${story => story.type}"
  >
    <fluent-listbox>${repeat(story => story.slottedContent?.(), optionTemplate)}</fluent-listbox>
  </fluent-dropdown>
`;

const storyTemplate = html<StoryArgs<FluentDropdown>>`
  <fluent-field ?disabled="${story => story.disabled}">
    <label slot="label">${story => story.placeholder}</label>
    <fluent-dropdown
      slot="input"
      appearance="${story => story.appearance}"
      ?disabled="${story => story.disabled}"
      ?multiple="${story => story.multiple}"
      ?required="${story => story.required}"
      name="${story => story.name}"
      size="${story => story.size}"
      id="${story => story.id}"
      placeholder="${story => story.placeholder}"
      slot="${story => story.slot}"
      type="${story => story.type}"
      ${ref('dropdown')}
    >
      <fluent-listbox>${repeat(story => story.slottedContent?.(), optionTemplate)}</fluent-listbox>
    </fluent-dropdown>
  </fluent-field>
`;

export default {
  title: 'Components/Dropdown',
  render: renderComponent(storyTemplate),
  argTypes: {
    ...argTypes,
    slot: { table: { disable: true } },
  },
} as Meta<FluentDropdown>;

export const Default: Story = {
  args: {
    placeholder: 'Select a fruit',
    slot: 'input',
    slottedContent: () => [
      { value: 'apple', slottedContent: () => 'Apple' },
      { value: 'banana', slottedContent: () => 'Banana' },
      { value: 'blueberry', slottedContent: () => 'Blueberry' },
      { value: 'orange', slottedContent: () => 'Orange' },
      { value: 'mango', slottedContent: () => 'Mango' },
      { value: 'kiwi', slottedContent: () => 'Kiwi' },
      { value: 'cherry', slottedContent: () => 'Cherry' },
      { value: 'grapefruit', slottedContent: () => 'Grapefruit' },
      { value: 'papaya', slottedContent: () => 'Papaya' },
      { value: 'pear', slottedContent: () => 'Pear' },
      { value: 'peach', slottedContent: () => 'Peach' },
      { value: 'lychee', slottedContent: () => 'Lychee' },
    ],
  },
};

export const MultipleSelection: Story = {
  args: {
    ...Default.args,
    multiple: true,
    placeholder: 'Select fruits',
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: DropdownSize.small,
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: DropdownSize.large,
  },
};

export const FilledLighter: Story = {
  args: {
    ...Default.args,
    appearance: DropdownAppearance.filledLighter,
  },
};

export const FilledDarker: Story = {
  args: {
    ...Default.args,
    appearance: DropdownAppearance.filledDarker,
  },
};

export const Outline: Story = {
  args: {
    ...Default.args,
    appearance: DropdownAppearance.outline,
  },
};

export const Transparent: Story = {
  args: {
    ...Default.args,
    appearance: DropdownAppearance.transparent,
  },
};

export const Inline: Story = {
  render: renderComponent(html<StoryArgs<FluentDropdown>>`
    <p>Some text inline with the ${dropdownTemplate} and more text.</p>
  `),
  args: {
    ...Default.args,
    slot: null,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const DisabledOptions: Story = {
  args: {
    ...Default.args,
    slottedContent: () => [
      { disabled: true, value: 'apple', slottedContent: () => 'Apple' },
      { value: 'banana', slottedContent: () => 'Banana' },
      { value: 'orange', slottedContent: () => 'Orange' },
      { disabled: true, value: 'mango', slottedContent: () => 'Mango' },
      { disabled: true, value: 'kiwi', slottedContent: () => 'Kiwi' },
      { value: 'cherry', slottedContent: () => 'Cherry' },
      { value: 'grapefruit', slottedContent: () => 'Grapefruit' },
      { disabled: true, value: 'papaya', slottedContent: () => 'Papaya' },
      { value: 'lychee', slottedContent: () => 'Lychee' },
    ],
  },
};

export const ManyOptions: Story = {
  args: {
    placeholder: 'Select a Country',
    slot: 'input',
    slottedContent: () =>
      [
        'Afghanistan',
        'Åland Islands',
        'Albania',
        'Algeria',
        'American Samoa',
        'Andorra',
        'Angola',
        'Anguilla',
        'Antarctica',
        'Antigua and Barbuda',
        'Argentina',
        'Armenia',
        'Aruba',
        'Australia',
        'Austria',
        'Azerbaijan',
        'Bahamas',
        'Bahrain',
        'Bangladesh',
        'Barbados',
        'Belarus',
        'Belgium',
        'Belize',
        'Benin',
        'Bermuda',
        'Bhutan',
        'Bolivia',
        'Bonaire',
        'Bosnia and Herzegovina',
        'Botswana',
        'Bouvet Island',
        'Brazil',
        'British Indian Ocean Territory',
        'British Virgin Islands',
        'Brunei',
        'Bulgaria',
        'Burkina Faso',
        'Burundi',
        'Cabo Verde',
        'Cambodia',
        'Cameroon',
        'Canada',
        'Cayman Islands',
        'Central African Republic',
        'Chad',
        'Chile',
        'China',
        'Christmas Island',
        'Cocos (Keeling) Islands',
        'Colombia',
        'Comoros',
        'Congo',
        'Congo (DRC)',
        'Cook Islands',
        'Costa Rica',
        'Côte d’Ivoire',
        'Croatia',
        'Curaçao',
        'Cyprus',
        'Czechia',
        'Denmark',
        'Djibouti',
        'Dominica',
        'Dominican Republic',
        'Ecuador',
        'Egypt',
        'El Salvador',
        'Equatorial Guinea',
        'Eritrea',
        'Estonia',
        'Eswatini',
        'Ethiopia',
        'Falkland Islands',
        'Faroe Islands',
        'Fiji',
        'Finland',
        'France',
        'French Guiana',
        'French Polynesia',
        'French Southern Territories',
        'Gabon',
        'Gambia',
        'Georgia',
        'Germany',
        'Ghana',
        'Gibraltar',
        'Greece',
        'Greenland',
        'Grenada',
        'Guadeloupe',
        'Guam',
        'Guatemala',
        'Guernsey',
        'Guinea',
        'Guinea-Bissau',
        'Guyana',
        'Haiti',
        'Heard Island and McDonald Islands',
        'Honduras',
        'Hong Kong SAR',
        'Hungary',
        'Iceland',
        'India',
        'Indonesia',
        'Iraq',
        'Ireland',
        'Isle of Man',
        'Israel',
        'Italy',
        'Jamaica',
        'Jan Mayen',
        'Japan',
        'Jersey',
        'Jordan',
        'Kazakhstan',
        'Kenya',
        'Kiribati',
        'Korea',
        'Kosovo',
        'Kuwait',
        'Kyrgyzstan',
        'Laos',
        'Latvia',
        'Lebanon',
        'Lesotho',
        'Liberia',
        'Libya',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Macao SAR',
        'Madagascar',
        'Malawi',
        'Malaysia',
        'Maldives',
        'Mali',
        'Malta',
        'Marshall Islands',
        'Martinique',
        'Mauritania',
        'Mauritius',
        'Mayotte',
        'Mexico',
        'Micronesia',
        'Moldova',
        'Monaco',
        'Mongolia',
        'Montenegro',
        'Montserrat',
        'Morocco',
        'Mozambique',
        'Myanmar',
        'Namibia',
        'Nauru',
        'Nepal',
        'Netherlands',
        'New Caledonia',
        'New Zealand',
        'Nicaragua',
        'Niger',
        'Nigeria',
        'Niue',
        'Norfolk Island',
        'North Macedonia',
        'Northern Mariana Islands',
        'Norway',
        'Oman',
        'Pakistan',
        'Palau',
        'Palestinian Authority',
        'Panama',
        'Papua New Guinea',
        'Paraguay',
        'Peru',
        'Philippines',
        'Pitcairn Islands',
        'Poland',
        'Portugal',
        'Puerto Rico',
        'Qatar',
        'Réunion',
        'Romania',
        'Russia',
        'Rwanda',
        'Saba',
        'Saint Barthélemy',
        'Saint Kitts and Nevis',
        'Saint Lucia',
        'Saint Martin',
        'Saint Pierre and Miquelon',
        'Saint Vincent and the Grenadines',
        'Samoa',
        'San Marino',
        'São Tomé and Príncipe',
        'Saudi Arabia',
        'Senegal',
        'Serbia',
        'Seychelles',
        'Sierra Leone',
        'Singapore',
        'Sint Eustatius',
        'Sint Maarten',
        'Slovakia',
        'Slovenia',
        'Solomon Islands',
        'Somalia',
        'South Africa',
        'South Georgia and South Sandwich Islands',
        'South Sudan',
        'Spain',
        'Sri Lanka',
        'St Helena, Ascension, Tristan da Cunha',
        'Suriname',
        'Svalbard',
        'Sweden',
        'Switzerland',
        'Taiwan',
        'Tajikistan',
        'Tanzania',
        'Thailand',
        'Timor-Leste',
        'Togo',
        'Tokelau',
        'Tonga',
        'Trinidad and Tobago',
        'Tunisia',
        'Turkey',
        'Turkmenistan',
        'Turks and Caicos Islands',
        'Tuvalu',
        'U.S. Outlying Islands',
        'U.S. Virgin Islands',
        'Uganda',
        'Ukraine',
        'United Arab Emirates',
        'United Kingdom',
        'United States',
        'Uruguay',
        'Uzbekistan',
        'Vanuatu',
        'Vatican City',
        'Venezuela',
        'Vietnam',
        'Wallis and Futuna',
        'Yemen',
        'Zambia',
        'Zimbabwe',
      ].map(value => ({ slottedContent: () => value })),
  },
};

export const Required: Story = {
  render: renderComponent(html<StoryArgs<FluentDropdown>>`
    <form
      @reset="${story => story.successMessage.toggleAttribute('hidden', true)}"
      @submit="${story => story.dropdown.checkValidity() && story.successMessage.toggleAttribute('hidden', false)}"
    >
      ${storyTemplate}
      <br />
      <div>
        <fluent-button type="submit" appearance="primary">Submit</fluent-button>
        <fluent-button id="reset-button" type="reset" ${ref('resetButton')}>Reset</fluent-button>
      </div>
      <span id="success-message" hidden ${ref('successMessage')}>Form submitted successfully!</span>
    </form>
  `),
  args: {
    ...Default.args,
    name: 'fruit',
    required: true,
    multiple: true,
  },
};

export const OverflowScroll: Story = {
  render: renderComponent(html<StoryArgs<FluentDropdown>>`
    <div style="height: 300px; width: 50vw; overflow: scroll; outline: 1px solid black;">
      <div style="height: 400px;">Scroll down to see the dropdown ↓</div>
      ${storyTemplate}
      <div style="height: 400px;"></div>
    </div>
  `),
  args: { ...Default.args },
};

export const InsideDialog: Story = {
  render: renderComponent(html<StoryArgs<FluentDropdown>>`
    <fluent-button @click="${story => story.dialog.show()}">Open dialog</fluent-button>
    <fluent-dialog ${ref('dialog')} aria-label="Dropdown in a dialog">
      <fluent-dialog-body>
        <h3 slot="title">Dropdown in a dialog</h3>
        ${storyTemplate}
      </fluent-dialog-body>
    </fluent-dialog>
  `),
  args: { ...Default.args },
};

export const InsideDialogWithScrollingContent: Story = {
  render: renderComponent(html<StoryArgs<FluentDropdown>>`
    <fluent-button @click="${story => story.dialog.show()}">Open dialog</fluent-button>
    <fluent-dialog ${ref('dialog')} aria-label="Dropdown in a dialog with scrolling content">
      <fluent-dialog-body style="max-block-size: 30vb;">
        <h3 slot="title">Dropdown in a dialog</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec lectus non lorem iaculis luctus. Proin ac
          dolor eget enim commodo pretium. Duis ut nibh ac metus interdum finibus. Integer maximus ante a tincidunt
          pretium. Aliquam erat volutpat. Sed nec ante vel lectus dignissim commodo id ut elit. Curabitur ullamcorper
          sapien id mauris interdum, ac placerat mi malesuada. Duis aliquam, dolor eget facilisis mollis, ante leo
          tincidunt quam, vel convallis ipsum turpis et turpis. Mauris fermentum neque nec tortor semper tempus. Integer
          malesuada, nunc ac cursus facilisis, lectus mauris interdum erat, in vulputate risus velit in neque. Etiam
          volutpat ante nec fringilla tempus. Quisque et lobortis dolor. Fusce sit amet odio sed ipsum fringilla auctor.
          Suspendisse faucibus tellus in luctus hendrerit. Vestibulum euismod velit non laoreet feugiat. Nam sit amet
          velit urna. Cras consectetur tempor sem, in suscipit sem ultrices id. Vivamus id felis fringilla, scelerisque
          nulla non, aliquam leo. In pharetra mauris ut enim ullamcorper, id suscipit quam ullamcorper. Quisque
          tincidunt, felis nec congue elementum, mauris est finibus ex, ut volutpat ante est nec est. Aliquam tempor,
          turpis ac scelerisque dignissim, metus velit rutrum sem, eget efficitur mauris erat in metus. Vestibulum in
          urna massa. Donec eleifend leo at dui convallis aliquet. Integer eleifend, velit ut consequat tempus, enim
          elit ultricies diam, at congue enim enim id nunc. Nullam fringilla bibendum nulla, at lacinia sem bibendum
          eget. Nunc posuere ipsum sed enim facilisis efficitur. Pellentesque id semper mi, a feugiat sem. Nunc
          interdum, leo ut tincidunt consectetur, nunc mauris accumsan nulla, vel ultricies velit erat nec sapien.
          Praesent eleifend ex at odio scelerisque cursus. Morbi eget tellus sed sapien scelerisque cursus at a ante.
          Sed venenatis vehicula erat eu feugiat. Ut eu elit vitae urna tincidunt pulvinar nec at nunc. Vestibulum eget
          tristique sapien. Sed egestas sapien vel ante viverra pharetra. Cras sit amet felis at nulla tincidunt euismod
          vitae et justo. Duis nec rutrum lectus, nec lobortis quam. Pellentesque habitant morbi tristique senectus et
          netus et malesuada fames ac turpis egestas. Sed ac ex condimentum, consectetur felis non, maximus odio. Sed
          mattis arcu id justo fringilla, a tristique purus vestibulum. Nulla nec fringilla quam. Sed ac elit ac sem
          posuere cursus nec vitae mauris. Suspendisse nec pulvinar risus. Sed a tincidunt elit, in gravida tortor.
          Quisque sollicitudin lectus vel interdum tempor. Fusce dictum fermentum sem sed suscipit. Vivamus sollicitudin
          ex turpis, sit amet consequat leo auctor at. Donec fermentum aliquet lectus, sit amet efficitur nibh
          pellentesque et. Curabitur dapibus quam vitae lectus pellentesque, vitae varius massa facilisis. Quisque
          consectetur eros a arcu cursus fringilla. Fusce efficitur auctor nibh, nec sollicitudin eros semper eget. Cras
          a elit ut tortor semper volutpat eu vel nunc. Duis dapibus quam risus, ac tristique nisl aliquam eu. Curabitur
          vel ipsum non nunc euismod fringilla vel a lorem. Curabitur viverra magna ac justo fringilla, eu vestibulum
          purus finibus. Donec elementum volutpat libero, in tempus massa convallis vitae. Curabitur vitae mauris id
          urna dictum pharetra. Nullam vehicula arcu arcu, vitae elementum enim tincidunt at. Duis eleifend, lorem a
          efficitur facilisis, nulla dolor finibus orci, et ullamcorper orci ex ac purus. Aenean sem lectus, malesuada
          id magna id, facilisis condimentum nibh. Cras tempor neque mi, sit amet suscipit libero consectetur non.
          Nullam id eleifend mauris. Mauris iaculis lectus eu scelerisque efficitur. In id suscipit libero. Donec
          condimentum, purus ac laoreet facilisis, risus lorem facilisis neque, id volutpat felis mi eget metus. Nulla
          facilisi. Donec consequat tincidunt nunc sed elementum. Integer consectetur tristique orci, ut congue justo
          pellentesque eu. Fusce faucibus iaculis mauris, eu lobortis orci egestas eget. Nullam nec arcu bibendum,
          cursus diam ac, facilisis enim. Nulla facilisi. Curabitur lacinia odio mauris, a gravida nisi volutpat in.
          Aliquam at maximus felis. Vestibulum convallis dignissim urna id gravida.
        </p>
        ${storyTemplate}
      </fluent-dialog-body>
    </fluent-dialog>
  `),
  args: { ...Default.args },
};

export const InsideNonModalDialog: Story = {
  render: renderComponent(html<StoryArgs<FluentDropdown>>`
    <div style="min-block-size: 20rem;">
      <fluent-button @click="${story => story.dialog.show()}">Open dialog</fluent-button>
      <fluent-dialog ${ref('dialog')} type="non-modal" aria-label="Dropdown in a non-modal dialog">
        <fluent-dialog-body>
          <h3 slot="title">Dropdown in a non-modal dialog</h3>
          ${storyTemplate}
        </fluent-dialog-body>
      </fluent-dialog>
    </div>
  `),
  args: { ...Default.args },
};
