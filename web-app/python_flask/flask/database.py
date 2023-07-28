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
        cursor.execute('''
                       CREATE TABLE IF NOT EXISTS tasks (
                       ID INTEGER PRIMARY KEY AUTOINCREMENT,
                       TaskName TEXT,
                       Tags TEXT,
                       Deadline DATE,
                       Status TEXT CHECK( Status IN ('INBOX', 'INPROGRESS', 'DONE', 'ARCHIVED'))
                       );
                       ''')
        conn.commit()
        conn.close()
    
    def get_tasks(self):
        """Retreives all non-archived records from the Task DB.

        Returns:
            A `list` of all records in the database which have not been archived.
        """
        conn = sqlite3.connect(self.db_path + "/" + self.db_name)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM tasks WHERE Status <> 'ARCHIVED' ")
        tasks_records = cursor.fetchall()
        tasks = [{ 
                    'id': record[0],
                    'taskName': record[1],
                    'tags': record[2],
                    'deadline': str(record[3]),
                    'status': str(record[4])
                } for record in tasks_records]
        conn.close()
        return tasks
    
    def add_task(self, taskName, tags=None, deadline=None, status="INBOX"):
        """Adds a new task entry in the Task database

        Args:
            taskName: Name or title of the task as `str`
            tags: Any tags related to the task. This field is optional
            deadline: Date-time of when the task is due, as `str`
            status: Current status of the task. By default all tasks are placed in the `INBOX` bucket.

        """
        conn = sqlite3.connect(self.db_path + "/" + self.db_name)
        cursor = conn.cursor()
        cursor.execute("INSERT INTO tasks (TaskName, Tags, Deadline, Status) VALUES (?, ?, ?, ?);",
                       (taskName, tags, deadline, status,))
        conn.commit()
        conn.close()

    def edit_task(self, id, taskName, tags, deadline, status):
        """ Updates an existing task entry in the database based on the given id

        Args:
            id: Unique identifier for the task as `str`
            taskName: Name or title of the task as `str`
            tags: Any tags related to the task.
            deadline: Date-time of when the task is due, as `str`
            status: Current status of the task.
        """
        conn = sqlite3.connect(self.db_path + "/" + self.db_name)
        cursor = conn.cursor()
        cursor.execute("UPDATE tasks SET TaskName = ? Tags = ? Deadline = ? Status = ? WHERE ID = ? ;",
                       (taskName, tags, deadline, status, id, ))
        conn.commit()
        conn.close()

    def delete_task(self,task_id):
        """ Removes an existing task entry in the database

        Args:
            task_id: Unique identifier for the task as `str`
        """
        conn = sqlite3.connect(self.db_path + "/" + self.db_name)
        cursor = conn.cursor()
        cursor.execute("DELETE FROM tasks where ID = ?", (task_id))
        conn.commit()
        conn.close()
    
    def get_archived_tasks(self):
        """ Retrieves archived task entries from the database

        Returns:
            A `list` of all records in the database which are archived.
        """
        conn = sqlite3.connect(self.db_path + "/" + self.db_name)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM tasks WHERE Status = 'ARCHIVED' ;")
        conn.commit()
        tasks_records = cursor.fetchall()
        tasks = [{ 
                    'id': record[0],
                    'taskName': record[1],
                    'tags': record[2],
                    'deadline': str(record[3]),
                    'status': str(record[4])
                } for record in tasks_records]
        
        conn.close()
        return tasks