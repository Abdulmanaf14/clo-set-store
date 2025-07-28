// types.ts
export enum PricingOption {
    PAID = 0,
    FREE = 1,
    VIEW_ONLY = 2,
  }
  
  export interface ContentItem {
    id: string;
    imagePath: string;
    userName: string;
    title: string;
    pricingOption: PricingOption;
    price?: number;
    creator:string
  }
  
  export interface FilterState {
    selectedPricingOptions: PricingOption[];
    keyword: string;
    sortBy: 'name' | 'priceHigh' | 'priceLow';
    priceRange: [number, number];
  }
  
  export interface AppState {
    items: ContentItem[];
    filteredItems: ContentItem[];
    displayedItems: ContentItem[];
    loading: boolean;
    error: string | null;
    filter: FilterState;
    page: number;
    hasMore: boolean;
  }