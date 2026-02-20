// Carousel Post Creator Component
const { useState } = React;

const CarouselCreator = () => {
    const [topic, setTopic] = useState('');
    const [platform, setPlatform] = useState('instagram');
    const [slideCount, setSlideCount] = useState('5');
    const [loading, setLoading] = useState(false);
    const [carousel, setCarousel] = useState(null);

    const generateCarousel = async () => {
        if (!topic.trim()) {
            alert('Please enter a topic');
            return;
        }

        setLoading(true);
        try {
            const slides = [];
            
            // Generate images for each slide
            for (let i = 1; i <= parseInt(slideCount); i++) {
                const imagePrompt = encodeURIComponent(`${topic} slide ${i} professional ${platform} post`);
                const imageUrl = `https://image.pollinations.ai/prompt/${imagePrompt}?width=1080&height=1080&seed=${Date.now() + i}&nologo=true`;
                
                slides.push({
                    number: i,
                    title: i === 1 ? topic : `Point ${i-1}`,
                    content: `Slide ${i} content about ${topic}`,
                    design: i === 1 ? 'Cover slide with bold title' : `Content slide ${i}`,
                    imageUrl: imageUrl,
                    imagePrompt: `${topic} slide ${i} visual`
                });
            }

            setCarousel({
                topic,
                platform,
                slides,
                caption: `📱 Swipe to learn about ${topic}! ➡️\n\n#carousel #${platform} #content`,
                colors: ['#667eea', '#764ba2', '#f093fb'],
                fonts: ['Bold Sans-Serif', 'Clean Modern']
            });
        } catch (error) {
            alert('Failed to generate carousel: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg-pro p-8 space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
                        <i className="fas fa-images text-indigo-600"></i>
                        Carousel Post Creator
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Create multi-slide carousel posts for Instagram and LinkedIn</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
                            Carousel Topic
                        </label>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g., 5 Marketing Tips for Startups"
                            className="input-pro w-full px-4 py-3 border-2 rounded-xl"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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
                                <option value="linkedin">LinkedIn</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                Number of Slides
                            </label>
                            <select
                                value={slideCount}
                                onChange={(e) => setSlideCount(e.target.value)}
                                className="input-pro w-full px-4 py-3 border-2 rounded-xl"
                            >
                                {[3,4,5,6,7,8,9,10].map(n => (
                                    <option key={n} value={n}>{n} slides</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={generateCarousel}
                        disabled={loading}
                        className="btn-primary w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <i className="fas fa-spinner fa-spin"></i>
                                Generating Carousel...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-wand-magic-sparkles"></i>
                                Generate Carousel
                            </>
                        )}
                    </button>
                </div>
            </div>

            {carousel && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg-pro p-8 space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Carousel Preview</h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {carousel.slides.map((slide) => (
                            <div key={slide.number} className="relative group">
                                <div className="aspect-square rounded-xl overflow-hidden hover:scale-105 transition-transform shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                                    <img 
                                        src={slide.imageUrl} 
                                        alt={slide.title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black/70 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center">
                                    <p className="text-white text-xs font-semibold mb-1">{slide.title}</p>
                                    <p className="text-white text-xs opacity-80">{slide.design}</p>
                                </div>
                                <div className="absolute top-2 left-2 bg-white text-gray-900 text-xs font-bold px-2 py-1 rounded shadow-lg">
                                    {slide.number}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Caption</h4>
                            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">{carousel.caption}</p>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Design Guidelines</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Color Palette</p>
                                    <div className="flex gap-2">
                                        {carousel.colors.map((color, idx) => (
                                            <div key={idx} className="w-8 h-8 rounded" style={{backgroundColor: color}}></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Fonts</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">{carousel.fonts.join(', ')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    const data = JSON.stringify(carousel, null, 2);
                                    const blob = new Blob([data], { type: 'application/json' });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = 'carousel-data.json';
                                    a.click();
                                }}
                                className="flex-1 btn-secondary py-3 rounded-xl"
                            >
                                <i className="fas fa-download mr-2"></i>
                                Download Data
                            </button>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(carousel.caption);
                                    alert('Caption copied!');
                                }}
                                className="flex-1 btn-secondary py-3 rounded-xl"
                            >
                                <i className="fas fa-copy mr-2"></i>
                                Copy Caption
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
