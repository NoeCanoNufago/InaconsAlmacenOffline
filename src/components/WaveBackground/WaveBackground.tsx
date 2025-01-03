import React from 'react';
import './WaveBackground.css';

interface WaveBackgroundProps {
  primaryColor?: string;
  secondaryColor?: string;
  dotsColor?: string;
}

export const WaveBackground: React.FC<WaveBackgroundProps> = ({
  primaryColor = '#3b82f6',
  secondaryColor = '#2563eb',
  dotsColor = '#60a5fa'
}) => {
  const waveStyle = {
    background: `linear-gradient(to bottom right, 
      transparent 0%, 
      transparent 50%, 
      ${secondaryColor} 50%, 
      transparent 55%
    )`
  };

  const containerStyle = {
    background: primaryColor
  };

  const bottomWaveStyle = {
    background: `linear-gradient(to top right, ${secondaryColor}, transparent)`
  };

  const dotStyle = {
    background: dotsColor
  };

  return (
    <div className="wave-container" style={containerStyle}>
      <div className="wave" style={waveStyle}></div>
      <div className="wave wave-slow" style={waveStyle}></div>
      <div className="bottom-wave" style={bottomWaveStyle}>
        <div className="bottom-curve"></div>
      </div>
      <div className="dots-grid">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="dot" style={dotStyle}></div>
        ))}
      </div>
    </div>
  );
};
