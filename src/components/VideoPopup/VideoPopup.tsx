import { useRef, useState, useEffect } from "react";
import s from "./VideoPopup.module.css";

export const VideoPopup = ({
  isOpen,
  onClose,
  videoSrc,
}: {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setAnimateOut(false);
      onClose();
    }, 300);
  };

  useEffect(() => {
    if (!isOpen || !videoRef.current) return;

    const video = videoRef.current;

    let timeout: ReturnType<typeof setTimeout>;

    requestAnimationFrame(() => {
      setAnimateIn(true);
      setTimeout(() => {
        video.play();
        setIsPlaying(true);
      }, 100); // дати йому чуть-чуть часу на DOM
    });

    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000); // 3 сек без руху → ховаємо
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleTimeUpdate = () => {
      const current = video.currentTime;
      const percent = (current / video.duration) * 100;
      setProgress(percent);
      setCurrentTime(current); // 💥 додаємо
    };

    const handleMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener("loadedmetadata", handleMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    window.addEventListener("mousemove", handleMouseMove);
    video.addEventListener("ended", handleClose);
    document.body.style.overflow = "hidden";

    return () => {
      video.removeEventListener("loadedmetadata", handleMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
      video.removeEventListener("ended", handleClose);
      setAnimateIn(false);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    videoRef.current.currentTime = newTime;
  };

  if (!isOpen && !animateOut) return null;

  return (
    <div
      className={`
    ${s.overlay}
    ${!animateIn ? s.invisible : ""} 
    ${animateIn ? s.fadeIn : ""}
    ${animateOut ? s.fadeOut : ""}
  `}
    >
      <div className={s.popup} onClick={(e) => e.stopPropagation()}>
        <video
          key={videoSrc}
          ref={videoRef}
          src={videoSrc}
          className={s.video}
          playsInline
          preload="auto"
        />
        <div className={`${s.controls} ${showControls ? s.visible : s.hidden}`}>
          <button onClick={togglePlay} className={s.playBtn}>
            {isPlaying ? (
              <img src="/images/pause.png" />
            ) : (
              <img src="/images/play.png" />
            )}
          </button>

          <div className={s.progressBar} onClick={handleSeek}>
            <div className={s.progress} style={{ width: `${progress}%` }} />
            <div className={s.dot} style={{ left: `${progress}%` }} />
          </div>

          <div className={s.timer}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
        <button className={s.close} onClick={handleClose}>
          <svg
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M39 39L13 13M39 13L13 39"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
