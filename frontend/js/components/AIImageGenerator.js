// AI Image Generator Component
const { useState } = React;

const AIImageGenerator = () => {
    const [prompt, setPrompt] = useState('');
    const [generatedImages, setGeneratedImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const styles = [
        { id: 'realistic', name: 'Realistic', prompt: 'photorealistic, high quality, detailed' },
        { id: 'artistic', name: 'Artistic', prompt: 'artistic, creative, vibrant colors' },
        { id: 'minimal', name: 'Minimal', prompt: 'minimalist, clean, simple design' },
        { id: 'vintage', name: 'Vintage', prompt: 'vintage style, retro, nostalgic' },
        { id: '3d', name: '3D Render', prompt: '3D render, CGI, modern' },
        { id: 'cartoon', name: 'Cartoon', prompt: 'cartoon style, illustrated, fun' }
    ];

    const quickPrompts = [
        'Modern coffee shop interior with natural lighting',
        'Minimalist product photography on white background',
        'Vibrant social media banner with geometric shapes',
        'Professional business team in modern office',
        'Colorful food photography with fresh ingredients',
        'Tech gadget on sleek dark background'
    ];

    const generateImage = async (customPrompt = null) => {
        const finalPrompt = customPrompt || prompt;
        
        if (!finalPrompt.trim()) {
            alert('Please enter a prompt');
            return;
        }

        setLoading(true);

        try {
            console.log('Sending request to generate image...');
            
            const response = await fetch('/api/generate-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: finalPrompt })
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok) {
                // Add image immediately
                const newImage = {
                    id: Date.now(),
                    url: data.imageUrl,
                    prompt: finalPrompt,
                    timestamp: new Date().toISOString()
                };
                
                console.log('Adding image:', newImage);
                setGeneratedImages([newImage, ...generatedImages]);
                
                // Show success message
                alert('Image generated! It may take a few seconds to load.');
            } else {
                alert('Error: ' + (data.error || 'Failed to generate image'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Connection Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const downloadImage = async (url, prompt) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = `ai-image-${Date.now()}.png`;
            a.click();
        } catch (error) {
            alert('Download failed: ' + error.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg-pro p-8 space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
                        <i className="fas fa-image text-indigo-600"></i>
                        AI Image Generator
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Create stunning images with AI for your social media posts</p>
                </div>

                {/* Prompt Input */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
                            <i className="fas fa-wand-magic-sparkles text-indigo-600 mr-2"></i>
                            Describe your image
                        </label>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., A modern coffee cup on a wooden table with morning sunlight"
                            rows="4"
                            className="input-pro w-full px-4 py-3 border-2 rounded-xl resize-none"
                        />
                    </div>

                    <button
                        onClick={() => generateImage()}
                        disabled={loading}
                        className="btn-primary w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <i className="fas fa-spinner fa-spin"></i>
                                Generating Image...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-sparkles"></i>
                                Generate Image
                            </>
                        )}
                    </button>
                    
                    {/* Test Button */}
                    <button
                        onClick={() => {
                            const testUrl = `https://image.pollinations.ai/prompt/beautiful%20sunset%20over%20ocean?width=512&height=512&seed=${Date.now()}&nologo=true`;
                            window.open(testUrl, '_blank');
                        }}
                        className="btn-secondary w-full py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                    >
                        <i className="fas fa-vial"></i>
                        Test Image Generation
                    </button>
                </div>

                {/* Quick Prompts */}
                <div>
                    <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
                        <i className="fas fa-bolt text-indigo-600 mr-2"></i>
                        Quick Prompts
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {quickPrompts.map((qp, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setPrompt(qp);
                                    generateImage(qp);
                                }}
                                className="text-left text-sm px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/20 hover:text-indigo-700 dark:hover:text-indigo-300 transition-smooth"
                            >
                                {qp}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Style Presets */}
                <div>
                    <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
                        <i className="fas fa-palette text-indigo-600 mr-2"></i>
                        Style Presets
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                        {styles.map(style => (
                            <button
                                key={style.id}
                                onClick={() => {
                                    const styledPrompt = `${prompt}, ${style.prompt}`;
                                    generateImage(styledPrompt);
                                }}
                                className="px-4 py-2 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 text-gray-700 dark:text-gray-300 rounded-lg hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/40 dark:hover:to-purple-900/40 transition-smooth text-sm font-semibold"
                            >
                                {style.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Generated Images Gallery */}
            {generatedImages.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg-pro p-8 space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <i className="fas fa-images text-indigo-600"></i>
                        Generated Images ({generatedImages.length})
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {generatedImages.map(img => (
                            <div key={img.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl overflow-hidden hover-lift">
                                <div className="aspect-square relative bg-gray-200 dark:bg-gray-600">
                                    <img
                                        src={img.url}
                                        alt={img.prompt}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage Loading...%3C/text%3E%3C/svg%3E';
                                        }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 opacity-0 hover:opacity-100 transition-opacity">
                                        <span className="text-white text-sm font-semibold">Click to view full size</span>
                                    </div>
                                </div>
                                <div className="p-4 space-y-3">
                                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                                        {img.prompt}
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => downloadImage(img.url, img.prompt)}
                                            className="flex-1 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-smooth"
                                        >
                                            <i className="fas fa-download mr-2"></i>
                                            Download
                                        </button>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(img.url);
                                                alert('Image URL copied!');
                                            }}
                                            className="flex-1 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-smooth"
                                        >
                                            <i className="fas fa-link mr-2"></i>
                                            Copy URL
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-5">
                <p className="text-sm text-blue-900 dark:text-blue-200 font-medium flex items-center gap-2 mb-2">
                    <i className="fas fa-info-circle"></i>
                    Pro Tips
                </p>
                <ul className="text-xs text-blue-800 dark:text-blue-300 space-y-1 ml-6 list-disc">
                    <li>Be specific with details (colors, lighting, mood)</li>
                    <li>Use style presets for consistent results</li>
                    <li>Images are generated in 1024x1024 resolution</li>
                    <li>Perfect for Instagram, Facebook, and LinkedIn posts</li>
                </ul>
            </div>
        </div>
    );
};
