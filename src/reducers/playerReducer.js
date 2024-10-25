import { RESET_HAND } from "./initial/player"

const PlayerReducer = (state, action) => {
  switch (action.type) {
    case RESET_HAND: {
      const { newHand } = action.payload || { newHand: [] }

      return { ...state, hand: newHand, standing: false }
    }

    default:
      return state
  }
}

export default PlayerReducer
