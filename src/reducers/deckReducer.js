import { DRAW_CARD, RESET_DECK, SHUFFLE_DECK } from "./initial/deck"

const CardGameReducer = (state, action) => {
  switch (action.type) {
    case SHUFFLE_DECK: {
      const deck = [...state.deck]
      deck.forEach((_, i) => {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]
      })

      return { ...state, deck }
    }

    case DRAW_CARD: {
      const { count = 1 } = action.payload || {}
      const drawnCards = state.deck.slice(0, count)
      const updatedDeck = state.deck.slice(count)

      return { ...state, deck: updatedDeck, drawnCards }
    }

    case RESET_DECK: {
      return { deck: action.payload.newDeck, drawnCards: [] }
    }

    default:
      return state
  }
}

export default CardGameReducer
