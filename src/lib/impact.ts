// Translates wasted minutes into relatable equivalents
export function impactEquivalents(doomMins: number) {
  const hours = doomMins / 60;
  const books = Math.floor(hours / 5); // avg book 5h
  const workouts = Math.floor(hours / 1);
  const sleepNights = (hours / 8).toFixed(1);
  const languageHours = Math.floor(hours); // 1h = progress
  const movies = Math.floor(hours / 2);
  const walks = Math.floor(hours / 0.5);

  const primary =
    books >= 1
      ? `You could have read ${books} book${books > 1 ? "s" : ""} cover to cover.`
      : workouts >= 4
        ? `That's ${workouts} workouts you skipped.`
        : hours >= 2
          ? `That's ${movies} full movies - or a new skill started.`
          : `Even ${Math.round(hours * 60)} minutes is a deep work block lost.`;

  return { hours: hours.toFixed(1), books, workouts, sleepNights, languageHours, movies, walks, primary };
}
