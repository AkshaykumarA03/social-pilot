// A/B Testing Component - Generate multiple variations
const { useState } = React;

const ABTesting = ({ onGenerate }) => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [platform, setPlatform] = useState('instagram');
    const [variations, setVariations] = useState([]);
    const [loading, setLoading] = useState(false);

    const toneVariations = ['professional', 'casual', 'humorous'];
    const ctaVariations = ['Shop Now', 'Learn More', 'Get Started', 'Try Free', 'Join Us'];

    const generateVariations = async () => {
        if (!productName.trim() || !description.trim()) {
            alert('Please fill in product name and description');
            return;
        }

        setLoading(true);
        const newVariations = [];

        try {
            for (const tone of toneVariations) {
                const formData = new FormData();
                formData.append('productName', productName);
                formData.append('productDescription', description);
                formData.append('tone', tone);
                formData.append('audience', 'general');
                formData.append('contentType', 'promotional');
                formData.append('platforms', platform);
                formData.append('includeHashtags', true);
                formData.append('includeEmojis', true);
                formData.append('includeCtA', true);
                formData.append('language', 'en');

                const response = await fetch('/api/generate', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                if (response.ok && data.content[platform]) {
                    newVariations.push({
                        id: Date.now() + Math.random(),
                        tone,
                        content: data.content[platform],
                        votes: 0,
                        impressions: 0,
                        ctr: 0
                    });
                }

                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            setVariations(newVariations);
        } catch (error) {
            alert('Error generating variations: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVote = (id) => {
        setVariations(variations.map(v => 
            v.id === id ? { ...v, votes: v.votes + 1 } : v
        ));
    };

    const winner = variations.length > 0 ? variations.reduce((prev, current) => 
        (prev.votes > current.votes) ? prev : current
    ) : null;

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg-pro p-8 space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
                        <i className="fas fa-flask text-indigo-600"></i>
                        A/B Testing Lab
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Generate and compare multiple content variations</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
                            Product Name
                        </label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="e.g., Premium Coffee Maker"
                            className="input-pro w-full px-4 py-3 border-2 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
                            Platform
                        </label>
                        <select
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                            className="input-pro w-full px-4 py-3 border-2 rounded-xl"
                        >
                            <option value="instagram">Instagram</option>
                            <option value="facebook">Facebook</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="x">X (Twitter)</option>
                            <option value="tiktok">TikTok</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your product..."
                        rows="4"
                        className="input-pro w-full px-4 py-3 border-2 rounded-xl resize-none"
                    />
                </div>

                <button
                    onClick={generateVariations}
                    disabled={loading}
                    className="btn-primary w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <i className="fas fa-spinner fa-spin"></i>
                            Generating Variations...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-magic"></i>
                            Generate 3 Variations
                        </>
                    )}
                </button>
            </div>

            {variations.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Test Results
                        </h3>
                        {winner && (
                            <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 rounded-full text-sm font-semibold flex items-center gap-2">
                                <i className="fas fa-trophy"></i>
                                Winner: {winner.tone}
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {variations.map((variation) => (
                            <div
                                key={variation.id}
                                className={`bg-white dark:bg-gray-800 rounded-xl shadow-md-pro p-6 space-y-4 hover-lift ${
                                    winner && winner.id === variation.id ? 'ring-2 ring-yellow-500' : ''
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-semibold capitalize">
                                        {variation.tone}
                                    </span>
                                    <button
                                        onClick={() => handleVote(variation.id)}
                                        className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs font-semibold hover:bg-green-200 dark:hover:bg-green-800 transition-smooth"
                                    >
                                        <i className="fas fa-thumbs-up"></i>
                                        {variation.votes}
                                    </button>
                                </div>

                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-6">
                                    {variation.content}
                                </p>

                                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Votes</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">{variation.votes}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Length</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">{variation.content.length}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Words</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">{variation.content.split(' ').length}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(variation.content);
                                        alert('Copied to clipboard!');
                                    }}
                                    className="w-full py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-smooth"
                                >
                                    <i className="fas fa-copy mr-2"></i>
                                    Copy
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
