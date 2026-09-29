import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to the returned ref. Once the element
 * enters the viewport, it gets the "is-visible" class (see .reveal /
 * .is-visible in index.css) and the observer disconnects — the animation
 * plays once, not every time the user scrolls past it.
 *
 * Usage:
 *   const ref = useReveal<HTMLDivElement>();
 *   <div ref={ref} className="reveal">...</div>
 *
 * For a staggered group, add stagger-1..stagger-5 alongside "reveal" on
 * each child — the CSS animation-delay handles the offset.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect reduced-motion users — just show the content immediately.
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) {
      node.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px', ...options }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}