import React, { useState, useEffect } from 'react';
import { Save, Trash2, Plus, ExternalLink } from 'lucide-react';
import { doc, collection, getDocs, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Card, { CardBody, CardHeader } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { Link, Profile } from '../../types/content';

const SettingsPage: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [profile, setProfile] = useState<Profile>({
    name: 'Kingo Kingsley Kaah',
    title: 'Software Engineer & AI Enthusiast',
    bio: 'Software Engineering student at the University of Buea',
    email: 'your-email@example.com',
    location: 'Buea, Cameroon',
    education: 'University of Buea, Level 400',
    imageUrl: 'https://images.pexels.com/photos/5380666/pexels-photo-5380666.jpeg'
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchLinks();
    fetchProfile();
  }, []);

  const fetchLinks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'links'));
      const fetchedLinks = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Link[];
      setLinks(fetchedLinks);
    } catch (error) {
      console.error('Error fetching links:', error);
    }
  };

  const fetchProfile = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'profile'));
      if (!querySnapshot.empty) {
        const profileData = querySnapshot.docs[0].data() as Profile;
        setProfile(profileData);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleLinkChange = (id: string, field: keyof Link, value: string | boolean) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const handleProfileChange = (field: keyof Profile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const saveLink = async (link: Link) => {
    setIsLoading(true);
    try {
      await updateDoc(doc(db, 'links', link.id), link);
    } catch (error) {
      console.error('Error saving link:', error);
    }
    setIsLoading(false);
  };

  const deleteLink = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this link?')) return;
    
    setIsLoading(true);
    try {
      await deleteDoc(doc(db, 'links', id));
      setLinks(links.filter(link => link.id !== id));
    } catch (error) {
      console.error('Error deleting link:', error);
    }
    setIsLoading(false);
  };

  const addNewLink = async () => {
    const newLink: Omit<Link, 'id'> = {
      title: 'New Link',
      url: 'https://',
      type: 'project',
      isActive: true
    };

    setIsLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'links'), newLink);
      setLinks([...links, { ...newLink, id: docRef.id }]);
    } catch (error) {
      console.error('Error adding link:', error);
    }
    setIsLoading(false);
  };

  const saveProfile = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'profile'));
      if (!querySnapshot.empty) {
        await updateDoc(doc(db, 'profile', querySnapshot.docs[0].id), profile);
      } else {
        await addDoc(collection(db, 'profile'), profile);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your profile and website content
        </p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Information</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
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
                onChange={(e) => handleProfileChange('title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) => handleProfileChange('bio', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
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
                  onChange={(e) => handleProfileChange('location', e.target.value)}
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
                onChange={(e) => handleProfileChange('education', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Profile Image URL
              </label>
              <input
                type="url"
                value={profile.imageUrl}
                onChange={(e) => handleProfileChange('imageUrl', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end">
              <Button
                variant="primary"
                onClick={saveProfile}
                disabled={isLoading}
                icon={<Save size={16} />}
              >
                Save Profile
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Links</h2>
            <Button
              variant="outline"
              onClick={addNewLink}
              disabled={isLoading}
              icon={<Plus size={16} />}
            >
              Add Link
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {links.map((link) => (
              <div key={link.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={link.title}
                      onChange={(e) => handleLinkChange(link.id, 'title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      URL
                    </label>
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => handleLinkChange(link.id, 'url', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <select
                      value={link.type}
                      onChange={(e) => handleLinkChange(link.id, 'type', e.target.value as Link['type'])}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="github">GitHub</option>
                      <option value="project">Project</option>
                      <option value="social">Social</option>
                    </select>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={link.isActive}
                        onChange={(e) => handleLinkChange(link.id, 'isActive', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Active</span>
                    </label>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => window.open(link.url, '_blank')}
                      icon={<ExternalLink size={16} />}
                    >
                      Visit
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => saveLink(link)}
                      disabled={isLoading}
                      icon={<Save size={16} />}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => deleteLink(link.id)}
                      disabled={isLoading}
                      className="text-red-600 hover:text-red-700 border-red-600 hover:bg-red-50"
                      icon={<Trash2 size={16} />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SettingsPage;