import { getInitials } from './initials';

let { expect } = chai;

describe('getInitials', () => {
  it('handles null inputs', () => {
    let result = getInitials(null, false);
    expect(result).to.equal('');

    result = getInitials(undefined, false);
    expect(result).to.equal('');
  });

  it('calculates an expected initials in LTR', () => {
    let result = getInitials('Kat Larrson', false);
    expect(result).to.equal('KL');
  });

  it('calculates an expected initials in LTR with a hypen', () => {
    let result = getInitials('David Zearing-Goff', false);
    expect(result).to.equal('DZ');
  });

  it('calculates an expected initials in LTR with numbers', () => {
    let result = getInitials('4lex 4loo', false);
    expect(result).to.equal('44');
  });

  it('calculates an expected initials in LTR with parentheses', () => {
    let result = getInitials('David (The man) Goff', false);
    expect(result).to.equal('D');
  });

  it('calculates an expected initials in RTL if one was not specified', () => {
    let result = getInitials('Kat Larrson', true);
    expect(result).to.equal('LK');
  });

  it('calculates an expected initials for Arabic names', () => {
    let result = getInitials('خسرو رحیمی', true);
    expect(result).to.equal('ی');
  });

  it('calculates an expected initials for Chinese names', () => {
    let result = getInitials('桂英', false);
    expect(result).to.equal('英');

    result = getInitials('佳', false);
    expect(result).to.equal('佳');
  });

  it('calculates an expected initials for Korean names', () => {
    let result = getInitials('강현', false);
    expect(result).to.equal('현');

    result = getInitials('최종래', false);
    expect(result).to.equal('종래');

    result = getInitials('남궁 성종', false);
    expect(result).to.equal('성종');
  });
});
