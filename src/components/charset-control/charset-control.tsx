import React, { FC } from 'react';
import {
  Checkbox, FormControlLabel, FormGroup, styled, Typography,
} from '@mui/material';
import { PasswordCharsSet } from '@/constants/password';
import useScreenSize, { ScreenTypes } from '@/hooks/use-screen-size';

const CharsetToggleFormGroup = styled(FormGroup)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CHAR_SETS_LABEL_MAP: Record<PasswordCharsSet, string> = {
  [PasswordCharsSet.LowercaseLetters]: 'Include Lowercase Letters',
  [PasswordCharsSet.UppercaseLetters]: 'Include Uppercase Letters',
  [PasswordCharsSet.Digits]: 'Include Digits',
  [PasswordCharsSet.SpecialSymbols]: 'Include Special Symbols',
};

interface CharsetSelectorProps {
  value: PasswordCharsSet[]
  onChange: (newValue: PasswordCharsSet[]) => void;
}

const CharsetControl: FC<CharsetSelectorProps> = ({ value, onChange }) => {
  const screenSize = useScreenSize();

  const handleChange = (set: PasswordCharsSet, checked: boolean) => {
    const charsSet = new Set([...value]);

    if (checked) {
      charsSet.add(set);
    } else {
      charsSet.delete(set);
    }

    onChange([...charsSet]);
  };

  const renderCharSetToggle = (set: PasswordCharsSet) => {
    const isChecked = value.includes(set);

    return (
      <FormControlLabel
        control={(
          <Checkbox
            checked={isChecked}
            onChange={(e, checked) => handleChange(set, checked)}
            disabled={isChecked && value.length === 1}
          />
        )}
        label={(
          <Typography
            variant={screenSize === ScreenTypes.MOBILE ? 'BodyM' : 'BodyL'}
          >
            {CHAR_SETS_LABEL_MAP[set]}
          </Typography>
        )}
      />
    );
  };

  return (
    <CharsetToggleFormGroup>
      { renderCharSetToggle(PasswordCharsSet.Digits) }
      { renderCharSetToggle(PasswordCharsSet.LowercaseLetters) }
      { renderCharSetToggle(PasswordCharsSet.UppercaseLetters) }
      { renderCharSetToggle(PasswordCharsSet.SpecialSymbols) }
    </CharsetToggleFormGroup>
  );
};

export default CharsetControl;
