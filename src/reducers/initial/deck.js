import CARDS from "../../utils/cards"

const SHUFFLE_DECK = "SHUFFLE_DECK"
const DRAW_CARD = "DRAW_CARD"
const RESET_DECK = "RESET_DECK"
const initialDeck = () => {
  const suits = ["hearts", "diamonds", "clubs", "spades"]
  const values = ["1", "7", "8", "9", "10", "J", "Q", "K"]
  const deck = []

  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push({ ...CARDS[value], suit })
    })
  })

  return deck
}

export { DRAW_CARD, RESET_DECK, SHUFFLE_DECK, initialDeck }
