import type { Resource } from '../types';

interface ResourcesProps {
  resources: Resource[];
}

export default function Resources({ resources }: ResourcesProps) {
  const javaResources = resources.filter(r => r.subject === 'Java');
  const linAlgResources = resources.filter(r => r.subject === 'Linear Algebra');

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Resources</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-blue-800 mb-3">Java</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {javaResources.map(resource => (
              <div key={resource.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-800 mb-2">{resource.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{resource.purpose}</p>
                <a 
                  href={resource.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  {resource.link === '#' ? 'Link placeholder' : 'Open Resource →'}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-green-800 mb-3">Linear Algebra</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {linAlgResources.map(resource => (
              <div key={resource.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-800 mb-2">{resource.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{resource.purpose}</p>
                <a 
                  href={resource.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  {resource.link === '#' ? 'Link placeholder' : 'Open Resource →'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

