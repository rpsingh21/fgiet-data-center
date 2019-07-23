from datetime import datetime


def get_session(today=datetime.today()):
    year = today.year
    month = today.month
    if month < 7:
        year -= 1
    session = '{}-{}'.format(year, str(year+1)[-2:])
    return session
