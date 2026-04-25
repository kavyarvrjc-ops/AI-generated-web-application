import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack, Music, Volume2 } from 'lucide-react';
import { Track } from '../types';

interface MusicPlayerProps {
  tracks: Track[];
}

export default function MusicPlayer({ tracks }: MusicPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  return (
    <div className="w-full max-w-[400px] border border-neon-magenta/30 bg-black/60 p-4 font-retro relative overflow-hidden backdrop-blur-md">
      {/* Visualizer dummy */}
      <div className="absolute top-0 left-0 w-full h-1 flex items-end gap-0.5 opacity-30">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ height: isPlaying ? [2, 10, 4, 12, 2] : 2 }}
            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
            className="flex-1 bg-neon-magenta"
          />
        ))}
      </div>

      <div className="flex gap-4 items-start">
        <div className="w-24 h-24 neon-border-magenta flex-shrink-0 relative group">
          <img 
            src={currentTrack.coverUrl} 
            alt={currentTrack.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-neon-magenta/10 mix-blend-color"></div>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="text-neon-magenta font-pixel text-[10px] truncate mb-1 glitch-text" data-text={currentTrack.title}>
            {currentTrack.title}
          </div>
          <div className="text-neon-cyan font-mono text-[10px] opacity-70 mb-4">
            {currentTrack.artist}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={prevTrack}
              className="text-neon-cyan hover:text-white transition-colors"
              id="prev-track"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button 
              onClick={togglePlay}
              className="w-10 h-10 border border-neon-magenta flex items-center justify-center text-neon-magenta hover:bg-neon-magenta hover:text-black transition-all rounded-none"
              id="play-pause"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
            </button>
            <button 
              onClick={nextTrack}
              className="text-neon-cyan hover:text-white transition-colors"
              id="next-track"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 opacity-50">
        <Volume2 className="w-4 h-4 text-neon-cyan" />
        <div className="flex-1 h-[1px] bg-neon-cyan/20 relative">
          <motion.div 
            className="absolute left-0 top-0 h-full bg-neon-cyan" 
            animate={{ width: isPlaying ? '100%' : '0%' }}
            transition={{ duration: 60, ease: "linear" }}
          />
        </div>
        <Music className="w-4 h-4 text-neon-magenta crt-flicker" />
      </div>

      <audio 
        ref={audioRef}
        src={currentTrack.audioUrl}
        onEnded={nextTrack}
      />
    </div>
  );
}
