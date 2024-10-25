/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useReducer, useState } from "react"
import CardGameReducer from "../reducers/deckReducer"
import { DRAW_CARD, initialDeck, RESET_DECK, SHUFFLE_DECK } from "../reducers/initial/deck"
import { RESET_HAND } from "../reducers/initial/player"
import PlayerReducer from "../reducers/playerReducer"

const useSimplePoker = () => {
  const [deckState, dispatchDeck] = useReducer(CardGameReducer, { deck: initialDeck(), drawnCards: [] })
  const [playerState, dispatchPlayer] = useReducer(PlayerReducer, { hand: [], standing: false })
  const [dealer, setDealer] = useState({ hand: [] })
  const [turns, setTurns] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState(null)
  const [isDeckShuffled, setIsDeckShuffled] = useState(false)

  useEffect(() => {
    dispatchDeck({ type: SHUFFLE_DECK })
    setIsDeckShuffled(true)
  }, [isDeckShuffled])

  useEffect(() => {
    if (isDeckShuffled && deckState.deck.length === 32) {
      drawInitialHands()
      setIsDeckShuffled(false)
    }
  }, [isDeckShuffled, deckState.deck])

  const drawInitialHands = useCallback(() => {
    const playerHand = deckState.deck.slice(0, 4)
    dispatchPlayer({ type: RESET_HAND, payload: { newHand: playerHand } })

    const dealerHand = deckState.deck.slice(4, 8)
    setDealer({ hand: dealerHand })

    dispatchDeck({ type: DRAW_CARD, payload: { count: 8 } })
  }, [deckState.deck])



  const checkVictory = useCallback(() => {
    const evaluateHand = (hand) => {
      const valuesCount = hand.reduce((acc, card) => {
        acc[card.value] = (acc[card.value] || 0) + 1

        return acc
      }, {})

      const conditions = [
        { name: "4 of a kind", priority: 5, condition: Object.values(valuesCount).includes(4) },
        { name: "3 of a kind", priority: 4, condition: Object.values(valuesCount).includes(3) },
        { name: "2 pairs", priority: 3, condition: Object.values(valuesCount).filter((v) => v === 2).length === 2 },
        { name: "1 pair", priority: 2, condition: Object.values(valuesCount).includes(2) },
        { name: "highest card", priority: 1, condition: true },
      ]

      return conditions.find((cond) => cond.condition)
    }

    const playerResult = evaluateHand(playerState.hand)
    const dealerResult = evaluateHand(dealer.hand)

    // eslint-disable-next-line init-declarations
    let result
    if (playerResult.priority > dealerResult.priority) {
      result = `Player wins with ${playerResult.name}`
    } else if (playerResult.priority < dealerResult.priority) {
      result = `Dealer wins with ${dealerResult.name}`
    } else if (playerResult.name === "highest card" && dealerResult.name === "highest card") {
      const playerHighest = Math.max(...playerState.hand.map(card => card.value))
      const dealerHighest = Math.max(...dealer.hand.map(card => card.value))

      if (playerHighest > dealerHighest) {
        result = "Player wins with highest card"
      } else if (playerHighest < dealerHighest) {
        result = "Dealer wins with highest card"
      } else {
        result = "It's a tie"
      }
    } else if (playerResult.name === dealerResult.name) {
      result = "It's a tie"
    } else {
      const playerHighest = Math.max(...playerState.hand.map(card => card.value))
      const dealerHighest = Math.max(...dealer.hand.map(card => card.value))

      if (playerHighest > dealerHighest) {
        result = "Player wins with highest card"
      } else if (playerHighest < dealerHighest) {
        result = "Dealer wins with highest card"
      } else {
        result = "It's a tie"
      }
    }

    setWinner(result)
    setGameOver(true)
  }, [playerState.hand, dealer.hand])

  const finishGame = useCallback(() => {
    checkVictory()
  }, [checkVictory])

  const resetGame = useCallback(() => {
    dispatchDeck({ type: RESET_DECK, payload: { newDeck: initialDeck() } })
    dispatchPlayer({ type: RESET_HAND, payload: { newHand: [] } })
    setDealer({ hand: [] })
    setTurns(3)
    setGameOver(false)
    setWinner(null)
    setIsDeckShuffled(false)
  }, [])

  const exchangeCards = useCallback(
    (cardIndices) => {
      if (turns > 0 && !gameOver) {
        dispatchDeck({ type: DRAW_CARD, payload: { count: cardIndices.length } })
        const newHand = playerState.hand.map((card, index) =>
          cardIndices.includes(index) ? deckState.drawnCards.shift() : card
        )
        dispatchPlayer({ type: RESET_HAND, payload: { newHand } })
        setTurns((prev) => prev - 1)

        if (turns - 1 === 0) {
          finishGame()
        }
      }
    },
    [turns, gameOver, playerState.hand, deckState.drawnCards, finishGame]
  )

  return {
    player: playerState,
    dealer,
    deck: deckState.deck,
    turns,
    gameOver,
    winner,
    exchangeCards,
    finishGame,
    resetGame,
  }
}

export default useSimplePoker