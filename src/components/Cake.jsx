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


// Cake.jsx
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

export default function Cake() {
  const { scene } = useGLTF("/models/cake.glb");

  // clone so hot reload can't mutate the global cached scene
  const cakeScene = useMemo(() => scene.clone(true), [scene]);

  return (
    <primitive
      object={cakeScene}
      // put the BOTTOM of the cake roughly on the cloth
      position={[0, 0.04, 0]}      // ⬅ match your cloth Y (0.02)
      scale={0.008}                  // ⬅ tweak this to taste: 0.15–0.3
      castShadow
      receiveShadow
    />
  );
}


