import { IrisDataPoint } from '@/data/irisData';

export interface UserDataPoint {
  sepalLength: number;
  sepalWidth: number;
  petalLength: number;
  petalWidth: number;
}

export interface NeighborDistance {
  point: IrisDataPoint;
  distance: number;
  index: number;
}

export interface KNNResult {
  prediction: 'setosa' | 'versicolor' | 'virginica';
  neighbors: NeighborDistance[];
  confidence: { [key: string]: number };
}

// Calculate Euclidean distance between two points
export const calculateDistance = (point1: UserDataPoint, point2: IrisDataPoint): number => {
  const diff1 = point1.sepalLength - point2.sepalLength;
  const diff2 = point1.sepalWidth - point2.sepalWidth;
  const diff3 = point1.petalLength - point2.petalLength;
  const diff4 = point1.petalWidth - point2.petalWidth;
  
  return Math.sqrt(diff1 * diff1 + diff2 * diff2 + diff3 * diff3 + diff4 * diff4);
};

// Perform KNN classification
export const classifyWithKNN = (
  userPoint: UserDataPoint, 
  dataset: IrisDataPoint[], 
  k: number
): KNNResult => {
  // Calculate distances to all points
  const distances: NeighborDistance[] = dataset.map((point, index) => ({
    point,
    distance: calculateDistance(userPoint, point),
    index
  }));

  // Sort by distance and take k nearest neighbors
  const neighbors = distances
    .sort((a, b) => a.distance - b.distance)
    .slice(0, k);

  // Count votes for each species
  const votes: { [key: string]: number } = {};
  neighbors.forEach(neighbor => {
    votes[neighbor.point.species] = (votes[neighbor.point.species] || 0) + 1;
  });

  // Find the species with most votes
  const prediction = Object.keys(votes).reduce((a, b) => 
    votes[a] > votes[b] ? a : b
  ) as 'setosa' | 'versicolor' | 'virginica';

  // Calculate confidence percentages
  const confidence: { [key: string]: number } = {};
  Object.keys(votes).forEach(species => {
    confidence[species] = (votes[species] / k) * 100;
  });

  return {
    prediction,
    neighbors,
    confidence
  };
};