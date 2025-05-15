import React from 'react';
import Layout from '../components/Layout/Layout';
import Hero from '../components/Home/Hero';
import AboutPreview from '../components/Home/AboutPreview';
import ProjectsPreview from '../components/Home/ProjectsPreview';
import Stats from '../components/Home/Stats';
import Contact from '../components/Home/Contact';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <AboutPreview />
      <Stats />
      <ProjectsPreview />
      <Contact />
    </Layout>
  );
};

export default HomePage;