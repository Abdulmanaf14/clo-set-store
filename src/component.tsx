// Components.tsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { RootState, AppDispatch, setItems, setLoading, setError, setPricingFilter, setKeywordFilter, setSortBy, setPriceRange, resetFilters, loadMoreItems } from './store';
import { ContentItem, PricingOption } from './types';
import * as S from './styleComponent';

// API Service
const API_URL = 'https://closet-recruiting-api.azurewebsites.net/api/data';

const fetchContentData = async (): Promise<ContentItem[]> => {
  try {
    const response = await axios.get(API_URL);
    console.log("ghfhgf",response)
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch content data');
  }
};

// Header Component
export const Header: React.FC = () => (
  <S.Header>
    <S.Logo>CONNECT</S.Logo>
    <S.FeatureBadge>REQUIRED FEATURE</S.FeatureBadge>
  </S.Header>
);

// Keyword Search Component
export const KeywordSearch: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const keyword = useSelector((state: RootState) => state.app.filter.keyword);
  const [localKeyword, setLocalKeyword] = useState(keyword);

  const handleSearch = useCallback((value: string) => {
    setLocalKeyword(value);
    dispatch(setKeywordFilter(value));
  }, [dispatch]);

  useEffect(() => {
    setLocalKeyword(keyword);
  }, [keyword]);

  return (
    <S.SearchSection>
      <S.SearchTitle>Keyword search</S.SearchTitle>
      <S.SearchContainer>
        <S.SearchIcon>🔍</S.SearchIcon>
        <S.SearchInput
          type="text"
          placeholder="Find the items you're looking for"
          value={localKeyword}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </S.SearchContainer>
    </S.SearchSection>
  );
};

// Price Slider Component
export const PriceSlider: React.FC<{ disabled: boolean }> = ({ disabled }) => {
  const dispatch = useDispatch<AppDispatch>();
  const priceRange = useSelector((state: RootState) => state.app.filter.priceRange);
  const [localRange, setLocalRange] = useState(priceRange);

  const handleMinChange = (value: number) => {
    const newRange: [number, number] = [value, Math.max(value, localRange[1])];
    setLocalRange(newRange);
    dispatch(setPriceRange(newRange));
  };

  const handleMaxChange = (value: number) => {
    const newRange: [number, number] = [Math.min(localRange[0], value), value];
    setLocalRange(newRange);
    dispatch(setPriceRange(newRange));
  };

  useEffect(() => {
    setLocalRange(priceRange);
  }, [priceRange]);

  const leftPercent = (localRange[0] / 999) * 100;
  const rightPercent = (localRange[1] / 999) * 100;

  return (
    <S.PriceSliderContainer $disabled={disabled}>
      <S.FilterLabel>Price Range</S.FilterLabel>
      <div style={{ position: 'relative', marginBottom: '8px' }}>
        <S.SliderTrack>
          <S.SliderRange $left={leftPercent} $width={rightPercent - leftPercent} />
        </S.SliderTrack>
        <S.SliderThumb
          type="range"
          min="0"
          max="999"
          value={localRange[0]}
          onChange={(e) => handleMinChange(parseInt(e.target.value))}
          disabled={disabled}
        />
        <S.SliderThumb
          type="range"
          min="0"
          max="999"
          value={localRange[1]}
          onChange={(e) => handleMaxChange(parseInt(e.target.value))}
          disabled={disabled}
        />
      </div>
      <S.SliderValues>
        <span>${localRange[0]}</span>
        <span>${localRange[1]}</span>
      </S.SliderValues>
    </S.PriceSliderContainer>
  );
};

// Contents Filter Component
export const ContentsFilter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedPricingOptions = useSelector((state: RootState) => state.app.filter.selectedPricingOptions);
  const sortBy = useSelector((state: RootState) => state.app.filter.sortBy);

  const handlePricingChange = (option: PricingOption, checked: boolean) => {
    const newOptions = checked
      ? [...selectedPricingOptions, option]
      : selectedPricingOptions.filter(opt => opt !== option);
    dispatch(setPricingFilter(newOptions));
  };

  const handleSortChange = (value: string) => {
    dispatch(setSortBy(value as 'name' | 'priceHigh' | 'priceLow'));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const isPaidSelected = selectedPricingOptions.includes(PricingOption.PAID);

  return (
    <S.FilterSection>
      <S.FilterTitle>Contents Filter</S.FilterTitle>
      <S.FilterContainer>
        <S.FilterGroup>
          <S.FilterLabel>Pricing Option</S.FilterLabel>
          <S.CheckboxGroup>
            <S.CheckboxContainer>
              <S.Checkbox
                type="checkbox"
                checked={selectedPricingOptions.includes(PricingOption.PAID)}
                onChange={(e) => handlePricingChange(PricingOption.PAID, e.target.checked)}
              />
              Paid
            </S.CheckboxContainer>
            <S.CheckboxContainer>
              <S.Checkbox
                type="checkbox"
                checked={selectedPricingOptions.includes(PricingOption.FREE)}
                onChange={(e) => handlePricingChange(PricingOption.FREE, e.target.checked)}
              />
              Free
            </S.CheckboxContainer>
            <S.CheckboxContainer>
              <S.Checkbox
                type="checkbox"
                checked={selectedPricingOptions.includes(PricingOption.VIEW_ONLY)}
                onChange={(e) => handlePricingChange(PricingOption.VIEW_ONLY, e.target.checked)}
              />
              View Only
            </S.CheckboxContainer>
          </S.CheckboxGroup>
        </S.FilterGroup>

        <PriceSlider disabled={!isPaidSelected} />

        <S.SortContainer>
          <S.FilterLabel>Sort by</S.FilterLabel>
          <S.SortSelect value={sortBy} onChange={(e) => handleSortChange(e.target.value)}>
            <option value="name">Item Name</option>
            <option value="priceHigh">Higher Price</option>
            <option value="priceLow">Lower Price</option>
          </S.SortSelect>
        </S.SortContainer>

        <S.ResetButton onClick={handleReset}>
          RESET
        </S.ResetButton>
      </S.FilterContainer>
    </S.FilterSection>
  );
};

