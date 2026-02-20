// UI Components: DarkModeToggle, PlatformSelector, ToneSelector, NavButton

// Dark Mode Toggle Button
const DarkModeToggle = ({ isDarkMode, setIsDarkMode }) => (
    <button
        onClick={() => {
            setIsDarkMode(!isDarkMode);
            localStorage.setItem('darkMode', !isDarkMode ? 'true' : 'false');
            document.body.classList.toggle('dark-mode');
        }}
        className="transition-smooth p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        title="Toggle Dark Mode"
    >
        <i className={`fas fa-${isDarkMode ? 'sun' : 'moon'} text-lg text-indigo-600`}></i>
    </button>
);

// Platform Selector
const PlatformSelector = ({ selectedPlatforms, onToggle }) => {
    const platforms = [
        { id: 'instagram', name: 'Instagram', icon: 'instagram', bestTime: '9-11am, 7-9pm' },
        { id: 'facebook', name: 'Facebook', icon: 'facebook', bestTime: '1-3pm, 7-9pm' },
        { id: 'tiktok', name: 'TikTok', icon: 'tiktok', bestTime: '6-10am, 7-11pm' },
        { id: 'youtube', name: 'YouTube', icon: 'youtube', bestTime: '1-4pm, 8-11pm' },
        { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin', bestTime: '7-9am, 12-1pm' },
        { id: 'x', name: 'X', icon: 'x-twitter', bestTime: '8am-12pm, 5-6pm' },
        { id: 'pinterest', name: 'Pinterest', icon: 'pinterest', bestTime: '2-4pm, 8-11pm' },
        { id: 'snapchat', name: 'Snapchat', icon: 'snapchat', bestTime: '4-8pm, 8-11pm' },
        { id: 'reddit', name: 'Reddit', icon: 'reddit', bestTime: '6-8am, 5-7pm' },
        { id: 'discord', name: 'Discord', icon: 'discord', bestTime: '5-10pm' },
        { id: 'telegram', name: 'Telegram', icon: 'paper-plane', bestTime: '9am-12pm, 7-9pm' },
        { id: 'whatsapp', name: 'WhatsApp', icon: 'whatsapp', bestTime: '9am-12pm, 9-10pm' },
    ];

    return (
        <div className="fade-in space-y-4">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-gray-900 dark:text-gray-100">
                    <i className="fas fa-share-nodes text-indigo-600 mr-2"></i>
                    Select Platforms ({selectedPlatforms.length})
                </label>
                <span className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full">
                    {selectedPlatforms.length} selected
                </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {platforms.map(platform => (
                    <label key={platform.id} className="group flex flex-col gap-1 cursor-pointer p-3 rounded-lg border-2 border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-smooth">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="w-4 h-4 cursor-pointer accent-indigo-600"
                                checked={selectedPlatforms.includes(platform.id)}
                                onChange={() => onToggle(platform.id)}
                            />
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                                <i className={`fab fa-${platform.icon} mr-1`}></i>
                                {platform.name}
                            </span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-6">
                            Best: {platform.bestTime}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
};

// Tone Selector
const ToneSelector = ({ selectedTone, onSelect }) => {
    const tones = [
        { id: 'professional', name: 'Professional', desc: 'Formal & Business', icon: 'briefcase' },
        { id: 'casual', name: 'Casual', desc: 'Friendly & Relaxed', icon: 'smile' },
        { id: 'humorous', name: 'Humorous', desc: 'Witty & Funny', icon: 'laugh' },
    ];

    return (
        <div className="fade-in space-y-3">
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100">
                <i className="fas fa-palette text-indigo-600 mr-2"></i>
                Content Tone
            </label>
            <div className="grid grid-cols-1 gap-2">
                {tones.map(tone => (
                    <button
                        key={tone.id}
                        onClick={() => onSelect(tone.id)}
                        className={`p-3 rounded-lg transition-smooth text-left border-2 ${
                            selectedTone === tone.id
                                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <i className={`fas fa-${tone.icon} text-indigo-600`}></i>
                            <div>
                                <p className="font-semibold text-sm text-gray-900 dark:text-white">{tone.name}</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{tone.desc}</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

// Professional Navigation Button
const NavButton = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`transition-smooth w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
            active
                ? 'bg-gradient-primary text-white shadow-md-pro'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
        }`}
    >
        <i className={`fas fa-${icon} text-lg`}></i>
        <span>{label}</span>
    </button>
);
