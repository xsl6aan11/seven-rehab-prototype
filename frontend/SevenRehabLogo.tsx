import sevenRehabLogo from 'figma:asset/2ae62b44946261198a4861cc04def2682773a4f8.png';

interface SevenRehabLogoProps {
  width?: number;
  backgroundColor?: string;
  onClick?: () => void;
}

export default function SevenRehabLogo({ width = 120, backgroundColor, onClick }: SevenRehabLogoProps) {
  return (
    <button
      onClick={onClick}
      style={{
        background: backgroundColor || 'transparent',
        borderRadius: '50%',
        padding: backgroundColor ? '12px' : '0',
        display: 'inline-block',
        border: '3px solid rgba(77, 124, 255, 0.3)',
        boxShadow: '0 8px 24px rgba(77, 124, 255, 0.15)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease'
      }}
    >
      <div
        style={{
          width: `${width}px`,
          height: `${width}px`,
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0E1A'
        }}
      >
        <img
          src={sevenRehabLogo}
          alt="Powered by Seventic"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </div>
    </button>
  );
}