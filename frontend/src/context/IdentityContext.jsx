import React, { createContext, useContext, useState } from 'react';

const IdentityContext = createContext();

const ADJECTIVES = [
  'Silent',
  'Curious',
  'Neon',
  'Rapid',
  'Zen',
  'Brave',
  'Nimble',
  'Stealth',
  'Cosmic',
  'Pixel',
  'Atomic',
  'Quantum',
  'Echo',
  'Cipher',
  'Nova',
  'Turbo',
  'Zero',
  'Prime',
  'Shadow',
  'Glitch',
];

const NOUNS = [
  'Coder',
  'Commit',
  'Debugger',
  'Kernel',
  'Protocol',
  'Stack',
  'Byte',
  'Variable',
  'Hook',
  'Query',
  'Sprint',
  'Token',
  'Module',
  'Router',
  'Patch',
  'Schema',
  'Vector',
  'Thread',
  'Script',
  'Compiler',
];

function pickRandom(items) {
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

function generateUserId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return Math.random().toString(36).slice(2, 14);
}

function generateAlias() {
  const adjective = pickRandom(ADJECTIVES);
  const noun = pickRandom(NOUNS);
  const tag = Math.floor(Math.random() * 9000 + 1000);

  return `${adjective}${noun}-${tag}`;
}

function getInitialUser() {
  const storedId = localStorage.getItem('user_secret_id');
  const storedAlias = localStorage.getItem('user_alias');

  if (storedId && storedAlias) {
    return { id: storedId, alias: storedAlias };
  }

  const newId = generateUserId();
  const newAlias = generateAlias();

  localStorage.setItem('user_secret_id', newId);
  localStorage.setItem('user_alias', newAlias);

  return { id: newId, alias: newAlias };
}

// eslint-disable-next-line react-refresh/only-export-components
export const useIdentity = () => useContext(IdentityContext);

export const IdentityProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser);

  return (
    <IdentityContext.Provider value={{ user, setUser }}>
      {children}
    </IdentityContext.Provider>
  );
};
