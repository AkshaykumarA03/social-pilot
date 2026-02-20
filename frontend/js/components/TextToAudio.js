// Text to Audio Generator Component
const { useState, useRef } = React;

const TextToAudio = () => {
    const [text, setText] = useState('');
    const [voice, setVoice] = useState('en-US');
    const [audioUrl, setAudioUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [generatedAudios, setGeneratedAudios] = useState([]);
    const audioRef = useRef(null);

    const voices = [
        { id: 'en-US', name: 'English (US)', flag: '🇺🇸' },
        { id: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
        { id: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
        { id: 'fr-FR', name: 'French', flag: '🇫🇷' },
        { id: 'de-DE', name: 'German', flag: '🇩🇪' },
        { id: 'it-IT', name: 'Italian', flag: '🇮🇹' },
        { id: 'pt-BR', name: 'Portuguese', flag: '🇧🇷' },
        { id: 'ja-JP', name: 'Japanese', flag: '🇯🇵' },
        { id: 'ko-KR', name: 'Korean', flag: '🇰🇷' },
        { id: 'zh-CN', name: 'Chinese', flag: '🇨🇳' }
    ];

    const quickTexts = [
        'Welcome to our amazing product launch!',
        'Limited time offer - Get 50% off today!',
        'Subscribe to our channel for more updates.',
        'Thank you for being part of our community!',
        'Check out our latest collection now!'
    ];

    const generateAudio = async () => {
        if (!text.trim()) {
            alert('Please enter text to convert');
            return;
        }

        setLoading(true);

        try {
            // Use Web Speech API for instant browser playback
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel(); // Clear any previous
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = voice;
                utterance.rate = 0.9;
                utterance.pitch = 1.0;
                utterance.volume = 1.0;
                window.speechSynthesis.speak(utterance);
            }
            
            // Also create downloadable audio URL
            const encodedText = encodeURIComponent(text);
            const lang = voice.split('-')[0];
            const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodedText}`;
            
            setAudioUrl(ttsUrl);
            
            const newAudio = {
                id: Date.now(),
                text: text,
                voice: voices.find(v => v.id === voice)?.name || voice,
                voiceLang: voice,
                url: ttsUrl,
                timestamp: new Date().toISOString()
            };
            
            setGeneratedAudios([newAudio, ...generatedAudios]);
            
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to generate audio: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const playAudio = (url, text, voiceLang) => {
        // Use Web Speech API for instant playback
        if ('speechSynthesis' in window && text) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = voiceLang || 'en-US';
            utterance.rate = 0.9;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;
            window.speechSynthesis.speak(utterance);
        }
        
        // Also update audio player
        if (audioRef.current) {
            audioRef.current.src = url;
            audioRef.current.load();
        }
    };

    const downloadAudio = async (url, text) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = `audio-${Date.now()}.mp3`;
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
                        <i className="fas fa-microphone text-indigo-600"></i>
                        Text to Audio Generator
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Convert your text into natural-sounding audio</p>
                </div>

                {/* Text Input */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
                            <i className="fas fa-align-left text-indigo-600 mr-2"></i>
                            Enter Text
                        </label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type or paste your text here..."
                            rows="6"
                            maxLength="500"
                            className="input-pro w-full px-4 py-3 border-2 rounded-xl resize-none"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            {text.length}/500 characters
                        </p>
                    </div>

                    {/* Voice Selection */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
                            <i className="fas fa-globe text-indigo-600 mr-2"></i>
                            Select Voice Language
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                            {voices.map(v => (
                                <button
                                    key={v.id}
                                    onClick={() => setVoice(v.id)}
                                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-smooth ${
                                        voice === v.id
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    {v.flag} {v.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={generateAudio}
                        disabled={loading || !text.trim()}
                        className="btn-primary w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <i className="fas fa-spinner fa-spin"></i>
                                Generating Audio...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-volume-up"></i>
                                Generate Audio
                            </>
                        )}
                    </button>
                </div>

                {/* Quick Text Samples */}
                <div>
                    <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
                        <i className="fas fa-bolt text-indigo-600 mr-2"></i>
                        Quick Samples
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                        {quickTexts.map((qt, idx) => (
                            <button
                                key={idx}
                                onClick={() => setText(qt)}
                                className="text-left text-sm px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/20 hover:text-indigo-700 dark:hover:text-indigo-300 transition-smooth"
                            >
                                {qt}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Current Audio Player */}
                {audioUrl && (
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-4">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
                            <i className="fas fa-play-circle text-indigo-600 mr-2"></i>
                            Downloadable Audio
                        </p>
                        <audio ref={audioRef} controls className="w-full" preload="auto">
                            <source src={audioUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                            Audio plays instantly using browser voice. Use player above to replay or download.
                        </p>
                    </div>
                )}
            </div>

            {/* Generated Audios History */}
            {generatedAudios.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg-pro p-8 space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <i className="fas fa-history text-indigo-600"></i>
                        Generated Audios ({generatedAudios.length})
                    </h3>

                    <div className="space-y-3">
                        {generatedAudios.map(audio => (
                            <div key={audio.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                            {audio.voice}
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                            {audio.text}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                            {new Date(audio.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => playAudio(audio.url, audio.text, audio.voiceLang)}
                                        className="flex-1 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-smooth"
                                    >
                                        <i className="fas fa-play mr-2"></i>
                                        Play
                                    </button>
                                    <button
                                        onClick={() => downloadAudio(audio.url, audio.text)}
                                        className="flex-1 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-smooth"
                                    >
                                        <i className="fas fa-download mr-2"></i>
                                        Download
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(audio.text);
                                            alert('Text copied!');
                                        }}
                                        className="flex-1 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-smooth"
                                    >
                                        <i className="fas fa-copy mr-2"></i>
                                        Copy Text
                                    </button>
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
                    Features
                </p>
                <ul className="text-xs text-blue-800 dark:text-blue-300 space-y-1 ml-6 list-disc">
                    <li>10 language voices available</li>
                    <li>Natural-sounding text-to-speech</li>
                    <li>Download audio files for offline use</li>
                    <li>Perfect for video voiceovers and podcasts</li>
                    <li>Maximum 500 characters per generation</li>
                </ul>
            </div>
        </div>
    );
};
