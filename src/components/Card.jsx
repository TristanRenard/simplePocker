/* eslint-disable react-hooks/exhaustive-deps */
import { useGSAP } from "@gsap/react"
import { Html } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import gsap from "gsap"
import { useCallback, useEffect, useRef, useState } from "react"
import CardFace from "./CardFace"

gsap.registerPlugin(useGSAP)

const CARDHEIGHT = 0.015

const Card = ({ card, position, doNotShow, doNotSelect, toggleSelect, resetAnimation, handleExchange }) => {
  const cardRef = useRef()
  const cardBG = useRef()
  const spotLight = useRef()
  const [visibleBG, setVisibleBG] = useState(1)

  const [isUp, setIsUp] = useState(false)

  useFrame(() => {
    spotLight.current.target = cardRef.current
  })

  const returnCard = useCallback(async () => {
    await gsap.to(cardRef.current.rotation, {
      y: 0,
      duration: 0.7,
      delay: 0.3,
      ease: "power4.Out",
    })
  }, [])

  const cardClick = () => {
    if (doNotShow) {
      handleExchange()
    } else if (!isUp && !doNotSelect) {
      toggleSelect()
      gsap.to(cardRef.current.position, {
        y: cardRef.current.position.y + 0.5,
        duration: 0.3,
        ease: "power4.Out",
      })
      setIsUp(true)
    } else if (!doNotSelect) {
      toggleSelect()
      gsap.to(cardRef.current.position, {
        y: cardRef.current.position.y - 0.5,
        duration: 0.3,
        ease: "power4.Out",
      })
      setIsUp(false)
    }
  }

  const mouseEnterCard = () => {
    document.getElementById("root").style.cursor = "pointer"
  }

  const mouseLeaveCard = () => {
    document.getElementById("root").style.cursor = "auto"
  }

  useEffect(() => {
    gsap.fromTo(
      spotLight.current.position,
      { y: position[1] + 1.5 || 0 },
      { y: position[1] || 0, duration: 1, ease: "power1.InOut" }
    )
    gsap.from(cardRef.current.position, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1,
      delay: 0.2,
      ease: "power1.InOut",
    })
    if (!doNotShow) {
      returnCard().then(() => setVisibleBG(0))
    }
  }, [])

  useEffect(() => {
    if (resetAnimation) {
      gsap.to(cardRef.current.position, {
        x: position[0],
        y: position[1],
        z: position[2],
        duration: 0.5,
        ease: "power1.InOut"
      })
      setIsUp(false)
    }
  }, [resetAnimation])

  return (
    <>
      <group
        ref={cardRef}
        rotation-y={position[0] > 0 ? Math.PI : -Math.PI}
        onPointerEnter={mouseEnterCard}
        onPointerLeave={mouseLeaveCard}
        onClick={cardClick}
        position={position || [0, 0, 0]}
      >
        <Html
          transform
          occlude={[cardBG]}
          position={[0, 0, 0]}
        >
          <CardFace card={card} cardClick={cardClick} />
        </Html>
        <mesh ref={cardBG} position={[0, 0, -(CARDHEIGHT / 2) - 0.0000000001]}>
          <boxGeometry args={[1.19, 1.99, CARDHEIGHT]} />
          <meshStandardMaterial color="hotpink" visible={visibleBG} />
        </mesh>
      </group>
      <ambientLight intensity={0.3} />
      <spotLight ref={spotLight} position={[position[0] || position[1], -2, position[2] + 1]} angle={1} intensity={15} color={"#e6ad12"} />
    </>
  )
}

export default Card
