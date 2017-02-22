import { getInitials } from './initials';

let { expect } = chai;

describe('getInitials', () => {
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
});
