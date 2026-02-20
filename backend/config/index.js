// Backend Configuration
import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 5000,
    llmApiKey: process.env.LLM_API_KEY,
    llmProvider: process.env.LLM_PROVIDER || 'gemini',
};

// Validate configuration
if (!config.llmApiKey) {
    console.warn('⚠️  WARNING: LLM_API_KEY not set in .env file');
}

export default config;
