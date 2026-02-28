import { useState, useRef, useEffect } from 'react';
import { EmojiPicker } from './components/EmojiPicker';

interface Message {
  id: number;
  text: string;
}

export default function App() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  function handleEmojiSelect(emoji: string) {
    setText(prev => prev + emoji);
    inputRef.current?.focus();
  }

  function handleSend() {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), text }]);
    setText('');
    inputRef.current?.focus();
  }

  // Scroll to bottom when new message arrives
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="relative z-10 w-full max-w-lg mx-auto px-4 py-6 flex flex-col font-mono">

      {/* Header */}
      <header className="flex items-center gap-2.5 px-1 pb-5 border-b border-[#2a2a2e]">
        <div className="w-2 h-2 rounded-full bg-[#f5c842] shadow-[0_0_8px_rgba(245,200,66,0.4)] animate-pulse-dot" />
        <span className="font-display text-lg font-bold text-[#f0ede8] tracking-tight">
          emoji_picker
        </span>
        <span className="ml-auto font-mono text-[11px] text-[#555460] bg-[#252528] px-2 py-0.5 rounded-full border border-[#2a2a2e]">
          v1.0.0
        </span>
      </header>

      {/* Chat area */}
      <div className="min-h-[240px] max-h-[320px] overflow-y-auto flex flex-col gap-2 py-4 border-b border-[#2a2a2e] mb-4 scrollbar-thin">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-center text-[#555460] font-mono text-sm my-auto">
            <div>
              <span className="block text-3xl mb-2.5 opacity-30">◉</span>
              <p>type something below</p>
            </div>
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className="flex justify-end px-1">
              <div className="bg-[#252528] border border-[#2a2a2e] rounded-xl rounded-br-sm px-4 py-2.5 max-w-[85%] animate-pop-in">
                <p className="font-mono text-sm text-[#f0ede8] break-words leading-relaxed">
                  {msg.text}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2 bg-[#1a1a1c] border border-[#3a3a3f] rounded-xl px-3.5 py-1.5 focus-within:shadow-[0_0_0_3px_rgba(245,200,66,0.06)] transition-shadow">
        <input
          ref={inputRef}
          type="text"
          className="flex-1 bg-transparent border-none outline-none text-[#f0ede8] text-sm font-mono caret-[#f5c842] placeholder:text-[#555460] min-w-0"
          placeholder="Say something..."
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
        />
        <EmojiPicker onEmojiSelect={handleEmojiSelect} />
        <button
          className="w-10 h-10 rounded-lg bg-[#f5c842] text-[#0e0e0f] flex items-center justify-center transition-all hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(245,200,66,0.3)] disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
          onClick={handleSend}
          disabled={!text.trim()}
          type="button"
          aria-label="Send"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-5 text-center font-mono text-[10px] text-[#555460] tracking-wide">
        built with React + TypeScript · no third-party UI libs
      </footer>
    </div>
  );
}
