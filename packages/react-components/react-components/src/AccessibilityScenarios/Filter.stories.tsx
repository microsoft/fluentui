import * as React from 'react';

import { Button } from '@fluentui/react-button';
import { Label } from '@fluentui/react-label';
import { Input, InputOnChangeData } from '@fluentui/react-input';
import { MenuList, MenuItem } from '@fluentui/react-menu';

import { Scenario } from './utils';

const countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antigua & Barbuda',
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
  'Bosnia & Herzegovina',
  'Botswana',
  'Brazil',
  'British Virgin Islands',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Cayman Islands',
  'Central Arfrican Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Congo',
  'Cook Islands',
  'Costa Rica',
  'Cote D Ivoire',
  'Croatia',
  'Cuba',
  'Curacao',
  'Cyprus',
  'Czech Republic',
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
  'Ethiopia',
  'Falkland Islands',
  'Faroe Islands',
  'Fiji',
  'Finland',
  'France',
  'French Polynesia',
  'French West Indies',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
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
  'Macau',
  'Macedonia',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
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
  'Nauro',
  'Nepal',
  'Netherlands',
  'Netherlands Antilles',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Reunion',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Pierre & Miquelon',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'St Kitts & Nevis',
  'St Lucia',
  'St Vincent',
  'Sudan',
  'Suriname',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  "Timor L'Este",
  'Togo',
  'Tonga',
  'Trinidad & Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks & Caicos',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States of America',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Virgin Islands (US)',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];

const narrate = (message: string, priority = 'polite') => {
  const element = document.createElement('div');
  element.setAttribute(
    'style',
    'position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden;',
  );
  element.setAttribute('aria-live', priority);
  document.body.appendChild(element);

  setTimeout(() => {
    element.innerText = message;

    setTimeout(() => {
      document.body.removeChild(element);
    }, 300);
  }, 300);
};

export const FilterScenario: React.FunctionComponent = () => {
  const isFirstLoad = React.useRef(true);
  const [filterText, setFilterText] = React.useState('');
  const filterTextLowerCase = React.useMemo(() => filterText.toLowerCase(), [filterText]);

  const filterCountry = (country: string) => country.toLowerCase().includes(filterTextLowerCase);

  const filteredCountriesList = React.useMemo(() => {
    const filteredCountries = countries.filter(filterCountry);
    const list = filteredCountries.map((country, index) => (
      <MenuItem key={index} id={`countryItem${index}`} role="option">
        {country}
      </MenuItem>
    ));
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
    } else {
      const count = filteredCountries.length;
      let countNarration;
      if (count === 0) {
        countNarration = `No items are available`;
      } else if (count === 1) {
        countNarration = `${count} item is available`;
      } else {
        countNarration = `${count} items are available`;
      }
      narrate(countNarration);
    }
    return list;
  }, [filterText]);

  const filterInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const filterInput = filterInputRef.current;
    if (filterInput) {
      filterInput.addEventListener('keydown', handleFilterInputKeyDown);
    }
    return () => {
      if (filterInput) {
        filterInput.removeEventListener('keydown', handleFilterInputKeyDown);
      }
    };
  }, []);

  const handleFilterInputKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      document.getElementById('countryItem0')?.focus();
    }
  };

  const handleFilterInputChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    setFilterText(data.value);
  };

  const handleClearButtonClick = () => {
    setFilterText('');
  };

  return (
    <Scenario pageTitle="Filter scenario">
      <form autoComplete="off">
        <div>
          <Label htmlFor="filterText">Country filter</Label>
          <Input
            type="text"
            input={{ ref: filterInputRef }}
            id="filterText"
            name="filterText"
            value={filterText}
            onChange={handleFilterInputChange}
            aria-controls="countriesListbox"
          />
        </div>
        <Button onClick={handleClearButtonClick}>Clear filter</Button>
        <MenuList id="countriesListbox" role="listbox">
          {filteredCountriesList}
        </MenuList>
      </form>
    </Scenario>
  );
};

export default {
  title: 'Accessibility Scenarios/ Filter scenario',
  id: 'filter-scenario',
};
