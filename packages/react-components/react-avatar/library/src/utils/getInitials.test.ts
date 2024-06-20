import { getInitials } from './getInitials';

describe('getInitials', () => {
  it('handles null inputs', () => {
    let result = getInitials(null, false);
    expect(result).toEqual('');

    result = getInitials(undefined, false);
    expect(result).toEqual('');
  });

  it('calculates an expected initials in LTR', () => {
    const result = getInitials('Kat Larrson', false);
    expect(result).toEqual('KL');
  });

  it('calculates an expected initials in LTR for non-ASCII characters', () => {
    let result = getInitials('Írissa Þórðardóttir', false);
    expect(result).toEqual('ÍÞ');

    result = getInitials('Øyvind Åsen', false);
    expect(result).toEqual('ØÅ');
  });

  it('calculates an expected initials in LTR with a hypen', () => {
    const result = getInitials('David Zearing-Goff', false);
    expect(result).toEqual('DZ');
  });

  it('calculates an expected initials in LTR with numbers', () => {
    const result = getInitials('4lex 5loo', false);
    expect(result).toEqual('45');
  });

  it('calculates an expected initials in LTR with parentheses', () => {
    const result = getInitials('David (The man) Goff', false);
    expect(result).toEqual('DG');
  });

  it('calculates an expected initials in LTR with brackets', () => {
    const result = getInitials('David Goff [The man]', false);
    expect(result).toEqual('DG');
  });

  it('calculates an expected initials in LTR with curly braces', () => {
    const result = getInitials('David {The man} Goff', false);
    expect(result).toEqual('DG');
  });

  it('calculates an expected initials in LTR with multiple parentheses, extra spaces, and unwanted characters', () => {
    const result = getInitials(' !@#$%^&*()=+ (Alpha) David   (The man) `~<>,./?[]{}|   Goff   (Gamma)    ', false);
    expect(result).toEqual('DG');
  });

  it('calculates an expected initials in LTR with multiple types of unwanted text', () => {
    const result = getInitials(
      ' !@#$%^&*()=+ (Alpha) David   (The man) `~<>,./?[]{}|   Goff   (Gamma)  [Beta]  ',
      false,
    );
    expect(result).toEqual('DG');
  });

  it('calculates an expected initials in RTL if one was not specified', () => {
    const result = getInitials('Kat Larrson', true);
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
    const result = getInitials('خسرو رحیمی', true);
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

  it('calculates expected initials for phone numbers', () => {
    let result = getInitials('12345678', false);
    expect(result).toEqual('');

    result = getInitials('+1 (555) 123-4567 ext.4567', false);
    expect(result).toEqual('');

    result = getInitials('+47 12 34 56 78 (X 5678)', false);
    expect(result).toEqual('');

    result = getInitials('+47 12 34 56 78 (X 5678)', false, { allowPhoneInitials: true });
    expect(result).toEqual('4');

    result = getInitials('47 12 34', false, { allowPhoneInitials: true });
    expect(result).toEqual('43');

    result = getInitials('47 12', false, { allowPhoneInitials: true });
    expect(result).toEqual('41');

    result = getInitials('1 Ext 2', false);
    expect(result).toEqual('');

    result = getInitials('James Ext 2', false);
    expect(result).toEqual('J2');

    result = getInitials('1x1', false);
    expect(result).toEqual('');

    result = getInitials('1y1', false);
    expect(result).toEqual('1');

    result = getInitials('1', false);
    expect(result).toEqual('1');

    result = getInitials('A 2', false);
    expect(result).toEqual('A2');
  });

  it('calculates firstInitialOnly correctly in LTR', () => {
    let result = getInitials('Kat Larrson', false, { firstInitialOnly: true });
    expect(result).toEqual('K');

    result = getInitials('Mona Howard Kane', false, { firstInitialOnly: true });
    expect(result).toEqual('M');
  });

  it('calculates firstInitialOnly correctly in RTL', () => {
    let result = getInitials('Kat Larrson', true, { firstInitialOnly: true });
    expect(result).toEqual('K');

    result = getInitials('Mona Howard Kane', true, { firstInitialOnly: true });
    expect(result).toEqual('M');
  });
});
