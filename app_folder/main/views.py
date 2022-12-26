from flask import Flask,session,request,render_template,jsonify,url_for,redirect,flash,Response
from flask_modals import render_template_modal, response
from flask_bootstrap import Bootstrap
from . import main
from flask import current_app as app

@main.route("/")
def home():
    
    return render_template('index.html')