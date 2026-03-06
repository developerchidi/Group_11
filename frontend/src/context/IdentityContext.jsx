import React, { createContext, useContext, useMemo, useState } from 'react';

const IdentityContext = createContext(null);
const STORAGE_KEY_ID = 'user_secret_id';
const STORAGE_KEY_ALIAS = 'user_alias';

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

function buildIdentity() {
  return {
    id: generateUserId(),
    alias: generateAlias(),
  };
}

function readStoredIdentity() {
  const storedId = localStorage.getItem(STORAGE_KEY_ID);
  const storedAlias = localStorage.getItem(STORAGE_KEY_ALIAS);

  if (storedId && storedAlias) {
    return { id: storedId, alias: storedAlias };
  }

  return null;
}

function persistIdentity(identity) {
  localStorage.setItem(STORAGE_KEY_ID, identity.id);
  localStorage.setItem(STORAGE_KEY_ALIAS, identity.alias);
}

function getInitialUser() {
  const storedIdentity = readStoredIdentity();

  if (storedIdentity) {
    return storedIdentity;
  }

  const newIdentity = buildIdentity();
  persistIdentity(newIdentity);

  return newIdentity;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useIdentity = () => {
  const context = useContext(IdentityContext);

  if (!context) {
    throw new Error('useIdentity must be used within an IdentityProvider');
  }

  return context;
};

export const IdentityProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser);

  const updateAlias = (nextAlias) => {
    const trimmedAlias = nextAlias?.trim();

    if (!trimmedAlias) {
      return;
    }

    setUser((prev) => {
      const updated = { ...prev, alias: trimmedAlias };
      persistIdentity(updated);
      return updated;
    });
  };

  const regenerateAlias = () => {
    setUser((prev) => {
      const updated = {
        ...prev,
        alias: generateAlias(),
      };
      persistIdentity(updated);
      return updated;
    });
  };

  const resetIdentity = () => {
    const nextIdentity = buildIdentity();
    setUser(nextIdentity);
    persistIdentity(nextIdentity);
  };

  const value = useMemo(
    () => ({
      user,
      userId: user.id,
      alias: user.alias,
      setUser,
      updateAlias,
      regenerateAlias,
      resetIdentity,
    }),
    [user]
  );

  return (
    <IdentityContext.Provider value={value}>
      {children}
    </IdentityContext.Provider>
  );
};
