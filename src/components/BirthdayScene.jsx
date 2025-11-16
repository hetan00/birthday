import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture, Environment, Text, Sparkles } from "@react-three/drei";
import Cake from "./Cake";
import PhotoFrame from "./PhotoFrame";
import * as THREE from "three"; // make sure this is at the top



const LETTERS = [
  "Happy birthday Ritik! Wishing you all the best on your special day!",
  "Never stop being you.",
];

function Letter({ index, position, onSelect, isOpen }) {
  return (
    <mesh
      position={position}
      // when open, tilt the letter up a bit like it's opening
      rotation={isOpen ? [-Math.PI / 3, 0, 0] : [0, 0, 0]}
      scale={isOpen ? 1.05 : 1}
      onClick={() => onSelect(index)}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[0.8, 0.05, 0.5]} />
      <meshStandardMaterial color={isOpen ? "#fdf5e6" : "#ffffff"} />
    </mesh>
  );
}

// ✅ Table component: this is the ONLY place we call useTexture
function Table() {
  const tableTexture = useTexture("/textures/fabric_cloth.jpg");

  tableTexture.wrapS = tableTexture.wrapT = THREE.RepeatWrapping;
  tableTexture.repeat.set(6, 6);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[12, 12]} />
      <meshStandardMaterial map={tableTexture} />
    </mesh>
  );
}




