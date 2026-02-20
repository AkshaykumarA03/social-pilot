// History Components: SearchBar, HistoryItem, HistoryTab, InsightsTab
const { useState } = React;

// Search Bar
const SearchBar = ({ value, onChange }) => (
    <div className="search-container">
        <i className="fas fa-search search-icon"></i>
        <input
            type="text"
            placeholder="Search campaigns..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="input-pro w-full px-4 py-3 pl-10 border-2 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
    </div>
);

// Professional History Item
const HistoryItem = ({ campaign, onDelete, onFavorite, isFavorite, isSelected, onSelect }) => (
    <div className={`hover-lift group relative bg-white dark:bg-gray-800 rounded-xl shadow-md-pro overflow-hidden transition-all ${isSelected ? 'ring-2 ring-indigo-600' : ''}`}>
        <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="absolute top-3 left-3 w-4 h-4 cursor-pointer z-10"
        />

        {/* Image Section */}
        <div className="relative h-40 bg-gradient-to-br from-indigo-100 dark:from-indigo-900 to-purple-100 dark:to-purple-900 overflow-hidden">
            {campaign.image ? (
                <img src={campaign.image} alt={campaign.productName} className="w-full h-full object-cover" />
            ) : (
                <div className="flex items-center justify-center h-full">
                    <i className="fas fa-image text-indigo-300 text-3xl"></i>
                </div>
            )}
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-2">
            <div className="flex items-start justify-between">
                <h3 className="font-bold text-gray-900 dark:text-white truncate flex-1">{campaign.productName}</h3>
                <button
                    onClick={onFavorite}
                    className="transition-smooth text-lg"
                >
                    <i className={`fas fa-star ${isFavorite ? 'text-yellow-400' : 'text-gray-300'}`}></i>
                </button>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{campaign.description}</p>

            {/* Platform Badges */}
            <div className="flex flex-wrap gap-1 py-2">
                {campaign.platforms && campaign.platforms.slice(0, 3).map((p) => (
                    <span key={p} className="platform-badge text-xs">
                        <i className={`fab fa-${p === 'x' ? 'x-twitter' : p}`}></i> {p}
                    </span>
                ))}
            </div>

            {/* Date & Delete */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700 mt-3">
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <i className="fas fa-calendar"></i>
                    {new Date(campaign.timestamp).toLocaleDateString()}
                </span>
                <button
                    onClick={onDelete}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-xs font-medium transition-smooth"
                >
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </div>
    </div>
);

// Professional History Tab
const HistoryTab = ({ campaigns, onDelete, isDarkMode }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('socialPilotFavorites');
        return saved ? JSON.parse(saved) : [];
    });
    const [selectedCampaigns, setSelectedCampaigns] = useState([]);

    const filteredCampaigns = campaigns.filter((c) =>
        c.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToggleFavorite = (timestamp) => {
        const updated = favorites.includes(timestamp)
            ? favorites.filter((t) => t !== timestamp)
            : [...favorites, timestamp];
        setFavorites(updated);
        localStorage.setItem('socialPilotFavorites', JSON.stringify(updated));
    };

    const handleBulkDelete = () => {
        if (window.confirm(`Delete ${selectedCampaigns.length} campaign(s)?`)) {
            selectedCampaigns.forEach((timestamp) => onDelete(timestamp));
            setSelectedCampaigns([]);
        }
    };

    const handleExport = () => {
        const data = JSON.stringify(campaigns, null, 2);
        const element = document.createElement('a');
        element.setAttribute('href', `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
        element.setAttribute('download', `campaigns-${new Date().toISOString().split('T')[0]}.json`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    if (campaigns.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md-pro p-12 text-center">
                <div className="inline-block p-4 bg-gradient-primary/10 rounded-full mb-4">
                    <i className="fas fa-history text-indigo-600 text-3xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Campaign History</h3>
                <p className="text-gray-600 dark:text-gray-400">Your generated campaigns will appear here</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-2 flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <i className="fas fa-history text-indigo-600"></i>
                            Campaign History
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {campaigns.length} campaign{campaigns.length !== 1 ? 's' : ''} saved
                        </p>
                    </div>
                </div>

                <SearchBar value={searchTerm} onChange={setSearchTerm} />

                {selectedCampaigns.length > 0 && (
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 flex items-center justify-between">
                        <span className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
                            {selectedCampaigns.length} selected
                        </span>
                        <button
                            onClick={handleBulkDelete}
                            className="btn-secondary px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
                        >
                            <i className="fas fa-trash"></i>
                            Delete Selected
                        </button>
                    </div>
                )}

                <button
                    onClick={handleExport}
                    className="btn-secondary px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 w-full"
                >
                    <i className="fas fa-download"></i>
                    Export All as JSON
                </button>
            </div>

            {filteredCampaigns.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center text-sm text-gray-600 dark:text-gray-400">
                    No campaigns matched your search.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredCampaigns.map((campaign) => (
                        <HistoryItem
                            key={campaign.timestamp}
                            campaign={campaign}
                            onDelete={() => onDelete(campaign.timestamp)}
                            onFavorite={() => handleToggleFavorite(campaign.timestamp)}
                            isFavorite={favorites.includes(campaign.timestamp)}
                            isSelected={selectedCampaigns.includes(campaign.timestamp)}
                            onSelect={() => {
                                if (selectedCampaigns.includes(campaign.timestamp)) {
                                    setSelectedCampaigns(selectedCampaigns.filter((t) => t !== campaign.timestamp));
                                } else {
                                    setSelectedCampaigns([...selectedCampaigns, campaign.timestamp]);
                                }
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const InsightsTab = ({ campaigns }) => {
    const totalCampaigns = campaigns.length;
    const totalPosts = campaigns.reduce((sum, campaign) => {
        if (!campaign.content || typeof campaign.content !== 'object') return sum;
        return sum + Object.keys(campaign.content).length;
    }, 0);
    const platformCounts = campaigns.reduce((acc, campaign) => {
        (campaign.platforms || []).forEach((platform) => {
            acc[platform] = (acc[platform] || 0) + 1;
        });
        return acc;
    }, {});

    const topPlatforms = Object.entries(platformCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const avgPlatformsPerCampaign = totalCampaigns
        ? (campaigns.reduce((sum, campaign) => sum + (campaign.platforms?.length || 0), 0) / totalCampaigns).toFixed(1)
        : '0.0';

    const recent = [...campaigns].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 5);

    // Calculate tone distribution
    const toneDistribution = campaigns.reduce((acc, campaign) => {
        const tone = campaign.tone || 'professional';
        acc[tone] = (acc[tone] || 0) + 1;
        return acc;
    }, {});

    // Calculate language distribution
    const languageDistribution = campaigns.reduce((acc, campaign) => {
        const lang = campaign.language || 'en';
        acc[lang] = (acc[lang] || 0) + 1;
        return acc;
    }, {});

    // Calculate average content length
    const avgContentLength = campaigns.reduce((sum, campaign) => {
        if (!campaign.content) return sum;
        const lengths = Object.values(campaign.content).map(c => typeof c === 'string' ? c.length : 0);
        return sum + (lengths.reduce((a, b) => a + b, 0) / lengths.length || 0);
    }, 0) / (totalCampaigns || 1);

    // Get most active day
    const dayActivity = campaigns.reduce((acc, campaign) => {
        const day = new Date(campaign.timestamp).toLocaleDateString('en-US', { weekday: 'long' });
        acc[day] = (acc[day] || 0) + 1;
        return acc;
    }, {});
    const mostActiveDay = Object.entries(dayActivity).sort((a, b) => b[1] - a[1])[0];

    if (campaigns.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md-pro p-12 text-center">
                <div className="inline-block p-4 bg-gradient-primary/10 rounded-full mb-4">
                    <i className="fas fa-chart-simple text-indigo-600 text-3xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Insights Yet</h3>
                <p className="text-gray-600 dark:text-gray-400">Generate campaigns to unlock usage analytics.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <i className="fas fa-chart-simple text-indigo-600"></i>
                    Campaign Insights
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Performance snapshot from your generated campaigns.</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20 border border-sky-200 dark:border-sky-800 p-5 hover-lift">
                    <div className="flex items-center justify-between mb-2">
                        <i className="fas fa-rocket text-sky-600 text-2xl"></i>
                        <span className="text-xs font-semibold text-sky-700 dark:text-sky-300 bg-sky-200 dark:bg-sky-900 px-2 py-1 rounded-full">Total</span>
                    </div>
                    <p className="text-xs text-sky-700 dark:text-sky-300 font-semibold">Campaigns</p>
                    <p className="text-3xl font-extrabold text-sky-900 dark:text-sky-100">{totalCampaigns}</p>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border border-amber-200 dark:border-amber-800 p-5 hover-lift">
                    <div className="flex items-center justify-between mb-2">
                        <i className="fas fa-file-lines text-amber-600 text-2xl"></i>
                        <span className="text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-200 dark:bg-amber-900 px-2 py-1 rounded-full">Generated</span>
                    </div>
                    <p className="text-xs text-amber-700 dark:text-amber-300 font-semibold">Posts</p>
                    <p className="text-3xl font-extrabold text-amber-900 dark:text-amber-100">{totalPosts}</p>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-800 p-5 hover-lift">
                    <div className="flex items-center justify-between mb-2">
                        <i className="fas fa-chart-line text-emerald-600 text-2xl"></i>
                        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-200 dark:bg-emerald-900 px-2 py-1 rounded-full">Avg</span>
                    </div>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold">Platforms/Campaign</p>
                    <p className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-100">{avgPlatformsPerCampaign}</p>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800 p-5 hover-lift">
                    <div className="flex items-center justify-between mb-2">
                        <i className="fas fa-text-width text-purple-600 text-2xl"></i>
                        <span className="text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-200 dark:bg-purple-900 px-2 py-1 rounded-full">Avg</span>
                    </div>
                    <p className="text-xs text-purple-700 dark:text-purple-300 font-semibold">Content Length</p>
                    <p className="text-3xl font-extrabold text-purple-900 dark:text-purple-100">{Math.round(avgContentLength)}</p>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Top Platforms */}
                <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 shadow-sm-pro hover-lift">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <i className="fas fa-trophy text-yellow-500"></i>
                        Top Platforms
                    </h3>
                    <div className="space-y-3">
                        {topPlatforms.map(([platform, count], idx) => (
                            <div key={platform}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="capitalize text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">#{idx + 1}</span>
                                        {platform}
                                    </span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{count} posts</span>
                                </div>
                                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-sky-500 to-cyan-500"
                                        style={{ width: `${(count / Math.max(topPlatforms[0][1], 1)) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tone Distribution */}
                <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 shadow-sm-pro hover-lift">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <i className="fas fa-palette text-pink-500"></i>
                        Tone Distribution
                    </h3>
                    <div className="space-y-3">
                        {Object.entries(toneDistribution).map(([tone, count]) => (
                            <div key={tone}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="capitalize text-gray-700 dark:text-gray-300">{tone}</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{count}</span>
                                </div>
                                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                                        style={{ width: `${(count / totalCampaigns) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Language Stats */}
                <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 p-5 hover-lift">
                    <h3 className="text-sm font-bold text-blue-900 dark:text-blue-200 mb-3 flex items-center gap-2">
                        <i className="fas fa-globe"></i>
                        Languages Used
                    </h3>
                    <div className="space-y-2">
                        {Object.entries(languageDistribution).map(([lang, count]) => (
                            <div key={lang} className="flex justify-between text-sm">
                                <span className="text-blue-800 dark:text-blue-300 uppercase font-semibold">{lang}</span>
                                <span className="text-blue-900 dark:text-blue-100 font-bold">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Most Active Day */}
                <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 p-5 hover-lift">
                    <h3 className="text-sm font-bold text-green-900 dark:text-green-200 mb-3 flex items-center gap-2">
                        <i className="fas fa-calendar-check"></i>
                        Most Active Day
                    </h3>
                    {mostActiveDay && (
                        <div className="text-center">
                            <p className="text-3xl font-extrabold text-green-900 dark:text-green-100">{mostActiveDay[0]}</p>
                            <p className="text-sm text-green-700 dark:text-green-300 mt-1">{mostActiveDay[1]} campaigns</p>
                        </div>
                    )}
                </div>

                {/* Recent Activity */}
                <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border border-orange-200 dark:border-orange-800 p-5 hover-lift">
                    <h3 className="text-sm font-bold text-orange-900 dark:text-orange-200 mb-3 flex items-center gap-2">
                        <i className="fas fa-clock"></i>
                        Recent Activity
                    </h3>
                    <div className="space-y-2">
                        {recent.slice(0, 3).map((campaign) => (
                            <div key={campaign.timestamp} className="text-xs">
                                <p className="font-semibold text-orange-900 dark:text-orange-100 truncate">{campaign.productName}</p>
                                <p className="text-orange-700 dark:text-orange-300">{new Date(campaign.timestamp).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
