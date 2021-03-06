from flask_restplus import reqparse

get_parser = reqparse.RequestParser(bundle_errors=True)
get_parser.add_argument('policy_id', type=int, required=False, help='Id of the policy.', trim=True)
get_parser.add_argument('customer_id', type=int, required=False, help='Id of the customer.', trim=True)

create_parser = reqparse.RequestParser(bundle_errors=True)
create_parser.add_argument('customer_id', type=int, required=True, help='Id of the customer.', trim=True)
create_parser.add_argument('fuel', type=str, required=True, choices=("CNG", "Petrol", "Diesel"), default="CNG", help='Type of fuel used in the vehicle.', trim=True)
create_parser.add_argument('vehicle_segment', type=str, required=True, choices=("A", "B", "C"), default="A", help='Segment of the vehicle.', trim=True)
create_parser.add_argument('premium', type=int, required=True, help='Premium for the vehicle.', trim=True)
create_parser.add_argument('bodily_injury_liability', type=int, required=True, choices=(0, 1), default=0, help='', trim=True)
create_parser.add_argument('personal_injury_protection', type=int, required=True, choices=(0, 1), default=0, help='', trim=True)
create_parser.add_argument('property_damage_liability', type=int, required=True, choices=(0, 1), default=0, help='', trim=True)
create_parser.add_argument('collision', type=int, required=True, choices=(0, 1), default=0, help='', trim=True)
create_parser.add_argument('comprehensive', type=int, required=True, choices=(0, 1), default=0, help='', trim=True)
create_parser.add_argument('customer_gender', type=str, required=True, choices=("Male", "Female"), default="Male", help='Gender of the customer.', trim=True)
create_parser.add_argument('customer_income_group', type=str, required=True, choices=("0-$25K", "$25-$70K", ">$70K"), default="0-$25K", help='income group of the customer.', trim=True)
create_parser.add_argument('customer_region', type=str, required=True, choices=("East", "West", "North", "South"), default="East", help='Region of the customer.', trim=True)
create_parser.add_argument('customer_marital_status', type=int, required=True, choices=(0, 1), default=0, help='', trim=True)


update_parser = reqparse.RequestParser(bundle_errors=True)
update_parser.add_argument('fuel', type=str, required=False, choices=("CNG", "Petrol", "Diesel"), help='Type of fuel used in the vehicle.', trim=True)
update_parser.add_argument('vehicle_segment', type=str, required=False, choices=("A", "B", "C"), help='Segment of the vehicle.', trim=True)
update_parser.add_argument('premium', type=int, required=False, help='Premium for the vehicle.', trim=True)
update_parser.add_argument('bodily_injury_liability', type=int, required=False, choices=(0, 1), help='', trim=True)
update_parser.add_argument('personal_injury_protection', type=int, required=False, choices=(0, 1), help='', trim=True)
update_parser.add_argument('property_damage_liability', type=int, required=False, choices=(0, 1), help='', trim=True)
update_parser.add_argument('collision', type=int, required=False, choices=(0, 1), help='', trim=True)
update_parser.add_argument('comprehensive', type=int, required=False, choices=(0, 1), help='', trim=True)
update_parser.add_argument('customer_gender', type=str, required=False, choices=("Male", "Female"), help='Gender of the customer.', trim=True)
update_parser.add_argument('customer_income_group', type=str, required=False, choices=("0-$25K", "$25-$70K", ">$70K"), help='income group of the customer.', trim=True)
update_parser.add_argument('customer_region', type=str, required=False, choices=("East", "West", "North", "South"), help='Region of the customer.', trim=True)
update_parser.add_argument('customer_marital_status', type=int, required=False, choices=(0, 1), help='', trim=True)
