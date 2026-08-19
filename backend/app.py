from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import os

# ============================================================
# LOAD ENVIRONMENT VARIABLES
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ENV_PATH = os.path.join(BASE_DIR, ".env")

load_dotenv(ENV_PATH)


# ============================================================
# APP SETUP
# ============================================================

app = Flask(__name__)

# Allow React frontend to communicate with Flask
CORS(app)


# ============================================================
# OPENAI API KEY
# ============================================================

API_KEY = os.getenv("OPENAI_API_KEY")

print("========================================")
print("TripCraft Backend")
print("========================================")
print("API KEY LOADED:", bool(API_KEY))

if not API_KEY:
    print("WARNING: OPENAI_API_KEY was not found in .env")


# ============================================================
# TEMPORARY USER STORAGE
# ============================================================

users = {}


# ============================================================
# HOME
# ============================================================

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Backend running ✅"
    })


# ============================================================
# SIGNUP
# ============================================================

@app.route("/signup", methods=["POST"])
def signup():

    data = request.get_json() or {}

    email = data.get("email")

    if not email:
        return jsonify({
            "message": "Email is required"
        }), 400

    if email in users:
        return jsonify({
            "message": "User already exists"
        }), 400

    users[email] = data

    return jsonify({
        "message": "Signup successful"
    }), 200


# ============================================================
# LOGIN
# ============================================================

@app.route("/login", methods=["POST"])
def login():

    data = request.get_json() or {}

    email = data.get("email")

    if not email:
        return jsonify({
            "message": "Email is required"
        }), 400

    if email not in users:
        return jsonify({
            "message": "User not found"
        }), 404

    return jsonify({
        "message": "Login successful"
    }), 200


# ============================================================
# GENERATE ITINERARY
# ============================================================

@app.route("/generate-itinerary", methods=["POST"])
def generate_itinerary():

    data = request.get_json() or {}

    destination = data.get("destination")
    days = data.get("days")
    budget = data.get("budget")
    travellers = data.get("travellers")


    # --------------------------------------------------------
    # VALIDATE INPUT
    # --------------------------------------------------------

    if not destination:
        return jsonify({
            "error": "Destination is required"
        }), 400

    if not days:
        return jsonify({
            "error": "Number of days is required"
        }), 400

    if not budget:
        return jsonify({
            "error": "Budget is required"
        }), 400

    if not travellers:
        return jsonify({
            "error": "Number of travellers is required"
        }), 400


    # --------------------------------------------------------
    # CHECK API KEY
    # --------------------------------------------------------

    if not API_KEY:

        print("❌ OPENAI_API_KEY is missing")

        return jsonify({
            "error": "OpenAI API key is not configured on the server"
        }), 500


    # --------------------------------------------------------
    # CREATE PROMPT
    # --------------------------------------------------------

    prompt = f"""
Create a {days}-day travel itinerary for {destination}.

Trip details:

Destination: {destination}
Number of days: {days}
Budget: ₹{budget}
Number of travellers: {travellers}

Create a practical itinerary that considers the given
budget and number of travellers.

Rules:

- Use simple plain text.
- Start every day with Day 1, Day 2, Day 3, etc.
- Use bullet points starting with -
- Include sightseeing.
- Include food suggestions.
- Include activities.
- Include approximate spending where useful.
- Keep the itinerary realistic.
- Keep it clean and readable.
- Do not use markdown tables.

Example:

Day 1
- Morning: Visit a major attraction
- Afternoon: Explore the local area
- Lunch: Try a local restaurant
- Evening: Visit another attraction
- Estimated spending: ₹XXXX

Day 2
- Morning: Visit another attraction
- Afternoon: Explore markets
- Lunch: Try local food
- Evening: Relax or explore
- Estimated spending: ₹XXXX
"""


    # --------------------------------------------------------
    # CALL OPENAI
    # --------------------------------------------------------

    try:

        print("----------------------------------------")
        print("Generating itinerary...")
        print("Destination:", destination)
        print("Days:", days)
        print("Budget:", budget)
        print("Travellers:", travellers)
        print("----------------------------------------")

        response = requests.post(

            "https://api.openai.com/v1/chat/completions",

            headers={
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json"
            },

            json={
                "model": "gpt-4o-mini",

                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],

                "temperature": 0.7
            },

            timeout=60
        )


        # ----------------------------------------------------
        # PARSE RESPONSE
        # ----------------------------------------------------

        try:
            result = response.json()

        except ValueError:

            print("❌ OpenAI returned invalid JSON")
            print(response.text)

            return jsonify({
                "error": "Invalid response received from OpenAI"
            }), 500


        print("OPENAI STATUS:", response.status_code)
        print("OPENAI RESPONSE:", result)


        # ----------------------------------------------------
        # HANDLE OPENAI ERROR
        # ----------------------------------------------------

        if response.status_code != 200:

            error_data = result.get("error", {})

            if isinstance(error_data, dict):

                error_message = error_data.get(
                    "message",
                    "OpenAI request failed"
                )

            else:

                error_message = str(error_data)


            return jsonify({
                "error": error_message
            }), response.status_code


        # ----------------------------------------------------
        # GET ITINERARY
        # ----------------------------------------------------

        choices = result.get("choices")

        if not choices:

            return jsonify({
                "error": "OpenAI did not return an itinerary"
            }), 500


        message = choices[0].get("message", {})

        itinerary = message.get("content")


        if not itinerary:

            return jsonify({
                "error": "The generated itinerary was empty"
            }), 500


        print("✅ Itinerary generated successfully")


        return jsonify({
            "itinerary": itinerary
        }), 200


    # --------------------------------------------------------
    # TIMEOUT
    # --------------------------------------------------------

    except requests.exceptions.Timeout:

        print("❌ OpenAI request timed out")

        return jsonify({
            "error": "The request timed out. Please try again."
        }), 504


    # --------------------------------------------------------
    # CONNECTION ERROR
    # --------------------------------------------------------

    except requests.exceptions.ConnectionError as e:

        print("❌ Could not connect to OpenAI")
        print(e)

        return jsonify({
            "error": "Could not connect to OpenAI."
        }), 500


    # --------------------------------------------------------
    # OTHER REQUEST ERROR
    # --------------------------------------------------------

    except requests.exceptions.RequestException as e:

        print("❌ Request error:")
        print(e)

        return jsonify({
            "error": "There was a problem communicating with OpenAI."
        }), 500


    # --------------------------------------------------------
    # GENERAL ERROR
    # --------------------------------------------------------

    except Exception as e:

        print("❌ Unexpected server error:")
        print(e)

        return jsonify({
            "error": "Something went wrong while generating the itinerary."
        }), 500


# ============================================================
# RUN SERVER
# ============================================================

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )