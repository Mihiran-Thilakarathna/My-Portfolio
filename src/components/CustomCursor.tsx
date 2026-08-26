import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor: React.FC = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isTextHovering, setIsTextHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const updateHoverState = (target: HTMLElement, e: MouseEvent) => {
            const isInteractive =
                target.tagName.toLowerCase() === 'a' ||
                target.closest('a') !== null ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('button') !== null ||
                window.getComputedStyle(target).cursor === 'pointer';

            if (isInteractive) {
                setIsHovering(true);
                setIsTextHovering(false);
                return;
            }

            if (target.closest('header') || target.closest('.header') || target.closest('.nav')) {
                setIsHovering(false);
                setIsTextHovering(false);
                return;
            }

            const isEligibleBigText =
                target.closest('.hero-quote') !== null ||
                target.closest('.section-header') !== null ||
                target.closest('.skills-copy h3') !== null ||
                (target.tagName.toLowerCase() === 'h2' && !target.closest('header') && !target.closest('.header'));

            if (isEligibleBigText) {
                try {
                    const range = document.createRange();
                    range.selectNodeContents(target);
                    const rects = range.getClientRects();
                    let isOverText = false;
                    for (let i = 0; i < rects.length; i++) {
                        const r = rects[i];
                            if (
                            e.clientX >= r.left - 8 &&
                            e.clientX <= r.right + 8 &&
                            e.clientY >= r.top - 8 &&
                            e.clientY <= r.bottom + 8
                        ) {
                            isOverText = true;
                            break;
                        }
                    }
                    if (isOverText) {
                        setIsHovering(false);
                        setIsTextHovering(true);
                        return;
                    }
                } catch (err) {

                }
            }

            setIsHovering(false);
            setIsTextHovering(false);
        };

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);

            const target = e.target as HTMLElement;
            if (target) {
                updateHoverState(target, e);
            }
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', moveCursor);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target) return;
            updateHoverState(target, e);
        };

        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY, isVisible]);

    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    return (
        <>
            <motion.div
                className="cursor-dot"
                style={{
                    x: cursorX,
                    y: cursorY,
                    opacity: isVisible ? 1 : 0
                }}
                animate={{
                    scale: isTextHovering ? 0 : isHovering ? 0.5 : 1
                }}
                transition={{ duration: 0.2 }}
            />
            <motion.div
                className={`cursor-ring ${isHovering ? 'hovering' : ''} ${isTextHovering ? 'text-hovering' : ''}`}
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    opacity: isVisible ? 1 : 0
                }}
                animate={{
                    scale: isTextHovering ? 2.5 : isHovering ? 1.5 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
        </>
    );
};

export default CustomCursor;
