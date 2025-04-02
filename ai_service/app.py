import logging
from logging.handlers import RotatingFileHandler
from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import MinMaxScaler

# Initialize Flask app
app = Flask(__name__)

# Enable Flask logging
app.logger.setLevel(logging.DEBUG)  # This ensures debug-level logging

# Create a stream handler to display logs in the terminal
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)  # Show DEBUG logs in terminal
app.logger.addHandler(console_handler)

# Allow CORS only from frontend (localhost:3000)
CORS(app, origins=["http://localhost:3000"])

# ✅ Simulated sample product data
sample_data = [
    {'id': 1, 'title': 'Wireless Earbuds', 'price': 29.99, 'rating': 4.5, 'category': 'Electronics'},
    {'id': 2, 'title': 'Portable Blender', 'price': 39.99, 'rating': 4.0, 'category': 'Home Appliances'},
    {'id': 3, 'title': 'Yoga Mat', 'price': 19.99, 'rating': 4.8, 'category': 'Fitness'},
    {'id': 4, 'title': 'Phone Charger', 'price': 15.99, 'rating': 4.3, 'category': 'Electronics'},
    {'id': 5, 'title': 'Air Purifier', 'price': 120.00, 'rating': 4.7, 'category': 'Home Appliances'}
]
# Root route
@app.route('/', methods=['GET'])
def home():
    print("Root route accessed")
    return "Welcome to the AI Insights API"


# /insights route
@app.route('/insights', methods=['GET'])
def get_trending_insights():
    try:
        # Step 1: Load and preprocess data
        product_data = pd.DataFrame(sample_data)

        # One-Hot Encoding for 'category' feature
        product_data = pd.get_dummies(product_data, columns=['category'], drop_first=True)

        # Normalize the 'price' and 'rating' columns for better model performance
        scaler = MinMaxScaler()
        product_data[['price', 'rating']] = scaler.fit_transform(product_data[['price', 'rating']])

        # Step 2: Generate a fake popularity score (for illustration purposes)
        product_data['popularity'] = product_data['rating'] * product_data['price'] * 100  # Fake popularity score

        # Step 3: Train a Random Forest model
        model = RandomForestRegressor(n_estimators=100, random_state=42)
        
        # Select features and target for model training
        category_columns = [col for col in product_data.columns if 'category_' in col]
        X = product_data[['price', 'rating'] + category_columns]
        y = product_data['popularity']

        model.fit(X, y)  # Train model

        # Step 4: Make predictions and prepare insights data for the frontend
        product_data['predicted_popularity'] = model.predict(X)
        insights = product_data[['title', 'predicted_popularity']].to_dict(orient='records')

        # Return insights as JSON
        return jsonify(insights)
    
    except Exception as e:
        # Log error and return message to the client
        app.logger.error(f"Error processing insights: {e}")
        return jsonify({"error": str(e)}), 500

# Start Flask server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)  # Debug mode enabled
import logging
from logging.handlers import RotatingFileHandler

# Set up logging to a file
if not app.debug:
    handler = RotatingFileHandler('flask_log.log', maxBytes=10000, backupCount=1)
    handler.setLevel(logging.INFO)
    app.logger.addHandler(handler)
    app.logger.info('Flask app started')


