import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind CSS classes using clsx and tailwind-merge.
 * This prevents style conflicts (e.g., 'p-4 p-8' becomes just 'p-8').
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}