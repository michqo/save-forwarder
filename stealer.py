import requests

url = "http://localhost:5000/add"

#import os
#try:
#    file = open(os.getenv("LOCALAPPDATA") + "\\Growtopia\\save.dat", "r")
#    file_content = file.read()
#except FileNotFoundError:
#    print("Error: save.dat not found")

username = input("Enter username: ")
password = input("Enter password: ")
response = requests.post(url, headers={"username": username, "password": password})
print("Sucessfully sent to url " + url)