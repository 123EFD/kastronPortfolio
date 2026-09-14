import React from 'react';

export const PixelBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 8-bit Grid Pattern */}
      <div className="absolute inset-0 retro-grid-bg opacity-70" />

      {/* Subtle CRT Scanlines */}
      <div className="absolute inset-0 retro-scanlines pointer-events-none opacity-40" />

      {/* Ambient Radial Glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] 
                   bg-primary/10 dark:bg-primary/15 blur-[120px] rounded-full pointer-events-none" 
      />
      <div 
        className="absolute bottom-10 right-10 w-[450px] h-[300px] 
                   bg-accent/10 dark:bg-accent/15 blur-[100px] rounded-full pointer-events-none" 
      />

      {/* Retro decorative corner crosses (8-bit style) */}
      <div className="hidden lg:block absolute top-6 left-6 font-mono text-xs text-muted-foreground/40 select-none">
        +---+---+
      </div>
      <div className="hidden lg:block absolute top-6 right-6 font-mono text-xs text-muted-foreground/40 select-none">
        +---+---+
      </div>
      <div className="hidden lg:block absolute bottom-6 left-6 font-mono text-xs text-muted-foreground/40 select-none">
        +---+---+
      </div>
      <div className="hidden lg:block absolute bottom-6 right-6 font-mono text-xs text-muted-foreground/40 select-none">
        +---+---+
      </div>
    </div>
  );
};
