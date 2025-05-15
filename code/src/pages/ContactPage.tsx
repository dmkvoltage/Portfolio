import React from 'react';
import Layout from '../components/Layout/Layout';
import Section from '../components/UI/Section';
import Contact from '../components/Home/Contact';

const ContactPage: React.FC = () => {
  return (
    <Layout>
      <Section
        title="Contact Me"
        subtitle="Get in touch for collaboration, job opportunities, or just to say hello!"
      >
        <Contact />
      </Section>
    </Layout>
  );
};

export default ContactPage;