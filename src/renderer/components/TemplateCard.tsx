import React from 'react';

interface Template {
  name: string;
  path: string;
}

interface TemplateCardProps {
  template: Template;
  onClick: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onClick }) => {
  const getIcon = (name: string) => {
    if (name.includes('React')) return '⚛️';
    if (name.includes('Node')) return '🟢';
    if (name.includes('Python')) return '🐍';
    if (name.includes('Vue')) return '💚';
    if (name.includes('Angular')) return '🔴';
    return '📁';
  };

  return (
    <div
      onClick={onClick}
      style={{
        background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '24px',
        padding: '40px 30px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 8px 30px rgba(66, 153, 225, 0.3)',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 16px 50px rgba(66, 153, 225, 0.5)';
        e.currentTarget.style.background = 'linear-gradient(135deg, #3182ce 0%, #2c5aa0 100%)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(66, 153, 225, 0.3)';
        e.currentTarget.style.background = 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)';
      }}
    >
      <div style={{ 
        fontSize: '64px',
        filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2))',
        transition: 'transform 0.3s ease'
      }}>{getIcon(template.name)}</div>
      <h3 style={{ 
        margin: 0, 
        fontSize: '20px', 
        color: '#ffffff',
        fontWeight: '700',
        letterSpacing: '0.3px',
        textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
      }}>
        {template.name.replace(/-/g, ' ')}
      </h3>
    </div>
  );
};

export default TemplateCard;
