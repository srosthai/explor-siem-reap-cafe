import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Siem Reap Cafes - Find Your Perfect Work & Chill Spot';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
          padding: '60px 80px',
        }}
      >
        {/* Coffee cup icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            style={{ marginRight: '20px' }}
          >
            <path
              d="M15 35 L15 75 Q15 90 30 90 L60 90 Q75 90 75 75 L75 35 Z"
              fill="white"
              opacity="0.9"
            />
            <path
              d="M75 45 Q95 45 95 60 Q95 75 75 75"
              fill="none"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M30 25 Q35 15 30 5"
              fill="none"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M45 20 Q50 5 45 -10"
              fill="none"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M60 25 Q65 15 60 5"
              fill="none"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
          <span
            style={{
              fontSize: '28px',
              color: 'rgba(255,255,255,0.8)',
              fontWeight: '500',
            }}
          >
            siemreapcafes.com
          </span>
        </div>

        {/* Main title */}
        <h1
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: 'white',
            lineHeight: 1.1,
            margin: '0 0 20px 0',
          }}
        >
          Siem Reap Cafes
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '36px',
            color: 'rgba(255,255,255,0.9)',
            margin: '0 0 40px 0',
          }}
        >
          Find Your Perfect Work & Chill Spot
        </p>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            gap: '30px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.15)',
              padding: '12px 24px',
              borderRadius: '50px',
            }}
          >
            <span style={{ color: 'white', fontSize: '20px' }}>
              Tested Wi-Fi Speeds
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.15)',
              padding: '12px 24px',
              borderRadius: '50px',
            }}
          >
            <span style={{ color: 'white', fontSize: '20px' }}>
              Minimum Prices
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.15)',
              padding: '12px 24px',
              borderRadius: '50px',
            }}
          >
            <span style={{ color: 'white', fontSize: '20px' }}>
              Vibe Ratings
            </span>
          </div>
        </div>

        {/* Location */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <span style={{ color: 'white', fontSize: '24px', fontWeight: '500' }}>
            Cambodia
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
