# importing csv module
import csv
import datetime
import sqlalchemy as sy

# csv file name
filename = "./sample_data.csv"

# initializing the titles and rows list
fields = []
rows = []

# reading csv file
with open(filename, 'r') as csvfile:
    # creating a csv reader object
    csvreader = csv.reader(csvfile)

    # extracting field names through first row
    fields = next(csvreader)

    # extracting each data row one by one
    for row in csvreader:
        rows.append(row)

    # get total number of rows
    print("Total no. of rows: %d" % (csvreader.line_num))

# Function to convert string to datetime
def convert(date_time):
    format = '%m/%d/%Y'  # The format
    datetime_str = datetime.datetime.strptime(
        date_time, format).strftime("%Y-%m-%d %H:%M:%S.%f")
    return datetime_str

query = "INSERT INTO policies (id, date_of_purchase, customer_id, fuel, vehicle_segment, premium, bodily_injury_liability, personal_injury_protection, property_damage_liability, collision, comprehensive, customer_gender, customer_income_group, customer_region, customer_marital_status) \
    values ({id}, '{date_of_purchase}', {customer_id}, '{fuel}', '{vehicle_segment}', {premium}, {bodily_injury_liability}, {personal_injury_protection}, {property_damage_liability}, {collision}, {comprehensive}, '{customer_gender}', '{customer_income_group}', '{customer_region}', {customer_marital_status})"

engine = sy.create_engine("postgresql://postgres:postgres@192.168.8.121:5432/insurance")

for row in rows:
    date_of_purchase = convert(row[1])
    customer_income_group = row[12].replace(" ", "")
    insert_query = query.format(id=row[0], date_of_purchase=date_of_purchase, customer_id=row[2], fuel=row[3], vehicle_segment=row[4], premium=row[5], bodily_injury_liability=row[6], personal_injury_protection=row[7], property_damage_liability=row[8], collision=row[9], comprehensive=row[10], customer_gender=row[11], customer_income_group=customer_income_group, customer_region=row[13], customer_marital_status=row[14])
    engine.execute(insert_query)

engine.dispose()
    
print("Data imported to the table successfully.")