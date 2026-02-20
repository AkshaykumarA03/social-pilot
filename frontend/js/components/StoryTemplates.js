// Story Templates Component
const { useState } = React;

const StoryTemplates = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [customText, setCustomText] = useState('');

    const templates = [
        {
            id: 1,
            name: 'Product Showcase',
            platform: 'Instagram',
            type: 'Product',
            preview: 'gradient-to-br from-pink-500 to-orange-500',
            elements: ['Product Image', 'Title', 'Price Tag', 'Swipe Up CTA'],
            stickers: ['Poll', 'Link', 'Location', 'Hashtag'],
            dimensions: '1080x1920px',
            duration: '15 seconds',
            bestTime: '12 PM - 3 PM',
            engagement: 'High',
            description: 'Perfect for showcasing new products with interactive elements'
        },
        {
            id: 2,
            name: 'Behind the Scenes',
            platform: 'Instagram',
            type: 'Engagement',
            preview: 'gradient-to-br from-purple-500 to-blue-500',
            elements: ['Video/Photo', 'Text Overlay', 'Poll Sticker', 'Location Tag'],
            stickers: ['Question', 'Poll', 'Emoji Slider', 'Music'],
            dimensions: '1080x1920px',
            duration: '10-15 seconds',
            bestTime: '6 PM - 9 PM',
            engagement: 'Very High',
            description: 'Show your authentic side and build connection with audience'
        },
        {
            id: 3,
            name: 'Announcement',
            platform: 'Facebook',
            type: 'News',
            preview: 'gradient-to-br from-blue-600 to-indigo-600',
            elements: ['Bold Text', 'Date/Time', 'Link Sticker', 'Countdown'],
            stickers: ['Countdown', 'Link', 'GIF', 'Mention'],
            dimensions: '1080x1920px',
            duration: '10 seconds',
            bestTime: '9 AM - 11 AM',
            engagement: 'Medium',
            description: 'Make important announcements stand out with countdown timers'
        },
        {
            id: 4,
            name: 'Tutorial Steps',
            platform: 'Instagram',
            type: 'Educational',
            preview: 'gradient-to-br from-green-500 to-teal-500',
            elements: ['Step Number', 'Instruction Text', 'Arrow Graphics', 'Next Story CTA'],
            stickers: ['Quiz', 'Poll', 'Slider', 'Link'],
            dimensions: '1080x1920px',
            duration: '15-20 seconds',
            bestTime: '10 AM - 2 PM',
            engagement: 'High',
            description: 'Break down complex processes into easy-to-follow steps'
        },
        {
            id: 5,
            name: 'Quote Card',
            platform: 'Instagram',
            type: 'Inspirational',
            preview: 'gradient-to-br from-yellow-500 to-red-500',
            elements: ['Quote Text', 'Author Name', 'Decorative Elements', 'Share Prompt'],
            stickers: ['GIF', 'Music', 'Hashtag', 'Mention'],
            dimensions: '1080x1920px',
            duration: '8-10 seconds',
            bestTime: '7 AM - 9 AM',
            engagement: 'Medium',
            description: 'Inspire your audience with motivational quotes and beautiful design'
        },
        {
            id: 6,
            name: 'Poll Question',
            platform: 'Instagram',
            type: 'Interactive',
            preview: 'gradient-to-br from-indigo-500 to-purple-500',
            elements: ['Question Text', 'Poll Options', 'Background Image', 'Results Preview'],
            stickers: ['Poll', 'Quiz', 'Question', 'Emoji Slider'],
            dimensions: '1080x1920px',
            duration: '24 hours',
            bestTime: '3 PM - 6 PM',
            engagement: 'Very High',
            description: 'Boost engagement with interactive polls and questions'
        },
        {
            id: 7,
            name: 'Before & After',
            platform: 'Instagram',
            type: 'Transformation',
            preview: 'gradient-to-br from-gray-700 to-gray-900',
            elements: ['Split Screen', 'Before Label', 'After Label', 'Transformation Text'],
            stickers: ['Slider', 'Link', 'Hashtag', 'Location'],
            dimensions: '1080x1920px',
            duration: '12-15 seconds',
            bestTime: '5 PM - 8 PM',
            engagement: 'High',
            description: 'Showcase transformations and results with split-screen design'
        },
        {
            id: 8,
            name: 'Flash Sale',
            platform: 'Facebook',
            type: 'Promotional',
            preview: 'gradient-to-br from-red-600 to-pink-600',
            elements: ['Discount Badge', 'Timer', 'Product Grid', 'Shop Now Button'],
            stickers: ['Countdown', 'Link', 'Product Tag', 'GIF'],
            dimensions: '1080x1920px',
            duration: '10 seconds',
            bestTime: '11 AM - 1 PM',
            engagement: 'Very High',
            description: 'Create urgency with countdown timers and limited-time offers'
        },
        {
            id: 9,
            name: 'User Generated Content',
            platform: 'Instagram',
            type: 'Social Proof',
            preview: 'gradient-to-br from-cyan-500 to-blue-500',
            elements: ['Customer Photo', 'Review Text', 'Star Rating', 'Thank You Message'],
            stickers: ['Mention', 'Hashtag', 'Location', 'Link'],
            dimensions: '1080x1920px',
            duration: '10-12 seconds',
            bestTime: '4 PM - 7 PM',
            engagement: 'High',
            description: 'Feature customer content to build trust and community'
        },
        {
            id: 10,
            name: 'Event Countdown',
            platform: 'Instagram',
            type: 'Event',
            preview: 'gradient-to-br from-violet-500 to-fuchsia-500',
            elements: ['Event Name', 'Date/Time', 'Countdown Timer', 'RSVP Link'],
            stickers: ['Countdown', 'Link', 'Location', 'Music'],
            dimensions: '1080x1920px',
            duration: '15 seconds',
            bestTime: '8 AM - 10 AM',
            engagement: 'Very High',
            description: 'Build anticipation for upcoming events with countdown stickers'
        }
    ];

    const handleUseTemplate = (template) => {
        setSelectedTemplate(template);
        setCustomText(`Story created with ${template.name} template`);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg-pro p-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
                        <i className="fas fa-mobile-screen text-indigo-600"></i>
                        Story Templates
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Ready-to-use templates for Instagram and Facebook Stories</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {templates.map(template => (
                        <div
                            key={template.id}
                            onClick={() => handleUseTemplate(template)}
                            className="cursor-pointer group"
                        >
                            <div className={`aspect-[9/16] bg-${template.preview} rounded-2xl p-4 flex flex-col justify-between text-white hover:scale-105 transition-all shadow-lg hover:shadow-2xl`}>
                                <div>
                                    <span className="text-xs px-2 py-1 bg-white/20 rounded-full">{template.platform}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm mb-1">{template.name}</h3>
                                    <p className="text-xs opacity-80">{template.type}</p>
                                </div>
                            </div>
                            <p className="text-xs text-center text-gray-600 dark:text-gray-400 mt-2">{template.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {selectedTemplate && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg-pro p-8 space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedTemplate.name} Template
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Preview</h4>
                            <div className={`aspect-[9/16] bg-${selectedTemplate.preview} rounded-2xl p-6 flex flex-col justify-between text-white shadow-2xl`}>
                                <div className="space-y-2">
                                    <div className="text-xs px-3 py-1 bg-white/20 rounded-full w-fit">{selectedTemplate.platform}</div>
                                    <h2 className="text-2xl font-bold">{selectedTemplate.name}</h2>
                                </div>
                                <div className="space-y-3">
                                    {customText && (
                                        <div className="p-4 bg-white/10 backdrop-blur rounded-xl">
                                            <p className="text-sm">{customText}</p>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs">Swipe Up</span>
                                        <i className="fas fa-arrow-up"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Template Details</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Dimensions</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedTemplate.dimensions}</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Duration</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedTemplate.duration}</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Best Time</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedTemplate.bestTime}</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Engagement</p>
                                        <p className="text-sm font-semibold text-green-600 dark:text-green-400">{selectedTemplate.engagement}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">{selectedTemplate.description}</p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Template Elements</h4>
                                <div className="space-y-2">
                                    {selectedTemplate.elements.map((element, idx) => (
                                        <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                            <i className="fas fa-check-circle text-green-600"></i>
                                            <span className="text-sm text-gray-900 dark:text-white">{element}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Interactive Stickers</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedTemplate.stickers.map((sticker, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-semibold">
                                            {sticker}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                    Custom Text
                                </label>
                                <textarea
                                    value={customText}
                                    onChange={(e) => setCustomText(e.target.value)}
                                    placeholder="Enter your story text..."
                                    rows="4"
                                    className="input-pro w-full px-4 py-3 border-2 rounded-xl resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <h4 className="font-semibold text-gray-900 dark:text-white">Best Practices</h4>
                                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 ml-4 list-disc">
                                    <li>Keep text short and readable</li>
                                    <li>Use high-contrast colors</li>
                                    <li>Add interactive stickers</li>
                                    <li>Include clear call-to-action</li>
                                    <li>Optimal size: 1080x1920px</li>
                                </ul>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        const data = {
                                            template: selectedTemplate.name,
                                            text: customText,
                                            platform: selectedTemplate.platform
                                        };
                                        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
                                        alert('Template data copied!');
                                    }}
                                    className="flex-1 btn-secondary py-3 rounded-xl"
                                >
                                    <i className="fas fa-copy mr-2"></i>
                                    Copy Data
                                </button>
                                <button
                                    onClick={() => {
                                        alert('Export to design tool (Canva, Figma) - Feature coming soon!');
                                    }}
                                    className="flex-1 btn-primary py-3 rounded-xl"
                                >
                                    <i className="fas fa-download mr-2"></i>
                                    Export
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-5">
                <p className="text-sm text-blue-900 dark:text-blue-200 font-medium flex items-center gap-2 mb-2">
                    <i className="fas fa-lightbulb"></i>
                    Pro Tips
                </p>
                <ul className="text-xs text-blue-800 dark:text-blue-300 space-y-1 ml-6 list-disc">
                    <li>Stories disappear after 24 hours - use for time-sensitive content</li>
                    <li>Add location tags and hashtags to increase discoverability</li>
                    <li>Use polls and questions to boost engagement</li>
                    <li>Post consistently (3-5 stories per day)</li>
                </ul>
            </div>
        </div>
    );
};
