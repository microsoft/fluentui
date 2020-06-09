import { IToken } from '@fluentui/react-theming';

export interface ILinkTokens {
  // root tokens
  backgroundColor: IToken;
  backgroundColorHovered: IToken;
  color: IToken;
  colorHovered: IToken;
  fontFamily: IToken;
  fontSize: IToken;
  fontWeight: IToken;
  textDecoration: IToken;
  textDecorationHovered: IToken;

  // Disabled Link tokens
  // root
  backgroundColorDisabled: IToken;
  colorDisabled: IToken;
}

const LinkTokens = {
  // root tokens
  color: '#0078d4',
  colorHovered: '#201f1e',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  textDecoration: 'none',
  textDecorationHovered: 'underline',

  // Disabled Link tokens
  // root
  colorDisabled: '#a19f9d',
};

export default LinkTokens;
