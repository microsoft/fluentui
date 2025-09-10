import { html, ref, repeat } from '@microsoft/fast-element';

import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { DropdownOption as FluentOption } from '../option/option.js';
import type { Dropdown as FluentDropdown } from './dropdown.js';
import { DropdownAppearance, DropdownSize, DropdownType } from './dropdown.options.js';

type Story = StoryObj<FluentDropdown>;

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
    appearance: {
      control: 'select',
      options: ['', ...Object.values(DropdownAppearance)],
      table: { category: 'attributes' },
    },
    type: {
      control: 'radio',
      options: Object.values(DropdownType),
      table: { category: 'attributes' },
    },
    placeholder: {
      control: 'text',
      table: { category: 'attributes' },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'attributes' },
    },
    multiple: {
      control: 'boolean',
      table: { category: 'attributes' },
    },
    name: {
      control: 'text',
      table: { category: 'attributes' },
    },
    required: {
      control: 'boolean',
      table: { category: 'attributes' },
    },
    size: {
      control: 'select',
      options: ['', ...Object.values(DropdownSize)],
      table: { category: 'attributes' },
    },
    slottedContent: { table: { disable: true } },
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
      { value: 'orange', slottedContent: () => 'Orange' },
      { value: 'mango', slottedContent: () => 'Mango' },
      { value: 'kiwi', slottedContent: () => 'Kiwi' },
      { value: 'cherry', slottedContent: () => 'Cherry' },
      { value: 'grapefruit', slottedContent: () => 'Grapefruit' },
      { value: 'papaya', slottedContent: () => 'Papaya' },
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
