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
        # Convert sample data to DataFrame
        df = pd.DataFrame(sample_data)

        # One-Hot Encoding for 'category' feature (converts category into binary columns)
        df = pd.get_dummies(df, columns=['category'], drop_first=True)

        # Print out columns to debug
        print("DataFrame columns after get_dummies:", df.columns)

        # Normalize data for better processing
        scaler = MinMaxScaler()
        df[['price', 'rating']] = scaler.fit_transform(df[['price', 'rating']])

        # Create a simple Random Forest model to predict "popularity"
        df['popularity'] = df['rating'] * df['price'] * 100  # Fake popularity score
        
        model = RandomForestRegressor(n_estimators=100, random_state=42)  # Random Forest model

        # Dynamically select columns based on the actual column names
        category_columns = [col for col in df.columns if 'category_' in col]
        X = df[['price', 'rating'] + category_columns]
        y = df['popularity']

        model.fit(X, y)

        # Predict future popularity
        df['predicted_popularity'] = model.predict(X)

        # Format insights for frontend
        insights = df[['title', 'predicted_popularity']].to_dict(orient='records')

        # Return insights as JSON
        return jsonify(insights)
    
    except Exception as e:
        # Log the error and return a response
        print(f"Error: {e}")
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


