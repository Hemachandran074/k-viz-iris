import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { KNNResult, DistanceMetricType } from '@/utils/knn';
import { Dataset } from '@/data/datasets';

interface ClassificationResultsProps {
  result: KNNResult | null;
  k: number;
  dataset: Dataset;
  distanceMetric: DistanceMetricType;
}

const ClassificationResults: React.FC<ClassificationResultsProps> = ({
  result,
  k,
  dataset,
  distanceMetric
}) => {
  const metricLabel = {
    euclidean: 'Euclidean Distance',
    manhattan: 'Manhattan Distance',
    minkowski: 'Minkowski Distance (p=3)'
  };

  if (!result) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Classification Results</h3>
        <p className="text-muted-foreground">
          Enter data to see the prediction results.
        </p>
      </Card>
    );
  }

  const { prediction, neighbors, confidence } = result;

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Classification Results</h3>

        <div className="space-y-4">
          <div>
            <div className="text-xs text-muted-foreground mb-2">
              Using: <span className="font-semibold">{metricLabel[distanceMetric]}</span>
            </div>
            <h4 className="font-medium mb-2">Prediction</h4>
            <Badge
              variant="secondary"
              className="text-lg px-4 py-2"
              style={{ backgroundColor: dataset.colors(prediction), color: 'white' }}
            >
              {prediction ? dataset.classValues.true : dataset.classValues.false}
            </Badge>
          </div>

          <div>
            <h4 className="font-medium mb-2">Confidence Score</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Prediction Confidence</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${confidence * 100}%`,
                        backgroundColor: dataset.colors(prediction)
                      }}
                    />
                  </div>
                  <span className="text-sm font-mono w-12 text-right">
                    {(confidence * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Nearest Neighbors (K={k})</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {neighbors.map((neighbor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: dataset.colors(neighbor.point.likedMovie || false) }}
                    />
                    <span>{neighbor.point.likedMovie ? dataset.classValues.true : dataset.classValues.false}</span>
                  </div>
                  <div className="flex items-center gap-4 font-mono text-xs">
                    {dataset.features.map(feature => (
                      <span key={feature.key}>
                        {feature.name}: {(neighbor.point[feature.key] as number)?.toFixed(2) || 'N/A'}
                      </span>
                    ))}
                    <span className="font-semibold">
                      d: {neighbor.distance.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ClassificationResults;