import sqlite3

class HackPlannerAppDB:
    """Sql database connection handler class for the planner app.
    
    Instance of this class interfaces with the SQL table that
    contains task related information.

    Args:
        database_path: `str`, Unix path to database location on host
        database_name: `str`, name of the database file
    """
    def __init__(self, database_path, database_name):
        self.db_path = database_path
        self.db_name = database_name
    
    def connect(self):
        """Instantiates the SQL DB and table for the planner app.
        
        In the process, this method creates a table which contains 
        detail related to task namely - the name, details, create and deadline
        and current status.
        """
        conn = sqlite3.connect(self.db_path + "/" + self.db_name)
        cursor = conn.cursor()
        cursor.execute('''CREATE TABLE IF NOT EXISTS tasks (
                       ID INTEGER PRIMARY KEY AUTOINCREMENT,
                       TaskName TEXT,
                       TaskDetails TEXT,
                       CreateDate DATE,
                       Deadline DATE,
                       Status ENUM('INBOX', 'INPROGRESS', 'DONE', 'ARCHIVED'))''')
        conn.commit()
        conn.close()
    
    def get_tasks(self):
        """Retreives all non-archived records from the Task DB.

        Returns:
            A `list` of all records in the database which have not been archived.
        """
        conn = sqlite3.connect(self.db_path + "/" + self.db_name)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM tasks")
        tasks = cursor.fetchall()
        conn.close()
        return tasks
    
    def add_task(self, taskName, createDate, taskDetails=None, deadline=None, status="INBOX"):
        """Adds a new task entry in the Task database

        Args:
            taskName: Name or title of the task as `str`
            createDate: Date-time of when the task was created as `str`
            taskDetail: Any notes related to the task. This field is optional
            deadline: Date-time of when the task is due, as `str`
            status: Current status of the task. By default all tasks are placed in the `INBOX` bucket.

        """
        conn = sqlite3.connect(self.db_path + "/" + self.db_name)
        cursor = conn.cursor()
        cursor.execute("INSERT INTO tasks (TaskName, TaskDetails, CreateDate, Deadline, Status) VALUES (?)",
                       (taskName, taskDetails, createDate, deadline, status,))
        conn.commit()
        conn.close()

"""
    Update to be figured out at the end!
    def update_task(self,item_id, taskName, createDate, taskDetails, deadline, status):
        conn = sqlite3.connect(self.db_path + "/" + self.db_name)
        cursor = conn.cursor()
        cursor.execute("UPDATE tasks SET item = ? WHERE id = ?", (new_item, item_id))
        conn.commit()
        conn.close()
"""
    
    def delete_task(self,task_id):
        """ Removes an existing task entry in the database

        Args:
            task_id: Unique identifier for the task as `str`
        """
        conn = sqlite3.connect(self.db_path + "/" + self.db_name)
        cursor = conn.cursor()
        cursor.execute("DELETE FROM tasks where id = ?", (task_id))
        conn.commit()
        conn.close()
    
    def archive_task(self,task_id):
        """ Archives an existing task entry in the database

        Args:
            task_id: Unique identifier for the task as `str`
        """
        conn = sqlite3.connect(self.db_path + "/" + self.db_name)
        cursor = conn.cursor()
        cursor.execute("UPDATE tasks SET STATUS = ? WHERE id = ?", ("ARCHIVED", task_id))
        conn.commit()
        conn.close()



