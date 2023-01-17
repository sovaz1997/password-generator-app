import { createContext } from 'react';

export interface PasswordClipboardContextType {
  lastClipboardUsage: Date | null;
  copy: () => void;
}

const PasswordClipboardContext = createContext<PasswordClipboardContextType | null>(null);

export default PasswordClipboardContext;
