import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentWord: "",
    correctWord: "",
    guesses: [] as string[],
    keyBoardStyle: JSON.stringify({}),
    endGame: false
}

const wordsSlice = createSlice({
    name: 'words',
    initialState,
    reducers: {
        updateCurrentWord: (state, action) => {
            return { ...state, currentWord: action.payload };
        },
        updateCorrectWord: (state, action) => {
            return { ...state, correctWord: action.payload };
        },
        addGuess: (state, action) => {
            state.guesses.push(action.payload);
        },
        updateKeyboardStyle: (state, action) => {
            return { ...state, keyBoardStyle: action.payload };
        },
        updateEndGame: (state, action) => {
            return { ...state, endGame: action.payload };
        },
        reset: () => initialState
    }
});

export const { updateCurrentWord, updateCorrectWord, addGuess, reset, updateKeyboardStyle, updateEndGame } = wordsSlice.actions;

export default wordsSlice.reducer;