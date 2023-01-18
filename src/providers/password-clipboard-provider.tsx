import {
  FC, PropsWithChildren, useCallback, useMemo, useState,
} from 'react';
import { useCopyToClipboard } from 'usehooks-ts';
import PasswordClipboardContext, { PasswordClipboardContextType } from '@/contexts/password-clipboard-context';

interface PasswordClipboardProviderProps {
  password: string;
}

const PasswordClipboardProvider: FC<PropsWithChildren<PasswordClipboardProviderProps>> = ({ children, password }) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const [lastClipboardUsage, setLastClipboardUsage] = useState<Date | null>(null);

  const copy = useCallback(() => {
    if (password) {
      copyToClipboard(password);
      setLastClipboardUsage(new Date());
    }
  }, [password, copyToClipboard]);

  const value = useMemo<PasswordClipboardContextType>(() => ({
    copy,
    lastClipboardUsage,
  }), [copy, lastClipboardUsage]);

  return <PasswordClipboardContext.Provider value={value}>{children}</PasswordClipboardContext.Provider>;
};

export default PasswordClipboardProvider;
