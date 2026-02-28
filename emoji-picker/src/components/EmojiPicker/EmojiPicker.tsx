import {
  useState,
  useRef,
  useEffect,
  useCallback,
  KeyboardEvent,
} from 'react';
import { EMOJI_CATEGORIES, ALL_EMOJIS, Emoji } from './emojis';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

export function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const displayedEmojis: Emoji[] = searchQuery.trim()
    ? ALL_EMOJIS.filter(e =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : EMOJI_CATEGORIES[activeCategory].emojis;

  const COLS = 5;

  // Close on outside click
  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [isOpen]);

  // Focus search when overlay opens; reset on close
  useEffect(() => {
    if (isOpen) {
      setFocusedIndex(-1);
      setTimeout(() => searchRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
      setFocusedIndex(-1);
    }
  }, [isOpen]);

  const handleSelect = useCallback(
    (emoji: string) => { onEmojiSelect(emoji); },
    [onEmojiSelect]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (!isOpen) return;
      const total = displayedEmojis.length;
      if (total === 0) return;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          setFocusedIndex(prev => (prev + 1) % total);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setFocusedIndex(prev => (prev <= 0 ? total - 1 : prev - 1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => {
            const next = prev + COLS;
            return next >= total ? prev % COLS : next;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => (prev - COLS < 0 ? prev : prev - COLS));
          break;
        case 'Enter':
          e.preventDefault();
          if (focusedIndex >= 0 && displayedEmojis[focusedIndex]) {
            handleSelect(displayedEmojis[focusedIndex].char);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          break;
      }
    },
    [isOpen, displayedEmojis, focusedIndex, handleSelect]
  );

  // Scroll focused emoji into view
  useEffect(() => {
    if (focusedIndex >= 0 && gridRef.current) {
      const btn = gridRef.current.querySelectorAll('button')[focusedIndex];
      btn?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex]);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center"
      onKeyDown={handleKeyDown}
    >
      {/* Trigger button */}
      <button
        className={[
          'w-11 h-11 rounded-[10px] flex items-center justify-center',
          'bg-[#252528] border-[1.5px] transition-all duration-150 flex-shrink-0',
          isOpen
            ? 'bg-[rgba(245,200,66,0.12)] border-[#f5c842] shadow-[0_0_0_3px_rgba(245,200,66,0.25)]'
            : 'border-[#2a2a2e] hover:bg-[#2f2f33] hover:border-[#3a3a3f] hover:-translate-y-px',
        ].join(' ')}
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Open emoji picker"
        aria-expanded={isOpen}
        type="button"
      >
        <span className={`font-mono text-base tracking-[-1px] transition-colors ${isOpen ? 'text-[#f5c842]' : 'text-[#8a8790]'}`}>
          {isOpen ? '✕' : '😀'}
        </span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="absolute bottom-[calc(100%+10px)] right-0 w-[280px] bg-[#1a1a1c] border-[1.5px] border-[#3a3a3f] rounded-xl shadow-[0_24px_64px_rgba(0,0,0,0.6),0_4px_16px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden animate-fade-slide-up z-[1000]"
          role="dialog"
          aria-label="Emoji picker"
        >
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[#2a2a2e] bg-[#252528]">
            <span className="text-lg text-[#555460] flex-shrink-0 leading-none">⌕</span>
            <input
              ref={searchRef}
              type="text"
              className="flex-1 bg-transparent border-none outline-none text-[#f0ede8] font-mono text-[13px] caret-[#f5c842] placeholder:text-[#555460]"
              placeholder="Search emojis..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setFocusedIndex(-1); }}
              onKeyDown={e => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setFocusedIndex(0);
                  gridRef.current?.querySelector('button')?.focus();
                }
              }}
            />
            {searchQuery && (
              <button
                className="w-[18px] h-[18px] rounded-full bg-[#2f2f33] text-[#8a8790] text-sm flex items-center justify-center flex-shrink-0 hover:bg-[#3a3a3f] hover:text-[#f0ede8] transition-all"
                onClick={() => { setSearchQuery(''); searchRef.current?.focus(); }}
                type="button"
              >
                ×
              </button>
            )}
          </div>

          {/* Category tabs */}
          {!searchQuery && (
            <div className="flex border-b border-[#2a2a2e] bg-[#252528]" role="tablist">
              {EMOJI_CATEGORIES.map((cat, i) => (
                <button
                  key={cat.name}
                  role="tab"
                  aria-selected={activeCategory === i}
                  className={[
                    'flex-1 flex flex-col items-center gap-0.5 py-2 px-1 font-mono text-[11px] transition-all border-b-2 -mb-px',
                    activeCategory === i
                      ? 'text-[#f5c842] border-[#f5c842]'
                      : 'text-[#555460] border-transparent hover:text-[#8a8790] hover:bg-[#2f2f33]',
                  ].join(' ')}
                  onClick={() => { setActiveCategory(i); setFocusedIndex(-1); }}
                  type="button"
                  title={cat.name}
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span className="text-[9px] uppercase tracking-[0.06em] font-medium">{cat.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Search result count */}
          {searchQuery && (
            <div className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[#555460] border-b border-[#2a2a2e]">
              {displayedEmojis.length === 0
                ? 'No results'
                : `${displayedEmojis.length} result${displayedEmojis.length !== 1 ? 's' : ''}`}
            </div>
          )}

          {/* Emoji grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-5 gap-0.5 p-2 max-h-[200px] overflow-y-auto scrollbar-thin"
            role="grid"
            aria-label={searchQuery ? 'Search results' : EMOJI_CATEGORIES[activeCategory].name}
          >
            {displayedEmojis.map((emoji, i) => (
              <button
                key={`${emoji.char}-${i}`}
                className={[
                  'aspect-square rounded-lg flex items-center justify-center transition-all duration-100',
                  focusedIndex === i
                    ? 'bg-[rgba(245,200,66,0.12)] scale-[1.15] outline outline-2 outline-[#f5c842] outline-offset-[-2px]'
                    : 'bg-transparent hover:bg-[rgba(245,200,66,0.12)] hover:scale-[1.15]',
                ].join(' ')}
                onClick={() => handleSelect(emoji.char)}
                onMouseEnter={() => setFocusedIndex(i)}
                title={emoji.name}
                type="button"
                role="gridcell"
                aria-label={emoji.name}
                tabIndex={focusedIndex === i ? 0 : -1}
              >
                <span className="text-[22px] leading-none">{emoji.char}</span>
              </button>
            ))}

            {displayedEmojis.length === 0 && (
              <div className="col-span-5 py-6 text-center text-[#555460] font-mono">
                <span className="block text-xl mb-2">¯\_(ツ)_/¯</span>
                <p className="text-xs">nothing found</p>
              </div>
            )}
          </div>

          {/* Hint bar */}
          <div className="flex gap-3 px-3 py-1.5 border-t border-[#2a2a2e] bg-[#252528] font-mono text-[10px] text-[#555460] tracking-[0.03em]">
            <span>↑↓←→ navigate</span>
            <span>↵ insert</span>
            <span>esc close</span>
          </div>
        </div>
      )}
    </div>
  );
}
