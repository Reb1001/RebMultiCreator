import React, { useState, useEffect } from 'react';
import TemplateCard from './components/TemplateCard';
import CreateProjectModal from './components/CreateProjectModal';
import './styles.css';

interface Template {
  name: string;
  path: string;
}

const App: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    const temps = await window.api.getTemplates();
    setTemplates(temps);
  };

  const handleTemplateClick = (template: Template) => {
    setSelectedTemplate(template);
    setModalOpen(true);
  };

  const handleCreateProject = async (projectName: string, targetPath: string) => {
    if (!selectedTemplate) return;

    const result = await window.api.copyTemplate(
      selectedTemplate.path,
      targetPath,
      projectName
    );

    if (result.success) {
      alert(`✅ Proje başarıyla oluşturuldu!\n\n${result.path}`);
      setModalOpen(false);
    } else {
      alert(`❌ Hata: ${result.error}`);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#ffffff',
      padding: '40px 40px 60px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle background shapes */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '600px',
        height: '600px',
        background: 'linear-gradient(135deg, rgba(66,153,225,0.05) 0%, rgba(66,153,225,0.02) 100%)',
        borderRadius: '50%',
        filter: 'blur(80px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        left: '-100px',
        width: '500px',
        height: '500px',
        background: 'linear-gradient(135deg, rgba(30,60,114,0.05) 0%, rgba(30,60,114,0.02) 100%)',
        borderRadius: '50%',
        filter: 'blur(80px)'
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Logo and Brand */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '30px',
          gap: '20px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            boxShadow: '0 10px 40px rgba(66, 153, 225, 0.3)'
          }}>
            🚀
          </div>
          <div style={{
            fontSize: '48px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-1px'
          }}>
            Creator
          </div>
        </div>

        <header style={{ marginBottom: '50px', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '42px', 
            fontWeight: '700',
            color: '#2d3748',
            marginBottom: '15px',
            letterSpacing: '-1px'
          }}>
            Multi Project Creator
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#718096',
            fontWeight: '400',
            letterSpacing: '0.3px'
          }}>
            Projenizi oluşturmak için bir şablon seçin
          </p>
        </header>

        <div className="templates-grid">
          {templates.map((template) => (
            <TemplateCard
              key={template.name}
              template={template}
              onClick={() => handleTemplateClick(template)}
            />
          ))}
        </div>

        {templates.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '80px', 
            color: '#ffffff',
            fontSize: '18px',
            fontWeight: '600',
            background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
            borderRadius: '24px',
            boxShadow: '0 12px 40px rgba(66, 153, 225, 0.3)'
          }}>
            Şablon bulunamadı. templates/ klasörüne şablon ekleyin.
          </div>
        )}
      </div>

      {selectedTemplate && (
        <CreateProjectModal
          isOpen={modalOpen}
          templateName={selectedTemplate.name}
          templatePath={selectedTemplate.path}
          onClose={() => setModalOpen(false)}
          onSubmit={handleCreateProject}
        />
      )}
    </div>
  );
};

export default App;