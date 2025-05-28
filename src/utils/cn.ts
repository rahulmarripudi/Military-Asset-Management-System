import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function for constructing className strings conditionally.
 * Combines clsx and tailwind-merge for optimal Tailwind CSS usage.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}