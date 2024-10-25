import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { memo, useCallback, useRef, useState } from "react"
import useSimplePoker from "../hook/useSimplePoker"
import Card from "./Card"
import DealerButton from "./DealerButton"

const MemoizedCard = memo(Card)
const PokerGame = () => {
  const dealerRef = useRef()
  const {
    player,
    dealer,
    turns,
    gameOver,
    winner,
    exchangeCards,
    finishGame,
    resetGame,
  } = useSimplePoker()

  const [selectedCards, setSelectedCards] = useState([])
  const [resetAnimation, setResetAnimation] = useState(false)

  const toggleCardSelection = useCallback((index) => {
    setSelectedCards((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    )
  }, [])

  const handleExchange = () => {
    if (selectedCards.length > 0) {
      exchangeCards(selectedCards)
      setSelectedCards([])
      setResetAnimation(true)
      setTimeout(() => setResetAnimation(false), 100)
    }
  }

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-full h-full z-0 bg-green-700">
        <Canvas camera={{
          position: [0, 7, 0],
        }}>
          <group rotation-x={-Math.PI / 2}>
            <MemoizedCard
              doNotSelect
              doNotShow
              handleExchange={handleExchange}
              resetAnimation={resetAnimation}
              card={{
                name: " A",
                up: false, template: [
                  [false, false, false],
                  [false, false, false],
                  [false, true, false],
                  [false, false, false],
                  [false, false, false]
                ]
              }}
              position={[0, 0, 0]} />
            <group position={[0, 0, 0]}>
              {
                dealer.hand.map((card, index) => (
                  <MemoizedCard
                    key={index}
                    card={card}
                    doNotSelect
                    resetAnimation={resetAnimation}
                    position={[1.6 * index - 2.4, 5, 0]}
                    handleExchange={handleExchange}
                  />
                ))
              }
              <DealerButton dealerRef={dealerRef} />
            </group>

            <group position={[0, 0, 0]}>
              {
                player.hand.map((card, index) => (
                  <MemoizedCard
                    key={index}
                    card={card}
                    position={[1.6 * index - 2.4, -5, 0]}
                    toggleSelect={() => toggleCardSelection(index)}
                    resetAnimation={resetAnimation}
                    handleExchange={handleExchange}
                  />
                ))
              }
            </group>
          </group>
          <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} castShadow receiveShadow>
            <planeGeometry args={[1000, 1000]} />
            <meshStandardMaterial color="#15803d" />
          </mesh>
          <OrbitControls
            maxPolarAngle={Math.PI * 0.25}
            minDistance={7}
            maxDistance={13}
          />
        </Canvas>
      </div>
      <div className="w-full h-screen z-10 absolute flex flex-col pointer-events-none justify-around items-center">
        <div className="flex justify-center items-center flex-col gap-3">
          <h1 className="text-2xl font-extrabold text-white">Simple Poker Game</h1>
          <h2 className="text-xl font-semibold text-white">Turns Left: {turns}</h2>
        </div>
        <div className="flex justify-center items-center gap-3">
          <button className="bg-red-500 px-6 py-3 rounded-md text-white font-bold pointer-events-auto" onClick={finishGame}>
            Finish Game
          </button>
          <button className="bg-blue-500 px-6 py-3 rounded-md text-white font-bold pointer-events-auto" onClick={resetGame}>
            Reset Game
          </button>
        </div>
      </div>
      {
        gameOver && winner && (
          <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
            <div className="w-full h-full bg-black/20 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Winner: {winner}</h2>
                <button className="bg-blue-500 px-6 py-3 rounded-md text-white font-bold" onClick={resetGame}>
                  Play Again
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  )
}

export default PokerGame
