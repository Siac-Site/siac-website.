"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, Shield, Activity, TrendingUp, type LucideIcon } from "lucide-react";

interface MethodStep {
  title: string;
  keyword: string;
  rest: string;
  icon: LucideIcon;
}

const STEPS: MethodStep[] = [
  {
    title: "Diagnosticar",
    keyword: "Diagnosticar",
    rest: " riscos, dependências e o impacto real no negócio.",
    icon: Search,
  },
  {
    title: "Estabilizar",
    keyword: "Estabilizar",
    rest: " prioridades, arquitetura e a base de serviço.",
    icon: Shield,
  },
  {
    title: "Operar",
    keyword: "Operar",
    rest: " com monitoramento contínuo e resposta a incidentes.",
    icon: Activity,
  },
  {
    title: "Evoluir",
    keyword: "Evoluir",
    rest: " com governança, indicadores e roadmap contínuo.",
    icon: TrendingUp,
  },
];

const CYCLE_DURATION_MS = 9000;
const STEP_DURATION_MS = CYCLE_DURATION_MS / STEPS.length;

export function MethodCycle() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % STEPS.length);
    }, STEP_DURATION_MS);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  const active = STEPS[activeIndex];
  const ActiveIcon = active.icon;
  // Fill tracks the currently active node's position along the bar (0%,
  // 33.33%, 66.66%, 100%) — animated linearly over one step's duration so it
  // arrives exactly as that step becomes active. Snaps instantly on the
  // wrap back to step 1 instead of animating backwards across the bar.
  const fillWidth = `${(activeIndex / (STEPS.length - 1)) * 100}%`;
  const isReset = activeIndex === 0;

  return (
    <div className="relative mx-auto mt-xl max-w-3xl px-sm">
      <div className="flex flex-col items-center text-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            className="flex flex-col items-center"
          >
            <p className="text-sm font-semibold tracking-[0.1em] text-brand-graphite/40 dark:text-brand-ice/40">
              <span className="text-brand-primary">0{activeIndex + 1}</span> / 04
            </p>
            <div className="mt-md flex h-[88px] w-[88px] items-center justify-center rounded-pill border border-brand-graphite/10 bg-white shadow-level-1 dark:border-white/10">
              <ActiveIcon
                className="h-9 w-9 text-brand-primary"
                strokeWidth={1.75}
              />
            </div>
            <p className="mt-md max-w-md text-lg text-brand-graphite/80 dark:text-brand-ice/80 md:text-xl">
              <span className="font-bold text-brand-primary">
                {active.keyword}
              </span>
              {active.rest}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* mx-xl (margin, not padding): the first/last step nodes are
          absolutely positioned at the track's 0%/100% points, which CSS
          resolves against the track's own padding-box edge — so padding
          on the track has no effect on them at all, only margin actually
          insets that 0%/100% reference frame. Their labels ("Diagnosticar"
          is the widest at ~73px) need at least half that width as clearance
          or they clip against the viewport edge on mobile. */}
      <div className="relative mx-xl mt-2xl h-[92px]">
        <div className="absolute left-0 right-0 top-[20px] h-[3px] -translate-y-1/2 rounded-pill bg-[rgba(40,41,40,0.1)] dark:bg-[rgba(239,238,239,0.12)]" />
        <motion.div
          className="absolute left-0 top-[20px] h-[3px] -translate-y-1/2 rounded-pill bg-brand-primary"
          animate={{ width: fillWidth }}
          transition={{
            duration: isReset || prefersReducedMotion ? 0 : STEP_DURATION_MS / 1000,
            ease: "linear",
          }}
        />

        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === activeIndex;
          const isCompleted = index < activeIndex;

          return (
            <div
              key={step.title}
              className="absolute top-0 flex -translate-x-1/2 flex-col items-center gap-sm"
              style={{ left: `${(index / (STEPS.length - 1)) * 100}%` }}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-card border ${
                  isActive
                    ? "border-brand-primary bg-brand-primary shadow-[0_0_0_8px_rgba(159,33,28,0.15)]"
                    : isCompleted
                      ? "border-brand-graphite bg-brand-graphite dark:border-brand-ice/30"
                      : "border-brand-graphite/15 bg-white dark:border-white/10 dark:bg-brand-graphite"
                }`}
                style={{
                  // Rotation stays constant across every state — only scale
                  // animates — so the active-state grow never reads as a spin.
                  transform: `rotate(45deg) scale(${isActive ? 1.15 : 1})`,
                  transition:
                    "transform 300ms cubic-bezier(0.16,1,0.3,1), background-color 300ms ease, border-color 300ms ease, box-shadow 300ms ease",
                }}
              >
                <Icon
                  style={{ transform: "rotate(-45deg)" }}
                  className={
                    isActive || isCompleted
                      ? "h-4 w-4 text-white"
                      : "h-4 w-4 text-brand-graphite/30 dark:text-brand-ice/25"
                  }
                  strokeWidth={2}
                />
              </div>
              <span
                className={`whitespace-nowrap text-xs font-medium transition-colors duration-300 ease-brand ${
                  isActive
                    ? "text-brand-graphite dark:text-brand-ice"
                    : "text-brand-graphite/40 dark:text-brand-ice/40"
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
