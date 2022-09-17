from flask import Flask
from flask_restful import Api, Resource
import Classes

app = Flask(__name__)
api = Api(app)


class LoadBreaks(Resource):
    def get(self):
        return Classes.all_break_dicts


class TakeBreak(Resource):
    def get(self, userIndex):
        Classes.all_break_objs[userIndex].take_break()
        Classes.all_break_objs[userIndex].next_break()



api.add_resource(LoadBreaks, "/")
api.add_resource(TakeBreak, '/tm/<int:userIndex>')

if __name__ == '__main__':
    app.run(host = '172.16.38.81', port=3000 , debug=True)
