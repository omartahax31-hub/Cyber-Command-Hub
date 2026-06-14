from flask import Flask
from config import Config
from routes.main_routes import main_bp
from routes.api_routes import api_bp
from services.metrics_service import start_metrics_thread
from services.websocket_service import socketio

app = Flask(__name__)
app.config.from_object(Config)

app.register_blueprint(main_bp)
app.register_blueprint(api_bp, url_prefix="/api")

socketio.init_app(app, cors_allowed_origins="*")
start_metrics_thread(socketio)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)