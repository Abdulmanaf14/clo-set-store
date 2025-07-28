// store.ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentItem, FilterState, PricingOption, AppState } from './types';

const ITEMS_PER_PAGE = 12;

// Helper function to get URL params
const getUrlParams = (): Partial<FilterState> => {
  const params = new URLSearchParams(window.location.search);
  const result: Partial<FilterState> = {};
  
  const keyword = params.get('keyword');
  if (keyword) result.keyword = keyword;
  
  const pricing = params.get('pricing');
  if (pricing) {
    result.selectedPricingOptions = pricing.split(',').map(p => parseInt(p) as PricingOption);
  }
  
  const sort = params.get('sort');
  if (sort && ['name', 'priceHigh', 'priceLow'].includes(sort)) {
    result.sortBy = sort as 'name' | 'priceHigh' | 'priceLow';
  }
  
  return result;
};

// Helper function to update URL params
const updateUrlParams = (filter: FilterState) => {
  const params = new URLSearchParams();
  
  if (filter.keyword) params.set('keyword', filter.keyword);
  if (filter.selectedPricingOptions.length > 0) {
    params.set('pricing', filter.selectedPricingOptions.join(','));
  }
  if (filter.sortBy !== 'name') params.set('sort', filter.sortBy);
  
  const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
  window.history.replaceState({}, '', newUrl);
};

// Initial state with URL params
const initialFilter: FilterState = {
  selectedPricingOptions: [],
  keyword: '',
  sortBy: 'name',
  priceRange: [0, 999],
  ...getUrlParams()
};

const initialState: AppState = {
  items: [],
  filteredItems: [],
  displayedItems: [],
  loading: false,
  error: null,
  filter: initialFilter,
  page: 1,
  hasMore: true,
};

// Helper functions for filtering and sorting
const filterItems = (items: ContentItem[], filter: FilterState): ContentItem[] => {
  let filtered = items;
  
  // Filter by pricing options
  if (filter.selectedPricingOptions.length > 0) {
    filtered = filtered.filter(item => 
      filter.selectedPricingOptions.includes(item.pricingOption)
    );
  }
  
  // Filter by keyword
  if (filter.keyword.trim()) {
    const keyword = filter.keyword.toLowerCase().trim();
    filtered = filtered.filter(item => 
      (item.creator || '').toLowerCase().includes(keyword) ||
      (item.title || '').toLowerCase().includes(keyword)
    );
  }
  
  // Filter by price range (only for paid items)
  filtered = filtered.filter(item => {
    if (item.pricingOption === PricingOption.PAID) {
      const price = item.price || 0;
      return price >= filter.priceRange[0] && price <= filter.priceRange[1];
    }
    return true;
  });
  
  // Sort items
  filtered.sort((a, b) => {
    switch (filter.sortBy) {
      case 'priceHigh':
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        return priceB - priceA;
      case 'priceLow':
        const priceLowA = a.price || 0;
        const priceLowB = b.price || 0;
        return priceLowA - priceLowB;
      case 'name':
      default:
        return a.title.localeCompare(b.title);
    }
  });
  
  return filtered;
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setItems: (state, action: PayloadAction<ContentItem[]>) => {
      state.items = action.payload;
      state.filteredItems = filterItems(action.payload, state.filter);
      state.displayedItems = state.filteredItems.slice(0, ITEMS_PER_PAGE);
      state.page = 1;
      state.hasMore = state.filteredItems.length > ITEMS_PER_PAGE;
    },
    setPricingFilter: (state, action: PayloadAction<PricingOption[]>) => {
      state.filter.selectedPricingOptions = action.payload;
      state.filteredItems = filterItems(state.items, state.filter);
      state.displayedItems = state.filteredItems.slice(0, ITEMS_PER_PAGE);
      state.page = 1;
      state.hasMore = state.filteredItems.length > ITEMS_PER_PAGE;
      updateUrlParams(state.filter);
    },
    setKeywordFilter: (state, action: PayloadAction<string>) => {
      state.filter.keyword = action.payload;
      state.filteredItems = filterItems(state.items, state.filter);
      state.displayedItems = state.filteredItems.slice(0, ITEMS_PER_PAGE);
      state.page = 1;
      state.hasMore = state.filteredItems.length > ITEMS_PER_PAGE;
      updateUrlParams(state.filter);
    },
    setSortBy: (state, action: PayloadAction<'name' | 'priceHigh' | 'priceLow'>) => {
      state.filter.sortBy = action.payload;
      state.filteredItems = filterItems(state.items, state.filter);
      state.displayedItems = state.filteredItems.slice(0, state.page * ITEMS_PER_PAGE);
      updateUrlParams(state.filter);
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.filter.priceRange = action.payload;
      state.filteredItems = filterItems(state.items, state.filter);
      state.displayedItems = state.filteredItems.slice(0, ITEMS_PER_PAGE);
      state.page = 1;
      state.hasMore = state.filteredItems.length > ITEMS_PER_PAGE;
      updateUrlParams(state.filter);
    },
    resetFilters: (state) => {
      state.filter = {
        selectedPricingOptions: [],
        keyword: '',
        sortBy: 'name',
        priceRange: [0, 999],
      };
      state.filteredItems = filterItems(state.items, state.filter);
      state.displayedItems = state.filteredItems.slice(0, ITEMS_PER_PAGE);
      state.page = 1;
      state.hasMore = state.filteredItems.length > ITEMS_PER_PAGE;
      updateUrlParams(state.filter);
    },
    loadMoreItems: (state) => {
      const nextPage = state.page + 1;
      const startIndex = state.page * ITEMS_PER_PAGE;
      const endIndex = nextPage * ITEMS_PER_PAGE;
      const newItems = state.filteredItems.slice(startIndex, endIndex);
      
      state.displayedItems = [...state.displayedItems, ...newItems];
      state.page = nextPage;
      state.hasMore = endIndex < state.filteredItems.length;
    }
  }
});

export const {
  setLoading,
  setError,
  setItems,
  setPricingFilter,
  setKeywordFilter,
  setSortBy,
  setPriceRange,
  resetFilters,
  loadMoreItems
} = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;