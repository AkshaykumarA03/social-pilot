// VoiceInput Component
const { useState, useEffect, useRef } = React;

const VoiceInput = ({ onTranscript }) => {
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0].transcript)
                    .join('');
                onTranscript(transcript);
            };
        }
    }, [onTranscript]);

    const toggleListening = () => {
        if (!recognitionRef.current) return;

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    if (!recognitionRef.current) return null;

    return (
        <button
            onClick={toggleListening}
            className={`voice-input-btn ${isListening ? 'recording' : ''}`}
            title={isListening ? 'Stop recording...' : 'Click to speak'}
        >
            <i className={`fas fa-microphone${isListening ? ' fa-beat' : ''}`}></i>
        </button>
    );
};
