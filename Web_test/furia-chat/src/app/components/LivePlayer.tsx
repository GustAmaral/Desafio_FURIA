"use client"

import { useEffect, useState } from "react"

interface LivePlayerProps {
  channel?: string
  src?: string 
}

const LivePlayer: React.FC<LivePlayerProps> = ({ channel = "gaules", src }) => {
  const [hostname, setHostname] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window.location.hostname)
    }
  }, [])

  return (
    <div className="w-full h-full aspect-video">
      {src ? (
        <iframe
          src={src}
          allowFullScreen
          className="w-full h-full rounded-xl"
        />
      ) : hostname ? (
        <iframe
          src={`https://player.twitch.tv/?channel=${channel}&parent=${hostname}`}
          allowFullScreen
          className="w-full h-full rounded-xl"
        />
      ) : null}
    </div>
  )
}

export default LivePlayer
