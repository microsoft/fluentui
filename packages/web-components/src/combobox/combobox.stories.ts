import { html, repeat } from '@microsoft/fast-element';
import type { Meta, StoryArgs, StoryObj } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import type { DropdownOption as FluentDropdownOption } from '../option/option.js';
import type { Dropdown as FluentDropdown } from '../dropdown/dropdown.js';
import { DropdownAppearance, DropdownSize, DropdownType } from '../dropdown/dropdown.options.js';

type Story = StoryObj<FluentDropdown>;

const optionTemplate = html<StoryArgs<FluentDropdownOption>>` <fluent-option
  ?disabled="${story => story.disabled}"
  ?selected="${story => story.selected}"
  ?freeform="${story => story.freeform}"
  value="${story => story.value}"
  placeholder="${story => story.placeholder}"
  >${story => story.slottedContent?.()}</fluent-option
>`;

const dropdownTemplate = html<StoryArgs<FluentDropdown>>`
  <fluent-dropdown
    appearance="${story => story.appearance}"
    ?disabled="${story => story.disabled}"
    ?multiple="${story => story.multiple}"
    size="${story => story.size}"
    id="${story => story.id}"
    placeholder="${story => story.placeholder}"
    slot="${story => story.slot}"
    type="${story => story.type}"
    value="${story => story.value}"
  >
    <fluent-listbox>${repeat(story => story.slottedContent, optionTemplate)}</fluent-listbox>
  </fluent-dropdown>
`;

const storyTemplate = html<StoryArgs<FluentDropdown>>`
  <fluent-field ?disabled="${story => story.disabled}"
    ><label slot="label">Fruit</label>${dropdownTemplate}</fluent-field
  >
`;

