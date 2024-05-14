import json
import re

def remove_forbidden_characters(key):
    forbidden_characters = r'[<>:"/\\|?*\x00-\x1f]'
    return re.sub(forbidden_characters, '', key)

def create_json_files(data):
    for key, value in data.items():
        kkey = remove_forbidden_characters(key)
        filename = f"{kkey}.json"
        
        with open(filename, 'w') as f:
            json.dump(value, f)

def read_json_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

path = r'C:\Users\Shortcake\Documents\GitHub\GD-skill-capture\project\json_file\data.json'
data = read_json_file(path)
print(len(data.keys()))

# print(data)
create_json_files(data)