/**
 * Converts a string to a URL-safe slug
 * Example: "Neubauten und Umbauten" → "neubauten-und-umbauten"
 *
 * @param text - The text to slugify
 * @returns A URL-safe slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}
