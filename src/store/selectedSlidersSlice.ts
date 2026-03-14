import { createSlice } from '@reduxjs/toolkit'

const selectedSlidersSlice = createSlice({
    name: 'selectedSliders',
    initialState: JSON.parse(localStorage.getItem('selectedSliders') || '[]') as string[],
    reducers: {
        setSlider: (state: string[], action) => {
            if (state.includes(action.payload)) {
                const newState = state.filter(slider => slider !== action.payload);
                localStorage.setItem('selectedSliders', JSON.stringify(newState));
                return newState;
            }
            else {
                const newState = [...state, action.payload];
                localStorage.setItem('selectedSliders', JSON.stringify(newState));
                return newState;
            }
        },
        resetSliders: () => {
            localStorage.removeItem('selectedSliders');
            return [];
        }
    }
})

export const { setSlider, resetSliders } = selectedSlidersSlice.actions;
export default selectedSlidersSlice.reducer;