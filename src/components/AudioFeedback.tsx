import { useEffect, useRef } from 'react';

interface AudioFeedbackProps {
  enabled?: boolean;
}

export function AudioFeedback({ enabled = true }: AudioFeedbackProps) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Initialize Web Audio API
    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.value = 0.1; // Low volume for subtle feedback
    } catch (error) {
      console.warn('Web Audio API not supported', error);
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [enabled]);

  const playChime = (frequency: number, duration: number = 200, type: 'success' | 'select' | 'hover' = 'select') => {
    if (!audioContextRef.current || !gainNodeRef.current || !enabled) return;

    try {
      const oscillator = audioContextRef.current.createOscillator();
      const envelope = audioContextRef.current.createGain();

      oscillator.connect(envelope);
      envelope.connect(gainNodeRef.current);

      // Different waveforms for different interactions
      oscillator.type = type === 'success' ? 'sine' : type === 'select' ? 'triangle' : 'sine';
      oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);

      // Create envelope for natural sound
      envelope.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      envelope.gain.linearRampToValueAtTime(0.3, audioContextRef.current.currentTime + 0.01);
      envelope.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration / 1000);

      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
    } catch (error) {
      console.warn('Audio playback failed', error);
    }
  };

  // Korean-inspired chime sequences
  const playKoreanChime = (type: 'add-to-cart' | 'shopper-select' | 'filter-select' | 'page-transition') => {
    switch (type) {
      case 'add-to-cart':
        // Ascending pentatonic scale (Korean traditional)
        setTimeout(() => playChime(523, 150, 'success'), 0);   // C5
        setTimeout(() => playChime(587, 150, 'success'), 100); // D5
        setTimeout(() => playChime(698, 200, 'success'), 200); // F5
        break;
      
      case 'shopper-select':
        // Gentle bell-like tones
        setTimeout(() => playChime(440, 300, 'select'), 0);    // A4
        setTimeout(() => playChime(554, 300, 'select'), 150);  // C#5
        break;
      
      case 'filter-select':
        // Single soft chime
        playChime(659, 150, 'select'); // E5
        break;
      
      case 'page-transition':
        // Soft transition sound
        setTimeout(() => playChime(392, 200, 'hover'), 0);     // G4
        setTimeout(() => playChime(523, 200, 'hover'), 100);   // C5
        break;
    }
  };

  // Expose the audio functions globally for use in other components
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).seoulAudio = {
        playKoreanChime,
        playChime,
        enabled,
      };
    }
  }, [enabled]);

  return null; // This component doesn't render anything
}

// Hook for easy access to audio feedback
export function useSeoulAudio() {
  const playSound = (type: 'add-to-cart' | 'shopper-select' | 'filter-select' | 'page-transition') => {
    if (typeof window !== 'undefined' && (window as any).seoulAudio) {
      (window as any).seoulAudio.playKoreanChime(type);
    }
  };

  const playCustomChime = (frequency: number, duration?: number, type?: 'success' | 'select' | 'hover') => {
    if (typeof window !== 'undefined' && (window as any).seoulAudio) {
      (window as any).seoulAudio.playChime(frequency, duration, type);
    }
  };

  return { playSound, playCustomChime };
}
