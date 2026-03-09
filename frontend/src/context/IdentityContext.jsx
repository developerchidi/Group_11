import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

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
  try {
    const storedId = localStorage.getItem(STORAGE_KEY_ID);
    const storedAlias = localStorage.getItem(STORAGE_KEY_ALIAS);

    if (storedId && storedAlias) {
      return { id: storedId, alias: storedAlias };
    }

    // Repair a partially saved identity to keep one stable profile.
    if (storedId || storedAlias) {
      return {
        id: storedId || generateUserId(),
        alias: storedAlias || generateAlias(),
      };
    }
  } catch (error) {
    // localStorage may be unavailable in some browser privacy modes.
    console.error('Unable to read identity from localStorage:', error);
  }

  return null;
}

function persistIdentity(identity) {
  try {
    localStorage.setItem(STORAGE_KEY_ID, identity.id);
    localStorage.setItem(STORAGE_KEY_ALIAS, identity.alias);
  } catch (error) {
    console.error('Unable to persist identity to localStorage:', error);
  }
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
  const [user, setUserState] = useState(getInitialUser);

  const setUser = useCallback((nextUser) => {
    setUserState((previousUser) => {
      const resolvedUser = typeof nextUser === 'function' ? nextUser(previousUser) : nextUser;
      persistIdentity(resolvedUser);
      return resolvedUser;
    });
  }, []);

  const updateAlias = useCallback((nextAlias) => {
    const trimmedAlias = nextAlias?.trim();

    if (!trimmedAlias) {
      return;
    }

    setUser((prev) => ({ ...prev, alias: trimmedAlias }));
  }, [setUser]);

  const regenerateAlias = useCallback(() => {
    setUser((prev) => ({
      ...prev,
      alias: generateAlias(),
    }));
  }, [setUser]);

  const resetIdentity = useCallback(() => {
    const nextIdentity = buildIdentity();
    setUser(nextIdentity);
  }, [setUser]);

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
    [user, setUser, updateAlias, regenerateAlias, resetIdentity]
  );

  return (
    <IdentityContext.Provider value={value}>
      {children}
    </IdentityContext.Provider>
  );
};
