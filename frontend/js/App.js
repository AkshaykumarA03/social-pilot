// Main App Component
const { useState, useEffect } = React;

// Header Component
const Header = ({ isDarkMode, onDarkModeToggle, stats }) => (
    <div className="fade-in bg-white dark:bg-gray-800 rounded-2xl shadow-lg-pro p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    Social Pilot AI
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Professional AI Content Generation Platform</p>
            </div>
            <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={onDarkModeToggle} />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="text-2xl font-bold text-indigo-600">{stats.totalCampaigns}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Campaigns</p>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{stats.totalPosts}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Posts</p>
            </div>
            <div className="text-center p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                <p className="text-2xl font-bold text-pink-600">{stats.uniquePlatforms}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Platforms</p>
            </div>
        </div>
    </div>
);

// Insights Tab Component
const InsightsTab = ({ campaigns }) => {
    const platformCounts = {};
    const contentTypes = {};
    let totalPosts = 0;
    
    campaigns.forEach(campaign => {
        if (campaign.platforms) {
            campaign.platforms.forEach(p => {
                platformCounts[p] = (platformCounts[p] || 0) + 1;
                totalPosts++;
            });
        }
        if (campaign.contentType) {
            contentTypes[campaign.contentType] = (contentTypes[campaign.contentType] || 0) + 1;
        }
    });

    const topPlatforms = Object.entries(platformCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const recentActivity = campaigns.slice(0, 7);

    return (
        <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg-pro p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Campaigns</p>
                            <p className="text-3xl font-bold text-indigo-600 mt-2">{campaigns.length}</p>
                        </div>
                        <svg className="w-16 h-16 text-indigo-200 dark:text-indigo-800 transition-transform duration-300 hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                        </svg>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg-pro p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Posts</p>
                            <p className="text-3xl font-bold text-purple-600 mt-2">{totalPosts}</p>
                        </div>
                        <svg className="w-16 h-16 text-purple-200 dark:text-purple-800 transition-transform duration-300 hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg-pro p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Platforms Used</p>
                            <p className="text-3xl font-bold text-pink-600 mt-2">{Object.keys(platformCounts).length}</p>
                        </div>
                        <svg className="w-16 h-16 text-pink-200 dark:text-pink-800 transition-transform duration-300 hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path>
                        </svg>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg-pro p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Posts/Campaign</p>
                            <p className="text-3xl font-bold text-blue-600 mt-2">
                                {campaigns.length > 0 ? (totalPosts / campaigns.length).toFixed(1) : 0}
                            </p>
                        </div>
                        <svg className="w-16 h-16 text-blue-200 dark:text-blue-800 transition-transform duration-300 hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Platform Distribution */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg-pro p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <i className="fas fa-chart-pie text-indigo-600"></i>
                    Top Platforms
                </h3>
                <div className="space-y-3">
                    {topPlatforms.map(([platform, count]) => {
                        const percentage = ((count / totalPosts) * 100).toFixed(1);
                        return (
                            <div key={platform}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-semibold text-gray-700 dark:text-gray-300 capitalize">{platform}</span>
                                    <span className="text-gray-600 dark:text-gray-400">{count} posts ({percentage}%)</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                    <div
                                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg-pro p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <i className="fas fa-clock text-indigo-600"></i>
                    Recent Activity
                </h3>
                <div className="space-y-3">
                    {recentActivity.length > 0 ? (
                        recentActivity.map((campaign, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900 dark:text-white">{campaign.productName}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                        {new Date(campaign.timestamp).toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex gap-1">
                                    {campaign.platforms?.slice(0, 3).map(p => (
                                        <span key={p} className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded">
                                            {p}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 dark:text-gray-400 text-center py-8">No campaigns yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const App = () => {
    const [activeTab, setActiveTab] = useState('create');
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved ? saved === 'true' : false;
    });
    const [campaigns, setCampaigns] = useState(() => {
        const saved = localStorage.getItem('socialPilotCampaigns');
        return saved ? JSON.parse(saved) : [];
    });
    const [currentContent, setCurrentContent] = useState({});
    const [currentImage, setCurrentImage] = useState(null);
    const [previewModal, setPreviewModal] = useState({ open: false, platform: '', content: '' });

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    const handleGenerate = (campaign) => {
        setCurrentContent(campaign.content);
        setCurrentImage(campaign.image);
        const updated = [campaign, ...campaigns];
        setCampaigns(updated);
        localStorage.setItem('socialPilotCampaigns', JSON.stringify(updated));
    };

    const handleDelete = (timestamp) => {
        const updated = campaigns.filter((c) => c.timestamp !== timestamp);
        setCampaigns(updated);
        localStorage.setItem('socialPilotCampaigns', JSON.stringify(updated));
    };

    const handlePreview = (platform, content) => {
        setPreviewModal({ open: true, platform, content });
    };

    const totalCampaigns = campaigns.length;
    const totalPosts = campaigns.reduce((sum, campaign) => {
        if (!campaign.content || typeof campaign.content !== 'object') return sum;
        return sum + Object.keys(campaign.content).length;
    }, 0);
    const uniquePlatforms = new Set(
        campaigns.flatMap((campaign) => campaign.platforms || [])
    ).size;

    return (
        <div className="min-h-screen py-8 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div>
                        <Sidebar
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            isDarkMode={isDarkMode}
                            totalCampaigns={totalCampaigns}
                            totalPosts={totalPosts}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8">
                        {activeTab === 'create' ? (
                            <>
                                <Header
                                    isDarkMode={isDarkMode}
                                    onDarkModeToggle={setIsDarkMode}
                                    stats={{
                                        totalCampaigns,
                                        totalPosts,
                                        uniquePlatforms,
                                    }}
                                />
                                <CreateCampaign onGenerate={handleGenerate} isDarkMode={isDarkMode} />
                                {Object.keys(currentContent).length > 0 && (
                                    <ContentCards content={currentContent} onPreview={handlePreview} image={currentImage} />
                                )}
                            </>
                        ) : activeTab === 'history' ? (
                            <HistoryTab campaigns={campaigns} onDelete={handleDelete} isDarkMode={isDarkMode} />
                        ) : activeTab === 'insights' ? (
                            <InsightsTab campaigns={campaigns} />
                        ) : activeTab === 'calendar' ? (
                            <Calendar campaigns={campaigns} />
                        ) : activeTab === 'bulk' ? (
                            <BulkGeneration onGenerate={handleGenerate} />
                        ) : activeTab === 'templates' ? (
                            <TemplatesLibrary onUseTemplate={(template) => {
                                alert('Template ready to use! Go to Create tab to customize.');
                            }} />
                        ) : activeTab === 'aiimage' ? (
                            <AIImageGenerator />
                        ) : activeTab === 'audio' ? (
                            <TextToAudio />
                        ) : activeTab === 'videoscript' ? (
                            <VideoScriptGenerator />
                        ) : null}
                    </div>
                </div>
            </div>

            {/* Mobile Preview Modal */}
            <MobilePreviewModal
                isOpen={previewModal.open}
                onClose={() => setPreviewModal({ open: false, platform: '', content: '' })}
                platform={previewModal.platform}
                content={previewModal.content}
                image={currentImage}
            />
        </div>
    );
};

// Render App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
