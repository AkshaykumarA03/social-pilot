// BrandVoiceManager Component
const { useState } = React;

const BrandVoiceManager = ({ brandVoice, setBrandVoice }) => {
    const [newAdjective, setNewAdjective] = useState('');
    const [writingSample, setWritingSample] = useState('');
    const [showForm, setShowForm] = useState(false);

    const addAdjective = () => {
        if (newAdjective.trim() && brandVoice.adjectives.length < 5) {
            setBrandVoice({
                ...brandVoice,
                adjectives: [...brandVoice.adjectives, newAdjective.trim()],
            });
            setNewAdjective('');
        }
    };

    const removeAdjective = (index) => {
        setBrandVoice({
            ...brandVoice,
            adjectives: brandVoice.adjectives.filter((_, i) => i !== index),
        });
    };

    const saveSample = () => {
        if (writingSample.trim()) {
            setBrandVoice({
                ...brandVoice,
                writingSample: writingSample.trim(),
            });
            setShowForm(false);
        }
    };

    return (
        <div className="fade-in space-y-3">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-gray-900 dark:text-gray-100">
                    <i className="fas fa-palette text-indigo-600 mr-2"></i>
                    Brand Voice
                </label>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-smooth"
                >
                    {showForm ? 'Done' : 'Edit'}
                </button>
            </div>

            {showForm ? (
                <div className="space-y-3">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                            Add Personality Adjectives (Max 5)
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="e.g., Witty, Professional, Bold"
                                value={newAdjective}
                                onChange={(e) => setNewAdjective(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addAdjective()}
                                className="flex-1 input-pro px-3 py-2 border-2 rounded-lg text-sm"
                            />
                            <button
                                onClick={addAdjective}
                                disabled={brandVoice.adjectives.length >= 5}
                                className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-smooth"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                            Past Writing Sample
                        </label>
                        <textarea
                            placeholder="Paste an example of your writing style..."
                            value={writingSample}
                            onChange={(e) => setWritingSample(e.target.value)}
                            className="input-pro w-full px-3 py-2 border-2 rounded-lg text-sm resize-none h-20"
                        />
                        <button
                            onClick={saveSample}
                            className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-smooth"
                        >
                            Save Sample
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                        {brandVoice.adjectives.map((adj, idx) => (
                            <div key={idx} className="brand-tag">
                                {adj}
                                <button
                                    onClick={() => removeAdjective(idx)}
                                    className="ml-auto"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        {brandVoice.adjectives.length === 0 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 italic">No adjectives set yet</span>
                        )}
                    </div>
                    {brandVoice.writingSample && (
                        <div className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded border-l-2 border-indigo-600">
                            <strong>Sample:</strong> "{brandVoice.writingSample.substring(0, 60)}..."
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
