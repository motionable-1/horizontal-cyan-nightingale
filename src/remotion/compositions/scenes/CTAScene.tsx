import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { WiseLogo } from "../WiseLogo";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { ShapeAnimation } from "../../library/components/effects/ShapeAnimation";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoScale = interpolate(frame, [0, 20], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });

  // CTA text entrance
  const ctaOpacity = interpolate(frame, [15, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Button entrance
  const buttonOpacity = interpolate(frame, [30, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const buttonScale = interpolate(frame, [30, 45], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  // Button pulse after settle
  const pulseScale = frame > 55
    ? 1 + Math.sin((frame - 55) / fps * 3) * 0.02
    : 1;

  // Sub-text entrance
  const subOpacity = interpolate(frame, [42, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(frame, [42, 55], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Floating decoration
  const float1 = Math.sin((frame / fps) * 1.1) * 8;
  const float2 = Math.cos((frame / fps) * 0.8) * 10;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Decorative shapes */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 160,
          transform: `translateY(${float1}px)`,
          opacity: interpolate(frame, [8, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <ShapeAnimation
          shape="circle"
          color="#9FE870"
          size={20}
          animation="breathe"
          speed={0.5}
          opacity={0.4}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 130,
          right: 180,
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
          size={50}
          strokeWidth={2}
          animation="rotate"
          speed={0.2}
          opacity={0.25}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 220,
          right: 280,
          transform: `translateY(${-float1}px)`,
          opacity: interpolate(frame, [18, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <ShapeAnimation
          shape="diamond"
          color="#163300"
          size={14}
          animation="breathe"
          speed={0.6}
          opacity={0.12}
        />
      </div>

      {/* Main CTA content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
        }}
      >
        {/* Logo */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          <WiseLogo color="#163300" width={200} />
        </div>

        {/* CTA Headline */}
        <div style={{ opacity: ctaOpacity }}>
          <TextAnimation
            startFrom={18}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "words" });
              tl.from(split.words, {
                opacity: 0,
                y: 30,
                scale: 0.9,
                duration: 0.5,
                stagger: 0.08,
                ease: "back.out(1.4)",
              });
              return tl;
            }}
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "#163300",
              textAlign: "center",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            <span style={{ textWrap: "balance" }}>
              Start saving on every transfer
            </span>
          </TextAnimation>
        </div>

        {/* Button */}
        <div
          style={{
            opacity: buttonOpacity,
            transform: `scale(${buttonScale * pulseScale})`,
          }}
        >
          <div
            style={{
              background: "#9FE870",
              color: "#163300",
              fontSize: 22,
              fontWeight: 700,
              padding: "18px 48px",
              borderRadius: 9999,
              boxShadow: "0 8px 32px rgba(159, 232, 112, 0.4), 0 2px 8px rgba(0,0,0,0.08)",
              letterSpacing: "0.01em",
            }}
          >
            Sign up for free →
          </div>
        </div>

        {/* Sub-text */}
        <div
          style={{
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
          }}
        >
          <TextAnimation
            startFrom={45}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "words" });
              tl.from(split.words, {
                opacity: 0,
                y: 10,
                duration: 0.3,
                stagger: 0.04,
                ease: "power2.out",
              });
              return tl;
            }}
            style={{
              fontSize: 18,
              color: "#163300",
              opacity: 0.5,
              fontWeight: 400,
            }}
          >
            Join 16 million customers worldwide
          </TextAnimation>
        </div>
      </div>
    </div>
  );
};

export default CTAScene;
