import { Center, Text3D, useHelper } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { SpotLightHelper } from "three"

const DealerButton = () => {
  const spotLightRef = useRef()
  const buttonRef = useRef()

  useFrame(() => {
    spotLightRef.current.target = buttonRef.current
  })

  useHelper(spotLightRef, SpotLightHelper, "cyan")

  return (
    <group position={[3, 3, 0]} rotation-x={-Math.PI / 2} ref={buttonRef} castShadow receiveShadow>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      <Center>
        <Text3D rotation-x={-Math.PI / 2} size={0.5} font="./fonts/helvetiker_regular.typeface.json">
          D
          <meshBasicMaterial color="#000" />
        </Text3D>
      </Center>
      <spotLight ref={spotLightRef} position={[0, -5, 3]} angle={0.2} intensity={15} color="#e6ad12" castShadow />
    </group>
  )
}

export default DealerButton