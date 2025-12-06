export default function ExamDayStrategy() {
  return (
    <div className="space-y-6 mb-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Java Exam Day (Dec 11)</h2>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">07:00–08:00 Pre-Exam Mini-Routine</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
            <li>Review Java "Don't forget" list:
              <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                <li>Local variables have no default values</li>
                <li>Default constructor only if no constructors defined</li>
                <li>++x vs x++ semantics</li>
                <li>Static methods cannot access instance fields directly</li>
                <li>Arrays passed by reference</li>
              </ul>
            </li>
            <li>Do 3 quick problems: 1 inheritance trace, 1 2D array, 1 access-modifier check</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Exam Pacing</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
            <li>MC section: 60 min max (~2 min per question)</li>
            <li>Code tracing: 60 min (10 min each)</li>
            <li>Code writing: 60 min (20 min each)</li>
            <li>Keep 20 min buffer for review</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-green-800">Linear Algebra Exam Day (Dec 12)</h2>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">07:00–08:00 Pre-Exam Mini-Routine</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
            <li>Review formula sheet</li>
            <li>Do 3 speed problems: 1 eigenvalue (2×2), 1 row reduction → basis, 1 3×3 determinant</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Exam Pacing</h3>
          <p className="text-gray-700">Choose a consistent pacing scheme - allocate time per problem type based on difficulty</p>
        </div>
      </div>
    </div>
  );
}

