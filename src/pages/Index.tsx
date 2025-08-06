import React, { useState, useCallback } from 'react';
import KNNVisualization from '@/components/KNNVisualization';
import KNNControls from '@/components/KNNControls';
import ClassificationResults from '@/components/ClassificationResults';
import { UserDataPoint, KNNResult } from '@/utils/knn';

const Index = () => {
  const [userPoint, setUserPoint] = useState<UserDataPoint | null>(null);
  const [k, setK] = useState<number>(3);
  const [classificationResult, setClassificationResult] = useState<KNNResult | null>(null);

  const handleClassificationUpdate = useCallback((result: KNNResult | null) => {
    setClassificationResult(result);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              K-Nearest Neighbors Classifier
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Controls */}
          <div className="lg:col-span-1 space-y-6">
            <KNNControls
              userPoint={userPoint}
              onUserPointChange={setUserPoint}
              k={k}
              onKChange={setK}
            />
            
            <ClassificationResults
              result={classificationResult}
              k={k}
            />
          </div>

          {/* Right Column - Visualization */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2">
                  Movie Dataset Visualization
                </h2>
              </div>
              
              <KNNVisualization
                userPoint={userPoint}
                k={k}
                onClassificationUpdate={handleClassificationUpdate}
              />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">How K-Nearest Neighbors Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="space-y-2">
              <div className="font-medium text-primary">1. Distance Calculation</div>
              <p className="text-muted-foreground">
                Calculate the Euclidean distance from your input point to every point in the training dataset.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-primary">2. Find K Neighbors</div>
              <p className="text-muted-foreground">
                Select the K points with the smallest distances to your input point.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-primary">3. Majority Vote</div>
              <p className="text-muted-foreground">
                The predicted class is the most common class among the K nearest neighbors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;