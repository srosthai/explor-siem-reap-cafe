import { ImageResponse } from 'next/og';
import { getCafeBySlug } from '@/lib/cafes';

export const runtime = 'edge';

export const alt = 'Cafe Details';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cafe = getCafeBySlug(slug);

  if (!cafe) {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
          }}
        >
          <span style={{ color: 'white', fontSize: '48px' }}>Cafe Not Found</span>
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
        }}
      >
        {/* Left side - Content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px',
          }}
        >
          {/* Logo/Brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '30px',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 100 100">
              <path
                d="M15 35 L15 75 Q15 90 30 90 L60 90 Q75 90 75 75 L75 35 Z"
                fill="#8B5CF6"
              />
              <path
                d="M75 45 Q95 45 95 60 Q95 75 75 75"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                marginLeft: '12px',
                fontSize: '20px',
                color: '#9CA3AF',
              }}
            >
              Siem Reap Cafes
            </span>
          </div>

          {/* Area badge */}
          <div
            style={{
              display: 'flex',
              marginBottom: '16px',
            }}
          >
            <span
              style={{
                background: '#8B5CF6',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '50px',
                fontSize: '18px',
                fontWeight: '500',
              }}
            >
              {cafe.area}
            </span>
          </div>

          {/* Cafe name */}
          <h1
            style={{
              fontSize: '56px',
              fontWeight: 'bold',
              color: 'white',
              margin: '0 0 30px 0',
              lineHeight: 1.1,
            }}
          >
            {cafe.name}
          </h1>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: '40px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#10B981' }}>
                {cafe.wifi.downloadMbps}
              </span>
              <span style={{ fontSize: '16px', color: '#9CA3AF' }}>Mbps Wi-Fi</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#F59E0B' }}>
                ${cafe.minPriceUsd.toFixed(2)}
              </span>
              <span style={{ fontSize: '16px', color: '#9CA3AF' }}>Min. Price</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#8B5CF6' }}>
                {cafe.tags.length}
              </span>
              <span style={{ fontSize: '16px', color: '#9CA3AF' }}>Amenities</span>
            </div>
          </div>
        </div>

        {/* Right side - Gradient overlay */}
        <div
          style={{
            width: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
          }}
        >
          <svg width="200" height="200" viewBox="0 0 100 100">
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
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
