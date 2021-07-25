from insurance.dao import entities
from insurance.dao.dao import DAO
from insurance.utils.errors import NotFoundError, UnprocessableError, InernalServerError
from insurance.utils.logger import getLogger


class Policy:
    '''
    Service class to get/create/update policies
    '''

    def __init__(self):
        self.__dao_obj = DAO()
        self.min_customer_id = 1
        self.min_premium = 0
        self.max_premium = 1000000
        self.logger = getLogger()

    def validate_premium(self, premium):
        if premium >= self.min_premium and premium <= self.max_premium:
            return True
        else:
            return False
    
    def validate_customer_id(self, customer_id):
        if customer_id >= self.min_customer_id:
            return True
        else:
            return False

    def get(self, policy_id=None, customer_id=None):
        '''
        Function to get the policies
        '''
        output = dict()
        try:
            if policy_id is not None and customer_id is not None:
                policy_objs = self.__dao_obj.get_where(
                    entities.Policy, f"id = {policy_id} and customer_id = {customer_id}")
                if len(policy_objs) == 0:
                    raise NotFoundError(
                        f"Policy with ID {policy_id} and customer_id {customer_id} does not exist.")
                output['data'] = [policy_obj.to_dict()
                                  for policy_obj in policy_objs]
            elif policy_id is not None:
                policy_obj = self.__dao_obj.get_item(
                    entities.Policy, policy_id)
                if policy_obj is None:
                    raise NotFoundError(
                        f"Policy with ID {policy_id} does not exist.")
                output['data'] = policy_obj.to_dict()
            else:
                policy_objs = self.__dao_obj.get_all(entities.Policy)
                output['data'] = [policy_obj.to_dict()
                                  for policy_obj in policy_objs]
            return output
        except Exception as e:
            self.logger.error(str(e))
            raise

    def create(self,
               customer_id,
               fuel,
               vehicle_segment,
               premium,
               bodily_injury_liability,
               personal_injury_protection,
               property_damage_liability,
               collision,
               comprehensive,
               customer_gender,
               customer_income_group,
               customer_region,
               customer_marital_status):
        '''
        Function to create the policies
        '''
        output = dict()
        session = None
        try:
            if not self.validate_customer_id(customer_id):
                raise UnprocessableError(
                    f"Customer ID should be greater than {self.min_customer_id}.")
            if not self.validate_premium(premium):
                raise UnprocessableError(
                    f"Premium should be between {self.min_premium} and {self.max_premium}.")
            policy_obj = entities.Policy(customer_id,
                                         fuel,
                                         vehicle_segment,
                                         premium,
                                         bodily_injury_liability,
                                         personal_injury_protection,
                                         property_damage_liability,
                                         collision,
                                         comprehensive,
                                         customer_gender,
                                         customer_income_group,
                                         customer_region,
                                         customer_marital_status)
            policy_obj, session = self.__dao_obj.put(
                entities.Policy, policy_obj)
            session.commit()
            output['data'] = policy_obj.to_dict()
            output['message'] = f"Policy with ID {policy_obj.id} created successfully."
            self.logger.info(
                f"Policy with ID {policy_obj.id} created successfully.")
            return output
        except UnprocessableError as e:
            if session:
                session.rollback()
            self.logger.error(str(e))
            raise
        except Exception as e:
            if session:
                session.rollback()
            self.logger.error(str(e))
            raise
        finally:
            if session:
                session.close()

    def update(self,
               policy_id,
               fuel,
               vehicle_segment,
               premium,
               bodily_injury_liability,
               personal_injury_protection,
               property_damage_liability,
               collision,
               comprehensive,
               customer_gender,
               customer_income_group,
               customer_region,
               customer_marital_status):
        '''
        Function to update the policies
        '''
        output = dict()
        session = None
        try:
            policy_obj, session = self.__dao_obj.get_item(
                entities.Policy, policy_id, return_session=True)
            if policy_obj is None:
                raise NotFoundError(
                    f"Policy with ID {policy_id} does not exist.")
            if premium is not None and premium != policy_obj.premium:
                if not self.validate_premium(premium):
                    raise UnprocessableError(
                        f"Premium should be between {self.min_premium} and {self.max_premium}.")
                policy_obj.premium = premium
            if fuel is not None and fuel != policy_obj.fuel:
                policy_obj.fuel = fuel
            if vehicle_segment is not None and vehicle_segment != policy_obj.vehicle_segment:
                policy_obj.vehicle_segment = vehicle_segment
            if bodily_injury_liability is not None and bodily_injury_liability != policy_obj.bodily_injury_liability:
                policy_obj.bodily_injury_liability = bodily_injury_liability
            if personal_injury_protection is not None and personal_injury_protection != policy_obj.personal_injury_protection:
                policy_obj.personal_injury_protection = personal_injury_protection
            if property_damage_liability is not None and property_damage_liability != policy_obj.property_damage_liability:
                policy_obj.property_damage_liability = property_damage_liability
            if collision is not None and collision != policy_obj.collision:
                policy_obj.collision = collision
            if comprehensive is not None and comprehensive != policy_obj.comprehensive:
                policy_obj.comprehensive = comprehensive
            if customer_gender is not None and customer_gender != policy_obj.customer_gender:
                policy_obj.customer_gender = customer_gender
            if customer_income_group is not None and customer_income_group != policy_obj.customer_income_group:
                policy_obj.customer_income_group = customer_income_group
            if customer_region is not None and customer_region != policy_obj.customer_region:
                policy_obj.customer_region = customer_region
            if customer_marital_status is not None and customer_marital_status != policy_obj.customer_marital_status:
                policy_obj.customer_marital_status = customer_marital_status
            session.commit()
            output['data'] = policy_obj.to_dict()
            output['message'] = f"Policy with ID {policy_id} updated successfully."
            return output
        except NotFoundError as e:
            self.logger.error(str(e))
            raise
        except UnprocessableError as e:
            if session:
                session.rollback()
            self.logger.error(str(e))
            raise
        except Exception as e:
            if session:
                session.rollback()
            self.logger.error(str(e))
            raise
        finally:
            if session:
                session.close()

    def delete(self, policy_id):
        '''
        Function to delete the policies
        '''
        output = dict()
        session = None
        try:
            policy_obj, session = self.__dao_obj.get_item(
                entities.Policy, policy_id, return_session=True)
            if policy_obj is None:
                raise NotFoundError(
                    f"Policy with ID {policy_id} does not exist.")
            session.delete(policy_obj)
            session.commit()
            output['message'] = f"Policy with ID {policy_id} deleted successfully."
            return output
        except NotFoundError as e:
            self.logger.error(str(e))
            raise
        except Exception as e:
            if session:
                session.rollback()
            self.logger.error(str(e))
            raise
        finally:
            if session:
                session.close()
