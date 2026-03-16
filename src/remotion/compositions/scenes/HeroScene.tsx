import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing, Img } from "remotion";
import { WiseLogo } from "../WiseLogo";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { ShapeAnimation } from "../../library/components/effects/ShapeAnimation";

export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance - scale + fade
  const logoScale = interpolate(frame, [0, 25], [0.7, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });
  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Tagline entrance
  const taglineOpacity = interpolate(frame, [18, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle entrance
  const subtitleOpacity = interpolate(frame, [35, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [35, 48], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Globe icon entrance
  const globeOpacity = interpolate(frame, [10, 22], [0, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const globeScale = interpolate(frame, [10, 30], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Ambient floating for decorative circles
  const float1 = Math.sin((frame / fps) * 1.2) * 8;
  const float2 = Math.cos((frame / fps) * 0.9) * 6;
  const float3 = Math.sin((frame / fps) * 1.5 + 1) * 10;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Decorative globe watermark */}
      <div
        style={{
          position: "absolute",
          right: -60,
          top: "50%",
          transform: `translateY(-50%) scale(${globeScale})`,
          opacity: globeOpacity,
        }}
      >
        <Img
          src="https://api.iconify.design/lucide/globe.svg?color=%23163300&width=500"
          style={{ width: 500, height: 500 }}
        />
      </div>

      {/* Floating accent shapes */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 100,
          transform: `translateY(${float1}px)`,
          opacity: interpolate(frame, [5, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <ShapeAnimation
          shape="circle"
          color="#9FE870"
          size={24}
          animation="breathe"
          speed={0.5}
          opacity={0.5}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 160,
          right: 200,
          transform: `translateY(${float2}px)`,
          opacity: interpolate(frame, [12, 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <ShapeAnimation
          shape="ring"
          color="#9FE870"
          size={40}
          strokeWidth={2}
          animation="rotate"
          speed={0.2}
          opacity={0.3}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 200,
          right: 350,
          transform: `translateY(${float3}px)`,
          opacity: interpolate(frame, [15, 28], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <ShapeAnimation
          shape="diamond"
          color="#163300"
          size={16}
          animation="breathe"
          speed={0.7}
          opacity={0.15}
        />
      </div>

      {/* Main content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
        }}
      >
        {/* Wise Logo */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
          }}
        >
          <WiseLogo color="#163300" width={280} />
        </div>

        {/* Tagline */}
        <div style={{ opacity: taglineOpacity }}>
          <TextAnimation
            startFrom={18}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "words" });
              tl.from(split.words, {
                opacity: 0,
                y: 25,
                duration: 0.5,
                stagger: 0.08,
                ease: "power3.out",
              });
              return tl;
            }}
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#163300",
              textAlign: "center",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ textWrap: "balance" }}>
              Money without borders
            </span>
          </TextAnimation>
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          <TextAnimation
            startFrom={38}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "words" });
              tl.from(split.words, {
                opacity: 0,
                y: 12,
                duration: 0.4,
                stagger: 0.05,
                ease: "power2.out",
              });
              return tl;
            }}
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: "#163300",
              opacity: 0.65,
              textAlign: "center",
            }}
          >
            Fast, transparent international transfers to 140+ countries
          </TextAnimation>
        </div>
      </div>
    </div>
  );
};

export default HeroScene;
