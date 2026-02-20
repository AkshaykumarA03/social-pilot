// Form Components: Header, InputField, TextAreaField, ImageUploader, ActionButton
const { useState, useRef } = React;

// Professional Header Component
const Header = ({ isDarkMode, onDarkModeToggle, stats = {} }) => (
    <div className="mb-8 fade-in space-y-6">
        <div className="flex items-center justify-between mb-4">
            <div className="inline-block">
                <span className="badge-info px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                    <i className="fas fa-sparkles"></i>
                    AI-Powered Excellence
                </span>
            </div>
            <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={onDarkModeToggle} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
            Create Compelling Content in Seconds
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl leading-relaxed">
            Plan, generate, and review platform-specific posts with one workspace for execution and insights.
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-700">
                <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold">Campaigns</div>
                <div className="text-xl font-bold text-blue-900 dark:text-blue-200">{stats.totalCampaigns || 0}</div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-200 dark:border-amber-700">
                <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Generated Posts</div>
                <div className="text-xl font-bold text-amber-900 dark:text-amber-200">{stats.totalPosts || 0}</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-700">
                <div className="text-xs text-green-600 dark:text-green-400 font-semibold">Platforms Used</div>
                <div className="text-xl font-bold text-green-900 dark:text-green-200">{stats.uniquePlatforms || 0}</div>
            </div>
        </div>
    </div>
);

// Professional Input Component
const InputField = ({ label, type = "text", placeholder, value, onChange, required = false, icon = null }) => (
    <div className="fade-in">
        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
            {icon && <i className={`fas fa-${icon} text-indigo-600`}></i>}
            {label}
            {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="input-pro w-full px-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800"
        />
    </div>
);

// Professional Textarea Component
const TextAreaField = ({ label, placeholder, value, onChange, required = false, icon = null, showVoiceInput = false }) => (
    <div className="fade-in">
        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
            {icon && <i className={`fas fa-${icon} text-indigo-600`}></i>}
            {label}
            {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
            <textarea
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                rows="5"
                className="input-pro w-full px-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 resize-none"
            />
            {showVoiceInput && (
                <VoiceInput onTranscript={(text) => onChange({ target: { value: value + ' ' + text } })} />
            )}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            <i className="fas fa-info-circle mr-1"></i>
            {showVoiceInput ? 'Tap the microphone icon to dictate or type manually' : 'Include product name, features, and target audience for best results'}
        </p>
    </div>
);

// Professional Image Upload Component
const ImageUploader = ({ onImageSelect, preview }) => {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onImageSelect(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            onImageSelect(e.target.files[0]);
        }
    };

    return (
        <div className="fade-in">
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                <i className="fas fa-image text-indigo-600"></i>
                Product Image (Optional)
            </label>
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`transition-smooth relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer ${
                    dragActive
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 bg-gray-50 dark:bg-gray-800 hover:bg-indigo-50/50 dark:hover:bg-gray-700'
                }`}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                />
                {preview ? (
                    <div className="space-y-2">
                        <img src={preview} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                        <button
                            onClick={() => {
                                onImageSelect(null);
                                inputRef.current.value = '';
                            }}
                            className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center justify-center gap-1 mx-auto"
                        >
                            <i className="fas fa-trash"></i>
                            Remove Image
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3" onClick={() => inputRef.current?.click()}>
                        <div className="inline-block p-4 bg-gradient-primary rounded-full">
                            <i className="fas fa-cloud-arrow-up text-white text-2xl"></i>
                        </div>
                        <div>
                            <p className="text-gray-800 dark:text-gray-200 font-semibold">Drop image or click to upload</p>
                            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Supports JPG, PNG up to 10MB</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Professional Action Button
const ActionButton = ({ children, loading, disabled, className, icon, onClick }) => (
    <button
        onClick={onClick}
        disabled={loading || disabled}
        className={`btn-primary px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 w-full ${className} ${loading || disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
        {loading ? (
            <>
                <i className="fas fa-spinner fa-spin"></i>
                Generating...
            </>
        ) : (
            <>
                {icon && <i className={`fas fa-${icon}`}></i>}
                {children}
            </>
        )}
    </button>
);
