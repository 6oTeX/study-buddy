// src/app/relax/page.js

"use client";

import Layout from '../components/Layout';
import { useRef } from 'react';

export default function Relax() {
  const audioRef = useRef(null);
  const play = () => {
    audioRef.current.play();
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">Relax</h1>
        <h2 className="mb-2 text-lg font-semibold">Mindfulness Oefeningen</h2>
        <p>Doe deze mindfulness oefening om te ontspannen...</p>
        <h2 className="mb-2 text-lg font-semibold">Ademhalingstechnieken</h2>
        <p>Probeer deze ademhalingstechniek...</p>
        <h2 className="mb-2 text-lg font-semibold">Rustgevende Muziek</h2>
        <audio ref={audioRef} id='a1' controls preload="auto">
        <source src='/music/2pac_Hit_Em_Up.mp3' type='audio/mpeg' />
          Your browser does not support the audio element.
        </audio>
      </div>
    </Layout>
  );
}
