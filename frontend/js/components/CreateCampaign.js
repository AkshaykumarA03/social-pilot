// CreateCampaign Component - Main form for generating content
const { useState, useEffect } = React;

const CreateCampaign = ({ onGenerate, isDarkMode }) => {
    const DRAFT_STORAGE_KEY = 'socialPilotDraft';
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedPlatforms, setSelectedPlatforms] = useState(['instagram', 'linkedin', 'x', 'tiktok']);
    const [tone, setTone] = useState('professional');
    const [audience, setAudience] = useState('general');
    const [contentType, setContentType] = useState('promotional');
    const [includeHashtags, setIncludeHashtags] = useState(true);
    const [includeEmojis, setIncludeEmojis] = useState(true);
    const [includeCtA, setIncludeCtA] = useState(true);
    const [brandVoice, setBrandVoice] = useState({ adjectives: [], writingSample: '' });
    const [language, setLanguage] = useState('en');

    const templates = [
        {
            id: 'launch',
            name: 'Product Launch',
            description: 'Announcement copy for a new release.',
            payload: {
                productName: 'New Product Release',
                description: 'Announce a new product with key features, launch date, and value proposition.',
                tone: 'professional',
                audience: 'general',
                contentType: 'promotional',
                platforms: ['instagram', 'linkedin', 'x'],
            },
        },
        {
            id: 'education',
            name: 'Educational Post',
            description: 'Teach one useful concept quickly.',
            payload: {
                productName: 'How-To Mini Guide',
                description: 'Explain a practical tip related to the product and include one actionable takeaway.',
                tone: 'casual',
                audience: 'students',
                contentType: 'educational',
                platforms: ['linkedin', 'facebook', 'reddit'],
            },
        },
        {
            id: 'promo',
            name: 'Limited Offer',
            description: 'Urgent campaign with clear CTA.',
            payload: {
                productName: 'Limited Time Offer',
                description: 'Promote a short discount campaign with urgency, pricing context, and next step.',
                tone: 'humorous',
                audience: 'business',
                contentType: 'engaging',
                platforms: ['instagram', 'facebook', 'whatsapp'],
            },
        },
    ];

    const loadDraft = (notify = true) => {
        try {
            const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
            if (!saved) {
                if (notify) alert('No saved draft found.');
                return;
            }
            const draft = JSON.parse(saved);
            setProductName(draft.productName || '');
            setDescription(draft.description || '');
            setPreview(draft.preview || null);
            setImage(null);
            setSelectedPlatforms(draft.selectedPlatforms?.length ? draft.selectedPlatforms : ['instagram']);
            setTone(draft.tone || 'professional');
            setAudience(draft.audience || 'general');
            setContentType(draft.contentType || 'promotional');
            setIncludeHashtags(draft.includeHashtags !== false);
            setIncludeEmojis(draft.includeEmojis !== false);
            setIncludeCtA(draft.includeCtA !== false);
            setBrandVoice(draft.brandVoice || { adjectives: [], writingSample: '' });
            setLanguage(draft.language || 'en');
            if (notify) alert('Draft restored.');
        } catch (error) {
            console.error('Unable to restore draft:', error);
        }
    };

    useEffect(() => {
        const hasDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
        if (hasDraft) {
            loadDraft(false);
        }
    }, []);

    useEffect(() => {
        const saveTimer = setTimeout(() => {
            const draft = {
                productName,
                description,
                preview,
                selectedPlatforms,
                tone,
                audience,
                contentType,
                includeHashtags,
                includeEmojis,
                includeCtA,
                brandVoice,
                language,
                updatedAt: new Date().toISOString(),
            };
            localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
        }, 400);

        return () => clearTimeout(saveTimer);
    }, [
        productName,
        description,
        preview,
        selectedPlatforms,
        tone,
        audience,
        contentType,
        includeHashtags,
        includeEmojis,
        includeCtA,
        brandVoice,
        language,
    ]);

    const clearDraft = () => {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
        setProductName('');
        setDescription('');
        setImage(null);
        setPreview(null);
        setSelectedPlatforms(['instagram', 'linkedin', 'x', 'tiktok']);
        setTone('professional');
        setAudience('general');
        setContentType('promotional');
        setIncludeHashtags(true);
        setIncludeEmojis(true);
        setIncludeCtA(true);
        setBrandVoice({ adjectives: [], writingSample: '' });
        setLanguage('en');
    };

    const applyTemplate = (template) => {
        setProductName(template.payload.productName);
        setDescription(template.payload.description);
        setTone(template.payload.tone);
        setAudience(template.payload.audience);
        setContentType(template.payload.contentType);
        setSelectedPlatforms(template.payload.platforms);
    };

    const handleImageSelect = (file) => {
        if (!file) {
            setImage(null);
            setPreview(null);
            return;
        }
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handlePlatformToggle = (platform) => {
        if (selectedPlatforms.includes(platform)) {
            setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
        } else {
            setSelectedPlatforms([...selectedPlatforms, platform]);
        }
    };

    const handleGenerate = async () => {
        if (!productName.trim() || !description.trim()) {
            alert('Please fill in all required fields');
            return;
        }
        if (selectedPlatforms.length === 0) {
            alert('Please select at least one platform');
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('productName', productName);
            formData.append('productDescription', description);
            formData.append('tone', tone);
            formData.append('audience', audience);
            formData.append('contentType', contentType);
            formData.append('platforms', selectedPlatforms.join(','));
            formData.append('includeHashtags', includeHashtags);
            formData.append('includeEmojis', includeEmojis);
            formData.append('includeCtA', includeCtA);
            formData.append('brandVoice', JSON.stringify(brandVoice));
            formData.append('language', language);
            if (image) {
                formData.append('image', image);
            }

            const response = await fetch('/api/generate', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                onGenerate({
                    productName,
                    description,
                    tone,
                    platforms: selectedPlatforms,
                    content: data.content || {},
                    image: preview,
                    timestamp: new Date().toISOString(),
                    brandVoice,
                    language,
                });
                setProductName('');
                setDescription('');
                handleImageSelect(null);
                localStorage.removeItem(DRAFT_STORAGE_KEY);
            } else {
                alert(`Error: ${data.error || 'Failed to generate content'}\nDetails: ${data.details || 'Unknown error'}`);
            }
        } catch (error) {
            alert(`Connection Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Keyboard shortcut
    useEffect(() => {
        const handleKeyPress = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                handleGenerate();
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [productName, description, selectedPlatforms, tone, image]);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg-pro p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-1">
                        <i className="fas fa-wand-magic-sparkles text-indigo-600"></i>
                        Create New Campaign
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Generate platform-specific content instantly</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => loadDraft(true)}
                        className="btn-secondary px-3 py-2 rounded-lg text-xs font-semibold"
                    >
                        Restore Draft
                    </button>
                    <button
                        onClick={clearDraft}
                        className="px-3 py-2 rounded-lg text-xs font-semibold border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20"
                    >
                        Clear
                    </button>
                </div>
            </div>

            <div className="divider-subtle"></div>

            <div className="space-y-6">
                <div className="fade-in">
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100">
                            <i className="fas fa-bolt text-indigo-600 mr-2"></i>
                            Quick Start Templates
                        </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {templates.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => applyTemplate(template)}
                                className="text-left rounded-lg p-3 border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 bg-gray-50 dark:bg-gray-700/40 transition-smooth"
                            >
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{template.name}</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{template.description}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <InputField
                    label="Product Name"
                    placeholder="e.g., Premium Coffee Maker"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                    icon="tag"
                />

                <div>
                    <TextAreaField
                        label="Product Description"
                        placeholder="Describe your product, its features, benefits, and target audience..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        icon="pencil"
                        showVoiceInput={true}
                    />
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-right mt-1">
                        {description.length} characters
                    </div>
                </div>

                <PlatformSelector selectedPlatforms={selectedPlatforms} onToggle={handlePlatformToggle} />
                <ToneSelector selectedTone={tone} onSelect={setTone} />

                {/* Audience Selector */}
                <div className="fade-in">
                    <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">
                        <i className="fas fa-users text-indigo-600 mr-2"></i>
                        Target Audience
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {['general', 'professionals', 'students', 'parents', 'teens', 'business'].map((aud) => (
                            <button
                                key={aud}
                                onClick={() => setAudience(aud)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                                    audience === aud
                                        ? 'bg-indigo-600 text-white shadow-md-pro'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                {aud.charAt(0).toUpperCase() + aud.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Type Selector */}
                <div className="fade-in">
                    <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">
                        <i className="fas fa-file-lines text-indigo-600 mr-2"></i>
                        Content Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {['promotional', 'educational', 'entertaining', 'engaging', 'testimonial', 'tips'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setContentType(type)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                                    contentType === type
                                        ? 'bg-indigo-600 text-white shadow-md-pro'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Extra Options */}
                <div className="fade-in bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-3">
                    <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                        <i className="fas fa-sliders text-indigo-600 mr-2"></i>
                        Content Options
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-smooth">
                        <input
                            type="checkbox"
                            checked={includeHashtags}
                            onChange={(e) => setIncludeHashtags(e.target.checked)}
                            className="w-4 h-4 accent-indigo-600"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Include Hashtags</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-smooth">
                        <input
                            type="checkbox"
                            checked={includeEmojis}
                            onChange={(e) => setIncludeEmojis(e.target.checked)}
                            className="w-4 h-4 accent-indigo-600"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Include Emojis</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-smooth">
                        <input
                            type="checkbox"
                            checked={includeCtA}
                            onChange={(e) => setIncludeCtA(e.target.checked)}
                            className="w-4 h-4 accent-indigo-600"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Include Call-to-Action</span>
                    </label>
                </div>

                <ImageUploader onImageSelect={handleImageSelect} preview={preview} />

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent dark:via-indigo-700"></div>

                {/* Advanced Features Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <i className="fas fa-sparkles text-indigo-600"></i>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Advanced Features</h3>
                    </div>

                    {/* Brand Voice Manager */}
                    <BrandVoiceManager brandVoice={brandVoice} setBrandVoice={setBrandVoice} />

                    {/* Language Selector */}
                    <LanguageSelector selectedLanguage={language} onLanguageChange={setLanguage} />
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4 space-y-2">
                    <p className="flex items-center gap-2 text-sm text-indigo-900 dark:text-indigo-200 font-medium">
                        <i className="fas fa-lightbulb text-indigo-600 dark:text-indigo-400"></i>
                        Pro Tip
                    </p>
                    <p className="text-xs text-indigo-800 dark:text-indigo-300">
                        Use Ctrl+Enter or Cmd+Enter to quickly generate content. Drafts are auto-saved while you type.
                    </p>
                </div>

                <ActionButton
                    loading={loading}
                    disabled={!productName.trim() || !description.trim() || selectedPlatforms.length === 0}
                    onClick={handleGenerate}
                    icon="sparkles"
                >
                    Generate Content
                </ActionButton>
            </div>
        </div>
    );
};
