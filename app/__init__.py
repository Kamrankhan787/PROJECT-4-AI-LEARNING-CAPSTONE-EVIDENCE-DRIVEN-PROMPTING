import os
from flask import Flask

def create_app(test_config=None):
    """Application factory for AI Learning Capstone Flask server."""
    app = Flask(__name__, static_folder='../dist', static_url_path='/')

    if test_config is None:
        app.config.from_mapping(
            SECRET_KEY='ai-learning-capstone-dev-secret',
            DATA_DIR=os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')
        )
    else:
        app.config.from_mapping(test_config)

    # Register routes
    from app.routes import api_bp
    app.register_blueprint(api_bp)

    return app
