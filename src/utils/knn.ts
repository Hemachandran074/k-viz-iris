import { MovieDataPoint } from '@/data/movieData';

export interface UserDataPoint {
  age: number;
  hoursStreamed: number;
}

export interface NeighborDistance {
  point: MovieDataPoint;
  distance: number;
  index: number;
}

export interface KNNResult {
  prediction: boolean;
  neighbors: NeighborDistance[];
  confidence: number;
}

// Calculate mean and standard deviation for standardization
const calculateStats = (data: MovieDataPoint[]) => {
  const ageMean = data.reduce((sum, point) => sum + point.age, 0) / data.length;
  const hoursMean = data.reduce((sum, point) => sum + point.hoursStreamed, 0) / data.length;

  const ageStd = Math.sqrt(data.reduce((sum, point) => sum + Math.pow(point.age - ageMean, 2), 0) / data.length);
  const hoursStd = Math.sqrt(data.reduce((sum, point) => sum + Math.pow(point.hoursStreamed - hoursMean, 2), 0) / data.length);

  return { ageMean, hoursMean, ageStd, hoursStd };
};

// Calculate Euclidean distance between standardized points
export const calculateDistance = (point1: UserDataPoint, point2: MovieDataPoint, stats: { ageMean: number, hoursMean: number, ageStd: number, hoursStd: number }): number => {
  // Standardize the values
  const age1Std = (point1.age - stats.ageMean) / stats.ageStd;
  const hours1Std = (point1.hoursStreamed - stats.hoursMean) / stats.hoursStd;
  const age2Std = (point2.age - stats.ageMean) / stats.ageStd;
  const hours2Std = (point2.hoursStreamed - stats.hoursMean) / stats.hoursStd;
  
  // Calculate Euclidean distance on standardized values
  const diff1 = age1Std - age2Std;
  const diff2 = hours1Std - hours2Std;
  
  return Math.sqrt(diff1 * diff1 + diff2 * diff2);
};

// Perform KNN classification
export const classifyWithKNN = (
  userPoint: UserDataPoint, 
  dataset: MovieDataPoint[], 
  k: number
): KNNResult => {
  // Calculate standardization statistics
  const stats = calculateStats(dataset);

  // Calculate distances to all points using standardized values
  const distances: NeighborDistance[] = dataset.map((point, index) => ({
    point,
    distance: calculateDistance(userPoint, point, stats),
    index
  }));

  // Sort by distance and take k nearest neighbors
  const neighbors = distances
    .sort((a, b) => a.distance - b.distance)
    .slice(0, k);

  // Count votes for liked/not liked
  let likedVotes = 0;
  neighbors.forEach(neighbor => {
    if (neighbor.point.likedMovie) {
      likedVotes++;
    }
  });

  // Determine if the movie will be liked based on majority vote
  const prediction = likedVotes > k / 2;
  
  // Calculate confidence as percentage of agreeing votes
  const confidence = (Math.max(likedVotes, k - likedVotes) / k);

  return {
    prediction,
    neighbors,
    confidence
  };
};