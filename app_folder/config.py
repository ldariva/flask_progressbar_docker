"""
This file contaings the configuration for different enviroments
"""
import os
import urllib
from dotenv import load_dotenv

class Config:
    #This is the basic configurations
    load_dotenv() # load local variable from .env file
    ENV = os.getenv("t_env")
    
    @staticmethod
    def init_app(app):
        pass
        
class DevelopmentConfig(Config):
    DEBUG=True

class ProductionConfig(Config):
    DEBUG=False

config = {'development': DevelopmentConfig,
          'production': ProductionConfig,
          'default': DevelopmentConfig}