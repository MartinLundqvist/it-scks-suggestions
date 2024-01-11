import { createContext, useContext, useEffect, useState } from 'react';
import { Suggestion, parseData } from '../utils';
import { FirestoreError, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../api';

interface SuggestionsProviderContextType {
  suggestions: Suggestion[];
  loading: boolean;
  error: FirestoreError | undefined;
}

const SuggestionsProviderContext = createContext<
  SuggestionsProviderContextType | undefined
>(undefined);

export const SuggestionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [value, loading, error] = useCollection(collection(db, 'suggestions'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    if (value) {
      setSuggestions(value.docs.map((doc) => parseData(doc)));
    }
  }, [value]);

  return (
    <SuggestionsProviderContext.Provider
      value={{
        suggestions,
        loading,
        error,
      }}
    >
      {children}
    </SuggestionsProviderContext.Provider>
  );
};

export const useSuggestions = () => {
  const context = useContext(SuggestionsProviderContext);
  if (!context) {
    throw new Error('useSuggestions must be used within a SuggestionsProvider');
  }
  return context;
};
