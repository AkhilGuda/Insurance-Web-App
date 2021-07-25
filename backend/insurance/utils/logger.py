import os
import logging
from logging.handlers import TimedRotatingFileHandler

logger = logging.getLogger("Insurance")
logger.setLevel(logging.INFO)
log_dir = "/scripts"
if not os.path.exists(log_dir):
    os.mkdir(log_dir)

log_file = "/scripts/insurance.log"
timed_handler = TimedRotatingFileHandler(
    log_file, when='d', interval=1, backupCount=10)
formatter = logging.Formatter(
    '%(asctime)s : %(levelname)s : %(name)s : %(message)s'
)
timed_handler.setFormatter(formatter)
logger.addHandler(timed_handler)

def getLogger():
    '''
    Get a log object
    '''
    return logger