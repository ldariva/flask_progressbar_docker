from flask import Flask
from flask_modals import Modal
from flask_bootstrap import Bootstrap
from flask_moment import Moment
from flask_socketio import SocketIO,emit
import urllib
from dotenv import load_dotenv
from .config import config
#from gevent import monkey; monkey.patch_all()
import eventlet;
#eventlet.monkey_patch()
import gunicorn

bootstrap = Bootstrap()
modal = Modal()
moment = Moment()
#socketio = SocketIO(async_mode='threading', logger=True, engineio_logger=True)
#socketio = SocketIO(async_mode=None, logger=True, engineio_logger=True)
#socketio = SocketIO(async_mode="gevent",logger=True, engineio_logger=True,cors_allowed_origins='*')
#socketio = SocketIO(async_mode="eventlet",logger=True, engineio_logger=True,cors_allowed_origins='*')
socketio = SocketIO(async_mode="eventlet",logger=True, engineio_logger=True)
#socketio = SocketIO(async_mode='threading', logger=True, engineio_logger=True, cors_allowed_origins='*')

def create_app(config_name):

    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    
    with app.app_context():
        bootstrap.init_app(app)
        moment.init_app(app)
        modal.init_app(app)
        socketio.init_app(app)
        
    from .main import main as main_blueprint
    
    app.register_blueprint(main_blueprint)
    
    return app