// Skeleton Loading Component
export const SkeletonLoader: React.FC = () => (
  <>
    {Array.from({ length: 8 }).map((_, index) => (
      <S.SkeletonCard key={index}>
        <S.SkeletonImage />
        <S.SkeletonContent>
          <S.SkeletonText $width="70%" $height="20px" />
          <S.SkeletonText $width="50%" $height="16px" />
          <S.SkeletonText $width="30%" $height="18px" />
        </S.SkeletonContent>
      </S.SkeletonCard>
    ))}
  </>
);

// Content Card Component
export const ContentCard: React.FC<{ item: ContentItem }> = ({ item }) => {
  const getPriceDisplay = () => {
    switch (item.pricingOption) {
      case PricingOption.PAID:
        return <S.PriceTag $isPaid>{item.price ? `${item.price.toFixed(2)}` : 'N/A'}</S.PriceTag>;
      case PricingOption.FREE:
        return <S.PriceTag>FREE</S.PriceTag>;
      case PricingOption.VIEW_ONLY:
        return <S.PriceTag>View Only</S.PriceTag>;
      default:
        return <S.PriceTag>N/A</S.PriceTag>;
    }
  };

  return (
    <S.ContentCard>
      <S.ContentImage src={item.imagePath} alt={item.title} />
      <S.ContentInfo>
        <S.ContentItemTitle>{item.title}</S.ContentItemTitle>
        <S.ContentAuthor>{item.userName}</S.ContentAuthor>
        <S.ContentPrice>
          {getPriceDisplay()}
        </S.ContentPrice>
      </S.ContentInfo>
    </S.ContentCard>
  );
};

// Contents List Component
export const ContentsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { displayedItems, loading, error, hasMore } = useSelector((state: RootState) => state.app);
  
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  const loadMoreRef = useRef<boolean>(false);

  useEffect(() => {
    if (inView && hasMore && !loading && !loadMoreRef.current) {
      loadMoreRef.current = true;
      dispatch(loadMoreItems());
      setTimeout(() => {
        loadMoreRef.current = false;
      }, 1000);
    }
  }, [inView, hasMore, loading, dispatch]);

  if (error) {
    return <S.ErrorMessage>{error}</S.ErrorMessage>;
  }

  return (
    <S.ContentSection>
      <S.ContentTitle>Contents List</S.ContentTitle>
      <S.ContentGrid>
        {displayedItems.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
        {loading && <SkeletonLoader />}
      </S.ContentGrid>
      
      {hasMore && (
        <div ref={ref} style={{ height: '20px', margin: '20px 0' }}>
          {loading && (
            <S.LoadingSpinner>
              Loading more items...
            </S.LoadingSpinner>
          )}
        </div>
      )}
      
      {!hasMore && displayedItems.length > 0 && (
        <S.LoadingSpinner>
          No more items to load
        </S.LoadingSpinner>
      )}
    </S.ContentSection>
  );
};

// Main App Component
export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.app.loading);
  const displayedItems = useSelector((state: RootState) => state.app.displayedItems);

  useEffect(() => {
    const loadData = async () => {
      dispatch(setLoading(true));
      try {
        const data = await fetchContentData();
        dispatch(setItems(data));
      } catch (error) {
        dispatch(setError('Failed to load content. Please try again later.'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadData();
  }, [dispatch]);

  return (
    <S.AppContainer>
      <Header />
      <S.MainContent>
        <KeywordSearch />
        <ContentsFilter />
        <ContentsList />
        {loading && displayedItems.length === 0 && (
          <S.ContentGrid>
            <SkeletonLoader />
          </S.ContentGrid>
        )}
      </S.MainContent>
    </S.AppContainer>
  );
};