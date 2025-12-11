import pymysql
pymysql.install_as_MySQLdb()
import MySQLdb

# Monkey patch version to satisfy Django
if hasattr(MySQLdb, 'version_info'):
    if MySQLdb.version_info < (2, 2, 1):
        MySQLdb.version_info = (2, 2, 2, 'final', 0)
else:
    MySQLdb.version_info = (2, 2, 2, 'final', 0)
