from flask import Flask, abort, request, jsonify, make_response
from flask_cors import CORS
import json
import sqlite3

from database import HackPlannerAppDB

# Create an instance of flask app and enable CORS
app = Flask(__name__)
CORS(app)

# Global DB instance.
db = HackPlannerAppDB("./", "planner_app.db")

@app.route('/')
def get_tasks():
    try :
        db.connect()
        tasks = db.get_tasks()
    except sqlite3.Error as error:
        return abort(500, description="Internal Server Error")
    

    response = {
        'inbox': [],
        'inProgress': [],
        'completed': []
    }
    for task in tasks:
        if task['status'] == 'INBOX':
            response['inbox'].append(task)
        elif task['status'] == 'INPROGRESS':
            response['inProgress'].append(task)
        else:
            response['completed'].append(task)
    
    return jsonify(response)


@app.route('/add', methods=['POST'])
def add_item():
    task = request.get_json(silent=True)
    if task is not None:
        try:
            db.add_task(taskName=task['taskName'], tags=task['tags'],
                    deadline=task['deadline'], status=task['status'])
        except sqlite3.Error as error:
            return abort(500, description="Internal Server Error")
        
        return make_response('OK', 200)


@app.route('/edit/<int:task_id>', methods=['POST'])
def edit_task(task_id):
    task = request.get_json(silent=True)
    if task is not None:
        try:
            db.edit_task(id=str(task_id), taskName=task['taskName'], tags=task['tags'],
                    deadline=task['deadline'], status=task['status'])
        except sqlite3.Error as error:
            return abort(500, description="Internal Server Error")
        return make_response('OK', 200)


@app.route('/delete/<int:task_id>')
def delete_tasks(task_id):
    #try:
    db.delete_task(task_id)
    #except sqlite3.Error as error:
    #    return make_response("Internal Server Error", 500)
    
    return make_response('OK', 200)


@app.route('/archived')
def get_archived_tasks():
    try:
        archvd__tasks = db.get_archived_tasks()
    except sqlite3.Error as error:
        return abort(500, description="Internal Server Error")
    
    return jsonify(archvd__tasks)

if __name__ == '__main__':
    app.run(debug=True, port=5000)