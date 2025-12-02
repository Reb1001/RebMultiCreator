import React, { useState } from 'react';

interface CreateProjectModalProps {
  isOpen: boolean;
  templateName: string;
  templatePath: string;
  onClose: () => void;
  onSubmit: (projectName: string, targetPath: string) => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  templateName,
  templatePath,
  onClose,
  onSubmit
}) => {
  const [projectName, setProjectName] = useState('');
  const [targetPath, setTargetPath] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSelectFolder = async () => {
    const path = await window.api.selectDirectory();
    if (path) {
      setTargetPath(path);
    }
  };

  const handleSubmit = async () => {
    if (!projectName.trim() || !targetPath) {
      alert('Lütfen proje ismi ve hedef klasör seçin');
      return;
    }

    setLoading(true);
    await onSubmit(projectName, targetPath);
    setLoading(false);
    
    // Reset form
    setProjectName('');
    setTargetPath('');
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(66,153,225,0.95) 0%, rgba(49,130,206,0.95) 100%)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '40px',
          minWidth: '550px',
          maxWidth: '650px',
          boxShadow: '0 20px 60px rgba(30, 60, 114, 0.3)',
          border: '2px solid rgba(66, 153, 225, 0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ 
          marginTop: 0, 
          marginBottom: '25px', 
          color: '#2d3748',
          fontSize: '28px',
          fontWeight: '700',
          letterSpacing: '-0.5px'
        }}>
          ✨ Yeni Proje Oluştur
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>
            <strong>Şablon:</strong> {templateName.replace(/-/g, ' ')}
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
            Proje İsmi:
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="my-awesome-project"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '16px',
              border: '2px solid #e0e0e0',
              borderRadius: '12px',
              boxSizing: 'border-box',
              transition: 'all 0.3s ease',
              outline: 'none',
              fontFamily: 'inherit'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#4299e1';
              e.currentTarget.style.boxShadow = '0 0 0 4px rgba(66, 153, 225, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#e0e0e0';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
            Hedef Klasör:
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={targetPath}
              readOnly
              placeholder="Klasör seçin..."
              style={{
                flex: 1,
                padding: '14px',
                fontSize: '14px',
                border: '2px solid #e0e0e0',
                borderRadius: '12px',
                backgroundColor: '#f9f9f9',
                outline: 'none'
              }}
            />
            <button
              onClick={handleSelectFolder}
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
            >
              📁 Seç
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            disabled={loading}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
          >
            İptal
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              padding: '12px 30px',
              fontSize: '16px',
              background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
              fontWeight: '700',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(66, 153, 225, 0.4)'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 25px rgba(66, 153, 225, 0.6)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(66, 153, 225, 0.4)';
            }}
          >
            {loading ? 'Oluşturuluyor...' : 'Oluştur'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
