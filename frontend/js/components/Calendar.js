// Calendar Component for scheduling posts
const { useState } = React;

const Calendar = ({ campaigns, onSchedule }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [scheduledPosts, setScheduledPosts] = useState(() => {
        const saved = localStorage.getItem('scheduledPosts');
        return saved ? JSON.parse(saved) : {};
    });

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek };
    };

    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

    const getScheduledPosts = (day) => {
        const dateStr = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString();
        return scheduledPosts[dateStr] || [];
    };

    const schedulePost = (campaign) => {
        if (!selectedDate) return;
        
        const dateStr = selectedDate.toDateString();
        const updated = {
            ...scheduledPosts,
            [dateStr]: [...(scheduledPosts[dateStr] || []), campaign]
        };
        
        setScheduledPosts(updated);
        localStorage.setItem('scheduledPosts', JSON.stringify(updated));
        setShowScheduleModal(false);
        alert('Post scheduled successfully!');
    };

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const handleDateClick = (day) => {
        setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
        setShowScheduleModal(true);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg-pro p-6">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <i className="fas fa-calendar-alt text-indigo-600"></i>
                        Content Calendar
                    </h2>
                    <div className="flex items-center gap-4">
                        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-smooth">
                            <i className="fas fa-chevron-left text-gray-600 dark:text-gray-400"></i>
                        </button>
                        <span className="text-lg font-semibold text-gray-900 dark:text-white min-w-[200px] text-center">
                            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-smooth">
                            <i className="fas fa-chevron-right text-gray-600 dark:text-gray-400"></i>
                        </button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                    {/* Day Headers */}
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center font-semibold text-sm text-gray-600 dark:text-gray-400 py-2">
                            {day}
                        </div>
                    ))}

                    {/* Empty cells for days before month starts */}
                    {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square"></div>
                    ))}

                    {/* Calendar Days */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const posts = getScheduledPosts(day);
                        const isToday = new Date().toDateString() === new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString();

                        return (
                            <div
                                key={day}
                                onClick={() => handleDateClick(day)}
                                className={`aspect-square p-2 border rounded-lg cursor-pointer transition-smooth hover-lift ${
                                    isToday ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700'
                                } hover:border-indigo-400 dark:hover:border-indigo-600`}
                            >
                                <div className="text-sm font-semibold text-gray-900 dark:text-white">{day}</div>
                                {posts.length > 0 && (
                                    <div className="mt-1 space-y-1">
                                        {posts.slice(0, 2).map((post, idx) => (
                                            <div key={idx} className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-1 py-0.5 rounded truncate">
                                                {post.productName}
                                            </div>
                                        ))}
                                        {posts.length > 2 && (
                                            <div className="text-xs text-gray-500 dark:text-gray-400">+{posts.length - 2} more</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Schedule Modal */}
            {showScheduleModal && (
                <div className="modal-overlay" onClick={() => setShowScheduleModal(false)}>
                    <div className="modal-content glassmorphism max-w-md" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Schedule for {selectedDate?.toLocaleDateString()}
                        </h3>
                        
                        {/* Existing scheduled posts */}
                        {getScheduledPosts(selectedDate?.getDate()).length > 0 && (
                            <div className="mb-4">
                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Scheduled Posts:</p>
                                <div className="space-y-2">
                                    {getScheduledPosts(selectedDate?.getDate()).map((post, idx) => (
                                        <div key={idx} className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                                            {post.productName}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* Schedule from campaigns */}
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Select a campaign to schedule:
                            </p>
                            <div className="max-h-60 overflow-y-auto space-y-2">
                                {campaigns.slice(0, 10).map((campaign, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => schedulePost(campaign)}
                                        className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-smooth"
                                    >
                                        <p className="font-semibold text-gray-900 dark:text-white">{campaign.productName}</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                            {campaign.platforms?.join(', ')}
                                        </p>
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setShowScheduleModal(false)}
                                className="btn-secondary w-full py-3 rounded-xl"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
