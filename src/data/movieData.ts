export interface MovieDataPoint {
  age: number;
  hoursStreamed: number;
  likedMovie: boolean;
}

// Function to get color based on whether they liked the movie
export const getLikedColor = (liked: boolean) => {
  return liked ? '#4CAF50' : '#F44336'; // Green for liked, Red for not liked
};

// Parse the CSV data into MovieDataPoint objects
export const movieDataset: MovieDataPoint[] = [
  { age: 56, hoursStreamed: 9, likedMovie: true },
  { age: 46, hoursStreamed: 8, likedMovie: true },
  { age: 32, hoursStreamed: 12, likedMovie: true },
  { age: 25, hoursStreamed: 2, likedMovie: false },
  { age: 38, hoursStreamed: 1, likedMovie: false },
  { age: 56, hoursStreamed: 16, likedMovie: true },
  { age: 36, hoursStreamed: 5, likedMovie: false },
  { age: 40, hoursStreamed: 3, likedMovie: false },
  { age: 28, hoursStreamed: 12, likedMovie: true },
  { age: 28, hoursStreamed: 8, likedMovie: true },
  { age: 41, hoursStreamed: 3, likedMovie: false },
  { age: 53, hoursStreamed: 1, likedMovie: false },
  { age: 57, hoursStreamed: 3, likedMovie: false },
  { age: 41, hoursStreamed: 5, likedMovie: true },
  { age: 20, hoursStreamed: 15, likedMovie: true },
  { age: 39, hoursStreamed: 14, likedMovie: true },
  { age: 19, hoursStreamed: 3, likedMovie: false },
  { age: 41, hoursStreamed: 1, likedMovie: false },
  { age: 47, hoursStreamed: 5, likedMovie: false },
  { age: 55, hoursStreamed: 14, likedMovie: true },
  { age: 19, hoursStreamed: 7, likedMovie: false },
  { age: 38, hoursStreamed: 9, likedMovie: false },
  { age: 50, hoursStreamed: 15, likedMovie: true },
  { age: 29, hoursStreamed: 15, likedMovie: true },
  { age: 39, hoursStreamed: 10, likedMovie: false },
  { age: 42, hoursStreamed: 13, likedMovie: false },
  { age: 44, hoursStreamed: 19, likedMovie: true },
  { age: 59, hoursStreamed: 7, likedMovie: true },
  { age: 45, hoursStreamed: 17, likedMovie: true },
  { age: 33, hoursStreamed: 20, likedMovie: true },
  { age: 32, hoursStreamed: 4, likedMovie: true },
  { age: 20, hoursStreamed: 5, likedMovie: false },
  { age: 54, hoursStreamed: 7, likedMovie: false },
  { age: 24, hoursStreamed: 13, likedMovie: true },
  { age: 38, hoursStreamed: 15, likedMovie: true },
  { age: 26, hoursStreamed: 11, likedMovie: true },
  { age: 56, hoursStreamed: 4, likedMovie: false },
  { age: 35, hoursStreamed: 13, likedMovie: false },
  { age: 21, hoursStreamed: 7, likedMovie: false },
  { age: 42, hoursStreamed: 19, likedMovie: true },
  { age: 31, hoursStreamed: 2, likedMovie: false },
  { age: 26, hoursStreamed: 10, likedMovie: true },
  { age: 43, hoursStreamed: 13, likedMovie: true },
  { age: 19, hoursStreamed: 6, likedMovie: false },
  { age: 18, hoursStreamed: 5, likedMovie: false },
  { age: 12, hoursStreamed: 8, likedMovie: false },
];
