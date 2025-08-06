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
      age: 30,
      hoursStreamed: 5,
    };
    
    newPoint[field] = numValue;
    onUserPointChange(newPoint);
  };

  const handleClear = () => {
    onUserPointChange(null);
  };

  const handleRandomPoint = () => {
    const randomPoint: UserDataPoint = {
      age: Math.floor(Math.random() * 40 + 20), // 20 - 60 years
      hoursStreamed: Math.floor(Math.random() * 19 + 1), // 1 - 20 hours
    };
    onUserPointChange(randomPoint);
  };

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Input User Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age (years)</Label>
            <Input
              id="age"
              type="number"
              step="1"
              min="0"
              max="100"
              value={userPoint?.age || ''}
              onChange={(e) => handleInputChange('age', e.target.value)}
              placeholder="e.g., 30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hoursStreamed">Hours Streamed per Week</Label>
            <Input
              id="hoursStreamed"
              type="number"
              step="1"
              min="0"
              max="168"
              value={userPoint?.hoursStreamed || ''}
              onChange={(e) => handleInputChange('hoursStreamed', e.target.value)}
              placeholder="e.g., 10"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button onClick={handleRandomPoint} variant="outline">
            Generate Random User
          </Button>
          <Button onClick={handleClear} variant="outline">
            Clear
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="k-slider">Number of Neighbors (K): {k}</Label>
          <Slider
            id="k-slider"
            min={1}
            max={15}
            step={2}
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
          K determines how many similar users to consider when predicting if you'll like the movie.
        </p>
      </div>
    </Card>
  );
};

export default KNNControls;