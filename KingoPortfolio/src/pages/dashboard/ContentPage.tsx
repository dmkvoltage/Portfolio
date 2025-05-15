import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Project, Profile } from '../../types/content';
import Card, { CardBody, CardHeader } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { Plus, Save, Trash2, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const ContentPage: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    title: '',
    bio: '',
    email: '',
    location: '',
    education: '',
    imageUrl: '',
    stats: {
      projects: 0,
      clients: 0,
      coffee: 0,
      awards: 0
    },
    skills: [],
    experience: [],
    education_history: []
  });
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const profileDoc = await getDocs(collection(db, 'profile'));
      if (!profileDoc.empty) {
        setProfile(profileDoc.docs[0].data() as Profile);
      }

      const projectsSnapshot = await getDocs(collection(db, 'projects'));
      const projectsData = projectsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(projectsData);
    } catch (error) {
      toast.error('Error fetching content');
    }
  };

  const saveProfile = async () => {
    setLoading(true);
    try {
      const profileRef = collection(db, 'profile');
      const snapshot = await getDocs(profileRef);
      
      if (!snapshot.empty) {
        await updateDoc(doc(db, 'profile', snapshot.docs[0].id), profile);
      } else {
        await addDoc(profileRef, profile);
      }
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
    }
    setLoading(false);
  };

  const addProject = async () => {
    const newProject: Omit<Project, 'id'> = {
      title: 'New Project',
      description: '',
      fullDescription: '',
      image: '',
      screenshots: [],
      technologies: [],
      category: '',
      githubUrl: '',
      liveUrl: '',
      featured: false,
      order: projects.length,
      challenges: '',
      learning: '',
      createdAt: new Date().toISOString()
    };

    try {
      const docRef = await addDoc(collection(db, 'projects'), newProject);
      setProjects([...projects, { ...newProject, id: docRef.id }]);
      toast.success('Project added successfully');
    } catch (error) {
      toast.error('Error adding project');
    }
  };

  const updateProject = async (project: Project) => {
    try {
      await updateDoc(doc(db, 'projects', project.id), project);
      setProjects(projects.map(p => p.id === project.id ? project : p));
      toast.success('Project updated successfully');
    } catch (error) {
      toast.error('Error updating project');
    }
  };

  const deleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await deleteDoc(doc(db, 'projects', id));
      setProjects(projects.filter(p => p.id !== id));
      toast.success('Project deleted successfully');
    } catch (error) {
      toast.error('Error deleting project');
    }
  };

  const addSkill = () => {
    setProfile({
      ...profile,
      skills: [...profile.skills, { name: '', percentage: 0 }]
    });
  };

  const updateSkill = (index: number, field: keyof typeof profile.skills[0], value: string | number) => {
    const newSkills = [...profile.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setProfile({ ...profile, skills: newSkills });
  };

  const removeSkill = (index: number) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((_, i) => i !== index)
    });
  };

  const addExperience = () => {
    setProfile({
      ...profile,
      experience: [...profile.experience, { title: '', company: '', period: '', description: '' }]
    });
  };

  const updateExperience = (index: number, field: keyof typeof profile.experience[0], value: string) => {
    const newExperience = [...profile.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setProfile({ ...profile, experience: newExperience });
  };

  const removeExperience = (index: number) => {
    setProfile({
      ...profile,
      experience: profile.experience.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Content Management</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your profile information and projects
        </p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Information</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Education
              </label>
              <input
                type="text"
                value={profile.education}
                onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Profile Image URL
              </label>
              <div className="flex gap-4">
                <input
                  type="url"
                  value={profile.imageUrl}
                  onChange={(e) => setProfile({ ...profile, imageUrl: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                {profile.imageUrl && (
                  <img
                    src={profile.imageUrl}
                    alt="Profile Preview"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* Stats Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Projects
                  </label>
                  <input
                    type="number"
                    value={profile.stats.projects}
                    onChange={(e) => setProfile({
                      ...profile,
                      stats: { ...profile.stats, projects: parseInt(e.target.value) }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Clients
                  </label>
                  <input
                    type="number"
                    value={profile.stats.clients}
                    onChange={(e) => setProfile({
                      ...profile,
                      stats: { ...profile.stats, clients: parseInt(e.target.value) }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Coffee Cups
                  </label>
                  <input
                    type="number"
                    value={profile.stats.coffee}
                    onChange={(e) => setProfile({
                      ...profile,
                      stats: { ...profile.stats, coffee: parseInt(e.target.value) }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Awards
                  </label>
                  <input
                    type="number"
                    value={profile.stats.awards}
                    onChange={(e) => setProfile({
                      ...profile,
                      stats: { ...profile.stats, awards: parseInt(e.target.value) }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Skills</h3>
                <Button
                  variant="outline"
                  onClick={addSkill}
                  icon={<Plus size={16} />}
                >
                  Add Skill
                </Button>
              </div>
              <div className="space-y-4">
                {profile.skills.map((skill, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => updateSkill(index, 'name', e.target.value)}
                        placeholder="Skill name"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="w-24">
                      <input
                        type="number"
                        value={skill.percentage}
                        onChange={(e) => updateSkill(index, 'percentage', parseInt(e.target.value))}
                        min="0"
                        max="100"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => removeSkill(index)}
                      className="text-red-600 hover:text-red-700 border-red-600 hover:bg-red-50"
                      icon={<Trash2 size={16} />}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Experience</h3>
                <Button
                  variant="outline"
                  onClick={addExperience}
                  icon={<Plus size={16} />}
                >
                  Add Experience
                </Button>
              </div>
              <div className="space-y-6">
                {profile.experience.map((exp, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) => updateExperience(index, 'title', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Company
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(index, 'company', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Period
                      </label>
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => updateExperience(index, 'period', e.target.value)}
                        placeholder="e.g., 2020 - Present"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => updateExperience(index, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        onClick={() => removeExperience(index)}
                        className="text-red-600 hover:text-red-700 border-red-600 hover:bg-red-50"
                        icon={<Trash2 size={16} />}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                variant="primary"
                onClick={saveProfile}
                disabled={loading}
                icon={<Save size={16} />}
              >
                Save Profile
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Projects Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Projects</h2>
            <Button
              variant="outline"
              onClick={addProject}
              icon={<Plus size={16} />}
            >
              Add Project
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => updateProject({ ...project, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={project.category}
                      onChange={(e) => updateProject({ ...project, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Short Description
                  </label>
                  <textarea
                    value={project.description}
                    onChange={(e) => updateProject({ ...project, description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Description
                  </label>
                  <textarea
                    value={project.fullDescription}
                    onChange={(e) => updateProject({ ...project, fullDescription: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={project.githubUrl}
                      onChange={(e) => updateProject({ ...project, githubUrl: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Live URL
                    </label>
                    <input
                      type="url"
                      value={project.liveUrl}
                      onChange={(e) => updateProject({ ...project, liveUrl: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Main Image URL
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="url"
                      value={project.image}
                      onChange={(e) => updateProject({ ...project, image: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    {project.image && (
                      <img
                        src={project.image}
                        alt="Project Preview"
                        className="w-12 h-12 rounded object-cover"
                      />
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Screenshots (One URL per line)
                  </label>
                  <textarea
                    value={project.screenshots.join('\n')}
                    onChange={(e) => updateProject({
                      ...project,
                      screenshots: e.target.value.split('\n').filter(url => url.trim())
                    })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Technologies (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={project.technologies.join(', ')}
                    onChange={(e) => updateProject({
                      ...project,
                      technologies: e.target.value.split(',').map(tech => tech.trim())
                    })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Challenges
                  </label>
                  <textarea
                    value={project.challenges}
                    onChange={(e) => updateProject({ ...project, challenges: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Learning
                  </label>
                  <textarea
                    value={project.learning}
                    onChange={(e) => updateProject({ ...project, learning: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={project.featured}
                      onChange={(e) => updateProject({ ...project, featured: e.target.checked })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4 mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Featured Project</span>
                  </label>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={project.order}
                      onChange={(e) => updateProject({ ...project, order: parseInt(e.target.value) })}
                      className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="primary"
                    onClick={() => updateProject(project)}
                    icon={<Save size={16} />}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => deleteProject(project.id)}
                    className="text-red-600 hover:text-red-700 border-red-600 hover:bg-red-50"
                    icon={<Trash2 size={16} />}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ContentPage;