// Set the API URLs for the backends
const API_BASE_URL = 'http://localhost:5000'; // Node.js backend
const AI_BASE_URL = 'http://127.0.0.1:5001'; // Flask AI backend ✅

// ✅ Fetch products from Node.js backend
export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

// ✅ Fetch AI-driven trending insights
export const fetchTrendingInsights = async () => {
    try {
        const response = await fetch(`${AI_BASE_URL}/insights`); // Use 127.0.0.1:5001 here for Flask
        if (!response.ok) throw new Error('Failed to fetch AI insights');
        return await response.json();
    } catch (error) {
        console.error('Error fetching AI insights:', error);
        return [];
    }
};
