import sqlite3

class HackPlannerAppDB:
    def __init__(self, database_path, database_name):
        self.db_path = database_path
        self.db_name = database_name
    
    def connect(self):
        conn = sqlite3.connect(self.db_path + "/" + self.db_name)
        cursor = conn.cursor()
        cursor.execute('''CREATE TABLE IF NOT EXISTS checklist
        (id INTEGER PRIMARY KEY AUTOINCREMENT, item TEXT)''')
        conn.commit()
        conn.close()
    
    def get_items(self):
        conn = sqlite3.connect(self.db_path + "/" + self.db_name)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM CHECKLIST")
        items = cursor.fetchall()
        conn.close()
        return items
    
    def add_item(self,item):
        conn = sqlite3.connect(self.db_path + "/" + self.db_name)
        cursor = conn.cursor()
        cursor.execute("INSERT INTO checklist (item) VALUES (?)", (item,))
        conn.commit()
        conn.close()
    
    def update_item(self,item_id, new_item):
        conn = sqlite3.connect(self.db_path + "/" + self.db_name)
        cursor = conn.cursor()
        cursor.execute("UPDATE checklist SET item = ? WHERE id = ?", (new_item, item_id))
        conn.commit()
        conn.close()
    
    def delete_item(self,item_id):
        conn = sqlite3.connect(self.db_path + "/" + self.db_name)
        cursor = conn.cursor()
        cursor.execute("DELETE FROM checklist where id = ?", (str(item_id)))
        conn.commit()
        conn.close()



