export const BOARD_SIZE = 30;
export const NUMBER_ROWS_COLUMNS = 10
export const BOARD_UNIT = 'vw'
export const HEADER_HEIGHT_SCALE = 1.25
export const BOARD_SIZE_CSS = `${BOARD_SIZE / NUMBER_ROWS_COLUMNS}${BOARD_UNIT}`

export const FLAG_SIZE_PERCENT = 0.8
export const FLAG_SIZE_CSS = `${FLAG_SIZE_PERCENT * BOARD_SIZE / NUMBER_ROWS_COLUMNS}${BOARD_UNIT}`

export const PROB_SIZE_PERCENT = 1.0
export const PROB_SIZE_CSS = `${PROB_SIZE_PERCENT * BOARD_SIZE / NUMBER_ROWS_COLUMNS}${BOARD_UNIT}`


export const UNKNOWN_COLOR_CLASS_1 = 'bg-lime-400'
export const UNKNOWN_COLOR_CLASS_2 = 'bg-lime-500'
export const UNKNOWN_COLOR_CLASS = [UNKNOWN_COLOR_CLASS_1, UNKNOWN_COLOR_CLASS_2]

export const KNOWN_COLOR_CLASS_1 = 'bg-light-brown'
export const KNOWN_COLOR_CLASS_2 = 'bg-dark-brown'
export const KNOWN_COLOR_CLASS = [KNOWN_COLOR_CLASS_1, KNOWN_COLOR_CLASS_2]

export const AI_KNOWN_COLOR_CLASS_1 = 'ai-color-1'
export const AI_KNOWN_COLOR_CLASS_2 = 'ai-color-2'
export const AI_KNOWN_COLOR_CLASS = [AI_KNOWN_COLOR_CLASS_1, AI_KNOWN_COLOR_CLASS_2]
// export const AI_KNOWN_COLOR_CLASS = ['bg-gray-600', 'bg-gray-700']
// export const AI_KNOWN_COLOR_CLASS = [KNOWN_COLOR_CLASS_1, KNOWN_COLOR_CLASS_2]

export const VALUE_FONT_COLORS = [
  "#ffffff", // 0 -> white (will not be used)
  "#1A76D2", // 1 -> light blue
  "#3A8E3D", // 2 -> green
  "#D64540", // 3 -> red
  "#7B1FA2", // 4 -> purple
  "#FB930E", // 5 -> orange
  "#7FAFA2", // 6 -> teal
  "#424242", // 7 -> grey
  "#B5A598", // 8 -> light grey
]

export const HUMAN_HEADER_COLOR = "darkgreen"
export const AI_HEADER_COLOR = "darkblue"
// export const AI_HEADER_COLOR = "black"

export const NUM_BOMBS = 10

export const WIN_COLOR = '#006400'
export const LOSE_COLOR = '#ff0000'

// export const GAME_VIEW_BACKGROUND_COLOR = '#000090'
export const GAME_VIEW_BACKGROUND_COLOR = '#000000'
