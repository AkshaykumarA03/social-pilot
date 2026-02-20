// Content Generation Controller
import fetch from 'node-fetch';
import config from '../config/index.js';

/**
 * Platform-specific trending keywords and phrases (Updated with Google Trends 2024-2025)
 */
const platformKeywords = {
    instagram: ['aesthetic', 'viral', 'trending', 'reel', 'story', 'explore', 'fyp', 'inspo', 'ootd', 'photooftheday', 'instadaily', 'reelsinstagram', 'explorepage', 'viralreels', 'instagramreels'],
    facebook: ['community', 'live', 'watch', 'marketplace', 'group', 'share', 'viral', 'trending', 'news', 'local', 'family', 'friends', 'fbwatch', 'facebooklive', 'socialmedia'],
    tiktok: ['fyp', 'foryou', 'viral', 'trending', 'duet', 'stitch', 'challenge', 'trend', 'pov', 'storytime', 'tutorial', 'hack', 'foryoupage', 'tiktoktrend', 'tiktokviral'],
    youtube: ['shorts', 'subscribe', 'viral', 'trending', 'tutorial', 'review', 'unboxing', 'vlog', 'howto', 'guide', 'youtubeshorts', 'youtuber', 'youtubevideo', 'contentcreator', 'watchnow'],
    linkedin: ['hiring', 'jobsearch', 'career', 'professional', 'networking', 'leadership', 'innovation', 'growth', 'business', 'industry', 'remotework', 'wfh', 'careerdevelopment', 'professionalgrowth', 'linkedinlearning'],
    x: ['breaking', 'trending', 'viral', 'thread', 'news', 'update', 'hottake', 'opinion', 'discussion', 'debate', 'twittertrends', 'xtrends', 'breakingnews', 'viraltweet', 'twitterthread'],
    pinterest: ['diy', 'ideas', 'inspiration', 'aesthetic', 'tutorial', 'recipe', 'decor', 'fashion', 'design', 'homedecor', 'pinterestinspired', 'pinterestideas', 'pinterestdiy', 'pinterestrecipes', 'pinterestfashion'],
    snapchat: ['snap', 'streak', 'filter', 'lens', 'story', 'spotlight', 'discover', 'snapchatfilter', 'snapchatlens', 'snapchatstreak', 'snapchatstory', 'snapchatspotlight', 'snapchatdiscover', 'snapchatupdate', 'snapchattrends'],
    reddit: ['ama', 'eli5', 'tifu', 'til', 'discussion', 'thread', 'upvote', 'community', 'subreddit', 'redditpost', 'redditthread', 'redditcommunity', 'redditdiscussion', 'redditama', 'redditors'],
    discord: ['server', 'community', 'gaming', 'chat', 'voice', 'stream', 'bot', 'channel', 'members', 'discordserver', 'discordcommunity', 'discordbot', 'discordchat', 'discordgaming', 'discordstream'],
    telegram: ['channel', 'group', 'bot', 'broadcast', 'update', 'news', 'crypto', 'community', 'telegramchannel', 'telegramgroup', 'telegrambot', 'telegramupdate', 'telegramnews', 'telegramcommunity', 'telegramcrypto'],
    whatsapp: ['status', 'group', 'broadcast', 'update', 'message', 'chat', 'whatsappstatus', 'whatsappgroup', 'whatsappupdate', 'whatsappmessage', 'whatsappchat', 'whatsappbroadcast', 'whatsappbusiness', 'whatsappweb', 'whatsappcall']
};

/**
 * Get trending keywords for a platform
 */
function getPlatformKeywords(platform) {
    return platformKeywords[platform.toLowerCase()] || [];
}

/**
 * Build enhanced prompt with platform-specific keywords
 */
function buildPrompt(description, platforms, options) {
    const platformsStr = platforms.join(', ');
    
    // Get keywords for each platform
    const keywordsByPlatform = {};
    platforms.forEach(p => {
        keywordsByPlatform[p] = getPlatformKeywords(p).slice(0, 5).join(', ');
    });
    
    return `Generate engaging social media posts for these platforms: ${platformsStr}

Product: ${options.productName}
Description: ${description}
Tone: ${options.tone || 'professional'}
Audience: ${options.audience || 'general'}

IMPORTANT: For each platform, naturally incorporate these trending keywords/phrases:
${platforms.map(p => `- ${p}: ${keywordsByPlatform[p]}`).join('\n')}

Create a unique, platform-optimized post for each. Use appropriate hashtags, emojis, and CTAs.
Return ONLY a valid JSON object with platform names as keys and post text as values.

Example format:
{
  "instagram": "post text here",
  "linkedin": "post text here"
}`;
}

/**
 * Generate social media content using Gemini API
 */
async function generateWithGemini(description, imageFile, platforms, options) {
    const prompt = buildPrompt(description, platforms, options);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${config.llmApiKey}`;
    
    console.log('Calling Gemini API...');
    
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: prompt }]
            }]
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API Error:', errorText);
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini Response:', JSON.stringify(data, null, 2));
    
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('No content generated');

    // Try to extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
    }
    
    // If no JSON found, create simple response
    const result = {};
    platforms.forEach(p => {
        result[p] = text.substring(0, 200);
    });
    return result;
}

/**
 * Generate social media content using Groq API
 */
async function generateWithGroq(description, imageFile, platforms, options) {
    const prompt = buildPrompt(description, platforms, options);

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.llmApiKey}`
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Groq API Error:', errorText);
        throw new Error(`Groq API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) throw new Error('No content generated');

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
    }

    const result = {};
    platforms.forEach(p => {
        result[p] = text.substring(0, 200);
    });
    return result;
}

/**
 * Generate social media content using OpenAI API
 */
async function generateWithOpenAI(description, imageFile, platforms, options) {
    const prompt = buildPrompt(description, platforms, options);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.llmApiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) throw new Error('No content generated');

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Could not parse JSON');

    return JSON.parse(jsonMatch[0]);
}

/**
 * Main generation function - routes to appropriate provider
 */
export async function generateContent(description, imageFile, platforms, options) {
    if (config.llmProvider === 'openai') {
        return generateWithOpenAI(description, imageFile, platforms, options);
    } else if (config.llmProvider === 'groq') {
        return generateWithGroq(description, imageFile, platforms, options);
    } else {
        return generateWithGemini(description, imageFile, platforms, options);
    }
}
