import argparse
import os
import sys
from sqlalchemy import create_engine

class InsuranceDeploymentCLI:

    def __init__(self):
        parser = argparse.ArgumentParser(description="Insurance CLI",
                                         usage='''
                                         insurance-deploy <command> [<args>]
                                         
                                         The available commands are:
                                         start_server                       Start a HTTP server to enable APIs
                                         init_db                            Initialize database schema
                                         '''
                                         )
        parser.add_argument('command', help='Subcommand to run')
        args = parser.parse_args(sys.argv[1:2])
        if not hasattr(self, args.command):
            print('Unrecognized command')
            parser.print_help()
            exit(1)
        getattr(self, args.command)()

    @staticmethod
    def start_server():
        '''
        Starts a http server
        '''
        parser = argparse.ArgumentParser(
            description="Start a HTTP server"
        )
        parser.add_argument("--port", type=int,
                            help="Provide a port to start the services on", required=True
                            )
        parser.add_argument("--timeout", type=int,
                            help="Provide a timeout(in seconds) for a request", required=True
                            )
        parser.add_argument("--num_workers", type=int,
                            help="Provide number of workers to start", required=True
                            )
        args = parser.parse_args(sys.argv[2:])
        from insurance.apis import server
        server.start_server(args.port, args.timeout, args.num_workers)

    @staticmethod
    def init_db():
        '''
        Initialize the database
        '''
        from insurance.dao.entities import Base
        print("Initializing the database...")
        engine = create_engine("postgresql://postgres:postgres@192.168.8.121:5432/insurance")
        Base.metadata.create_all(engine)
        engine.dispose()
        print("Database initialization copleted.")


if __name__ == "__main__":
    InsuranceDeploymentCLI()