import { implementsShorthandProp, isConformant } from 'test/specs/commonTests';

import { Avatar } from 'src/components/Avatar/Avatar';
import { AvatarImage } from 'src/components/Avatar/AvatarImage';
import { AvatarLabel } from 'src/components/Avatar/AvatarLabel';

const avatarImplementsShorthandProp = implementsShorthandProp(Avatar);
const { getInitials } = (Avatar as any).defaultProps;

describe('Avatar', () => {
  isConformant(Avatar, {
    testPath: __filename,
    constructorName: 'Avatar',
  });
  avatarImplementsShorthandProp('label', AvatarLabel);
  avatarImplementsShorthandProp('image', AvatarImage, { mapsValueToProp: 'src' });

  describe('generateInitials', () => {
    it('generateInitials should show just the initials of the first and last words in the name', () => {
      expect(getInitials('Cecil MiddleName Folk')).toEqual('CF');
    });

    it('generateInitials removes the text inside brackets', () => {
      expect(getInitials('Cecil Folk (Working position)')).toEqual('CF');
      expect(getInitials('Cecil Folk {Working position}')).toEqual('CF');
      expect(getInitials('Cecil Folk [Working position]')).toEqual('CF');
    });

    it('handles null inputs', () => {
      let result = getInitials(null);
      expect(result).toEqual('');

      result = getInitials(undefined);
      expect(result).toEqual('');
    });

    it('handles whitespace input', () => {
      let result = getInitials('    ');
      expect(result).toEqual('');

      result = getInitials('\t\n');
      expect(result).toEqual('');
    });

    it('calculates an expected initials for non-ASCII characters', () => {
      let result = getInitials('Írissa Þórðardóttir');
      expect(result).toEqual('ÍÞ');

      result = getInitials('Øyvind Åsen');
      expect(result).toEqual('ØÅ');
    });

    it('calculates an expected initials with a hypen', () => {
      const result = getInitials('David Zearing-Goff');
      expect(result).toEqual('DZ');
    });

    it('calculates an expected initials with numbers', () => {
      const result = getInitials('4lex 5loo');
      expect(result).toEqual('45');
    });

    it('calculates an expected initials with multiple parentheses, extra spaces, and unwanted characters', () => {
      const result = getInitials(' !@#$%^&*()=+ (Alpha) David   (The man) `~<>,./?[]{}|   Goff   (Gamma)    ');
      expect(result).toEqual('!G');
    });

    it('calculates an expected initials for names with multiple components', () => {
      let result = getInitials('A');
      expect(result).toEqual('A');

      result = getInitials('A B');
      expect(result).toEqual('AB');

      result = getInitials('A B C');
      expect(result).toEqual('AC');

      result = getInitials('A B C D');
      expect(result).toEqual('AD');
    });

    it('calculates an expected initials for Arabic names', () => {
      const result = getInitials('خسرو رحیمی');
      expect(result).toEqual('خر');
    });

    it('calculates an expected initials for Chinese names', () => {
      let result = getInitials('桂英');
      expect(result).toEqual('桂');

      result = getInitials('佳');
      expect(result).toEqual('佳');

      result = getInitials('宋智洋');
      expect(result).toEqual('宋');
    });

    it('calculates an expected initials for Korean names', () => {
      let result = getInitials('강현');
      expect(result).toEqual('강');

      result = getInitials('최종래');
      expect(result).toEqual('최');

      result = getInitials('남궁 성종');
      expect(result).toEqual('남성');
    });

    it('calculates an expected initials for Japanese names', () => {
      let result = getInitials('松田');
      expect(result).toEqual('松');

      result = getInitials('海野');
      expect(result).toEqual('海');

      result = getInitials('かり');
      expect(result).toEqual('か');
    });
  });
});
