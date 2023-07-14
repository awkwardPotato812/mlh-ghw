from flask import Flask, render_template, request, redirect
from database import HackPlannerAppDB

# Creating an instance of flask app
app = Flask(__name__)

# Global DB instance.
db = HackPlannerAppDB("./", "planner_app.db")

@app.route('/add', methods=['POST'])
def add_item():
    item = request.form['item']
    db.add_item(item)
    return redirect('/')

@app.route('/edit/<int:item_id>', methods=['GET', 'POST'])
def edit_item(item_id):
    if request.method == 'POST':
        new_item = request.form['item']
        db.update_item(item_id, new_item)
        return redirect('/')
    else:
        items = db.get_items()
        item = next((x[1] for x in items if x[0] == item_id), None)
        return render_template("edit.html", item=item, item_id=item_id)

@app.route('/delete/<int:item_id>')
def delete_item(item_id):
    db.delete_item(item_id)
    return redirect('/')

@app.route('/')
def checklist():
    db.connect()
    items = db.get_items()
    return render_template('checklist.html', items=items)


if __name__ == '__main__':
    app.run(debug=True, port=5000)