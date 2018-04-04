import {
	LEFT_CLICK,
	RIGHT_CLICK,
	INITIALIZE_GAME,
	SET_LEVEL
} from '../constants';

export const leftClick = (row, col) => {
	return {
		type: LEFT_CLICK,
		row: row,
		col: col
	}
}

export const rightClick = (row, col) => {
	return {
		type: RIGHT_CLICK,
		row: row,
		col: col
	}
}

export const initializeGame = () => {
	return {
		type: INITIALIZE_GAME
	}
}

export const setLevel = (level) => {
	return {
		type: SET_LEVEL,
		level: level
	}
}