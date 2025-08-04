import React, { useRef, useEffect, useState } from 'react';
import { irisDataset, getSpeciesColor } from '@/data/irisData';
import { UserDataPoint, classifyWithKNN, KNNResult } from '@/utils/knn';

interface KNNVisualizationProps {
  userPoint: UserDataPoint | null;
  k: number;
  onClassificationUpdate: (result: KNNResult | null) => void;
}

const KNNVisualization: React.FC<KNNVisualizationProps> = ({ 
  userPoint, 
  k, 
  onClassificationUpdate 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [animationProgress, setAnimationProgress] = useState(0);
  const animationRef = useRef<number>();

  // Update canvas size
  useEffect(() => {
    const updateSize = () => {
      const container = canvasRef.current?.parentElement;
      if (container) {
        const rect = container.getBoundingClientRect();
        setDimensions({
          width: Math.min(800, rect.width - 32),
          height: 600
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Animation effect for lines
  useEffect(() => {
    if (userPoint) {
      setAnimationProgress(0);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      const startTime = Date.now();
      const duration = 1000; // 1 second animation
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        setAnimationProgress(progress);
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };
      
      animate();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [userPoint, k]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // Set up coordinate system (using petal length vs petal width for 2D visualization)
    const margin = 60;
    const plotWidth = dimensions.width - 2 * margin;
    const plotHeight = dimensions.height - 2 * margin;

    // Data bounds
    const minPetalLength = Math.min(...irisDataset.map(d => d.petalLength));
    const maxPetalLength = Math.max(...irisDataset.map(d => d.petalLength));
    const minPetalWidth = Math.min(...irisDataset.map(d => d.petalWidth));
    const maxPetalWidth = Math.max(...irisDataset.map(d => d.petalWidth));

    // Scale functions
    const scaleX = (value: number) => 
      margin + ((value - minPetalLength) / (maxPetalLength - minPetalLength)) * plotWidth;
    const scaleY = (value: number) => 
      dimensions.height - margin - ((value - minPetalWidth) / (maxPetalWidth - minPetalWidth)) * plotHeight;

    // Draw grid
    ctx.strokeStyle = 'hsl(var(--grid-line))';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = margin + (i / 10) * plotWidth;
      ctx.beginPath();
      ctx.moveTo(x, margin);
      ctx.lineTo(x, dimensions.height - margin);
      ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let i = 0; i <= 10; i++) {
      const y = margin + (i / 10) * plotHeight;
      ctx.beginPath();
      ctx.moveTo(margin, y);
      ctx.lineTo(dimensions.width - margin, y);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = 'hsl(var(--foreground))';
    ctx.lineWidth = 2;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(margin, dimensions.height - margin);
    ctx.lineTo(dimensions.width - margin, dimensions.height - margin);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin, dimensions.height - margin);
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = 'hsl(var(--foreground))';
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Petal Length', dimensions.width / 2, dimensions.height - 10);
    
    ctx.save();
    ctx.translate(15, dimensions.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Petal Width', 0, 0);
    ctx.restore();

    // Draw dataset points
    irisDataset.forEach((point, index) => {
      const x = scaleX(point.petalLength);
      const y = scaleY(point.petalWidth);
      
      ctx.fillStyle = getSpeciesColor(point.species);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
      
      // Add slight border
      ctx.strokeStyle = 'hsl(var(--background))';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Classify and draw user point if it exists
    let classificationResult: KNNResult | null = null;
    if (userPoint) {
      classificationResult = classifyWithKNN(userPoint, irisDataset, k);
      
      const userX = scaleX(userPoint.petalLength);
      const userY = scaleY(userPoint.petalWidth);

      // Draw lines to k nearest neighbors with animation
      ctx.strokeStyle = 'hsl(var(--neighbor-line))';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      
      classificationResult.neighbors.forEach((neighbor, index) => {
        const neighborX = scaleX(neighbor.point.petalLength);
        const neighborY = scaleY(neighbor.point.petalWidth);
        
        // Calculate line progress for this specific line
        const lineDelay = index * 0.1; // Stagger each line by 100ms
        const lineProgress = Math.max(0, Math.min(1, (animationProgress - lineDelay) / 0.8));
        
        if (lineProgress > 0) {
          const endX = userX + (neighborX - userX) * lineProgress;
          const endY = userY + (neighborY - userY) * lineProgress;
          
          ctx.beginPath();
          ctx.moveTo(userX, userY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
        }
      });
      
      ctx.setLineDash([]);

      // Highlight k nearest neighbors
      classificationResult.neighbors.forEach((neighbor) => {
        const neighborX = scaleX(neighbor.point.petalLength);
        const neighborY = scaleY(neighbor.point.petalWidth);
        
        ctx.strokeStyle = 'hsl(var(--user-point))';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(neighborX, neighborY, 6, 0, 2 * Math.PI);
        ctx.stroke();
      });

      // Draw user point
      ctx.fillStyle = 'hsl(var(--user-point))';
      ctx.strokeStyle = 'hsl(var(--background))';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(userX, userY, 8, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }

    // Update classification result
    onClassificationUpdate(classificationResult);

  }, [userPoint, k, dimensions, onClassificationUpdate, animationProgress]);

  return (
    <div className="w-full bg-card rounded-lg border p-4">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="max-w-full border border-border rounded"
      />
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-iris-setosa"></div>
          <span>Setosa</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-iris-versicolor"></div>
          <span>Versicolor</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-iris-virginica"></div>
          <span>Virginica</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-ml-userPoint"></div>
          <span>Your Input</span>
        </div>
      </div>
    </div>
  );
};

export default KNNVisualization;