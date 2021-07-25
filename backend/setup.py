from setuptools import setup, find_packages

setup(
    name='insurance',
    version='1.0',
    description='Application to manage insurance policies',
    author='Akhil Guda',
    author_email='akhilreddyguda@gmail.com',
    url='',
    scripts=["insurance/bin/insurance-deploy"],
    packages=find_packages(exclude=["*.tests"]),
    package_data={"insurance": ["*"]},
    install_requires=[
        "werkzeug==0.16.1",
        "sqlalchemy==1.3.13",
        "sqlalchemy_utils==0.36.3",
        "flask-sqlalchemy==2.5.1",
        "flask==1.1.2",
        "flask_restplus==0.13.0",
        "flask-cors==3.0.9",
        "gunicorn==20.1.0",
        "requests==2.25.0",
        "requests-futures==1.0.0",
        "psycopg2-binary==2.8.6"
    ],
    python_requires=">=3.6",
)
