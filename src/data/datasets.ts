export interface DataPoint {
  age?: number;
  hoursStreamed?: number;
  sepalLength?: number;
  sepalWidth?: number;
  petalLength?: number;
  petalWidth?: number;
  sqft?: number;
  bedrooms?: number;
  radius?: number;
  texture?: number;
  likedMovie?: boolean;
  irisClass?: string;
  affordable?: boolean;
  benign?: boolean;
}

export interface Feature {
  name: string;
  key: keyof DataPoint;
  min: number;
  max: number;
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  data: DataPoint[];
  features: Feature[];
  classLabel: string;
  classValues: { true: string; false: string };
  colors: (value: boolean) => string;
}

// Movie Dataset
export const movieDataset: DataPoint[] = [
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

// Iris Dataset
export const irisDataset: DataPoint[] = [
  { sepalLength: 5.1, sepalWidth: 3.5, likedMovie: true },
  { sepalLength: 4.9, sepalWidth: 3.0, likedMovie: true },
  { sepalLength: 4.7, sepalWidth: 3.2, likedMovie: true },
  { sepalLength: 4.6, sepalWidth: 3.1, likedMovie: true },
  { sepalLength: 5.0, sepalWidth: 3.6, likedMovie: true },
  { sepalLength: 5.4, sepalWidth: 3.9, likedMovie: true },
  { sepalLength: 4.6, sepalWidth: 3.4, likedMovie: true },
  { sepalLength: 5.0, sepalWidth: 3.4, likedMovie: true },
  { sepalLength: 4.4, sepalWidth: 2.9, likedMovie: true },
  { sepalLength: 4.9, sepalWidth: 3.1, likedMovie: true },
  { sepalLength: 5.4, sepalWidth: 3.7, likedMovie: true },
  { sepalLength: 4.8, sepalWidth: 3.4, likedMovie: true },
  { sepalLength: 4.8, sepalWidth: 3.0, likedMovie: true },
  { sepalLength: 4.3, sepalWidth: 3.0, likedMovie: true },
  { sepalLength: 5.8, sepalWidth: 4.0, likedMovie: true },
  { sepalLength: 5.7, sepalWidth: 4.4, likedMovie: true },
  { sepalLength: 5.4, sepalWidth: 3.9, likedMovie: true },
  { sepalLength: 5.1, sepalWidth: 3.5, likedMovie: true },
  { sepalLength: 5.7, sepalWidth: 3.8, likedMovie: true },
  { sepalLength: 5.1, sepalWidth: 3.8, likedMovie: true },
  { sepalLength: 7.0, sepalWidth: 3.2, likedMovie: true },
  { sepalLength: 6.4, sepalWidth: 3.2, likedMovie: true },
  { sepalLength: 6.9, sepalWidth: 3.1, likedMovie: true },
  { sepalLength: 5.5, sepalWidth: 2.3, likedMovie: true },
  { sepalLength: 6.5, sepalWidth: 2.8, likedMovie: true },
  { sepalLength: 5.7, sepalWidth: 2.8, likedMovie: true },
  { sepalLength: 6.3, sepalWidth: 3.3, likedMovie: true },
  { sepalLength: 4.9, sepalWidth: 2.4, likedMovie: true },
  { sepalLength: 6.6, sepalWidth: 2.9, likedMovie: true },
  { sepalLength: 5.2, sepalWidth: 2.7, likedMovie: true },
  { sepalLength: 5.0, sepalWidth: 2.0, likedMovie: false },
  { sepalLength: 5.9, sepalWidth: 3.0, likedMovie: false },
  { sepalLength: 6.0, sepalWidth: 2.2, likedMovie: false },
  { sepalLength: 6.1, sepalWidth: 2.9, likedMovie: false },
  { sepalLength: 5.6, sepalWidth: 2.9, likedMovie: false },
  { sepalLength: 6.7, sepalWidth: 3.1, likedMovie: false },
  { sepalLength: 6.3, sepalWidth: 2.3, likedMovie: false },
  { sepalLength: 5.8, sepalWidth: 2.7, likedMovie: false },
  { sepalLength: 7.1, sepalWidth: 3.0, likedMovie: false },
  { sepalLength: 6.3, sepalWidth: 2.9, likedMovie: false },
  { sepalLength: 6.5, sepalWidth: 3.0, likedMovie: false },
  { sepalLength: 7.6, sepalWidth: 3.0, likedMovie: false },
  { sepalLength: 4.9, sepalWidth: 2.5, likedMovie: false },
  { sepalLength: 7.3, sepalWidth: 2.9, likedMovie: false },
  { sepalLength: 6.7, sepalWidth: 2.5, likedMovie: false },
  { sepalLength: 7.2, sepalWidth: 3.6, likedMovie: false },
  { sepalLength: 6.5, sepalWidth: 3.2, likedMovie: false },
  { sepalLength: 6.4, sepalWidth: 2.7, likedMovie: false },
  { sepalLength: 6.8, sepalWidth: 3.0, likedMovie: false },
];

// Housing Dataset
export const housingDataset: DataPoint[] = [
  { sqft: 800, bedrooms: 1, affordable: true, likedMovie: true },
  { sqft: 900, bedrooms: 1, affordable: true, likedMovie: true },
  { sqft: 1000, bedrooms: 2, affordable: true, likedMovie: true },
  { sqft: 1100, bedrooms: 2, affordable: true, likedMovie: true },
  { sqft: 1200, bedrooms: 2, affordable: true, likedMovie: true },
  { sqft: 1300, bedrooms: 2, affordable: true, likedMovie: true },
  { sqft: 1400, bedrooms: 3, affordable: true, likedMovie: true },
  { sqft: 1500, bedrooms: 3, affordable: true, likedMovie: true },
  { sqft: 1600, bedrooms: 3, affordable: true, likedMovie: true },
  { sqft: 1700, bedrooms: 3, affordable: true, likedMovie: true },
  { sqft: 1800, bedrooms: 3, affordable: false, likedMovie: false },
  { sqft: 1900, bedrooms: 4, affordable: false, likedMovie: false },
  { sqft: 2000, bedrooms: 4, affordable: false, likedMovie: false },
  { sqft: 2100, bedrooms: 4, affordable: false, likedMovie: false },
  { sqft: 2200, bedrooms: 4, affordable: false, likedMovie: false },
  { sqft: 2300, bedrooms: 4, affordable: false, likedMovie: false },
  { sqft: 2400, bedrooms: 5, affordable: false, likedMovie: false },
  { sqft: 2500, bedrooms: 5, affordable: false, likedMovie: false },
  { sqft: 2600, bedrooms: 5, affordable: false, likedMovie: false },
  { sqft: 2700, bedrooms: 5, affordable: false, likedMovie: false },
  { sqft: 850, bedrooms: 1, affordable: true, likedMovie: true },
  { sqft: 1050, bedrooms: 2, affordable: true, likedMovie: true },
  { sqft: 1250, bedrooms: 2, affordable: true, likedMovie: true },
  { sqft: 1450, bedrooms: 3, affordable: true, likedMovie: true },
  { sqft: 1650, bedrooms: 3, affordable: true, likedMovie: true },
  { sqft: 1850, bedrooms: 4, affordable: false, likedMovie: false },
  { sqft: 2050, bedrooms: 4, affordable: false, likedMovie: false },
  { sqft: 2250, bedrooms: 4, affordable: false, likedMovie: false },
  { sqft: 2450, bedrooms: 5, affordable: false, likedMovie: false },
  { sqft: 2650, bedrooms: 5, affordable: false, likedMovie: false },
];

// Breast Cancer Dataset
export const breastCancerDataset: DataPoint[] = [
  { radius: 17.99, texture: 10.38, benign: false, likedMovie: true },
  { radius: 20.57, texture: 17.77, benign: false, likedMovie: true },
  { radius: 19.69, texture: 21.25, benign: false, likedMovie: true },
  { radius: 11.42, texture: 20.38, benign: false, likedMovie: true },
  { radius: 20.29, texture: 14.34, benign: false, likedMovie: true },
  { radius: 12.45, texture: 15.7, benign: true, likedMovie: false },
  { radius: 18.25, texture: 19.98, benign: false, likedMovie: true },
  { radius: 13.71, texture: 20.83, benign: false, likedMovie: true },
  { radius: 13.0, texture: 21.82, benign: false, likedMovie: true },
  { radius: 12.46, texture: 24.04, benign: false, likedMovie: true },
  { radius: 16.02, texture: 23.24, benign: false, likedMovie: true },
  { radius: 15.78, texture: 17.89, benign: false, likedMovie: true },
  { radius: 19.17, texture: 24.8, benign: false, likedMovie: true },
  { radius: 15.85, texture: 23.95, benign: false, likedMovie: true },
  { radius: 13.72, texture: 22.98, benign: false, likedMovie: true },
  { radius: 11.06, texture: 14.46, benign: true, likedMovie: false },
  { radius: 12.88, texture: 21.94, benign: true, likedMovie: false },
  { radius: 10.38, texture: 18.53, benign: true, likedMovie: false },
  { radius: 11.76, texture: 24.92, benign: true, likedMovie: false },
  { radius: 10.26, texture: 16.67, benign: true, likedMovie: false },
  { radius: 9.71, texture: 13.8, benign: true, likedMovie: false },
  { radius: 12.68, texture: 30.0, benign: true, likedMovie: false },
  { radius: 7.76, texture: 24.58, benign: true, likedMovie: false },
  { radius: 10.03, texture: 12.41, benign: true, likedMovie: false },
  { radius: 12.16, texture: 27.25, benign: true, likedMovie: false },
  { radius: 11.6, texture: 20.68, benign: true, likedMovie: false },
  { radius: 20.27, texture: 14.68, benign: false, likedMovie: true },
  { radius: 11.04, texture: 12.37, benign: true, likedMovie: false },
  { radius: 13.39, texture: 18.46, benign: true, likedMovie: false },
  { radius: 12.45, texture: 13.67, benign: true, likedMovie: false },
];

const movieColors = (liked: boolean) => liked ? '#4CAF50' : '#F44336';
const irisColors = (liked: boolean) => liked ? '#2196F3' : '#FF9800';
const housingColors = (affordable: boolean) => affordable ? '#8BC34A' : '#E91E63';
const cancerColors = (benign: boolean) => benign ? '#4CAF50' : '#F44336';

export const DATASETS: Record<string, Dataset> = {
  movie: {
    id: 'movie',
    name: 'Movie Dataset',
    description: 'Movie preference prediction based on age and streaming hours',
    data: movieDataset,
    features: [
      { name: 'Age', key: 'age', min: 12, max: 59 },
      { name: 'Hours/Week', key: 'hoursStreamed', min: 1, max: 20 },
    ],
    classLabel: 'Movie Preference',
    classValues: { true: 'Liked Movie', false: 'Disliked Movie' },
    colors: movieColors,
  },
  iris: {
    id: 'iris',
    name: 'Iris Dataset',
    description: 'Iris flower classification based on sepal dimensions',
    data: irisDataset,
    features: [
      { name: 'Sepal Length', key: 'sepalLength', min: 4.3, max: 7.6 },
      { name: 'Sepal Width', key: 'sepalWidth', min: 2.0, max: 4.4 },
    ],
    classLabel: 'Iris Class',
    classValues: { true: 'Setosa/Versicolor', false: 'Virginica' },
    colors: irisColors,
  },
  // housing: {
  //   id: 'housing',
  //   name: 'Housing Dataset',
  //   description: 'House price classification based on size and bedrooms',
  //   data: housingDataset,
  //   features: [
  //     { name: 'Square Feet', key: 'sqft', min: 800, max: 2700 },
  //     { name: 'Bedrooms', key: 'bedrooms', min: 1, max: 5 },
  //   ],
  //   classLabel: 'Price Range',
  //   classValues: { true: 'Affordable', false: 'Expensive' },
  //   colors: housingColors,
  // },
  cancer: {
    id: 'cancer',
    name: 'Breast Cancer Dataset',
    description: 'Cancer diagnosis based on tumor measurements',
    data: breastCancerDataset,
    features: [
      { name: 'Radius', key: 'radius', min: 7.76, max: 20.57 },
      { name: 'Texture', key: 'texture', min: 10.38, max: 30.0 },
    ],
    classLabel: 'Diagnosis',
    classValues: { true: 'Benign', false: 'Malignant' },
    colors: cancerColors,
  },
};

export const DEFAULT_DATASET = DATASETS.movie;
