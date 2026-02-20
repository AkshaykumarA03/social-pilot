// Templates Library Component
const { useState } = React;

const TemplatesLibrary = ({ onUseTemplate }) => {
    const [templates, setTemplates] = useState(() => {
        const saved = localStorage.getItem('socialPilotTemplates');
        return saved ? JSON.parse(saved) : [
            {
                id: 1,
                name: 'Product Launch',
                category: 'Promotional',
                description: 'Exciting new product announcement',
                template: '🚀 Introducing [PRODUCT]! \n\n[DESCRIPTION]\n\n✨ Key Features:\n• [FEATURE_1]\n• [FEATURE_2]\n• [FEATURE_3]\n\n👉 [CTA]\n\n#NewProduct #Launch #Innovation',
                platforms: ['instagram', 'facebook', 'linkedin'],
                uses: 0
            },
            {
                id: 2,
                name: 'Limited Offer',
                category: 'Sales',
                description: 'Time-sensitive discount promotion',
                template: '⏰ LIMITED TIME OFFER! ⏰\n\nGet [DISCOUNT]% OFF on [PRODUCT]!\n\n🎁 Special Deal:\n[OFFER_DETAILS]\n\n⚡ Hurry! Offer ends [DATE]\n\n👉 [CTA]\n\n#Sale #Discount #LimitedOffer',
                platforms: ['instagram', 'facebook', 'x'],
                uses: 0
            },
            {
                id: 3,
                name: 'Educational Post',
                category: 'Educational',
                description: 'Share valuable tips and insights',
                template: '💡 Did you know?\n\n[FACT_OR_TIP]\n\n📚 Here\'s what you need to know:\n\n1️⃣ [POINT_1]\n2️⃣ [POINT_2]\n3️⃣ [POINT_3]\n\n💬 What\'s your experience? Share below!\n\n#Tips #Education #Learning',
                platforms: ['linkedin', 'facebook', 'x'],
                uses: 0
            },
            {
                id: 4,
                name: 'Customer Testimonial',
                category: 'Social Proof',
                description: 'Showcase customer success stories',
                template: '⭐⭐⭐⭐⭐\n\n"[TESTIMONIAL_QUOTE]"\n\n- [CUSTOMER_NAME], [CUSTOMER_TITLE]\n\n💙 We love hearing from our customers!\n\n[PRODUCT] has helped [RESULT]\n\n👉 [CTA]\n\n#CustomerLove #Testimonial #Success',
                platforms: ['instagram', 'linkedin', 'facebook'],
                uses: 0
            },
            {
                id: 5,
                name: 'Behind The Scenes',
                category: 'Engagement',
                description: 'Show your company culture',
                template: '🎬 Behind the Scenes at [COMPANY]!\n\n[STORY_OR_INSIGHT]\n\n👥 Meet our team:\n[TEAM_HIGHLIGHT]\n\n💼 What we\'re working on:\n[PROJECT_DETAILS]\n\n❓ Questions? Ask us anything!\n\n#BehindTheScenes #TeamCulture #CompanyLife',
                platforms: ['instagram', 'linkedin', 'tiktok'],
                uses: 0
            }
        ];
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newTemplate, setNewTemplate] = useState({
        name: '',
        category: 'Promotional',
        description: '',
        template: '',
        platforms: []
    });

    const categories = ['All', 'Promotional', 'Sales', 'Educational', 'Social Proof', 'Engagement'];

    const filteredTemplates = templates.filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            t.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleUseTemplate = (template) => {
        const updatedTemplates = templates.map(t =>
            t.id === template.id ? { ...t, uses: t.uses + 1 } : t
        );
        setTemplates(updatedTemplates);
        localStorage.setItem('socialPilotTemplates', JSON.stringify(updatedTemplates));
        
        if (onUseTemplate) {
            onUseTemplate(template);
        }
        
        alert('Template copied! You can now customize it in the Create tab.');
    };

    const handleSaveTemplate = () => {
        if (!newTemplate.name || !newTemplate.template) {
            alert('Please fill in template name and content');
            return;
        }

        const template = {
            ...newTemplate,
            id: Date.now(),
            uses: 0
        };

        const updatedTemplates = [...templates, template];
        setTemplates(updatedTemplates);
        localStorage.setItem('socialPilotTemplates', JSON.stringify(updatedTemplates));
        
        setShowCreateModal(false);
        setNewTemplate({
            name: '',
            category: 'Promotional',
            description: '',
            template: '',
            platforms: []
        });
    };

    const handleDeleteTemplate = (id) => {
        if (confirm('Delete this template?')) {
            const updatedTemplates = templates.filter(t => t.id !== id);
            setTemplates(updatedTemplates);
            localStorage.setItem('socialPilotTemplates', JSON.stringify(updatedTemplates));
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg-pro p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <i className="fas fa-bookmark text-indigo-600"></i>
                            Templates Library
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                            {templates.length} templates available
                        </p>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="btn-primary px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <i className="fas fa-plus"></i>
                        Create Template
                    </button>
                </div>

                {/* Search and Filter */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="relative">
                        <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input
                            type="text"
                            placeholder="Search templates..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-pro w-full pl-12 pr-4 py-3 border-2 rounded-xl"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-smooth ${
                                    selectedCategory === cat
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTemplates.map(template => (
                        <div key={template.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-3 hover-lift">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 dark:text-white">{template.name}</h3>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{template.description}</p>
                                </div>
                                <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded text-xs font-semibold">
                                    {template.category}
                                </span>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                                <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-4 whitespace-pre-wrap">
                                    {template.template}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-1">
                                {template.platforms.map(p => (
                                    <span key={p} className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded">
                                        {p}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    <i className="fas fa-chart-line mr-1"></i>
                                    Used {template.uses} times
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleUseTemplate(template)}
                                        className="text-xs px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-smooth"
                                    >
                                        Use
                                    </button>
                                    {template.id > 5 && (
                                        <button
                                            onClick={() => handleDeleteTemplate(template.id)}
                                            className="text-xs px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-smooth"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Create Template Modal */}
            {showCreateModal && (
                <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
                    <div className="modal-content glassmorphism max-w-2xl" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Create New Template</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Template Name"
                                value={newTemplate.name}
                                onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                                className="input-pro w-full px-4 py-3 border-2 rounded-xl"
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                value={newTemplate.description}
                                onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                                className="input-pro w-full px-4 py-3 border-2 rounded-xl"
                            />
                            <select
                                value={newTemplate.category}
                                onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                                className="input-pro w-full px-4 py-3 border-2 rounded-xl"
                            >
                                {categories.filter(c => c !== 'All').map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <textarea
                                placeholder="Template content (use [PLACEHOLDERS] for dynamic content)"
                                value={newTemplate.template}
                                onChange={(e) => setNewTemplate({...newTemplate, template: e.target.value})}
                                rows="8"
                                className="input-pro w-full px-4 py-3 border-2 rounded-xl resize-none"
                            />
                            <div className="flex gap-2">
                                <button onClick={handleSaveTemplate} className="btn-primary flex-1 py-3 rounded-xl">
                                    Save Template
                                </button>
                                <button onClick={() => setShowCreateModal(false)} className="btn-secondary flex-1 py-3 rounded-xl">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
