import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { Counter } from "../../library/components/text/Counter";
import { ShapeAnimation } from "../../library/components/effects/ShapeAnimation";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  stat?: { from: number; to: number; suffix: string; prefix?: string; decimals?: number };
  statLabel?: string;
  index: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  stat,
  statLabel,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = 0;

  // Icon circle entrance
  const iconScale = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.8)),
  });
  const iconOpacity = interpolate(frame, [delay, delay + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stat counter entrance
  const statOpacity = interpolate(frame, [delay + 12, delay + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const statScale = interpolate(frame, [delay + 12, delay + 25], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Description entrance
  const descOpacity = interpolate(frame, [delay + 30, delay + 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const descY = interpolate(frame, [delay + 30, delay + 42], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Ambient floating
  const float1 = Math.sin((frame / fps) * 1.3 + index) * 6;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Decorative floating shapes */}
      <div
        style={{
          position: "absolute",
          top: 80,
          right: 120,
          transform: `translateY(${float1}px)`,
          opacity: interpolate(frame, [10, 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <ShapeAnimation
          shape="ring"
          color="#9FE870"
          size={60}
          strokeWidth={2}
          animation="rotate"
          speed={0.15}
          opacity={0.2}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 140,
          transform: `translateY(${-float1}px)`,
          opacity: interpolate(frame, [15, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <ShapeAnimation
          shape="circle"
          color="#9FE870"
          size={18}
          animation="breathe"
          speed={0.6}
          opacity={0.35}
        />
      </div>

      {/* Content card */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          maxWidth: 700,
          textAlign: "center",
        }}
      >
        {/* Icon circle */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "#9FE870",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${iconScale})`,
            opacity: iconOpacity,
            boxShadow: "0 8px 32px rgba(159, 232, 112, 0.3)",
          }}
        >
          {icon}
        </div>

        {/* Title */}
        <div style={{ opacity: iconOpacity }}>
          <TextAnimation
            startFrom={5}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "chars" });
              tl.from(split.chars, {
                opacity: 0,
                y: 20,
                duration: 0.4,
                stagger: 0.025,
                ease: "back.out(1.7)",
              });
              return tl;
            }}
            style={{
              fontSize: 42,
              fontWeight: 700,
              color: "#163300",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </TextAnimation>
        </div>

        {/* Stat counter */}
        {stat && (
          <div
            style={{
              opacity: statOpacity,
              transform: `scale(${statScale})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: "#9FE870",
                lineHeight: 1,
                textShadow: "0 2px 12px rgba(159, 232, 112, 0.3)",
              }}
            >
              <Counter
                from={stat.from}
                to={stat.to}
                duration={1.5}
                delay={0.5}
                suffix={stat.suffix}
                prefix={stat.prefix || ""}
                decimals={stat.decimals || 0}
                ease="smooth"
              />
            </div>
            {statLabel && (
              <span
                style={{
                  fontSize: 18,
                  color: "#163300",
                  opacity: 0.5,
                  fontWeight: 500,
                }}
              >
                {statLabel}
              </span>
            )}
          </div>
        )}

        {/* Description */}
        <div
          style={{
            opacity: descOpacity,
            transform: `translateY(${descY}px)`,
          }}
        >
          <TextAnimation
            startFrom={32}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "words" });
              tl.from(split.words, {
                opacity: 0,
                y: 10,
                duration: 0.35,
                stagger: 0.04,
                ease: "power2.out",
              });
              return tl;
            }}
            style={{
              fontSize: 22,
              fontWeight: 400,
              color: "#163300",
              opacity: 0.6,
              lineHeight: 1.5,
              maxWidth: 550,
            }}
          >
            <span style={{ textWrap: "balance" }}>{description}</span>
          </TextAnimation>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
