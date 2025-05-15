import React from 'react';
import Layout from '../components/Layout/Layout';
import Section from '../components/UI/Section';
import ProjectsList from '../components/Projects/ProjectsList';

const ProjectsPage: React.FC = () => {
  return (
    <Layout>
      <Section 
        title="My Projects" 
        subtitle="A showcase of my work in web development and AI"
      >
        <ProjectsList />
      </Section>
    </Layout>
  );
};

export default ProjectsPage;