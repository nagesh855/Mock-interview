import { useLanguage } from '../context/useLanguage';

export default function PracticeCategories({ selectedCategory, onSelectCategory, onNavigate }) {
  const { categories, t } = useLanguage();
  const catT = t.categoriesSection;

  const handleSelect = (catId) => {
    onSelectCategory(catId);
    onNavigate('configurator');
  };

  return (
    <section className="categories-section" id="categories">
      <div className="section-header">
        <span className="section-eyebrow">{catT.eyebrow}</span>
        <h2 className="section-heading">{catT.title}</h2>
        <p className="section-subtext">{catT.subtitle}</p>
      </div>

      <div className="practice-categories-grid">
        {categories.map((cat) => {
          const isSelected = cat.id === selectedCategory;
          return (
            <div key={cat.id} className={`practice-cat-card ${isSelected ? 'is-selected' : ''}`}>
              <div className="cat-card-header">
                <span className="cat-card-icon">{cat.icon}</span>
                <span className="cat-card-badge">{cat.badge}</span>
              </div>

              <h3 className="cat-card-title">{cat.name}</h3>
              <h4 className="cat-card-subtitle">{cat.fullName}</h4>
              <p className="cat-card-description">{cat.description}</p>

              <div className="cat-topics-list">
                <span className="topics-heading">{catT.keyFocus}</span>
                <div className="topic-tags-row">
                  {cat.sampleTopics.map((topic, i) => (
                    <span key={i} className="topic-chip">{topic}</span>
                  ))}
                </div>
              </div>

              <div className="cat-card-footer">
                <button
                  type="button"
                  className={`btn ${isSelected ? 'btn-primary' : 'btn-outline'} full-width`}
                  onClick={() => handleSelect(cat.id)}
                >
                  {isSelected ? catT.btnSelected : `${catT.btnSelect} (${cat.name})`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
