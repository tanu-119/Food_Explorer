import React, { createContext, useContext, useReducer, useMemo } from 'react';

const initialState = {
  products: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  searchQuery: '',
  barcodeQuery: '',
  category: '',
  sortBy: 'name',
  sortOrder: 'asc',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'APPEND_PRODUCTS':
      return { ...state, products: [...state.products, ...action.payload] };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_HAS_MORE':
      return { ...state, hasMore: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload, page: 1, products: [] };
    case 'SET_BARCODE_QUERY':
      return { ...state, barcodeQuery: action.payload, page: 1, products: [] };
    case 'SET_CATEGORY':
      return { ...state, category: action.payload, page: 1, products: [] };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload.sortBy, sortOrder: action.payload.sortOrder, page: 1, products: [] };
    default:
      return state;
  }
};

const AppContext = createContext();
const AppDispatchContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => state, [state]);

  return (
    <AppContext.Provider value={contextValue}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

export const useAppState = () => useContext(AppContext);
export const useAppDispatch = () => useContext(AppDispatchContext);