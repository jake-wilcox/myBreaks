import requests

BASE = "http://172.16.38.81:3000"



response1 = requests.get(BASE + '/')
print(response1.json())

print('\n\n')

response2 = requests.get(BASE + '/tm/2')
print(response2.json())
