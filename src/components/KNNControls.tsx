import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { UserDataPoint } from '@/utils/knn';

interface KNNControlsProps {
  userPoint: UserDataPoint | null;
  onUserPointChange: (point: UserDataPoint | null) => void;
  k: number;
  onKChange: (k: number) => void;
}

const KNNControls: React.FC<KNNControlsProps> = ({
  userPoint,
  onUserPointChange,
  k,
  onKChange,
}) => {
  const handleInputChange = (field: keyof UserDataPoint, value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    const newPoint = userPoint ? { ...userPoint } : {
      sepalLength: 5.0,
      sepalWidth: 3.0,
      petalLength: 1.5,
      petalWidth: 0.2,
    };
    
    newPoint[field] = numValue;
    onUserPointChange(newPoint);
  };

  const handleClear = () => {
    onUserPointChange(null);
  };

  const handleRandomPoint = () => {
    const randomPoint: UserDataPoint = {
      sepalLength: Math.random() * 3 + 4.5, // 4.5 - 7.5
      sepalWidth: Math.random() * 2 + 2.0,  // 2.0 - 4.0
      petalLength: Math.random() * 5 + 1.0, // 1.0 - 6.0
      petalWidth: Math.random() * 2.5 + 0.1, // 0.1 - 2.6
    };
    onUserPointChange(randomPoint);
  };

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Input New Data Point</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sepalLength">Sepal Length (cm)</Label>
            <Input
              id="sepalLength"
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={userPoint?.sepalLength || ''}
              onChange={(e) => handleInputChange('sepalLength', e.target.value)}
              placeholder="e.g., 5.1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sepalWidth">Sepal Width (cm)</Label>
            <Input
              id="sepalWidth"
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={userPoint?.sepalWidth || ''}
              onChange={(e) => handleInputChange('sepalWidth', e.target.value)}
              placeholder="e.g., 3.5"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="petalLength">Petal Length (cm)</Label>
            <Input
              id="petalLength"
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={userPoint?.petalLength || ''}
              onChange={(e) => handleInputChange('petalLength', e.target.value)}
              placeholder="e.g., 1.4"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="petalWidth">Petal Width (cm)</Label>
            <Input
              id="petalWidth"
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={userPoint?.petalWidth || ''}
              onChange={(e) => handleInputChange('petalWidth', e.target.value)}
              placeholder="e.g., 0.2"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button onClick={handleRandomPoint} variant="outline">
            Generate Random Point
          </Button>
          <Button onClick={handleClear} variant="outline">
            Clear
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="k-slider">K Value: {k}</Label>
          <Slider
            id="k-slider"
            min={1}
            max={15}
            step={1}
            value={[k]}
            onValueChange={(value) => onKChange(value[0])}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1</span>
            <span>15</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          K determines how many nearest neighbors to consider for classification.
        </p>
      </div>
    </Card>
  );
};

export default KNNControls;