function createFont(size: string, weight: string = '400') {
  return {
    fontFamily: 'Segoe UI WestEuropean,Segoe UI,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif',
    fontSize: size,
    fontWeight: weight
  };
}

export const fonts = {
  giant: createFont('42px'),
  xxLarge: createFont('28px'),
  xLarge: createFont('21px'),
  large: createFont('17px'),
  mediumPlus: createFont('15px'),
  medium: createFont('14px'),
  smallPlus: createFont('13px'),
  small: createFont('12px'),
  xSmall: createFont('11px'),
  mini: createFont('10px')
};
