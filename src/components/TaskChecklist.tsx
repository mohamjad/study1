import type { Task } from '../types';

interface TaskChecklistProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
}

export default function TaskChecklist({ tasks, onToggleTask }: TaskChecklistProps) {
  return (
    <div className="space-y-2">
      {tasks.map(task => (
        <div 
          key={task.id} 
          className={`flex items-start p-3 rounded-lg border ${
            task.completed 
              ? 'bg-green-50 border-green-200' 
              : 'bg-white border-gray-200'
          }`}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleTask(task.id)}
            className="mt-1 mr-3 w-5 h-5 cursor-pointer"
          />
          <div className="flex-1">
            <div className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.description}
            </div>
            {task.subInfo && (
              <div className="text-sm text-gray-600 mt-1 ml-8">
                {task.subInfo}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

