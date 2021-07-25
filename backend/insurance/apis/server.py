import os
import json
import subprocess

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_restplus import Api, Resource

from insurance.apis.base_api import api as base_api_ns


app = Flask(__name__)

CORS(app, origins=['http://localhost:3000/*'])

api = Api(app,
    title="Insurance",
    version="1.0",
    description="Application to view insurance policies",
    )

api.add_namespace(base_api_ns)

def start_server(port, timeout=300, num_workers=1):
    try:
        subprocess.call([
            "gunicorn", 
            "--timeout", str(timeout),
            "-w", str(num_workers),
            "--bind", "{0}:{1}".format('0.0.0.0', str(port)),
            "insurance.apis.server:app"
        ])
    except Exception as e:
        print(str(e))