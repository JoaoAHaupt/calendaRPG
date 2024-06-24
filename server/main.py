from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins="*")

@app.route('/hello', methods=['GET'])
def hello():
    return jsonify({
  "campaigns": [
    {
      "description": "First campaign",
      "events": [
        {
          "date": "2024-06-05",
          "description": "Event 1",
          "id": 1
        },
        {
          "date": "2024-01-03",
          "description": "Event 2",
          "id": 2
        }
      ],
      "firstSession": "2024-01-01",
      "id": 1,
      "name": "Campaign 1"
    },
    {
      "description": "Second campaign",
      "events": [
        {
          "date": "2024-02-02",
          "description": "Event 3",
          "id": 3
        },
        {
          "date": "2024-02-03",
          "description": "Event 4",
          "id": 4
        }
      ],
      "firstSession": "2024-02-01",
      "id": 2,
      "name": "Campaign 2"
    }
  ],
  "email": "john.doe@example.com",
  "id": 1,
  "password": "password123",
  "username": "john_doe"
}
)

if __name__ == '__main__':
    app.run(debug=True)
