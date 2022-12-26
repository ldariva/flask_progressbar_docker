import os
from app_folder import create_app,socketio
app = create_app(os.getenv('t_env') or 'default')

if __name__ == "__main__":
    #app.run()
    app.run(host='0.0.0.0')
    #socketio.run(app)