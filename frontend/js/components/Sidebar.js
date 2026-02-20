// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab, isDarkMode, totalCampaigns = 0, totalPosts = 0 }) => (
    <div className="bg-white dark:bg-gray-800 shadow-lg-pro rounded-2xl p-6 h-fit sticky top-6">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3 pb-6 border-b border-gray-100 dark:border-gray-700">
            <div className="p-3 gradient-primary rounded-lg">
                <i className="fas fa-rocket text-white text-lg"></i>
            </div>
            <div>
                <h1 className="font-bold text-gray-900 dark:text-white text-lg">Social Pilot</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">AI Content Studio</p>
            </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-3">
            <NavButton
                icon="wand-magic-sparkles"
                label="Create"
                active={activeTab === 'create'}
                onClick={() => setActiveTab('create')}
            />
            <NavButton
                icon="image"
                label="AI Images"
                active={activeTab === 'aiimage'}
                onClick={() => setActiveTab('aiimage')}
            />
            <NavButton
                icon="microphone"
                label="Text to Audio"
                active={activeTab === 'audio'}
                onClick={() => setActiveTab('audio')}
            />
            <NavButton
                icon="video"
                label="Video Scripts"
                active={activeTab === 'videoscript'}
                onClick={() => setActiveTab('videoscript')}
            />
            <NavButton
                icon="bookmark"
                label="Templates"
                active={activeTab === 'templates'}
                onClick={() => setActiveTab('templates')}
            />
            <NavButton
                icon="layer-group"
                label="Bulk Generate"
                active={activeTab === 'bulk'}
                onClick={() => setActiveTab('bulk')}
            />
            <NavButton
                icon="calendar-alt"
                label="Calendar"
                active={activeTab === 'calendar'}
                onClick={() => setActiveTab('calendar')}
            />
            <NavButton
                icon="clock-rotate-left"
                label="History"
                active={activeTab === 'history'}
                onClick={() => setActiveTab('history')}
            />
            <NavButton
                icon="chart-simple"
                label="Insights"
                active={activeTab === 'insights'}
                onClick={() => setActiveTab('insights')}
            />
        </nav>

        <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/20 p-3">
                <p className="text-[11px] font-semibold text-sky-700 dark:text-sky-300">Campaigns</p>
                <p className="text-xl font-extrabold text-sky-900 dark:text-sky-100">{totalCampaigns}</p>
            </div>
            <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-3">
                <p className="text-[11px] font-semibold text-amber-700 dark:text-amber-300">Generated Posts</p>
                <p className="text-xl font-extrabold text-amber-900 dark:text-amber-100">{totalPosts}</p>
            </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-gradient-primary/5 dark:bg-gradient-primary/10 border border-indigo-200 dark:border-indigo-800 rounded-xl space-y-2">
            <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
                <i className="fas fa-keyboard"></i>
                Workflow
            </p>
            <div className="text-xs text-indigo-800 dark:text-indigo-300 space-y-1">
                <p><span className="font-mono font-semibold">Ctrl+Enter</span> Generate</p>
                <p>Quick templates</p>
                <p>Draft autosave</p>
            </div>
        </div>
    </div>
);
