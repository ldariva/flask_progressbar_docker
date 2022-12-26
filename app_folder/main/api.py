from flask import request,jsonify,send_from_directory,abort,Response
from flask import current_app as app
from flask_socketio import emit
from os import system
import json
import time
import os

from threading import Thread, Event
from markupsafe import string
from datetime import datetime
from pathlib import Path

from . import main
from .. import socketio
from .views import session

# this file hold all routes used for data exchange.
thread = Thread()
thread_stop_event = Event()

@main.route("/api/pbdummy",methods=['GET','POST'])
def pbdummy():
    for i in range(101):
        socketio.emit('progress',{'success':f'{i:.1f}'})
        print(f'sucess: {i:.1f}')
        time.sleep(0.1)
    
    return ''