import { useState, useEffect } from 'react'

function Explorer() {
  const [skills, setSkills] = useState([])

  useEffect(() => {
    // Données depuis ton seeder
    setSkills([
      { name: 'Laravel', categorie: 'Backend' },
      { name: 'React.js', categorie: 'Frontend' },
      { name: 'Node.js', categorie: 'Backend' },
      { name: 'Flutter', categorie: 'Mobile' },
      { name: 'Python', categorie: 'Backend' },
      { name: 'Django', categorie: 'Backend' },
      { name: 'JavaScript', categorie: 'Frontend' },
      { name: 'TypeScript', categorie: 'Frontend' },
      { name: 'DevOps', categorie: 'DevOps' },
      { name: 'Docker', categorie: 'DevOps' },
      { name: 'Kubernetes', categorie: 'DevOps' },
      { name: 'SQL', categorie: 'Base de données' },
      { name: 'MongoDB', categorie: 'Base de données' },
      { name: 'Next.js', categorie: 'Frontend' },
      { name: 'Vue.js', categorie: 'Frontend' },
      { name: 'Java', categorie: 'Backend' },
      { name: 'Spring Boot', categorie: 'Backend' },
      { name: 'Machine Learning', categorie: 'Data/IA' },
      { name: 'Cybersécurité', categorie: 'Sécurité' },
      { name: 'Cloud Computing', categorie: 'Cloud' },
    ])
  }, [])

  // Grouper par catégorie
  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.categorie]) acc[skill.categorie] = []
    acc[skill.categorie].push(skill)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">
          Ce que vous pouvez apprendre ou partager
        </h1>

        <div className="space-y-6">
          {Object.entries(grouped).map(([categorie, items]) => (
            <div key={categorie} className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-white font-medium mb-3">{categorie}</h2>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-md"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Explorer