// src/components/LivePlayer.tsx
"use client"

interface LivePlayerProps {
  channel?: string
  src?: string 
}

const LivePlayer: React.FC<LivePlayerProps> = ({ channel = "gaules", src }) => {
  return (
    <div className="w-full h-full aspect-video">
      {src ? (
        <iframe
          src={src}
          allowFullScreen
          className="w-full h-full rounded-xl"
        />
      ) : (
        <iframe
          src={`https://player.twitch.tv/?channel=${channel}&parent=localhost`}
          allowFullScreen
          className="w-full h-full rounded-xl"
        />
      )}
    </div>
  )
}

export default LivePlayer
