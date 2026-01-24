"use client";

import { ComponentProps, useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type DotLoaderProps = {
    frames: number[][];
    dotClassName?: string;
    isPlaying?: boolean;
    duration?: number;
    repeatCount?: number;
    onComplete?: () => void;
} & ComponentProps<"div">;

export const DotLoader = ({
    frames,
    isPlaying = true,
    duration = 100,
    dotClassName,
    className,
    repeatCount = -1,
    onComplete,
    ...props
}: DotLoaderProps) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const currentIndex = useRef(0);
    const repeats = useRef(0);
    const interval = useRef<NodeJS.Timeout>(null);

    const applyFrameToDots = useCallback(
        (dots: HTMLDivElement[], frameIndex: number) => {
            const frame = frames[frameIndex];
            if (!frame) return;

            dots.forEach((dot, index) => {
                if (frame.includes(index)) {
                    dot.style.setProperty('background-color', 'rgb(59 130 246)', 'important');
                } else {
                    dot.style.setProperty('background-color', 'rgba(255, 255, 255, 0.5)', 'important');
                }
            });
        },
        [frames],
    );

    useEffect(() => {
        currentIndex.current = 0;
        repeats.current = 0;
    }, [frames]);

    useEffect(() => {
        if (isPlaying) {
            console.log('DotLoader starting animation with frames:', frames.length);
            if (currentIndex.current >= frames.length) {
                currentIndex.current = 0;
            }
            const dotElements = gridRef.current?.children;
            if (!dotElements) {
                console.log('No dot elements found');
                return;
            }
            const dots = Array.from(dotElements) as HTMLDivElement[];
            console.log('Found dots:', dots.length);
            interval.current = setInterval(() => {
                console.log('Animating frame:', currentIndex.current);
                applyFrameToDots(dots, currentIndex.current);
                if (currentIndex.current + 1 >= frames.length) {
                    if (repeatCount != -1 && repeats.current + 1 >= repeatCount) {
                        clearInterval(interval.current!);
                        onComplete?.();
                    }
                    repeats.current++;
                }
                currentIndex.current = (currentIndex.current + 1) % frames.length;
            }, duration);
        } else {
            if (interval.current) clearInterval(interval.current);
        }

        return () => {
            if (interval.current) clearInterval(interval.current);
        };
    }, [frames, isPlaying, applyFrameToDots, duration, repeatCount, onComplete]);

    return (
        <div {...props} ref={gridRef} className={cn("grid w-fit grid-cols-7 gap-1", className)}>
            {Array.from({ length: 49 }).map((_, i) => (
                <div key={i} className={cn("h-2 w-2 rounded-sm", dotClassName)} />
            ))}
        </div>
    );
};
