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

  it.each([
    ['(', ')'],
    ['(', ']'],
    ['(', '}'],
    ['[', ')'],
    ['[', ']'],
    ['[', '}'],
    ['{', ')'],
    ['{', ']'],
    ['{', '}'],
  ])('ends an enclosure opened with %s at the first %s', (opening, closing) => {
    const name = `${opening}Team ${opening}Inner${closing} Grace${closing} Hopper`;
    expect(getInitials(name, false)).toBe('GH');
    expect(getInitials(name, true)).toBe('HG');
  });

  it.each([
    ['(Team)Ada[Role]Lovelace', 'A'],
    ['Ada (Team) []{}(Role) Lovelace', 'AL'],
    ['Ada (Team [Inner] Hopper)', 'AH'],
    ['[Team {Inner) Grace] Hopper', 'GH'],
    ['[Ada [Grace] Hopper', 'H'],
    ['Ada (Grace [Hopper', 'AH'],
    ['[Team] Ada [Grace Hopper', 'AH'],
    ['Ada )Grace] Hopper}', 'AH'],
    ['Ada [Team\n[Inner] Hopper]', 'AH'],
    ['Ada [Team\u2028Role] Lovelace', 'AL'],
    ['Ada [Grace\n', 'AG'],
    [' \tAda\u00a0[Team]\u2003Lovelace \n', 'AL'],
    ['[Team] \u{20000} \u{20001}', '\u{20000}\u{20001}'],
    ['\ud800[Team]\udc00 Lovelace', '\u{10000}L'],
    ['[Team] \u6842\u82f1', ''],
    ['[Team] \uac15\ud604', ''],
    ['[Team] \u062e\u0633\u0631\u0648', ''],
  ])('preserves initials and direction after cleaning %s', (name, expected) => {
    expect(getInitials(name, false)).toBe(expected);
    expect(getInitials(name, true)).toBe([...expected].reverse().join(''));
    expect(getInitials(name, false, { firstInitialOnly: true })).toBe([...expected][0] ?? '');
    expect(getInitials(name, true, { firstInitialOnly: true })).toBe([...expected][0] ?? '');
  });

  it('matches the original enclosure semantics for all short delimiter combinations', () => {
    const tokens = ['(', '[', '{', ')', ']', '}', 'A', 'B', ' '];
    const compare = (name: string, remaining: number): void => {
      // Bound the original regex to at most four characters, then remove leftover delimiters
      // so the reference initials do not depend on the new enclosure implementation.
      const cleanedName = name.replace(/[\(\[\{][^\)\]\}]*[\)\]\}]/g, '').replace(/[\(\)\[\]\{\}]/g, '');
      expect(getInitials(name, false)).toBe(getInitials(cleanedName, false));
      expect(getInitials(name, true)).toBe(getInitials(cleanedName, true));

      if (remaining > 0) {
        for (const token of tokens) {
          compare(name + token, remaining - 1);
        }
      }
    };

    compare('', 4);
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

  it('calculates initials for GB18030-2022 extension characters (CJK Ext B-I)', () => {
    // These characters are encoded as surrogate pairs; the character itself should be returned as the initial
    expect(getInitials('𬸚', false)).toEqual('𬸚'); // GFZB-196
    expect(getInitials('𢃾', false)).toEqual('𢃾'); // CJK Ext B
    expect(getInitials('𪜀', false)).toEqual('𪜀'); // CJK Ext C
    expect(getInitials('𫜴', false)).toEqual('𫜴'); // CJK Ext C
    expect(getInitials('𫟰', false)).toEqual('𫟰'); // CJK Ext D
    expect(getInitials('𬺠', false)).toEqual('𬺠'); // CJK Ext E
    expect(getInitials('𮓇', false)).toEqual('𮓇'); // CJK Ext F
    expect(getInitials('𪛝', false)).toEqual('𪛝'); // BX
    expect(getInitials('𰉖', false)).toEqual('𰉖'); // GX
    expect(getInitials('𱘍', false)).toEqual('𱘍'); // HX
    expect(getInitials('𮯰', false)).toEqual('𮯰'); // IX
  });

  it('calculates initials for mixed strings starting with GB18030-2022 extension characters', () => {
    // First code point of a mixed string should be used as the initial
    expect(getInitials('𫚭齅䶱5𮯠灋𬘭r𫟼蝌龯𪛒𪛛㊣𫜹⾢Ｚ𱔟𫍲𮴋䶺𰆬a', false)).toEqual('𫚭');
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
