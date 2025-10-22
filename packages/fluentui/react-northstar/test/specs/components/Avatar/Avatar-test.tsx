import { implementsShorthandProp, isConformant } from 'test/specs/commonTests';

import { Avatar } from 'src/components/Avatar/Avatar';
import { AvatarImage } from 'src/components/Avatar/AvatarImage';
import { AvatarLabel } from 'src/components/Avatar/AvatarLabel';
import { getDefaultInitials } from 'src/components/Avatar/getDefaultInitials';

const avatarImplementsShorthandProp = implementsShorthandProp(Avatar);

describe('Avatar', () => {
  isConformant(Avatar, {
    testPath: __filename,
    constructorName: 'Avatar',
  });
  avatarImplementsShorthandProp('label', AvatarLabel);
  avatarImplementsShorthandProp('image', AvatarImage, { mapsValueToProp: 'src' });

  describe('generateInitials', () => {
    it('generateInitials should show just the initials of the first and last words in the name', () => {
      expect(getDefaultInitials('Cecil MiddleName Folk')).toEqual('CF');
    });

    it('generateInitials removes the text inside brackets', () => {
      expect(getDefaultInitials('Cecil Folk (Working position)')).toEqual('CF');
      expect(getDefaultInitials('Cecil Folk {Working position}')).toEqual('CF');
      expect(getDefaultInitials('Cecil Folk [Working position]')).toEqual('CF');
    });

    it('handles null inputs', () => {
      let result = getDefaultInitials(null);
      expect(result).toEqual('');

      result = getDefaultInitials(undefined);
      expect(result).toEqual('');
    });

    it('handles whitespace input', () => {
      let result = getDefaultInitials('    ');
      expect(result).toEqual('');

      result = getDefaultInitials('\t\n');
      expect(result).toEqual('');
    });

    it('calculates an expected initials for non-ASCII characters', () => {
      let result = getDefaultInitials('Írissa Þórðardóttir');
      expect(result).toEqual('ÍÞ');

      result = getDefaultInitials('Øyvind Åsen');
      expect(result).toEqual('ØÅ');
    });

    it('calculates an expected initials with a hypen', () => {
      const result = getDefaultInitials('David Zearing-Goff');
      expect(result).toEqual('DZ');
    });

    it('calculates an expected initials with numbers', () => {
      const result = getDefaultInitials('4lex 5loo');
      expect(result).toEqual('45');
    });

    it('calculates an expected initials with multiple parentheses, extra spaces, and unwanted characters', () => {
      const result = getDefaultInitials(' !@#$%^&*()=+ (Alpha) David   (The man) `~<>,./?[]{}|   Goff   (Gamma)    ');
      expect(result).toEqual('!G');
    });

    it('calculates an expected initials for names with multiple components', () => {
      let result = getDefaultInitials('A');
      expect(result).toEqual('A');

      result = getDefaultInitials('A B');
      expect(result).toEqual('AB');

      result = getDefaultInitials('A B C');
      expect(result).toEqual('AC');

      result = getDefaultInitials('A B C D');
      expect(result).toEqual('AD');
    });

    it('calculates an expected initials for Arabic names', () => {
      const result = getDefaultInitials('خسرو رحیمی');
      expect(result).toEqual('خر');
    });

    it('calculates an expected initials for Chinese names', () => {
      let result = getDefaultInitials('桂英');
      expect(result).toEqual('桂');

      result = getDefaultInitials('佳');
      expect(result).toEqual('佳');

      result = getDefaultInitials('宋智洋');
      expect(result).toEqual('宋');
    });

    it('calculates an expected initials for Korean names', () => {
      let result = getDefaultInitials('강현');
      expect(result).toEqual('강');

      result = getDefaultInitials('최종래');
      expect(result).toEqual('최');

      result = getDefaultInitials('남궁 성종');
      expect(result).toEqual('남성');
    });

    it('calculates an expected initials for Japanese names', () => {
      let result = getDefaultInitials('松田');
      expect(result).toEqual('松');

      result = getDefaultInitials('海野');
      expect(result).toEqual('海');

      result = getDefaultInitials('かり');
      expect(result).toEqual('か');
    });
  });
});
