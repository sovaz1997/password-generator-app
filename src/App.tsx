import { useState } from 'react';
import GeneratePasswordButton from './components/generate-password-button';

const App = () => {
  const [password, setPassword] = useState('');

  return (
    <div>
      <h1>Password generator</h1>
      <GeneratePasswordButton />
    </div>
  );
};

export default App;
