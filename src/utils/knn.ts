import { DataPoint, Feature, Dataset } from '@/data/datasets';

export interface UserDataPoint {
  [key: string]: number;
}

export interface NeighborDistance {
  point: DataPoint;
  distance: number;
  index: number;
}

export interface KNNResult {
  prediction: boolean;
  neighbors: NeighborDistance[];
  confidence: number;
}

export type DistanceMetricType = 'euclidean' | 'manhattan' | 'minkowski';

// Calculate mean and standard deviation for standardization
export const calculateStats = (data: DataPoint[], features: Feature[]) => {
  const stats: Record<string, { mean: number; std: number }> = {};

  features.forEach(feature => {
    const values = data.map(point => point[feature.key] as number).filter(v => v !== undefined);
    const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
    const std = Math.sqrt(values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length);

    stats[feature.key] = { mean, std: std || 1 };
  });

  return stats;
};

// Distance metric functions
const euclideanDistance = (standardized1: number[], standardized2: number[]): number => {
  let sum = 0;
  for (let i = 0; i < standardized1.length; i++) {
    const diff = standardized1[i] - standardized2[i];
    sum += diff * diff;
  }
  return Math.sqrt(sum);
};

const manhattanDistance = (standardized1: number[], standardized2: number[]): number => {
  let sum = 0;
  for (let i = 0; i < standardized1.length; i++) {
    sum += Math.abs(standardized1[i] - standardized2[i]);
  }
  return sum;
};

const minkowskiDistance = (standardized1: number[], standardized2: number[], p: number = 3): number => {
  let sum = 0;
  for (let i = 0; i < standardized1.length; i++) {
    sum += Math.pow(Math.abs(standardized1[i] - standardized2[i]), p);
  }
  return Math.pow(sum, 1 / p);
};

export const getDistanceMetric = (type: DistanceMetricType) => {
  switch (type) {
    case 'manhattan':
      return (p1: number[], p2: number[]) => manhattanDistance(p1, p2);
    case 'minkowski':
      return (p1: number[], p2: number[]) => minkowskiDistance(p1, p2);
    case 'euclidean':
    default:
      return (p1: number[], p2: number[]) => euclideanDistance(p1, p2);
  }
};

// Calculate distance between two points using specified metric
export const calculateDistance = (
  point1: UserDataPoint,
  point2: DataPoint,
  features: Feature[],
  stats: Record<string, { mean: number; std: number }>,
  metric: DistanceMetricType = 'euclidean'
): number => {
  const standardized1: number[] = [];
  const standardized2: number[] = [];

  features.forEach(feature => {
    const val1 = point1[feature.key] as number;
    const val2 = point2[feature.key] as number;
    const stat = stats[feature.key];

    standardized1.push((val1 - stat.mean) / stat.std);
    standardized2.push((val2 - stat.mean) / stat.std);
  });

  const distanceFn = getDistanceMetric(metric);
  return distanceFn(standardized1, standardized2);
};

// Perform KNN classification
export const classifyWithKNN = (
  userPoint: UserDataPoint,
  dataset: Dataset,
  k: number,
  metric: DistanceMetricType = 'euclidean'
): KNNResult => {
  // Calculate standardization statistics
  const stats = calculateStats(dataset.data, dataset.features);

  // Calculate distances to all points using the specified metric
  const distances: NeighborDistance[] = dataset.data.map((point, index) => ({
    point,
    distance: calculateDistance(userPoint, point, dataset.features, stats, metric),
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
  const confidence = Math.max(likedVotes, k - likedVotes) / k;

  return {
    prediction,
    neighbors,
    confidence
  };
};