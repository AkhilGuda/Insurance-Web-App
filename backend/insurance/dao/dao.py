import sqlalchemy as sy
from sqlalchemy import func
from sqlalchemy.orm import sessionmaker
from insurance.dao import entities


class DAO:
    '''
    Data Access Object
    '''
    engine = sy.create_engine("postgresql://postgres:postgres@192.168.8.121:5432/insurance",
                              pool_size=10,
                              max_overflow=2,
                              pool_recycle=300,
                              pool_pre_ping=True,
                              pool_use_lifo=True
                              )
    gen_session = sessionmaker(bind=engine)
    connection = engine.connect()
    session = gen_session(bind=connection)

    def get_all(self, entity):
        '''
        Get all objects of an entity
        '''
        try:
            return self.session.query(entity).all()
        except Exception as e:
            self.session.rollback()
            print(str(e))
            raise

    def get_by_query(self, query):
        '''
        Get result for a query
        '''
        try:
            return self.session.query(query)
        except Exception as e:
            self.session.rollback()
            print(str(e))
            raise

    def get_where(self, entity, condition):
        '''
        Get objects of an entity along with filtering using the condition specified
        '''
        try:
            return self.session.query(entity).filter(sy.text(condition)).all()
        except Exception as e:
            self.session.rollback()
            print(str(e))
            raise

    def get_item(self, entity, id, return_session=False):
        '''
        Get objects of an entity along with filtering using the condition specified
        '''
        try:
            if return_session:
                return self.session.query(entity).filter_by(id=id).first(), self.session
            else:
                return self.session.query(entity).filter_by(id=id).first()
        except Exception as e:
            self.session.rollback()
            print(str(e))
            raise

    def put(self, entity, object):
        '''
        Get single object of an entity given the primary key value.
        '''
        try:
            self.session.add(object)
            self.session.flush()
            return object, self.session
        except Exception as e:
            self.session.rollback()
            print(str(e))
            raise
