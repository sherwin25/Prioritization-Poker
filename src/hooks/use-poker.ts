import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/utils/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

export type Player = {
  id: string;
  name: string;
  vote?: string | number | null;
  isSpectator?: boolean;
};

export type GameState = {
  isRevealed: boolean;
  topic?: string;
};

// Generate a random ID for the current session
const getMyId = () => {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem('poker_user_id');
  if (!id) {
    id = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('poker_user_id', id);
  }
  return id;
};

export function usePokerRoom(roomCode: string, myName: string) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameState, setGameState] = useState<GameState>({ isRevealed: false });
  const [myId, setMyId] = useState('');
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    setMyId(getMyId());
  }, []);

  useEffect(() => {
    if (!roomCode || !myName || !myId) return;

    const channel = supabase.channel(`room:${roomCode}`, {
      config: {
        presence: {
          key: myId,
        },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const newState = channel.presenceState();
        const activePlayers: Player[] = [];
        
        Object.values(newState).forEach((presences) => {
           // @ts-ignore
           presences.forEach((p: any) => {
             activePlayers.push({
               id: p.id,
               name: p.name,
               vote: p.vote,
               isSpectator: p.isSpectator
             });
           });
        });
        
        setPlayers(activePlayers);
      })
      .on('broadcast', { event: 'game_state' }, (payload) => {
        setGameState(payload.payload);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            id: myId,
            name: myName,
            vote: null,
            isSpectator: false
          });
        }
      });

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomCode, myName, myId]);

  const vote = async (value: string | number) => {
    if (!channelRef.current) return;
    await channelRef.current.track({
      id: myId,
      name: myName,
      vote: value,
      isSpectator: false
    });
  };

  const reveal = async () => {
    if (!channelRef.current) return;
    const newState = { ...gameState, isRevealed: true };
    setGameState(newState);
    await channelRef.current.send({
      type: 'broadcast',
      event: 'game_state',
      payload: newState
    });
  };

  const reset = async () => {
    if (!channelRef.current) return;
    const newState = { ...gameState, isRevealed: false };
    setGameState(newState);
    await channelRef.current.send({
      type: 'broadcast',
      event: 'game_state',
      payload: newState
    });
    // Reset my vote
    await channelRef.current.track({
      id: myId,
      name: myName,
      vote: null,
      isSpectator: false
    });
  };
  
  const setTopic = async (topic: string) => {
    if (!channelRef.current) return;
    const newState = { ...gameState, topic, isRevealed: false };
    setGameState(newState);
    await channelRef.current.send({
      type: 'broadcast',
      event: 'game_state',
      payload: newState
    });
  };

  return { players, gameState, myId, vote, reveal, reset, setTopic };
}