export default {
  title: 'Components/Combobox',
  parameters: {
    docs: {
      description: {
        component: `The Combobox component is a variant of the <a href="/docs/components-dropdown--docs">Dropdown</a> component.
        To use a combobox, use <code>&lt;fluent-dropdown type="combobox"&gt;</code>.`,
      },
    },
  },
  render: renderComponent(storyTemplate),
  args: {
    type: DropdownType.combobox,
  },
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
    multiple: {
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
    slottedContent: [
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

export const Freeform: Story = {
  args: {
    ...Default.args,
    slottedContent: [
      {
        freeform: true,
        slottedContent: () => html<StoryArgs<FluentDropdownOption>>`Search for '<output></output>'`,
      },
      ...Default.args!.slottedContent,
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

export const ManyOptions: Story = {
  args: {
    ...Default.args,
    placeholder: 'Select a Country',
    slottedContent: [
      { slottedContent: () => 'Afghanistan' },
      { slottedContent: () => 'Åland Islands' },
      { slottedContent: () => 'Albania' },
      { slottedContent: () => 'Algeria' },
      { slottedContent: () => 'American Samoa' },
      { slottedContent: () => 'Andorra' },
      { slottedContent: () => 'Angola' },
      { slottedContent: () => 'Anguilla' },
      { slottedContent: () => 'Antarctica' },
      { slottedContent: () => 'Antigua and Barbuda' },
      { slottedContent: () => 'Argentina' },
      { slottedContent: () => 'Armenia' },
      { slottedContent: () => 'Aruba' },
      { slottedContent: () => 'Australia' },
      { slottedContent: () => 'Austria' },
      { slottedContent: () => 'Azerbaijan' },
      { slottedContent: () => 'Bahamas' },
      { slottedContent: () => 'Bahrain' },
      { slottedContent: () => 'Bangladesh' },
      { slottedContent: () => 'Barbados' },
      { slottedContent: () => 'Belarus' },
      { slottedContent: () => 'Belgium' },
      { slottedContent: () => 'Belize' },
      { slottedContent: () => 'Benin' },
      { slottedContent: () => 'Bermuda' },
      { slottedContent: () => 'Bhutan' },
      { slottedContent: () => 'Bolivia' },
      { slottedContent: () => 'Bonaire' },
      { slottedContent: () => 'Bosnia and Herzegovina' },
      { slottedContent: () => 'Botswana' },
      { slottedContent: () => 'Bouvet Island' },
      { slottedContent: () => 'Brazil' },
      { slottedContent: () => 'British Indian Ocean Territory' },
      { slottedContent: () => 'British Virgin Islands' },
      { slottedContent: () => 'Brunei' },
      { slottedContent: () => 'Bulgaria' },
      { slottedContent: () => 'Burkina Faso' },
      { slottedContent: () => 'Burundi' },
      { slottedContent: () => 'Cabo Verde' },
      { slottedContent: () => 'Cambodia' },
      { slottedContent: () => 'Cameroon' },
      { slottedContent: () => 'Canada' },
      { slottedContent: () => 'Cayman Islands' },
      { slottedContent: () => 'Central African Republic' },
      { slottedContent: () => 'Chad' },
      { slottedContent: () => 'Chile' },
      { slottedContent: () => 'China' },
      { slottedContent: () => 'Christmas Island' },
      { slottedContent: () => 'Cocos (Keeling) Islands' },
      { slottedContent: () => 'Colombia' },
      { slottedContent: () => 'Comoros' },
      { slottedContent: () => 'Congo' },
      { slottedContent: () => 'Congo (DRC)' },
      { slottedContent: () => 'Cook Islands' },
      { slottedContent: () => 'Costa Rica' },
      { slottedContent: () => 'Côte d’Ivoire' },
      { slottedContent: () => 'Croatia' },
      { slottedContent: () => 'Curaçao' },
      { slottedContent: () => 'Cyprus' },
      { slottedContent: () => 'Czechia' },
      { slottedContent: () => 'Denmark' },
      { slottedContent: () => 'Djibouti' },
      { slottedContent: () => 'Dominica' },
      { slottedContent: () => 'Dominican Republic' },
      { slottedContent: () => 'Ecuador' },
      { slottedContent: () => 'Egypt' },
      { slottedContent: () => 'El Salvador' },
      { slottedContent: () => 'Equatorial Guinea' },
      { slottedContent: () => 'Eritrea' },
      { slottedContent: () => 'Estonia' },
      { slottedContent: () => 'Eswatini' },
      { slottedContent: () => 'Ethiopia' },
      { slottedContent: () => 'Falkland Islands' },
      { slottedContent: () => 'Faroe Islands' },
      { slottedContent: () => 'Fiji' },
      { slottedContent: () => 'Finland' },
      { slottedContent: () => 'France' },
      { slottedContent: () => 'French Guiana' },
      { slottedContent: () => 'French Polynesia' },
      { slottedContent: () => 'French Southern Territories' },
      { slottedContent: () => 'Gabon' },
      { slottedContent: () => 'Gambia' },
      { slottedContent: () => 'Georgia' },
      { slottedContent: () => 'Germany' },
      { slottedContent: () => 'Ghana' },
      { slottedContent: () => 'Gibraltar' },
      { slottedContent: () => 'Greece' },
      { slottedContent: () => 'Greenland' },
      { slottedContent: () => 'Grenada' },
      { slottedContent: () => 'Guadeloupe' },
      { slottedContent: () => 'Guam' },
      { slottedContent: () => 'Guatemala' },
      { slottedContent: () => 'Guernsey' },
      { slottedContent: () => 'Guinea' },
      { slottedContent: () => 'Guinea-Bissau' },
      { slottedContent: () => 'Guyana' },
      { slottedContent: () => 'Haiti' },
      { slottedContent: () => 'Heard Island and McDonald Islands' },
      { slottedContent: () => 'Honduras' },
      { slottedContent: () => 'Hong Kong SAR' },
      { slottedContent: () => 'Hungary' },
      { slottedContent: () => 'Iceland' },
      { slottedContent: () => 'India' },
      { slottedContent: () => 'Indonesia' },
      { slottedContent: () => 'Iraq' },
      { slottedContent: () => 'Ireland' },
      { slottedContent: () => 'Isle of Man' },
      { slottedContent: () => 'Israel' },
      { slottedContent: () => 'Italy' },
      { slottedContent: () => 'Jamaica' },
      { slottedContent: () => 'Jan Mayen' },
      { slottedContent: () => 'Japan' },
      { slottedContent: () => 'Jersey' },
      { slottedContent: () => 'Jordan' },
      { slottedContent: () => 'Kazakhstan' },
      { slottedContent: () => 'Kenya' },
      { slottedContent: () => 'Kiribati' },
      { slottedContent: () => 'Korea' },
      { slottedContent: () => 'Kosovo' },
      { slottedContent: () => 'Kuwait' },
      { slottedContent: () => 'Kyrgyzstan' },
      { slottedContent: () => 'Laos' },
      { slottedContent: () => 'Latvia' },
      { slottedContent: () => 'Lebanon' },
      { slottedContent: () => 'Lesotho' },
      { slottedContent: () => 'Liberia' },
      { slottedContent: () => 'Libya' },
      { slottedContent: () => 'Liechtenstein' },
      { slottedContent: () => 'Lithuania' },
      { slottedContent: () => 'Luxembourg' },
      { slottedContent: () => 'Macao SAR' },
      { slottedContent: () => 'Madagascar' },
      { slottedContent: () => 'Malawi' },
      { slottedContent: () => 'Malaysia' },
      { slottedContent: () => 'Maldives' },
      { slottedContent: () => 'Mali' },
      { slottedContent: () => 'Malta' },
      { slottedContent: () => 'Marshall Islands' },
      { slottedContent: () => 'Martinique' },
      { slottedContent: () => 'Mauritania' },
      { slottedContent: () => 'Mauritius' },
      { slottedContent: () => 'Mayotte' },
      { slottedContent: () => 'Mexico' },
      { slottedContent: () => 'Micronesia' },
      { slottedContent: () => 'Moldova' },
      { slottedContent: () => 'Monaco' },
      { slottedContent: () => 'Mongolia' },
      { slottedContent: () => 'Montenegro' },
      { slottedContent: () => 'Montserrat' },
      { slottedContent: () => 'Morocco' },
      { slottedContent: () => 'Mozambique' },
      { slottedContent: () => 'Myanmar' },
      { slottedContent: () => 'Namibia' },
      { slottedContent: () => 'Nauru' },
      { slottedContent: () => 'Nepal' },
      { slottedContent: () => 'Netherlands' },
      { slottedContent: () => 'New Caledonia' },
      { slottedContent: () => 'New Zealand' },
      { slottedContent: () => 'Nicaragua' },
      { slottedContent: () => 'Niger' },
      { slottedContent: () => 'Nigeria' },
      { slottedContent: () => 'Niue' },
      { slottedContent: () => 'Norfolk Island' },
      { slottedContent: () => 'North Macedonia' },
      { slottedContent: () => 'Northern Mariana Islands' },
      { slottedContent: () => 'Norway' },
      { slottedContent: () => 'Oman' },
      { slottedContent: () => 'Pakistan' },
      { slottedContent: () => 'Palau' },
      { slottedContent: () => 'Palestinian Authority' },
      { slottedContent: () => 'Panama' },
      { slottedContent: () => 'Papua New Guinea' },
      { slottedContent: () => 'Paraguay' },
      { slottedContent: () => 'Peru' },
      { slottedContent: () => 'Philippines' },
      { slottedContent: () => 'Pitcairn Islands' },
      { slottedContent: () => 'Poland' },
      { slottedContent: () => 'Portugal' },
      { slottedContent: () => 'Puerto Rico' },
      { slottedContent: () => 'Qatar' },
      { slottedContent: () => 'Réunion' },
      { slottedContent: () => 'Romania' },
      { slottedContent: () => 'Russia' },
      { slottedContent: () => 'Rwanda' },
      { slottedContent: () => 'Saba' },
      { slottedContent: () => 'Saint Barthélemy' },
      { slottedContent: () => 'Saint Kitts and Nevis' },
      { slottedContent: () => 'Saint Lucia' },
      { slottedContent: () => 'Saint Martin' },
      { slottedContent: () => 'Saint Pierre and Miquelon' },
      { slottedContent: () => 'Saint Vincent and the Grenadines' },
      { slottedContent: () => 'Samoa' },
      { slottedContent: () => 'San Marino' },
      { slottedContent: () => 'São Tomé and Príncipe' },
      { slottedContent: () => 'Saudi Arabia' },
      { slottedContent: () => 'Senegal' },
      { slottedContent: () => 'Serbia' },
      { slottedContent: () => 'Seychelles' },
      { slottedContent: () => 'Sierra Leone' },
      { slottedContent: () => 'Singapore' },
      { slottedContent: () => 'Sint Eustatius' },
      { slottedContent: () => 'Sint Maarten' },
      { slottedContent: () => 'Slovakia' },
      { slottedContent: () => 'Slovenia' },
      { slottedContent: () => 'Solomon Islands' },
      { slottedContent: () => 'Somalia' },
      { slottedContent: () => 'South Africa' },
      { slottedContent: () => 'South Georgia and South Sandwich Islands' },
      { slottedContent: () => 'South Sudan' },
      { slottedContent: () => 'Spain' },
      { slottedContent: () => 'Sri Lanka' },
      { slottedContent: () => 'St Helena, Ascension, Tristan da Cunha' },
      { slottedContent: () => 'Suriname' },
      { slottedContent: () => 'Svalbard' },
      { slottedContent: () => 'Sweden' },
      { slottedContent: () => 'Switzerland' },
      { slottedContent: () => 'Taiwan' },
      { slottedContent: () => 'Tajikistan' },
      { slottedContent: () => 'Tanzania' },
      { slottedContent: () => 'Thailand' },
      { slottedContent: () => 'Timor-Leste' },
      { slottedContent: () => 'Togo' },
      { slottedContent: () => 'Tokelau' },
      { slottedContent: () => 'Tonga' },
      { slottedContent: () => 'Trinidad and Tobago' },
      { slottedContent: () => 'Tunisia' },
      { slottedContent: () => 'Turkey' },
      { slottedContent: () => 'Turkmenistan' },
      { slottedContent: () => 'Turks and Caicos Islands' },
      { slottedContent: () => 'Tuvalu' },
      { slottedContent: () => 'U.S. Outlying Islands' },
      { slottedContent: () => 'U.S. Virgin Islands' },
      { slottedContent: () => 'Uganda' },
      { slottedContent: () => 'Ukraine' },
      { slottedContent: () => 'United Arab Emirates' },
      { slottedContent: () => 'United Kingdom' },
      { slottedContent: () => 'United States' },
      { slottedContent: () => 'Uruguay' },
      { slottedContent: () => 'Uzbekistan' },
      { slottedContent: () => 'Vanuatu' },
      { slottedContent: () => 'Vatican City' },
      { slottedContent: () => 'Venezuela' },
      { slottedContent: () => 'Vietnam' },
      { slottedContent: () => 'Wallis and Futuna' },
      { slottedContent: () => 'Yemen' },
      { slottedContent: () => 'Zambia' },
      { slottedContent: () => 'Zimbabwe' },
    ],
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
    slottedContent: [
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
