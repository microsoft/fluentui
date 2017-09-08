import { getInitials } from './initials';

describe('getInitials', () => {
  it('handles null inputs', () => {
    let result = getInitials(null, false);
    expect(result).toEqual('');

    result = getInitials(undefined, false);
    expect(result).toEqual('');
  });

  it('calculates an expected initials in LTR', () => {
    let result = getInitials('Kat Larrson', false);
    expect(result).toEqual('KL');
  });

  it('calculates an expected initials in LTR for non-ASCII characters', () => {
    let result = getInitials('Írissa Þórðardóttir', false);
    expect(result).toEqual('ÍÞ');

    result = getInitials('Øyvind Åsen', false);
    expect(result).toEqual('ØÅ');
  });

  it('calculates an expected initials in LTR with a hypen', () => {
    let result = getInitials('David Zearing-Goff', false);
    expect(result).toEqual('DZ');
  });

  it('calculates an expected initials in LTR with numbers', () => {
    let result = getInitials('4lex 4loo', false);
    expect(result).toEqual('44');
  });

  it('calculates an expected initials in LTR with parentheses', () => {
    let result = getInitials('David (The man) Goff', false);
    expect(result).toEqual('DG');
  });

  it('calculates an expected initials in LTR with multiple parentheses, extra spaces, and unwanted characters', () => {
    let result = getInitials(' !@#$%^&*()=+ (Alpha) David   (The man) `~<>,./?[]{}|\   Goff   (Gamma)    ', false);
    expect(result).toEqual('DG');
  });

  it('calculates an expected initials in RTL if one was not specified', () => {
    let result = getInitials('Kat Larrson', true);
    expect(result).toEqual('LK');
  });

  it('calculates an expected initials in LTR for names with multiple components', () => {
    let result = getInitials('A', false);
    expect(result).toEqual('A');

    result = getInitials('A B', false);
    expect(result).toEqual('AB');

    result = getInitials('A B C', false);
    expect(result).toEqual('AC');

    result = getInitials('A B C D', false);
    expect(result).toEqual('A');
  });

  it('calculates an expected initials for Arabic names', () => {
    let result = getInitials('خسرو رحیمی', true);
    expect(result).toEqual('');
  });

  it('calculates an expected initials for Chinese names', () => {
    let result = getInitials('桂英', false);
    expect(result).toEqual('');

    result = getInitials('佳', false);
    expect(result).toEqual('');

    result = getInitials('宋智洋', false);
    expect(result).toEqual('');
  });

  it('calculates an expected initials for Korean names', () => {
    let result = getInitials('강현', false);
    expect(result).toEqual('');

    result = getInitials('최종래', false);
    expect(result).toEqual('');

    result = getInitials('남궁 성종', false);
    expect(result).toEqual('');
  });

  it('calculates an expected initials for Japanese names', () => {
    let result = getInitials('松田', false);
    expect(result).toEqual('');

    result = getInitials('海野', false);
    expect(result).toEqual('');

    result = getInitials('かり', false);
    expect(result).toEqual('');
  });

});
