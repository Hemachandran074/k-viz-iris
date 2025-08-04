import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { KNNResult } from '@/utils/knn';
import { getSpeciesColor } from '@/data/irisData';

interface ClassificationResultsProps {
  result: KNNResult | null;
  k: number;
}

const ClassificationResults: React.FC<ClassificationResultsProps> = ({ result, k }) => {
  if (!result) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Classification Results</h3>
        <p className="text-muted-foreground">
          Enter data point values to see classification results.
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
            <h4 className="font-medium mb-2">Predicted Species</h4>
            <Badge 
              variant="secondary"
              className="text-lg px-4 py-2"
              style={{ backgroundColor: getSpeciesColor(prediction), color: 'white' }}
            >
              {prediction.charAt(0).toUpperCase() + prediction.slice(1)}
            </Badge>
          </div>

          <div>
            <h4 className="font-medium mb-2">Confidence Scores</h4>
            <div className="space-y-2">
              {Object.entries(confidence)
                .sort(([,a], [,b]) => b - a)
                .map(([species, score]) => (
                <div key={species} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getSpeciesColor(species) }}
                    />
                    <span className="capitalize">{species}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-300"
                        style={{ 
                          width: `${score}%`,
                          backgroundColor: getSpeciesColor(species)
                        }}
                      />
                    </div>
                    <span className="text-sm font-mono w-12 text-right">
                      {score.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
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
                      style={{ backgroundColor: getSpeciesColor(neighbor.point.species) }}
                    />
                    <span className="capitalize">{neighbor.point.species}</span>
                  </div>
                  <div className="flex items-center gap-4 font-mono text-xs">
                    <span>SL: {neighbor.point.sepalLength}</span>
                    <span>SW: {neighbor.point.sepalWidth}</span>
                    <span>PL: {neighbor.point.petalLength}</span>
                    <span>PW: {neighbor.point.petalWidth}</span>
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