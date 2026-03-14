import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterSlice';
import selectedSlidersReducer from './selectedSlidersSlice';
import coinsReducer from './coinsSlice';

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        selectedSliders: selectedSlidersReducer,
        coins: coinsReducer
    }
});