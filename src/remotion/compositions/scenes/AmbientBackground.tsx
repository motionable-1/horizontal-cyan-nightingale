import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

/**
 * Shared ambient background for the entire video.
 * White base with subtle animated gradient orbs and a fine grid overlay.
 */
export const AmbientBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Slowly drifting gradient orbs
  const orb1X = 25 + Math.sin(time * 0.3) * 8;
  const orb1Y = 30 + Math.cos(time * 0.25) * 6;
  const orb2X = 70 + Math.cos(time * 0.2) * 10;
  const orb2Y = 65 + Math.sin(time * 0.35) * 8;
  const orb3X = 50 + Math.sin(time * 0.4 + 2) * 12;
  const orb3Y = 20 + Math.cos(time * 0.3 + 1) * 5;

  // Fade in
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#FFFFFF",
        opacity: bgOpacity,
      }}
    >
      {/* Primary green orb */}
      <div
        style={{
          position: "absolute",
          width: "60%",
          height: "60%",
          left: `${orb1X}%`,
          top: `${orb1Y}%`,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(159, 232, 112, 0.12) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* Secondary dark green orb */}
      <div
        style={{
          position: "absolute",
          width: "50%",
          height: "50%",
          left: `${orb2X}%`,
          top: `${orb2Y}%`,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(22, 51, 0, 0.06) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      {/* Small accent orb */}
      <div
        style={{
          position: "absolute",
          width: "35%",
          height: "35%",
          left: `${orb3X}%`,
          top: `${orb3Y}%`,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(159, 232, 112, 0.08) 0%, transparent 60%)",
          filter: "blur(40px)",
        }}
      />

      {/* Fine dot grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.35,
          backgroundImage:
            "radial-gradient(circle, rgba(22, 51, 0, 0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top and bottom subtle border accent lines */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "linear-gradient(90deg, transparent, #9FE870, transparent)",
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "linear-gradient(90deg, transparent, #9FE870, transparent)",
          opacity: 0.4,
        }}
      />
    </div>
  );
};

export default AmbientBackground;
