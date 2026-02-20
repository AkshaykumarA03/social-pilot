// Video Script Generator Component
const { useState } = React;

const VideoScriptGenerator = () => {
    const [topic, setTopic] = useState('');
    const [platform, setPlatform] = useState('tiktok');
    const [duration, setDuration] = useState('60');
    const [loading, setLoading] = useState(false);
    const [script, setScript] = useState(null);

    const platforms = [
        { id: 'tiktok', name: 'TikTok', durations: ['15', '30', '60', '180'] },
        { id: 'youtube', name: 'YouTube Shorts', durations: ['60'] },
        { id: 'youtube-long', name: 'YouTube Video', durations: ['300', '600', '900'] }
    ];

    const generateScript = async () => {
        if (!topic.trim()) {
            alert('Please enter a video topic');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productDescription: `Create a ${duration}-second video script for ${platform} about: ${topic}. Include hook, main content, and call-to-action.`,
                    platforms: 'instagram',
                    productName: topic
                })
            });

            const data = await response.json();
            
            const scriptData = {
                hook: `🎬 HOOK (0-3s): Attention-grabbing opening`,
                mainContent: data.content?.instagram || 'Script content here...',
                cta: `📢 CTA: Like, follow, and share!`,
                scenes: [
                    { time: '0-3s', action: 'Hook - Grab attention', visual: 'Close-up shot' },
                    { time: '3-15s', action: 'Problem/Question', visual: 'B-roll footage' },
                    { time: '15-45s', action: 'Solution/Answer', visual: 'Main content' },
                    { time: '45-60s', action: 'Call to action', visual: 'End screen' }
                ],
                hashtags: ['#viral', '#trending', '#fyp', '#contentcreator'],
                music: 'Upbeat, trending audio'
            };
            
            setScript(scriptData);
        } catch (error) {
            alert('Failed to generate script: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg-pro p-8 space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
                        <i className="fas fa-video text-indigo-600"></i>
                        Video Script Generator
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Create professional video scripts for TikTok and YouTube</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
                            Video Topic
                        </label>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g., 5 Tips for Better Sleep"
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
                                {platforms.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                Duration (seconds)
                            </label>
                            <select
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="input-pro w-full px-4 py-3 border-2 rounded-xl"
                            >
                                {platforms.find(p => p.id === platform)?.durations.map(d => (
                                    <option key={d} value={d}>{d}s</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={generateScript}
                        disabled={loading}
                        className="btn-primary w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <i className="fas fa-spinner fa-spin"></i>
                                Generating Script...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-wand-magic-sparkles"></i>
                                Generate Script
                            </>
                        )}
                    </button>
                </div>
            </div>

            {script && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg-pro p-8 space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Generated Script</h3>
                    
                    <div className="space-y-4">
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                            <p className="font-semibold text-red-900 dark:text-red-200 mb-2">{script.hook}</p>
                        </div>
                        
                        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{script.mainContent}</p>
                        </div>
                        
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                            <p className="font-semibold text-green-900 dark:text-green-200">{script.cta}</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Scene Breakdown</h4>
                        <div className="space-y-2">
                            {script.scenes.map((scene, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 min-w-[60px]">{scene.time}</span>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{scene.action}</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">{scene.visual}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Hashtags</p>
                            <div className="flex flex-wrap gap-2">
                                {script.hashtags.map((tag, idx) => (
                                    <span key={idx} className="text-xs px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Music Suggestion</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{script.music}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            const scriptText = `${script.hook}\n\n${script.mainContent}\n\n${script.cta}\n\nHashtags: ${script.hashtags.join(' ')}`;
                            navigator.clipboard.writeText(scriptText);
                            alert('Script copied to clipboard!');
                        }}
                        className="btn-secondary w-full py-3 rounded-xl"
                    >
                        <i className="fas fa-copy mr-2"></i>
                        Copy Script
                    </button>
                </div>
            )}
        </div>
    );
};
