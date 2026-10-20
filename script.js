document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('product-grid');

    try {
        const response = await fetch('models.json?v=' + Date.now());
        if (!response.ok) throw new Error('Failed to load asset catalog');
        
        const models = await response.json();

        if (models.length === 0) {
            grid.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color: var(--text-secondary);">No models available yet.</p>';
            return;
        }

        grid.innerHTML = models.map(item => `
            <div class="card">
                <img src="${item.thumbnail}" alt="${item.title}">
                <div class="card-content">
                    <h2>${item.title}</h2>
                    <p class="price">${item.price}</p>
                    <a href="${item.buyUrl}" class="buy-btn" target="_blank">Buy Now</a>
                </div>
            </div>
        `).join('');
    } catch (err) {
        console.error('Error loading models:', err);
        grid.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color: #ff5555;">Failed to load catalog.</p>';
    }
});
