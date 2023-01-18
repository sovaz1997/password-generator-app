import { useContext } from 'react';
import PasswordClipboardContext, { PasswordClipboardContextType } from '@/contexts/password-clipboard-context';

const usePasswordClipboardContext = (): PasswordClipboardContextType => {
  const value = useContext(PasswordClipboardContext);

  if (!value) {
    throw new Error('PasswordClipboardContext is undefined');
  }

  return value;
};

export default usePasswordClipboardContext;
