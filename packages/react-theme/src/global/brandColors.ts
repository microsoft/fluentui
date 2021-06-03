import { BrandVariants, ProductBrandColors } from '../types';

// TODO: values should be set per product theme
export const brandWeb: BrandVariants = {
  shade60: '#092C47',
  shade50: '#043862',
  shade40: '#004578',
  shade30: '#004C87',
  shade20: '#005A9E',
  shade10: '#106EBE',
  primary: '#0078D4',
  tint10: '#2899F5',
  tint20: '#3AA0F3',
  tint30: '#6CB8F6',
  tint40: '#C7E0F4',
  tint50: '#DEECF9',
  tint60: '#EFF6FC',
};

// TODO: these colors are not approved yet
export const brandTeams: BrandVariants = {
  shade60: '#323348',
  shade50: '#393b5d', // TBD
  shade40: '#3D3E66',
  shade30: '#464775',
  shade20: '#494B83',
  shade10: '#52558f', // TBD
  primary: '#6264A7',
  tint10: '#8f95f8', // TBD
  tint20: '#9EA2FF',
  tint30: '#B2B5FF',
  tint40: '#C7C9FF',
  tint50: '#DBDCF0',
  tint60: '#E9EAF6',
};

export const brandColors: ProductBrandColors = {
  teams: brandTeams,
  web: brandWeb,
};
