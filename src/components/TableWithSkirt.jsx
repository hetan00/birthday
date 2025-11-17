import { useTexture } from "@react-three/drei";
import * as THREE from "three";

function TableWithSkirt() {
  const clothTop = useTexture("/textures/gray_fabric.jpg");
  const clothSide = useTexture("/textures/gray_fabric.jpg");

  // top tiling
  clothTop.wrapS = clothTop.wrapT = THREE.RepeatWrapping;
  clothTop.repeat.set(3, 3);
  clothTop.encoding = THREE.sRGBEncoding;

  // sides tiling (a bit stretched vertically)
  clothSide.wrapS = clothSide.wrapT = THREE.RepeatWrapping;
  clothSide.repeat.set(3, 1.5);
  clothSide.encoding = THREE.sRGBEncoding;

  const woodColor = "#8b5a2b";

  // sizes
  const tabletopSize = 10;   // wood
  const clothSize = 12;      // cloth a bit bigger than wood
  const skirtHeight = 1.5;   // how far it hangs down

  return (
    <group>
      {/* 🪵 Wooden tabletop (slightly smaller than cloth) */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[tabletopSize, 0.2, tabletopSize]} />
        <meshStandardMaterial color={woodColor} />
      </mesh>

      {/* 🧺 Cloth on top – flat, larger than wood */}
      <mesh
        position={[0, 0.02, 0]}           // just above the wood
        rotation={[-Math.PI / 2, 0, 0]}   // make it horizontal
        receiveShadow
      >
        <planeGeometry args={[clothSize, clothSize]} />
        <meshStandardMaterial
          map={clothTop}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 👗 Straight skirt – 4 sides, aligned to cloth edge */}

      {/* FRONT (positive Z) */}
      <mesh
        position={[0, -skirtHeight / 2, clothSize / 2]} // center in Y & Z
        rotation={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[clothSize, skirtHeight]} />
        <meshStandardMaterial
          map={clothSide}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* BACK (negative Z) */}
      <mesh
        position={[0, -skirtHeight / 2, -clothSize / 2]}
        rotation={[0, Math.PI, 0]}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[clothSize, skirtHeight]} />
        <meshStandardMaterial
          map={clothSide}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* LEFT (negative X) */}
      <mesh
        position={[-clothSize / 2, -skirtHeight / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[clothSize, skirtHeight]} />
        <meshStandardMaterial
          map={clothSide}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* RIGHT (positive X) */}
      <mesh
        position={[clothSize / 2, -skirtHeight / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[clothSize, skirtHeight]} />
        <meshStandardMaterial
          map={clothSide}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 🪵 Legs under the wood (aligned with tabletop corners) */}
      <mesh position={[-tabletopSize / 2 + 0.3, -1.2, tabletopSize / 2 - 0.3]} castShadow>
        <boxGeometry args={[0.4, 2.3, 0.4]} />
        <meshStandardMaterial color={woodColor} />
      </mesh>

      <mesh position={[tabletopSize / 2 - 0.3, -1.2, tabletopSize / 2 - 0.3]} castShadow>
        <boxGeometry args={[0.4, 2.3, 0.4]} />
        <meshStandardMaterial color={woodColor} />
      </mesh>

      <mesh position={[-tabletopSize / 2 + 0.3, -1.2, -tabletopSize / 2 + 0.3]} castShadow>
        <boxGeometry args={[0.4, 2.3, 0.4]} />
        <meshStandardMaterial color={woodColor} />
      </mesh>

      <mesh position={[tabletopSize / 2 - 0.3, -1.2, -tabletopSize / 2 + 0.3]} castShadow>
        <boxGeometry args={[0.4, 2.3, 0.4]} />
        <meshStandardMaterial color={woodColor} />
      </mesh>
    </group>
  );
}

export default TableWithSkirt;
