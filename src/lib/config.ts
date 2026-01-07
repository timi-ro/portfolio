// Base path for GitHub Pages deployment
export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/portfolio' : '';

// Helper to get asset path with base path
export function getAssetPath(path: string): string {
  return `${BASE_PATH}${path}`;
}