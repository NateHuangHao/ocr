# -*- coding: UTF-8 -*-
from flask import Flask, request, Response
import knn
import random
import json

app = Flask(__name__)

@app.route('/train', methods=['POST'])
def train():
    image = request.form.get('image')
    digit = request.form.get('digit')
    image = json.loads(image);
    return 'hello world'

@app.route('/identify', methods=['POST'])
def identify():
    # 获取图片对应的二维数组
    image = request.form.get('image')
    image = json.loads(image)
    identifyResult = knn.identify(image)
    return Response(json.dumps(identifyResult), mimetype='application/json')

def after_request(resp):
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp
if __name__ == '__main__':
    # 跨域支持
    app.after_request(after_request)
    app.run(host='0.0.0.0',port=5000,debug=True)