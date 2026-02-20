// ContentCard Component
const { useState } = React;

const ContentCard = ({ platform, content, icon, gradient, delay = 0, onPreview, image }) => {
    const [copied, setCopied] = useState(false);

    // Platform character limits
    const platformLimits = {
        'Instagram': 2200,
        'Facebook': 63000,
        'TikTok': 150,
        'YouTube': 5000,
        'LinkedIn': 3000,
        'X': 280,
        'Pinterest': 500,
        'Snapchat': 250,
        'Reddit': 40000,
        'Discord': 2000,
        'Telegram': 4096,
        'WhatsApp': 4096,
    };

    // Platform URLs
    const platformUrls = {
        'Instagram': 'https://www.instagram.com/',
        'Facebook': 'https://www.facebook.com/',
        'TikTok': 'https://www.tiktok.com/upload',
        'YouTube': 'https://studio.youtube.com/',
        'LinkedIn': 'https://www.linkedin.com/feed/',
        'X': 'https://twitter.com/compose/tweet',
        'Pinterest': 'https://www.pinterest.com/pin/create/button/',
        'Snapchat': 'https://www.snapchat.com/',
        'Reddit': 'https://www.reddit.com/submit',
        'Discord': 'https://discord.com/',
        'Telegram': 'https://web.telegram.org/',
        'WhatsApp': 'https://web.whatsapp.com/',
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = () => {
        handleCopy();
        window.open(platformUrls[platform], '_blank');
    };

    const charLimit = platformLimits[platform] || 1000;
    const charPercentage = (content.length / charLimit) * 100;
    const isOverLimit = content.length > charLimit;

    return (
        <div style={{ animationDelay: `${delay}ms` }} className="fade-in hover-lift rounded-2xl overflow-hidden bg-white dark:bg-gray-800">
            {/* Header with Gradient */}
            <div className={`${gradient} p-6 text-white`}>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-200">
                            <PlatformIcon platform={platform} className="text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">{platform}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6 space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-6">{content}</p>

                {/* Character Limit Progress */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">Character Limit</span>
                        <span className={`font-bold ${isOverLimit ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                            {content.length}/{charLimit}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                        <div
                            className={`h-full transition-smooth ${isOverLimit ? 'bg-red-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`}
                            style={{ width: `${Math.min(charPercentage, 100)}%` }}
                        ></div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3">
                    <span className="flex items-center gap-1">
                        <i className="fas fa-font"></i>
                        {content.length} chars
                    </span>
                    <span className="flex items-center gap-1">
                        <i className="fas fa-comments"></i>
                        {content.split(' ').length} words
                    </span>
                    <span className="flex items-center gap-1">
                        <i className="fas fa-heart"></i>
                        {Math.round(content.split(' ').length / 100)}min
                    </span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2">
                    <button
                        onClick={() => onPreview && onPreview(platform, content)}
                        className="transition-smooth py-2 px-3 rounded-lg font-medium text-xs flex items-center justify-center gap-2 bg-gradient-to-r from-blue-50 dark:from-blue-900 to-blue-100 dark:to-blue-800 hover:from-blue-100 dark:hover:from-blue-800 hover:to-blue-150 dark:hover:to-blue-700 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-blue-700 hover-lift"
                    >
                        <i className="fas fa-mobile"></i>
                        Preview
                    </button>
                    <button
                        onClick={handleCopy}
                        className="transition-smooth py-2 px-3 rounded-lg font-medium text-xs flex items-center justify-center gap-2 bg-gradient-to-r from-gray-50 dark:from-gray-700 to-gray-100 dark:to-gray-600 hover:from-gray-100 dark:hover:from-gray-600 hover:to-gray-150 dark:hover:to-gray-500 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 hover-lift"
                    >
                        <i className={`fas fa-${copied ? 'check' : 'copy'}`}></i>
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                        onClick={handleShare}
                        className="transition-smooth py-2 px-3 rounded-lg font-medium text-xs flex items-center justify-center gap-2 bg-gradient-to-r from-green-50 dark:from-green-900 to-green-100 dark:to-green-800 hover:from-green-100 dark:hover:from-green-800 hover:to-green-150 dark:hover:to-green-700 text-green-700 dark:text-green-200 border border-green-200 dark:border-green-700 hover-lift"
                    >
                        <i className="fas fa-share"></i>
                        Share
                    </button>
                </div>
                
                {/* Quick Actions */}
                <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                    <button
                        onClick={() => {
                            const blob = new Blob([content], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `${platform.toLowerCase()}-post.txt`;
                            a.click();
                        }}
                        className="flex-1 text-xs py-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded transition-smooth"
                    >
                        <i className="fas fa-download mr-1"></i>
                        Download
                    </button>
                    <button
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({ text: content });
                            } else {
                                handleCopy();
                            }
                        }}
                        className="flex-1 text-xs py-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded transition-smooth"
                    >
                        <i className="fas fa-paper-plane mr-1"></i>
                        Send
                    </button>
                    <button
                        onClick={() => {
                            // Create canvas for video frame
                            const canvas = document.createElement('canvas');
                            canvas.width = 1080;
                            canvas.height = 1080;
                            const ctx = canvas.getContext('2d');
                            
                            // Background gradient
                            const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
                            gradient.addColorStop(0, '#667eea');
                            gradient.addColorStop(1, '#764ba2');
                            ctx.fillStyle = gradient;
                            ctx.fillRect(0, 0, 1080, 1080);
                            
                            // Add image if available
                            if (image) {
                                const img = new Image();
                                img.onload = () => {
                                    ctx.drawImage(img, 0, 0, 1080, 720);
                                    addTextToCanvas();
                                };
                                img.src = image;
                            } else {
                                addTextToCanvas();
                            }
                            
                            function addTextToCanvas() {
                                // Add text overlay
                                ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
                                ctx.fillRect(0, 720, 1080, 360);
                                
                                ctx.fillStyle = 'white';
                                ctx.font = 'bold 40px Arial';
                                ctx.textAlign = 'center';
                                
                                // Wrap text
                                const words = content.split(' ');
                                let line = '';
                                let y = 780;
                                
                                for (let i = 0; i < words.length && y < 1050; i++) {
                                    const testLine = line + words[i] + ' ';
                                    const metrics = ctx.measureText(testLine);
                                    if (metrics.width > 1000 && i > 0) {
                                        ctx.fillText(line, 540, y);
                                        line = words[i] + ' ';
                                        y += 50;
                                    } else {
                                        line = testLine;
                                    }
                                }
                                ctx.fillText(line, 540, y);
                                
                                // Download as image (video generation requires backend)
                                canvas.toBlob((blob) => {
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = `${platform.toLowerCase()}-video-frame.png`;
                                    a.click();
                                    alert('Video frame generated! Use video editing software to create the final video.');
                                });
                            }
                        }}
                        className="flex-1 text-xs py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-smooth"
                    >
                        <i className="fas fa-video mr-1"></i>
                        Video
                    </button>
                </div>
            </div>
        </div>
    );
};