function BirthdayScene() {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [openLetterIndex, setOpenLetterIndex] = useState(null);
  const [openPhotoIndex, setOpenPhotoIndex] = useState(null);

  return (
    <div style={{ height: "100vh", position: "relative" }}>
    <Canvas camera={{ position: [-10.5, 6, -6.2], fov: 60 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight
            position={[5, 8, 5]}
            intensity={0.9}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
        />

        <pointLight position={[0, 5, -4]} intensity={0.4} />

        <OrbitControls target={[0, 1, 0]} />

          {/* Everything async (HDRI, textures, models) inside Suspense */}
            <Suspense fallback={null}>
    {/* 360° environment */}
    <Environment
        background
        files="/backgrounds/shanghai.hdr"
    />

    {/* Rotate the whole birthday setup */}
    <group rotation={[0, Math.PI - 5.38, 0]}>
        {/* Textured tablecloth */}
        <Table />

        {/* ------------------- TABLE LEGS (ADD HERE) ------------------- */}
    {/* <mesh position={[-5.5, -1.5, -5.5]} castShadow>
      <boxGeometry args={[0.3, 3, 0.3]} />
      <meshStandardMaterial color="#8b5a2b" />
    </mesh>

    <mesh position={[5.5, -1.5, -5.5]} castShadow>
      <boxGeometry args={[0.3, 3, 0.3]} />
      <meshStandardMaterial color="#8b5a2b" />
    </mesh>

    <mesh position={[-5.5, -1.5, 5.5]} castShadow>
      <boxGeometry args={[0.3, 3, 0.3]} />
      <meshStandardMaterial color="#8b5a2b" />
    </mesh>

    <mesh position={[5.5, -1.5, 5.5]} castShadow>
      <boxGeometry args={[0.3, 3, 0.3]} />
      <meshStandardMaterial color="#8b5a2b" />
    </mesh> */}
    {/* ------------------------------------------------------------- */}

        {/* Cake */}
        <Cake />

        {/* Photo frames */}
        <PhotoFrame
        url="/photos/photo1.jpg"
        //url="/photos/young-family-with-children-autumn-park.jpg"
        position={[-3, 1.1, 0]}
        rotation={[0, Math.PI / 8, 0]}
        onClick={() => setOpenPhotoIndex(0)}
        isActive={openPhotoIndex === 0}
        />
        <PhotoFrame
        url="/photos/photo2.jpg"
        //url="/photos/young-family-with-children-autumn-park.jpg"
        position={[3, 1.1, 0]}
        rotation={[0, -Math.PI / 8, 0]}
         onClick={() => setOpenPhotoIndex(1)}
        isActive={openPhotoIndex === 1}
        />
        <PhotoFrame
        url="/photos/photo3.jpg"
        //url="/photos/young-family-with-children-autumn-park.jpg"
        position={[0, 1.1, -3]}
        rotation={[0, 0, 0]}
        onClick={() => setOpenPhotoIndex(2)}
        isActive={openPhotoIndex === 2}
        />

       <Letter
            index={0}
            position={[-1.8, 0.05, 2]}
            onSelect={setOpenLetterIndex}
            isOpen={openLetterIndex === 0}
        />
        <Letter
            index={1}
            position={[1.8, 0.05, 2]}
            onSelect={setOpenLetterIndex}
            isOpen={openLetterIndex === 1}
        />

        
    {/* 🎉 HAPPY BIRTHDAY TEXT IN THE SKY */}
    <Text
      position={[0, 6, -15]}   // up and back toward the skyline
      fontSize={1.4}
      color="#aed2f3ff"
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.04}
      outlineColor="#63a1f1ff"
    >
      Happy Birthday, Ritik!
    </Text>

    {/* 🎆 Sparkly “fireworks” behind the text */}
    <Sparkles
      count={80}
      speed={0.8}
      opacity={1}
      color="#f0bf98ff"
      size={6}
      scale={[18, 10, 8]}   // width/height/depth of sparkles area
      position={[0, 5.5, -15]}
    />
    
    </group>
    </Suspense>
      </Canvas>

      {openPhotoIndex !== null && (
  <div
    style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0, 0, 0, 0.7)",
      zIndex: 9, // slightly under letters if both ever clash
    }}
    onClick={() => setOpenPhotoIndex(null)}
  >
    <div
      style={{
        position: "relative",
        background: "#111",
        padding: "1rem",
        borderRadius: "12px",
        maxWidth: "80vw",
        maxHeight: "80vh",
        boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setOpenPhotoIndex(null)}
        style={{
          position: "absolute",
          top: "0.4rem",
          right: "0.6rem",
          border: "none",
          background: "transparent",
          color: "#fff",
          fontSize: "1.4rem",
          cursor: "pointer",
        }}
      >
        ×
      </button>

      <img
        src={
          openPhotoIndex === 0
            ? "/photos/photo1.jpg"
            : openPhotoIndex === 1
            ? "/photos/photo2.jpg"
            : "/photos/photo3.jpg"
        }
        alt={`Photo ${openPhotoIndex + 1}`}
        style={{
          display: "block",
          maxWidth: "70vw",
          maxHeight: "70vh",
          borderRadius: "8px",
        }}
      />
    </div>
  </div>
)}


      {/* Letter popup overlay */}
    {openLetterIndex !== null && (
    <div
        style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.6)",
        zIndex: 10,
        }}
        onClick={() => setOpenLetterIndex(null)} // click outside to close
    >
        <div
        style={{
            background: "#fdf5e6",
            color: "#333",
            padding: "2rem",
            borderRadius: "12px",
            maxWidth: "480px",
            width: "90%",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            fontFamily: "Typewriter, monospace",
            position: "relative",
            cursor: "default",
        }}
        onClick={(e) => e.stopPropagation()} // stop click from closing when clicking inside
        >
        <button
            onClick={() => setOpenLetterIndex(null)}
            style={{
            position: "absolute",
            top: "0.6rem",
            right: "0.8rem",
            border: "none",
            background: "transparent",
            fontSize: "1.4rem",
            cursor: "pointer",
            }}
        >
            ×
        </button>

        <h2 style={{ marginTop: 0, marginBottom: "0.75rem", fontSize: "1.3rem" }}>
            Letter {openLetterIndex + 1}
        </h2>

        <p style={{ margin: 0, whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
            {LETTERS[openLetterIndex]}
        </p>
        </div>
    </div>
    )}
    </div>
  );
}

export default BirthdayScene;
