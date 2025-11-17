// import { useGLTF, Center } from "@react-three/drei";
// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";

// export default function Cake() {
//   const group = useRef();
//   const { scene } = useGLTF("/models/strawberry_cake.glb");

  // optional idle spin
//   useFrame((state, delta) => {
//     if (!group.current) return;
//     group.current.rotation.y += delta * 0.2;
//   });

//   return (
//     // y here lifts the whole cake off the table a bit
//     <group ref={group} position={[0, 0.02, 0]}>
//       {/* "top" tells Center to place the BOTTOM of the model at y = 0 */}
//       <Center top>
//         <primitive
//           object={scene}
//           scale={1}   // keep your perfect size
//           castShadow
//           receiveShadow
//         />
//       </Center>
//     </group>
//   );
// }



import { useGLTF } from "@react-three/drei";

export default function Cake() {
  const { scene } = useGLTF("/models/cake.glb");

  return (
    <group 
      position={[0, 0.15, 0]}   // <-- adjust this Y value
      scale={[0.65, 0.45, 0.65]} // <-- change to your perfect size
      castShadow
      receiveShadow
    >
      <primitive object={scene} />
    </group>
  );
}

