// API Routes
import express from 'express';
import multer from 'multer';
import { generateContent } from '../controllers/contentController.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } });

/**
 * POST /api/generate
 * Generate social media content for a product
 */
router.post('/generate', upload.single('image'), async (req, res) => {
    try {
        const { productDescription, platforms } = req.body;
        const imageFile = req.file;

        if (!productDescription || !productDescription.trim()) {
            return res.status(400).json({ error: 'Product description is required' });
        }

        if (!process.env.LLM_API_KEY) {
            return res.status(500).json({ error: 'LLM API key not configured. Set LLM_API_KEY in .env' });
        }

        console.log(`📝 Generating content for: ${productDescription.substring(0, 50)}...`);

        const selectedPlatforms = platforms ? platforms.split(',') : ['instagram', 'linkedin', 'x', 'tiktok'];
        const content = await generateContent(productDescription, imageFile, selectedPlatforms, req.body);

        res.json({
            success: true,
            content,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({
            error: 'Failed to generate content',
            details: error.message
        });
    }
});

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        provider: process.env.LLM_PROVIDER || 'gemini',
        configured: !!process.env.LLM_API_KEY
    });
});

/**
 * POST /api/generate-image
 * Generate AI image from text prompt
 */
router.post('/generate-image', async (req, res) => {
    try {
        const { prompt, style } = req.body;

        if (!prompt || !prompt.trim()) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        console.log(`🎨 Generating image for: ${prompt.substring(0, 50)}...`);

        const seed = Date.now();
        const encodedPrompt = encodeURIComponent(prompt);
        
        // Using Replicate API (free, no key needed)
        const imageUrl = `https://replicate.delivery/pbxt/placeholder.png?prompt=${encodedPrompt}&width=1024&height=1024`;
        
        // Backup: Pollinations.ai
        const backupUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${seed}&nologo=true`;
        
        // Use backup as primary since it's more reliable
        const finalUrl = backupUrl;

        res.json({
            success: true,
            imageUrl: finalUrl,
            prompt,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({
            error: 'Failed to generate image',
            details: error.message
        });
    }
});

export default router;
