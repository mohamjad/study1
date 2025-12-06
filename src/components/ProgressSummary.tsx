import type { Progress } from '../types';

interface ProgressSummaryProps {
  progress: Progress;
}

export default function ProgressSummary({ progress }: ProgressSummaryProps) {
  const javaPercent = progress.javaTasksTotal > 0 
    ? Math.round((progress.javaTasksDone / progress.javaTasksTotal) * 100) 
    : 0;
  const linAlgPercent = progress.linAlgTasksTotal > 0 
    ? Math.round((progress.linAlgTasksDone / progress.linAlgTasksTotal) * 100) 
    : 0;
  const totalTasksDone = progress.javaTasksDone + progress.linAlgTasksDone;
  const totalTasks = progress.javaTasksTotal + progress.linAlgTasksTotal;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Progress Summary</h2>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Java Progress</span>
            <span className="text-sm text-gray-600">{javaPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${javaPercent}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Linear Algebra Progress</span>
            <span className="text-sm text-gray-600">{linAlgPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${linAlgPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
          <div>
            <div className="text-sm text-gray-600">Total Tasks</div>
            <div className="text-xl font-bold">{totalTasksDone} / {totalTasks}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Java Flashcards Known</div>
            <div className="text-xl font-bold">{progress.javaFlashcardsKnown}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Lin Alg Flashcards Known</div>
            <div className="text-xl font-bold">{progress.linAlgFlashcardsKnown}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

