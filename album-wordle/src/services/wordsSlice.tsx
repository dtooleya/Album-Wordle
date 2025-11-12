import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentWord: "",
    correctWord: "",
    guesses: [] as string[],
}

const wordsSlice = createSlice({
    name: 'words',
    initialState,
    reducers: {
        updateCurrentWord: (state, action) => {
            return {...state, currentWord: action.payload};
        },
        updateCorrectWord: (state, action) => {
            return {...state, correctWord: action.payload};
        },
        addGuess: (state, action) => {
            state.guesses.push(action.payload);
        },
        reset: () => initialState
    }
});

export const { updateCurrentWord, updateCorrectWord, addGuess, reset } = wordsSlice.actions;

export default wordsSlice.reducer;