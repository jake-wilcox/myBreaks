from flask import Flask
from flask_restful import Api, Resource, reqparse
import Classes

app = Flask(__name__)
api = Api(app)

TM_post_args = reqparse.RequestParser()
TM_post_args.add_argument("name", type=str, help="Name is required", required=True)
TM_post_args.add_argument("timeIn", type=str, help="Time In is required", required=True)
TM_post_args.add_argument("timeOut", type=str, help="Time out is required", required=True)
TM_post_args.add_argument("lanes", type=bool, help="lanes is required", required=True)





class LoadBreaks(Resource):
    def get(self):
        return Classes.all_break_dicts


class TakeBreak(Resource):
    def get(self, userIndex):
        Classes.all_break_objs[userIndex].take_break()
        Classes.all_break_objs[userIndex].next_break()

class DefaultBreaks(Resource):
    def get(self):
        print('loading defaults')
        Classes.loadDefaults()
        pass

class AddTM(Resource):
    def post(self):
        args = TM_post_args.parse_args()
        print(args)





api.add_resource(LoadBreaks, "/")
api.add_resource(TakeBreak, '/tm/<int:userIndex>')
api.add_resource(DefaultBreaks, '/d')
api.add_resource(AddTM, '/add')

if __name__ == '__main__':
    app.run(host = '172.16.38.81', port=3000 , debug=True)
