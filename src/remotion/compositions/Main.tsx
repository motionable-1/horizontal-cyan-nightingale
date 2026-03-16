import { AbsoluteFill, Audio, Sequence, Artifact, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { loadFont } from "@remotion/google-fonts/Inter";
import { fade } from "@remotion/transitions/fade";

import { AmbientBackground } from "./scenes/AmbientBackground";
import { HeroScene } from "./scenes/HeroScene";
import { FeatureCard } from "./scenes/FeatureCard";
import { CTAScene } from "./scenes/CTAScene";
import { BoltIcon, ShieldIcon, HeadsetIcon } from "./scenes/Icons";

// Wise brand colors:
// Primary dark green: #163300
// Accent bright green: #9FE870
// Background: #FFFFFF

// Scene durations (in frames at 30fps)
const HERO_DURATION = 120; // 4 seconds
const FEATURE_DURATION = 130; // ~4.3 seconds each
const CTA_DURATION = 135; // 4.5 seconds (extra buffer at end)
const TRANSITION_DURATION = 15; // 0.5 second transitions

// Total: 120 + 130*3 + 135 - 4*15 = 585 frames = 19.5s

// SFX URLs
const WHOOSH_SFX =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1773645267067_6ynrsskbdik_sfx_subtle_corporate_tech_whoosh_t.mp3";
const CHIME_SFX =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1773645274354_cr9dk6055ye_sfx_soft_digital_notification_chim.mp3";

export const Main: React.FC = () => {
  const { fontFamily } = loadFont();
  const frame = useCurrentFrame();

  // Transition timings for SFX placement
  const t1 = HERO_DURATION - TRANSITION_DURATION; // ~105
  const t2 = t1 + FEATURE_DURATION - TRANSITION_DURATION; // ~220
  const t3 = t2 + FEATURE_DURATION - TRANSITION_DURATION; // ~335
  const t4 = t3 + FEATURE_DURATION - TRANSITION_DURATION; // ~450

  return (
    <>
      {/* Thumbnail artifact */}
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}

      <AbsoluteFill
        style={{
          fontFamily,
          background: "#FFFFFF",
        }}
      >
        {/* Persistent ambient background */}
        <AmbientBackground />

        {/* Scene transitions */}
        <TransitionSeries>
          {/* Scene 1: Hero intro */}
          <TransitionSeries.Sequence durationInFrames={HERO_DURATION}>
            <HeroScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 2: Instant Transfers */}
          <TransitionSeries.Sequence durationInFrames={FEATURE_DURATION}>
            <FeatureCard
              icon={<BoltIcon />}
              title="Instant Transfers"
              description="74% of transfers arrive in under 20 seconds. Send money to 140+ countries with the speed of a text message."
              stat={{ from: 0, to: 20, suffix: "s" }}
              statLabel="average delivery time"
              index={0}
            />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 3: Transparent Pricing */}
          <TransitionSeries.Sequence durationInFrames={FEATURE_DURATION}>
            <FeatureCard
              icon={<ShieldIcon />}
              title="Transparent Pricing"
              description="Always the real exchange rate. No hidden markups, no surprises. You see exactly what you pay before you send."
              stat={{ from: 0, to: 0, suffix: " hidden fees", prefix: "" }}
              statLabel="real mid-market exchange rate"
              index={1}
            />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 4: 24/7 Support */}
          <TransitionSeries.Sequence durationInFrames={FEATURE_DURATION}>
            <FeatureCard
              icon={<HeadsetIcon />}
              title="24/7 Customer Support"
              description="Round-the-clock support from a team that speaks your language. Help whenever you need it, wherever you are."
              stat={{ from: 0, to: 24, suffix: "/7" }}
              statLabel="always available support"
              index={2}
            />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 5: CTA */}
          <TransitionSeries.Sequence durationInFrames={CTA_DURATION}>
            <CTAScene />
          </TransitionSeries.Sequence>
        </TransitionSeries>

        {/* Sound effects at transition points */}
        <Sequence from={0}>
          <Audio src={CHIME_SFX} volume={0.15} />
        </Sequence>
        <Sequence from={t1}>
          <Audio src={WHOOSH_SFX} volume={0.12} />
        </Sequence>
        <Sequence from={t2}>
          <Audio src={WHOOSH_SFX} volume={0.12} />
        </Sequence>
        <Sequence from={t3}>
          <Audio src={WHOOSH_SFX} volume={0.12} />
        </Sequence>
        <Sequence from={t4}>
          <Audio src={CHIME_SFX} volume={0.18} />
        </Sequence>
      </AbsoluteFill>
    </>
  );
};
