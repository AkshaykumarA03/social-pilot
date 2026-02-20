// MobilePreviewModal Component
const MobilePreviewModal = ({ isOpen, onClose, platform, content, image }) => {
    if (!isOpen) return null;

    const platformConfigs = {
        'Instagram': {
            header: { name: 'instagram', avatar: true },
            showLikes: true,
            maxImageHeight: 300,
        },
        'LinkedIn': {
            header: { name: 'linkedin', brief: true },
            showLikes: true,
            maxImageHeight: 250,
        },
        'Facebook': {
            header: { name: 'facebook', brief: true },
            showLikes: true,
            maxImageHeight: 280,
        },
    };

    const config = platformConfigs[platform] || platformConfigs['Instagram'];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glassmorphism" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Mobile Preview</h3>
                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                        ×
                    </button>
                </div>

                <div className="flex justify-center">
                    <div className="mobile-frame">
                        <div className="mobile-screen">
                            {/* Status Bar */}
                            <div className="bg-black text-white text-xs p-2 flex justify-between items-center text-center">
                                <span>9:41</span>
                                <span>{platform}</span>
                                <span>📶</span>
                            </div>

                            {/* Platform Header */}
                            <div className="border-b border-gray-200 dark:border-gray-700 p-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-primary"></div>
                                    <div>
                                        <p className="text-xs font-bold">Your Brand</p>
                                        <p className="text-xs text-gray-500">Just now</p>
                                    </div>
                                </div>
                            </div>

                            {/* Image */}
                            {image && (
                                <img
                                    src={image}
                                    alt="Post"
                                    className="w-full object-cover"
                                    style={{ maxHeight: `${config.maxImageHeight}px` }}
                                />
                            )}

                            {/* Actions */}
                            <div className="border-b border-gray-200 dark:border-gray-700 p-3 flex gap-3 text-lg">
                                <i className="fas fa-heart text-red-500 cursor-pointer hover:opacity-70"></i>
                                <i className="fas fa-comment text-gray-600 dark:text-gray-400 cursor-pointer hover:opacity-70"></i>
                                <i className="fas fa-paper-plane text-gray-600 dark:text-gray-400 cursor-pointer hover:opacity-70"></i>
                            </div>

                            {/* Engagement */}
                            {config.showLikes && (
                                <div className="p-3 border-b border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300">
                                    👍 1.2K likes
                                </div>
                            )}

                            {/* Caption */}
                            <div className="p-3 text-xs text-gray-800 dark:text-gray-200 leading-relaxed line-clamp-4">
                                <span className="font-bold mr-1">Your Brand</span>
                                {content}
                            </div>

                            {/* Comments */}
                            <div className="p-3 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                                View all comments...
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center text-xs text-gray-600 dark:text-gray-400">
                    <span className="language-badge">{platform}</span>
                </div>
            </div>
        </div>
    );
};
