/** Chronological order for HKJC-style date group headers (DD/MM/YYYY). */
export function sortMatchDateKeys(groupedMatches) {
  return Object.keys(groupedMatches).sort((a, b) => {
    const earliest = (key) =>
      Math.min(...groupedMatches[key].map((m) => new Date(m.time).getTime()));
    return earliest(a) - earliest(b);
  });
}
