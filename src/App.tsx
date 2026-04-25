/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Track } from './types';

const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'SYNTH_VOYAGER.WAV',
    artist: 'CYBER_UNIT_01',
    coverUrl: 'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?q=80&w=300&auto=format&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '2',
    title: 'GLITCH_SOUL.MP3',
    artist: 'DATA_STREAM_X',
    coverUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=300&auto=format&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: '3',
    title: 'NEON_DRIFT.SYX',
    artist: 'VECTOR_PULSE',
    coverUrl: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=300&auto=format&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
];

export default function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 border border-neon-cyan rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 border border-neon-magenta rounded-full mix-blend-screen animate-pulse delay-700" />
        {/* Random characters floating */}
        <div className="absolute top-0 left-0 w-full h-full font-mono text-[8px] flex flex-wrap gap-4 p-8 overflow-hidden break-all">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className={i % 2 === 0 ? 'text-neon-cyan' : 'text-neon-magenta'}>
              01011001 11001010 FF AA DD EE {Math.random().toString(16)}
            </span>
          ))}
        </div>
      </div>

      <header className="mb-12 text-center z-10">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-pixel text-4xl mb-2 glitch-text leading-tight" 
          data-text="NEON_SYNTH_SNAKE"
        >
          NEON_SYNTH_SNAKE
        </motion.h1>
        <p className="text-neon-magenta/60 font-mono text-xs tracking-widest uppercase">
          V1.0.4.BETA // CONNECTION_ESTABLISHED
        </p>
      </header>

      <main className="w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-end justify-center gap-12 z-10">
        <div className="flex-1 max-w-[500px]">
          <SnakeGame />
        </div>

        <div className="flex flex-col gap-8 w-full max-w-[400px]">
          <div className="border border-neon-cyan/30 p-6 bg-black/60 backdrop-blur-md">
            <h3 className="text-neon-cyan font-pixel text-[10px] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-neon-cyan animate-ping" />
              SYSTEM_AUDIO_STREAM
            </h3>
            <MusicPlayer tracks={DUMMY_TRACKS} />
          </div>

          <div className="border border-neon-magenta/30 p-4 bg-black/40 backdrop-blur-md text-neon-magenta">
            <h4 className="font-pixel text-[8px] mb-2 uppercase opacity-70">Log_Output:</h4>
            <div className="font-mono text-[10px] space-y-1">
              <p>{">"} INITIALIZING_SNAKE_PROTOCOL...</p>
              <p>{">"} FETCHING_AUDIO_BUFFERS...</p>
              <p className="text-neon-cyan">{">"} READY_FOR_INPUT</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 opacity-30 font-mono text-[10px] z-10 w-full flex justify-between px-8">
        <div>© 2026 CYBER_NEURAL_CORP</div>
        <div>LATENCY: 12MS | BUFFER: 1024KB</div>
      </footer>
    </div>
  );
}
