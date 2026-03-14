import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import coinsArray from '../data/coins'

type Coin = {
    id: string,
    symbol: string,
    name: string,
    image: string,
}

export const fetchCoins = createAsyncThunk('coins/fetchCoins', async () => {
    // const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`);
    // const data = await response.json();
    // return data;
    return coinsArray;
});

const coinsSlice = createSlice({
    name: 'coins',
    initialState: {
        data: [] as Coin[],
        loading: true,
        error: null as string | null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoins.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCoins.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchCoins.rejected, (state, action) => {
                state.error = action.error.message + ': too many requests';
                state.loading = true;
            })
    }
})

export default coinsSlice.reducer;