import React, { useRef, useEffect, useState } from 'react';
import { UserDataPoint, classifyWithKNN, KNNResult, DistanceMetricType } from '@/utils/knn';
import { Dataset } from '@/data/datasets';

interface KNNVisualizationProps {
  userPoint: UserDataPoint | null;
  k: number;
  onClassificationUpdate: (result: KNNResult | null) => void;
  dataset: Dataset;
  distanceMetric: DistanceMetricType;
}

const KNNVisualization: React.FC<KNNVisualizationProps> = ({
  userPoint,
  k,
  onClassificationUpdate,
  dataset,
  distanceMetric,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [animationProgress, setAnimationProgress] = useState(0);
  const animationRef = useRef<number>();

  // Get the two features to visualize
  const feature1 = dataset.features[0];
  const feature2 = dataset.features[1];

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
      const duration = 1500; // 1.5 second animation

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

    // Set up coordinate system
    const margin = 60;
    const plotWidth = dimensions.width - 2 * margin;
    const plotHeight = dimensions.height - 2 * margin;

    // Data bounds from features
    const minX = feature1.min;
    const maxX = feature1.max;
    const minY = feature2.min;
    const maxY = feature2.max;

    // Scale functions
    const scaleX = (value: number) =>
      margin + ((value - minX) / (maxX - minX)) * plotWidth;
    const scaleY = (value: number) =>
      dimensions.height - margin - ((value - minY) / (maxY - minY)) * plotHeight;

    // Draw grid
    ctx.strokeStyle = 'hsl(var(--grid-line))';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 10; i++) {
      const x = margin + (i / 10) * plotWidth;
      ctx.beginPath();
      ctx.moveTo(x, margin);
      ctx.lineTo(x, dimensions.height - margin);
      ctx.stroke();
    }

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

    ctx.beginPath();
    ctx.moveTo(margin, dimensions.height - margin);
    ctx.lineTo(dimensions.width - margin, dimensions.height - margin);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin, dimensions.height - margin);
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = 'hsl(var(--foreground))';
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(feature1.name, dimensions.width / 2, dimensions.height - 10);

    ctx.save();
    ctx.translate(15, dimensions.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(feature2.name, 0, 0);
    ctx.restore();

    // Draw dataset points
    dataset.data.forEach((point) => {
      const x = scaleX(point[feature1.key] as number);
      const y = scaleY(point[feature2.key] as number);

      ctx.fillStyle = dataset.colors(point.likedMovie || false);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();

      ctx.strokeStyle = 'hsl(var(--background))';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Classify and draw user point if it exists
    let classificationResult: KNNResult | null = null;
    if (userPoint) {
      classificationResult = classifyWithKNN(userPoint, dataset, k, distanceMetric);

      const userX = scaleX(userPoint[feature1.key.toString()] as number);
      const userY = scaleY(userPoint[feature2.key.toString()] as number);

      // Draw lines to k nearest neighbors with animation
      ctx.strokeStyle = 'hsl(var(--neighbor-line))';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);

      classificationResult.neighbors.forEach((neighbor, index) => {
        const neighborX = scaleX(neighbor.point[feature1.key] as number);
        const neighborY = scaleY(neighbor.point[feature2.key] as number);

        // Calculate line progress
        const lineDelay = (index / k) * 0.3;
        const lineProgress = Math.max(0, Math.min(1, (animationProgress - lineDelay) / 0.7));

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
        const neighborX = scaleX(neighbor.point[feature1.key] as number);
        const neighborY = scaleY(neighbor.point[feature2.key] as number);

        ctx.strokeStyle = 'hsl(var(--user-point))';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(neighborX, neighborY, 6, 0, 2 * Math.PI);
        ctx.stroke();
      });

      // Draw golden particles flowing to neighbors
      classificationResult.neighbors.forEach((neighbor, index) => {
        const neighborX = scaleX(neighbor.point[feature1.key] as number);
        const neighborY = scaleY(neighbor.point[feature2.key] as number);

        const particleDelay = (index / k) * 0.2;
        const pProgress = Math.max(0, Math.min(1, (animationProgress - particleDelay) / 0.8));

        if (pProgress > 0 && pProgress < 1) {
          const particleX = userX + (neighborX - userX) * pProgress;
          const particleY = userY + (neighborY - userY) * pProgress;
          const pOpacity = Math.max(0, 1 - pProgress * 1.5);

          ctx.fillStyle = `rgba(255, 200, 0, ${pOpacity * 0.7})`;
          ctx.beginPath();
          ctx.arc(particleX, particleY, 3 + pProgress * 2, 0, 2 * Math.PI);
          ctx.fill();
        }
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

  }, [userPoint, k, dimensions, onClassificationUpdate, animationProgress, dataset, distanceMetric, feature1, feature2]);

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
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dataset.colors(true) }}></div>
          <span>{dataset.classValues.true}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dataset.colors(false) }}></div>
          <span>{dataset.classValues.false}</span>
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