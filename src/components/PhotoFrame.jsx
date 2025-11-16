import { useTexture } from "@react-three/drei";
import { useState } from "react";

function PhotoFrame({ url, position, rotation, onClick, isActive = false }) {
  const texture = useTexture(url);
  const [hovered, setHovered] = useState(false);

  const highlighted = hovered || isActive;

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={onClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
      scale={highlighted ? 1.08 : 1}
    >
      {/* PHOTO – self-lit so lighting doesn’t make it dull */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[3, 2]} />
        <meshBasicMaterial
          map={texture}
          toneMapped={false}   // keeps original colors/brightness
        />
      </mesh>

      {/* FRAME – still reacts to scene lighting */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.2, 2.2, 0.1]} />
        <meshStandardMaterial
          color={highlighted ? "#e3c9a5" : "#bfa27a"}
        />
      </mesh>
    </group>
  );
}

export default PhotoFrame;
