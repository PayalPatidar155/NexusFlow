import { bufferCount, map, filter } from "rxjs";

export const movingAverage = (windowSize) => {
  return (source) =>
    source.pipe(
      bufferCount(windowSize, 1),

      // Ignore incomplete windows
      filter((values) => values.length === windowSize),

      map((values) => {
        const total = values.reduce(
          (sum, value) => sum + value,
          0
        );

        return total / windowSize;
      })
    );
};