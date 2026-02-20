// Bulk Generation Component
const { useState } = React;

const BulkGeneration = ({ onGenerate }) => {
    const [products, setProducts] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleBulkGenerate = async () => {
        const productList = products.split('\n').filter(p => p.trim());
        
        if (productList.length === 0) {
            alert('Please enter at least one product');
            return;
        }

        setLoading(true);
        setProgress(0);

        for (let i = 0; i < productList.length; i++) {
            try {
                const formData = new FormData();
                formData.append('productName', productList[i]);
                formData.append('productDescription', productList[i]);
                formData.append('tone', 'professional');
                formData.append('audience', 'general');
                formData.append('contentType', 'promotional');
                formData.append('platforms', 'instagram,linkedin,x,facebook');
                formData.append('includeHashtags', true);
                formData.append('includeEmojis', true);
                formData.append('includeCtA', true);
                formData.append('language', 'en');

                const response = await fetch('/api/generate', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                if (response.ok) {
                    onGenerate({
                        productName: productList[i],
                        description: productList[i],
                        tone: 'professional',
                        platforms: ['instagram', 'linkedin', 'x', 'facebook'],
                        content: data.content || {},
                        image: null,
                        timestamp: new Date().toISOString(),
                    });
                }

                setProgress(((i + 1) / productList.length) * 100);
                
                // Small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
                console.error(`Error generating for ${productList[i]}:`, error);
            }
        }

        setLoading(false);
        setProducts('');
        alert(`Successfully generated content for ${productList.length} products!`);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg-pro p-8 space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
                    <i className="fas fa-layer-group text-indigo-600"></i>
                    Bulk Content Generation
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Generate content for multiple products at once</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
                        <i className="fas fa-list text-indigo-600 mr-2"></i>
                        Product List (one per line)
                    </label>
                    <textarea
                        value={products}
                        onChange={(e) => setProducts(e.target.value)}
                        placeholder="Premium Coffee Maker&#10;Wireless Headphones&#10;Smart Watch&#10;Yoga Mat"
                        rows="10"
                        className="input-pro w-full px-4 py-3 border-2 rounded-xl resize-none"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {products.split('\n').filter(p => p.trim()).length} products
                    </p>
                </div>

                {loading && (
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Generating...</span>
                            <span className="font-semibold text-indigo-600">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                <button
                    onClick={handleBulkGenerate}
                    disabled={loading || !products.trim()}
                    className="btn-primary w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <i className="fas fa-spinner fa-spin"></i>
                            Generating...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-bolt"></i>
                            Generate All
                        </>
                    )}
                </button>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <p className="text-sm text-blue-900 dark:text-blue-200 font-medium flex items-center gap-2">
                    <i className="fas fa-info-circle"></i>
                    Tip
                </p>
                <p className="text-xs text-blue-800 dark:text-blue-300 mt-1">
                    Each product will be generated with default settings. You can customize individual posts later from the History tab.
                </p>
            </div>
        </div>
    );
};
