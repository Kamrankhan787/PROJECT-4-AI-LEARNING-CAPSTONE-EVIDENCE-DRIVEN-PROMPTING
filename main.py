"""
Project 4 — AI Learning Capstone: Evidence-Driven Prompting & Self-Review
Flask Backend Server Entry Point
"""

import os
from app import create_app

app = create_app()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"Starting Project 4 AI Learning Capstone server on http://127.0.0.1:{port}")
    app.run(host="0.0.0.0", port=port, debug=True)
