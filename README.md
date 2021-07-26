# Insurance-Web-App

## Prerequisites
   ```
   Python>=3.6
   Node>=14.17.3
   Docker>=20.10.7
   Postgres>=10.17.2
   ```

### Steps to build Docker Image
1. Go to `Insurance-Web-App/backend` and build code using the below command.

   `python setup.py sdist`

2. Copy the created tar file from dist directory to Docker Images.

   `cp Insurance-Web-App/backend/dist/insurance*.tar.gz Insurance-Web-App/Docker-Images`

3. Go to `Insurance-Web-App/Docker-Images` and build image using the below command.

   `docker build . -t insurance:1.0`

4. Create the server by runnning the docker image created in above step.

   `docker run -i -t -d --name insurance -p 5000:5000/tcp insurance:1.0`
   
### Create the database
    1. Create database named `insurance` in postgres.
    
    2. Initialize the application database schema using the below commands.
    
       docker exec -it insurance bash
       insurance-deploy init_db
    
### Load sample data
   ```
   cd Insurance-Web-App
   python load_sample_data.py
   ```

### Command to start the server

   `docker exec insurance bash -c "sh startup.sh"`

### Command to check the logs

   `docker exec insurance bash -c "tail -f /scripts/insurance.log"`
   
### Command to shutdown the server
   `docker exec insurance bash -c "sh restart.sh"`

### Command to shutdown the server
   `docker exec insurance bash -c "sh shutdown.sh"`
   
   `docker rm -f insurance`
   
### Command to start the UI
    cd Insurance-Web-App/frontend
    npm install
    npm start
