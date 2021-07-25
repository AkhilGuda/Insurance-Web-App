from flask import Flask, jsonify, request
from flask_restplus import Resource, Namespace
from insurance.service.policy import Policy
from insurance.api_parameters.base_api_parameters import get_parser, create_parser, update_parser
from insurance.utils.errors import NotFoundError, UnprocessableError, InernalServerError
from insurance.utils.logger import getLogger

api = Namespace('policy',
                description="APIs to get/create/update/delete the insurance policies"
                )

logger = getLogger()


@api.route('')
class GetAllInsurancePolicies(Resource):
    @api.expect(get_parser, validate=True)
    def get(self):
        output = dict()
        try:
            args = get_parser.parse_args()
            policy_obj = Policy()
            output = policy_obj.get(
                policy_id=args.policy_id, customer_id=args.customer_id)
            return jsonify(output)
        except NotFoundError as e:
            output['message'] = str(e)
            return output, 500
        except Exception as e:
            logger.error(str(e))
            output['message'] = "Some error occurred, please try again later."
            return output, 500

    @api.expect(create_parser, validate=True)
    def post(self):
        output = dict()
        try:
            args = create_parser.parse_args()
            policy_obj = Policy()
            output = policy_obj.create(customer_id=args.customer_id,
                                       fuel=args.fuel,
                                       vehicle_segment=args.vehicle_segment,
                                       premium=args.premium,
                                       bodily_injury_liability=args.bodily_injury_liability,
                                       personal_injury_protection=args.personal_injury_protection,
                                       property_damage_liability=args.property_damage_liability,
                                       collision=args.collision,
                                       comprehensive=args.comprehensive,
                                       customer_gender=args.customer_gender,
                                       customer_income_group=args.customer_income_group,
                                       customer_region=args.customer_region,
                                       customer_marital_status=args.customer_marital_status
                                       )
            return jsonify(output)
        except UnprocessableError as e:
            output['message'] = str(e)
            return output, 422
        except Exception as e:
            output['message'] = "Some error occurred, please try again later."
            return output, 500


@api.route('/<int:id>')
class CreateInsurancePolicies(Resource):
    def get(self, id):
        output = dict()
        try:
            policy_obj = Policy()
            output = policy_obj.get(
                policy_id=id)
            return jsonify(output)
        except NotFoundError as e:
            output['message'] = str(e)
            return output, 500
        except Exception as e:
            logger.error(str(e))
            output['message'] = "Some error occurred, please try again later."
            return output, 500

    @api.expect(update_parser, validate=True)
    def put(self, id):
        output = dict()
        try:
            args = update_parser.parse_args()
            logger.info(args)
            policy_obj = Policy()
            output = policy_obj.update(policy_id=id,
                                       fuel=args.fuel,
                                       vehicle_segment=args.vehicle_segment,
                                       premium=args.premium,
                                       bodily_injury_liability=args.bodily_injury_liability,
                                       personal_injury_protection=args.personal_injury_protection,
                                       property_damage_liability=args.property_damage_liability,
                                       collision=args.collision,
                                       comprehensive=args.comprehensive,
                                       customer_gender=args.customer_gender,
                                       customer_income_group=args.customer_income_group,
                                       customer_region=args.customer_region,
                                       customer_marital_status=args.customer_marital_status
                                       )
            return jsonify(output)
        except NotFoundError as e:
            output['message'] = str(e)
            return output, 404
        except UnprocessableError as e:
            output['message'] = str(e)
            return output, 422
        except Exception as e:
            output['message'] = "Some error occurred, please try again later."
            print(output)

            return output, 500

    def delete(self, id):
        output = dict()
        try:
            policy_obj = Policy()
            output = policy_obj.delete(policy_id=id)
            return jsonify(output)
        except NotFoundError as e:
            output['message'] = str(e)
            return output, 500
        except Exception as e:

            output['message'] = "Some error occurred, please try again later."
            return output, 500
