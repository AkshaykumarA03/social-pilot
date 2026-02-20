// ContentCards Component - Display generated content
const ContentCards = ({ content, onPreview, image }) => {
    if (!content || Object.keys(content).length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md-pro p-12 text-center">
                <div className="inline-block p-4 bg-gradient-primary/10 rounded-full mb-4">
                    <i className="fas fa-sparkles text-indigo-600 text-3xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Content Generated Yet</h3>
                <p className="text-gray-600 dark:text-gray-400">Create a campaign to see AI-generated content for all platforms</p>
            </div>
        );
    }

    const platforms = [
        { key: 'instagram', name: 'Instagram', icon: 'instagram', gradient: 'gradient-instagram', delay: 0 },
        { key: 'facebook', name: 'Facebook', icon: 'facebook', gradient: 'gradient-facebook', delay: 50 },
        { key: 'tiktok', name: 'TikTok', icon: 'tiktok', gradient: 'gradient-tiktok', delay: 100 },
        { key: 'youtube', name: 'YouTube', icon: 'youtube', gradient: 'gradient-youtube', delay: 150 },
        { key: 'linkedin', name: 'LinkedIn', icon: 'linkedin', gradient: 'gradient-linkedin', delay: 200 },
        { key: 'x', name: 'X', icon: 'x-twitter', gradient: 'gradient-x', delay: 250 },
        { key: 'pinterest', name: 'Pinterest', icon: 'pinterest', gradient: 'gradient-pinterest', delay: 300 },
        { key: 'snapchat', name: 'Snapchat', icon: 'snapchat', gradient: 'gradient-snapchat', delay: 350 },
        { key: 'reddit', name: 'Reddit', icon: 'reddit', gradient: 'gradient-reddit', delay: 400 },
        { key: 'discord', name: 'Discord', icon: 'discord', gradient: 'gradient-discord', delay: 450 },
        { key: 'telegram', name: 'Telegram', icon: 'paper-plane', gradient: 'gradient-telegram', delay: 500 },
        { key: 'whatsapp', name: 'WhatsApp', icon: 'whatsapp', gradient: 'gradient-whatsapp', delay: 550 },
    ];

    const postingWindows = {
        instagram: '9-11am or 7-9pm',
        facebook: '1-3pm or 7-9pm',
        tiktok: '6-10am or 7-11pm',
        youtube: '1-4pm or 8-11pm',
        linkedin: '7-9am or 12-1pm',
        x: '8am-12pm or 5-6pm',
        pinterest: '2-4pm or 8-11pm',
        snapchat: '4-8pm',
        reddit: '6-8am or 5-7pm',
        discord: '5-10pm',
        telegram: '9am-12pm or 7-9pm',
        whatsapp: '9am-12pm or 9-10pm',
    };

    const generatedPlatforms = Object.keys(content);

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <i className="fas fa-share-nodes text-indigo-600"></i>
                    Generated Content
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Optimized for each platform. Ready to customize and publish.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {platforms.map((platform) => (
                    content[platform.key] && (
                        <ContentCard
                            key={platform.key}
                            platform={platform.name}
                            content={content[platform.key]}
                            icon={platform.icon}
                            gradient={platform.gradient}
                            delay={platform.delay}
                            onPreview={onPreview}
                            image={image}
                        />
                    )
                ))}
            </div>

            <div className="rounded-xl border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-900/20 p-5">
                <h3 className="text-sm font-bold text-cyan-900 dark:text-cyan-200 mb-3 flex items-center gap-2">
                    <i className="fas fa-calendar-days"></i>
                    Suggested Posting Windows
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {generatedPlatforms.map((platformKey) => (
                        <div key={platformKey} className="rounded-lg bg-white/70 dark:bg-slate-900/30 px-3 py-2 text-cyan-900 dark:text-cyan-200 border border-cyan-100 dark:border-cyan-900">
                            <span className="capitalize font-semibold">{platformKey}</span>: {postingWindows[platformKey] || 'Best audience active hours'}
                        </div>
                    ))}
                </div>
            </div>

            {/* Platform Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
                    <h3 className="text-sm font-bold text-blue-900 dark:text-blue-200 mb-3 flex items-center gap-2">
                        <i className="fas fa-info-circle"></i>
                        Engagement Tips
                    </h3>
                    <ul className="text-xs text-blue-800 dark:text-blue-300 space-y-2">
                        <li>Use platform-specific posting windows</li>
                        <li>Use 3-5 relevant hashtags per post</li>
                        <li>Keep the first line strong and clear</li>
                        <li>End with one clear call-to-action</li>
                    </ul>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
                    <h3 className="text-sm font-bold text-purple-900 dark:text-purple-200 mb-3 flex items-center gap-2">
                        <i className="fas fa-chart-line"></i>
                        Performance Tips
                    </h3>
                    <ul className="text-xs text-purple-800 dark:text-purple-300 space-y-2">
                        <li>Vary content types week to week</li>
                        <li>Keep text concise and scannable</li>
                        <li>Use links where conversion matters</li>
                        <li>Mix video and static creatives</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
