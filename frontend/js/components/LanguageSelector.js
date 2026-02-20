// LanguageSelector Component
const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
    const languages = [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'es', name: 'Spanish', flag: '🇪🇸' },
        { code: 'fr', name: 'French', flag: '🇫🇷' },
        { code: 'de', name: 'German', flag: '🇩🇪' },
        { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
        { code: 'it', name: 'Italian', flag: '🇮🇹' },
        { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
        { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    ];

    return (
        <div className="fade-in">
            <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">
                <i className="fas fa-globe text-indigo-600 mr-2"></i>
                Language
            </label>
            <select
                value={selectedLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="input-pro w-full px-3 py-2 border-2 rounded-lg text-sm"
            >
                {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
