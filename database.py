from mysql.connector import connect, Error

def createTable():
    conn = createConn()
    cursor = conn.cursor()
    sql = f"""CREATE TABLE if not exists urls(
        id INT AUTO_INCREMENT PRIMARY KEY,
        original_url VARCHAR(255) NOT NULL,
        short_url VARCHAR(20) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );"""
    cursor.execute(sql)
    conn.close()

def insertData(origina_url, short_url):
    conn = createConn()
    cursor = conn.cursor()
    sql = f"INSERT INTO urls (original_url, short_url) VALUES (%s, %s);"
    cursor.execute(sql, (origina_url, short_url))
    conn.commit()
    conn.close()

def retriveUrl(short_url):
    conn = createConn()
    cursor = conn.cursor()
    sql = f"SELECT original_url FROM urls WHERE short_url=%s;"
    cursor.execute(sql, (short_url,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return row[0]
    else:
        return None
    
def createConn():
    try:
        conn = connect(
            host="localhost",
            user="url",
            password="urlroot",
            database="urlshortner"
        )
        return conn
    except Error as err:
        print(f"Error: {err}")
