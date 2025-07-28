// StyledComponents.tsx
import styled from 'styled-components';

export const AppContainer = styled.div`
  background-color: #1a1a1a;
  color: #ffffff;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

export const Header = styled.header`
  background-color: #0a0a0a;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div`
  color: #00d4aa;
  font-size: 24px;
  font-weight: bold;
`;

export const FeatureBadge = styled.div`
  background-color: #00d4aa;
  color: #000;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
`;

export const MainContent = styled.main`
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
`;

export const SearchSection = styled.div`
  margin-bottom: 32px;
`;

export const SearchTitle = styled.h2`
  color: #999;
  font-size: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '🔍';
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  max-width: 600px;
`;

export const SearchInput = styled.input`
  width: 100%;
  background-color: #2a2a2a;
  border: 1px solid #444;
  border-radius: 6px;
  padding: 12px 16px 12px 40px;
  color: #fff;
  font-size: 16px;
  
  &::placeholder {
    color: #666;
  }
  
  &:focus {
    outline: none;
    border-color: #00d4aa;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 18px;
`;

export const FilterSection = styled.div`
  margin-bottom: 32px;
`;

export const FilterTitle = styled.h2`
  color: #999;
  font-size: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '⚙️';
  }
`;

export const FilterContainer = styled.div`
  background-color: #2a2a2a;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const FilterLabel = styled.span`
  color: #999;
  font-size: 14px;
  white-space: nowrap;
`;

export const CheckboxGroup = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #fff;
`;

export const Checkbox = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #666;
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  
  &:checked {
    background-color: #00d4aa;
    border-color: #00d4aa;
  }
  
  &:checked::after {
    content: '✓';
    position: absolute;
    color: #000;
    font-size: 12px;
    top: -2px;
    left: 2px;
  }
`;

export const ResetButton = styled.button`
  background: none;
  border: 1px solid #666;
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  
  &:hover {
    border-color: #00d4aa;
    color: #00d4aa;
  }
`;

export const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SortSelect = styled.select`
  background-color: #1a1a1a;
  border: 1px solid #666;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #00d4aa;
  }
`;

export const ContentSection = styled.div`
  margin-bottom: 32px;
`;

export const ContentTitle = styled.h2`
  color: #999;
  font-size: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '📋';
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const ContentCard = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

export const ContentImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  background-color: #444;
`;

export const ContentInfo = styled.div`
  padding: 16px;
`;

export const ContentItemTitle = styled.h3`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ContentAuthor = styled.p`
  color: #999;
  font-size: 14px;
  margin: 0 0 12px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ContentPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PriceTag = styled.span<{ $isPaid?: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.$isPaid ? '#fff' : '#00d4aa'};
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  color: #666;
`;

export const ErrorMessage = styled.div`
  background-color: #ff4444;
  color: #fff;
  padding: 16px;
  border-radius: 8px;
  margin: 20px 0;
  text-align: center;
`;

export const SkeletonCard = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
  }
`;

export const SkeletonImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: #444;
`;

export const SkeletonContent = styled.div`
  padding: 16px;
`;

export const SkeletonText = styled.div<{ $width?: string; $height?: string }>`
  background-color: #444;
  border-radius: 4px;
  width: ${props => props.$width || '100%'};
  height: ${props => props.$height || '16px'};
  margin-bottom: 8px;
`;

export const PriceSliderContainer = styled.div<{ $disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
  opacity: ${props => props.$disabled ? 0.5 : 1};
  pointer-events: ${props => props.$disabled ? 'none' : 'auto'};
`;

export const SliderTrack = styled.div`
  position: relative;
  height: 4px;
  background-color: #444;
  border-radius: 2px;
`;

export const SliderRange = styled.div<{ $left: number; $width: number }>`
  position: absolute;
  height: 100%;
  background-color: #00d4aa;
  border-radius: 2px;
  left: ${props => props.$left}%;
  width: ${props => props.$width}%;
`;

export const SliderThumb = styled.input`
  position: absolute;
  width: 100%;
  height: 4px;
  background: transparent;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  pointer-events: none;
  top: -6px;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background-color: #00d4aa;
    border-radius: 50%;
    cursor: pointer;
    pointer-events: auto;
    position: relative;
    z-index: 2;
  }
  
  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background-color: #00d4aa;
    border-radius: 50%;
    cursor: pointer;
    pointer-events: auto;
    border: none;
  }
`;

export const SliderValues = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
`;