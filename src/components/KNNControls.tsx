import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserDataPoint, DistanceMetricType } from '@/utils/knn';
import { DATASETS, Dataset } from '@/data/datasets';

interface KNNControlsProps {
  userPoint: UserDataPoint | null;
  onUserPointChange: (point: UserDataPoint | null) => void;
  k: number;
  onKChange: (k: number) => void;
  selectedDataset: Dataset;
  onDatasetChange: (dataset: Dataset) => void;
  distanceMetric: DistanceMetricType;
  onMetricChange: (metric: DistanceMetricType) => void;
}

const DISTANCE_METRICS = [
  { value: 'euclidean' as DistanceMetricType, label: 'Euclidean', description: 'Straight-line distance' },
  { value: 'manhattan' as DistanceMetricType, label: 'Manhattan', description: 'Grid-based distance' },
  { value: 'minkowski' as DistanceMetricType, label: 'Minkowski (p=3)', description: 'Generalized distance' },
];

const KNNControls: React.FC<KNNControlsProps> = ({
  userPoint,
  onUserPointChange,
  k,
  onKChange,
  selectedDataset,
  onDatasetChange,
  distanceMetric,
  onMetricChange,
}) => {
  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    const newPoint = userPoint ? { ...userPoint } : {};
    newPoint[field] = numValue;
    onUserPointChange(newPoint);
  };

  const handleClear = () => {
    onUserPointChange(null);
  };

  const handleRandomPoint = () => {
    const randomPoint: UserDataPoint = {};
    selectedDataset.features.forEach(feature => {
      const min = feature.min;
      const max = feature.max;
      randomPoint[feature.key.toString()] = Math.random() * (max - min) + min;
    });
    onUserPointChange(randomPoint);
  };

  return (
    <Card className="p-6 space-y-6">
      {/* Dataset Selector */}
      <div className="space-y-2">
        <Label htmlFor="dataset-select">Dataset</Label>
        <Select value={selectedDataset.id} onValueChange={(value) => {
          onDatasetChange(DATASETS[value]);
          onUserPointChange(null);
        }}>
          <SelectTrigger id="dataset-select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.values(DATASETS).map(dataset => (
              <SelectItem key={dataset.id} value={dataset.id}>
                {dataset.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">{selectedDataset.description}</p>
      </div>

      {/* Distance Metric Selector */}
      <div className="space-y-2">
        <Label htmlFor="metric-select">Distance Metric</Label>
        <Select value={distanceMetric} onValueChange={(value) => onMetricChange(value as DistanceMetricType)}>
          <SelectTrigger id="metric-select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DISTANCE_METRICS.map(metric => (
              <SelectItem key={metric.value} value={metric.value}>
                {metric.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Input User Data */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Input {selectedDataset.classLabel}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedDataset.features.map(feature => (
            <div key={feature.key} className="space-y-2">
              <Label htmlFor={feature.key}>
                {feature.name} ({feature.min.toFixed(1)} - {feature.max.toFixed(1)})
              </Label>
              <Input
                id={feature.key}
                type="number"
                step="0.1"
                min={feature.min}
                max={feature.max}
                value={userPoint?.[feature.key.toString()] !== undefined ? userPoint[feature.key.toString()] : ''}
                onChange={(e) => handleInputChange(feature.key.toString(), e.target.value)}
                placeholder={`e.g., ${(feature.min + feature.max) / 2}`}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <Button onClick={handleRandomPoint} variant="outline">
            Generate Random
          </Button>
          <Button onClick={handleClear} variant="outline">
            Clear
          </Button>
        </div>
      </div>

      {/* K Slider */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="k-slider">Number of Neighbors (K): {k}</Label>
          <Slider
            id="k-slider"
            min={1}
            max={Math.min(15, selectedDataset.data.length)}
            step={2}
            value={[k]}
            onValueChange={(value) => onKChange(value[0])}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1</span>
            <span>{Math.min(15, selectedDataset.data.length)}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          K determines how many similar data points to consider when making a prediction.
        </p>
      </div>
    </Card>
  );
};

export default KNNControls;